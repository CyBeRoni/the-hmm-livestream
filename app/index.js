const choo = require('choo')
const devtools = require('choo-devtools')
const css = require('sheetify')
css('./design/index.js')
css('./design/design.css')
const settings = require('../public/settings.json')

const app = choo()
app.use(devtools())

app.use(require('./stores/stream'))

app.route(settings.stream.url, require('./views/main'))
app.route(`${settings.stream.url}/chat`, require('./views/chat'))
app.route('*', require('./views/notfound'))

if (!module.parent) app.mount('body')
else module.exports = app
