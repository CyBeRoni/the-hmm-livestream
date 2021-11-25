
import { EmojiButton } from '@joeattardi/emoji-button';
const html = require('choo/html');
const Component = require('choo/component');
const settings = require('../../public/settings.json')

function initEmojiButton(customEmotes, element){
    let e = new EmojiButton({
        rootElement: element,
        // theme: "dark",
        emojisPerRow: 5,
        showCategoryButtons: true,
        showRecents: false,
        autoHide: false,
        initialCategory: "smileys",
        categories: ["smileys"],
        position: "bottom-end",
        styleProperties: {
            "--background-color": "#0a0b4c",
            "--text-color": "white",
            "--category-button-active-color": "white",
            "--category-button-color": "#aaaaaa"
        },
        i18n: {
            "categories": {
                "smileys": "Smileys",
                "custom": settings.subtitle
            }
        },
        emojiData: {
            "categories":["smileys"],
            "emoji": [
                {
                    "emoji": "😀",
                    "category": 0,
                    "name": "grinning face",
                    "version": "1.0"
                },
                {
                    "emoji": "😉",
                    "category": 0,
                    "name": "winking face",
                    "version": "1.0"
                },
                {
                    "emoji": "🤣",
                    "category": 0,
                    "name": "rolling on the floor laughing",
                    "version": "3.0"
                },
                {
                    "emoji": "😍",
                    "category": 0,
                    "name": "smiling face with heart-eyes",
                    "version": "1.0"
                },
                {
                    "emoji": "😷",
                    "category": 0,
                    "name": "face with medical mask",
                    "version": "1.0"
                },
                {
                    "emoji": "🧐",
                    "category": 0,
                    "name": "face with monocle",
                    "version": "5.0"
                },
                {
                    "emoji": "😦",
                    "category": 0,
                    "name": "frowning face",
                    "version": "1.0"
                },
                {
                    "emoji": "😡",
                    "category": 0,
                    "name": "pouting face",
                    "version": "1.0"
                },
                {
                    "emoji": "🥺",
                    "category": 0,
                    "name": "pleading face",
                    "version": "11.0"
                },
                {
                    "emoji":"😱",
                    "category":0,
                    "name":
                    "face screaming in fear",
                    "version":"1.0"
                }

            ]
        },
        custom: customEmotes
    });

    e.on('emoji', selection => {
        let elem = document.querySelector("#chat-message");
        if (! selection.custom){
            insertAtCaret(elem, selection.emoji);
        } else {
            insertAtCaret(elem, selection.name);
        }
    });

    return e;
}

function insertAtCaret (elem, text) {
    text = text || '';
    if (elem.selectionStart || elem.selectionStart === 0) {
      let startPos = elem.selectionStart;
      let endPos = elem.selectionEnd;
      let before = elem.value.substring(0, startPos);
      let after = elem.value.substring(endPos, elem.value.length);
      let beforeSpace = before.endsWith(' ') || startPos == 0 ? 0 : 1;
      let afterSpace = after.startsWith(' ') ? 0 : 1;
      elem.value = before + (beforeSpace == 0 ? '' : ' ')
                   + text +
                   (afterSpace == 0 ? '' : ' ') + after;
      elem.selectionStart = startPos + text.length + beforeSpace + afterSpace;
      elem.selectionEnd = startPos + text.length + beforeSpace + afterSpace;
    } else {
      elem.value += text;
    }
};

module.exports = class emojiButton extends Component {
    constructor (id, state, emit) {
        super(id)
        this.emit = emit;
        this.local = state.components[id] = {}
        this.local.emotes = [];
        this.handleClick = this.handleClick.bind(this)
    }

    load (element) {
        this.local.element = element;

        if (this.local.emotes.length == 0){
            window.fetch('/emotes')
            .then(async (response) => {
                this.local.emotes = await response.json();
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                this.local.picker = initEmojiButton(this.local.emotes, element);
            });
         }
    }

    update(){
        return false;
    }

    handleClick (e){
        if (this.local.picker)
            this.local.picker.togglePicker(this.local.element);
    }

    createElement () {
        return html`<div class="emojipicker"><button type="button" onclick=${this.handleClick}>🤔</button></div>`
    }
}
