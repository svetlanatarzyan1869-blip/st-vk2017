/* ============================================================================
 * ВКонтакте 2017 🌓 — расширение SillyTavern (порт плагина «Тема ВК 🌓» из Tavo)
 * 1) Кнопка «Тёмная тема ВК» в меню ✨ (волшебная палочка у поля ввода):
 *    ставит <html data-vk-theme="dark">. Тема «ВКонтакте 2017» по этой пометке
 *    перекрашивается целиком, плашки пресета и «Подслушано» — тоже.
 *    В отличие от Tavo, копировать CSS в сообщения не нужно: у таверны нет iframe
 *    на каждое сообщение. Плашки в iframe Tavern Helper сами читают пометку.
 * 2) «печатает» над полем ввода, пока бот пишет ответ.
 * 3) Кнопки в «Настройках пользователя»: светлая/тёмная, редактор, «Обновить тему» (с перезагрузкой).
 * Всё работает только когда включена тема «ВКонтакте 2017» (узнаём по --vk-text).
 * ========================================================================== */
import { createEditor, textDefault } from './editor.js';

const MODULE = 'vk2017';
const VERSION = '1.10.1';
const ATTR = 'data-vk-theme';
const THEME_NAME = 'ВКонтакте 2017';
const SELECT_FLAG = 'vk2017_select_theme'; // после установки темы и перезагрузки — выбрать её
const BASE = new URL('.', import.meta.url).href;

/* ── стикеры Спотти для плашек ВК ──
   Плашка в сообщении больше не тащит набор base64 (было до 47 КБ на сообщение) — она
   берёт картинки из window.__VK2017_STK. Кладём набор на страницу как можно раньше:
   сначала из localStorage, потом обновляем с воркера (там же запасной источник для плашки). */
const STK_URL = 'https://podslushano-album.spletnik-meme-worker.workers.dev/stk/all.json';
const STK_LS = 'vk2017_stickers_v1';
try {
    const cached = localStorage.getItem(STK_LS);
    if (cached) window.__VK2017_STK = JSON.parse(cached);
} catch (e) { /* нет кэша — возьмём с воркера */ }
(async () => {
    try {
        const r = await fetch(STK_URL, { cache: 'force-cache' });
        if (!r.ok) return;
        const map = await r.json();
        if (map && typeof map === 'object') {
            window.__VK2017_STK = map;
            try { localStorage.setItem(STK_LS, JSON.stringify(map)); } catch (e) { /* переполнено — не страшно */ }
        }
    } catch (e) { /* без сети плашки возьмут кэш или воркер позже */ }
})();

function ctx() { return SillyTavern.getContext(); }

function settings() {
    const all = ctx().extensionSettings;
    if (!all[MODULE]) all[MODULE] = {};
    const s = all[MODULE];
    if (typeof s.dark !== 'boolean') s.dark = false;
    if (typeof s.typing !== 'boolean') s.typing = true;
    return s;
}

function themeActive() {
    return getComputedStyle(document.documentElement).getPropertyValue('--vk-text').trim() !== '';
}

function toast(msg, kind = 'info') {
    try { toastr[kind](msg); } catch (e) { console.log('[vk2017]', msg); }
}

/* ── тёмная / светлая ── */
function applyDark() {
    const dark = settings().dark;
    if (dark) document.documentElement.setAttribute(ATTR, 'dark');
    else document.documentElement.removeAttribute(ATTR);
    $('#vk2017_menu_label').text(dark ? 'Светлая тема ВК' : 'Тёмная тема ВК');
    $('#vk2017_dark_label').text(dark ? 'Светлая' : 'Тёмная');
}

/* ── плашки пресета: рисуем их сами, без окошек ──
   Раньше плашка отдавалась блоком ```html и Tavern Helper заводил на КАЖДУЮ свой iframe:
   в чате на 500 сообщений это сотня окошек, чат открывался очень долго. Теперь регекс даёт
   обычную разметку с пометкой data-vkp, а стиль и код плашек лежат общие на странице.
   Берём их с воркера и держим копию в localStorage — со второго раза без сети. */
const PLQ_BASE = 'https://podslushano-album.spletnik-meme-worker.workers.dev/plq/';
const PLQ_LS = 'vk2017_plaques_code_v1';
const STK_BASE = 'https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';

function plqApply(css, js) {
    let style = document.getElementById('vk2017-plaques-css');
    if (!style) {
        style = document.createElement('style');
        style.id = 'vk2017-plaques-css';
        document.head.appendChild(style);
    }
    if (style.textContent !== css) style.textContent = css;
    if (!window.__VK2017_PLQ) {
        try { (0, eval)(js); } catch (e) { console.warn('[vk2017] код плашек не выполнился', e); }
    }
}

async function loadPlaqueCode() {
    try {
        const cached = JSON.parse(localStorage.getItem(PLQ_LS) || 'null');
        if (cached && cached.css && cached.js) { plqApply(cached.css, cached.js); paintPlaques(); }
    } catch (e) { /* нет копии — возьмём с воркера */ }
    try {
        const [css, js] = await Promise.all([
            fetch(PLQ_BASE + 'plaques.css', { cache: 'no-cache' }).then(r => (r.ok ? r.text() : null)),
            fetch(PLQ_BASE + 'plaques.js', { cache: 'no-cache' }).then(r => (r.ok ? r.text() : null)),
        ]);
        if (css && js) {
            plqApply(css, js);
            try { localStorage.setItem(PLQ_LS, JSON.stringify({ css, js })); } catch (e) { /* не влезло */ }
        }
    } catch (e) { /* без сети остаётся копия из localStorage */ }
    paintPlaques();
}

/* Таверна переименовывает классы в сообщениях: class="hud-widget" → "custom-hud-widget".
   Возвращаем исходные имена, чтобы общий стиль и код плашек работали как есть. */
function plqUnprefix(root) {
    const all = [root].concat(Array.from(root.querySelectorAll('[class]')));
    for (const el of all) {
        if (!el.classList || !el.classList.length) continue;
        const add = [];
        el.classList.forEach(c => {
            if (c.indexOf('custom-') === 0) {
                const name = c.slice(7);
                if (name && !el.classList.contains(name)) add.push(name);
            }
        });
        if (add.length) el.classList.add(...add);
    }
}

function paintPlaques(scope) {
    if (!window.__VK2017_PLQ) return;
    const root = scope || document.getElementById('chat');
    if (!root) return;
    const nodes = root.querySelectorAll('[data-vkp]:not([data-vkp-done])');
    for (const el of nodes) {
        el.setAttribute('data-vkp-done', '1');
        try {
            plqUnprefix(el);
            const stk = window.__VK2017_STK || {};
            el.querySelectorAll('img[data-vks]').forEach(im => {
                const n = im.getAttribute('data-vks');
                if (n && !im.getAttribute('src')) im.src = stk[n] || (STK_BASE + n + '.webp');
            });
            const fn = window.__VK2017_PLQ[el.getAttribute('data-vkp')];
            if (typeof fn === 'function') fn(el);
        } catch (e) { console.warn('[vk2017] плашка не нарисовалась', e); }
    }
}

/* ── сколько диалогов на стартовом экране ──
   Таверна по умолчанию показывает три последних чата, а кнопку с этой настройкой
   тема прячет (она выбивается из вида ВК). Ставим больше — один раз, дальше не трогаем. */
function ensureRecentChats() {
    const as = ctx().accountStorage;
    if (!as || typeof as.getItem !== 'function') return;
    let cur = null;
    try { cur = JSON.parse(as.getItem('recentChatsSettings') || 'null'); } catch (e) { /* испорчено — перезапишем */ }
    if (cur && cur.vk2017) return;
    try {
        as.setItem('recentChatsSettings', JSON.stringify({ maxDisplayed: 20, collapsedDisplayed: 20, vk2017: 1 }));
    } catch (e) { /* не вышло — останется как было */ }
}

/* ── редактор темы на экране (editor.js) ── */
const editor = createEditor({
    getSettings: settings,
    save: () => ctx().saveSettingsDebounced(),
    isDark: () => settings().dark,
    toast: msg => toast(msg),
    toggleDark: () => toggleDark(),
    updateTheme: () => updateTheme(),
});

function typingText() {
    const custom = settings().custom && settings().custom.texts && settings().custom.texts.typing;
    return String(custom || textDefault('typing')).replace(/[.…\s]+$/, '');
}

/* ── экран загрузки без моргания ──
   Пометку тёмной темы расширение ставит поздно: до этого заставка успевала побыть светлой.
   CSS темы таверна применяет раньше расширений, поэтому в тёмном режиме дописываем в него
   тёмный фон заставки (в конце, после метки). В файл темы это не попадает. */
const MODE_MARK = '/* vk2017-mode: тёмная заставка, ставит расширение */';
const DARK_LOADER_CSS =
    '#preloader, dialog.popup:has(#loader), dialog.popup:has(#loader)::backdrop { background: #0f0f10 !important; }\n' +
    '#loader .splash-message { color: #76787a !important; }';
function stripMode(css) {
    const i = String(css || '').indexOf('\n' + MODE_MARK);
    return i < 0 ? String(css || '') : String(css).slice(0, i);
}
function writeModeBlock() {
    const c = ctx();
    const pu = c.powerUserSettings;
    if (!pu || pu.theme !== THEME_NAME) return;
    const base = stripMode(pu.custom_css);
    const next = settings().dark ? base + '\n' + MODE_MARK + '\n' + DARK_LOADER_CSS : base;
    if (next === pu.custom_css) return;
    pu.custom_css = next;
    $('#customCSS').val(next);
    const style = document.getElementById('custom-style');
    if (style) style.innerHTML = next;
    c.saveSettingsDebounced();
}

function toggleDark() {
    const s = settings();
    s.dark = !s.dark;
    applyDark();
    editor.refresh();
    writeModeBlock();
    ctx().saveSettingsDebounced();
    if (!themeActive()) toast('Пометка переключена, но тема «ВКонтакте 2017» сейчас не выбрана — цвета не изменятся.', 'warning');
    else toast(s.dark ? '🌙 Тёмная тема ВК' : '☀️ Светлая тема ВК');
}

/* ── «печатает» ── */
let typingEl = null;
function typingShow(type, options, dryRun) {
    if (dryRun || type === 'quiet') return;
    if (!settings().typing || !themeActive()) return;
    // шапка диалога уже пишет «печатает» — вторую надпись над полем ввода не показываем
    if (headEl && !headEl.hidden) return;
    const form = document.getElementById('send_form');
    if (!form) return;
    if (!typingEl || !document.body.contains(typingEl)) {
        typingEl = document.createElement('div');
        typingEl.id = 'vk2017-typing';
        typingEl.innerHTML = '<span class="vk2017-who"></span><span class="vk2017-dots" aria-hidden="true"><i></i><i></i><i></i></span>';
        form.parentNode.insertBefore(typingEl, form);
    }
    const name = ctx().groupId ? '' : (ctx().name2 || '');
    typingEl.querySelector('.vk2017-who').textContent = (name ? name + ' ' : '') + typingText();
    typingEl.hidden = false;
}
function typingHide() { if (typingEl) typingEl.hidden = true; }

/* ── тема обновляется сама ──
   Таверна хранит CSS выбранной темы в своих настройках и не перечитывает файл темы.
   После обновления расширения там оставалась старая версия, пока не нажать «Установить тему».
   Теперь при загрузке сверяем: если выбрана «ВКонтакте 2017» и её CSS устарел — подставляем новый. */
let themeSynced = false;
async function syncThemeFromExtension() {
    if (themeSynced) return;
    const c = ctx();
    const pu = c.powerUserSettings;
    if (!pu || pu.theme !== THEME_NAME) return;
    try {
        const r = await fetch(BASE + 'theme/vk2017.json', { cache: 'no-store' });
        if (!r.ok) return;
        const theme = await r.json();
        const css = String(theme.custom_css || '');
        themeSynced = true;
        if (!css || stripMode(pu.custom_css) === css) { writeModeBlock(); return; }
        pu.custom_css = css;
        $('#customCSS').val(css);
        let style = document.getElementById('custom-style');
        if (!style) {
            style = document.createElement('style');
            style.id = 'custom-style';
            document.head.appendChild(style);
        }
        style.innerHTML = css;
        // и файл темы в таверне — чтобы при следующем выборе темы не вернулась старая
        theme.name = THEME_NAME;
        fetch('/api/themes/save', { method: 'POST', headers: c.getRequestHeaders(), body: JSON.stringify(theme) }).catch(() => {});
        writeModeBlock();
        c.saveSettingsDebounced();
        editor.apply();
        refreshState();
        updateHead();
        toast('Тема «' + THEME_NAME + '» обновилась до версии расширения ' + VERSION);
        console.log('[vk2017] тема обновлена из расширения');
    } catch (e) { /* не вышло — останется «Установить тему» */ }
}

/* ── плашки пресета в оформлении ВК ──
   Регексы пресета таверна берёт из копии в своих настройках, а не из файла пресета.
   Оформление ВК лежит у пользователя в /user/files/vk2017-plaques.json (в код расширения
   не входит — это чужие плашки). Сопоставляем по шаблону поиска и меняем только оформление. */
let plaquesSynced = false;
async function syncPlaques() {
    if (plaquesSynced) return;
    plaquesSynced = true;
    const c = ctx();
    let data;
    try {
        const r = await fetch('/user/files/vk2017-plaques.json', { cache: 'no-store' });
        if (!r.ok) return;
        data = await r.json();
    } catch (e) { return; }
    const plaques = Array.isArray(data && data.plaques) ? data.plaques : [];
    if (!plaques.length || typeof c.getPresetManager !== 'function') return;
    const pm = c.getPresetManager('openai');
    if (!pm) return;
    const scripts = pm.readPresetExtensionField({ path: 'regex_scripts' });
    if (!Array.isArray(scripts) || !scripts.length) return;
    let changed = 0;
    const next = scripts.map(sc => {
        const vk = plaques.find(x => x.findRegex === sc.findRegex);
        if (!vk || sc.replaceString === vk.replaceString) return sc;
        changed++;
        return Object.assign({}, sc, {
            replaceString: vk.replaceString,
            scriptName: /· VK$/.test(sc.scriptName) ? sc.scriptName : sc.scriptName + ' · VK',
        });
    });
    if (!changed) return;
    try {
        await pm.writePresetExtensionField({ path: 'regex_scripts', value: next });
        toast('Плашки пресета обновлены в оформлении ВК: ' + changed);
        console.log('[vk2017] плашки обновлены:', changed);
        if (c.getCurrentChatId() && typeof c.reloadCurrentChat === 'function') await c.reloadCurrentChat();
    } catch (e) { console.warn('[vk2017] не удалось обновить плашки', e); }
}

function selectThemeAfterInstall() {
    let flag = null;
    try { flag = localStorage.getItem(SELECT_FLAG); } catch (e) { return; }
    if (!flag) return;
    try { localStorage.removeItem(SELECT_FLAG); } catch (e) { /* ничего */ }
    const sel = $('#themes');
    if (!sel.find('option').filter((_, o) => o.value === THEME_NAME).length) return;
    sel.val(THEME_NAME).trigger('change');
    toast('Тема «' + THEME_NAME + '» включена');
}

/* ── число сообщений в списке чатов (выпадающий список Chat Top Bar) ── */
/* Таверна отдаёт список чатов персонажа с числом сообщений: /api/characters/chats.
   Расширение Chat Top Bar рисует только имена — дописываем к ним «· N сообщ.». */
const chatCounts = new Map();
let countsFor = null;

function countsOn() {
    const c = settings().custom;
    const v = c && c.flags ? c.flags['vk-chat-counts'] : undefined;
    return v == null ? true : !!v;
}

async function loadChatCounts() {
    const c = ctx();
    const ch = c.characters && c.characterId != null ? c.characters[c.characterId] : null;
    if (!ch || c.groupId) { chatCounts.clear(); countsFor = null; return; }
    if (countsFor === ch.avatar) return;
    try {
        const r = await fetch('/api/characters/chats', {
            method: 'POST', headers: c.getRequestHeaders(), body: JSON.stringify({ avatar_url: ch.avatar }),
        });
        if (!r.ok) return;
        const list = await r.json();
        chatCounts.clear();
        for (const it of Object.values(list || {})) {
            if (it && it.file_name) chatCounts.set(String(it.file_name).replace(/\.jsonl$/, ''), it.chat_items);
        }
        countsFor = ch.avatar;
    } catch (e) { /* список не пришёл — оставляем имена как есть */ }
}

function plural(n, forms) {
    const a = Math.abs(n) % 100, b = a % 10;
    if (a > 10 && a < 20) return forms[2];
    if (b > 1 && b < 5) return forms[1];
    if (b === 1) return forms[0];
    return forms[2];
}

function decorateChatSelect() {
    const sel = document.getElementById('extensionTopBarChatName');
    if (!sel) return;
    for (const o of sel.options) {
        const base = String(o.value || '').replace(/\.jsonl$/, '');
        if (!base) continue;
        if (!countsOn()) { o.textContent = base; continue; }
        const n = chatCounts.get(base);
        if (n == null) continue;
        o.textContent = base + '  ·  ' + n + ' ' + plural(n, ['сообщение', 'сообщения', 'сообщений']);
    }
}

function watchChatSelect() {
    const start = () => {
        const sel = document.getElementById('extensionTopBarChatName');
        if (!sel) return false;
        new MutationObserver(() => decorateChatSelect()).observe(sel, { childList: true });
        sel.addEventListener('mousedown', async () => { await loadChatCounts(); decorateChatSelect(); });
        sel.addEventListener('focus', async () => { await loadChatCounts(); decorateChatSelect(); });
        loadChatCounts().then(decorateChatSelect);
        return true;
    };
    if (start()) return;
    // расширение Chat Top Bar рисует полосу позже — ждём её появления
    const mo = new MutationObserver(() => { if (start()) mo.disconnect(); });
    mo.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => mo.disconnect(), 30000);
}

/* ── число сообщений у персонажей в списке ── */
/* У персонажа в таверне нет готового числа сообщений — берём список его чатов
   (/api/characters/chats) и складываем. Кэш сбрасывается, когда меняется дата последнего чата. */
const charCounts = new Map();   // avatar → { stamp, n }
const charQueue = [];
const charPending = new Set();
let charBusy = 0;
let paintT = null;

function charStamp(ch) { return String(ch.date_last_chat || '') + '|' + String(ch.chat_size || ''); }

async function fetchCharCount(ch) {
    try {
        const r = await fetch('/api/characters/chats', {
            method: 'POST', headers: ctx().getRequestHeaders(), body: JSON.stringify({ avatar_url: ch.avatar }),
        });
        if (!r.ok) return null;
        const list = await r.json();
        let n = 0;
        for (const it of Object.values(list || {})) n += Number(it && it.chat_items) || 0;
        return n;
    } catch (e) { return null; }
}

function pumpCharCounts() {
    while (charBusy < 3 && charQueue.length) {
        const ch = charQueue.shift();
        charBusy++;
        const stamp = charStamp(ch);
        fetchCharCount(ch).then(n => { charCounts.set(ch.avatar, { stamp, n }); })
            .finally(() => { charBusy--; charPending.delete(ch.avatar); schedulePaint(); pumpCharCounts(); });
    }
}

function schedulePaint() {
    if (paintT) return;
    paintT = setTimeout(() => { paintT = null; paintCharRows(); }, 150);
}

function paintCharRows() {
    const block = document.getElementById('rm_print_characters_block');
    if (!block) return;
    const c = ctx();
    const on = countsOn() && themeActive();
    block.querySelectorAll('.character_select[data-chid]').forEach(row => {
        let badge = row.querySelector('.vk2017-count');
        if (!on) {
            if (badge) badge.remove();
            row.classList.remove('vk2017-has-count');
            return;
        }
        const ch = c.characters[Number(row.dataset.chid)];
        if (!ch || !ch.avatar) return;
        const hit = charCounts.get(ch.avatar);
        if (!hit || hit.stamp !== charStamp(ch)) {
            if (!charPending.has(ch.avatar)) { charPending.add(ch.avatar); charQueue.push(ch); pumpCharCounts(); }
            return;
        }
        if (!hit.n) {
            // чатов нет (или список не пришёл) — ничего не пишем, как у пустого диалога ВК
            if (badge) badge.remove();
            row.classList.remove('vk2017-has-count');
            return;
        }
        const text = hit.n + ' ' + plural(hit.n, ['сообщение', 'сообщения', 'сообщений']);
        if (!badge) {
            badge = document.createElement('small');
            badge.className = 'vk2017-count';
            (row.querySelector('.character_name_block') || row).appendChild(badge);
        }
        if (badge.textContent !== text) badge.textContent = text;
        row.classList.add('vk2017-has-count');
    });
}

function watchCharList() {
    const block = document.getElementById('rm_print_characters_block');
    if (!block) return;
    // строки перерисовываются при открытии панели, поиске и листании — ловим только замену строк
    new MutationObserver(() => schedulePaint()).observe(block, { childList: true });
    $(document).on('click', '#rightNavDrawerIcon, #rm_button_characters', () => setTimeout(paintCharRows, 300));
    $(document).on('change', '#vkte-root input[data-flag="vk-chat-counts"]', () => setTimeout(() => { paintCharRows(); decorateChatSelect(); }, 50));
    paintCharRows();
}

/* ── шапка диалога: имя, «online» и круглая аватарка, как в ВК ── */
let headEl = null;
let headTyping = false;

function headOn() {
    const c = settings().custom;
    const v = c && c.flags ? c.flags['vk-chat-head'] : undefined;
    return v == null ? true : !!v;
}

function ensureHead() {
    if (headEl && document.body.contains(headEl)) return headEl;
    const chat = document.getElementById('chat');
    if (!chat || !chat.parentNode) return null;
    headEl = document.createElement('div');
    headEl.id = 'vk2017-chathead';
    headEl.hidden = true;
    headEl.innerHTML =
        '<button type="button" class="vk2017-ch-back" title="К диалогам" aria-label="К диалогам"></button>' +
        '<div class="vk2017-ch-info"><div class="vk2017-ch-name"></div><div class="vk2017-ch-sub"></div></div>' +
        '<img class="vk2017-ch-ava" alt="">';
    // выше полосы Chat Top Bar, если она уже есть
    const topBar = document.getElementById('extensionTopBar');
    chat.parentNode.insertBefore(headEl, topBar && topBar.parentNode === chat.parentNode ? topBar : chat);
    headEl.querySelector('.vk2017-ch-back').addEventListener('click', e => {
        e.stopPropagation();
        document.getElementById('option_close_chat')?.click();
    });
    // имя или аватарка — карточка персонажа
    headEl.querySelector('.vk2017-ch-info').addEventListener('click', openCard);
    headEl.querySelector('.vk2017-ch-ava').addEventListener('click', openCard);
    return headEl;
}

function openCard() {
    const c = ctx();
    if (c.groupId) { document.getElementById('rightNavDrawerIcon')?.click(); return; }
    const panel = document.getElementById('right-nav-panel');
    if (!panel || !panel.classList.contains('openDrawer')) document.getElementById('rightNavDrawerIcon')?.click();
}

function updateHead() {
    const c = ctx();
    const on = headOn() && themeActive() && !!c.getCurrentChatId();
    const el = on ? ensureHead() : headEl;
    if (!el) return;
    let name = '', ava = '', sub = '';
    if (on && c.groupId) {
        const g = (c.groups || []).find(x => x.id === c.groupId);
        if (g) {
            const n = (g.members || []).length;
            name = g.name;
            sub = n + ' ' + plural(n, ['участник', 'участника', 'участников']);
            ava = g.avatar_url || (g.members && g.members[0] ? c.getThumbnailUrl('avatar', g.members[0]) : '');
        }
    } else if (on) {
        const ch = c.characters && c.characterId != null ? c.characters[c.characterId] : null;
        if (ch) { name = ch.name; ava = c.getThumbnailUrl('avatar', ch.avatar); sub = 'online'; }
    }
    if (!on || !name) { el.hidden = true; document.documentElement.classList.remove('vk2017-has-head'); return; }
    el.hidden = false;
    document.documentElement.classList.add('vk2017-has-head');
    el.querySelector('.vk2017-ch-name').textContent = name;
    const subEl = el.querySelector('.vk2017-ch-sub');
    subEl.textContent = headTyping && !c.groupId ? typingText() : sub;
    subEl.classList.toggle('typing', headTyping && !c.groupId);
    const img = el.querySelector('.vk2017-ch-ava');
    if (ava && img.getAttribute('src') !== ava) img.setAttribute('src', ava);
    img.hidden = !ava;
}

/* пока ответ не пришёл, в пузыре «...» — помечаем его, CSS темы рисует прыгающие точки */
let waitTimer = null;
function markWaiting() {
    document.querySelectorAll('#chat .mes_text.vk2017-waiting').forEach(el => {
        if (!headTyping || !/^\s*(\.\.\.|…)\s*$/.test(el.textContent)) el.classList.remove('vk2017-waiting');
    });
    if (!headTyping) return;
    const last = document.querySelector('#chat .last_mes .mes_text');
    if (last && /^\s*(\.\.\.|…)\s*$/.test(last.textContent)) last.classList.add('vk2017-waiting');
}

function setHeadTyping(on) {
    if (headTyping === on) return;
    headTyping = on;
    clearInterval(waitTimer);
    waitTimer = on ? setInterval(markWaiting, 250) : null;
    markWaiting();
    updateHead();
}

/* ── интерфейс ── */
function addMenuItem() {
    if ($('#vk2017_menu').length) return;
    const item = $('<div id="vk2017_menu" class="list-group-item flex-container flexGap5 interactable" tabindex="0">' +
        '<div class="fa-solid fa-circle-half-stroke extensionsMenuExtensionButton"></div>' +
        '<span id="vk2017_menu_label">Тёмная тема ВК</span></div>');
    item.on('click', toggleDark);
    const edit = $('<div id="vk2017_edit_menu" class="list-group-item flex-container flexGap5 interactable" tabindex="0">' +
        '<div class="fa-solid fa-palette extensionsMenuExtensionButton"></div>' +
        '<span>Настроить тему ВК</span></div>');
    edit.on('click', () => editor.open());
    $('#extensionsMenu').append(item, edit);
}

/* Кнопки темы — в «Настройках пользователя», под выбором темы интерфейса */
function addSettings() {
    if ($('#vk2017_settings').length) return;
    const html =
        '<div id="vk2017_settings" class="flex-container flexFlowColumn">' +
        '<h4 class="title_restorable"><span>ВКонтакте 2017 🌓</span><small class="vk2017-ver">v' + VERSION + ' · <span id="vk2017_state"></span></small></h4>' +
        '<div class="vk2017-btns">' +
        '<div class="menu_button menu_button_icon" id="vk2017_dark_btn"><i class="fa-solid fa-circle-half-stroke"></i><span id="vk2017_dark_label"></span></div>' +
        '<div class="menu_button menu_button_icon" id="vk2017_edit"><i class="fa-solid fa-palette"></i><span>Настроить</span></div>' +
        '<div class="menu_button menu_button_icon" id="vk2017_update"><i class="fa-solid fa-rotate"></i><span>Обновить тему</span></div>' +
        '</div>' +
        '<label class="checkbox_label" for="vk2017_typing"><input type="checkbox" id="vk2017_typing"><span>«печатает» над полем ввода, пока бот отвечает</span></label>' +
        '</div>';
    const anchor = $('#UI-presets-block');
    if (anchor.length) anchor.after(html);
    else $('#extensions_settings2').append(html);
    $('#vk2017_dark_btn').on('click', toggleDark);
    $('#vk2017_edit').on('click', () => editor.open());
    $('#vk2017_update').on('click', updateTheme);
    $('#vk2017_typing').prop('checked', settings().typing).on('change', function () {
        settings().typing = this.checked;
        if (!this.checked) typingHide();
        ctx().saveSettingsDebounced();
    });
}

/* «Обновить тему»: кладём свежий файл темы в таверну, после перезагрузки она выбирается сама */
async function updateTheme() {
    const btn = $('#vk2017_update').addClass('disabled');
    try {
        const r = await fetch(BASE + 'theme/vk2017.json', { cache: 'no-store' });
        if (!r.ok) throw new Error('файл темы не найден (' + r.status + ')');
        const theme = await r.json();
        theme.name = THEME_NAME;
        const save = await fetch('/api/themes/save', {
            method: 'POST',
            headers: ctx().getRequestHeaders(),
            body: JSON.stringify(theme),
        });
        if (!save.ok) throw new Error('таверна не сохранила тему (' + save.status + ')');
        try { localStorage.setItem(SELECT_FLAG, '1'); } catch (e) { /* выберется при сверке CSS */ }
        toast('Тема обновлена, перезагружаю…', 'success');
        setTimeout(() => location.reload(), 600);
    } catch (e) {
        btn.removeClass('disabled');
        toast('Не получилось обновить тему: ' + (e && e.message || e), 'error');
    }
}

function refreshState() {
    $('#vk2017_state').text(themeActive() ? 'включена' : 'не выбрана');
}

jQuery(() => {
    const c = ctx();
    settings();
    addMenuItem();
    addSettings();
    applyDark();
    editor.apply();
    refreshState();
    watchChatSelect();
    watchCharList();
    loadPlaqueCode();   // стиль и код плашек — сразу, не дожидаясь APP_READY
    ensureRecentChats();
    const et = c.eventTypes || c.event_types;
    updateHead();
    c.eventSource.on(et.GENERATION_STARTED, (type, _o, dryRun) => { if (!dryRun && type !== 'quiet') setHeadTyping(true); });
    c.eventSource.on(et.GENERATION_ENDED, () => setHeadTyping(false));
    c.eventSource.on(et.GENERATION_STOPPED, () => setHeadTyping(false));
    c.eventSource.on(et.MESSAGE_RECEIVED, () => setHeadTyping(false));
    c.eventSource.on(et.CHAT_CHANGED, () => { headTyping = false; setTimeout(updateHead, 50); });
    if (et.CHARACTER_EDITED) c.eventSource.on(et.CHARACTER_EDITED, () => setTimeout(updateHead, 50));
    if (et.GROUP_UPDATED) c.eventSource.on(et.GROUP_UPDATED, () => setTimeout(updateHead, 50));
    $(document).on('change', '#vkte-root input[data-flag="vk-chat-head"]', () => setTimeout(updateHead, 50));
    c.eventSource.on(et.GENERATION_STARTED, typingShow);
    c.eventSource.on(et.GENERATION_ENDED, typingHide);
    c.eventSource.on(et.GENERATION_STOPPED, typingHide);
    c.eventSource.on(et.MESSAGE_RECEIVED, typingHide);
    c.eventSource.on(et.CHAT_CHANGED, () => { typingHide(); refreshState(); countsFor = null; loadChatCounts().then(decorateChatSelect); });
    // плашки: после каждой отрисовки сообщения и при смене чата
    for (const ev of [et.CHARACTER_MESSAGE_RENDERED, et.USER_MESSAGE_RENDERED, et.MESSAGE_SWIPED, et.MESSAGE_UPDATED, et.MESSAGE_EDITED, et.CHAT_CHANGED, et.MORE_MESSAGES_LOADED]) {
        if (ev) c.eventSource.on(ev, () => setTimeout(() => paintPlaques(), 0));
    }
    const chatEl = document.getElementById('chat');
    if (chatEl) new MutationObserver(() => paintPlaques()).observe(chatEl, { childList: true, subtree: true });
    // список тем появляется, когда таверна дочитает настройки
    c.eventSource.on(et.APP_READY, () => { selectThemeAfterInstall(); syncThemeFromExtension(); syncPlaques(); loadPlaqueCode(); editor.apply(); refreshState(); });
    // если таверна уже загрузилась раньше расширения
    setTimeout(() => { syncThemeFromExtension(); syncPlaques(); }, 1500);
    // смена темы в настройках — обновляем подпись, правки редактора ставим снова последними
    $(document).on('change', '#themes', () => setTimeout(() => { writeModeBlock(); editor.apply(); refreshState(); updateHead(); }, 300));
    console.log('[vk2017] v' + VERSION + ' · тема ' + (themeActive() ? 'включена' : 'не выбрана') + ' · тёмная ' + settings().dark);
});
