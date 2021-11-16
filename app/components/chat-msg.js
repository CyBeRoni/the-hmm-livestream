const html = require('choo/html')
const formatDate = require('../utils/formatDate')
const raw = require('choo/html/raw')
const md = require('../utils/markdown')

function chatMsg (msg) {
  return html`
    <div class="chat-message x xdc xw pb1 ow">
      <time datetime="${formatDate(msg.timestamp).iso}" class="ft-ms fs0-8 fc-gr9">${formatDate(msg.timestamp).date}</time>
      <div class="pl1 copy">
        <span class="fsi">${msg.username}:</span>
        ${raw(md(msg.value))}
      </div>
    </div>
  `
}

module.exports = chatMsg
