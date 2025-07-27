import indexHtml from './public/index.html'
import styleCss from './public/style.css'

document.body.innerHTML = indexHtml
document.querySelector("#style").innerHTML = styleCss

await import('./server.js')
await import('./client.js')
