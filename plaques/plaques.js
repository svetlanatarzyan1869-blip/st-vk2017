/* ВКонтакте 2017 — рисовальщики плашек. Расширение зовёт __VK2017_PLQ[имя](элемент) */
window.__VK2017_PLQ = {
  hud: (function(widget){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"moodlet.😤": {"t": "stk", "n": "16"}, "moodlet.💤": {"t": "stk", "n": "29"}, "moodlet.🔥": {"t": "stk", "n": "21"}, "moodlet.🛡": {"t": "stk", "n": "35"}, "moodlet.💬": {"t": "stk", "n": "17"}, "moodlet.💔": {"t": "stk", "n": "48"}, "moodlet.🧊": {"t": "stk", "n": "12"}, "moodlet.😰": {"t": "stk", "n": "10"}, "moodlet.🤕": {"t": "stk", "n": "48"}, "moodlet.😢": {"t": "stk", "n": "11"}, "moodlet.🌸": {"t": "stk", "n": "08"}, "moodlet.🌀": {"t": "stk", "n": "19"}, "moodlet.😌": {"t": "stk", "n": "33"}, "moodlet.👀": {"t": "stk", "n": "22"}, "moodlet.🌙": {"t": "stk", "n": "32"}, "moodlet.🍷": {"t": "stk", "n": "37"}, "moodlet.🚬": {"t": "stk", "n": "47"}, "moodlet.🍔": {"t": "stk", "n": "46"}, "moodlet.🍽": {"t": "stk", "n": "20"}, "moodlet.🫥": {"t": "stk", "n": "04"}, "hud.state.calm": {"t": "stk", "n": "33"}, "hud.state.warm": {"t": "stk", "n": "08"}, "hud.state.tense": {"t": "stk", "n": "22"}, "hud.state.guarded": {"t": "stk", "n": "21"}, "hud.state.sad": {"t": "stk", "n": "11"}, "hud.location": {"t": "icon", "svg": "<svg class=\"vkp-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z\"/></svg>"}, "hud.music": {"t": "icon", "svg": "<svg class=\"vkp-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M8 5.5v13l10.5-6.5z\"/></svg>"}, "hud.energy": {"t": "none"}, "hud.hunger": {"t": "none"}, "hud.chaos": {"t": "none"}, "hud.loneliness": {"t": "none"}, "hud.health": {"t": "emoji", "e": "🩹"}, "hud.hint": {"t": "none"}, "hud.services": {"t": "none"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
function weekday(dstr){
var m=(dstr||'').match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
if(!m)return '';
var d=new Date(+m[3],+m[2]-1,+m[1]);
if(isNaN(d.getTime()))return '';
return ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'][d.getDay()];
}
function render(){
var rd=widget.querySelector('.raw-data-container');
if(!rd)return;
var raw=rd.innerText||rd.textContent;
var f={};
raw.split('\n').forEach(function(line){
var c=line.indexOf(':');
if(c!==-1){var k=line.substring(0,c).trim().toLowerCase();var v=line.substring(c+1).trim();if(v)f[k]=v;}
});
var set=function(s,v){var el=widget.querySelector(s);if(el&&v)el.textContent=v;};
var pipe=function(r){if(!r||r.includes('{{'))return{val:0,label:''};var p=r.split('|');var l=(p[1]||'').trim();var w=l?l.split(/\s+/):[];if(w.length>5)l=w.slice(0,5).join(' ')+'…';var n=parseInt((p[0]||'').replace('%','').trim())||0;return{val:Math.max(0,Math.min(100,n)),label:l};};
var nameEl=widget.querySelector('.hud-name');
var ca=nameEl?(nameEl.getAttribute('data-char')||''):'';
if(ca.includes('{{'))ca='';
var name=f['name']||ca||'Персонаж';
set('.hud-name',name);
set('.hud-loc',f['location']||'---');
var dt='';
var wd=weekday(f['date']);
if(wd)dt+=wd+' · ';
if(f['date']&&!f['date'].includes('{{'))dt+=f['date'];
if(f['time']&&!f['time'].includes('{{'))dt+=(dt?' · ':'')+f['time'];
set('.hud-datetime',dt||'--.--.----');
var cont=widget.querySelector('.hud-container');
var st=f['state']?f['state'].toLowerCase():'';
if(cont&&st)cont.setAttribute('data-state',st);
var av=widget.querySelector('.hud-avatar');var avs=vkSrc('hud.state.'+st);if(av&&avs)av.src=avs;
var moods=widget.querySelector('.hud-moods');var mh='';
if(f['moodlets']&&!f['moodlets'].includes('{{'))f['moodlets'].split(',').filter(function(m){return m.trim();}).slice(0,3).forEach(function(m){mh+=vkMoodlet(m.trim());});
moods.innerHTML=mh;moods.style.display=mh?'flex':'none';
var cards=[
{key:'energy',label:'Энергия'},
{key:'hunger',label:'Голод'},
{key:'chaos',label:'Хаос',danger:70},
{key:'loneliness',label:'Одиночество'}
];
var bh='';
cards.forEach(function(c){
if(f[c.key]&&!f[c.key].includes('{{')){
var d=pipe(f[c.key]);
var hot=c.danger&&d.val>=c.danger;
bh+='<div class="hud-stat">';
bh+='<div class="hud-stat-top"><span class="vkp-label">'+vkI('hud.'+c.key)+c.label+'</span><span class="hud-val"'+(hot?' style="color:var(--p-danger)"':'')+'>'+d.val+'<small>%</small></span></div>';
bh+='<div class="vkp-bar" style="margin-top:4px;"><i style="width:'+d.val+'%;'+(hot?'background:var(--p-danger);':'')+'"></i></div>';
if(d.label)bh+='<div class="hud-note">'+vkE(d.label)+'</div>';
bh+='</div>';
}
});
var body=widget.querySelector('.hud-body');body.innerHTML=bh;body.style.display=bh?'grid':'none';
var cond=widget.querySelector('.hud-cond');var chh='';
var chips=function(v,pre){
if(!v||v.includes('{{'))return '';
var out='';
v.split(/\s*[·•]\s*/).filter(function(x){return x.trim();}).slice(0,3).forEach(function(x){
out+='<span class="vkp-chip soft">'+(pre||'')+vkE(x.trim())+'</span>';
});
return out;
};
chh+=chips(f['mental'],'');
chh+=chips(f['health'],vkI('hud.health'));
cond.innerHTML=chh;
cond.style.display=chh?'flex':'none';
var mb=widget.querySelector('.hud-music-box');
var tr=f['track']||'';var tt='',ta='';
if(tr&&!tr.includes('{{')){var p=tr.split('|');tt=(p[0]||'').trim();ta=(p[1]||'').trim();}
if(tt&&!['none','omit','-','нет','пусто','skip'].includes(tt.toLowerCase())&&mb){
mb.style.display='block';
set('.hud-music-title',tt);set('.hud-music-artist',ta);
if(f['mood'])set('.hud-music-mood',f['mood']);
var rawQuery=(ta+' '+tt).trim();
var searchQuery=encodeURIComponent(rawQuery);
var btn=mb.querySelector('.hud-music-action-btn');
var menu=mb.querySelector('.hud-music-menu');
var coverEl=mb.querySelector('.hud-music-cover');
var audioEl=mb.querySelector('.hud-music-audio');
if(btn&&menu&&searchQuery){
btn.onclick=function(e){e.stopPropagation();menu.style.display=menu.style.display==='flex'?'none':'flex';};
document.addEventListener('click', function(e) {
if(!btn.contains(e.target) && !menu.contains(e.target)) {
menu.style.display = 'none';
}
});
var hintToastEl = widget.querySelector('.hud-hint');
function fallbackCopy(u){
var el = document.createElement('textarea');
el.value = u; el.style.position = 'absolute'; el.style.left = '-9999px';
document.body.appendChild(el); el.select();
try {
document.execCommand('copy');
if(hintToastEl){
var oldText = hintToastEl.textContent;
var wasVisible = hintToastEl.style.display === 'block';
hintToastEl.textContent = 'Android заблокировал переход. Ссылка на трек скопирована, вставьте в браузере!';
hintToastEl.style.display = 'block';
hintToastEl.style.color = 'var(--p-link)';
hintToastEl.classList.add('hud-copy-toast');
setTimeout(function(){
hintToastEl.classList.remove('hud-copy-toast');
hintToastEl.style.color = '';
hintToastEl.textContent = oldText;
if(!wasVisible) hintToastEl.style.display = 'none';
}, 3000);
}
} catch(err){}
document.body.removeChild(el);
}
function openExternal(u){
var isAndroid = /Android/i.test(navigator.userAgent || navigator.vendor || window.opera);
if(isAndroid){
if(navigator.share){
navigator.share({ title: 'Слушать трек', url: u }).catch(function(){ fallbackCopy(u); });
} else {
fallbackCopy(u);
}
return;
}
try {
var w = window.open(u, '_blank', 'noopener');
if(w) return;
} catch(err){}
try { if(window.top){ window.top.location.href = u; return; } } catch(err){}
window.location.href = u;
}
mb.querySelectorAll('.hud-service-btn').forEach(function(b){
b.onclick=function(e){
e.stopPropagation();
var s=b.getAttribute('data-service');
var url='';
if(s==='yandex') url='https://music.yandex.ru/search?text='+searchQuery;
if(s==='youtube') url='https://music.youtube.com/search?q='+searchQuery;
if(s==='apple') url='https://music.apple.com/search?term='+searchQuery;
if(s==='spotify') url='https://open.spotify.com/search/'+searchQuery;
if(url) openExternal(url);
menu.style.display='none';
};
});
}
if(searchQuery){
try{fetch('https://itunes.apple.com/search?term='+searchQuery+'&entity=song&limit=1').then(function(r){return r.json();}).then(function(d){var t=d.results[0];if(t){if(coverEl&&t.artworkUrl100)coverEl.src=t.artworkUrl100.replace('100x100bb','200x200bb');if(audioEl&&t.previewUrl)audioEl.src=t.previewUrl;if(t.trackName)set('.hud-music-title',t.trackName);if(t.artistName)set('.hud-music-artist',t.artistName);}}).catch(function(){});}catch(e){}
}
}else if(mb)mb.style.display='none';
var h=widget.querySelector('.hud-hint');
if(h&&f['hint']&&!f['hint'].includes('{{')){h.innerHTML=vkI('hud.hint');h.appendChild(document.createTextNode(f['hint']));h.style.display='block';}else if(h&&!h.classList.contains('hud-copy-toast'))h.style.display='none';
}
setTimeout(render,50);
}),
  rel: (function(widget){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"rel.header": {"t": "none"}, "rel.far": {"t": "stk", "n": "35"}, "rel.near": {"t": "stk", "n": "08"}, "rel.chemistry": {"t": "none"}, "rel.attachment": {"t": "none"}, "rel.trust": {"t": "none"}, "rel.vulnerability": {"t": "none"}, "rel.tension": {"t": "none"}, "rel.jealousy": {"t": "none"}, "rel.sensation": {"t": "none"}, "rel.realization": {"t": "stk", "n": "32"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
var WARM='#e64d6b';
function val(v){if(!v||(''+v).includes('{{'))return 0;var n=parseInt(v)||0;return Math.max(0,Math.min(100,n));}
function render(){
var rd=widget.querySelector('.raw-data-container');if(!rd)return;
var raw=rd.innerText||rd.textContent;var f={};
raw.split('\n').forEach(function(line){var c=line.indexOf(':');if(c!==-1){var k=line.substring(0,c).trim().toLowerCase();var v=line.substring(c+1).trim();if(v)f[k]=v;}});
var charName=(f['char']&&!f['char'].includes('{{'))?f['char']:'Она';
var userName=(f['user']&&!f['user'].includes('{{'))?f['user']:'Ты';
var pe=widget.querySelector('.rel-pair');if(pe)pe.textContent=charName+'  ←→  '+userName;
var sw=widget.querySelector('.rel-statusword');if(sw)sw.textContent=f['status']||'—';
var att=val(f['attachment']),chem=val(f['chemistry']),ten=val(f['tension']),
trust=val(f['trust']),vuln=val(f['vulnerability']),jeal=val(f['jealousy']);
var status=(f['status']||'').toLowerCase();
var mode=(f['mode']||'NORMAL').toUpperCase();
var warm=att*0.4+chem*0.25+trust*0.2+vuln*0.15;
var cold=ten*0.55+jeal*0.45;
var bias={PURSUIT:12,CHEEKY:8,NORMAL:0,SHY:-8,DEFENSIVE:-14,TOXIC:-4}[mode]||0;
var net=Math.max(-100,Math.min(100, warm-cold+bias));
var pos=50+net/2;
var cont=widget.querySelector('.rel-container');
var mcol=net>4?WARM:(net<-4?'var(--p-link)':'var(--p-sub)');
var marker=widget.querySelector('.rel-marker');
marker.style.left=pos+'%';
marker.style.borderColor=mcol;
var fill=widget.querySelector('.rel-fill');
if(pos>=50){fill.style.left='50%';fill.style.width=(pos-50)+'%';fill.style.background=WARM;}
else{fill.style.left=pos+'%';fill.style.width=(50-pos)+'%';fill.style.background='var(--p-link)';}
var lean=widget.querySelector('.rel-lean');
if(net>30)lean.textContent='тянутся друг к другу';
else if(net>8)lean.textContent='теплеет';
else if(net<-30)lean.textContent='расходятся';
else if(net<-8)lean.textContent='холодает';
else lean.textContent='в равновесии';
lean.style.color=mcol;
var danger=(ten>=75||status.indexOf('отчужд')>=0||status.indexOf('нестаб')>=0);
if(danger)cont.classList.add('danger');else cont.classList.remove('danger');
var axes=[
{k:'chemistry',l:'Влечение',v:chem},
{k:'attachment',l:'Близость',v:att},
{k:'trust',l:'Доверие',v:trust},
{k:'vulnerability',l:'Открытость',v:vuln},
{k:'tension',l:'Напряжение',v:ten},
{k:'jealousy',l:'Ревность',v:jeal}
];
var ah='';
axes.forEach(function(a){if(f[a.k]&&!f[a.k].includes('{{')){
ah+='<div><div class="rel-axis-top"><span class="vkp-label">'+vkI('rel.'+a.k)+a.l+'</span><span class="rel-num">'+a.v+'</span></div><div class="vkp-bar" style="margin-top:4px;"><i style="width:'+a.v+'%;"></i></div></div>';}});
var axEl=widget.querySelector('.rel-axes');axEl.innerHTML=ah;axEl.style.display=ah?'grid':'none';
var dyn=widget.querySelector('.rel-dyn');
if(f['dynamic']&&!f['dynamic'].includes('{{')){dyn.textContent='«'+f['dynamic']+'»';dyn.style.display='block';}else dyn.style.display='none';
var fl=widget.querySelector('.rel-flash');var fh='';
function ok(v){return v&&!v.includes('{{')&&['none','omit','-','нет','skip'].indexOf(v.trim().toLowerCase())===-1;}
if(ok(f['sensation']))fh+='<div class="rel-note">'+vkI('rel.sensation')+'<span>'+vkE(f['sensation'])+'</span></div>';
if(ok(f['realization']))fh+='<div class="rel-note">'+vkI('rel.realization')+'<span>'+vkE(f['realization'])+'</span></div>';
fl.innerHTML=fh;fl.style.display=fh?'grid':'none';
var infl=widget.querySelector('.rel-infl');var ih='';
if(f['influences']&&!f['influences'].includes('{{')){f['influences'].split(',').forEach(function(t){if(t.trim())ih+='<span class="vkp-chip">'+vkE(t.trim())+'</span>';});}
infl.innerHTML=ih;infl.style.display=ih?'flex':'none';
}
setTimeout(render,50);
}),
  im: (function(widget){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"im.header.calm": {"t": "stk", "n": "15"}, "im.header.strain": {"t": "stk", "n": "16"}, "im.header.critical": {"t": "stk", "n": "13"}, "im.mask": {"t": "none"}, "im.inside": {"t": "none"}, "im.tell": {"t": "none"}, "im.anchor": {"t": "none"}, "im.fear": {"t": "none"}, "im.forbidden": {"t": "none"}, "im.pain": {"t": "none"}, "im.secret": {"t": "none"}, "im.guilt": {"t": "none"}, "im.midnight": {"t": "none"}, "im.dream": {"t": "none"}, "im.realization": {"t": "none"}, "im.fondness": {"t": "none"}, "im.empty": {"t": "stk", "n": "15"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
function render(){
var rd=widget.querySelector('.raw-data-container');if(!rd)return;
var raw=rd.innerText||rd.textContent;
var f={};
raw.split('\n').forEach(function(line){var c=line.indexOf(':');if(c!==-1){var k=line.substring(0,c).trim().toLowerCase();var v=line.substring(c+1).trim();if(v)f[k]=v;}});
var t=widget.querySelector('.imon-time');if(t)t.textContent=f['time']||'--:--';
var s=Math.max(0,Math.min(100,parseInt(f['stress'])||0));if(s<0)s=0;if(s>100)s=100;
var status='тихо',head='im.header.calm',col='var(--p-accent)';
if(s>=75){status='на пределе';head='im.header.critical';col='var(--p-danger)';}
else if(s>=40){status='напряжение';head='im.header.strain';col='#e3822e';}
var st=widget.querySelector('.imon-status');if(st)st.textContent=status;
var ic=widget.querySelector('.imon-icon');if(ic)ic.innerHTML=vkI(head,'vkp-ava');
var dead=['none','omit','-','нет','пусто','skip',''];
function ok(v){return v&&!v.includes('{{')&&dead.indexOf(v.trim().toLowerCase())===-1&&v.trim().length>1;}
var pages=[
[ {l:'Маска',k:'mask'},{l:'Внутри',k:'inside',i:1},{l:'Микрожест',k:'tell'},{l:'Якорь',k:'anchor'} ],
[ {l:'Страх',k:'fear',i:1},{l:'Запретное',k:'forbidden',i:1},{l:'Боль',k:'pain',i:1},{l:'Тайное',k:'secret',i:1},{l:'Вина',k:'guilt',i:1} ],
[ {l:'Ночная мысль',k:'midnight',i:1},{l:'Сон',k:'dream',i:1},{l:'Осознание',k:'realization'},{l:'Тихая симпатия',k:'fondness',i:1} ]
];
function build(blocks){
var html='',any=false;
blocks.forEach(function(b){
if(ok(f[b.k])){any=true;
html+='<div class="imon-block"><div class="imon-block-lbl vkp-label">'+vkI('im.'+b.k)+b.l+'</div><div class="imon-block-val vkp-quote"'+(b.i?' style="font-style:italic;"':'')+'>'+vkE(f[b.k])+'</div></div>';
}
});
if(!any)html='<div class="imon-empty">'+vkI('im.empty')+'<span>тихо</span></div>';
return html;
}
var cEl=widget.querySelector('.imon-content');
cEl.innerHTML=pages.map(function(p,idx){return '<div class="imon-page'+(idx===0?' active':'')+'">'+build(p)+'</div>';}).join('');
var tabs=widget.querySelectorAll('.imon-tab');
tabs.forEach(function(tab){tab.addEventListener('click',function(){
tabs.forEach(function(x){x.classList.remove('active');});
this.classList.add('active');
var idx=parseInt(this.getAttribute('data-tab'));
var ps=cEl.querySelectorAll('.imon-page');
ps.forEach(function(p){p.classList.remove('active');});
if(ps[idx])ps[idx].classList.add('active');
});});
var sb=widget.querySelector('.imon-stress');
if(sb)sb.innerHTML='<div class="imon-stress-top"><span class="vkp-label">Стресс</span><span class="imon-pct" style="color:'+col+'">'+s+'%</span></div><div class="vkp-bar"><i style="width:'+s+'%;background:'+col+';"></i></div>';
}
setTimeout(render,50);
}),
  chaos: (function(widget){
function render(){
var rdEl=widget.querySelector('.raw-data');if(!rdEl)return;
var raw=rdEl.value||rdEl.textContent;if(!raw)return;
var keys="type:|trigger:|description:";
function get(k,def){var r=new RegExp(k+"\\s*:([\\s\\S]*?)(?="+keys+"|$)","i");var m=raw.match(r);return m?m[1].trim():def;}
var t=widget.querySelector('.ch-type');if(t)t.textContent=get("type","СОБЫТИЕ")||'СОБЫТИЕ';
var tr=widget.querySelector('.ch-trigger');if(tr)tr.textContent=get("trigger","")||'критический сбой';
var d=widget.querySelector('.ch-desc');if(d)d.textContent=get("description","");
}
setTimeout(render,50);
}),
  cons: (function(widget){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"cons.echo": {"t": "none"}, "cons.scar": {"t": "none"}, "cons.warmth": {"t": "stk", "n": "39"}, "cons.event": {"t": "none"}, "cons.behavior": {"t": "none"}, "cons.relationship": {"t": "none"}, "cons.memory": {"t": "none"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
var THEMES={
echo:{c:'#7d8fb3',key:'cons.echo',title:'ОТГОЛОСОК',sub:function(f){return 'активно '+(f.duration||'');},foot:function(f){return 'затухнет через '+(f.duration||'');},evlbl:'Событие'},
scar:{c:'var(--p-danger)',key:'cons.scar',title:'ШРАМ',sub:function(){return 'навсегда';},foot:function(){return 'этот день изменил всё';},evlbl:'Событие'},
warmth:{c:'#e3a33c',key:'cons.warmth',title:'ТЕПЛОВОЙ СЛЕД',sub:function(){return 'останется надолго';},foot:function(){return 'это не сотрётся, это будет греть';},evlbl:'Момент'}
};
function clean(v){return v?(''+v).replace(/_/g,' ').replace(/[\[\]]/g,'').trim():'';}
function sc(v){if(!v)return null;var t=(''+v).trim();if(t.charAt(0)==='-')return 'var(--p-danger)';if(t.charAt(0)==='+')return '#4bb34b';return 'var(--p-sub)';}
function render(){
var rdEl=widget.querySelector('.raw-data');if(!rdEl)return;
var raw=(rdEl.value||rdEl.textContent).trim();var f={};
raw.split('\n').forEach(function(line){line=line.trim();if(!line)return;line.split('|').forEach(function(part){part=part.trim();var c=part.indexOf(':');if(c===-1)return;var k=part.substring(0,c).trim().toLowerCase();var v=part.substring(c+1).trim();if(v)f[k]=v;});});
var ty=(f.type||'echo').toLowerCase();var th=THEMES[ty]||THEMES.echo;
var axes=ty==='warmth'?[['привязанность',f.attachment],['открытость',f.vulnerability],['доверие',f.trust]]:[['напряжение',f.tension],['влечение',f.chemistry],['открытость',f.vulnerability],['доверие',f.trust]];
var h='<details class="vkp-card" style="--c:'+th.c+';">';
h+='<summary><div class="vkp-head">'+vkI(th.key,'vkp-ava')+'<div style="flex:1;min-width:0;"><div class="cons-title">'+th.title+'</div><div class="vkp-sub">'+vkE(th.sub(f))+'</div></div><svg class="vkp-chev" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/></svg></div></summary>';
if(f.event)h+='<div class="vkp-sec"><div class="vkp-label">'+vkI('cons.event')+th.evlbl+'</div><div class="vkp-quote cons-q">'+vkE(clean(f.event))+'</div></div>';
if(f.behavior)h+='<div class="vkp-sec"><div class="vkp-label">'+vkI('cons.behavior')+(ty==='warmth'?'что осталось внутри':'влияние')+'</div><div class="cons-text">'+vkE(clean(f.behavior))+'</div></div>';
if(axes.some(function(a){return a[1];})){h+='<div class="vkp-sec cons-axes">';axes.forEach(function(a){if(a[1])h+='<div><div class="vkp-label" style="text-transform:none;letter-spacing:0;">'+a[0]+'</div><div class="cons-val" style="color:'+sc(a[1])+';">'+vkE(a[1])+'</div></div>';});h+='</div>';}
if(f.relationship)h+='<div class="vkp-sec"><div class="vkp-label">'+vkI('cons.relationship')+'отношения</div><div class="cons-text">'+vkE(clean(f.relationship))+'</div></div>';
if(f.memory){h+='<div class="vkp-sec cons-mem"><span>'+vkI('cons.memory')+vkE(clean(f.memory))+'</span>';if(f.residual)h+='<span class="cons-res">сдвиг: '+vkE(clean(f.residual))+'</span>';else if(ty==='scar')h+='<span class="cons-res" style="font-style:normal;font-weight:500;">НАВСЕГДА</span>';h+='</div>';}
h+='<div class="vkp-foot cons-foot">'+vkE(th.foot(f))+'</div></details>';
widget.querySelector('.cons-body').innerHTML=h;
}
setTimeout(render,50);
}),
  mood: (function(widget){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"mood.header": {"t": "stk", "n": "16"}, "mood.прекрасное": {"t": "stk", "n": "25"}, "mood.хорошее": {"t": "stk", "n": "03"}, "mood.спокойное": {"t": "stk", "n": "33"}, "mood.нейтральное": {"t": "stk", "n": "03"}, "mood.уставшее": {"t": "stk", "n": "29"}, "mood.подавленное": {"t": "stk", "n": "48"}, "mood.раздражённое": {"t": "stk", "n": "16"}, "mood.тревожное": {"t": "stk", "n": "10"}, "mood.scale.left": {"t": "stk", "n": "48"}, "mood.scale.mid": {"t": "stk", "n": "10"}, "mood.scale.right": {"t": "stk", "n": "03"}, "mood.reply": {"t": "none"}, "mood.reason": {"t": "none"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
// цвет отметки на шкале; стикер берётся из карты по названию настроения
var MOODS={
'прекрасное':'#e896a8',
'хорошее':'#6fb05a',
'спокойное':'#5181b8',
'нейтральное':'#8f9aa6',
'уставшее':'#c0a878',
'подавленное':'#9a85b8',
'раздражённое':'#d2756e',
'раздраженное':'#d2756e',
'тревожное':'#d0a060'
};
function render(){
var rd=widget.querySelector('.raw-data');if(!rd)return;
var raw=(rd.innerText||rd.textContent).trim();var f={};
raw.split('\n').forEach(function(line){var c=line.indexOf(':');if(c!==-1){var k=line.substring(0,c).trim().toLowerCase();var v=line.substring(c+1).trim();if(v)f[k]=v;}});
var charName=(f['char']&&!f['char'].includes('{{'))?f['char']:'Она';
var target=(f['target']&&!f['target'].includes('{{'))?f['target']:'Ты';
function set(s,v){var el=widget.querySelector(s);if(el)el.textContent=v;}
set('.mood-target',target);set('.mood-char',charName);set('.mood-char2',charName);
var moodRaw=f['mood']||'Нейтральное';var key=moodRaw.toLowerCase();
var known=MOODS.hasOwnProperty(key);
var col=known?MOODS[key]:MOODS['нейтральное'];
var stkKey='mood.'+(known?key.replace('раздраженное','раздражённое'):'нейтральное');
var em=widget.querySelector('.mood-emoji');if(em)em.innerHTML=vkI(stkKey,'vkp-ava');
var nm=widget.querySelector('.mood-name');nm.textContent=moodRaw;
var pct=parseInt(f['percent']);if(isNaN(pct))pct=50;if(pct<0)pct=0;if(pct>100)pct=100;
set('.mood-pct',pct+'%');
var mk=widget.querySelector('.mood-marker');
mk.style.left=pct+'%';
mk.style.borderColor=col;
set('.mood-note',f['note']&&!f['note'].includes('{{')?f['note']:'');
set('.mood-reaction',f['reaction']&&!f['reaction'].includes('{{')?f['reaction']:'');
var obs=widget.querySelector('.mood-obs');var oh='';
if(f['observations']&&!f['observations'].includes('{{')){
f['observations'].split(',').forEach(function(o){if(o.trim())oh+='<span class="vkp-chip soft">'+vkE(o.trim())+'</span>';});
}
obs.innerHTML=oh;obs.style.display=oh?'flex':'none';
var ft=widget.querySelector('.mood-foot');
if(ft){if(f['reason']&&!f['reason'].includes('{{')){ft.innerHTML=vkI('mood.reason');ft.appendChild(document.createTextNode(f['reason']));ft.style.display='block';}else ft.style.display='none';}
}
setTimeout(render,50);
}),
  fet: (function(widget){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"moodlet.😤": {"t": "stk", "n": "16"}, "moodlet.💤": {"t": "stk", "n": "29"}, "moodlet.🔥": {"t": "stk", "n": "21"}, "moodlet.🛡": {"t": "stk", "n": "35"}, "moodlet.💬": {"t": "stk", "n": "17"}, "moodlet.💔": {"t": "stk", "n": "48"}, "moodlet.🧊": {"t": "stk", "n": "12"}, "moodlet.😰": {"t": "stk", "n": "10"}, "moodlet.🤕": {"t": "stk", "n": "48"}, "moodlet.😢": {"t": "stk", "n": "11"}, "moodlet.🌸": {"t": "stk", "n": "08"}, "moodlet.🌀": {"t": "stk", "n": "19"}, "moodlet.😌": {"t": "stk", "n": "33"}, "moodlet.👀": {"t": "stk", "n": "22"}, "moodlet.🌙": {"t": "stk", "n": "32"}, "moodlet.🍷": {"t": "stk", "n": "37"}, "moodlet.🚬": {"t": "stk", "n": "47"}, "moodlet.🍔": {"t": "stk", "n": "46"}, "moodlet.🍽": {"t": "stk", "n": "20"}, "moodlet.🫥": {"t": "stk", "n": "04"}, "fet.header": {"t": "stk", "n": "09"}, "fet.flames": {"t": "emoji", "e": "🔥"}, "fet.body": {"t": "none"}, "fet.triggers": {"t": "none"}, "fet.heat": {"t": "none"}, "fet.footer": {"t": "none"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
function clean(v,limit){var s=v?(''+v).replace(/_/g,' ').replace(/[\[\]]/g,'').trim():'';if(limit&&s.length>limit){s=s.substring(0,limit).replace(/\s+\S*$/,'')+'…';}return s;}
function ok(v){return v&&!v.includes('{{')&&['omit','none','skip','-','нет','пусто'].indexOf((''+v).toLowerCase())===-1;}
function render(){
var rd=widget.querySelector('.raw-data');if(!rd)return;
var raw=(rd.innerText||rd.textContent).trim();
var lines=raw.split('\n');var f={};var cards=[];var inCards=false;
for(var i=0;i<lines.length;i++){
var line=lines[i].trim();if(!line)continue;
if(line.toLowerCase()==='cards:'){inCards=true;continue;}
if(inCards){
if(line.match(/^\[\//)){inCards=false;continue;}
if(line.match(/^[a-z_]+:\s/)){inCards=false;}
else{var m=line.match(/^(\S+)\s+(.+?)\s*\|\s*(.+?)\s*\|\s*(.+)$/);
if(m)cards.push({icon:m[1].trim(),name:clean(m[2],40),desc:clean(m[3],90),trigger:clean(m[4],70)});continue;}
}
var parts=line.split('|');
for(var j=0;j<parts.length;j++){var part=parts[j].trim();var c=part.indexOf(':');if(c===-1)continue;var k=part.substring(0,c).trim().toLowerCase();var v=part.substring(c+1).trim();if(v)f[k]=v;}
}
var lvl=parseFloat(f['intensity']);if(isNaN(lvl))lvl=1;if(lvl<0)lvl=0;if(lvl>5)lvl=5;
var heat;
if(lvl<=1.5)heat='#a8687f';
else if(lvl<=2.5)heat='#c25f7a';
else if(lvl<=3.5)heat='#d24c6c';
else if(lvl<=4.5)heat='#d83e62';
else heat='#e2345e';
var cont=widget.querySelector('.fet-container');
cont.style.setProperty('--hex',heat);
var ch=widget.querySelector('.fet-char');if(ch)ch.textContent=f['char']||'';
var FL=vkI('fet.flames');var fh='';
if(FL){
for(var p=1;p<=5;p++){
var fill=Math.max(0,Math.min(1,lvl-(p-1)));
fh+='<span class="fet-flame"><span class="d">'+FL+'</span><span class="l" style="width:'+(fill*100).toFixed(0)+'%;">'+FL+'</span></span>';
}
}
widget.querySelector('.fet-flames').innerHTML=fh;
var lvlEl=widget.querySelector('.fet-lvl');if(lvlEl)lvlEl.textContent=(lvl%1===0?lvl.toFixed(0):lvl.toFixed(1))+'/5';
var html='';
if(ok(f['trigger_desc'])){
html+='<div class="vkp-sec"><div class="vkp-label">'+vkI('fet.body')+'Реакция тела</div>';
html+='<div class="vkp-quote fet-q" style="border-left-color:'+heat+';">'+vkE(clean(f['trigger_desc']))+'</div></div>';
}
if(cards.length>0){
html+='<div class="vkp-sec"><div class="vkp-label">'+vkI('fet.triggers')+'Активные триггеры</div><div class="fet-cards">';
cards.forEach(function(c){
html+='<div class="fet-card"><div class="fet-card-head"><span class="fet-card-icon">'+vkE(c.icon.replace(/[\[\]]/g,''))+'</span><span class="fet-card-name">'+vkE(c.name)+'</span></div>';
html+='<div class="fet-card-desc">'+vkE(c.desc)+'</div>';
html+='<div class="fet-card-trig">'+vkE(c.trigger)+'</div></div>';
});
html+='</div></div>';
}
var boost=ok(f['chemistry_boost'])?f['chemistry_boost']:null;
var mood=ok(f['active_moodlet'])?clean(f['active_moodlet']):null;
if(boost||mood){
html+='<div class="vkp-sec fet-stats">';
if(boost)html+='<div class="fet-stat"><div class="vkp-label">'+vkI('fet.heat')+'Накал</div><div class="fet-stat-val" style="color:'+heat+';">'+vkE(boost)+'</div></div>';
if(mood)html+='<div class="fet-stat"><div class="vkp-label">Мудлет</div>'+vkMoodlet(mood)+'</div>';
html+='</div>';
}
widget.querySelector('.fet-body').innerHTML=html;
var ft=widget.querySelector('.fet-footer');
if(ft)ft.innerHTML='<span>'+vkI('fet.footer')+'влияет на сцену</span><span style="color:'+heat+';font-weight:500;">'+vkE(f['count']||'1')+' активных</span>';
}
setTimeout(render,50);
}),
  msg: (function(w){
var VKS=(function(){try{var P=window.parent.__VK2017_STK;if(P&&typeof P==='object')return P;}catch(e){}return {};})();var VKU='https://podslushano-album.spletnik-meme-worker.workers.dev/stk/';function vkStk(n){return VKS[n]||(VKU+n+'.webp');}var VKM={"msg.avatar": {"t": "letter"}, "msg.mic": {"t": "icon", "svg": "<svg class=\"vkp-icon\" viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path fill=\"currentColor\" d=\"M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2z\"/></svg>"}};var VK_ZW=/[\uFE0F\u200D]/g;var VK_EMO=/^([\u2600-\u27BF\uD83C-\uDBFF\uDC00-\uDFFF\uFE0F\u200D]+)\s*/;function vkE(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}function vkKey(k){return String(k).replace(VK_ZW,'');}function vkT(k){var m=VKM[vkKey(k)];return m?m.t:'none';}function vkSrc(k){var m=VKM[vkKey(k)];return (m&&m.t==='stk')?vkStk(m.n):'';}function vkI(k,cls){var m=VKM[vkKey(k)];if(!m)return '';if(m.t==='stk')return '<img class="'+(cls||'vkp-stk')+'" src="'+vkE(vkStk(m.n))+'" alt="">';if(m.t==='emoji')return '<span class="vkp-emo '+(cls||'')+'">'+m.e+'</span>';if(m.t==='icon')return m.svg||'';return '';}function vkMoodlet(s){s=String(s);var mm=s.match(VK_EMO);if(!mm)return '<span class="vkp-chip">'+vkE(s)+'</span>';var key='moodlet.'+vkKey(mm[1]);var rest=s.substring(mm[0].length);var t=VKM[vkKey(key)]?vkT(key):'';if(t==='stk')return '<span class="vkp-chip">'+vkI(key)+vkE(rest)+'</span>';if(t==='none')return '<span class="vkp-chip">'+vkE(rest)+'</span>';return '<span class="vkp-chip">'+vkE(s)+'</span>';}
function esc(t){var e=document.createElement('div');e.textContent=t;return e.innerHTML;}
function norm(t){return (t||'').toLowerCase().replace(/[^\wа-яё\s]/gi,'').replace(/\s+/g,' ').trim();}
function same(a,b){
a=norm(a);b=norm(b);
if(!a||!b)return false;
if(a===b)return true;
if(a.indexOf(b)===0||b.indexOf(a)===0)return true;
var fa=a.split(' ')[0],fb=b.split(' ')[0];
return !!fa&&fa===fb;
}
function render(){
var rd=w.querySelector('.imsg-raw');
var list=w.querySelector('.imsg-list');
var head=w.querySelector('.imsg-chat');
if(!rd||!list)return;
var raw=(rd.value!==undefined?rd.value:(rd.innerText||rd.textContent||''));
if(!raw||raw.indexOf('{{')!==-1){list.innerHTML='';return;}
var uName=w.getAttribute('data-user')||'';
var cName=w.getAttribute('data-char')||'';
if(uName.indexOf('{{')!==-1)uName='';
if(cName.indexOf('{{')!==-1)cName='';
var chatName='';
var lines=raw.split(/\r?\n/);
var msgs=[];
var inList=false;
for(var k=0;k<lines.length;k++){
var line=lines[k].trim();
if(!line)continue;
var head_m=line.match(/^(chat|чат)\s*:\s*(.+)$/i);
if(head_m){chatName=head_m[2].trim();inList=false;continue;}
if(/^(messages?|сообщени[яе])\s*:\s*$/i.test(line)){inList=true;continue;}
var i=line.indexOf(':');
if(i===-1)continue;
var sender=line.substring(0,i).trim();
var body=line.substring(i+1).trim();
if(!sender||!body)continue;
if(sender.length>40)continue;
if(/^\/\//.test(sender))continue;
var time='';
var p=body.lastIndexOf('|');
if(p!==-1){
var tail=body.substring(p+1).trim();
if(tail.length<=12){time=tail;body=body.substring(0,p).trim();}
}
if(!body)continue;
msgs.push({sender:sender,body:body,time:time});
}
var title=chatName||cName||'Сообщения';
if(head)head.textContent=title;
var ava=w.querySelector('.vkm-ava');
if(ava){
var at=vkT('msg.avatar');
if(at==='letter')ava.textContent=title.charAt(0).toUpperCase();
else ava.innerHTML=vkI('msg.avatar');
}
var html='';
msgs.forEach(function(m){
// СТОРОНА = от шапки. Кто в шапке — тот собеседник (слева).
// Все остальные — владелец телефона (справа).
var s=norm(m.sender),right;
var leftName = chatName || cName;
if(s==='me'||s==='я'||s==='user'||s==='you')right=true;
else if(leftName&&same(m.sender,leftName))right=false;
else right=true;
html+='<div class="vkm-row" style="align-items:'+(right?'flex-end':'flex-start')+';">';
html+='<div class="vkm-b '+(right?'vkm-out':'vkm-in')+'">'+esc(m.body)+'</div>';
if(m.time)html+='<div class="vkm-t">'+esc(m.time)+'</div>';
html+='</div>';
});
list.innerHTML=html;
list.scrollTop=list.scrollHeight;
}
render();
// по умолчанию свёрнуто: при раскрытии листаем к последнему сообщению
var dt=w.querySelector('details');
if(dt)dt.addEventListener('toggle',function(){var l=w.querySelector('.imsg-list');if(l)l.scrollTop=l.scrollHeight;});
if(window.MutationObserver){
var rd=w.querySelector('.imsg-raw');
if(rd)new MutationObserver(render).observe(rd,{childList:true,characterData:true,subtree:true});
}
})
};
