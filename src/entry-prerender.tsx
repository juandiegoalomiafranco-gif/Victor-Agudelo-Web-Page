import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from './App'
import { ROUTES_TO_PRERENDER, getSeoForRoute, getHeadElements } from './lib/seo'

const PRERENDER_LINKS = new Set<string>(ROUTES_TO_PRERENDER)

type PrerenderData = { url: string; ssr?: boolean }

export async function prerender(data: PrerenderData) {
  const html = renderToString(
    <StaticRouter location={data.url}>
      <App />
    </StaticRouter>,
  )

  const seo = getSeoForRoute(data.url)

  return {
    html,
    links: PRERENDER_LINKS,
    head: {
      lang: 'es',
      title: seo.title,
      elements: getHeadElements(data.url),
    },
  }
}
