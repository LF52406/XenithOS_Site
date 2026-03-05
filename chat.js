import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getDatabase, ref, set, onValue, remove, update } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import { initializeAppCheck, ReCaptchaV3Provider } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app-check.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMiiFmTsbX56qKGZGuK9YkjUGlnTQuaFc",
    authDomain: "xenithos-ffff1.firebaseapp.com",
    databaseURL: "https://xenithos-ffff1-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "xenithos-ffff1",
    storageBucket: "xenithos-ffff1.firebasestorage.app",
    messagingSenderId: "624303800249",
    appId: "1:624303800249:web:27eebfd0a0d245e6e90068"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider('6LfwzH8sAAAAAJBSdAZvO1W4tYrGQCEQq_ebn348'),
    isTokenAutoRefreshEnabled: true
});

const translations = {
    en: {
        "chat_title": "Community",
        "chat_desc": "Discuss XenithOS with others",
        "chat_sys_welcome": "Welcome to the XenithOS community chat! Please be respectful.",
        "chat_placeholder": "Type a message...",
        "edited": "(edited)",
        "prompt_name": "Change Nickname",
        "prompt_edit": "Edit Message",
        "btn_cancel": "Cancel",
        "btn_save": "Save",
        "role_admin": "Admin",
        "role_mod": "Mod",
        "poll_create_title": "Create Poll",
        "poll_question_ph": "Ask a question...",
        "poll_btn_send": "Send Poll",
        "pinned_title": "Pinned Message"
    },
    ru: {
        "chat_title": "Обсуждение",
        "chat_desc": "Общайтесь с другими пользователями",
        "chat_sys_welcome": "Добро пожаловать в чат XenithOS! Пожалуйста, уважайте друг друга.",
        "chat_placeholder": "Введите сообщение...",
        "edited": "(изменено)",
        "prompt_name": "Изменить никнейм",
        "prompt_edit": "Редактировать сообщение",
        "btn_cancel": "Отмена",
        "btn_save": "Сохранить",
        "role_admin": "Админ",
        "role_mod": "Модер",
        "poll_create_title": "Создать опрос",
        "poll_question_ph": "Задайте вопрос...",
        "poll_btn_send": "Отправить",
        "pinned_title": "Закрепленное сообщение"
    },
    uk: {
        "chat_title": "Спільнота",
        "chat_desc": "Спілкуйтеся з іншими користувачами",
        "chat_sys_welcome": "Ласкаво просимо до чату XenithOS! Будь ласка, поважайте один одного.",
        "chat_placeholder": "Введіть повідомлення...",
        "edited": "(змінено)",
        "prompt_name": "Змінити никнейм",
        "prompt_edit": "Редагувати повідомлення",
        "btn_cancel": "Скасувати",
        "btn_save": "Зберегти",
        "role_admin": "Адмін",
        "role_mod": "Модер",
        "poll_create_title": "Створити опитування",
        "poll_question_ph": "Поставте запитання...",
        "poll_btn_send": "Відправити",
        "pinned_title": "Закріплене повідомлення"
    }
};

const emojis = {
    smileys: ["😀","😃","😄","😁","😆","😅","😂","🤣","🥲","☺️","😊","😇","🙂","🙃","😉","😌","😍","🥰","😘","😗","😙","😚","😋","😛","😝","😜","🤪","🤨","🧐","🤓","😎","🥸","🤩","🥳","😏","😒","😞","😔","😟","😕","🙁","☹️","😣","😖","😫","😩","🥺","😢","😭","😤","😠","😡","🤬","🤯","😳","🥵","🥶","😱","😨","😰","😥","😓","🫣","🤭","🫢","🤫","🫠","🤥","😶","😶‍🌫️","😐","😑","😬","🙄","😯","😦","😧","😮","😲","🥱","😴","🤤","😪","😵","😵‍💫","🤐","🥴","🤢","🤮","🤧","😷","🤒","🤕","🤑","🤠","😈","👿","👹","👺","🤡","💩","👻","💀","☠️","👽","👾","🤖"],
    people: ["👋","🤚","🖐","✋","🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦿","🦵","🦶","👂","🦻","👃","🫀","🫁","🧠","🦷","🦴","👀","👁","👅","👄","💋","🩸","👶","👧","🧒","👦","👩","🧑","👨","👩‍🦱","🧑‍🦱","👨‍🦱","👩‍🦰","🧑‍🦰","👨‍🦰","👱‍♀️","👱","👱‍♂️","👩‍🦳","🧑‍🦳","👨‍🦳","👩‍🦲","🧑‍🦲","👨‍🦲","🧔‍♀️","🧔","🧔‍♂️","👵","🧓","👴","👲","👳‍♀️","👳","👳‍♂️","🧕","👮‍♀️","👮","👮‍♂️","👷‍♀️","👷","👷‍♂️","💂‍♀️","💂","💂‍♂️","🕵️‍♀️","🕵️","🕵️‍♂️","👩‍⚕️","🧑‍⚕️","👨‍⚕️","👩‍🌾","🧑‍🌾","👨‍🌾","👩‍🍳","🧑‍🍳","👨‍🍳","👩‍🎓","🧑‍🎓","👨‍🎓","👩‍🎤","🧑‍🎤","👨‍🎤","👩‍🏫","🧑‍🏫","👨‍🏫","👩‍🏭","🧑‍🏭","👨‍🏭","👩‍💻","🧑‍💻","👨‍💻","👩‍💼","🧑‍💼","👨‍💼","👩‍🔧","🧑‍🔧","👨‍🔧","👩‍🔬","🧑‍🔬","👨‍🔬","👩‍🎨","🧑‍🎨","👨‍🎨","👩‍🚒","🧑‍🚒","👨‍🚒","👩‍✈️","🧑‍✈️","👨‍✈️","👩‍🚀","🧑‍🚀","👨‍🚀","👩‍⚖️","🧑‍⚖️","👨‍⚖️","👰‍♀️","👰","👰‍♂️","🤵‍♀️","🤵","🤵‍♂️","👸","🤴","🥷","🦸‍♀️","🦸","🦸‍♂️","🦹‍♀️","🦹","🦹‍♂️","🤶","🎅","🧙‍♀️","🧙","🧙‍♂️","🧝‍♀️","🧝","🧝‍♂️","🧛‍♀️","🧛","🧛‍♂️","🧟‍♀️","🧟","🧟‍♂️","🧞‍♀️","🧌","🧞","🧞‍♂️","🧜‍♀️","🧜","🧜‍♂️","🧚‍♀️","🧚","🧚‍♂️","👼","🤰","🫄","🤱","👩‍🍼","🧑‍🍼","👨‍🍼","🙇‍♀️","🙇","🙇‍♂️","💁‍♀️","💁","💁‍♂️","🙅‍♀️","🙅","🙅‍♂️","🙆‍♀️","🙆","🙆‍♂️","🙋‍♀️","🙋","🙋‍♂️","🧏‍♀️","🧏","🧏‍♂️","🤦‍♀️","🤦","🤦‍♂️","🤷‍♀️","🤷","🤷‍♂️","🙎‍♀️","🙎","🙎‍♂️","🙍‍♀️","🙍","🙍‍♂️","💇‍♀️","💇","💇‍♂️","💆‍♀️","💆","💆‍♂️","🧖‍♀️","💆","🧖‍♂️","💅","🤳","💃","🕺","👯‍♀️","👯","👯‍♂️","🕴‍♀️","🕴","🕴‍♂️","🚶‍♀️","🚶","🚶‍♂️","🏃‍♀️","🏃","🏃‍♂️","🧍‍♀️","🧍","🧍‍♂️"],
    symbols: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☪️","🕉️","☸️","✡️","🔯","🕎","☯️","☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","🆔","⚛️","🉑","☢️","☣️","📴","📳","🈶","🈚","🈸","🈺","🈷️","✴️","🆚","💮","🉐","㊙️","㊗️","🈴","🈵","🈹","🈲","🅰️","🅱️","🆎","🆑","🅾️","🆘","❌","⭕","🛑","⛔","📛","🚫","💯","💢","♨️","🚷","🚯","🚳","🚱","🔞","📵","🚭","❗","❕","❓","❔","‼️","⁉️","🔅","🔆","〽️","⚠️","🚸","🔱","⚜️","🔰","♻️","✅","🈯","💹","❇️","✳️","❎","🌐","💠","Ⓜ️","🌀","💤","🏧","🚾","♿","🅿️","🈳","🈂️","🛂","🛃","🛄","🛅","🚹","🚺","🚼","🚻","🚮","🎦","📶","🈁","🔣","ℹ️","🔤","🔡","🔠","🆖","🆗","🆙","🆒","🆕","🆓","0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","🔢","#️⃣","*️⃣","⏏️","▶️","⏸️","⏯️","⏹️","⏺️","⏭️","⏮️","⏩","⏪","⏫","⏬","◀️","🔼","🔽","➡️","⬅️","⬆️","⬇️","↗️","↘️","↙️","↖️","↕️","↔️","↪️","↩️","⤴️","⤵️","🔀","🔁","🔂","🔄","🔃","🎵","🎶","➕","➖","➗","✖️","♾️","💲","💱","™️","©️","®️","〰️","➰","➿","🔚","🔙","🔛","🔝","🔜","✔️","☑️","🔘","🔴","🟠","🟡","🟢","🔵","🟣","⚫","⚪","🟤","🔺","🔻","🔸","🔹","🔶","🔷","🔳","🔲","▪️","▫️","◾","◽","◼️","◻️","⬛","⬜","🟥","🟧","🟨","🟩","🟦","🟪","🟫","🔈","🔇","🔉","🔊","🔔","🔕","📣","📢","👁️‍🗨️","💬","💭","🗯️","♠️","♣️","♥️","♦️","🃏","🎴","🀄","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛","🕜","🕝","🕞","🕟","🕠","🕡","🕢","🕣","🕤","🕥","🕦","🕧"]
};

const badWordsList = ['мат1', 'мат2', 'дурак', 'идиот', 'блин'];
const editIcon = `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
const deleteIcon = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
const modIcon = `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
const pinIcon = `<svg viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>`;
const replyIcon = `<svg viewBox="0 0 24 24"><path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z"/></svg>`;
const fileDocIcon = `<svg class="chat-file-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/></svg>`;
const playIcon = `<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>`;
const pauseIcon = `<svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>`;
const ADMIN_NICK = 'LF5';

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const stickerBtn = document.getElementById('chat-sticker-btn');
const chatAttachBtn = document.getElementById('chat-attach-btn');
const chatFileInput = document.getElementById('chat-file-input');
const emojiPicker = document.getElementById('emoji-picker');
const emojiGrid = document.getElementById('emoji-grid');
const emojiTabs = document.querySelectorAll('.emoji-tab');
const modalOverlay = document.getElementById('custom-modal');
const modalInput = document.getElementById('modal-input');
const chatSettingsBtn = document.getElementById('chat-settings-btn');
const btnBack = document.getElementById('btn-back');
const logoNav = document.getElementById('logo-nav');

const pollBtn = document.getElementById('poll-btn');
const pollModal = document.getElementById('poll-modal');
const pollQuestionInput = document.getElementById('poll-question-input');
const pollOptionsContainer = document.getElementById('poll-options-container');
const pollAddOptionBtn = document.getElementById('poll-add-option-btn');
const pinnedMessageContainer = document.getElementById('pinned-message');
const pinnedText = document.getElementById('pinned-text');
const unpinBtn = document.getElementById('unpin-btn');

const replyPreviewContainer = document.getElementById('reply-preview');
const replyPreviewAuthor = document.getElementById('reply-preview-author');
const replyPreviewText = document.getElementById('reply-preview-text');
const replyPreviewClose = document.getElementById('reply-preview-close');

const uploadModal = document.getElementById('upload-modal');
const uploadProgressBar = document.getElementById('upload-progress-bar');
const uploadPercent = document.getElementById('upload-percent');

const imageViewer = document.getElementById('image-viewer');
const viewerImg = document.getElementById('viewer-img');

let currentLang = localStorage.getItem('xenithos_lang') || 'ru';
let currentUser = localStorage.getItem('xenithos_chat_user');
let moderators = JSON.parse(localStorage.getItem('xenithos_mods') || '[]');
let messagesData = [];
let pinnedMessageId = null;
let modalCallback = null;
let isEmojiPickerOpen = false;
let replyingToId = null;

let currentPlayingAudio = null;
let currentPlayBtn = null;

onValue(ref(db, 'messages'), (snapshot) => {
    const data = snapshot.val() || {};
    const newMessagesData = Object.values(data).sort((a, b) => a.id - b.id);
    const isAtBottom = chatMessages.scrollHeight - chatMessages.clientHeight <= chatMessages.scrollTop + 50;
    const isNewMessage = newMessagesData.length > messagesData.length;
    const currentScroll = chatMessages.scrollTop;
    
    messagesData = newMessagesData;
    renderMessages();
    updatePinnedMessageUI();
    
    if (isNewMessage || isAtBottom) {
        scrollToBottom();
    } else {
        chatMessages.scrollTop = currentScroll;
    }
});

onValue(ref(db, 'pinnedMessageId'), (snapshot) => {
    pinnedMessageId = snapshot.val();
    updatePinnedMessageUI();
});

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[lang][key]) el.setAttribute('placeholder', translations[lang][key]);
    });
    const currentScroll = chatMessages.scrollTop;
    renderMessages(); 
    updatePinnedMessageUI();
    chatMessages.scrollTop = currentScroll;
}

function smoothNavigate(url) {
    const page = document.getElementById('chat-page');
    page.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    page.style.opacity = '0';
    page.style.transform = 'translateY(10px)';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

function openModal(titleKey, defaultValue, callback) {
    document.getElementById('modal-title').textContent = translations[currentLang][titleKey];
    modalInput.value = defaultValue;
    modalCallback = callback;
    modalOverlay.classList.add('active');
    setTimeout(() => modalInput.focus(), 100);
}

function closeModal() {
    modalOverlay.classList.remove('active');
    modalCallback = null;
}

function getUserRole(nick) {
    if (nick === ADMIN_NICK) return 'admin';
    if (moderators.includes(nick)) return 'mod';
    return 'user';
}

function updateUIVisibility() {
    const role = getUserRole(currentUser);
    if (role === 'admin' || role === 'mod') {
        chatSettingsBtn.style.display = 'flex';
        pollBtn.style.display = 'flex';
    } else {
        chatSettingsBtn.style.display = 'none';
        pollBtn.style.display = 'none';
    }
}

function onSafeClick(element, callback) {
    let startX = 0;
    let startY = 0;
    let isScrolling = false;
    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isScrolling = false;
    }, { passive: true });
    element.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10) {
            isScrolling = true;
        }
    }, { passive: true });
    element.addEventListener('touchend', (e) => {
        if (!isScrolling) {
            if (e.cancelable) e.preventDefault();
            callback(e);
        }
    });
    element.addEventListener('click', (e) => {
        callback(e);
    });
}

function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '0:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

function getFileType(fileName) {
    const ext = fileName.split('.').pop().toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'heic'];
    const videoExts = ['mp4', 'webm', 'ogg', 'mov', 'avi'];
    const audioExts = ['mp3', 'wav', 'flac', 'm4a', 'aac', 'ogg'];
    if (imageExts.includes(ext)) return 'image';
    if (videoExts.includes(ext)) return 'video';
    if (audioExts.includes(ext)) return 'audio';
    return 'document';
}

function openEmojiPicker() {
    if (!isEmojiPickerOpen) {
        chatInput.blur();
        history.pushState({ modal: 'emojiPicker' }, '');
        emojiPicker.classList.add('active');
        stickerBtn.classList.add('active');
        isEmojiPickerOpen = true;
    }
}

function closeEmojiPicker(fromPopState = false) {
    if (isEmojiPickerOpen) {
        emojiPicker.classList.remove('active');
        stickerBtn.classList.remove('active');
        isEmojiPickerOpen = false;
        if (!fromPopState) history.back();
    }
}

window.addEventListener('popstate', (e) => {
    if (isEmojiPickerOpen) closeEmojiPicker(true);
    if (imageViewer && imageViewer.classList.contains('active')) closeImageViewer(true);
});

function renderEmojis(category) {
    emojiGrid.innerHTML = '';
    if (!emojis[category]) return; 
    emojis[category].forEach(emoji => {
        const el = document.createElement('div');
        el.className = 'emoji-item';
        el.textContent = emoji;
        onSafeClick(el, (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            chatInput.blur();
            chatInput.value += emoji;
        });
        emojiGrid.appendChild(el);
    });
}

function filterProfanity(text) {
    let result = text;
    for (let i = 0; i < badWordsList.length; i++) {
        let regex = new RegExp(badWordsList[i], 'gi');
        result = result.replace(regex, '***');
    }
    return result;
}

function handleReply(id) {
    const msg = messagesData.find(m => m.id === id);
    if (!msg) return;
    replyingToId = id;
    replyPreviewAuthor.textContent = msg.author;
    replyPreviewText.textContent = msg.isPoll ? '📊 ' + msg.pollData.question : (msg.fileData ? '📎 ' + msg.fileData.name : msg.text);
    replyPreviewContainer.style.display = 'flex';
    chatInput.focus();
}

function cancelReply() {
    replyingToId = null;
    replyPreviewContainer.style.display = 'none';
}

function scrollToMessage(id) {
    const el = document.getElementById('msg-' + id);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
        el.classList.add('highlight-msg');
        setTimeout(() => el.classList.remove('highlight-msg'), 1500);
    }
}

onSafeClick(chatAttachBtn, (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    chatFileInput.click();
});

chatFileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 100 * 1024 * 1024) {
        alert('Размер файла превышает лимит (100 МБ).');
        chatFileInput.value = '';
        return;
    }

    uploadModal.classList.add('active');
    uploadProgressBar.style.width = '0%';
    uploadPercent.textContent = '0%';

    const fileType = getFileType(file.name);
    
    const formData = new FormData();
    formData.append('file', file);
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://tmpfiles.org/api/v1/upload');

    xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            uploadProgressBar.style.width = percent + '%';
            uploadPercent.textContent = percent + '%';
        }
    };

    xhr.onload = () => {
        if (xhr.status === 200) {
            try {
                const res = JSON.parse(xhr.responseText);
                let rawUrl = res.data.url;
                let directHttpsUrl = rawUrl.replace('http://', 'https://').replace('tmpfiles.org/', 'tmpfiles.org/dl/');
                finishUpload(directHttpsUrl, file.name, fileType, formatBytes(file.size));
            } catch(e) {
                uploadModal.classList.remove('active');
                chatFileInput.value = '';
                alert('Сбой при конвертации ссылки.');
            }
        } else {
            uploadModal.classList.remove('active');
            chatFileInput.value = '';
            alert('Сервер отклонил файл.');
        }
    };

    xhr.onerror = () => {
        uploadModal.classList.remove('active');
        chatFileInput.value = '';
        alert('Ошибка сети.');
    };

    xhr.send(formData);
});

function finishUpload(url, name, type, size) {
    const text = chatInput.value.trim();
    const msgId = Date.now();
    const msgData = {
        id: msgId,
        type: 'user',
        author: currentUser,
        text: filterProfanity(text),
        isEdited: false,
        fileData: { url, name, type, size }
    };
    if (replyingToId) msgData.replyTo = replyingToId;
    set(ref(db, 'messages/' + msgId), msgData);
    uploadModal.classList.remove('active');
    chatFileInput.value = '';
    chatInput.value = '';
    cancelReply();
}

function openImageViewer(url) {
    viewerImg.src = url;
    imageViewer.classList.add('active');
    history.pushState({ modal: 'imageViewer' }, '');
}

function closeImageViewer(fromPopState = false) {
    if (imageViewer.classList.contains('active')) {
        imageViewer.classList.remove('active');
        setTimeout(() => { viewerImg.src = ''; }, 300);
        if (!fromPopState) history.back();
    }
}

if (imageViewer) {
    imageViewer.onclick = (e) => { 
        if (e.target === imageViewer) closeImageViewer(); 
    };
}

function handleSend() {
    closeEmojiPicker();
    chatInput.blur(); 
    if (!currentUser) return;
    const text = chatInput.value.trim();
    if (!text) return;
    const msgId = Date.now();
    const msgData = { id: msgId, type: 'user', author: currentUser, text: filterProfanity(text), isEdited: false };
    if (replyingToId) msgData.replyTo = replyingToId;
    set(ref(db, 'messages/' + msgId), msgData);
    chatInput.value = '';
    cancelReply();
}

function handleDelete(id) {
    remove(ref(db, 'messages/' + id));
    if (pinnedMessageId === id) set(ref(db, 'pinnedMessageId'), null);
}

function handleEdit(id) {
    const msg = messagesData.find(msg => msg.id === id);
    if (!msg || msg.isPoll) return;
    openModal('prompt_edit', msg.text, (newText) => {
        if (newText && newText !== msg.text) {
            update(ref(db, 'messages/' + id), { text: filterProfanity(newText), isEdited: true });
        }
    });
}

function handleToggleMod(nick) {
    if (moderators.includes(nick)) { moderators = moderators.filter(m => m !== nick); }
    else { moderators.push(nick); }
    localStorage.setItem('xenithos_mods', JSON.stringify(moderators));
    renderMessages();
}

function handlePin(id) { set(ref(db, 'pinnedMessageId'), id); }
function handleUnpin() { set(ref(db, 'pinnedMessageId'), null); }

function handleVote(msgId, optionIndex) {
    if (!currentUser) return;
    const msg = messagesData.find(msg => msg.id === msgId);
    if (!msg || !msg.isPoll) return;
    const poll = msg.pollData;
    poll.options.forEach(opt => {
        if (!opt.voters) opt.voters = [];
        opt.voters = opt.voters.filter(v => v !== currentUser);
    });
    if (!poll.options[optionIndex].voters) poll.options[optionIndex].voters = [];
    poll.options[optionIndex].voters.push(currentUser);
    update(ref(db, 'messages/' + msgId + '/pollData'), poll);
}

function updatePinnedMessageUI() {
    if (!pinnedMessageId) { pinnedMessageContainer.style.display = 'none'; return; }
    const pinnedMsg = messagesData.find(msg => msg.id === pinnedMessageId);
    if (!pinnedMsg) { pinnedMessageContainer.style.display = 'none'; return; }
    pinnedMessageContainer.style.display = 'flex';
    let previewText = pinnedMsg.isPoll ? '📊 ' + pinnedMsg.pollData.question : (pinnedMsg.fileData && !pinnedMsg.text ? '📎 ' + pinnedMsg.fileData.name : pinnedMsg.text);
    pinnedText.textContent = previewText;
    const role = getUserRole(currentUser);
    unpinBtn.style.display = (role === 'admin' || role === 'mod') ? 'flex' : 'none';
}

function renderMessages() {
    chatMessages.innerHTML = '';
    const myRole = getUserRole(currentUser);
    messagesData.forEach(msg => {
        if (msg.type === 'system') return;
        const isSelf = msg.author === currentUser;
        const authorRole = getUserRole(msg.author);
        const wrapper = document.createElement('div');
        wrapper.className = `msg-wrapper ${isSelf ? 'self' : 'other'}`;
        wrapper.id = 'msg-' + msg.id;
        const header = document.createElement('div');
        header.className = 'msg-header';
        const authorSpan = document.createElement('span');
        authorSpan.className = 'msg-author';
        authorSpan.textContent = msg.author;
        if (authorRole === 'admin') authorSpan.innerHTML += ` <span class="role-badge badge-admin">${translations[currentLang]['role_admin']}</span>`;
        else if (authorRole === 'mod') authorSpan.innerHTML += ` <span class="role-badge badge-mod">${translations[currentLang]['role_mod']}</span>`;
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'msg-actions';
        const repBtn = document.createElement('button');
        repBtn.className = 'action-btn';
        repBtn.innerHTML = replyIcon;
        repBtn.onclick = () => handleReply(msg.id);
        actionsDiv.appendChild(repBtn);
        if (myRole === 'admin' || myRole === 'mod') {
            const pinB = document.createElement('button');
            pinB.className = 'action-btn';
            pinB.innerHTML = pinIcon;
            pinB.onclick = () => handlePin(msg.id);
            actionsDiv.appendChild(pinB);
        }
        if (myRole === 'admin' && !isSelf && authorRole !== 'admin') {
            const modBtn = document.createElement('button');
            modBtn.className = 'action-btn';
            modBtn.innerHTML = modIcon;
            if(authorRole === 'mod') modBtn.style.color = '#ff5a3c';
            modBtn.onclick = () => handleToggleMod(msg.author);
            actionsDiv.appendChild(modBtn);
        }
        if (isSelf && !msg.isPoll) {
            const editBtn = document.createElement('button');
            editBtn.className = 'action-btn';
            editBtn.innerHTML = editIcon;
            editBtn.onclick = () => handleEdit(msg.id);
            actionsDiv.appendChild(editBtn);
        }
        if (isSelf || myRole === 'admin' || myRole === 'mod') {
            const delBtn = document.createElement('button');
            delBtn.className = 'action-btn';
            delBtn.innerHTML = deleteIcon;
            delBtn.onclick = () => handleDelete(msg.id);
            actionsDiv.appendChild(delBtn);
        }
        if (isSelf) { header.appendChild(actionsDiv); header.appendChild(authorSpan); }
        else { header.appendChild(authorSpan); header.appendChild(actionsDiv); }
        const textDiv = document.createElement('div');
        textDiv.className = 'chat-msg';
        if (msg.replyTo) {
            const originalMsg = messagesData.find(m => m.id === msg.replyTo);
            if (originalMsg) {
                const replyBlock = document.createElement('div');
                replyBlock.className = 'msg-reply-block';
                replyBlock.onclick = () => scrollToMessage(msg.replyTo);
                replyBlock.innerHTML = `<div class="msg-reply-author">${originalMsg.author}</div><div class="msg-reply-text">${originalMsg.isPoll ? '📊 ' + originalMsg.pollData.question : (originalMsg.fileData ? '📎 ' + originalMsg.fileData.name : originalMsg.text)}</div>`;
                textDiv.appendChild(replyBlock);
            }
        }
        if (msg.isPoll) {
            const pollCont = document.createElement('div');
            pollCont.className = 'poll-container';
            pollCont.innerHTML = `<div class="poll-question">${msg.pollData.question}</div>`;
            const totalVotes = msg.pollData.options.reduce((sum, opt) => sum + (opt.voters ? opt.voters.length : 0), 0);
            msg.pollData.options.forEach((opt, index) => {
                const voters = opt.voters || [];
                const isSelected = voters.includes(currentUser);
                const percent = totalVotes === 0 ? 0 : Math.round((voters.length / totalVotes) * 100);
                const optDiv = document.createElement('div');
                optDiv.className = 'poll-option';
                optDiv.innerHTML = `<div class="poll-progress-bar" style="width: ${percent}%"></div><div class="poll-radio ${isSelected ? 'selected' : ''}"></div><div class="poll-text">${opt.text}</div><div class="poll-percent">${percent}%</div>`;
                optDiv.onclick = () => handleVote(msg.id, index);
                pollCont.appendChild(optDiv);
            });
            textDiv.appendChild(pollCont);
        } else if (msg.fileData) {
            if (msg.text) { const t = document.createElement('div'); t.textContent = msg.text; textDiv.appendChild(t); }
            if (msg.fileData.type === 'image') { 
                const i = document.createElement('img'); 
                i.src = msg.fileData.url; 
                i.className = 'chat-img-attachment'; 
                i.referrerPolicy = "no-referrer";
                i.onclick = () => openImageViewer(msg.fileData.url); 
                textDiv.appendChild(i); 
            }
            else if (msg.fileData.type === 'video') { 
                const v = document.createElement('video'); 
                v.src = msg.fileData.url; 
                v.className = 'chat-video-attachment'; 
                v.controls = true; 
                v.preload = 'metadata';
                textDiv.appendChild(v); 
            }
            else if (msg.fileData.type === 'audio') { 
                const audioWrapper = document.createElement('div');
                audioWrapper.className = 'custom-audio-player';

                const playBtn = document.createElement('button');
                playBtn.className = 'audio-play-btn';
                playBtn.innerHTML = playIcon;

                const details = document.createElement('div');
                details.className = 'audio-details';

                const title = document.createElement('div');
                title.className = 'audio-title';
                title.textContent = msg.fileData.name;

                const track = document.createElement('div');
                track.className = 'audio-track';
                const progress = document.createElement('div');
                progress.className = 'audio-progress';
                track.appendChild(progress);

                const meta = document.createElement('div');
                meta.className = 'audio-meta';
                const timeDisplay = document.createElement('span');
                timeDisplay.className = 'audio-time';
                timeDisplay.textContent = '0:00 / 0:00';
                const sizeDisplay = document.createElement('span');
                sizeDisplay.className = 'audio-size';
                sizeDisplay.textContent = msg.fileData.size;

                meta.appendChild(timeDisplay);
                meta.appendChild(sizeDisplay);

                details.appendChild(title);
                details.appendChild(track);
                details.appendChild(meta);

                const audioEl = document.createElement('audio');
                audioEl.src = msg.fileData.url;
                audioEl.style.display = 'none';

                audioEl.addEventListener('loadedmetadata', () => {
                    timeDisplay.textContent = `0:00 / ${formatTime(audioEl.duration)}`;
                });

                audioEl.addEventListener('timeupdate', () => {
                    if (!isNaN(audioEl.duration) && audioEl.duration > 0) {
                        const pct = (audioEl.currentTime / audioEl.duration) * 100;
                        progress.style.width = pct + '%';
                        timeDisplay.textContent = `${formatTime(audioEl.currentTime)} / ${formatTime(audioEl.duration)}`;
                    }
                });

                audioEl.addEventListener('ended', () => {
                    playBtn.innerHTML = playIcon;
                    playBtn.classList.remove('playing');
                    progress.style.width = '0%';
                    currentPlayingAudio = null;
                    currentPlayBtn = null;
                    if(!isNaN(audioEl.duration)) {
                        timeDisplay.textContent = `0:00 / ${formatTime(audioEl.duration)}`;
                    }
                });

                playBtn.onclick = () => {
                    if (currentPlayingAudio && currentPlayingAudio !== audioEl) {
                        currentPlayingAudio.pause();
                        if(currentPlayBtn) {
                            currentPlayBtn.innerHTML = playIcon;
                            currentPlayBtn.classList.remove('playing');
                        }
                    }
                    
                    if (audioEl.paused) {
                        audioEl.play();
                        playBtn.innerHTML = pauseIcon;
                        playBtn.classList.add('playing');
                        currentPlayingAudio = audioEl;
                        currentPlayBtn = playBtn;
                    } else {
                        audioEl.pause();
                        playBtn.innerHTML = playIcon;
                        playBtn.classList.remove('playing');
                        currentPlayingAudio = null;
                        currentPlayBtn = null;
                    }
                };

                track.onclick = (e) => {
                    const rect = track.getBoundingClientRect();
                    const pct = (e.clientX - rect.left) / rect.width;
                    if(audioEl.duration) {
                        audioEl.currentTime = pct * audioEl.duration;
                    }
                };

                audioWrapper.appendChild(playBtn);
                audioWrapper.appendChild(details);
                audioWrapper.appendChild(audioEl);
                textDiv.appendChild(audioWrapper);
            } else { 
                const l = document.createElement('a'); 
                l.href = msg.fileData.url; 
                l.target = '_blank'; 
                l.download = msg.fileData.name; 
                l.className = 'chat-file-attachment'; 
                l.innerHTML = `${fileDocIcon}<div class="chat-file-info"><div class="chat-file-name">${msg.fileData.name}</div><div class="chat-file-size">${msg.fileData.size}</div></div>`; 
                textDiv.appendChild(l); 
            }
        } else { const t = document.createElement('div'); t.textContent = msg.text; textDiv.appendChild(t); }
        const metaDiv = document.createElement('div');
        metaDiv.className = 'msg-meta';
        if (msg.isEdited && !msg.isPoll) { const e = document.createElement('span'); e.className = 'msg-edited-tag'; e.textContent = translations[currentLang]['edited']; metaDiv.appendChild(e); }
        const timeSpan = document.createElement('span');
        timeSpan.className = 'msg-time';
        timeSpan.textContent = new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        metaDiv.appendChild(timeSpan);
        textDiv.appendChild(metaDiv);
        wrapper.appendChild(header);
        wrapper.appendChild(textDiv);
        chatMessages.appendChild(wrapper);
    });
}

btnBack.addEventListener('click', (e) => { if (e.cancelable) e.preventDefault(); smoothNavigate('index.html'); });
logoNav.addEventListener('click', (e) => { if (e.cancelable) e.preventDefault(); smoothNavigate('index.html'); });
document.getElementById('modal-btn-cancel').addEventListener('click', closeModal);
document.getElementById('modal-btn-confirm').addEventListener('click', () => { if (modalCallback) modalCallback(modalInput.value.trim()); closeModal(); });
chatSettingsBtn.addEventListener('click', () => { openModal('prompt_name', currentUser || '', (newNick) => { if (newNick && newNick !== currentUser) { currentUser = newNick; localStorage.setItem('xenithos_chat_user', currentUser); updateUIVisibility(); renderMessages(); scrollToBottom(); } }); });
emojiTabs.forEach(tab => { onSafeClick(tab, (e) => { if (e && e.stopPropagation) e.stopPropagation(); chatInput.blur(); emojiTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); renderEmojis(tab.getAttribute('data-category')); }); });
onSafeClick(stickerBtn, (e) => { if (e && e.stopPropagation) e.stopPropagation(); chatInput.blur(); if (isEmojiPickerOpen) { closeEmojiPicker(); } else { openEmojiPicker(); } });
document.addEventListener('mousedown', (e) => { if (!emojiPicker.contains(e.target) && !stickerBtn.contains(e.target)) { closeEmojiPicker(); } });
chatSend.addEventListener('touchstart', (e) => { if (e.cancelable) e.preventDefault(); handleSend(); }, { passive: false });
chatSend.addEventListener('mousedown', (e) => { if (e.cancelable) e.preventDefault(); handleSend(); });
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
window.addEventListener('resize', scrollToBottom);
chatInput.addEventListener('focus', () => { if (isEmojiPickerOpen) { closeEmojiPicker(); } setTimeout(scrollToBottom, 100); setTimeout(scrollToBottom, 300); });
unpinBtn.addEventListener('click', (e) => { if (e && e.stopPropagation) e.stopPropagation(); handleUnpin(); });
pinnedMessageContainer.addEventListener('click', () => { if (pinnedMessageId) scrollToMessage(pinnedMessageId); });
replyPreviewClose.addEventListener('click', cancelReply);
pollBtn.addEventListener('click', () => { pollModal.classList.add('active'); pollQuestionInput.value = ''; pollOptionsContainer.innerHTML = `<input type="text" class="poll-option-input" placeholder="Option 1" style="margin-bottom: 8px;"><input type="text" class="poll-option-input" placeholder="Option 2" style="margin-bottom: 8px;">`; });
document.getElementById('poll-btn-cancel').addEventListener('click', () => { pollModal.classList.remove('active'); });
pollAddOptionBtn.addEventListener('click', () => { const inputs = pollOptionsContainer.querySelectorAll('.poll-option-input'); if (inputs.length >= 10) return; const n = document.createElement('input'); n.type = 'text'; n.className = 'poll-option-input'; n.placeholder = `Option ${inputs.length + 1}`; n.style.marginBottom = '8px'; pollOptionsContainer.appendChild(n); });
document.getElementById('poll-btn-confirm').addEventListener('click', () => { const q = pollQuestionInput.value.trim(); if (!q) return; const inputs = pollOptionsContainer.querySelectorAll('.poll-option-input'); const ops = []; inputs.forEach(i => { const val = i.value.trim(); if (val) { ops.push({ text: filterProfanity(val) }); } }); if (ops.length < 2) return; const msgId = Date.now(); const msgData = { id: msgId, type: 'user', author: currentUser, text: filterProfanity(q), isEdited: false, isPoll: true, pollData: { question: filterProfanity(q), options: ops } }; if (replyingToId) { msgData.replyTo = replyingToId; } set(ref(db, 'messages/' + msgId), msgData); pollModal.classList.remove('active'); cancelReply(); });
updateLanguage(currentLang);
renderEmojis('smileys');
if (!currentUser) { setTimeout(() => { openModal('prompt_name', 'User' + Math.floor(Math.random() * 1000), (newNick) => { if (newNick) { currentUser = newNick; localStorage.setItem('xenithos_chat_user', currentUser); updateUIVisibility(); renderMessages(); scrollToBottom(); } }); }, 500); } else { updateUIVisibility(); }
