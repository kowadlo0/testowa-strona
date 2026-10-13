const c=document.getElementById('snow'),x=c.getContext('2d');let W,H,f=[];
function rs(){W=c.width=innerWidth;H=c.height=innerHeight}rs();addEventListener('resize',rs);
for(let i=0;i<90;i++)f.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*3+1,s:Math.random()*1+.4,w:Math.random()*6});
(function a(){x.clearRect(0,0,W,H);x.fillStyle='rgba(255,255,255,.9)';f.forEach(p=>{p.y+=p.s;p.w+=.01;p.x+=Math.sin(p.w)*.5;if(p.y>H){p.y=-5;p.x=Math.random()*W}x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});requestAnimationFrame(a)})();
const io=new IntersectionObserver(e=>e.forEach(en=>{if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
const st=document.getElementById('status'),cnt=document.getElementById('count');
function tick(){const n=new Date(),y=n.getMonth()===11&&n.getDate()>20?n.getFullYear()+1:n.getFullYear();
const start=new Date(y,11,5,15),end=new Date(y,11,20,22);let target;
if(n>=start&&n<=end){const h=n.getHours();if(h>=15&&h<22){st.textContent='🎄 Otwarte teraz! Zapraszamy do 22:00';st.className='status open reveal in';cnt.style.display='none';return}
st.textContent='Dziś otwieramy o 15:00 – zostało:';st.className='status reveal in';target=new Date(n);if(h>=22)target.setDate(target.getDate()+1);target.setHours(15,0,0,0)}
else{st.textContent='Do otwarcia sezonu zostało:';target=start}
cnt.style.display='';let d=Math.max(0,(target-n)/1000);
['d','h','m','s'].forEach((k,i)=>{const v=[86400,3600,60,1][i];document.getElementById(k).textContent=Math.floor(d/v);d%=v})}
tick();setInterval(tick,1000);
if(location.search.includes('static')||!('IntersectionObserver' in window))document.documentElement.classList.add('static'),document.querySelectorAll('.reveal').forEach(e=>e.classList.add('in'));
// ornaments row
const orn=document.getElementById('orn');if(orn){const cols=['#c62828','#d4a017','#2f6b3a','#e07a2e','#8e1b2b'];for(let i=0;i<14;i++){const d=document.createElement('div');d.className='o';d.style.setProperty('--l',(8+Math.random()*40)+'px');d.style.setProperty('--c',cols[i%5]);d.style.animationDelay=(-Math.random()*3)+'s';orn.appendChild(d)}}
// string lights
document.querySelectorAll('.lights').forEach(l=>{for(let i=0;i<40;i++){const b=document.createElement('i');b.style.animationDelay=(i%4*.4)+'s';l.appendChild(b)}});
// gifts
const TOYS=['🧸','🚂','🪆','🐴','⚽','🎈','🚗','🪀','🦄','🎨','🧩','🥁','⭐','🍬'];let AC;
function giggle(){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const t=AC.currentTime;for(let i=0;i<5;i++){const o=AC.createOscillator(),g=AC.createGain();o.type='triangle';o.frequency.setValueAtTime(700+Math.random()*250,t+i*.13);o.frequency.exponentialRampToValueAtTime(420,t+i*.13+.1);g.gain.setValueAtTime(.0001,t+i*.13);g.gain.exponentialRampToValueAtTime(.12,t+i*.13+.02);g.gain.exponentialRampToValueAtTime(.0001,t+i*.13+.11);o.connect(g).connect(AC.destination);o.start(t+i*.13);o.stop(t+i*.13+.12)}}catch(e){}}
document.querySelectorAll('.gift').forEach(g=>g.addEventListener('click',()=>{if(g.classList.contains('open'))return;g.classList.add('open');giggle();
 const r=g.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top;const ps=[];
 for(let i=0;i<14;i++){const e=document.createElement('div');e.className='toy';e.textContent=TOYS[Math.random()*TOYS.length|0];document.body.appendChild(e);
  ps.push({e,x:cx-20,y:cy-20,vx:(Math.random()-.5)*12,vy:-10-Math.random()*9,r:0,vr:(Math.random()-.5)*20,b:0})}
 const floor=innerHeight-50;let t0=performance.now();
 (function step(now){const age=now-t0;ps.forEach(p=>{p.vy+=.45;p.x+=p.vx;p.y+=p.vy;p.r+=p.vr;if(p.y>floor){p.y=floor;p.vy*=-.55;p.vx*=.8;p.vr*=.7;p.b++}
  p.e.style.transform=`translate(${p.x}px,${p.y}px) rotate(${p.r}deg)`;p.e.style.opacity=age>2600?Math.max(0,1-(age-2600)/600):1});
  if(age<3200)requestAnimationFrame(step);else{ps.forEach(p=>p.e.remove());g.classList.remove('open')}})(t0);
}));
