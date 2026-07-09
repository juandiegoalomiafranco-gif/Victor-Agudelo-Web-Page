import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';
import {vitePrerenderPlugin} from 'vite-prerender-plugin';
import {ROUTES_TO_PRERENDER} from './src/lib/seo';

// El chunk de entry-prerender solo se usa en build (renderToString en Node).
// vite-prerender-plugin lo deja en dist/assets/ y agrega un <link modulepreload>
// en cada HTML, lo que descarga ~600KB de react-dom/server al cliente sin razón.
// Este plugin corre después y lo elimina.
const stripPrerenderArtifacts = (): Plugin => ({
  name: 'strip-prerender-artifacts',
  apply: 'build',
  enforce: 'post',
  generateBundle(_options, bundle) {
    const prerenderChunks = Object.keys(bundle).filter((n) => n.includes('entry-prerender'));
    if (prerenderChunks.length === 0) return;
    // Salvaguarda: si otro chunk del bundle importa el chunk de prerender
    // (Rollup pudo haber colocado módulos compartidos ahí), borrarlo rompería
    // la app entera en el navegador (import 404 → sin hidratación). En ese
    // caso se conserva y solo se limpia el modulepreload.
    const referenced = prerenderChunks.filter((p) =>
      Object.values(bundle).some(
        (c) =>
          c.type === 'chunk' &&
          !prerenderChunks.includes(c.fileName) &&
          [...c.imports, ...c.dynamicImports].some((i) => prerenderChunks.includes(i)),
      ),
    );
    if (referenced.length > 0) {
      this.warn(
        `stripPrerenderArtifacts: ${referenced.join(', ')} es importado por otros chunks; no se elimina. ` +
          'Revisa manualChunks para separar los módulos compartidos.',
      );
    }
    const stripPattern = new RegExp(
      `<link rel="modulepreload"[^>]*(?:${prerenderChunks
        .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|')})[^>]*>\\s*`,
      'g',
    );
    for (const [name, asset] of Object.entries(bundle)) {
      if (name.endsWith('.html') && asset.type === 'asset' && typeof asset.source === 'string') {
        asset.source = asset.source.replace(stripPattern, '');
      }
    }
    for (const name of prerenderChunks) {
      if (!referenced.includes(name)) delete bundle[name];
    }
  },
});

// El scheduler de react-dom (build de navegador, compartido por el chunk de
// pre-render) crea un MessageChannel al renderizar en Node y nunca lo cierra:
// el proceso de `vite build` quedaba vivo tras escribir dist hasta que el CI
// lo mataba (timeout de 45 min en Vercel). Con los puertos unref() el event
// loop puede vaciarse y el build termina en segundos. Solo afecta al proceso
// de build; el bundle del navegador no pasa por aquí.
const unrefPrerenderChannels = (): Plugin => ({
  name: 'unref-prerender-message-channels',
  apply: 'build',
  configResolved() {
    const NativeChannel = globalThis.MessageChannel
    if (!NativeChannel) return
    globalThis.MessageChannel = class extends NativeChannel {
      constructor() {
        super()
        const unref = () => {
          ;(this.port1 as unknown as { unref?: () => void }).unref?.()
          ;(this.port2 as unknown as { unref?: () => void }).unref?.()
        }
        unref()
        // Asignar onmessage vuelve a referenciar el puerto (Node); el segundo
        // unref corre tras la evaluación síncrona del módulo que lo crea.
        queueMicrotask(unref)
      }
    } as typeof MessageChannel
  },
})

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      vitePrerenderPlugin({
        renderTarget: '#root',
        prerenderScript: path.resolve(__dirname, 'src/entry-prerender.tsx'),
        // '/404' → dist/404/index.html (fallback del preview local);
        // '/404.html' → dist/404.html (Vercel lo sirve para rutas inexistentes).
        // Ambas renderizan NotFoundPage vía el catch-all del Router, así el HTML
        // servido coincide con lo que React hidrata (sin mismatch #418).
        additionalPrerenderRoutes: [...ROUTES_TO_PRERENDER, '/404', '/404.html'],
        previewMiddlewareFallback: '/404',
      }),
      stripPrerenderArtifacts(),
      unrefPrerenderChannels(),
    ],
    build: {
      rollupOptions: {
        output: {
          // React y el router van a un chunk vendor compartido. Sin esto,
          // Rollup los hoistea dentro del chunk de entry-prerender (la otra
          // entrada del build) y el bundle del navegador termina importando
          // desde un archivo que stripPrerenderArtifacts elimina → 404 y la
          // app carga sin JavaScript.
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          },
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      historyApiFallback: true,
    },
  };
});
