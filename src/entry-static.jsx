import { renderToString } from 'react-dom/server'
import App from './App.jsx'
export { routes, siteUrl } from './routes.js'

export function render(pathname) {
  return renderToString(<App pathname={pathname} />)
}
