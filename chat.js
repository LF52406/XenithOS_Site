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
    people: ["👋","🤚","🖐","✋","🖖","👌","🤌","🤏","✌️","🤞","🫰","🤟","🤘","🤙","👈","👉","👆","🖕","👇","☝️","👍","👎","✊","👊","🤛","🤜","👏","🙌","👐","🤲","🤝","🙏","✍️","💅","🤳","💪","🦾","🦿","🦵","🦶","👂","🦻","👃","🫀","🫁","🧠","🦷","🦴","👀","👁","👅","👄","💋","🩸","👶","👧","🧒","👦","👩","🧑","👨","👩‍🦱","🧑‍🦱","👨‍🦱","👩‍🦰","🧑‍🦰","👨‍🦰","👱‍♀️","👱","👱‍♂️","👩‍🦳","🧑‍🦳","👨‍🦳","👩‍🦲","🧑‍🦲","👨‍🦲","🧔‍♀️","🧔","🧔‍♂️","👵","🧓","👴","👲","👳‍♀️","👳","👳‍♂️","🧕","👮‍♀️","👮","👮‍♂️","👷‍♀️","👷","👷‍♂️","💂‍♀️","💂","💂‍♂️","🕵️‍♀️","🕵️","🕵️‍♂️","👩‍⚕️","🧑‍⚕️","👨‍⚕️","👩‍🌾","🧑‍🌾","👨‍🌾","👩‍🍳","🧑‍🍳","👨‍🍳","👩‍🎓","🧑‍🎓","👨‍🎓","👩‍🎤","🧑‍🎤","👨‍🎤","👩‍🏫","🧑‍🏫","👨‍🏫","👩‍🏭","🧑‍🏭","👨‍🏭","👩‍💻","🧑‍💻","👨‍💻","👩‍💼","🧑‍💼","👨‍💼","👩‍🔧","🧑‍🔧","👨‍🔧","👩‍🔬","🧑‍🔬","👨‍🔬","👩‍🎨","🧑‍🎨","👨‍🎨","👩‍🚒","🧑‍🚒","👨‍🚒","👩‍✈️","🧑‍✈️","👨‍✈️","👩‍🚀","🧑‍🚀","👨‍🚀","👩‍⚖️","🧑‍⚖️","👨‍⚖️","👰‍♀️","👰","👰‍♂️","🤵‍♀️","🤵","🤵‍♂️","👸","🤴","🥷","🦸‍♀️","🦸","🦸‍♂️","🦹‍♀️","🦹","🦹‍♂️","🤶","🎅","🧙‍♀️","🧙","🧙‍♂️","🧝‍♀️","🧝","🧝‍♂️","🧛‍♀️","🧛","🧛‍♂️","🧟‍♀️","🧟","🧟‍♂️","🧞‍♀️","🧌","🧞","🧞‍♂️","🧜‍♀️","🧜","🧜‍♂️","🧚‍♀️","🧚","🧚‍♂️","👼","🤰","🫄","🤱","👩‍🍼","🧑‍🍼","👨‍🍼","🙇‍♀️","🙇","🙇‍♂️","💁‍♀️","💁","💁‍♂️","🙅‍♀️","🙅","🙅‍♂️","🙆‍♀️","🙆","🙆‍♂️","🙋‍♀️","🙋","🙋‍♂️","🧏‍♀️","🧏","🧏‍♂️","🤦‍♀️","🤦","🤦‍♂️","🤷‍♀️","🤷","🤷‍♂️","🙎‍♀️","🙎","🙎‍♂️","🙍‍♀️","🙍","🙍‍♂️","💇‍♀️","💇","💇‍♂️","💆‍♀️","💆","💆‍♂️","🧖‍♀️","💆","🧖‍♂️","💅","🤳","💃","🕺","👯‍♀️","👯","👯‍♂️","🕴‍♀️","🕴","🕴‍♂️","🚶‍♀️","🚶","🚶‍♂️","👩‍🦯","🧑‍🦯","👨‍🦯","🧎‍♀️","🧎","🧎‍♂️","🏃‍♀️","🏃","🏃‍♂️","👩‍🦼","🧑‍🦼","👨‍🦼","👩‍🦽","🧑‍🦽","👨‍🦽","🏃‍♀️","🏃","🏃‍♂️","🧍‍♀️","🧍","🧍‍♂️"],
    symbols: ["❤️","🧡","💛","💚","💙","💜","🖤","🤍","🤎","💔","❣️","💕","💞","💓","💗","💖","💘","💝","💟","☮️","✝️","☪️","🕉️","☸️","✡️","🔯","🕎","☯️","☦️","🛐","⛎","♈","♉","♊","♋","♌","♍","♎","♏","♐","♑","♒","♓","🆔","⚛️","🉑","☢️","☣️","📴","📳","🈶","🈚","🈸","🈺","🈷️","✴️","🆚","💮","🉐","㊙️","㊗️","🈴","🈵","🈹","🈲","🅰️","🅱️","🆎","🆑","🅾️","🆘","❌","⭕","🛑","⛔","📛","🚫","💯","💢","♨️","🚷","🚯","🚳","🚱","🔞","📵","🚭","❗","❕","❓","❔","‼️","⁉️","🔅","🔆","〽️","⚠️","🚸","🔱","⚜️","🔰","♻️","✅","🈯","💹","❇️","✳️","❎","🌐","💠","Ⓜ️","🌀","💤","🏧","🚾","♿","🅿️","🈳","🈂️","🛂","🛃","🛄","🛅","🚹","🚺","🚼","🚻","🚮","🎦","📶","🈁","🔣","ℹ️","🔤","🔡","🔠","🆖","🆗","🆙","🆒","🆕","🆓","0️⃣","1️⃣","2️⃣","3️⃣","4️⃣","5️⃣","6️⃣","7️⃣","8️⃣","9️⃣","🔟","🔢","#️⃣","*️⃣","⏏️","▶️","⏸️","⏯️","⏹️","⏺️","⏭️","⏮️","⏩","⏪","⏫","⏬","◀️","🔼","🔽","➡️","⬅️","⬆️","⬇️","↗️","↘️","↙️","↖️","↕️","↔️","↪️","↩️","⤴️","⤵️","🔀","🔁","🔂","🔄","🔃","🎵","🎶","➕","➖","➗","✖️","♾️","💲","💱","™️","©️","®️","〰️","➰","➿","🔚","🔙","🔛","🔝","🔜","✔️","☑️","🔘","🔴","🟠","🟡","🟢","🔵","🟣","⚫","⚪","🟤","🔺","🔻","🔸","🔹","🔶","🔷","🔳","🔲","▪️","▫️","◾","◽","◼️","◻️","⬛","⬜","🟥","🟧","🟨","🟩","🟦","🟪","🟫","🔈","🔇","🔉","🔊","🔔","🔕","📣","📢","👁️‍🗨️","💬","💭","🗯️","♠️","♣️","♥️","♦️","🃏","🎴","🀄","🕐","🕑","🕒","🕓","🕔","🕕","🕖","🕗","🕘","🕙","🕚","🕛","🕜","🕝","🕞","🕟","🕠","🕡","🕢","🕣","🕤","🕥","🕦","🕧"]
};

const badWordsList = ['мат1', 'мат2', 'дурак', 'идиот', 'блин'];
const editIcon = `<svg viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`;
const deleteIcon = `<svg viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`;
const modIcon = `<svg viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>`;
const pinIcon = `<svg viewBox="0 0 24 24"><path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z"/></svg>`;
const ADMIN_NICK = 'LF5';

const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const stickerBtn = document.getElementById('chat-sticker-btn');
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

let currentLang = localStorage.getItem('xenithos_lang') || 'ru';
let currentUser = localStorage.getItem('xenithos_chat_user');
let moderators = JSON.parse(localStorage.getItem('xenithos_mods') || '[]');
let messagesData = [];
let pinnedMessageId = null;
let modalCallback = null;
let isEmojiPickerOpen = false;

onValue(ref(db, 'messages'), (snapshot) => {
    const data = snapshot.val() || {};
    messagesData = Object.values(data).sort((a, b) => a.id - b.id);
    renderMessages();
    updatePinnedMessageUI();
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
    renderMessages(); 
    updatePinnedMessageUI();
}

function smoothNavigate(url) {
    const page = document.getElementById('chat-page');
    page.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    page.style.opacity = '0';
    page.style.transform = 'translateY(10px)';
    setTimeout(() => { window.location.href = url; }, 300);
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
    let startX = 0, startY = 0, isScrolling = false;
    element.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX; startY = e.touches[0].clientY; isScrolling = false;
    }, { passive: true });
    element.addEventListener('touchmove', (e) => {
        if (Math.abs(e.touches[0].clientX - startX) > 10 || Math.abs(e.touches[0].clientY - startY) > 10) isScrolling = true;
    }, { passive: true });
    element.addEventListener('touchend', (e) => {
        if (!isScrolling) { if (e.cancelable) e.preventDefault(); callback(e); }
    });
    element.addEventListener('click', (e) => { callback(e); });
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

window.addEventListener('popstate', (e) => { if (isEmojiPickerOpen) closeEmojiPicker(true); });

function renderEmojis(category) {
    emojiGrid.innerHTML = '';
    if (!emojis[category]) return; 
    emojis[category].forEach(emoji => {
        const el = document.createElement('div');
        el.className = 'emoji-item';
        el.textContent = emoji;
        onSafeClick(el, (e) => {
            if (e && e.stopPropagation) e.stopPropagation();
            chatInput.blur(); chatInput.value += emoji;
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

function handleSend() {
    closeEmojiPicker();
    chatInput.blur(); 
    if (!currentUser) return;
    const text = chatInput.value.trim();
    if (!text) return;
    const msgId = Date.now();
    set(ref(db, 'messages/' + msgId), {
        id: msgId, type: 'user', author: currentUser, text: filterProfanity(text), isEdited: false
    });
    chatInput.value = '';
}

function handleDelete(id) {
    remove(ref(db, 'messages/' + id));
    if (pinnedMessageId === id) set(ref(db, 'pinnedMessageId'), null);
}

function handleEdit(id) {
    const msgIndex = messagesData.findIndex(msg => msg.id === id);
    if (msgIndex === -1 || messagesData[msgIndex].isPoll) return;
    openModal('prompt_edit', messagesData[msgIndex].text, (newText) => {
        if (newText && newText !== messagesData[msgIndex].text) {
            update(ref(db, 'messages/' + id), { text: filterProfanity(newText), isEdited: true });
        }
    });
}

function handleToggleMod(nick) {
    if (moderators.includes(nick)) moderators = moderators.filter(m => m !== nick);
    else moderators.push(nick);
    localStorage.setItem('xenithos_mods', JSON.stringify(moderators));
    renderMessages();
}

function handlePin(id) { set(ref(db, 'pinnedMessageId'), id); }
function handleUnpin() { set(ref(db, 'pinnedMessageId'), null); }

function handleVote(msgId, optionIndex) {
    if (!currentUser) return;
    const msgIndex = messagesData.findIndex(msg => msg.id === msgId);
    if (msgIndex === -1 || !messagesData[msgIndex].isPoll) return;
    const poll = messagesData[msgIndex].pollData;
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
    let previewText = pinnedMsg.isPoll ? '📊 ' + pinnedMsg.pollData.question : pinnedMsg.text;
    pinnedText.textContent = previewText;
    const role = getUserRole(currentUser);
    unpinBtn.style.display = (role === 'admin' || role === 'mod') ? 'flex' : 'none';
}

function renderMessages() {
    chatMessages.innerHTML = '';
    const myRole = getUserRole(currentUser);
    messagesData.forEach(msg => {
        if (msg.type === 'system') return;
        const isSelf = msg.author === currentUser, authorRole = getUserRole(msg.author);
        const canEdit = isSelf && !msg.isPoll, canDelete = isSelf || myRole === 'admin' || myRole === 'mod';
        const canPin = myRole === 'admin' || myRole === 'mod', canToggleMod = myRole === 'admin' && !isSelf && authorRole !== 'admin';
        const wrapper = document.createElement('div'); wrapper.className = `msg-wrapper ${isSelf ? 'self' : 'other'}`;
        const header = document.createElement('div'); header.className = 'msg-header';
        const authorSpan = document.createElement('span'); authorSpan.className = 'msg-author'; authorSpan.textContent = msg.author;
        if (authorRole === 'admin') authorSpan.innerHTML += ` <span class="role-badge badge-admin">${translations[currentLang]['role_admin']}</span>`;
        else if (authorRole === 'mod') authorSpan.innerHTML += ` <span class="role-badge badge-mod">${translations[currentLang]['role_mod']}</span>`;
        const actionsDiv = document.createElement('div'); actionsDiv.className = 'msg-actions';
        if (canPin) {
            const btn = document.createElement('button'); btn.className = 'action-btn'; btn.innerHTML = pinIcon; btn.onclick = () => handlePin(msg.id); actionsDiv.appendChild(btn);
        }
        if (canToggleMod) {
            const btn = document.createElement('button'); btn.className = 'action-btn'; btn.innerHTML = modIcon; if(authorRole === 'mod') btn.style.color = '#ff5a3c'; btn.onclick = () => handleToggleMod(msg.author); actionsDiv.appendChild(btn);
        }
        if (canEdit) {
            const btn = document.createElement('button'); btn.className = 'action-btn'; btn.innerHTML = editIcon; btn.onclick = () => handleEdit(msg.id); actionsDiv.appendChild(btn);
        }
        if (canDelete) {
            const btn = document.createElement('button'); btn.className = 'action-btn'; btn.innerHTML = deleteIcon; btn.onclick = () => handleDelete(msg.id); actionsDiv.appendChild(btn);
        }
        if (isSelf) { header.appendChild(actionsDiv); header.appendChild(authorSpan); } else { header.appendChild(authorSpan); header.appendChild(actionsDiv); }
        const textDiv = document.createElement('div'); textDiv.className = 'chat-msg';
        if (msg.isPoll) {
            const pollCont = document.createElement('div'); pollCont.className = 'poll-container';
            const qDiv = document.createElement('div'); qDiv.className = 'poll-question'; qDiv.textContent = msg.pollData.question; pollCont.appendChild(qDiv);
            const totalVotes = msg.pollData.options.reduce((sum, opt) => sum + (opt.voters ? opt.voters.length : 0), 0);
            msg.pollData.options.forEach((opt, index) => {
                const optDiv = document.createElement('div'); optDiv.className = 'poll-option';
                const voters = opt.voters || [], isSelected = voters.includes(currentUser), percent = totalVotes === 0 ? 0 : Math.round((voters.length / totalVotes) * 100);
                optDiv.innerHTML = `<div class="poll-progress-bar" style="width: ${percent}%"></div><div class="poll-radio ${isSelected ? 'selected' : ''}"></div><div class="poll-text">${opt.text}</div><div class="poll-percent">${percent}%</div>`;
                optDiv.onclick = () => handleVote(msg.id, index); pollCont.appendChild(optDiv);
            });
            textDiv.appendChild(pollCont);
        } else {
            const cDiv = document.createElement('div'); cDiv.textContent = msg.text; textDiv.appendChild(cDiv);
        }
        const metaDiv = document.createElement('div'); metaDiv.className = 'msg-meta';
        if (msg.isEdited && !msg.isPoll) {
            const tag = document.createElement('span'); tag.className = 'msg-edited-tag'; tag.textContent = translations[currentLang]['edited']; metaDiv.appendChild(tag);
        }
        const timeSpan = document.createElement('span'); timeSpan.className = 'msg-time'; timeSpan.textContent = new Date(msg.id).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        metaDiv.appendChild(timeSpan); textDiv.appendChild(metaDiv); wrapper.appendChild(header); wrapper.appendChild(textDiv); chatMessages.appendChild(wrapper);
    });
    scrollToBottom();
}

btnBack.addEventListener('click', (e) => { if (e.cancelable) e.preventDefault(); smoothNavigate('index.html'); });
logoNav.addEventListener('click', (e) => { if (e.cancelable) e.preventDefault(); smoothNavigate('index.html'); });
document.getElementById('modal-btn-cancel').addEventListener('click', closeModal);
document.getElementById('modal-btn-confirm').addEventListener('click', () => { if (modalCallback) modalCallback(modalInput.value.trim()); closeModal(); });
modalInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') { if (modalCallback) modalCallback(modalInput.value.trim()); closeModal(); } });
chatSettingsBtn.addEventListener('click', () => {
    openModal('prompt_name', currentUser || '', (newNick) => { if (newNick && newNick !== currentUser) { currentUser = newNick; localStorage.setItem('xenithos_chat_user', currentUser); updateUIVisibility(); renderMessages(); } });
});
emojiTabs.forEach(tab => {
    onSafeClick(tab, (e) => { if (e && e.stopPropagation) e.stopPropagation(); chatInput.blur(); emojiTabs.forEach(t => t.classList.remove('active')); tab.classList.add('active'); renderEmojis(tab.getAttribute('data-category')); });
});
onSafeClick(stickerBtn, (e) => { if (e && e.stopPropagation) e.stopPropagation(); chatInput.blur(); if (isEmojiPickerOpen) closeEmojiPicker(); else openEmojiPicker(); });
document.addEventListener('mousedown', (e) => { if (!emojiPicker.contains(e.target) && !stickerBtn.contains(e.target)) closeEmojiPicker(); });
document.addEventListener('touchstart', (e) => { if (!emojiPicker.contains(e.target) && !stickerBtn.contains(e.target)) closeEmojiPicker(); }, { passive: true });
chatSend.addEventListener('touchstart', (e) => { if (e.cancelable) e.preventDefault(); handleSend(); }, { passive: false });
chatSend.addEventListener('mousedown', (e) => { if (e.cancelable) e.preventDefault(); handleSend(); });
chatInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
window.addEventListener('resize', scrollToBottom);
chatInput.addEventListener('focus', () => { if (isEmojiPickerOpen) closeEmojiPicker(); setTimeout(scrollToBottom, 100); setTimeout(scrollToBottom, 300); });
unpinBtn.addEventListener('click', handleUnpin);
pollBtn.addEventListener('click', () => {
    pollModal.classList.add('active'); pollQuestionInput.value = '';
    pollOptionsContainer.innerHTML = `<input type="text" class="poll-option-input" placeholder="Option 1" style="margin-bottom: 8px;"><input type="text" class="poll-option-input" placeholder="Option 2" style="margin-bottom: 8px;">`;
});
document.getElementById('poll-btn-cancel').addEventListener('click', () => { pollModal.classList.remove('active'); });
pollAddOptionBtn.addEventListener('click', () => {
    const inputs = pollOptionsContainer.querySelectorAll('.poll-option-input');
    if (inputs.length >= 10) return;
    const i = document.createElement('input'); i.type = 'text'; i.className = 'poll-option-input'; i.placeholder = `Option ${inputs.length + 1}`; i.style.marginBottom = '8px'; pollOptionsContainer.appendChild(i);
});
document.getElementById('poll-btn-confirm').addEventListener('click', () => {
    const q = pollQuestionInput.value.trim(); if (!q) return;
    const inputs = pollOptionsContainer.querySelectorAll('.poll-option-input'), options = [];
    inputs.forEach(input => { const v = input.value.trim(); if (v) options.push({ text: filterProfanity(v) }); });
    if (options.length < 2) return; 
    const id = Date.now();
    set(ref(db, 'messages/' + id), { id, type: 'user', author: currentUser, text: filterProfanity(q), isEdited: false, isPoll: true, pollData: { question: filterProfanity(q), options } });
    pollModal.classList.remove('active');
});
updateLanguage(currentLang);
renderEmojis('smileys');
if (!currentUser) {
    setTimeout(() => { openModal('prompt_name', 'User' + Math.floor(Math.random() * 1000), (new) => { if (new) { currentUser = new; localStorage.setItem('xenithos_chat_user', currentUser); updateUIVisibility(); renderMessages(); } }); }, 500);
} else { updateUIVisibility(); }
