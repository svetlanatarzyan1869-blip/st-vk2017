#!/usr/bin/env python3
# Собирает тему SillyTavern «ВКонтакте 2017» (theme/vk2017.json) из src/theme.css.
#   :root                      — светлая (по умолчанию)
#   :root[data-vk-theme=dark]  — тёмная (пометку ставит это же расширение, кнопка 🌓)
# Палитры те же, что в теме для Tavo (~/Desktop/кодики/tavo-vk2017/build.py).
import json, os

HERE = os.path.dirname(os.path.abspath(__file__))
CSS = open(os.path.join(HERE, 'src', 'theme.css'), encoding='utf-8').read()
NAME = 'ВКонтакте 2017'

LIGHT = {
    'in': '#ffffff', 'in-line': '#d3d9e0',
    'out': '#d7e4f3', 'out-line': '#bccde1',
    'bg': '#e7ebf0',
    'text': '#000000', 'tone': '#55677d', 'hr': 'rgba(0, 0, 0, 0.12)',
    'link': '#2a5885', 'line-accent': '#5181b8',
    'accent': '#5181b8', 'accent-active': '#45709f',
    'surface': '#ffffff', 'border': '#dce1e6',
    'placeholder': '#9ba3ab', 'muted': '#818c99', 'check-border': '#b8c1cc',
    'header': '#4a76a8',
    'float-shadow': 'rgba(0, 0, 0, 0.18)', 'menu-shadow': 'rgba(0, 0, 0, 0.2)',
    # панели, поля, кнопки
    'soft': '#f0f2f5', 'hover': '#f5f7fa', 'selected': '#e9edf2', 'line': '#e7e8ec',
    'field-border': '#d3d9de', 'field-focus': '#aebdcb',
    'btn': '#e5ebf1', 'btn-hover': '#dae2ea', 'btn-text': '#55677d',
    'track': '#dae2ea', 'card-shadow': '0 1px 0 0 #d7d8db, 0 0 0 1px #e3e4e8',
    'icon': '#828a99',
}
DARK = {
    'in': '#2c2d2e', 'in-line': '#1f2021',
    'out': '#2b3f57', 'out-line': '#213247',
    'bg': '#0f0f10',
    'text': '#e1e3e6', 'tone': '#939ca6', 'hr': 'rgba(255, 255, 255, 0.12)',
    'link': '#71aaeb', 'line-accent': '#71aaeb',
    'accent': '#4a7bb5', 'accent-active': '#3d6697',
    'surface': '#19191a', 'border': '#2c2d2e',
    'placeholder': '#76787a', 'muted': '#76787a', 'check-border': '#5d5f61',
    'header': '#2d4a6b',
    'float-shadow': 'rgba(0, 0, 0, 0.5)', 'menu-shadow': 'rgba(0, 0, 0, 0.6)',
    'soft': '#232324', 'hover': '#222223', 'selected': '#2a2b2c', 'line': '#2c2d2e',
    'field-border': '#3a3b3c', 'field-focus': '#5d5f61',
    'btn': '#2c2d2e', 'btn-hover': '#363738', 'btn-text': '#c5d0db',
    'track': '#3a3b3c', 'card-shadow': '0 0 0 1px #2c2d2e',
    'icon': '#909499',
}

# Иконки в духе ВК 2017 (контур 1.8px). Рисуются МАСКОЙ цвета currentColor поверх иконок Font Awesome.
ICONS = {
    'sliders': "<path d='M4 7h9M17 7h3M4 17h3M11 17h9'/><circle cx='15' cy='7' r='2'/><circle cx='9' cy='17' r='2'/>",
    'plug': "<path d='M9 3v5M15 3v5M6.5 8h11v3.5a5.5 5.5 0 0 1-11 0zM12 17v4'/>",
    'font': "<path d='M3 18.5L8 5.5l5 13M4.9 14h6.2'/><path d='M15 11.2c.6-.9 1.6-1.3 2.7-1.3 1.9 0 3.1 1.1 3.1 3v5.6M20.8 14.6c-2.6-.2-5.6.2-5.6 2.2 0 2.5 4.4 2.3 5.6-.5'/>",
    'book': "<path d='M12 6.5C10.2 5 7.6 4.5 4 4.8v13.4c3.6-.3 6.2.2 8 1.7 1.8-1.5 4.4-2 8-1.7V4.8c-3.6-.3-6.2.2-8 1.7zM12 6.5v13.4'/>",
    'gear': "<circle cx='12' cy='12' r='3'/><path d='M12 2.8v2.6M12 18.6v2.6M2.8 12h2.6M18.6 12h2.6M5.5 5.5l1.8 1.8M16.7 16.7l1.8 1.8M5.5 18.5l1.8-1.8M16.7 7.3l1.8-1.8'/><circle cx='12' cy='12' r='6.6'/>",
    'photo': "<rect x='3' y='6.5' width='18' height='13.5' rx='3'/><path d='M8.5 6.5L10 4h4l1.5 2.5'/><circle cx='12' cy='13.2' r='3.4'/>",
    'apps': "<rect x='4' y='4' width='6.5' height='6.5' rx='1.6'/><rect x='13.5' y='4' width='6.5' height='6.5' rx='1.6'/><rect x='4' y='13.5' width='6.5' height='6.5' rx='1.6'/><rect x='13.5' y='13.5' width='6.5' height='6.5' rx='1.6'/>",
    'home': "<path d='M4 11l8-7 8 7M6 9.3V20h4.3v-5.2h3.4V20H18V9.3'/>",
    'friends': "<circle cx='9' cy='8' r='3.3'/><path d='M3.3 19.5c.6-3.4 2.8-5.3 5.7-5.3s5.1 1.9 5.7 5.3M15.6 4.9a3.2 3.2 0 0 1 0 6.2M17.3 14.4c2 .6 3.2 2.3 3.5 5.1'/>",
    'clip': "<path d='M19.5 11.3l-7.6 7.6a4.9 4.9 0 0 1-6.9-6.9l8.1-8.1a3.3 3.3 0 0 1 4.6 4.6l-8 8a1.6 1.6 0 0 1-2.3-2.3l7.3-7.3'/>",
    'smile': "<circle cx='12' cy='12' r='8.8'/><path d='M8.4 14.3a4.6 4.6 0 0 0 7.2 0'/><circle cx='9' cy='9.8' r='1.1' fill='black' stroke='none'/><circle cx='15' cy='9.8' r='1.1' fill='black' stroke='none'/>",
    'send': "<path d='M3.8 4.3L21 12 3.8 19.7l2.4-7.7z' fill='black' stroke='none'/>",
    'dialogs': "<path d='M4 5.5h11a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3.2V15.5H4a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2z'/><path d='M17 9h3a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2h-1v2.7L15.6 18.5H11a2 2 0 0 1-1.7-1'/>",
    'dots': "<circle cx='5.5' cy='12' r='1.7' fill='black' stroke='none'/><circle cx='12' cy='12' r='1.7' fill='black' stroke='none'/><circle cx='18.5' cy='12' r='1.7' fill='black' stroke='none'/>",
}
def icon_uri(name):
    svg = ("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' "
           "stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'>" + ICONS[name] + "</svg>")
    return 'url("data:image/svg+xml;utf8,' + svg.replace('#', '%23').replace('"', "'") + '")'
def icons_css():
    return '\n'.join(':root { --vk-i-%s: %s; }' % (n, icon_uri(n)) for n in ICONS) + '\n'

def root_block(selector, pal):
    return selector + ' {\n' + ''.join('  --vk-%s: %s;\n' % kv for kv in pal.items()) + '}\n'

def css_built():
    # @import должен остаться первым правилом — палитры сразу после него
    lines = CSS.split('\n')
    idx = next(i for i, l in enumerate(lines) if l.startswith('@import'))
    roots = root_block(':root', LIGHT) + '\n' + root_block(':root[data-vk-theme="dark"]', DARK)
    return '\n'.join(lines[:idx + 1]) + '\n\n' + roots + '\n' + icons_css() + '\n'.join(lines[idx + 1:])

def rgba(h, a=1):
    h = h.lstrip('#')
    return 'rgba(%d, %d, %d, %s)' % (int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16), a)

# Поля — как в теме, сохранённой самой таверной 1.18. Цвета светлые; тёмную делает CSS.
theme = {
    'name': NAME,
    'blur_strength': 0,
    'main_text_color': rgba(LIGHT['text']),
    'italics_text_color': rgba(LIGHT['tone']),
    'underline_text_color': rgba(LIGHT['link']),
    'quote_text_color': rgba(LIGHT['text']),
    'blur_tint_color': rgba(LIGHT['surface']),
    'chat_tint_color': rgba(LIGHT['bg']),
    'user_mes_blur_tint_color': rgba(LIGHT['out']),
    'bot_mes_blur_tint_color': rgba(LIGHT['in']),
    'shadow_color': 'rgba(0, 0, 0, 0)',
    'shadow_width': 0,
    'border_color': rgba(LIGHT['border']),
    'font_scale': 0.9,  # текст чуть мельче, ближе к 13px ВК; дальше — ползунок «Размер текста»
    'fast_ui_mode': True,
    'waifuMode': False,
    'avatar_style': 0,
    'chat_display': 0,
    'toastr_position': 'toast-top-center',
    'noShadows': True,
    'chat_width': 50,
    'timer_enabled': False,
    'timestamps_enabled': True,
    'timestamp_model_icon': False,
    'mesIDDisplay_enabled': False,
    'hideChatAvatars_enabled': False,
    'message_token_count_enabled': False,
    'expand_message_actions': False,
    'enableZenSliders': False,
    'enableLabMode': False,
    'hotswap_enabled': True,
    'custom_css': css_built(),
    'bogus_folders': False,
    'zoomed_avatar_magnification': False,
    'reduced_motion': False,
    'compact_input_area': False,
    'show_swipe_num_all_messages': False,
    'click_to_edit': False,
    'media_display': 'list',
}

os.makedirs(os.path.join(HERE, 'theme'), exist_ok=True)
out = os.path.join(HERE, 'theme', 'vk2017.json')
json.dump(theme, open(out, 'w', encoding='utf-8'), ensure_ascii=False, indent=4)
print('собрано: theme/vk2017.json', os.path.getsize(out), 'байт')
