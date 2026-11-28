(()=>{
/* v5x: additions loaded after main script */
/* Baqarah 40-day tracker */
const bqP=n=>String(n).padStart(2,'0');
const bqDs=d=>d.getFullYear()+'-'+bqP(d.getMonth()+1)+'-'+bqP(d.getDate());
const bqAdd=(s,n)=>{const [y,m,d]=s.split('-').map(Number);return bqDs(new Date(y,m-1,d+n))};
const bqDiff=(a,b)=>{const f=s=>{const [y,m,d]=s.split('-').map(Number);return Date.UTC(y,m-1,d)};return Math.round((f(b)-f(a))/864e5)};
const bqGet=()=>g('bq',null);
window.bqRoll=(now)=>{const t=now||bqDs(new Date()),s=bqGet();if(!s||!s.start)return 0;let n=0;while(bqDiff(s.start,t)>=40){s.hist=s.hist||[];s.hist.push({start:s.start,end:bqAdd(s.start,39),marks:s.cur.slice()});s.start=bqAdd(s.start,40);s.cur=Array(40).fill(0);n++}if(n)st('bq',s);return n};
window.bqStart=()=>{if(bqGet())return;st('bq',{start:bqDs(new Date()),cur:Array(40).fill(0),hist:[]});render()};
window.bqTog=i=>{bqRoll();const s=bqGet();if(!s)return;s.cur[i]=s.cur[i]?0:1;st('bq',s);const el=document.getElementById('bqv');if(el)el.outerHTML=bqView();};
const BQF=`<svg viewBox="0 0 24 24" width="100%" height="100%"><g fill="#ef86ae" stroke="#c94f7d" stroke-width=".6"><circle cx="12" cy="5" r="4.1"/><circle cx="18.7" cy="9.9" r="4.1"/><circle cx="16.2" cy="17.9" r="4.1"/><circle cx="7.8" cy="17.9" r="4.1"/><circle cx="5.3" cy="9.9" r="4.1"/></g><circle cx="12" cy="12" r="3.2" fill="#f6c52f" stroke="#d99a1a" stroke-width=".7"/></svg>`;
const bqFmt=s=>{const [y,m,d]=s.split('-');return d+'/'+m+'/'+y};
const bqView=()=>{bqRoll();const s=bqGet();if(!s)return `<div id="bqv" class="card"><h3>${I('quran')} متابعة قراءة سورة البقرة</h3><p class="note">٤٠ خانة، كل خانة ليوم، وتعلّمي عليها بوردة لما تقرأي. مدة ال٤٠ يوم اختيارية للمتابعة بس، ولو خلصت بتتجدد وتبدأي خانات جديدة، والدورة القديمة بتتحفظ في السجل.</p><button class="btn" onclick="bqStart()">ابدئي المتابعة</button></div>`;
const t=bqDs(new Date()),di=bqDiff(s.start,t),done=s.cur.filter(Boolean).length,left=40-di;
let cells='';for(let i=0;i<40;i++){const on=s.cur[i];cells+=`<button onclick="bqTog(${i})" aria-label="يوم ${i+1}" aria-pressed="${on?'true':'false'}" style="position:relative;aspect-ratio:1;border:${i===di?'2px solid var(--gr)':'1px solid #d8d3b8'};border-radius:14px;background:${on?'#fff3f7':'#fffdf6'};padding:0;cursor:pointer;direction:ltr"><span style="position:absolute;top:3px;left:0;right:0;text-align:center;font-size:12px;color:var(--tx)">${i+1}</span><span style="position:absolute;left:18%;right:18%;top:26%;bottom:6%;opacity:${on?1:.12}">${BQF}</span></button>`}
const hist=(s.hist||[]).slice().reverse().map(h=>`<div class="row"><label>من ${bqFmt(h.start)} إلى ${bqFmt(h.end)}</label><b>${h.marks.filter(Boolean).length} من ٤٠</b></div>`).join('');
return `<div id="bqv"><div class="card"><h3>${I('quran')} متابعة قراءة سورة البقرة</h3><p class="note">خلصتي ${done} من ٤٠ يوم. النهارده يوم ${di+1}، وبعد ${left} ${left===1?'يوم':'أيام'} بتتجدد الخانات. بدأتي في ${bqFmt(s.start)}.</p><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;direction:rtl">${cells}</div></div>${hist?`<div class="card"><h3>السجل</h3>${hist}<p class="note">الدورات القديمة بتفضل محفوظة هنا.</p></div>`:''}<p class="note">المتابعة والعلامات على جهازك بس، ومش جزء من الحفظ والمراجعة.</p></div>`};
/* approved greeting + monthly reflections, celebration */
const GRB=["أنا عارفة إنك بتحاولي، ومحاولاتك حتى لو بسيطة هي إنجاز. ابدئي يومك خطوة خطوة، وكمّلي.", "مش لازم يوم كامل ومثالي. خطوة صغيرة النهارده كفاية.", "اللي بتعمليه حتى لو شايفاه قليل، بيفرق وبيتراكم.", "خدي نفس، وابدئي بأسهل حاجة قدامك.", "التعب مش معناه إنك مقصّرة. استريحي شوية وكمّلي.", "كل مهمة بتخلصيها تستاهل فرحة صغيرة.", "يوم هادي وخطوة ثابتة أحسن من يوم زحمة واستعجال.", "لو أمس ما مشيش زي ما كنتي عايزة، النهارده صفحة جديدة.", "إنتي بتتقدمي حتى لو مش حاسة. كمّلي براحتك.", "رتّبي يومك على قد طاقتك، والباقي يستنى.", "التزامك الصغير كل يوم أقوى من حماس كبير ليوم واحد.", "افتحي يومك بنية طيبة وحاجة بسيطة تعمليها.", "إنتي مش لوحدك في الطريق ده. خطوة بخطوة.", "فخورة بيكي إنك رجعتي النهارده."];
const MRB=["بداية جديدة بتتبني بخطوات صغيرة، وإنتي بدأتي.", "الثبات أهم من السرعة، وإنتي ماشية صح.", "كل يوم عملتي فيه حاجة، كان له أثر حتى لو ما شفتيهوش.", "النمو بيحصل بهدوء زي الورد، من غير ما نلاحظ كل يوم.", "اللي عدّى كان فيه مجهود حقيقي، وده يستاهل تقدير.", "الراحة جزء من الطريق، مش استراحة منه.", "لو الشهر كان تقيل، فإنك كمّلتي هو الإنجاز.", "خطواتك الصغيرة اتجمعت وبقت حاجة كبيرة.", "ابدئي الجاي بنفس هادي، وبثقة في اللي اتعلمتيه.", "إنتي أقوى مما كنتي فاكرة في أول الشهر.", "اللي زرعتيه بالتدريج بيكبر، فكمّلي.", "سنة بتخلص، ومن حقك تفتخري بكل خطوة خدتيها."];
window.GRI=(()=>{let l=-1;try{l=+localStorage.getItem('sk_gr_last')}catch(e){}let i;do{i=Math.floor(Math.random()*GRB.length)}while(i===l&&GRB.length>1);try{localStorage.setItem('sk_gr_last',i)}catch(e){}return i})();
window.khOf=()=>{const k=mkv()||today().slice(0,7);return MRB[(+k.slice(5,7)-1+12)%12]};
const H_home0=H.home;
H.home=()=>{const o=H_home0(),n=g('uname','');return `<div class="card" id="grt" style="text-align:center"><div style="width:44px;height:44px;margin:0 auto 4px">${FLsvg(0)}</div><h3 style="margin:2px 0">أهلًا${n?' يا '+e(n):''}</h3><p style="margin:4px 0 0;line-height:1.9">${e(GRB[window.GRI])}</p></div>`+o};
window.clapBuf=(c,sr)=>{const dur=3,buf=c.createBuffer(1,sr*dur,sr),d=buf.getChannelData(0);for(let k=0;k<90;k++){const t0=Math.random()*(dur-0.3)*sr|0,len=sr*(0.02+Math.random()*0.03)|0,amp=(0.3+Math.random()*0.5)*Math.max(0.15,1-Math.abs(t0/sr-1.2)/2.2);for(let i=0;i<len&&t0+i<d.length;i++)d[t0+i]+=(Math.random()*2-1)*amp*Math.exp(-i/(len/4))}return buf};
window.clap=()=>{try{const A=window.AudioContext||window.webkitAudioContext;const c=window._ac||(window._ac=new A());if(c.resume)c.resume();const src=c.createBufferSource();src.buffer=clapBuf(c,c.sampleRate);const f=c.createBiquadFilter();f.type='bandpass';f.frequency.value=1800;f.Q.value=0.6;const gn=c.createGain();gn.gain.value=0.7;src.connect(f);f.connect(gn);gn.connect(c.destination);src.start();return c.state}catch(e){return 'err'}};
window.confetti=()=>{const el=document.getElementById('cel');if(!el||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const cols=['#ef86ae','#f6c52f','#7aa84a','#9b7bd1','#4fa3d1'];let h='';for(let i=0;i<36;i++){h+=`<i style="position:absolute;top:-10px;left:${Math.random()*100}%;width:8px;height:12px;background:${cols[i%5]};border-radius:2px;animation:cf ${2+Math.random()*2}s ease-in ${Math.random()*1.2}s forwards;transform:rotate(${Math.random()*360}deg)"></i>`}const old=document.getElementById('cfl');if(old)old.remove();const d=document.createElement('div');d.id='cfl';d.style.cssText='position:absolute;inset:0;overflow:hidden;pointer-events:none';d.innerHTML=h;el.style.position='relative';el.appendChild(d)};
{const sy=document.createElement('style');sy.textContent='@keyframes cf{to{transform:translateY(260px) rotate(540deg);opacity:0}}';document.head.appendChild(sy)}
const H_month0=H.month;
H.month=()=>{const o=H_month0();setTimeout(()=>{confetti();if(sessionStorage.getItem('sk_mk'))window.clap()},200);return o.replace('<p class="note">الأرقام',`<button class="btn" onclick="confetti();clap()">اسمعي التصفيق</button><p class="note">الأرقام`)};

const H_adhkar1=H.adhkar;
H.adhkar=()=>{const q=window._at==='bq';if(q){const o=H_adhkar1();window._at='ad';let h=H_adhkar1();window._at='bq';shell('المصحف والأذكار');const pills=h.match(/^<div class="pills">.*?<\/div>/)[0].replace(/ on"/g,'"').replace(/class="pill "/g,'class="pill"');return pills.replace('</div>','').replace(/class="pill"(?![^<]*متابعة)/g,'class="pill"')+bqPill(true)+'</div>'+bqView()}
let o=H_adhkar1();return o.replace('السبحة</button></div>','السبحة</button>'+bqPill(false)+'</div>')};
const bqPill=on=>`<button class="pill ${on?'on':''}" onclick="window._at='bq';render()">متابعة البقرة</button>`;

window.GRB=GRB;window.MRB=MRB;window.bqAdd=bqAdd;window.bqDiff=bqDiff;window.bqDs=bqDs;
render();
})();
