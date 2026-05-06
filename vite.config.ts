import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv, type Plugin} from 'vite';
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
    for (const name of prerenderChunks) delete bundle[name];
  },
});

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      vitePrerenderPlugin({
        renderTarget: '#root',
        prerenderScript: path.resolve(__dirname, 'src/entry-prerender.tsx'),
        additionalPrerenderRoutes: [...ROUTES_TO_PRERENDER],
      }),
      stripPrerenderArtifacts(),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
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
