
import { EmojiButton } from '@joeattardi/emoji-button';
const axios = require('axios').default;
const html = require('choo/html');
const Component = require('choo/component');

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
            elem.value += ` ${selection.emoji}`;
        } else {
            elem.value += ` ${selection.name}`;
        }
    });

    return e;
}

module.exports = class emojiButton extends Component {
    constructor (id, state, emit) {
        super(id)
        this.emit = emit;
        this.local = state.components[id] = {}
        this.local.emotes = [];
        this.handleClick = this.handleClick.bind(this)
    }

    load (element) {
        const self = this;
        this.local.element = element;
        if (this.local.emotes.length == 0){
            axios.get('/emotes')
                .then(function (response) {
                self.local.emotes = response.data;
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            }.bind(this)).then(function() {
                self.local.picker = initEmojiButton(this.local.emotes, element);
            }.bind(this));
        } else {
            self.local.picker = initEmojiButton(this.local.emotes, element);
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
