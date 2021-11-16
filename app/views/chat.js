const html = require('choo/html')

const Chat = require('../components/chat')
const chat = new Chat()

function view (state, emit) {
  console.log(state)

  return html`
    <body>
    ${chatBox(state, emit)}
    </body>
  `

  function chatBox (state, emit) {
	  const data = state.components.chat
    data.toggle = true;
    data.hide_input = new URLSearchParams(window.location.search).get('fs');
	  return html`
      <div class="psr vw100 vh100 bgc-bk fc-wh oys standalone">
        ${chat.render(state, emit, data)}
      </div>
	  `
  }
}

module.exports = view
