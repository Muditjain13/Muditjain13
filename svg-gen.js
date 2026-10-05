// Generates the animated profile SVGs. Browser: window.MJSVG. Node: `node build-assets.js`.
(function (root) {
const mk=(x,y,c)=>`<path d="M${x-7} ${y}h14M${x} ${y-7}v14" stroke="${c}" stroke-width="1"/>`;
const frame=(W,H,t)=>`<rect width="${W}" height="${H}" fill="${t.bg}"/><rect x="20.5" y="16.5" width="${W-41}" height="${H-33}" fill="none" stroke="${t.ln}"/>${mk(20.5,16.5,t.mk)}${mk(W-20.5,16.5,t.mk)}${mk(20.5,H-16.5,t.mk)}${mk(W-20.5,H-16.5,t.mk)}`;
const THEMES={
 light:{bg:"#f2f2f3",e:"#e7e7ea",ln:"#d4d4d7",mk:"#7a7a7d",tx:"#1d1f20",mu:"#5d5d60",pal:["#5980a6","#d9694f","#d9a23a","#4f9e7a","#8a6fc4","#c9608f"]},
 dark:{bg:"#161b22",e:"#21262d",ln:"#30363d",mk:"#8b949e",tx:"#f0f6fc",mu:"#c9d1d9",pal:["#94bce3","#f08d74","#f2c463","#6fcf9f","#b39cf0","#ec8ab4"]}
};
const esc=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const cond="font-family:'Nunito','Segoe UI',Helvetica,Arial,sans-serif;font-weight:700;letter-spacing:.01em";
const FONT=(typeof module!=="undefined"&&module.exports)?require("./font-data.js"):null;
const ff=()=>{const d=FONT||root.MJFONT;return d?`@font-face{font-family:'Nunito';src:url(data:font/woff2;base64,${d}) format('woff2');font-weight:500 800}`:"";};
const G={M:["10001","11011","10101","10101","10001","10001","10001"],U:["10001","10001","10001","10001","10001","10001","01110"],D:["11110","10001","10001","10001","10001","10001","11110"],I:["11111","00100","00100","00100","00100","00100","11111"],T:["11111","00100","00100","00100","00100","00100","00100"],J:["00111","00010","00010","00010","00010","10010","01100"],A:["01110","10001","10001","11111","10001","10001","10001"],N:["10001","11001","10101","10011","10001","10001","10001"]};
Object.assign(G,{E:["11111","10000","10000","11110","10000","10000","11111"],X:["10001","10001","01010","00100","01010","10001","10001"],P:["11110","10001","10001","11110","10000","10000","10000"],C:["01111","10000","10000","10000","10000","10000","01111"],H:["10001","10001","10001","11111","10001","10001","10001"],G:["01111","10000","10000","10011","10001","10001","01111"],R:["11110","10001","10001","11110","10100","10010","10001"],B:["11110","10001","10001","11110","10001","10001","11110"],K:["10001","10010","10100","11000","10100","10010","10001"]});
const WORDS=["MUDIT JAIN"],SLOT=6;
const COLS=65,ROWS=9,P=17,S=13;
const wordCells=WORDS.map(w=>{const m=new Map();let c=0,gi=0;for(const ch of w){if(ch===" "){c+=3;continue;}G[ch].forEach((r,y)=>[...r].forEach((b,x)=>{if(b==="1")m.set((c+x)+","+(y+1),gi)}));c+=6;gi++;}const off=Math.floor((COLS-(c-1))/2);const out=new Map();m.forEach((v,k)=>{const [x,y]=k.split(",").map(Number);out.set((x+off)+","+y,v)});return out;});
const rng=s=>()=>(s=(s*16807)%2147483647)/2147483647;

function header(t){
 const W=1200,H=300,x0=Math.round((W-(COLS*P-4))/2),y0=36,rnd=rng(13),cells=[];
 for(let y=0;y<ROWS;y++)for(let x=0;x<COLS;x++){
  const X=x0+x*P,Y=y0+y*P,r=rnd();
  if((y===0||y===ROWS-1)&&r>.8){const f=t.pal[Math.floor(rnd()*6)];cells.push(`<rect x="${X}" y="${Y}" width="${S}" height="${S}" fill="${t.e}"/><rect class="tw" x="${X}" y="${Y}" width="${S}" height="${S}" fill="${f}" opacity="0.15" style="animation-delay:${(rnd()*6).toFixed(2)}s"/>`);}
  else cells.push(`<rect x="${X}" y="${Y}" width="${S}" height="${S}" fill="${t.e}"/>`);
 }
 wordCells.forEach((m,w)=>m.forEach((gix,k)=>{const [x,y]=k.split(",").map(Number);cells.push(`<rect class="w${w}" x="${x0+x*P}" y="${y0+y*P}" width="${S}" height="${S}" fill="${t.pal[(gix+w)%t.pal.length]}"${w?' opacity="0"':""} style="animation-delay:${(0.25+x*0.035+y*0.02).toFixed(2)}s,${(3.2+x*0.045).toFixed(2)}s"/>`);}));
 const T=SLOT*WORDS.length,pc=v=>(v/T*100).toFixed(2);
 const wcss=`.w0{opacity:0;transform-box:fill-box;transform-origin:center;animation:in .5s cubic-bezier(.2,.8,.2,1) forwards,blink 2.8s ease-in-out infinite}
@keyframes blink{0%,100%{opacity:1}12%{opacity:.25}24%{opacity:1}}`;
 const gw=COLS*P-4,gb=y0+ROWS*P-4;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Mudit Jain">
<style>${ff()}
${wcss}
@keyframes in{0%{opacity:0;transform:scale(.2)}60%{opacity:1;transform:scale(1.15)}100%{opacity:1;transform:scale(1)}}
.tw{animation:tw 6s ease-in-out infinite}@keyframes tw{0%,100%{opacity:.12}50%{opacity:.35}}
.scan{animation:scan 7s 2.6s linear infinite}
@keyframes scan{0%{transform:translateX(0);opacity:0}4%{opacity:.9}70%{opacity:.9}74%,100%{transform:translateX(${gw}px);opacity:0}}
.t{${cond}}.fade{opacity:0;animation:f .8s 2.2s ease forwards}@keyframes f{to{opacity:1}}
.blink{animation:b 1s steps(1) infinite}@keyframes b{50%{opacity:0}}
</style>
${frame(W,H,t)}<g>${cells.join("")}</g>
<rect class="scan" x="${x0-2}" y="${y0-8}" width="2" height="${gb-y0+16}" fill="${t.pal[1]}" opacity="0"/>
<line x1="${x0}" y1="${gb+26.5}" x2="${x0+gw}" y2="${gb+26.5}" stroke="${t.ln}"/>
<g class="fade">
<text class="t" x="${x0}" y="${gb+54}" font-size="17" fill="${t.tx}">Fig. 01 · AI &amp; backend engineer</text>
<text class="t" x="${x0+gw/2}" y="${gb+54}" font-size="17" text-anchor="middle"><tspan fill="${t.pal[3]}">Go</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${t.pal[1]}">Java</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${t.pal[0]}">C++</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${t.pal[2]}">Python</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${t.pal[4]}">LLMs</tspan></text>
<text class="t" x="${x0+gw}" y="${gb+54}" font-size="17" fill="${t.tx}" text-anchor="end">@Muditjain13 <tspan class="blink" fill="${t.pal[4]}">▌</tspan></text>
</g></svg>`;}

const PROJECTS=[
 ["RoadRunner Transport","Multi-modal booking engine · 8 microservices, saga + outbox","Go · gRPC · Kafka",3],
 ["SLDS-E Secure Transfer","NFC mutual auth + Wi-Fi Direct, signed PDFs","C++ · Java · Python",0],
 ["Agentic AI Orchestrator","AI planner routes subtasks across 4 tool agents","LangGraph · FastAPI · React",4],
 ["Autonomous Support AI","Multi-agent RAG · 93% accuracy · 1.5s latency","LangGraph · Chroma",1],
 ["Crypto Ledger","Double-entry ledger, SHA-256 hash-chained","Java 17 · Spring Boot",2],
 ["Uni File Format","AES-256 image/video container · 2.2× lossless","C++",0],
 ["Vaidehi Payments","12 PCI-DSS requirements · ML fraud detection","Node · ML · SQL",5],
 ["Telegram Alerter","Pattern alerts across chats, sent to email + Telegram","Python",2],
 ["Media Downloader Bot","Telegram bot for video, audio and images from any site","Python · yt-dlp · FFmpeg",4],
 ["Flag Quiz","Android quiz app with persistent settings","Android · Gradle",3]];
function projects(t){
 const W=1200,top=74,rh=50,H=top+PROJECTS.length*rh+20;
 const body=PROJECTS.map((r,i)=>{const y=top+i*rh,col=t.pal[r[3]];return `
 <g class="row" style="animation-delay:${0.2+i*0.18}s">
  ${i<PROJECTS.length-1?`<line x1="40" y1="${y+rh}" x2="${W-40}" y2="${y+rh}" stroke="${t.ln}"/>`:""}
  <rect x="40" y="${y+12}" width="4" height="${rh-24}" fill="${col}"/>
  <text class="t" x="60" y="${y+31}" font-size="15" fill="${col}">0${i+1}</text>
  <text class="b" x="104" y="${y+31}" font-size="17" font-weight="700" fill="${t.tx}">${r[0]}</text>
  <text class="b" x="400" y="${y+31}" font-size="15" fill="${t.mu}">${esc(r[1])}</text>
  <circle class="pulse" cx="${W-310}" cy="${y+26}" r="5" fill="${col}" style="animation-delay:${i*0.35}s"/>
  <text class="t" x="${W-295}" y="${y+31}" font-size="14" fill="${t.tx}">${r[2]}</text>
 </g>`}).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Projects">
<style>${ff()}.t{${cond}}.b{font-family:'Nunito','Segoe UI',Helvetica,Arial,sans-serif;font-weight:500}
.row{opacity:0;animation:in .6s ease forwards}@keyframes in{from{opacity:0;transform:translateX(-10px)}to{opacity:1;transform:none}}
.pulse{transform-box:fill-box;transform-origin:center;animation:p 2.4s ease-in-out infinite}@keyframes p{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.6);opacity:.4}}</style>
${frame(W,H,t)}
<line x1="20.5" y1="${top}" x2="${W-20.5}" y2="${top}" stroke="${t.ln}"/>
<text class="t" x="60" y="52" font-size="15" fill="${t.tx}">Sheet 04 · Selected projects</text>
<line x1="${W-330}" y1="16.5" x2="${W-330}" y2="${top}" stroke="${t.ln}"/>
<text class="t" x="${W-310}" y="52" font-size="14" fill="${t.mu}">Built with</text>
<text class="t" x="${W-350}" y="52" font-size="14" fill="${t.pal[1]}" text-anchor="end">What it does</text>
${body}</svg>`;}

function terminal(t){
 const W=1200,lines=[["$","whoami",0],["","Mudit Jain · AI & Backend Engineer · M.Tech Software Engineering @ DTU"],["$","cat experience.log",1],["","NXP Semiconductors · BootROM Firmware   |   NIC · Intern"],["$","ls ~/projects",2],["","RoadRunner · AgenticOrchestrator · SupportAI · CryptoLedger · UniFormat"],["$","cat wins.txt",4],["","GATE Top 4% · 1st @ Vihaan Hackathon · 2 Springer Papers"],["$","echo $STATUS",3],["","Open to collaborate, say hi ↓"]];
 const T=18,top=108,lh=40,cw=10.9,X=60;let time=0.6,css="",body="";
 lines.forEach(([p,s,ci],i)=>{
  const y=top+i*lh,txt=(p?"$ ":"")+s,n=txt.length,w=Math.ceil(n*cw)+16;
  const dur=p?Math.max(0.5,s.length*0.06):0.05,a=(time/T*100).toFixed(2),b=((time+dur)/T*100).toFixed(2);
  css+=`@keyframes r${i}{0%,${a}%{transform:translateX(0)}${b}%,94%{transform:translateX(${w}px)}100%{transform:translateX(0)}}.c${i}{animation:r${i} ${T}s ${p?`steps(${n})`:"linear"} infinite}\n`;
  body+=`<text x="${X}" y="${y}" class="m" fill="${p?t.tx:t.mu}">${p?`<tspan fill="${t.pal[ci+1]}">$</tspan> `:""}${esc(s)}</text><rect class="c${i}" x="${X-4}" y="${y-26}" width="${w}" height="${lh}" fill="${t.bg}"/>`;
  time+=dur+(p?0.35:0.6);
 });
 const H=top+lines.length*lh+40,cy=top+(lines.length-1)*lh,cx=X+Math.ceil(lines[lines.length-1][1].length*cw)+8,ca=(time/T*100).toFixed(2);
 css+=`@keyframes cur{0%,${ca}%{opacity:0}${ca}.01%,94%{opacity:1}100%{opacity:0}}`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Terminal intro">
<style>${ff()}.m{font-family:'JetBrains Mono','SFMono-Regular',Consolas,'Liberation Mono',Menlo,monospace;font-size:18px}.t{${cond}}
${css}.cur{animation:cur ${T}s linear infinite}.bl{animation:bl 1s steps(1) infinite}@keyframes bl{50%{opacity:0}}</style>
${frame(W,H,t)}
<line x1="20.5" y1="58" x2="${W-20.5}" y2="58" stroke="${t.ln}"/>
<circle cx="50" cy="37" r="6" fill="${t.pal[1]}"/><circle cx="70" cy="37" r="6" fill="${t.pal[2]}"/><circle cx="90" cy="37" r="6" fill="${t.pal[3]}"/>
<text class="t" x="${W/2}" y="43" font-size="14" fill="${t.mu}" text-anchor="middle">~/muditjain13 · zsh</text>
<text class="t" x="${W-44}" y="43" font-size="14" fill="${t.pal[4]}" text-anchor="end">Sheet 03</text>
${body}<g class="cur"><rect class="bl" x="${cx}" y="${cy-16}" width="10" height="20" fill="${t.pal[5]}"/></g></svg>`;}

function nowPlaying(t){
 const W=1200,H=170,n=48,x0=420,x1=W-60,bw=(x1-x0)/n,base=H-44,maxh=86,rnd=rng(7);let bars="";
 for(let i=0;i<n;i++){const d=(0.5+rnd()*0.9).toFixed(2),dl=(-rnd()*2).toFixed(2),col=t.pal[Math.floor(i/n*6)];
  bars+=`<rect x="${(x0+i*bw).toFixed(1)}" y="${base-maxh}" width="${(bw-4).toFixed(1)}" height="${maxh}" fill="${col}" style="animation-duration:${d}s;animation-delay:${dl}s"/>`;}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Now playing">
<style>${ff()}.t{${cond}}.bars rect{transform-box:fill-box;transform-origin:bottom;animation:eq 1s ease-in-out infinite alternate}
@keyframes eq{0%{transform:scaleY(.08)}35%{transform:scaleY(.7)}60%{transform:scaleY(.3)}100%{transform:scaleY(1)}}
.spin{transform-origin:84px 74px;animation:sp 3s linear infinite}@keyframes sp{to{transform:rotate(360deg)}}
.prog{transform-box:fill-box;transform-origin:left;animation:pg 12s linear infinite}@keyframes pg{from{transform:scaleX(0)}to{transform:scaleX(1)}}</style>
${frame(W,H,t)}
<g class="spin"><circle cx="84" cy="74" r="30" fill="none" stroke="${t.pal[1]}" stroke-width="2"/><circle cx="84" cy="74" r="20" fill="none" stroke="${t.pal[2]}"/><circle cx="84" cy="74" r="6" fill="${t.pal[4]}"/><line x1="84" y1="44" x2="84" y2="56" stroke="${t.pal[3]}" stroke-width="2"/></g>
<text class="t" x="132" y="62" font-size="13" fill="${t.pal[1]}">Now playing</text>
<text class="t" x="132" y="86" font-size="18" fill="${t.tx}" style="letter-spacing:.03em">git push origin main</text>
<text class="t" x="132" y="108" font-size="13" fill="${t.mu}">Mudit Jain · Side B</text>
<g class="bars">${bars}</g>
<line x1="${x0}" y1="${base+12.5}" x2="${x1-4}" y2="${base+12.5}" stroke="${t.ln}"/>
<rect class="prog" x="${x0}" y="${base+11}" width="${x1-4-x0}" height="3" fill="${t.pal[5]}"/>
<text class="t" x="60" y="${base+18}" font-size="12" fill="${t.mu}">▶  01:28 / ∞</text></svg>`;}

function divider(t){
 const W=1200,H=28;let ticks="";for(let x=40;x<=W-40;x+=40)ticks+=`<line x1="${x}" y1="${x%200===0?6:10}" x2="${x}" y2="${H/2}" stroke="${t.ln}"/>`;
 const blocks=t.pal.slice(0,4).map((c,i)=>`<rect x="${40+i*12}" y="${H/2-2}" width="10" height="5" fill="${c}"/>`).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="">
<style>${ff()}.run{animation:run 5s cubic-bezier(.6,0,.4,1) infinite alternate}@keyframes run{from{transform:translateX(0)}to{transform:translateX(${W-128}px)}}</style>
<line x1="20" y1="${H/2+.5}" x2="${W-20}" y2="${H/2+.5}" stroke="${t.ln}" stroke-dasharray="2 4"/>${ticks}
${mk(20,H/2+.5,t.mk)}${mk(W-20,H/2+.5,t.mk)}<g class="run">${blocks}</g></svg>`;}

function roadrunner(t){
 const W=1200,H=420,top=74,p=t.pal;
 const box=(x,y,w,h,label,col,cls)=>`<g${cls?` class="${cls}"`:""}><rect x="${x+.5}" y="${y+.5}" width="${w}" height="${h}" fill="${t.bg}" stroke="${col||t.ln}"/><text class="t" x="${x+w/2}" y="${y+h/2+5}" font-size="13" fill="${t.tx}" text-anchor="middle">${label}</text></g>`;
 const cols=[60,236,412,588],cw=160,cx=cols.map(x=>x+cw/2);
 const svc=[["Booking · saga",3],["Inventory",0],["Waitlist",2],["Provider holds",4],["Payments",1],["Catalog",5],["Notifications",0],["Users",3]];
 let s="";
 svc.forEach((v,i)=>{const r=Math.floor(i/4),c=i%4;s+=box(cols[c],196+r*54,cw,40,v[0],p[v[1]],"pop").replace('class="pop"',`class="pop" style="animation-delay:${(0.3+i*0.08).toFixed(2)}s"`);});
 let wires=`<path class="flow" d="M295 150V176M${cx[0]} 176H${cx[3]}${cx.map(x=>`M${x} 176V196`).join("")}" fill="none" stroke="${p[0]}" stroke-dasharray="4 4"/>`;
 wires+=`<path class="flow" d="${cx.map(x=>`M${x} 290V318`).join("")}${[165,395,634].map(x=>`M${x} 318V344`).join("")}" fill="none" stroke="${t.mk}" stroke-dasharray="4 4"/>`;
 let packets="";for(let i=0;i<5;i++)packets+=`<rect class="pk" x="60" y="314" width="10" height="8" fill="${p[(i+1)%6]}" style="animation-delay:${(i*0.9).toFixed(1)}s"/>`;
 const stats=[["0","Double-bookings","100 goroutines on one seat, -race on",3],["3.5×","Faster date-range query","9.75s → 2.75s via partitioning",1],["5.7M","Seats · ~20M booking events","covering index: −47% rows scanned",2],["Exactly-once","Event processing","outbox + idempotent Kafka consumers",4]];
 const st=stats.map((r,i)=>{const y=108+i*72;return `<g class="pop" style="animation-delay:${(1+i*0.2).toFixed(1)}s"><text class="t" x="810" y="${y+30}" font-size="34" fill="${p[r[3]]}" style="letter-spacing:.02em">${r[0]}</text><text class="t" x="810" y="${y+50}" font-size="13" fill="${t.tx}">${r[1]}</text><text class="b" x="810" y="${y+66}" font-size="13" fill="${t.mu}">${esc(r[2])}</text></g>`}).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="RoadRunner Transport architecture">
<style>${ff()}.t{${cond}}.b{font-family:'Nunito','Segoe UI',Helvetica,Arial,sans-serif;font-weight:500}
.flow{animation:fl 1.2s linear infinite}@keyframes fl{to{stroke-dashoffset:-16}}
.pk{animation:pk 4.5s linear infinite;opacity:0}@keyframes pk{0%{transform:translateX(0);opacity:0}5%{opacity:1}95%{opacity:1}100%{transform:translateX(678px);opacity:0}}
.pop{opacity:0;animation:pp .5s ease forwards}@keyframes pp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}</style>
${frame(W,H,t)}
<line x1="20.5" y1="${top}" x2="${W-20.5}" y2="${top}" stroke="${t.ln}"/>
<line x1="780.5" y1="${top}" x2="780.5" y2="${H-16.5}" stroke="${t.ln}"/>
<text class="t" x="60" y="52" font-size="15" fill="${t.tx}">Sheet 03 · Flagship · RoadRunner Transport</text>
<text class="t" x="${W-60}" y="52" font-size="14" text-anchor="end"><tspan fill="${p[3]}">Go</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${p[0]}">gRPC</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${p[1]}">Kafka</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${p[2]}">K8s</tspan></text>
${wires}
${box(60,110,120,40,"Clients",t.ln)}
<path d="M180 130H200" stroke="${t.mk}"/><path d="M194 126l6 4-6 4" fill="none" stroke="${t.mk}"/>
${box(200,110,190,40,"API gateway · REST",p[0])}
<text class="t" x="${cx[3]+cw/2}" y="170" font-size="11" fill="${p[0]}" text-anchor="end">gRPC</text>
${s}
<line x1="60" y1="318" x2="748" y2="318" stroke="${p[1]}" stroke-width="3"/>
<text class="t" x="748" y="310" font-size="11" fill="${p[1]}" text-anchor="end">Kafka · transactional outbox</text>
${packets}
${box(60,344,210,40,"MySQL · inventory",p[2])}${box(290,344,210,40,"MongoDB · catalog",p[3])}${box(520,344,228,40,"Redis · holds &amp; cache",p[5])}
${st}
</svg>`;}

function experience(t){
 const W=1200,H=270,p=t.pal,x0=130,yr=144,X=v=>x0+(v-2020)*yr;
 const bars=[[2020,2024,0,"B.Tech · CSE","Gautam Buddha University · CGPA 8.46",p[0]],[2024,2026.5,0,"M.Tech · Software Engg","Delhi Technological University · CGPA 8.85",p[4]],[2023.45,2023.6,1,"Intern","National Informatics Centre",p[2]],[2025.5,2026.45,1,"Embedded SWE Intern","NXP Semiconductors",p[1]]];
 const rowY=[96,170];
 let b="";bars.forEach((r,i)=>{const x=X(r[0]),w=Math.max(16,X(r[1])-x),y=rowY[r[2]],anchor=(x+260>W-40)?"end":"start",tx=anchor==="end"?x+w:x;
  b+=`<rect class="grow" x="${x}" y="${y+22}" width="${w}" height="10" fill="${r[5]}" style="animation-delay:${(0.3+i*0.25).toFixed(2)}s"/>
  <text class="t" x="${tx}" y="${y+14}" font-size="15" fill="${t.tx}" text-anchor="${anchor}">${r[3]}</text>
  <text class="b" x="${tx}" y="${y+50}" font-size="13" fill="${t.mu}" text-anchor="${anchor}">${r[4]}</text>`;});
 let ticks="";for(let y=2020;y<=2026;y++)ticks+=`<line x1="${X(y)}" y1="226" x2="${X(y)}" y2="234" stroke="${t.mk}"/><text class="t" x="${X(y)}" y="250" font-size="12" fill="${t.mu}" text-anchor="middle">${y}</text>`;
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Experience and education timeline">
<style>${ff()}.t{${cond}}.b{font-family:'Nunito','Segoe UI',Helvetica,Arial,sans-serif;font-weight:500}
.grow{transform-box:fill-box;transform-origin:left;animation:g 1s cubic-bezier(.2,.8,.2,1) both}@keyframes g{from{transform:scaleX(0)}to{transform:scaleX(1)}}
.now{transform-box:fill-box;transform-origin:center;animation:n 2s ease-in-out infinite}@keyframes n{50%{transform:scale(1.8);opacity:.35}}</style>
${frame(W,H,t)}
<text class="t" x="48" y="${rowY[0]+31}" font-size="13" fill="${t.mu}">Study</text>
<text class="t" x="48" y="${rowY[1]+31}" font-size="13" fill="${t.mu}">Work</text>
<line x1="${x0}" y1="226.5" x2="${X(2026.6)}" y2="226.5" stroke="${t.ln}"/>
${ticks}
${b}
<circle class="now" cx="${X(2026.77)}" cy="226.5" r="5" fill="${p[1]}"/>
<text class="t" x="${X(2026.77)}" y="212" font-size="11" fill="${p[1]}" text-anchor="middle">Now</text>
</svg>`;}

function research(t){
 const W=1200,top=74,p=t.pal,cw=(W-80)/3,rh=136,H=top+2*rh+36;
 const tiles=[["SLDS","Springer LNNS · ICDAM 2026","Intl. conference, Google as partner","Top 20%",0],
  ["SLDS-E","Springer LNNS · INDEA 2026","Intl. conference, Google as partner","Top 15%",4],
  ["Chair","IEEE TPS 2025 · Pittsburgh","Invited session chair","Invited",1],
  ["23","Papers peer reviewed","Across 6 international conferences","WoS",3],
  ["1st","Vihaan · IEEE DTU","One of 3 hackathon podiums","Winner",2],
  ["Top 4%","GATE CSE 2024","Rank 4814 of 123,967 · NPTEL Elite Gold","Rank",5]];
 const body=tiles.map((r,i)=>{const c=i%3,row=Math.floor(i/3),x=40+c*cw,y=top+20+row*rh,col=p[r[4]],tw=r[3].length*9+22;
  return `<g class="pop" style="animation-delay:${(0.2+i*0.15).toFixed(2)}s">
  <rect x="${x+10.5}" y="${y+.5}" width="${cw-21}" height="${rh-20}" fill="none" stroke="${t.ln}"/>
  ${mk(x+10.5,y+.5,t.mk)}${mk(x+cw-10.5,y+.5,t.mk)}${mk(x+10.5,y+rh-19.5,t.mk)}${mk(x+cw-10.5,y+rh-19.5,t.mk)}
  <rect class="bar" x="${x+11}" y="${y+1}" width="${cw-22}" height="3" fill="${col}" style="animation-delay:${(0.6+i*0.15).toFixed(2)}s"/>
  <text class="t" x="${x+30}" y="${y+52}" font-size="40" fill="${col}" style="letter-spacing:.02em">${r[0]}</text>
  <rect x="${x+cw-30-tw}" y="${y+22}" width="${tw}" height="22" fill="${col}"/>
  <text class="t" x="${x+cw-30-tw/2}" y="${y+38}" font-size="12" fill="${t.bg}" text-anchor="middle">${r[3]}</text>
  <text class="t" x="${x+30}" y="${y+78}" font-size="14" fill="${t.tx}">${r[1]}</text>
  <text class="b" x="${x+30}" y="${y+98}" font-size="14" fill="${t.mu}">${esc(r[2])}</text></g>`}).join("");
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="Research and wins">
<style>${ff()}.t{${cond}}.b{font-family:'Nunito','Segoe UI',Helvetica,Arial,sans-serif;font-weight:500}
.pop{opacity:0;animation:pp .5s ease forwards}@keyframes pp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
.bar{transform-box:fill-box;transform-origin:left;animation:br 3.5s ease-in-out infinite}@keyframes br{0%{transform:scaleX(0)}40%,70%{transform:scaleX(1)}100%{transform:scaleX(0);transform-origin:right}}</style>
${frame(W,H,t)}
<line x1="20.5" y1="${top}" x2="${W-20.5}" y2="${top}" stroke="${t.ln}"/>
<text class="t" x="60" y="52" font-size="15" fill="${t.tx}">Sheet 06 · Research &amp; wins</text>
<text class="t" x="${W-60}" y="52" font-size="14" text-anchor="end"><tspan fill="${p[0]}">2 papers</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${p[1]}">1 chair</tspan><tspan fill="${t.mu}"> · </tspan><tspan fill="${p[2]}">3 podiums</tspan></text>
${body}</svg>`;}

const GEN={header,terminal,roadrunner,projects,experience,research,"now-playing":nowPlaying,divider};
const api={
 names:Object.keys(GEN),
 svg:(name,mode)=>GEN[name](THEMES[mode]),
 all(){const out={};for(const n of Object.keys(GEN))for(const m of ["light","dark"])out[`${n}-${m}.svg`]=GEN[n](THEMES[m]);return out;}
};
if(typeof module!=="undefined"&&module.exports)module.exports=api;else root.MJSVG=api;
})(typeof window!=="undefined"?window:globalThis);
