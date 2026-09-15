/* ============================================================================
 * Редактор темы «ВКонтакте 2017» прямо на экране.
 * Все правки — поверх темы: <style id="vk2017-user"> в конце <head> и классы на <html>.
 * Хранятся в extensionSettings.vk2017.custom, сама тема (файл) не меняется,
 * поэтому «Сбросить» всегда возвращает исходный вид.
 * ========================================================================== */

// цвета, которые можно менять (обе палитры, отдельно для светлой и тёмной)
const COLORS = [
    ['header', 'Шапка'],
    ['bg', 'Фон чата'],
    ['in', 'Сообщения бота'],
    ['out', 'Мои сообщения'],
    ['text', 'Текст'],
    ['tone', 'Курсив (*действия*)'],
    ['link', 'Ссылки и синие подписи'],
    ['accent', 'Кнопки, галочки, отправка'],
    ['surface', 'Панели и поле ввода'],
    ['soft', 'Заголовки разделов в панелях'],
    ['btn', 'Обычные кнопки'],
    ['btn-text', 'Текст обычных кнопок'],
    ['muted', 'Серый текст'],
    ['icon', 'Иконки внизу'],
    ['border', 'Рамки и линии'],
    ['field-border', 'Рамки полей ввода'],
];

// размеры: [переменная, подпись, мин, макс, шаг, единица, по умолчанию]
const SIZES = [
    ['text-size', 'Размер текста сообщений', 11, 22, 0.5, 'px', 13.5],
    ['list-avatar', 'Аватарки в списке персонажей', 40, 140, 2, 'px', 72],
    ['header-h', 'Высота шапки', 34, 64, 1, 'px', 42],
    ['header-icon', 'Иконки в шапке', 14, 32, 1, 'px', 22],
    ['bubble-radius', 'Скругление пузырей', 0, 20, 1, 'px', 5],
    ['bubble-width', 'Ширина пузырей', 50, 100, 1, '%', 92],
    ['line-height', 'Межстрочный интервал', 1.1, 2, 0.05, '', 1.5],
    ['paragraph', 'Отступ между абзацами', 0, 1.6, 0.05, 'em', 0.7],
    ['bottom-icon', 'Иконки у поля ввода', 16, 32, 1, 'px', 24],
    ['input-size', 'Шрифт поля ввода', 12, 24, 0.5, 'px', 16],
    ['input-height', 'Высота поля ввода', 30, 240, 2, 'px', 34],
];

// шрифты: ключ, подпись, CSS-стек, семейство Google Fonts (null — системный)
const FONTS = [
    ['vk', 'Как в ВК (системный)', '-apple-system, BlinkMacSystemFont, "Roboto", "Helvetica Neue", Arial, sans-serif', null],
    ['roboto', 'Roboto', '"Roboto", Arial, sans-serif', 'Roboto:wght@400;500;700'],
    ['opensans', 'Open Sans', '"Open Sans", Arial, sans-serif', 'Open+Sans:wght@400;500;600'],
    ['ptsans', 'PT Sans', '"PT Sans", Arial, sans-serif', 'PT+Sans:wght@400;700'],
    ['golos', 'Golos Text', '"Golos Text", Arial, sans-serif', 'Golos+Text:wght@400;500;600'],
    ['georgia', 'Georgia (с засечками)', 'Georgia, "Times New Roman", serif', null],
];

// переключатели: класс на <html>, подпись, включено ли по умолчанию
const FLAGS = [
    ['vk-chat-head', 'Шапка диалога: имя и аватарка сверху', true],
    ['vk-topbar', 'Полоса Chat Top Bar: выбор чата и поиск', false],
    ['vk-tails', 'Хвостики у пузырей', true],
    ['vk-names', 'Имена над сообщениями', false],
    ['vk-time', 'Время в сообщениях', false],
    ['vk-avatars', 'Аватарки в чате', false],
    ['vk-mes-buttons-hover', 'Кнопки сообщения (… и ✎) — только при наведении', false],
    ['vk-hotswap', 'Полоска избранных над списком персонажей', false],
    ['vk-list-buttons', 'Кнопки над списком персонажей', true],
    ['vk-list-tags', 'Теги у персонажей в списке', true],
    ['vk-welcome-chats', 'Список диалогов на стартовом экране', true],
    ['vk-welcome', 'Лого и ссылки таверны на стартовом экране', false],
    ['vk-chat-counts', 'Число сообщений у персонажей и в списке чатов', true],
    ['vk-welcome-assistant', 'Сообщение ассистента на стартовом экране', false],
];

// надписи: ключ, подпись, по умолчанию
const TEXTS = [
    ['placeholder', 'Подсказка в поле ввода', 'Ваше сообщение…'],
    ['forwarded', 'Размышления модели', '1 пересланное сообщение'],
    ['typing', 'Пока бот пишет', 'печатает'],
];

const STYLE_ID = 'vk2017-user';
const ROOT_ID = 'vkte-root';

export function textDefault(key) {
    const t = TEXTS.find(x => x[0] === key);
    return t ? t[2] : '';
}

export function createEditor({ getSettings, save, isDark, toast, toggleDark, updateTheme }) {
    function data() {
        const s = getSettings();
        if (!s.custom || typeof s.custom !== 'object') s.custom = {};
        const c = s.custom;
        for (const k of ['light', 'dark', 'sizes', 'flags', 'texts']) if (!c[k] || typeof c[k] !== 'object') c[k] = {};
        if (typeof c.css !== 'string') c.css = '';
        return c;
    }

    function cssString(v) { return '"' + String(v).replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/[\r\n]+/g, ' ') + '"'; }

    /* ── применить всё ── */
    function apply() {
        const c = data();
        const light = Object.entries(c.light).map(([k, v]) => '  --vk-' + k + ': ' + v + ' !important;\n').join('');
        const dark = Object.entries(c.dark).map(([k, v]) => '  --vk-' + k + ': ' + v + ' !important;\n').join('');
        const sizes = Object.entries(c.sizes).map(([k, v]) => {
            const def = SIZES.find(x => x[0] === k);
            return def ? '  --vk-' + k + ': ' + v + def[5] + ' !important;\n' : '';
        }).join('');
        const texts = ['forwarded', 'typing'].filter(k => c.texts[k] != null && c.texts[k] !== '')
            .map(k => '  --vk-text-' + k + ': ' + cssString(c.texts[k]) + ' !important;\n').join('');
        const font = FONTS.find(f => f[0] === c.font);
        // @import должен стоять в самом начале стиля
        let css = (font && font[3] ? '@import url("https://fonts.googleapis.com/css2?family=' + font[3] + '&display=swap");\n' : '') +
            '/* ВКонтакте 2017 — правки из редактора темы */\n';
        // светлая палитра: :root без пометки тёмной; тёмная — с пометкой. html:root специфичнее :root темы
        if (light) css += 'html:root:not([data-vk-theme="dark"]) {\n' + light + '}\n';
        if (dark) css += 'html:root[data-vk-theme="dark"] {\n' + dark + '}\n';
        const fontVar = font ? '  --vk-font: ' + font[2] + ' !important;\n' : '';
        if (sizes || texts || fontVar) css += 'html:root {\n' + sizes + texts + fontVar + '}\n';
        if (c.css.trim()) css += '\n/* свой CSS */\n' + c.css + '\n';
        let el = document.getElementById(STYLE_ID);
        if (!el) { el = document.createElement('style'); el.id = STYLE_ID; }
        el.textContent = css;
        // всегда последним в <head> — после темы таверны
        if (el !== document.head.lastElementChild) document.head.appendChild(el);

        const html = document.documentElement;
        for (const [cls, , def] of FLAGS) {
            const on = c.flags[cls] != null ? !!c.flags[cls] : def;
            html.classList.toggle(cls, on);
            html.classList.toggle(cls + '-off', !on);
        }
        applyPlaceholder();
    }

    /* подсказка в поле ввода: таверна сама переписывает её при смене подключения — возвращаем свою */
    let phObserver = null;
    function wantedPlaceholder() {
        const c = data();
        const v = c.texts.placeholder;
        return v != null && v !== '' ? v : textDefault('placeholder');
    }
    function applyPlaceholder() {
        const ta = document.getElementById('send_textarea');
        if (!ta) return;
        const themeOn = getComputedStyle(document.documentElement).getPropertyValue('--vk-text').trim() !== '';
        if (!themeOn) return;
        const want = wantedPlaceholder();
        if (ta.getAttribute('placeholder') !== want) ta.setAttribute('placeholder', want);
        if (!phObserver) {
            phObserver = new MutationObserver(() => {
                const on = getComputedStyle(document.documentElement).getPropertyValue('--vk-text').trim() !== '';
                if (on && ta.getAttribute('placeholder') !== wantedPlaceholder()) ta.setAttribute('placeholder', wantedPlaceholder());
            });
            phObserver.observe(ta, { attributes: true, attributeFilter: ['placeholder'] });
        }
    }

    /* ── окно редактора ── */
    let root = null;
    let tab = 'colors';

    function currentVar(name) {
        return getComputedStyle(document.documentElement).getPropertyValue('--vk-' + name).trim();
    }
    function toHex(v) {
        v = String(v || '').trim();
        if (/^#[0-9a-f]{6}$/i.test(v)) return v.toLowerCase();
        if (/^#[0-9a-f]{3}$/i.test(v)) return '#' + v.slice(1).split('').map(ch => ch + ch).join('').toLowerCase();
        const m = v.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
        if (m) return '#' + [m[1], m[2], m[3]].map(n => Number(n).toString(16).padStart(2, '0')).join('');
        return '#000000';
    }
    function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

    function renderBody() {
        const c = data();
        const body = root.querySelector('.vkte-body');
        const mode = isDark() ? 'dark' : 'light';
        let h = '';
        if (tab === 'colors') {
            h += '<div class="vkte-note">Сейчас правишь <b>' + (mode === 'dark' ? 'тёмную' : 'светлую') + '</b> тему. Вторую — переключи кнопкой выше и поправь отдельно.</div>';
            for (const [key, label] of COLORS) {
                const changed = c[mode][key] != null;
                h += '<div class="vkte-row"><label class="vkte-label">' + esc(label) + '</label>' +
                    '<input type="color" class="vkte-color" data-key="' + key + '" value="' + toHex(currentVar(key)) + '">' +
                    '<button type="button" class="vkte-reset" data-reset-color="' + key + '" title="вернуть как было"' + (changed ? '' : ' disabled') + '>↺</button></div>';
            }
        } else if (tab === 'sizes') {
            h += '<div class="vkte-row vkte-col"><label class="vkte-label">Шрифт</label><select class="vkte-font">' +
                FONTS.map(f => '<option value="' + f[0] + '"' + ((c.font || 'vk') === f[0] ? ' selected' : '') + ' style="font-family:' + esc(f[2]) + '">' + esc(f[1]) + '</option>').join('') +
                '</select></div>';
            for (const [key, label, min, max, step, unit, def] of SIZES) {
                const v = c.sizes[key] != null ? c.sizes[key] : def;
                h += '<div class="vkte-row vkte-col"><div class="vkte-line"><label class="vkte-label">' + esc(label) + '</label>' +
                    '<span class="vkte-val" data-val="' + key + '">' + v + unit + '</span>' +
                    '<button type="button" class="vkte-reset" data-reset-size="' + key + '" title="вернуть как было"' + (c.sizes[key] != null ? '' : ' disabled') + '>↺</button></div>' +
                    '<input type="range" class="vkte-range" data-key="' + key + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + v + '"></div>';
            }
        } else if (tab === 'elements') {
            for (const [cls, label, def] of FLAGS) {
                const on = c.flags[cls] != null ? !!c.flags[cls] : def;
                h += '<label class="vkte-check"><input type="checkbox" data-flag="' + cls + '"' + (on ? ' checked' : '') + '><span>' + esc(label) + '</span></label>';
            }
        } else if (tab === 'texts') {
            for (const [key, label, def] of TEXTS) {
                const v = c.texts[key] != null ? c.texts[key] : '';
                h += '<div class="vkte-row vkte-col"><label class="vkte-label">' + esc(label) + '</label>' +
                    '<input type="text" class="vkte-text" data-text="' + key + '" maxlength="80" placeholder="' + esc(def) + '" value="' + esc(v) + '"></div>';
            }
            h += '<div class="vkte-note">Пустое поле — надпись как в ВК.</div>';
        } else if (tab === 'css') {
            h += '<div class="vkte-note">Свой CSS поверх темы — для всего, чего нет в других вкладках. Применяется сразу.</div>' +
                '<textarea class="vkte-css" spellcheck="false" placeholder="#chat .mes .mes_text { font-size: 17px; }">' + esc(c.css) + '</textarea>';
        }
        body.innerHTML = h;
        const darkBtn = root.querySelector('.vkte-dark');
        if (darkBtn) darkBtn.textContent = isDark() ? '☀️ Светлая тема' : '🌙 Тёмная тема';
        root.querySelectorAll('.vkte-tab').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
    }

    function bind() {
        const body = root.querySelector('.vkte-body');
        let saveT = null;
        const later = () => { clearTimeout(saveT); saveT = setTimeout(save, 400); };

        body.addEventListener('input', e => {
            const t = e.target;
            const c = data();
            const mode = isDark() ? 'dark' : 'light';
            if (t.classList.contains('vkte-color')) {
                c[mode][t.dataset.key] = t.value;
                const r = body.querySelector('[data-reset-color="' + t.dataset.key + '"]'); if (r) r.disabled = false;
            } else if (t.classList.contains('vkte-range')) {
                const def = SIZES.find(x => x[0] === t.dataset.key);
                c.sizes[t.dataset.key] = Number(t.value);
                const val = body.querySelector('[data-val="' + t.dataset.key + '"]'); if (val) val.textContent = t.value + def[5];
                const r = body.querySelector('[data-reset-size="' + t.dataset.key + '"]'); if (r) r.disabled = false;
            } else if (t.classList.contains('vkte-text')) {
                if (t.value.trim()) c.texts[t.dataset.text] = t.value; else delete c.texts[t.dataset.text];
            } else if (t.classList.contains('vkte-css')) {
                c.css = t.value;
            } else return;
            apply();
            later();
        });
        body.addEventListener('change', e => {
            const t = e.target;
            if (t.classList && t.classList.contains('vkte-font')) {
                if (t.value === 'vk') delete data().font; else data().font = t.value;
                apply();
                later();
                return;
            }
            if (t.dataset && t.dataset.flag) {
                data().flags[t.dataset.flag] = t.checked;
                apply();
                later();
            }
        });
        body.addEventListener('click', e => {
            const t = e.target.closest('button');
            if (!t) return;
            const c = data();
            if (t.dataset.resetColor) { delete c[isDark() ? 'dark' : 'light'][t.dataset.resetColor]; apply(); renderBody(); save(); }
            if (t.dataset.resetSize) { delete c.sizes[t.dataset.resetSize]; apply(); renderBody(); save(); }
        });

        root.querySelectorAll('.vkte-tab').forEach(b => b.addEventListener('click', () => { tab = b.dataset.tab; renderBody(); }));
        root.querySelector('.vkte-close').addEventListener('click', close);
        root.querySelector('.vkte-done').addEventListener('click', close);
        root.querySelector('.vkte-dark').addEventListener('click', () => { if (toggleDark) toggleDark(); });
        root.querySelector('.vkte-update').addEventListener('click', e => {
            if (!updateTheme) return;
            e.currentTarget.disabled = true;
            updateTheme().finally(() => { e.currentTarget.disabled = false; });
        });
        root.querySelector('.vkte-resetall').addEventListener('click', async () => {
            const ctx = SillyTavern.getContext();
            const ok = await ctx.callGenericPopup('Сбросить все правки темы: цвета обеих палитр, размеры, переключатели, надписи и свой CSS?', ctx.POPUP_TYPE.CONFIRM);
            if (!ok) return;
            getSettings().custom = {};
            apply(); renderBody(); save();
            toast('Тема вернулась к исходной');
        });

        // перетаскивание за шапку окна
        const bar = root.querySelector('.vkte-bar');
        const win = root.querySelector('.vkte-win');
        let drag = null;
        bar.addEventListener('pointerdown', e => {
            if (e.target.closest('button')) return;
            const r = win.getBoundingClientRect();
            drag = { dx: e.clientX - r.left, dy: e.clientY - r.top };
            bar.setPointerCapture(e.pointerId);
        });
        bar.addEventListener('pointermove', e => {
            if (!drag) return;
            const w = win.offsetWidth, h = win.offsetHeight;
            win.style.left = Math.min(Math.max(4, e.clientX - drag.dx), innerWidth - w - 4) + 'px';
            win.style.top = Math.min(Math.max(4, e.clientY - drag.dy), innerHeight - Math.min(h, 60)) + 'px';
        });
        bar.addEventListener('pointerup', () => { drag = null; });
    }

    function open() {
        if (!root) {
            root = document.createElement('div');
            root.id = ROOT_ID;
            root.innerHTML =
                '<div class="vkte-win">' +
                '<div class="vkte-bar"><span class="vkte-title">Настройка темы ВК</span><button type="button" class="vkte-close" title="закрыть">✕</button></div>' +
                '<div class="vkte-tabs">' +
                '<button type="button" class="vkte-tab" data-tab="colors">Цвета</button>' +
                '<button type="button" class="vkte-tab" data-tab="sizes">Размеры</button>' +
                '<button type="button" class="vkte-tab" data-tab="elements">Элементы</button>' +
                '<button type="button" class="vkte-tab" data-tab="texts">Надписи</button>' +
                '<button type="button" class="vkte-tab" data-tab="css">CSS</button>' +
                '</div>' +
                '<div class="vkte-actions"><button type="button" class="vkte-btn ghost vkte-dark"></button>' +
                '<button type="button" class="vkte-btn ghost vkte-update">↻ Обновить тему</button></div>' +
                '<div class="vkte-body"></div>' +
                '<div class="vkte-foot"><button type="button" class="vkte-btn ghost vkte-resetall">Сбросить всё</button><button type="button" class="vkte-btn vkte-done">Готово</button></div>' +
                '</div>';
            document.body.appendChild(root);
            bind();
            // у таверны на <html> стоит transform — ставим окно через top/left
            const win = root.querySelector('.vkte-win');
            const w = Math.min(380, innerWidth - 16);
            win.style.width = w + 'px';
            win.style.left = Math.max(8, innerWidth - w - 16) + 'px';
            win.style.top = '56px';
        }
        root.hidden = false;
        renderBody();
    }
    function close() { if (root) root.hidden = true; }
    function refresh() { if (root && !root.hidden) renderBody(); }

    return { apply, open, close, refresh };
}
