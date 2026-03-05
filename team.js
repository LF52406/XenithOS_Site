const teamMembers = [
    {
        name: "Каран Парашар",
        role: {
            en: "Co-founder of XenithOS; Porsche maintainer",
            ru: "Соучредитель XenithOS; специалист по обслуживанию Porsche",
            uk: "Співзасновник XenithOS; спеціаліст з обслуговування Porsche"
        },
        quote: "Никаких оправданий!",
        avatar: "https://ui-avatars.com/api/?name=KP&background=9632ff&color=fff&size=150&bold=true",
        socials: {
            telegram: "https://t.me/",
            github: "https://github.com/",
            website: "#"
        }
    },
    {
        name: "Арийский",
        role: {
            en: "Core Contributor; responsible for maintaining sweet, davinci, kiev and martini.",
            ru: "Основной участник; ответственный за поддержку sweet, davinci, kiev и martini.",
            uk: "Основний учасник; відповідальний за підтримку sweet, davinci, kiev та martini."
        },
        quote: "git gud",
        avatar: "https://ui-avatars.com/api/?name=AR&background=2882ff&color=fff&size=150&bold=true",
        socials: {
            telegram: "https://t.me/",
            github: "https://github.com/",
            website: ""
        }
    },
    {
        name: "LF5",
        role: {
            en: "Lead Developer & UI/UX Designer",
            ru: "Главный разработчик и UI/UX дизайнер",
            uk: "Головний розробник та UI/UX дизайнер"
        },
        quote: "Perfection is not a destination, it's a journey.",
        avatar: "https://ui-avatars.com/api/?name=LF&background=ff5a3c&color=fff&size=150&bold=true",
        socials: {
            telegram: "https://t.me/",
            github: "https://github.com/lf52406",
            website: ""
        }
    }
];

const translations = {
    en: {
        "team_title": "Our Team",
        "team_desc": "These are the people who play a vital role in maintaining XenithOS, from day-to-day operations to monthly updates."
    },
    ru: {
        "team_title": "Наша команда",
        "team_desc": "Это люди, которые играют важную роль в поддержке XenithOS, начиная с повседневной работы и заканчивая ежемесячными обновлениями."
    },
    uk: {
        "team_title": "Наша команда",
        "team_desc": "Це люди, які відіграють важливу роль у підтримці XenithOS, починаючи від повсякденної роботи і закінчуючи щомісячними оновленнями."
    }
};

const icons = {
    telegram: `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.29-.48.79-.74 3.08-1.34 5.15-2.23 6.19-2.66 2.95-1.23 3.56-1.44 3.96-1.45.09 0 .28.02.4.1.11.07.19.18.21.31.02.08.03.22.02.32z"/></svg>`,
    github: `<svg viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>`,
    website: `<svg viewBox="0 0 24 24"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>`
};

let currentLang = localStorage.getItem('xenithos_lang') || 'ru';

function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerHTML = translations[lang][key];
    });
    renderTeam();
}

function smoothNavigate(url) {
    const page = document.getElementById('team-page');
    page.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    page.style.opacity = '0';
    page.style.transform = 'translateY(10px)';
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

function renderTeam() {
    const container = document.getElementById('team-container');
    container.innerHTML = '';

    teamMembers.forEach((member, index) => {
        const delay = index * 0.1;
        const card = document.createElement('div');
        card.className = 'team-card';
        card.style.animationDelay = `${delay}s`;

        const roleText = member.role[currentLang] || member.role.en;

        let socialsHTML = '';
        if (member.socials.telegram) {
            socialsHTML += `<a href="${member.socials.telegram}" target="_blank" class="social-btn">${icons.telegram}</a>`;
        }
        if (member.socials.github) {
            socialsHTML += `<a href="${member.socials.github}" target="_blank" class="social-btn">${icons.github}</a>`;
        }
        if (member.socials.website) {
            socialsHTML += `<a href="${member.socials.website}" target="_blank" class="social-btn">${icons.website}</a>`;
        }

        card.innerHTML = `
            <div class="card-top">
                <img src="${member.avatar}" alt="${member.name}" class="card-avatar">
                <div class="card-info">
                    <div class="card-name">${member.name}</div>
                    <div class="card-role">${roleText}</div>
                    ${socialsHTML ? `<div class="card-socials">${socialsHTML}</div>` : ''}
                </div>
            </div>
            ${member.quote ? `
                <div class="card-divider"></div>
                <div class="card-quote">${member.quote}</div>
            ` : ''}
        `;

        container.appendChild(card);
    });
}

document.getElementById('btn-back').addEventListener('click', (e) => {
    if (e.cancelable) e.preventDefault();
    smoothNavigate('index.html');
});

updateLanguage(currentLang);
