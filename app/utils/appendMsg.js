const chatMsg = require('../components/chat-msg')

const loadImage = img =>
  new Promise((resolve, reject) => {
    img.onload = () => resolve(img);
    img.onerror = reject;
  });

function appendMsg (el, msg, scroll = false) {
  const newMsg = chatMsg(msg)

  el.append(newMsg)
  if (scroll){
    images = newMsg.getElementsByTagName("img");
    if (images.length > 0){
      i = Array.from(images);
      Promise.allSettled(i.map(loadImage)).then(() => {
        newMsg.scrollIntoView(false);
      });
    } else {
      newMsg.scrollIntoView(false)
    }
  }
}

module.exports = appendMsg
