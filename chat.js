(function(){
const TEL='123 222 444',TELH='tel:+48123222444',MAIL='choinki@gmail.com';
const santa='<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="36" r="17" fill="#f3c9a8"/><path d="M15 38 Q14 60 32 62 Q50 60 49 38 Q42 46 32 44 Q22 46 15 38Z" fill="#fff"/><circle cx="26" cy="34" r="2.3" fill="#222"/><circle cx="38" cy="34" r="2.3" fill="#222"/><circle cx="32" cy="40" r="3" fill="#e88"/><path d="M14 28 Q30 0 54 14 L50 26Z" fill="#c62828"/><circle cx="55" cy="14" r="5" fill="#fff"/><rect x="12" y="24" width="40" height="8" rx="4" fill="#fff"/></svg>';
const prices=[...document.querySelectorAll('#cennik tbody tr')].map(r=>[...r.cells].map(c=>c.textContent.trim()));
const heads=[...document.querySelectorAll('#cennik thead th')].map(c=>c.textContent.trim());
const go=id=>({label:'Pokaż na stronie',fn:()=>{close();document.getElementById(id).scrollIntoView({behavior:'smooth'})}});
const priceTbl=rows=>'<table>'+rows.map(r=>'<tr>'+r.map((c,i)=>`<td>${i?heads[i]+': ':''}${i?'<b>'+c+'</b>':'<b>'+c+'</b>'}</td>`).join('')+'</tr>').join('')+'</table>';
const priceFor=n=>{const r=prices.find(p=>norm(p[0]).includes(n));return r?{html:`<b>${r[0]}</b> – przykładowe ceny:<table>${r.slice(1).map((c,i)=>`<tr><td>${heads[i+1]}</td><td><b>${c}</b></td></tr>`).join('')}</table>Ceny orientacyjne, zależą od konkretnego drzewka.`,act:go('cennik')}:null};
const norm=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ł/g,'l');
const A={
 godziny:()=>({html:'Zapraszamy <b>od 5 do 20 grudnia</b>, codziennie w godz. <b>14:00–22:00</b> 🕒\nTakże w weekendy!',act:go('godziny')}),
 ceny:()=>({html:'Przykładowy cennik (wg wysokości):'+'<table>'+prices.map(r=>`<tr><td><b>${r[0]}</b></td><td>od ${r[1]}</td></tr>`).join('')+'</table>Dodatki: stojak od 75 zł, siatkowanie gratis, docięcie pnia 10 zł.',act:go('cennik')}),
 dowoz:()=>({html:'🚚 Dowozimy choinki po <b>Mokotowie za 30 zł</b>. Na miejscu zapakujemy drzewko w siatkę (<b>gratis</b>), a stojak dobierzesz <b>od 75 zł</b>.'}),
 dojazd:()=>({html:'📍 Znajdziesz nas przy <b>ul. Bluszczańskiej</b> w Warszawie (Mokotów, Siekierki).',act:go('dojazd')}),
 gatunki:()=>({html:'Mamy 4 gatunki 🌲\n• <b>Świerk pospolity</b> – klasyka, intensywny zapach\n• <b>Jodła kaukaska</b> – miękkie igły, długo nie opadają\n• <b>Świerk srebrny</b> – niebieskawy, regularny\n• <b>Sosna</b> – długie, puszyste igły'}),
 kontakt:()=>({html:`📞 <a href="${TELH}">${TEL}</a>\n✉️ <a href="mailto:${MAIL}">${MAIL}</a>`,act:go('kontakt')}),
 stojak:()=>({html:'Stojaki mamy <b>od 75 zł</b>, a docięcie pnia kosztuje 10 zł 🪚'}),
 siatka:()=>({html:'Siatkowanie jest <b>gratis</b> – choinka zmieści się w każdym aucie 🎁'}),
 hello:()=>({html:'Cześć! 👋 Wybierz temat poniżej albo zapytaj o godziny, ceny, dowóz czy gatunki.'}),
 thanks:()=>({html:'Proszę bardzo! Wesołych Świąt 🎅🎄'}),
};
const RULES=[
 [/jodl/,()=>priceFor('jodla')],[/srebrn/,()=>priceFor('srebrny')],[/sosn/,()=>priceFor('sosna')],[/swierk|swierka/,()=>priceFor('swierk pospolity')],
 [/stojak/,A.stojak],[/siatk|pakow/,A.siatka],
 [/cen|koszt|ile|cennik|tani|drog|zl\b|zlot/,A.ceny],
 [/dow[oó]z|dostaw|przywiez|zawiez|transport/,A.dowoz],
 [/godzin|otwar|otwier|o ktorej|zamyka|czynne|kiedy|grudni|dzis|jutro|weekend|niedziel|sobot/,A.godziny],
 [/gdzie|dojazd|dojech|adres|mapa|ulic|bluszcz|lokaliz|parking/,A.dojazd],
 [/gatun|rodzaj|jaki|jakie|polec|igl/,A.gatunki],
 [/kontakt|telefon|zadzwon|numer|mail|email|napis/,A.kontakt],
 [/dzieki|dziekuje|thx|dzieki/,A.thanks],[/^(czesc|hej|dzien dobry|witam|siema|elo)/,A.hello],
];
const fallback=()=>({html:`Hmm, nie jestem pewien 🤔 Najlepiej zadzwoń: <a href="${TELH}">${TEL}</a> albo wybierz temat poniżej.`});
const root=document.createElement('div');root.className='ch';
root.innerHTML=`<button class="ch-fab" aria-label="Otwórz czat – Pomocnik" aria-expanded="false" aria-controls="chPanel">${santa}<span class="lbl">Pomocnik</span><span class="dot"></span></button>
<div class="ch-panel" id="chPanel" role="dialog" aria-modal="false" aria-labelledby="chTitle">
 <div class="ch-head">${santa}<div><b id="chTitle">Świąteczny Pomocnik</b><small>Odpowiadam od razu 🎄</small></div><button class="ch-x" aria-label="Zamknij czat">✕</button></div>
 <div class="ch-log" role="log" aria-live="polite"></div>
 <div class="ch-quick">${[['godziny','Godziny otwarcia'],['ceny','Ceny'],['dowoz','Dowóz'],['dojazd','Jak dojechać'],['gatunki','Gatunki choinek'],['kontakt','Kontakt']].map(([k,l])=>`<button data-k="${k}">${l}</button>`).join('')}</div>
 <form class="ch-form"><label class="ch-sr" for="chIn">Twoje pytanie</label><input id="chIn" autocomplete="off" placeholder="Zadaj pytanie…"><button aria-label="Wyślij">➤</button></form>
 <div class="ch-cta"><a href="${TELH}">📞 Zadzwoń</a><a href="mailto:${MAIL}">✉️ Napisz e-mail</a></div>
</div>`;
document.body.appendChild(root);
const fab=root.querySelector('.ch-fab'),log=root.querySelector('.ch-log'),inp=root.querySelector('#chIn');let greeted=false;
function add(cls,html,act){const m=document.createElement('div');m.className='ch-m '+cls;m.innerHTML=html;if(act){const b=document.createElement('button');b.className='ch-act';b.textContent=act.label+' ↓';b.onclick=act.fn;m.appendChild(b)}log.appendChild(m);log.scrollTop=log.scrollHeight}
let Q=Promise.resolve();function bot(r){Q=Q.then(()=>new Promise(res=>{const t=document.createElement('div');t.className='ch-m ch-bot ch-typing';t.setAttribute('aria-label','Pomocnik pisze');t.innerHTML='<i></i><i></i><i></i>';log.appendChild(t);log.scrollTop=log.scrollHeight;
 setTimeout(()=>{t.remove();add('ch-bot',r.html,r.act);res()},550+Math.min(700,r.html.length*2))}))}
function ask(q){const esc=q.replace(/[<>&]/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;'}[c]));add('ch-me',esc);const n=norm(q);const hit=RULES.find(([re])=>re.test(n));bot(hit&&hit[1]()||fallback())}
function open(){document.documentElement.classList.add('ch-open');fab.setAttribute('aria-expanded','true');if(!greeted){greeted=true;add('ch-bot','Cześć! Jestem Świąteczny Pomocnik 🎄 W czym mogę pomóc?')}setTimeout(()=>inp.focus({preventScroll:true}),50)}
function close(){document.documentElement.classList.remove('ch-open');fab.setAttribute('aria-expanded','false');fab.focus({preventScroll:true})}
fab.onclick=()=>document.documentElement.classList.contains('ch-open')?close():open();
root.querySelector('.ch-x').onclick=close;
root.querySelectorAll('.ch-quick button').forEach(b=>b.onclick=()=>{add('ch-me',b.textContent);bot(A[b.dataset.k]())});
root.querySelector('.ch-form').onsubmit=e=>{e.preventDefault();const q=inp.value.trim();if(q){inp.value='';ask(q)}};
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&document.documentElement.classList.contains('ch-open'))close()});
window.chatAsk=ask;
})();
