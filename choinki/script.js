const c=document.getElementById('snow'),x=c.getContext('2d');let W,H,f=[];
function rs(){W=c.width=innerWidth;H=c.height=innerHeight}rs();addEventListener('resize',rs);
for(let i=0;i<140;i++)f.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*3+1,s:Math.random()*1+.4,w:Math.random()*6});
(function a(){x.clearRect(0,0,W,H);x.fillStyle='rgba(255,255,255,.85)';f.forEach(p=>{p.y+=p.s;p.w+=.01;p.x+=Math.sin(p.w)*.5;if(p.y>H){p.y=-5;p.x=Math.random()*W}x.beginPath();x.arc(p.x,p.y,p.r,0,7);x.fill()});requestAnimationFrame(a)})();
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
