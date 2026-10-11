/* PPS engine: shared by every page. Data files register content in PPS; initPage() wires the page. */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const reduce=!!(window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches);
const PPS={Q:{},UQ:{},TR:{},ST:{},OR:{},SO:{},TB:{},init:[]};
window.PPS_MANIFEST=window.PPS_MANIFEST||{};
const PAGE=document.body.dataset, COURSE=PAGE.course||'', ROOT=PAGE.root||'./';

/* ---------- storage: one record per learner, one section per course ---------- */
const LKEY='pps-learners';
function readJSON(k,def){try{const r=localStorage.getItem(k);if(r){const v=JSON.parse(r);if(v&&typeof v==='object')return v;}}catch(e){}return def;}
function writeJSON(k,v){try{localStorage.setItem(k,JSON.stringify(v));return true;}catch(e){return false;}}
let learners=readJSON(LKEY,{current:'',list:[]});
if(!Array.isArray(learners.list))learners.list=[];
if(typeof learners.current!=='string')learners.current='';
const learnerKey=n=>'pps:learner:'+n;
const emptyCourse=()=>({done:{},best:{},answers:{},quizzes:{},written:{}});
let ldata={courses:{}},state=emptyCourse();
function courseState(id){const c=ldata.courses[id]||(ldata.courses[id]=emptyCourse());['done','best','answers','quizzes','written'].forEach(k=>{if(!c[k]||typeof c[k]!=='object')c[k]={};});return c;}
function loadLearner(){
  ldata=learners.current?readJSON(learnerKey(learners.current),{courses:{}}):{courses:{}};
  if(!ldata.courses||typeof ldata.courses!=='object')ldata.courses={};
  if(COURSE)state=courseState(COURSE);
}
function save(){
  if(!learners.current)return;
  ldata.updated=new Date().toISOString();
  if(!writeJSON(learnerKey(learners.current),ldata))toast('Progress could not be saved. This browser may be blocking storage (private browsing) or storage is full.');
}
loadLearner();

function record(qid,choice,ok){
  const a=state.answers[qid]||{n:0,w:0};
  a.n++;if(!ok)a.w++;if(a.n===1)a.first=ok;a.c=choice;a.ok=ok;a.t=Date.now();
  state.answers[qid]=a;save();
}

/* ---------- small helpers ---------- */
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
const TOK=/(\/\/.*$|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(^[ \t]*#.*$)|\b(int|char|float|double|void|return|if|else|for|while|do|switch|case|break|continue|default|struct|const|sizeof|unsigned|long|short|static|typedef|FILE|NULL|EOF)\b|\b(\d+(?:\.\d+)?)\b/gm;
function hl(src){let out='',last=0;src.replace(TOK,(m,com,str,pp,kw,num,off)=>{out+=esc(src.slice(last,off));const c=com?'com':str?'str':pp?'pp':kw?'kw':'nm';out+='<span class="'+c+'">'+esc(m)+'</span>';last=off+m.length;return m;});return out+esc(src.slice(last));}
let toastTimer=null;
function toast(msg){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';t.setAttribute('role','status');document.body.appendChild(t);}
  t.textContent=msg;t.classList.add('on');clearTimeout(toastTimer);toastTimer=setTimeout(()=>t.classList.remove('on'),3500);}
const fmtDate=t=>new Date(t).toLocaleDateString(undefined,{day:'numeric',month:'short',year:'numeric'});

/* ---------- multiple-choice question, with recording and restore ---------- */

/* ---------- shuffling: options and question pools ---------- */
const FIXED_OPT=/^(both|neither|none of|all of)/i;
function shuffleArr(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
function shuffledOrder(item){const idx=item.o.map((_,i)=>i),move=idx.filter(i=>!FIXED_OPT.test(item.o[i])),keep=idx.filter(i=>FIXED_OPT.test(item.o[i]));return shuffleArr(move).concat(keep);}
let uid=0;
function makeQ(item,host,opt){
  opt=opt||{};const id='q'+(uid++);
  const fs=document.createElement('fieldset');fs.className='q';
  const order=opt.shuffle?shuffledOrder(item):item.o.map((_,i)=>i);
  fs.innerHTML='<legend></legend>'+order.map(i=>'<label class="opt"><input type="radio" name="'+id+'" value="'+i+'"><span></span></label>').join('')+
   '<div class="row" style="margin-top:8px"><button type="button" class="btn qcheck">Check answer</button>'+(opt.retry?'<button type="button" class="btn ghost qretry" hidden>Try again</button>':'')+'<span class="err" aria-live="polite"></span></div><div class="fb" aria-live="polite"></div>';
  $('legend',fs).textContent=item.q;
  if(opt.qid&&typeof qTag==='function'){const tg=qTag(opt.qid,item);if(tg){const d=document.createElement('div');d.className='qtag';d.textContent=tg;$('legend',fs).after(d);}}
  $$('.opt span',fs).forEach((s,k)=>s.textContent=item.o[order.at(k)]);
  const btn=$('.qcheck',fs),retry=$('.qretry',fs),err=$('.err',fs),fb=$('.fb',fs);
  function show(v,ok,prev){
    $$('.opt',fs).forEach(l=>{const i=+$('input',l).value;l.classList.toggle('right',i===item.a);l.classList.toggle('wrong',i===v&&!ok);});
    $$('input',fs).forEach(r=>{r.disabled=true;r.checked=+r.value===v;});btn.disabled=true;if(retry)retry.hidden=false;
    fb.className='fb '+(ok?'ok':'no');fb.innerHTML='';
    const head=document.createElement('b');head.textContent=(prev?'Your saved answer: ':'')+(ok?'Correct.':'Not quite. The answer is "'+item.o[item.a]+'".');
    const why=document.createElement('span');why.className='why';why.textContent=item.w;fb.append(head,why);
  }
  $$('input',fs).forEach(r=>r.addEventListener('change',()=>{err.textContent='';}));
  btn.addEventListener('click',()=>{
    const pick=$('input:checked',fs);
    if(!pick){err.textContent='Choose an answer first.';return;}
    const v=+pick.value,ok=v===item.a;
    if(opt.qid)record(opt.qid,v,ok);
    show(v,ok,false);
    if(opt.onAnswer)opt.onAnswer(ok);
  });
  if(retry)retry.addEventListener('click',()=>{
    $$('.opt',fs).forEach(l=>l.classList.remove('right','wrong'));
    $$('input',fs).forEach(r=>{r.disabled=false;r.checked=false;});btn.disabled=false;retry.hidden=true;fb.textContent='';fb.className='fb';
    $('input',fs).focus();
  });
  if(opt.restore&&opt.qid&&state.answers[opt.qid]){const a=state.answers[opt.qid];if(Number.isInteger(a.c)&&a.c>=0&&a.c<item.o.length)show(a.c,a.c===item.a,true);}
  host.appendChild(fs);return fs;
}
function unitQuizPool(u){
  const quiz=(PPS.UQ[u]||[]).map((it,i)=>({qid:u+'quiz.'+i,it}));
  const checks=Object.keys(PPS.Q).filter(k=>k.startsWith(u+'l')).flatMap(k=>PPS.Q[k].map((it,i)=>({qid:k+'.'+i,it})));
  return {quiz,checks};
}
function drawUnitQuiz(u){
  const {quiz,checks}=unitQuizPool(u),fromChecks=Math.min(4,checks.length),fromQuiz=Math.min(quiz.length,10-fromChecks);
  return shuffleArr(shuffleArr(quiz).slice(0,fromQuiz).concat(shuffleArr(checks).slice(0,10-fromQuiz)));
}
function unitQuiz(el,u){
  let Q=drawUnitQuiz(u),qi=0,score=0;
  function show(){
    el.innerHTML='';
    if(qi>=Q.length){
      if(state.best[u]==null||score>state.best[u])state.best[u]=score;
      state.quizzes[u]=(state.quizzes[u]||[]).concat({s:score,n:Q.length,t:Date.now()}).slice(-20);save();refresh();
      const tries=state.quizzes[u].length,pool=unitQuizPool(u);
      const d=document.createElement('div');d.className='panel';
      const msg=score>=9?'Excellent. You are ready for the next unit.':score>=6?'Good foundation. Revisit the lessons behind the questions you missed.':'Worth another pass. Re-read the traps boxes, then retry.';
      d.innerHTML='<div class="score">'+score+'/'+Q.length+'</div><p style="margin-top:10px"></p><p class="small"></p><div class="row"><button class="btn" type="button">Try a fresh set</button><a class="btn ghost" href="progress.html">See my progress</a></div>';
      const ps=$$('p',d);ps[0].textContent=msg;ps[1].textContent='Best score '+state.best[u]+'/'+Q.length+'. Attempts so far: '+tries+'. Each attempt draws 10 of '+(pool.quiz.length+pool.checks.length)+' questions in a new order, with the options shuffled.';
      const pd=passDays(u),ck=document.createElement('p');ck.className='small';ck.textContent=score>=8?(pd>=2?'Checkpoint: 8 or more on two different days. This unit counts as exam-ready once its quick checks are practised.':'Checkpoint passed today. Pass again on another day to mark this unit exam-ready.'):'Checkpoint: score 8 or more on two different days to mark this unit exam-ready.';ps[1].after(ck);
      $('button',d).addEventListener('click',()=>{Q=drawUnitQuiz(u);qi=0;score=0;show();});el.appendChild(d);return;
    }
    const head=document.createElement('div');head.className='uq-head';head.innerHTML='<span>Question '+(qi+1)+' of '+Q.length+'</span><span>Score '+score+'</span>';el.appendChild(head);
    const fs=makeQ(Q.at(qi).it,el,{qid:Q.at(qi).qid,shuffle:true,onAnswer:ok=>{if(ok)score++;head.lastChild.textContent='Score '+score;
      const nx=document.createElement('button');nx.className='btn';nx.type='button';nx.style.marginTop='10px';nx.textContent=qi===Q.length-1?'See my score':'Next question';
      nx.addEventListener('click',()=>{qi++;show();});fs.appendChild(nx);nx.focus();}});
  }
  show();
}

/* ---------- reusable lesson widgets ---------- */
/* ---------- code tracer: code + memory + output ---------- */
function valHTML(name,v,h){
  if(Array.isArray(v))return '<div class="cells">'+v.map((x,i)=>'<div class="cell'+(h.includes(name+'['+i+']')?' hot':'')+'"><div class="box">'+esc(x)+'</div><div class="idx">'+i+'</div></div>').join('')+'</div>';
  if(v&&typeof v==='object')return '<div class="sf">'+Object.keys(v).map(k=>'<div class="var'+(h.includes(name+'.'+k)?' hot':'')+'"><div class="box">'+esc(v[k])+'</div><span class="vn">.'+esc(k)+'</span></div>').join('')+'</div>';
  return '<div class="box">'+esc(v)+'</div>';
}
function tracer(el,cfg){
  if(!cfg)return;
  el.innerHTML=(cfg.title?'<div class="label">'+esc(cfg.title)+'</div>':'')+
   (cfg.input?'<div class="row tr-in"><label></label><input type="text" inputmode="numeric" style="width:120px"><button class="btn" type="button">Trace it</button><span class="err" aria-live="polite"></span></div>':'')+
   '<div class="tr-grid"><pre class="c tr-code"></pre><div class="tr-side"><div class="tr-l">Memory</div><div class="tr-mem"></div><div class="tr-l">Output</div><pre class="tr-out"></pre></div></div>'+
   '<p class="stepnote" aria-live="polite"></p><div class="row"><button class="btn ghost tr-prev" type="button">Previous</button><button class="btn tr-next" type="button">Next step</button><span class="tr-count"></span></div>';
  const code=$('.tr-code',el);
  code.innerHTML='<code>'+cfg.code.map((ln,i)=>'<span class="ln" data-i="'+i+'">'+(ln?hl(ln):' ')+'</span>').join('')+'</code>';
  let steps=[],k=0;
  function draw(){
    const s=steps[k],h=s.h||[];
    $$('.ln',code).forEach(x=>x.classList.toggle('cur',+x.dataset.i===s.l));
    const fr=(s.f||[]).slice().reverse();
    const topNames=fr.length?fr[0].v.map(x=>x[0]):[];const base=n=>n.split(/[\[.]/)[0];
    $('.tr-mem',el).innerHTML=fr.map((f,i)=>{const hh=i===0?h:h.filter(n=>!topNames.includes(base(n)));
      return '<div class="frame'+(i===0&&fr.length>1?' top':'')+'"><div class="frame-h">'+esc(f.n)+(i===0&&fr.length>1?' (running now)':'')+'</div><div class="vars">'+
      f.v.map(x=>'<div class="var'+(hh.includes(x[0])?' hot':'')+'"><span class="vn">'+esc(x[0])+'</span>'+valHTML(x[0],x[1],hh)+(x[2]?'<span class="addr">address '+esc(x[2])+'</span>':'')+'</div>').join('')+'</div></div>';}).join('');
    $('.tr-out',el).textContent=s.o||'';
    $('.stepnote',el).textContent=s.n||'';
    $('.tr-count',el).textContent='Step '+(k+1)+' of '+steps.length;
    $('.tr-prev',el).disabled=k===0;$('.tr-next',el).textContent=k===steps.length-1?'Start again':'Next step';
  }
  $('.tr-prev',el).addEventListener('click',()=>{if(k>0){k--;draw();}});
  $('.tr-next',el).addEventListener('click',()=>{k=(k+1)%steps.length;draw();});
  if(cfg.input){
    const inp=$('.tr-in input',el),err=$('.tr-in .err',el);$('.tr-in label',el).textContent=cfg.input.label;inp.value=cfg.input.def;
    const lid='tri'+(uid++);inp.id=lid;$('.tr-in label',el).htmlFor=lid;
    inp.addEventListener('input',()=>{err.textContent='';});
    $('.tr-in .btn',el).addEventListener('click',()=>{const msg=cfg.input.check(inp.value.trim());if(msg){err.textContent=msg;return;}steps=cfg.gen(inp.value.trim());k=0;draw();});
    steps=cfg.gen(String(cfg.input.def));
  }else steps=cfg.steps;
  draw();
}

/* ---------- text stepper (expression evaluation, file flow) ---------- */
function stepper(el,cfg){
  if(!cfg)return;
  el.innerHTML=(cfg.title?'<div class="label">'+esc(cfg.title)+'</div>':'')+'<div class="st-grid'+(cfg.side?' two':'')+'"><pre class="c st-c"></pre>'+(cfg.side?'<div><div class="tr-l">'+esc(cfg.side)+'</div><pre class="tr-out st-f"></pre></div>':'')+'</div><p class="stepnote" aria-live="polite"></p><div class="row"><button class="btn ghost" type="button">Previous</button><button class="btn" type="button">Next step</button><span class="tr-count"></span></div>';
  let k=0;const [pv,nx]=$$('.row .btn',el);
  function draw(){const f=cfg.frames[k];
    $('.st-c',el).innerHTML='<code>'+esc(f.c).replace(/⟦/g,'<mark class="hm">').replace(/⟧/g,'</mark>')+'</code>';
    if(cfg.side)$('.st-f',el).textContent=f.f||'(empty)';
    $('.stepnote',el).textContent=f.n;$('.tr-count',el).textContent='Step '+(k+1)+' of '+cfg.frames.length;
    pv.disabled=k===0;nx.textContent=k===cfg.frames.length-1?'Start again':'Next step';}
  pv.addEventListener('click',()=>{if(k>0){k--;draw();}});nx.addEventListener('click',()=>{k=(k+1)%cfg.frames.length;draw();});draw();
}

/* ---------- put-in-order ---------- */
function orderW(el,cfg){
  if(!cfg)return;
  el.innerHTML='<div class="label">'+esc(cfg.title)+'</div>'+(cfg.intro?'<p style="font-size:.95rem;margin-top:0"></p>':'')+'<ol class="order-list"></ol><div class="row"><button class="btn" type="button">Check my order</button><button class="btn ghost" type="button">Shuffle again</button></div><p class="fb" aria-live="polite"></p>';
  if(cfg.intro)$('p',el).textContent=cfg.intro;
  const ol=$('ol',el),fb=$('p.fb',el),[chk,sh]=$$('.row .btn',el);let cur=[];
  function draw(fi,dir){ol.innerHTML='';cur.forEach((s,i)=>{const li=document.createElement('li');
    li.innerHTML='<span class="t"></span><button type="button" aria-label="Move up">↑</button><button type="button" aria-label="Move down">↓</button>';
    $('.t',li).textContent=s;const [up,dn]=$$('button',li);up.disabled=i===0;dn.disabled=i===cur.length-1;
    up.addEventListener('click',()=>{[cur[i-1],cur[i]]=[cur[i],cur[i-1]];draw(i-1,0);});
    dn.addEventListener('click',()=>{[cur[i+1],cur[i]]=[cur[i],cur[i+1]];draw(i+1,1);});ol.appendChild(li);});
    if(fi!==undefined){const bs=$$('button',ol.children[fi]);(bs[dir]&&!bs[dir].disabled?bs[dir]:bs.find(b=>!b.disabled)).focus();}}
  function shuffle(){cur=cfg.steps.slice();do{for(let i=cur.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cur[i],cur[j]]=[cur[j],cur[i]];}}while(cur.every((s,i)=>s===cfg.steps[i]));draw();fb.textContent='';}
  chk.addEventListener('click',()=>{let r=0;$$('li',ol).forEach((li,i)=>{const ok=cur[i]===cfg.steps[i];if(ok)r++;li.classList.toggle('ok',ok);li.classList.toggle('no',!ok);});
    if(r===cfg.steps.length){fb.className='fb ok';fb.textContent=cfg.ok;}else{fb.className='fb no';fb.textContent=r+' of '+cfg.steps.length+' are in the right place. '+cfg.hint;}});
  sh.addEventListener('click',shuffle);shuffle();
}

/* ---------- sorter: put each item in a category ---------- */
function sorterW(el,cfg){
  if(!cfg)return;
  el.innerHTML='<div class="label">'+esc(cfg.title)+'</div><ul class="sorter"></ul>';
  const ul=$('ul',el);
  cfg.items.forEach(it=>{const li=document.createElement('li');
    li.innerHTML='<code></code><div class="row">'+cfg.cats.map(c=>'<button type="button" class="btn ghost">'+esc(c)+'</button>').join('')+'</div><div class="sfb" aria-live="polite"></div>';
    $('code',li).textContent=it.c;const fb=$('.sfb',li);
    $$('button',li).forEach((b,i)=>b.addEventListener('click',()=>{const ok=i===it.a;fb.className='sfb fb '+(ok?'ok':'no');fb.textContent=(ok?'Correct. ':'Not this time. ')+it.w;}));
    ul.appendChild(li);});
}

/* ---------- code tabs ---------- */
function tabsW(el,cfg){
  if(!cfg)return;
  el.innerHTML='<div class="label">'+esc(cfg.title)+'</div><div class="tabs" role="group">'+cfg.tabs.map((t,i)=>'<button type="button" aria-pressed="'+(i===0)+'">'+esc(t.label)+'</button>').join('')+'</div><pre class="c"></pre><p class="stepnote" aria-live="polite"></p>';
  const bs=$$('.tabs button',el);
  function pick(i){bs.forEach((b,j)=>b.setAttribute('aria-pressed',i===j));$('pre',el).innerHTML='<code>'+hl(cfg.tabs[i].code)+'</code>';$('.stepnote',el).textContent=cfg.tabs[i].note;}
  bs.forEach((b,i)=>b.addEventListener('click',()=>pick(i)));pick(0);
}
/* ---------- panel tabs (switch between whole widgets) ---------- */
function tabset(el){
  const bs=$$(':scope > .tabs button',el),ps=$$(':scope > [data-panel]',el);
  function pick(i){bs.forEach((b,j)=>b.setAttribute('aria-pressed',i===j));ps.forEach((p,j)=>p.hidden=i!==j);}
  bs.forEach((b,i)=>b.addEventListener('click',()=>pick(i)));pick(0);
}

/* ---------- unit mind map ---------- */
function mindmap(el){
  const unit=el.closest('.unit');const ls=$$('.lesson[data-title]',unit).filter(s=>!s.dataset.kind);
  const [c1,c2]=el.dataset.center.split('|');const n=ls.length,rowH=50,H=Math.max(n*rowH+10,130);
  const cy=H/2;let s='<svg viewBox="0 0 680 '+H+'" role="group" aria-label="Mind map of the lessons in '+esc(c1+' '+c2)+'">';
  ls.forEach((l,i)=>{const y=10+i*rowH,my=y+20;s+='<path class="mm-l" d="M222 '+cy+' C 250 '+cy+', 246 '+my+', 278 '+my+'" fill="none"/>';});
  s+='<rect class="mm-c" x="20" y="'+(cy-40)+'" width="200" height="80" rx="40"/><text class="mm-ct" x="120" y="'+(cy-6)+'" text-anchor="middle">'+esc(c1)+'</text><text class="mm-cs" x="120" y="'+(cy+16)+'" text-anchor="middle">'+esc(c2)+'</text>';
  ls.forEach((l,i)=>{const y=10+i*rowH,done=!!state.done[l.id];
    s+='<a href="#'+l.id+'"><rect class="mm-n'+(done?' done':'')+'" x="280" y="'+y+'" width="380" height="40" rx="8"/><text class="mm-t" x="296" y="'+(y+25)+'">'+esc(l.dataset.title)+(done?'  ✓':'')+'</text></a>';});
  el.innerHTML=s+'</svg>';
}


/* ---------- learner picker ---------- */
let dlg=null;
function openLearner(force){
  if(!dlg){
    dlg=document.createElement('dialog');dlg.className='ldlg';dlg.setAttribute('aria-labelledby','ldlgT');
    dlg.innerHTML='<form class="ldlg-in" novalidate><h2 id="ldlgT">Who is learning?</h2><p class="small">Answers, scores and progress are saved in this browser under this name.</p>'+
      '<div class="llist"></div><label for="lname">New learner</label><div class="row"><input id="lname" type="text" maxlength="30" autocomplete="off" placeholder="First name"><button class="btn" type="submit">Start learning</button></div>'+
      '<p class="err" aria-live="polite"></p><div class="row"><button type="button" class="btn ghost lcancel">Cancel</button></div></form>';
    document.body.appendChild(dlg);
    const f=$('form',dlg),inp=$('#lname',dlg),err=$('.err',dlg);
    inp.addEventListener('input',()=>{err.textContent='';});
    f.addEventListener('submit',e=>{e.preventDefault();const n=inp.value.trim().replace(/\s+/g,' ');
      if(!n){err.textContent='Type a name to start.';inp.focus();return;}
      if(n.length>30){err.textContent='Use 30 characters or fewer.';return;}
      switchLearner(n);});
    $('.lcancel',dlg).addEventListener('click',()=>dlg.close());
    dlg.addEventListener('cancel',e=>{if(!learners.current)e.preventDefault();});
  }
  const list=$('.llist',dlg);
  list.innerHTML=learners.list.length?'<span class="small">Continue as</span>':'';
  learners.list.forEach(n=>{const b=document.createElement('button');b.type='button';b.className='btn '+(n===learners.current?'':'ghost');b.textContent=n;b.addEventListener('click',()=>switchLearner(n));list.appendChild(b);});
  $('.lcancel',dlg).parentElement.hidden=!learners.current||force;
  if(typeof dlg.showModal==='function'){if(!dlg.open)dlg.showModal();}else dlg.setAttribute('open','');
  if(!learners.list.length)$('#lname',dlg).focus();
}
function switchLearner(n){
  if(!learners.list.includes(n))learners.list.push(n);
  learners.current=n;
  if(!writeJSON(LKEY,learners)){toast('This browser is blocking storage, so progress cannot be saved. Private browsing is the usual cause.');return;}
  location.reload();
}
function learnerChips(){
  $$('.learner-chip').forEach(b=>{b.textContent=learners.current?'Learning as '+learners.current:'Choose learner';b.addEventListener('click',()=>openLearner(false));});
}

/* ---------- backup: export, import, reset ---------- */
function exportData(){
  if(!learners.current){openLearner(true);return;}
  const payload={app:'pps-visual',version:1,learner:learners.current,exported:new Date().toISOString(),data:ldata};
  const blob=new Blob([JSON.stringify(payload,null,1)],{type:'application/json'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);
  a.download='pps-progress-'+learners.current.replace(/[^a-z0-9]+/gi,'-').toLowerCase()+'-'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},1500);
  toast('Progress exported. Keep the file somewhere safe.');
}
function importData(file){
  const r=new FileReader();
  r.onload=()=>{
    let p;try{p=JSON.parse(r.result);}catch(e){toast('That file is not a progress export from this site.');return;}
    if(!p||p.app!=='pps-visual'||!p.data||typeof p.data!=='object'||!p.data.courses||typeof p.data.courses!=='object'||typeof p.learner!=='string'||!p.learner.trim()){toast('That file is not a progress export from this site.');return;}
    const name=p.learner.trim().slice(0,30);
    if(!confirm('Load the progress saved for '+name+(p.exported?' on '+String(p.exported).slice(0,10):'')+'?\n\nThis replaces any progress for '+name+' in this browser.'))return;
    if(!writeJSON(learnerKey(name),p.data)){toast('This browser is blocking storage, so the file could not be loaded.');return;}
    if(!learners.list.includes(name))learners.list.push(name);
    learners.current=name;writeJSON(LKEY,learners);location.reload();
  };
  r.onerror=()=>toast('The file could not be read. Try exporting it again.');
  r.readAsText(file);
}
function wireData(){
  $$('[data-action="export"]').forEach(b=>b.addEventListener('click',exportData));
  $$('[data-action="import"]').forEach(b=>{const inp=document.createElement('input');inp.type='file';inp.accept='.json,application/json';inp.hidden=true;b.after(inp);
    b.addEventListener('click',()=>{if(!learners.current&&!confirm('Load progress from a file?'))return;inp.click();});
    inp.addEventListener('change',()=>{if(inp.files[0])importData(inp.files[0]);inp.value='';});});
  $$('[data-action="reset"]').forEach(b=>b.addEventListener('click',()=>{
    if(!learners.current)return;
    if(!confirm('Erase all answers, scores and progress for '+learners.current+' in this browser? Export a backup first if you might want it back.'))return;
    ldata={courses:{}};save();location.reload();}));
}

/* ---------- unit pages: rail, progress, buttons ---------- */
function unitLessons(){return $$('.unit .lesson[data-title]').filter(s=>!s.dataset.kind);}
function buildRail(){
  const all=$$('.unit .lesson[data-title]');
  $('#railList').innerHTML=all.map(s=>{const plain=s.dataset.kind&&s.dataset.kind!=='quiz';
    return '<li'+(plain?'':' data-k="'+s.id+'"')+'><a href="#'+s.id+'"><span class="tick" aria-hidden="true"'+(plain?' style="visibility:hidden"':'')+'></span>'+esc(s.dataset.title)+'</a></li>';}).join('');
}
function refresh(){
  if(PAGE.page!=='unit')return;
  const U=PAGE.unit;
  $$('[data-done]').forEach(b=>{const k=b.dataset.done,on=!!state.done[k],num=$('#'+k).dataset.title.split(' ')[0];
    b.classList.toggle('is-done',on);b.classList.toggle('ghost',!on);b.textContent=on?'Completed. Click to undo':'Mark lesson '+num+' complete';b.setAttribute('aria-pressed',on);});
  $$('[data-solved]').forEach(b=>{const on=!!state.done[b.dataset.solved];b.classList.toggle('is-done',on);b.classList.toggle('ghost',!on);b.textContent=on?'Solved. Click to undo':'Mark as solved';b.setAttribute('aria-pressed',on);});
  $$('.labcount').forEach(p=>{const bs=$$('[data-solved]',p.closest('.lesson'));p.textContent=bs.filter(b=>state.done[b.dataset.solved]).length+' of '+bs.length+' problems solved';});
  $$('#railList li[data-k]').forEach(li=>{const k=li.dataset.k;const on=k.endsWith('quiz')?state.best[k.replace('quiz','')]!=null:!!state.done[k];li.classList.toggle('done',on);$('.tick',li).textContent=on?'✓':'';});
  const ls=unitLessons(),d=ls.filter(s=>state.done[s.id]).length;
  $('#barFill').style.width=(ls.length?d/ls.length*100:0)+'%';
  $('#progText').textContent=d+' of '+ls.length+' lessons done'+(state.best['u'+U]!=null?'. Best quiz score '+state.best['u'+U]+'/10':'');
  $$('.mindmap').forEach(mindmap);
}
function initUnitPage(){
  const run=(sel,fn)=>$$(sel).forEach(el=>{try{fn(el);}catch(e){console.error(e);}});
  run('pre[data-hl]',el=>{el.innerHTML='<code>'+hl(el.textContent.replace(/^\n/,''))+'</code>';});
  run('.qc',h=>(PPS.Q[h.dataset.set]||[]).forEach((it,i)=>makeQ(it,h,{qid:h.dataset.set+'.'+i,restore:true,retry:true})));
  run('.uq',el=>unitQuiz(el,el.dataset.set));
  run('.tracer',el=>tracer(el,PPS.TR[el.dataset.t]));
  run('.stepper',el=>stepper(el,PPS.ST[el.dataset.s]));
  run('.orderw',el=>orderW(el,PPS.OR[el.dataset.o]));
  run('.sorterw',el=>sorterW(el,PPS.SO[el.dataset.s]));
  run('.tabsw',el=>tabsW(el,PPS.TB[el.dataset.k]));
  run('.tabset',tabset);
  PPS.init.forEach(f=>{try{f();}catch(e){console.error(e);}});
  $$('[data-done]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.done;state.done[k]=!state.done[k];save();refresh();}));
  $$('[data-solved]').forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.solved;state.done[k]=!state.done[k];save();refresh();}));
  run('.labfilter',el=>{const bs=$$('button',el),probs=$$('.prob',el.closest('.lesson'));
    bs.forEach(b=>b.addEventListener('click',()=>{bs.forEach(x=>x.setAttribute('aria-pressed',x===b));probs.forEach(p=>p.hidden=b.dataset.f!=='all'&&p.dataset.level!==b.dataset.f);}));});
  buildRail();refresh();
  if(location.hash){const t=document.getElementById(decodeURIComponent(location.hash.slice(1)));if(t)setTimeout(()=>t.scrollIntoView(),0);}
}

/* ---------- course summaries (course home and site home) ---------- */
function courseSummary(id){
  const m=window.PPS_MANIFEST[id];if(!m)return null;const c=courseState(id);
  return m.units.map(u=>({u,lessons:u.lessons.filter(l=>c.done[l[0]]).length,labs:u.labs.filter(k=>c.done[k]).length,best:c.best[u.quiz]}));
}
function initCoursePage(){
  const sum=courseSummary(COURSE)||[];
  $$('.roadmap a[data-unit]').forEach(a=>{const s=sum.find(x=>String(x.u.n)===a.dataset.unit);if(!s)return;
    $('.prog',a).textContent=s.lessons+' of '+s.u.lessons.length+' lessons'+(s.best!=null?', quiz '+s.best+'/10':'');});
  initTerminal();
  const dr=$('#daily');if(dr)dailyReview(dr);
  const ms=$('#mastery');if(ms)ms.innerHTML=masteryHTML(true)+'<p class="small"><a href="progress.html">What each stage needs, and your next step</a></p>';
}
function initHomePage(){
  $$('[data-course-card]').forEach(card=>{const sum=courseSummary(card.dataset.courseCard);if(!sum)return;
    const L=sum.reduce((a,s)=>a+s.lessons,0),T=sum.reduce((a,s)=>a+s.u.lessons.length,0),Q=sum.filter(s=>s.best!=null).length;
    $('.prog',card).textContent=learners.current?L+' of '+T+' lessons done, '+Q+' of '+sum.length+' unit quizzes taken':'Choose a learner to track progress';
    $('.meter i',card).style.width=(T?L/T*100:0)+'%';});
}

/* ---------- progress dashboard ---------- */
function initProgressPage(){
  const m=window.PPS_MANIFEST[COURSE],el=$('#dash');if(!m||!el)return;
  $('#dashWho').textContent=learners.current?learners.current+'\u2019s progress':'No learner chosen yet';
  const rows=m.units.map(u=>{
    const sets=Object.keys(PPS.Q).filter(k=>k.startsWith('u'+u.n+'l'));
    let qTot=0,qAns=0,qFirst=0;sets.forEach(s=>PPS.Q[s].forEach((_,i)=>{qTot++;const a=state.answers[s+'.'+i];if(a){qAns++;if(a.first)qFirst++;}}));
    const att=state.quizzes[u.quiz]||[];
    return {u,lessons:u.lessons.filter(l=>state.done[l[0]]).length,qTot,qAns,qFirst,labs:u.labs.filter(k=>state.done[k]).length,best:state.best[u.quiz],att};});
  const tot=(f)=>rows.reduce((a,r)=>a+f(r),0);
  const meter=(v,t)=>'<span class="meter" aria-hidden="true"><i style="width:'+(t?Math.round(v/t*100):0)+'%"></i></span>';
  const L=tot(r=>r.lessons),LT=tot(r=>r.u.lessons.length),QA=tot(r=>r.qAns),QT=tot(r=>r.qTot),QF=tot(r=>r.qFirst),B=tot(r=>r.labs),BT=tot(r=>r.u.labs.length),QZ=tot(r=>r.att.length);
  let h=masteryHTML(false)+readinessHTML()+'<h2>Lessons and practice</h2><div class="stats">'+
    '<div class="stat"><span class="big">'+L+'<small>/'+LT+'</small></span>Lessons completed'+meter(L,LT)+'</div>'+
    '<div class="stat"><span class="big">'+QA+'<small>/'+QT+'</small></span>Quick checks answered'+meter(QA,QT)+'</div>'+
    '<div class="stat"><span class="big">'+(QA?Math.round(QF/QA*100):0)+'%</span>Right on the first try</div>'+
    '<div class="stat"><span class="big">'+B+'<small>/'+BT+'</small></span>Lab problems solved'+meter(B,BT)+'</div>'+
    '<div class="stat"><span class="big">'+QZ+'</span>Unit quizzes taken</div></div>';
  h+='<div class="tbl"><table class="ptable"><thead><tr><th>Unit</th><th>Lessons</th><th>Quick checks</th><th>Lab problems</th><th>Unit quiz</th></tr></thead><tbody>'+
    rows.map(r=>'<tr><td><a href="'+r.u.href+'">Unit '+r.u.n+': '+esc(r.u.title)+'</a></td>'+
      '<td>'+r.lessons+' of '+r.u.lessons.length+meter(r.lessons,r.u.lessons.length)+'</td>'+
      '<td>'+r.qAns+' of '+r.qTot+(r.qAns?', '+r.qFirst+' right first time':'')+meter(r.qAns,r.qTot)+'</td>'+
      '<td>'+r.labs+' of '+r.u.labs.length+meter(r.labs,r.u.labs.length)+'</td>'+
      '<td>'+(r.best!=null?'Best '+r.best+'/10, '+r.att.length+' attempt'+(r.att.length===1?'':'s')+', last '+fmtDate(r.att[r.att.length-1].t):'Not taken yet')+'</td></tr>').join('')+'</tbody></table></div>';
  const rev=[];
  Object.keys(state.answers).forEach(qid=>{const a=state.answers[qid];if(!a.w)return;const [set,i]=qid.split('.');
    let item,href,where;
    if(PPS.TQ[set]){item=PPS.TQ[set].pool[+i];if(item)rev.push({a,item,href:'practice.html#'+set+'-sec',where:PPS.TQ[set].title});return;}
    const un=set.match(/^u(\d)/);if(!un)return;const unit=m.units.find(u=>String(u.n)===un[1]);if(!unit)return;
    if(set.endsWith('quiz')){item=(PPS.UQ[set.replace('quiz','')]||[])[+i];href=unit.href+'#'+set;where='Unit '+unit.n+' quiz';}
    else{item=(PPS.Q[set]||[])[+i];href=unit.href+'#'+set;const l=unit.lessons.find(x=>x[0]===set);where=l?l[1]:'Unit '+unit.n;}
    if(item)rev.push({a,item,href,where});});
  rev.sort((x,y)=>(x.a.ok===y.a.ok?0:x.a.ok?1:-1)||y.a.w-x.a.w||y.a.t-x.a.t);
  const tqs=Object.keys(PPS.TQ),wqs=Object.keys(PPS.WQ);
  if(tqs.length){
    h+='<h2>Assessment practice</h2><div class="tbl"><table class="ptable"><thead><tr><th>Practice</th><th>Attempts</th><th>Best</th><th>Last attempt</th></tr></thead><tbody>'+
      tqs.map(k=>{const at=state.quizzes[k]||[],c=PPS.TQ[k];return '<tr><td><a href="practice.html#'+k+'-sec">'+esc(c.title)+'</a></td><td>'+at.length+'</td><td>'+(state.best[k]!=null?state.best[k]+'/'+c.count:'Not tried yet')+'</td><td>'+(at.length?at[at.length-1].s+'/'+at[at.length-1].n+' on '+fmtDate(at[at.length-1].t):'')+'</td></tr>';}).join('')+
      wqs.map(k=>{const mine=(state.written||{})[k]||{},list=PPS.WQ[k],done=list.filter(w=>mine[w.id]!=null),tot=w=>w.scheme.reduce((a,s)=>a+(+s[0]),0);
        return '<tr><td><a href="practice.html#written">Written questions</a></td><td>'+done.length+' of '+list.length+' self-marked</td><td>'+(done.length?done.reduce((a,w)=>a+mine[w.id],0)+' of '+done.reduce((a,w)=>a+tot(w),0)+' marks':'Not tried yet')+'</td><td></td></tr>';}).join('')+
      '</tbody></table></div>';
  }
  if(PPS.SDL.length){let dp=0,hr=0,th=0;PPS.SDL.forEach(p=>{th+=p.hours;if(sdlStatus(p).state==='done'){dp++;hr+=p.hours;}});
    h+='<h2>Self-directed learning projects</h2><p>'+dp+' of '+PPS.SDL.length+' projects completed, '+hr+' of '+th+' learning hours. <a href="sdl.html">Open the projects</a></p>';}
  if(PPS.EXAM.length){h+='<h2>Mock papers</h2><ul class="revisit">'+PPS.EXAM.map(p=>{const mine=(state.written||{})[p.id]||{},ks=Object.keys(mine);const got=ks.reduce((a,k)=>a+mine[k],0);
      return '<li><a href="exam.html#'+p.id+'">'+esc(p.title)+'</a>: '+(ks.length?ks.length+' of 15 parts self-marked, '+got+' marks':'not attempted yet')+'</li>';}).join('')+'</ul>';}
  h+=bloomHTML();
  h+='<h2>Questions to revisit</h2>';
  h+=rev.length?'<p class="small">Questions answered wrongly at least once. The ones still wrong come first.</p><ul class="revisit">'+rev.slice(0,25).map(r=>'<li><span class="lvl '+(r.a.ok?'easy':'exam')+'">'+(r.a.ok?'Fixed after '+r.a.n+' tries':'Still wrong')+'</span> <a href="'+r.href+'">'+esc(r.item.q)+'</a><span class="small"> '+esc(r.where)+', last answered '+fmtDate(r.a.t)+'</span></li>').join('')+'</ul>'
    :'<p class="small">Nothing to revisit yet. Questions answered wrongly will collect here so you can go back to them.</p>';
  el.innerHTML=h;
}

/* ---------- course home terminal animation ---------- */
function initTerminal(){
  const term=$('#termtext');if(!term)return;
  const lines=[['p','$ gcc hello.c -o hello'],['p','$ ./hello'],['out','Hello, World!'],['p','$ ']];
  const render=(n,partial)=>{term.innerHTML=lines.slice(0,n).map(l=>'<div class="'+l[0]+'">'+l[1]+'</div>').join('')+(partial!==undefined?'<div class="'+lines[n][0]+'">'+partial+'<span class="caret"></span></div>':'');};
  function run(li,ci){const last=lines.length-1;if(li===last){render(last,lines[last][1]);return;}
    if(lines[li][0]==='out'){render(li+1);setTimeout(()=>run(li+1,0),500);return;}
    const t=lines[li][1];if(ci<=t.length){render(li,t.slice(0,ci));setTimeout(()=>run(li,ci+1),55);}else setTimeout(()=>run(li+1,0),350);}
  if(reduce)render(3,'$ ');else run(0,0);
}

/* ---------- offline support ---------- */
function registerSW(){
  if('serviceWorker' in navigator&&/^https?:$/.test(location.protocol)&&location.hostname!=='localhost'&&location.hostname!=='127.0.0.1')
    navigator.serviceWorker.register(ROOT+'sw.js',{scope:ROOT}).catch(()=>{});
}

function initPage(){
  learnerChips();wireData();
  const p=PAGE.page;
  try{if(p==='unit'){initUnitPage();renderCourseOutcomes();}else if(p==='course')initCoursePage();else if(p==='home')initHomePage();else if(p==='progress')initProgressPage();else if(p==='practice'){initPracticePage();$$('#sprint').forEach(sprintDrill);$$('#bughunt').forEach(bugHunt);$$('#mixed').forEach(mixedQuiz);}else if(p==='search')initSearchPage();else if(p==='sdl')initSdlPage();else if(p==='exam')initExamPage();}catch(e){console.error(e);}
  $$('pre.c,.tr-code').forEach(x=>{if(!x.hasAttribute('tabindex'))x.setAttribute('tabindex','0');});
  registerSW();
  if(!learners.current)openLearner(true);
}

/* ---------- assessment practice: timed objective quizzes ---------- */
PPS.TQ={};PPS.WQ={};
const fmtTime=s=>Math.floor(s/60)+' min '+String(s%60).padStart(2,'0')+' s';
let tqRunning=0;
window.addEventListener('beforeunload',e=>{if(tqRunning){e.preventDefault();e.returnValue='';}});
function timedQuiz(el){
  const key=el.dataset.set,cfg=PPS.TQ[key];if(!cfg)return;
  let picks=[],timer=null,end=0,startT=0,warned5=false,warned1=false;
  const stop=()=>{if(timer){clearInterval(timer);timer=null;tqRunning=Math.max(0,tqRunning-1);}};
  const marksOf=s=>cfg.marks?' ('+(Math.round(s*cfg.marks/cfg.count*2)/2)+' of '+cfg.marks+' marks)':'';
  function intro(){
    const hist=(state.quizzes[key]||[]).slice(-5).reverse();
    el.innerHTML='<div class="panel tq-intro"><p><b>'+cfg.count+' questions, '+cfg.minutes+' minutes.</b> '+esc(cfg.intro)+'</p>'+
      '<p class="small">Each attempt draws a fresh set from '+cfg.pool.length+' questions. As in the real quiz, answers are revealed only after you submit.</p>'+
      '<div class="row"><button class="btn" type="button">Start a '+cfg.minutes+'-minute attempt</button></div>'+
      (hist.length?'<div class="tq-hist"><div class="tr-l">Recent attempts</div><ul>'+hist.map(h=>'<li>'+fmtDate(h.t)+': '+h.s+' of '+h.n+' correct'+marksOf(h.s)+', in '+fmtTime(h.used||0)+'</li>').join('')+'</ul></div>':'')+'</div>';
    $('.btn',el).addEventListener('click',start);
  }
  function start(){
    const idx=cfg.pool.map((_,i)=>i);
    for(let i=idx.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[idx[i],idx[j]]=[idx[j],idx[i]];}
    picks=idx.slice(0,cfg.count);startT=Date.now();end=startT+cfg.minutes*60000;warned5=warned1=false;
    el.innerHTML='<div class="tq-bar"><span class="tq-time" aria-hidden="true"></span><span class="tq-count"></span><button class="btn" type="button">Submit answers</button></div><p class="sr" aria-live="assertive"></p>'+
      picks.map((pi,k)=>{const it=cfg.pool[pi];return '<fieldset class="q" data-pi="'+pi+'"><legend>'+(k+1)+'. '+esc(it.q)+'</legend><div class="qtag">'+esc(qTag(key+'.'+pi,it))+'</div>'+(it.c?'<pre class="c"><code>'+hl(it.c)+'</code></pre>':'')+
        it.o.map((o,i)=>'<label class="opt"><input type="radio" name="'+key+'-'+k+'" value="'+i+'"><span>'+esc(o)+'</span></label>').join('')+'<div class="fb"></div></fieldset>';}).join('')+
      '<div class="row"><button class="btn" type="button">Submit answers</button></div>';
    $$('.btn',el).forEach(b=>b.addEventListener('click',()=>submit(false)));
    $$('input',el).forEach(r=>r.addEventListener('change',count));
    count();tqRunning++;timer=setInterval(tick,1000);tick();
    el.scrollIntoView();
  }
  function count(){const n=$$('fieldset',el).filter(f=>$('input:checked',f)).length;$('.tq-count',el).textContent=n+' of '+picks.length+' answered';}
  function tick(){
    const left=Math.max(0,Math.round((end-Date.now())/1000));
    const t=$('.tq-time',el);t.textContent=Math.floor(left/60)+':'+String(left%60).padStart(2,'0')+' left';t.classList.toggle('warn',left<=120);
    const live=$('.sr',el);
    if(left<=300&&!warned5&&left>60){warned5=true;live.textContent='5 minutes left.';}
    if(left<=60&&!warned1){warned1=true;live.textContent='1 minute left.';}
    if(left<=0)submit(true);
  }
  function submit(auto){
    if(!timer)return;
    const sets=$$('fieldset',el),unans=sets.filter(f=>!$('input:checked',f)).length;
    if(!auto&&unans&&!confirm(unans+' question'+(unans>1?'s are':' is')+' unanswered. Submit anyway?'))return;
    stop();
    const used=Math.min(cfg.minutes*60,Math.round((Date.now()-startT)/1000));let score=0;
    sets.forEach(f=>{const pi=+f.dataset.pi,it=cfg.pool[pi],pick=$('input:checked',f),v=pick?+pick.value:-1,ok=v===it.a;if(ok)score++;
      if(v>=0)record(key+'.'+pi,v,ok);
      $$('.opt',f).forEach((l,i)=>{l.classList.toggle('right',i===it.a);l.classList.toggle('wrong',i===v&&!ok);});
      $$('input',f).forEach(r=>r.disabled=true);
      const fb=$('.fb',f);fb.className='fb '+(ok?'ok':'no');
      const h=document.createElement('b');h.textContent=ok?'Correct.':(v<0?'Not answered. ':'Not quite. ')+'The answer is "'+it.o[it.a]+'".';
      const w=document.createElement('span');w.className='why';w.textContent=it.w;fb.append(h,w);});
    state.quizzes[key]=(state.quizzes[key]||[]).concat({s:score,n:picks.length,t:Date.now(),used}).slice(-20);
    if(state.best[key]==null||score>state.best[key])state.best[key]=score;save();
    $('.tq-bar',el).remove();$$(':scope > .row',el).forEach(r=>r.remove());
    const msg=score>=8?'Strong result. Review any you missed, then try a fresh set.':score>=5?'Solid start. Read the explanations below for the ones you missed.':'Go back over the lessons for the questions you missed, then try again.';
    const p=document.createElement('div');p.className='panel tq-result';
    p.innerHTML='<div class="score">'+score+'/'+picks.length+'</div><p></p><p class="small"></p><div class="row"><button class="btn" type="button">Try a fresh set</button><a class="btn ghost" href="progress.html">See my progress</a></div>';
    $$('p',p)[0].textContent=(auto?'Time is up. ':'')+msg;
    $$('p',p)[1].textContent='Time used: '+fmtTime(used)+'.'+(cfg.marks?' That is about '+(Math.round(score*cfg.marks/cfg.count*2)/2)+' of '+cfg.marks+' marks.':'')+' Best so far: '+state.best[key]+'/'+cfg.count+'.';
    $('button',p).addEventListener('click',intro);el.prepend(p);p.scrollIntoView();
  }
  intro();
}

/* ---------- assessment practice: written questions with self-marking ---------- */
function writtenBank(el){
  const key=el.dataset.set,list=PPS.WQ[key]||[];
  if(!state.written||typeof state.written!=='object')state.written={};
  const mine=state.written[key]||(state.written[key]={});
  const total=w=>w.scheme.reduce((a,s)=>a+(+s[0]),0);
  el.innerHTML=list.map(w=>{const t=total(w);
    return '<article class="wq" id="'+key+'-'+w.id+'"><div class="prob-h"><span class="lvl medium">'+esc(w.co)+'</span><h3>'+esc(w.id)+'</h3><span class="lec">'+esc(w.marks)+' marks, '+esc(w.bl)+'</span></div>'+
      w.q.split('\n').map(p=>'<p>'+esc(p)+'</p>').join('')+(w.qcode?'<pre class="c"><code>'+hl(w.qcode)+'</code></pre>':'')+
      '<div class="answer-space" aria-hidden="true"></div>'+
      '<details class="reveal wq-ans"><summary>Model answer and marking scheme</summary>'+
      '<pre class="c"><code>'+(w.plain?esc(w.code):hl(w.code))+'</code></pre>'+
      (w.sample?'<div class="io"><div><div class="tr-l">Sample input</div><pre class="tr-out">'+esc(w.sample[0]||'(none)')+'</pre></div><div><div class="tr-l">Output</div><pre class="tr-out">'+esc(w.sample[1])+'</pre></div></div>':'')+
      '<p>'+esc(w.note)+'</p><div class="tbl"><table class="scheme"><thead><tr><th>Marks</th><th>Awarded for</th></tr></thead><tbody>'+
      w.scheme.map(s=>'<tr><td>'+esc(s[0])+'</td><td>'+esc(s[1])+'</td></tr>').join('')+'</tbody></table></div></details>'+
      '<div class="row selfmark" role="group" aria-label="Marks I gave myself for '+esc(w.id)+'"><span class="small">Marks I gave myself:</span>'+
      Array.from({length:t+1},(_,i)=>'<button type="button" class="mk" data-w="'+esc(w.id)+'" data-v="'+i+'">'+i+'</button>').join('')+'<span class="small">of '+t+'</span></div></article>';}).join('');
  function sync(){
    $$('.mk',el).forEach(b=>b.setAttribute('aria-pressed',String(mine[b.dataset.w])===b.dataset.v));
    const done=list.filter(w=>mine[w.id]!=null),got=done.reduce((a,w)=>a+mine[w.id],0),out=done.reduce((a,w)=>a+total(w),0);
    $$('[data-wq-summary="'+key+'"]').forEach(s=>s.textContent=done.length?'You have marked '+done.length+' of '+list.length+' questions: '+got+' of '+out+' marks.':'Mark yourself after each answer to track your score here.');
  }
  $$('.mk',el).forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.w,v=+b.dataset.v;if(mine[k]===v)delete mine[k];else mine[k]=v;save();sync();}));
  sync();
}
function printWritten(withAnswers){
  const root=document.documentElement,prevTheme=root.getAttribute('data-theme'),ds=$$('#written details'),was=ds.map(d=>d.open);
  root.setAttribute('data-theme','light');document.body.classList.add('print-mode',withAnswers?'print-answers':'print-questions');
  ds.forEach(d=>d.open=withAnswers);
  const done=()=>{document.body.classList.remove('print-mode','print-answers','print-questions');ds.forEach((d,i)=>d.open=was[i]);
    if(prevTheme==null)root.removeAttribute('data-theme');else root.setAttribute('data-theme',prevTheme);window.removeEventListener('afterprint',done);};
  window.addEventListener('afterprint',done);window.print();setTimeout(()=>{if(document.body.classList.contains('print-mode'))done();},60000);
}
function initPracticePage(){
  $$('.tq').forEach(el=>{try{timedQuiz(el);}catch(e){console.error(e);}});
  $$('.wq-list').forEach(el=>{try{writtenBank(el);}catch(e){console.error(e);}});
  $$('[data-print]').forEach(b=>b.addEventListener('click',()=>printSection('written',b.dataset.print==='answers')));
  if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)setTimeout(()=>t.scrollIntoView(),0);}
}


/* ---------- question tags: course outcome and Bloom's level ---------- */
PPS.BL={};PPS.SDL=[];PPS.EXAM=[];
function qTag(qid,item){
  const set=String(qid||'').split('.')[0];
  let co=item&&item.co;
  if(!co){const m=/^u(\d)/.exec(set);if(m)co='CO'+m[1];else if(PPS.TQ[set]&&PPS.TQ[set].co)co=PPS.TQ[set].co;}
  const bl=(item&&item.bl)||PPS.BL[qid];
  return [co,bl].filter(Boolean).join(', ');
}

/* ---------- readiness by course outcome ---------- */
const sumScheme=w=>w.scheme.reduce((a,s)=>a+(+s[0]),0);
function sdlStatus(p){const ks=p.milestones.map((_,k)=>'sdl'+p.n+'m'+(k+1)),d=ks.filter(k=>state.done[k]).length;return {done:d,total:ks.length,state:d===0?'todo':d===ks.length?'done':'doing'};}
function coReadiness(){
  const m=window.PPS_MANIFEST[COURSE];if(!m||!m.cos)return [];
  return m.cos.map((co,ix)=>{
    const u=m.units[ix],cat={};
    cat.learn=u.lessons.length?u.lessons.filter(l=>state.done[l[0]]).length/u.lessons.length:0;
    let qT=0,qF=0;Object.keys(PPS.Q).filter(k=>k.startsWith('u'+u.n+'l')).forEach(s=>PPS.Q[s].forEach((_,i)=>{qT++;const a=state.answers[s+'.'+i];if(a&&a.first)qF++;}));
    cat.check=qT?qF/qT:0;
    const qn=(PPS.UQ[u.quiz]||[]).length||10;cat.quiz=state.best[u.quiz]!=null?state.best[u.quiz]/qn:0;
    const pr=[u.labs.length?u.labs.filter(k=>state.done[k]).length/u.labs.length:0];
    Object.keys(PPS.TQ).forEach(k=>{const c=PPS.TQ[k];if((c.cos||[c.co]).includes(co.id))pr.push(state.best[k]!=null?state.best[k]/c.count:0);});
    Object.keys(PPS.WQ).forEach(k=>{const mine=(state.written||{})[k]||{},ws=PPS.WQ[k].filter(w=>w.co===co.id);if(!ws.length)return;
      const got=ws.reduce((a,w)=>a+(mine[w.id]||0),0),out=ws.reduce((a,w)=>a+sumScheme(w),0);pr.push(out?got/out:0);});
    if(co.id==='CO3'&&PPS.SDL.length){let d=0,t=0;PPS.SDL.forEach(p=>{const s=sdlStatus(p);d+=s.done;t+=s.total;});pr.push(t?d/t:0);}
    cat.practise=pr.reduce((a,b)=>a+b,0)/pr.length;
    let eg=0,et=0;PPS.EXAM.forEach(p=>{const mine=(state.written||{})[p.id]||{};p.questions.forEach((q,qi)=>{if(q.co!==co.id)return;q.parts.forEach((pt,pi)=>{const k='Q'+(qi+1)+'abc'[pi];if(mine[k]!=null){eg+=mine[k];et+=pt.m;}});});});
    if(et)cat.exam=eg/et;
    const vals=Object.values(cat),score=vals.reduce((a,b)=>a+b,0)/vals.length;
    return {co,unit:u,cat,score,priority:co.marks*(1-score)};
  });
}
function readinessHTML(){
  const rows=coReadiness();if(!rows.length)return '';
  const pct=v=>Math.round(v*100)+'%';
  const meter=v=>'<span class="meter" aria-hidden="true"><i style="width:'+Math.round(v*100)+'%"></i></span>';
  const focus=rows.slice().sort((a,b)=>b.priority-a.priority).slice(0,2);
  let h='<h2>Readiness by course outcome</h2><p class="small">Each course outcome carries different marks. Readiness combines lessons completed, quick checks right first time, the unit quiz, practice (labs, assessment practice and projects) and mock-paper self-marks. Focus first where the marks are high and readiness is low.</p>';
  h+='<div class="focus panel"><b>Focus next:</b> '+focus.map(r=>esc(r.co.id)+' ('+esc(r.co.short)+', '+r.co.marks+' marks, '+pct(r.score)+' ready)').join(' and then ')+'.</div>';
  h+='<div class="tbl"><table class="ptable"><thead><tr><th>Outcome</th><th>Marks</th><th>Lessons</th><th>Checks</th><th>Quiz</th><th>Practice</th><th>Mocks</th><th>Readiness</th></tr></thead><tbody>'+
    rows.map(r=>'<tr><td><a href="'+r.unit.href+'">'+esc(r.co.id)+'</a> <span class="small">'+esc(r.co.short)+'</span></td><td>'+r.co.marks+'</td><td>'+pct(r.cat.learn)+'</td><td>'+pct(r.cat.check)+'</td><td>'+pct(r.cat.quiz)+'</td><td>'+pct(r.cat.practise)+'</td><td>'+(r.cat.exam!=null?pct(r.cat.exam):'not tried')+'</td><td><b>'+pct(r.score)+'</b>'+meter(r.score)+'</td></tr>').join('')+'</tbody></table></div>';
  return h;
}
function bloomHTML(){
  const lv=['Remember','Understand','Apply','Analyse','Evaluate','Create'],c={};
  Object.keys(state.answers).forEach(qid=>{const a=state.answers[qid],[set,i]=qid.split('.');let it=null;
    if(PPS.TQ[set])it=PPS.TQ[set].pool[+i];else if(set.endsWith('quiz'))it=(PPS.UQ[set.replace('quiz','')]||[])[+i];else it=(PPS.Q[set]||[])[+i];
    const bl=(it&&it.bl)||PPS.BL[qid];if(!bl)return;c[bl]=c[bl]||{n:0,f:0};c[bl].n++;if(a.first)c[bl].f++;});
  if(!Object.keys(c).length)return '';
  return '<h2>Answers by thinking level</h2><p class="small">Exams prefer apply level and above. Right-first-time rates show which kinds of question need more practice.</p><div class="tbl"><table class="ptable"><thead><tr><th>Bloom\u2019s level</th><th>Questions answered</th><th>Right first time</th></tr></thead><tbody>'+
    lv.filter(l=>c[l]).map(l=>'<tr><td>'+l+'</td><td>'+c[l].n+'</td><td>'+Math.round(c[l].f/c[l].n*100)+'%</td></tr>').join('')+'</tbody></table></div>';
}

/* ---------- printing any section (written questions, mock papers) ---------- */
function printSection(id,withAnswers){
  const root=document.documentElement,prev=root.getAttribute('data-theme'),sec=document.getElementById(id);if(!sec)return;
  const ds=$$('details',sec),was=ds.map(d=>d.open);
  root.setAttribute('data-theme','light');sec.classList.add('print-target');document.body.classList.add('print-mode',withAnswers?'print-answers':'print-questions');
  ds.forEach(d=>d.open=withAnswers);
  const done=()=>{document.body.classList.remove('print-mode','print-answers','print-questions');sec.classList.remove('print-target');ds.forEach((d,i)=>d.open=was[i]);
    if(prev==null)root.removeAttribute('data-theme');else root.setAttribute('data-theme',prev);window.removeEventListener('afterprint',done);};
  window.addEventListener('afterprint',done);window.print();setTimeout(()=>{if(document.body.classList.contains('print-mode'))done();},60000);
}

/* ---------- self-directed learning projects ---------- */
function initSdlPage(){
  const el=$('#sdl');if(!el)return;const list=PPS.SDL;
  el.innerHTML=list.map(p=>{
    const uses=p.concepts.map(c=>'<a href="unit'+c[0][1]+'.html#'+c[0]+'">'+esc(c[1])+'</a>').join(', ');
    return '<article class="proj prob" id="p'+p.n+'" data-n="'+p.n+'"><div class="prob-h"><span class="lvl medium">Project '+p.n+'</span><h3>'+esc(p.title)+'</h3><span class="lec">'+p.hours+' hours, CO3</span><span class="pstate"></span></div>'+
      '<p class="small"><b>Course plan:</b> '+esc(p.plan)+'</p><p>'+esc(p.brief)+'</p><p class="small"><b>Uses:</b> '+uses+'</p>'+
      '<div class="tr-l">Milestones (tick each one when it works)</div><ol class="miles">'+p.milestones.map((ms,k)=>'<li><label class="ms"><input type="checkbox" data-ms="sdl'+p.n+'m'+(k+1)+'"><span>'+esc(ms[0])+'</span></label><details class="hint"><summary>Hint</summary><p>'+esc(ms[1])+'</p></details></li>').join('')+'</ol>'+
      (p.stdin!=null?'<div class="io"><div><div class="tr-l">Sample input</div><pre class="tr-out">'+esc(p.stdin||'(none)')+'</pre></div><div><div class="tr-l">Expected output</div><pre class="tr-out">'+esc(p.out)+'</pre></div></div>':'')+
      '<details class="reveal sol"><summary>Reference solution</summary><div class="solbody"></div></details>'+
      '<p class="small"><b>Take it further:</b> '+esc(p.extend)+'</p></article>';}).join('');
  function paint(){
    let doneP=0,hrs=0;
    list.forEach(p=>{const s=sdlStatus(p),card=$('#p'+p.n);card.dataset.state=s.state;
      $('.pstate',card).textContent=s.state==='done'?'Completed':s.state==='doing'?s.done+' of '+s.total+' milestones':'Not started';
      $('.pstate',card).className='pstate '+s.state;
      $$('[data-ms]',card).forEach(c=>c.checked=!!state.done[c.dataset.ms]);
      const body=$('.solbody',card),open=s.state==='done'||state.done['sdl'+p.n+'show'];
      if(open&&!body.dataset.shown){body.dataset.shown='1';body.innerHTML='<pre class="c" data-stdin="'+esc(p.stdin||'')+'"><code>'+hl(p.code)+'</code></pre><p class="small">Compiled with gcc -Wall -Wextra and run on the sample input above. Your version can look different and still be right: compare outputs, not lines.</p>';addRunLinks(body);}
      if(!open){body.dataset.shown='';body.innerHTML='<p>Try the milestones first: the solution unlocks when all of them are ticked. Reading a solution before trying teaches far less than getting stuck for a while.</p><button type="button" class="btn ghost">Show it anyway</button>';
        $('button',body).addEventListener('click',()=>{state.done['sdl'+p.n+'show']=true;save();paint();});}
      if(s.state==='done'){doneP++;hrs+=p.hours;}});
    $$('.sdlcount').forEach(x=>x.textContent=doneP+' of '+list.length+' projects completed, '+hrs+' of '+list.reduce((a,p)=>a+p.hours,0)+' learning hours');
  }
  $$('[data-ms]',el).forEach(c=>c.addEventListener('change',()=>{state.done[c.dataset.ms]=c.checked;if(!c.checked)delete state.done[c.dataset.ms];save();paint();}));
  $$('.sdlfilter button').forEach(b=>b.addEventListener('click',()=>{$$('.sdlfilter button').forEach(x=>x.setAttribute('aria-pressed',x===b));
    $$('.proj',el).forEach(p=>p.hidden=b.dataset.f!=='all'&&p.dataset.state!==b.dataset.f);}));
  paint();
  if(location.hash){const t=document.getElementById(location.hash.slice(1));if(t)setTimeout(()=>t.scrollIntoView(),0);}
}

/* ---------- end-semester mock papers ---------- */
let examTimer=null;
function initExamPage(){
  const host=$('#papers');if(!host)return;
  if(!state.written||typeof state.written!=='object')state.written={};
  host.innerHTML=PPS.EXAM.map(p=>'<section class="paper" id="'+p.id+'"><div class="paper-h"><h2>'+esc(p.title)+'</h2><span class="labcount" data-paper-total="'+p.id+'"></span></div>'+
    '<p class="small">Answer all 5 questions. Each carries 10 marks in 3 parts. Time: 3 hours. Write on paper, then open each model answer and mark yourself.</p>'+
    '<div class="row wq-tools"><button class="btn" type="button" data-timer="'+p.id+'">Start a 3-hour timer</button><button class="btn ghost" type="button" data-pp="'+p.id+'" data-mode="q">Print questions with answer space</button><button class="btn ghost" type="button" data-pp="'+p.id+'" data-mode="a">Print with model answers</button></div>'+
    p.questions.map((q,qi)=>'<article class="xq"><div class="prob-h"><span class="lvl medium">'+esc(q.co)+'</span><h3>Question '+(qi+1)+'</h3><span class="lec">10 marks</span></div>'+
      q.parts.map((pt,pi)=>{const key='Q'+(qi+1)+'abc'[pi];return '<div class="xpart"><p><b>('+'abc'[pi]+')</b> '+esc(pt.q)+' <span class="qtag">'+pt.m+' marks, '+esc(pt.bl)+'</span></p>'+
        (pt.qcode?'<pre class="c"><code>'+hl(pt.qcode)+'</code></pre>':'')+'<div class="answer-space" aria-hidden="true"></div>'+
        '<details class="reveal wq-ans"><summary>Model answer and marking scheme</summary><pre class="c"'+(!pt.plain&&pt.sample&&!/\.txt:/.test(pt.sample[0])?' data-stdin="'+esc(pt.sample[0])+'"':'')+'><code>'+(pt.plain?esc(pt.a):hl(pt.a))+'</code></pre>'+
        (pt.sample?'<div class="io"><div><div class="tr-l">Sample input</div><pre class="tr-out">'+esc(pt.sample[0]||'(none)')+'</pre></div><div><div class="tr-l">Output</div><pre class="tr-out">'+esc(pt.sample[1])+'</pre></div></div>':'')+
        '<div class="tbl"><table class="scheme"><thead><tr><th>Marks</th><th>Awarded for</th></tr></thead><tbody>'+pt.scheme.map(s=>'<tr><td>'+esc(s[0])+'</td><td>'+esc(s[1])+'</td></tr>').join('')+'</tbody></table></div></details>'+
        '<div class="row selfmark" role="group" aria-label="Marks for '+(qi+1)+'('+'abc'[pi]+')"><span class="small">My marks:</span>'+Array.from({length:pt.m+1},(_,v)=>'<button type="button" class="mk" data-p="'+p.id+'" data-k="'+key+'" data-v="'+v+'">'+v+'</button>').join('')+'<span class="small">of '+pt.m+'</span></div></div>';}).join('')+'</article>').join('')+'</section>').join('');
  function sync(){
    PPS.EXAM.forEach(p=>{const mine=state.written[p.id]||{};let got=0,out=0,n=0;
      p.questions.forEach((q,qi)=>q.parts.forEach((pt,pi)=>{const k='Q'+(qi+1)+'abc'[pi];if(mine[k]!=null){got+=mine[k];out+=pt.m;n++;}}));
      $$('[data-paper-total="'+p.id+'"]').forEach(s=>s.textContent=n?'Self-marked '+n+' of 15 parts: '+got+' of '+out+' marks'+(n===15?' ('+Math.round(got/50*100)+'%)':''):'Not marked yet');});
    $$('.mk[data-p]').forEach(b=>{const mine=state.written[b.dataset.p]||{};b.setAttribute('aria-pressed',String(mine[b.dataset.k])===b.dataset.v);});
  }
  $$('.mk[data-p]').forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.p,k=b.dataset.k,v=+b.dataset.v,mine=state.written[id]||(state.written[id]={});
    if(mine[k]===v)delete mine[k];else mine[k]=v;save();sync();}));
  $$('[data-pp]').forEach(b=>b.addEventListener('click',()=>printSection(b.dataset.pp,b.dataset.mode==='a')));
  $$('[data-timer]').forEach(b=>b.addEventListener('click',()=>{
    const bar=$('#examTimer');if(examTimer){clearInterval(examTimer);examTimer=null;bar.hidden=true;$$('[data-timer]').forEach(x=>x.textContent='Start a 3-hour timer');return;}
    const end=Date.now()+3*3600000;bar.hidden=false;$$('[data-timer]').forEach(x=>x.textContent='Stop the timer');
    const tick=()=>{const left=Math.max(0,Math.round((end-Date.now())/1000));$('#examTimerText').textContent=Math.floor(left/3600)+':'+String(Math.floor(left%3600/60)).padStart(2,'0')+':'+String(left%60).padStart(2,'0')+' left';
      $('#examTimerText').classList.toggle('warn',left<=900);if(left<=0){clearInterval(examTimer);examTimer=null;$('#examTimerText').textContent='Time is up. Pens down.';}};
    tick();examTimer=setInterval(tick,1000);}));
  sync();renderPlan();addRunLinks(host);
}
function renderPlan(){
  const el=$('#plan'),m=window.PPS_MANIFEST[COURSE];if(!el||!m)return;
  const today=new Date();today.setHours(0,0,0,0);
  const dayOf=iso=>Math.round((new Date(iso+'T00:00:00')-today)/86400000);
  const days=dayOf(m.exam.start);
  if(days<=0){el.innerHTML='<p>The end-semester exam window has started ('+esc(m.exam.label)+'). Use the cheat sheets and your Questions to revisit list for last-minute review.</p>';return;}
  const rows=coReadiness(),slots=[];
  const mock1=Math.max(1,Math.round(days*0.6)),mock2=Math.max(mock1+1,Math.round(days*0.85));
  const fixed={};fixed[mock1]='<b>Mock paper 1</b> under exam conditions (3 hours), then self-mark with the schemes.';
  fixed[mock2]='<b>Mock paper 2</b> under exam conditions, then fix every part that lost marks.';
  fixed[days-1]='<b>Light revision:</b> all five cheat sheets and your Questions to revisit list. Early night.';
  const soon=(m.assessments||[]).map(x=>({...x,d:dayOf(x.start),e:dayOf(x.end||x.start)})).filter(x=>x.e>0&&x.d<days);
  soon.forEach(x=>{if(x.d>1&&!fixed[x.d-1])fixed[x.d-1]='<b>'+esc(x.label)+' start tomorrow:</b> '+x.task;});
  const tasks=['re-read the traps and the cheat sheet, then redo the unit quiz','solve two lab problems on paper first, then check them','answer this outcome\u2019s questions from a mock paper on paper and self-mark','redo every question from this unit in your Questions to revisit list'];
  const turn={},weight=r=>r.co.marks*(1-r.score)+r.co.marks*0.25,given={};
  for(let d=1;d<days;d++){
    if(fixed[d]){slots.push([d,fixed[d]]);continue;}
    const next=soon.find(x=>d<=x.e);
    const w=r=>weight(r)*(next&&next.cos.includes(r.co.id)?3:1);
    const pick=rows.slice().sort((a,b)=>((given[a.co.id]||0)/w(a))-((given[b.co.id]||0)/w(b)))[0];
    given[pick.co.id]=(given[pick.co.id]||0)+1;const t=turn[pick.co.id]=(turn[pick.co.id]||0)+1;
    slots.push([d,'<b>'+esc(pick.co.id)+'</b> ('+esc(pick.co.short)+', <a href="'+pick.unit.href+'">Unit '+pick.unit.n+'</a>): '+tasks[(t-1)%tasks.length]+'.'+(next&&next.cos.includes(pick.co.id)?' <span class="small">Also prepares you for '+esc(next.label)+'.</span>':'')]);
  }
  const fmt=d=>{const x=new Date(today);x.setDate(x.getDate()+d);return x.toLocaleDateString(undefined,{weekday:'short',day:'numeric',month:'short'});};
  el.innerHTML='<p class="small">'+days+' days until the exam window opens on '+esc(m.exam.label)+'. Outcomes tested in the in-semester assessments still ahead get extra days until those assessments end. Days are shared out by marks and by how ready each outcome is, so the plan changes as you make progress. Each day is about 1 to 2 hours.</p><ol class="plan">'+slots.map(s=>'<li><span class="pday">'+fmt(s[0])+'</span><span>'+s[1]+'</span></li>').join('')+'</ol>';
}

/* ---------- lesson 5.6: buffer overflow lab ---------- */
function overflowLab(el){
  el.innerHTML='<div class="label">Overflow lab: char name[8] sits next to int isAdmin = 0</div>'+
    '<p class="small">A simplified picture of memory. Real compilers may arrange variables differently, but the danger is the same: C copies past the end of the array without checking.</p>'+
    '<div class="row ap-ctl"><label for="ovIn">Name typed by the user</label><input id="ovIn" type="text" value="Aryan" maxlength="20" style="width:220px">'+
    '<div class="tabs" role="group" aria-label="Copy method"><button type="button" aria-pressed="true" data-m="unsafe">strcpy(name, input)</button><button type="button" aria-pressed="false" data-m="safe">snprintf(name, sizeof name, "%s", input)</button></div></div>'+
    '<div class="ov-mem"></div><p class="stepnote" aria-live="polite"></p>';
  let mode='unsafe';const inp=$('#ovIn',el);
  function draw(){
    const s=inp.value,cells=[];
    const write=mode==='unsafe'?s+'\0':(s.length>7?s.slice(0,7):s)+'\0';
    for(let i=0;i<12;i++)cells.push(i<write.length?write[i]:(i<8?'':'0'));
    const spill=Math.max(0,write.length-8),admin=cells.slice(8,12).some(b=>b!=='0'&&b!==''&&b!=='\0');
    $('.ov-mem',el).innerHTML='<div class="cells">'+cells.map((c,i)=>'<div class="cell'+(i>=8?(i<write.length?' bad':' admin'):(i<write.length?' hot':''))+'"><div class="box">'+esc(c==='\0'?'\\0':c===''?' ':c)+'</div><div class="idx">'+(i<8?i:'+'+(i-8))+'</div></div>').join('')+'</div><p class="small">Cells 0 to 7 are name[0] to name[7]. The green cells after them are the 4 bytes of isAdmin.</p>';
    $('.stepnote',el).textContent=admin?'Overflow! '+spill+' byte(s) spilled past name into isAdmin, which is no longer 0. if (isAdmin) now grants admin access to anyone who types a long name.':
      spill?'The \\0 spilled one byte into isAdmin. Its value happens to stay 0, but memory that is not yours was overwritten. One more character changes isAdmin.':
      (mode==='safe'&&s.length>7?'snprintf stopped at 7 characters plus \\0, so the name was cut short but isAdmin is untouched. Safe.':'The name and its \\0 fit in 8 bytes. isAdmin is still 0. Try a name longer than 7 characters.');
  }
  inp.addEventListener('input',draw);
  $$('[data-m]',el).forEach(b=>b.addEventListener('click',()=>{mode=b.dataset.m;$$('[data-m]',el).forEach(x=>x.setAttribute('aria-pressed',x===b));draw();}));
  draw();
}
PPS.init.push(()=>$$('.ovlab').forEach(overflowLab));

/* ---------- official course outcomes, rendered from course.js (the single source) ---------- */
function coForUnit(n){const m=window.PPS_MANIFEST&&window.PPS_MANIFEST[COURSE];return m&&m.cos?m.cos[n-1]:null;}
function renderCourseOutcomes(){
  const m=window.PPS_MANIFEST&&window.PPS_MANIFEST[COURSE];if(!m||!m.cos)return;
  const unitN=+(document.body.dataset.unit||0);
  if(unitN&&!$('.cobox')){const co=coForUnit(unitN),u=m.units[unitN-1];
    if(co){const d=document.createElement('div');d.className='cobox';
      d.innerHTML='<div class="cobox-h"><span class="lvl medium">'+esc(co.id)+'</span><b>Course outcome for this unit</b></div><p>'+esc(co.text)+'</p><p class="small">'+co.hours+' contact hours, '+co.marks+' of the 100 marks, programme outcomes '+esc(co.pos)+', learning outcomes '+esc(co.los)+', Bloom\u2019s levels '+esc(co.bl)+'. '+esc((u.sub||'').replace(/^CO\d+,\s*/,'').replace(/^./,c=>c.toUpperCase()))+'.</p>';
      const host=$('section.unit > .intro h1');
      if(host)host.after(d);else{const mn=$('main');if(mn)mn.prepend(d);}}}
  const tbl=$('#coTable');
  if(tbl&&!tbl.dataset.done){tbl.dataset.done='1';
    const tm=m.cos.reduce((a,c)=>a+c.marks,0),th=m.cos.reduce((a,c)=>a+c.hours,0);
    tbl.innerHTML='<div class="tbl"><table><thead><tr><th>CO</th><th>By the end you will be able to</th><th>Hours</th><th>Marks</th><th>POs</th><th>Learning outcomes</th><th>Unit</th></tr></thead><tbody>'+
      m.cos.map((c,i)=>'<tr><td>'+esc(c.id)+'</td><td>'+esc(c.text)+'</td><td>'+c.hours+'</td><td>'+c.marks+'</td><td>'+esc(c.pos)+'</td><td>'+esc(c.los)+'</td><td><a href="'+m.units[i].href+'">Unit '+m.units[i].n+'</a></td></tr>').join('')+
      '<tr><td></td><td><b>Total</b></td><td><b>'+th+'</b></td><td><b>'+tm+'</b></td><td></td><td></td><td></td></tr></tbody></table></div>';}
}

/* ---------- run a complete program in Compiler Explorer (opens in a new tab only when clicked) ---------- */
function ceURL(src,stdin){
  const state={sessions:[{id:1,language:'c',source:src,compilers:[],executors:[{arguments:'',compiler:{id:'cg132',libs:[],options:'-Wall -Wextra -std=c11'},stdin:stdin||'',stdinVisible:true,compilerOutputVisible:true,argumentsVisible:false,compilerVisible:false,wrap:true}]}]};
  const json=JSON.stringify(state),bytes=new TextEncoder().encode(json);let bin='';bytes.forEach(b=>{bin+=String.fromCharCode(b);});
  return 'https://godbolt.org/clientstate/'+encodeURIComponent(btoa(bin));
}
function addRunLinks(root){
  $$('pre.c',root||document).forEach(pre=>{
    if(pre.dataset.run)return;const src=pre.textContent;
    if(!/#include/.test(src)||!/\bint\s+main\s*\(/.test(src))return;
    pre.dataset.run='1';
    const a=document.createElement('a');a.className='runlink';a.href=ceURL(src,pre.dataset.stdin||'');a.target='_blank';a.rel='noopener';
    a.textContent='Run this program';a.title='Opens Compiler Explorer (godbolt.org) in a new tab with this code';
    pre.after(a);
  });
}

/* ---------- daily review: 5 questions a day, spaced by how well each was known ---------- */
const GAPS=[1,2,4,8,16,32];
const dayStr=d=>{const x=new Date(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0');};
const addDays=(n)=>{const d=new Date();d.setDate(d.getDate()+n);return dayStr(d);};
function reviewItem(qid){const [set,i]=qid.split('.');if(set.endsWith('quiz'))return (PPS.UQ[set.replace('quiz','')]||[]).at(+i);return (PPS.Q[set]||[]).at(+i);}
function reviewState(){if(!state.review||typeof state.review!=='object')state.review={};if(!state.streak||typeof state.streak!=='object')state.streak={last:'',n:0,best:0};return state.review;}
function streakNow(){const s=state.streak||{};return (s.last===dayStr(Date.now())||s.last===addDays(-1))?s.n:0;}
function reviewDue(){
  const R=reviewState(),today=dayStr(Date.now()),out=[],seen=new Set();
  const push=q=>{if(!seen.has(q)&&reviewItem(q)){seen.add(q);out.push(q);}};
  Object.keys(R).filter(q=>R[q].d<=today).sort((a,b)=>R[a].b-R[b].b).forEach(push);
  Object.keys(state.answers).filter(q=>!R[q]&&state.answers[q].ok===false).forEach(push);
  Object.keys(state.answers).filter(q=>!R[q]&&state.answers[q].ok&&Date.now()-state.answers[q].t>3*864e5).sort((a,b)=>state.answers[a].t-state.answers[b].t).forEach(push);
  return out;
}
function reviewFill(have,n){
  const pool=[],seen=new Set(have),m=window.PPS_MANIFEST[COURSE];
  const doneLessons=m?m.units.flatMap(u=>u.lessons.map(l=>l[0])).filter(id=>state.done[id]):[];
  const sets=doneLessons.length?doneLessons:['u1l1','u1l2'];
  sets.forEach(s=>(PPS.Q[s]||[]).forEach((_,i)=>{const q=s+'.'+i;if(!seen.has(q)&&!state.answers[q])pool.push(q);}));
  return shuffleArr(pool).slice(0,n);
}
function dailyReview(el){
  reviewState();
  const today=dayStr(Date.now());let list=[],qi=0,right=0,extra=false;
  function pick(){const due=reviewDue();list=due.slice(0,5);if(list.length<5)list=list.concat(reviewFill(list,5-list.length));qi=0;right=0;}
  function header(){const s=streakNow(),due=reviewDue().length;
    return '<div class="dr-head"><div><h2>Daily review</h2><p class="small">5 questions, about 5 minutes. Missed questions come back sooner; known ones come back later.</p></div><div class="dr-stats"><span><b>'+s+'</b>-day streak</span><span><b>'+due+'</b> due</span></div></div>';}
  function finishDay(){const st=state.streak;if(st.last!==today){st.n=(st.last===addDays(-1))?st.n+1:1;st.last=today;st.best=Math.max(st.best||0,st.n);}save();}
  function show(){
    el.innerHTML=header();
    const doneToday=state.streak.last===today;
    if(!list.length||qi>=list.length){
      if(list.length&&qi>=list.length&&!extra)finishDay();
      const p=document.createElement('div');p.className='dr-done';
      p.innerHTML=(list.length?'<p><b>'+right+' of '+list.length+' right.</b> </p>':'')+'<p class="small"></p><div class="row"><button class="btn ghost" type="button">Do 5 more</button><a class="btn ghost" href="progress.html">See my progress</a></div>';
      $('p.small',p).textContent=(doneToday||(list.length&&qi>=list.length))?'Today\u2019s review is done. Your streak is '+streakNow()+' day'+(streakNow()===1?'':'s')+'. Come back tomorrow for the next set.':'Nothing to review yet. Answer some quick checks in the lessons first.';
      $('button',p).addEventListener('click',()=>{extra=true;pick();show();});
      el.innerHTML=header();el.appendChild(p);return;
    }
    const prog=document.createElement('div');prog.className='uq-head';prog.innerHTML='<span>Question '+(qi+1)+' of '+list.length+'</span><span>'+(extra?'Extra practice':'Today')+'</span>';el.appendChild(prog);
    const qid=list.at(qi),it=reviewItem(qid);
    const fs=makeQ(it,el,{qid,shuffle:true,onAnswer:ok=>{
      const R=reviewState(),r=R[qid]||{b:0};r.b=ok?Math.min((R[qid]?r.b+1:1),GAPS.length-1):0;r.d=addDays(ok?GAPS.at(r.b):1);R[qid]=r;if(ok)right++;save();
      const nx=document.createElement('button');nx.className='btn';nx.type='button';nx.style.marginTop='10px';nx.textContent=qi===list.length-1?'Finish':'Next question';
      nx.addEventListener('click',()=>{qi++;show();});fs.appendChild(nx);nx.focus();}});
    const src=document.createElement('p');src.className='small';const set=qid.split('.')[0];
    const unit=set.charAt(1);src.innerHTML='From <a href="unit'+unit+'.html'+(set.endsWith('quiz')?'#u'+unit+'quiz':'#'+set)+'">'+(set.endsWith('quiz')?'the Unit '+unit+' quiz':'lesson '+set.slice(1).replace('l','.'))+'</a>';fs.appendChild(src);
  }
  if(state.streak.last===today){list=[];}else pick();
  show();
}
PPS.init.push(()=>addRunLinks());

/* ---------- lesson 4.3: pointer playground ---------- */
function ptrPlay(el){
  const mem={a:5,b:9},addr={a:1000,b:1004,p:2000};let p=null;
  const cmds=[['p = &a;','pa'],['p = &b;','pb'],['*p = *p + 1;','inc'],['*p = 0;','zero'],['p = NULL;','null']];
  el.innerHTML='<div class="label">Pointer playground: run a statement and watch memory change</div>'+
    '<div class="row pp-btns">'+cmds.map(c=>'<button type="button" class="btn ghost" data-k="'+c[1]+'"><code>'+esc(c[0])+'</code></button>').join('')+'<button type="button" class="btn ghost" data-k="reset">Reset</button></div>'+
    '<div class="pp-mem"></div><pre class="tr-out pp-out"></pre><p class="stepnote" aria-live="polite"></p>';
  function draw(note,bad){
    const box=n=>'<div class="pp-var'+(p===n?' tgt':'')+'"><div class="pp-name">'+n+'</div><div class="box">'+mem[n]+'</div><div class="idx">address '+addr[n]+'</div></div>';
    $('.pp-mem',el).innerHTML=box('a')+box('b')+'<div class="pp-var ptr"><div class="pp-name">p</div><div class="box">'+(p?addr[p]+' \u2192 '+p:'NULL')+'</div><div class="idx">address '+addr.p+'</div></div>';
    $('.pp-out',el).textContent='a = '+mem.a+'    b = '+mem.b+'    *p = '+(p?mem[p]:'(none: p is NULL)');
    const n=$('.stepnote',el);n.textContent=note;n.classList.toggle('bad',!!bad);
  }
  $$('button',el).forEach(b=>b.addEventListener('click',()=>{const k=b.dataset.k;
    if(k==='reset'){mem.a=5;mem.b=9;p=null;draw('Back to the start: a = 5, b = 9, p = NULL.');return;}
    if(k==='pa'){p='a';draw('p now holds 1000, the address of a, so *p means a.');return;}
    if(k==='pb'){p='b';draw('p now holds 1004. The same expression *p now means b.');return;}
    if(k==='null'){p=null;draw('p = NULL: it points nowhere. Check p != NULL before using *p.');return;}
    if(!p){draw('Crash! *p with p = NULL follows a null pointer: the program stops with a segmentation fault. Give p an address first.',true);return;}
    if(k==='inc'){mem[p]++;draw('*p = *p + 1 adds 1 to '+p+' through the pointer: '+p+' is now '+mem[p]+'.');}
    else{mem[p]=0;draw('*p = 0 writes 0 into '+p+'. The other variable is untouched.');}
  }));
  draw('Start: a = 5 at address 1000, b = 9 at 1004, p = NULL. Click a statement to run it.');
}

/* ---------- lesson 5.4: where is a[i][j]? ---------- */
function addr2d(el){
  const R=3,C=4,base=2000,sz=4;let i=1,j=2;
  el.innerHTML='<div class="label">int a[3][4] = {1, 2, ..., 12} at address 2000, with 4-byte ints</div>'+
    '<div class="row ap-ctl"><label>Row i <select class="a2i">'+[0,1,2].map(v=>'<option'+(v===i?' selected':'')+'>'+v+'</option>').join('')+'</select></label>'+
    '<label>Column j <select class="a2j">'+[0,1,2,3].map(v=>'<option'+(v===j?' selected':'')+'>'+v+'</option>').join('')+'</select></label></div>'+
    '<div class="a2-grid" aria-hidden="true"></div><div class="tr-l">The same 12 ints in memory, row after row</div><div class="cells a2-mem" aria-hidden="true"></div><div class="tbl"><table class="a2-eq"><tbody></tbody></table></div>';
  function draw(){
    const off=i*C+j,val=off+1;let g='';
    for(let r=0;r<R;r++){g+='<div class="a2-row'+(r===i?' on':'')+'"><span class="a2-rl">a['+r+']</span>';for(let c=0;c<C;c++)g+='<span class="a2-cell'+(r===i&&c===j?' hot':'')+'">'+(r*C+c+1)+'</span>';g+='</div>';}
    $('.a2-grid',el).innerHTML=g;
    let m='';for(let k=0;k<R*C;k++){const rr=Math.floor(k/C);m+='<div class="cell'+(k===off?' hot':rr===i?' row':'')+'"><div class="box">'+(k+1)+'</div><div class="idx">'+(base+k*sz)+'</div></div>';}
    $('.a2-mem',el).innerHTML=m;
    const rows=[['a['+i+']['+j+']','the element',val],['*(*(a + '+i+') + '+j+')','pointer form: row, then column, then read',val],['*(a['+i+'] + '+j+')','row '+i+' as a 1-D array, then column '+j,val],
      ['a + '+i,'address where row '+i+' starts (each row is '+C*sz+' bytes)',base+i*C*sz],['&a['+i+']['+j+']','address of the element',base+off*sz],['offset','('+i+' \u00d7 '+C+' + '+j+') elements \u00d7 '+sz+' bytes',off*sz+' bytes']];
    $('.a2-eq tbody',el).innerHTML=rows.map(r=>'<tr><td><code>'+esc(r[0])+'</code></td><td>'+esc(r[1])+'</td><td><b>'+esc(r[2])+'</b></td></tr>').join('');
  }
  $('.a2i',el).addEventListener('change',e=>{i=+e.target.value;draw();});
  $('.a2j',el).addEventListener('change',e=>{j=+e.target.value;draw();});
  draw();
}
PPS.init.push(()=>{$$('.ptrplay').forEach(ptrPlay);$$('.addr2d').forEach(addr2d);});

/* ---------- predict-the-output sprint ---------- */
function sprintDrill(el){
  const D=(PPS.DRILL||{}).sprint||[];if(!D.length)return;
  let filter='all',timer=null,end=0,order=[],k=0,right=0,wrong=0,running=false;
  const S=()=>{if(!state.sprint||typeof state.sprint!=='object')state.sprint={best:{},runs:[]};return state.sprint;};
  const label=f=>f==='all'?'All units':'Unit '+f;
  function intro(msg){
    const b=S().best[filter];
    el.innerHTML='<div class="tabs sp-filter" role="group" aria-label="Units">'+['all','2','3','4','5'].map(f=>'<button type="button" aria-pressed="'+(f===filter)+'" data-f="'+f+'">'+label(f)+'</button>').join('')+'</div>'+
      (msg||'')+'<p class="small">Read the code, pick what it prints. 90 seconds, as many as you can. A wrong answer shows why before you continue. Personal best for '+label(filter).toLowerCase()+': <b>'+(b!=null?b:'none yet')+'</b></p><button class="btn" type="button" data-go>Start the 90-second sprint</button>';
    $$('[data-f]',el).forEach(x=>x.addEventListener('click',()=>{filter=x.dataset.f;intro();}));
    $('[data-go]',el).addEventListener('click',start);
  }
  function start(){order=shuffleArr(D.map((_,i)=>i).filter(i=>filter==='all'||String(D.at(i).u)===filter));k=0;right=0;wrong=0;running=true;end=Date.now()+90000;
    clearInterval(timer);timer=setInterval(tick,250);next();}
  function tick(){const left=Math.max(0,Math.ceil((end-Date.now())/1000)),t=$('.sp-time',el);if(t){t.textContent=left+' s';t.classList.toggle('warn',left<=10);}if(left<=0)finish();}
  function next(){
    if(!running)return;if(k>=order.length){order=shuffleArr(order);k=0;}
    const it=D.at(order.at(k++)),opts=shuffleArr([it.a].concat(it.o));
    el.innerHTML='<div class="sp-bar"><span class="sp-time">90 s</span><span>Right <b>'+right+'</b></span><span>Wrong <b>'+wrong+'</b></span><span class="small">Unit '+it.u+'</span></div><pre class="c"><code>'+hl(it.code)+'</code></pre><p class="sp-q">What does it print?</p><div class="sp-opts">'+opts.map(o=>'<button type="button" class="sp-opt"></button>').join('')+'</div><div class="sp-fb" aria-live="polite"></div>';
    $$('.sp-opt',el).forEach((b,n)=>{b.textContent=opts.at(n);b.addEventListener('click',()=>{
      if(!running||b.disabled)return;$$('.sp-opt',el).forEach(x=>x.disabled=true);
      if(opts.at(n)===it.a){right++;b.classList.add('right');setTimeout(next,250);}
      else{wrong++;b.classList.add('wrong');$$('.sp-opt',el).forEach(x=>{if(x.textContent===it.a)x.classList.add('right');});
        const fb=$('.sp-fb',el);fb.innerHTML='<p></p><button type="button" class="btn">Continue</button>';$('p',fb).textContent='Answer: '+it.a+'. '+it.w;$('button',fb).addEventListener('click',next);$('button',fb).focus();}
    });});
    tick();
  }
  function finish(){
    if(!running)return;running=false;clearInterval(timer);
    const s=S(),prev=s.best[filter],acc=right+wrong?Math.round(right/(right+wrong)*100):0,isBest=prev==null||right>prev;
    if(isBest)s.best[filter]=right;s.runs=(s.runs||[]).concat({f:filter,r:right,w:wrong,t:Date.now()}).slice(-30);save();
    intro('<div class="panel sp-result"><div class="score">'+right+'</div><p>'+right+' right, '+wrong+' wrong, '+acc+'% accuracy'+(isBest&&right>0?'. A new personal best.':'.')+'</p></div>');
  }
  intro();
}

/* ---------- bug hunt: five levels, find the faulty line ---------- */
function bugHunt(el){
  const L=(PPS.DRILL||{}).bugs||[];if(!L.length)return;
  if(!state.bugs||typeof state.bugs!=='object')state.bugs={};
  const lvDone=lv=>L.every((b,i)=>b.lv!==lv||(state.bugs['b'+i]||{}).done);
  const open=lv=>lv===1||lvDone(lv-1);
  let cur=1;while(cur<5&&lvDone(cur))cur++;
  function render(){
    const found=L.filter((_,i)=>(state.bugs['b'+i]||{}).done).length,first=L.filter((_,i)=>(state.bugs['b'+i]||{}).first).length;
    el.innerHTML='<p class="small bh-sum">Found '+found+' of '+L.length+' bugs, '+first+' on the first try. Finish a level to unlock the next.</p><div class="tabs bh-levels" role="group" aria-label="Levels">'+
      [1,2,3,4,5].map(lv=>'<button type="button" data-lv="'+lv+'" aria-pressed="'+(lv===cur)+'"'+(open(lv)?'':' disabled')+'>Level '+lv+(lvDone(lv)?', done':open(lv)?'':', locked')+'</button>').join('')+'</div>'+
      '<p class="small bh-what"></p><div class="bh-list"></div>';
    const what=['','Level 1: code that does not compile','Level 2: compiles, but the logic is wrong','Level 3: loops and arrays','Level 4: strings, input and functions','Level 5: pointers, strings and recursion'];
    $('.bh-what',el).textContent=what.at(cur);
    $$('[data-lv]',el).forEach(b=>b.addEventListener('click',()=>{cur=+b.dataset.lv;render();}));
    const host=$('.bh-list',el);
    L.forEach((b,i)=>{if(b.lv!==cur)return;const id='b'+i,st=state.bugs[id]||{};
      const card=document.createElement('article');card.className='prob bh-card';
      card.innerHTML='<div class="prob-h"><span class="lvl '+(st.done?'easy':'medium')+'">'+(st.done?'Found':'Find the bug')+'</span><h3></h3></div><p class="small">Click the line that is wrong.</p><div class="bh-code" role="group" aria-label="Program lines"></div><div class="bh-fb" aria-live="polite"></div>';
      $('h3',card).textContent=b.title;
      const code=$('.bh-code',card);
      b.lines.forEach((ln,k)=>{const btn=document.createElement('button');btn.type='button';btn.className='bh-line';btn.innerHTML='<span class="ln-no">'+(k+1)+'</span><code>'+hl(ln||' ')+'</code>';btn.addEventListener('click',()=>pick(k));code.appendChild(btn);});
      function solved(){
        $$('.bh-line',code).forEach((x,k)=>{x.disabled=true;x.classList.toggle('bad',k===b.bug);});
        const fixed=b.lines.slice(0,b.bug).concat([b.fix],b.lines.slice(b.bug+1)).join('\n');
        const fb=$('.bh-fb',card);fb.innerHTML='<p class="ok"><b>Line '+(b.bug+1)+'.</b> </p><div class="bh-diff"><div class="del"></div><div class="add"></div></div>';
        $('p',fb).append(b.why);$('.del',fb).textContent='\u2212 '+b.lines.at(b.bug).trim();$('.add',fb).textContent='+ '+b.fix.trim();
        const a=document.createElement('a');a.className='runlink';a.href=ceURL(fixed,b.stdin||'');a.target='_blank';a.rel='noopener';a.textContent='Run the fixed program';fb.appendChild(a);
      }
      function pick(k){
        const s=state.bugs[id]||(state.bugs[id]={tries:0});if(s.done)return;s.tries++;
        if(k===b.bug){s.done=true;s.first=s.tries===1;save();solved();setTimeout(()=>{if(lvDone(cur)&&cur<5){cur++;render();}},1600);}
        else{save();const fb=$('.bh-fb',card);fb.innerHTML='<p class="no"></p>';$('p',fb).textContent='Not line '+(k+1)+'. Hint: '+b.hint;}
      }
      if(st.done)solved();
      host.appendChild(card);
    });
  }
  render();
}

/* ---------- mixed practice across all units, weighted by exam marks ---------- */
function mixedDraw(){
  const m=window.PPS_MANIFEST[COURSE],cos=m.cos,tot=cos.reduce((a,c)=>a+c.marks,0);
  const raw=cos.map(c=>c.marks/tot*10),n=raw.map(Math.floor);let left=10-n.reduce((a,b)=>a+b,0);
  raw.map((r,i)=>[r-Math.floor(r),i]).sort((a,b)=>b[0]-a[0]).forEach(([_,i])=>{if(left>0){n.splice(i,1,n.at(i)+1);left--;}});
  let out=[];
  m.units.forEach((u,ix)=>{const {quiz,checks}=unitQuizPool(u.quiz);out=out.concat(shuffleArr(quiz.concat(checks)).slice(0,n.at(ix)));});
  return shuffleArr(out);
}
function mixedQuiz(el){
  let Q=mixedDraw(),qi=0,score=0;
  function show(){
    el.innerHTML='';
    if(qi>=Q.length){
      if(state.best.mixed==null||score>state.best.mixed)state.best.mixed=score;
      state.quizzes.mixed=(state.quizzes.mixed||[]).concat({s:score,n:Q.length,t:Date.now()}).slice(-20);save();
      const d=document.createElement('div');d.className='panel';
      d.innerHTML='<div class="score">'+score+'/'+Q.length+'</div><p class="small"></p><div class="row"><button class="btn" type="button">Try a fresh mix</button></div>';
      $('p',d).textContent='Best '+state.best.mixed+'/10. Each set has about as many questions from each unit as the exam gives it marks: Unit 2 and Unit 3 the most.';
      $('button',d).addEventListener('click',()=>{Q=mixedDraw();qi=0;score=0;show();});el.appendChild(d);return;
    }
    const it=Q.at(qi),head=document.createElement('div');head.className='uq-head';head.innerHTML='<span>Question '+(qi+1)+' of '+Q.length+'</span><span>Score '+score+'</span>';el.appendChild(head);
    const fs=makeQ(it.it,el,{qid:it.qid,shuffle:true,onAnswer:ok=>{if(ok)score++;head.lastChild.textContent='Score '+score;
      const nx=document.createElement('button');nx.className='btn';nx.type='button';nx.style.marginTop='10px';nx.textContent=qi===Q.length-1?'See my score':'Next question';
      nx.addEventListener('click',()=>{qi++;show();});fs.appendChild(nx);nx.focus();}});
  }
  show();
}

/* ---------- mastery map: Started, Practised, Exam-ready, Mastered per course outcome ---------- */
function passDays(u){return new Set((state.quizzes[u]||[]).filter(a=>a.s>=8).map(a=>dayStr(a.t))).size;}
function masteryLevels(){
  const m=window.PPS_MANIFEST[COURSE];if(!m||!m.cos)return [];
  return m.cos.map((co,ix)=>{
    const u=m.units.at(ix),pre='u'+u.n+'l';
    const ids=Object.keys(PPS.Q).filter(k=>k.startsWith(pre)).flatMap(k=>PPS.Q[k].map((_,i)=>k+'.'+i));
    const ans=ids.filter(q=>state.answers[q]),first=ans.filter(q=>state.answers[q].first).length;
    const anyLesson=u.lessons.some(l=>state.done[l[0]]),anyAns=Object.keys(state.answers).some(q=>q.startsWith('u'+u.n));
    const practised=ids.length&&ans.length>=0.8*ids.length&&first>=0.6*ans.length;
    const days=passDays(u.quiz),ready=practised&&days>=2;
    let mg=0,mt=0;PPS.EXAM.forEach(p=>{const mine=(state.written||{})[p.id]||{};p.questions.forEach((q,qi)=>{if(q.co!==co.id)return;q.parts.forEach((pt,pi)=>{const k='Q'+(qi+1)+'abc'[pi];if(mine[k]!=null){mg+=mine[k];mt+=pt.m;}});});});
    const mastered=ready&&mt>=4&&mg>=0.7*mt;
    const level=mastered?4:ready?3:practised?2:(anyLesson||anyAns)?1:0;
    const next=level===0?'Open Unit '+u.n+' and start the first lesson.':level===1?'Answer at least 80% of Unit '+u.n+'\u2019s quick checks, 60% right first time ('+ans.length+' of '+ids.length+' answered).':
      level===2?'Score 8 or more on the Unit '+u.n+' quiz on two different days ('+days+' so far).':level===3?'Self-mark this outcome\u2019s mock-paper parts and reach 70%.':'Keep it fresh with the daily review.';
    return {co,u,level,next};
  });
}
function masteryHTML(compact){
  const rows=masteryLevels();if(!rows.length)return '';
  const names=['Started','Practised','Exam-ready','Mastered'];
  return '<div class="mastery'+(compact?' compact':'')+'">'+(compact?'':'<h2>Mastery map</h2><p class="small">Each course outcome moves through four stages, on evidence only: Started, Practised (80% of quick checks answered, 60% right first time), Exam-ready (8 or more on the unit quiz on two different days) and Mastered (70% on the outcome\u2019s mock-paper parts).</p>')+
    rows.map(r=>'<div class="ms-row"><a class="ms-co" href="'+r.u.href+'"><b>'+esc(r.co.id)+'</b> <span class="small">'+esc(r.co.short)+'</span></a><div class="ms-steps" role="img" aria-label="'+esc(r.co.id)+': '+(r.level?names.at(r.level-1):'not started')+'">'+
      names.map((n,i)=>'<span class="ms-step'+(i<r.level?' on':'')+'">'+n+'</span>').join('')+'</div>'+(compact?'':'<p class="small ms-next">Next: '+esc(r.next)+'</p>')+'</div>').join('')+'</div>';
}

/* ---------- search ---------- */
function initSearchPage(){
  const box=$('#q'),out=$('#results'),idx=PPS.SEARCH||[];if(!box||!out)return;
  const norm=s=>s.toLowerCase();
  function run(){
    const q=box.value.trim(),toks=norm(q).split(/\s+/).filter(t=>t.length>1||/[&*%]/.test(t));
    history.replaceState(null,'',q?'?q='+encodeURIComponent(q):location.pathname);
    if(!toks.length){out.innerHTML='<p class="small">Type a word such as strcmp, recursion, fopen, binary search or pointer.</p>';return;}
    const hits=[];
    idx.forEach(e=>{const t=norm(e.t),x=norm(e.x);let score=0;
      for(const k of toks){const inT=t.includes(k);let c=0,pos=x.indexOf(k);while(pos>=0&&c<20){c++;pos=x.indexOf(k,pos+k.length);}if(!inT&&!c)return;score+=(inT?10:0)+c;}
      hits.push([score,e]);});
    hits.sort((a,b)=>b[0]-a[0]);
    if(!hits.length){out.innerHTML='<p>No matches. Try a shorter word or a C keyword.</p>';return;}
    out.innerHTML='<p class="small">'+hits.length+' match'+(hits.length===1?'':'es')+'</p>'+hits.slice(0,30).map(([_,e])=>{
      const x=e.x,lx=norm(x),p=Math.max(0,lx.indexOf(toks.at(0))),a=Math.max(0,p-70),snip=(a?'\u2026':'')+x.slice(a,p+130)+(p+130<x.length?'\u2026':'');
      let h=esc(snip);toks.forEach(k=>{const re=new RegExp('('+esc(k).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+')','gi');h=h.replace(re,'<mark>$1</mark>');});
      return '<a class="sr-hit" href="'+e.h+'"><span class="sr-g">'+esc(e.g)+'</span><b>'+esc(e.t)+'</b><span class="sr-x">'+h+'</span></a>';}).join('');
  }
  let tmr=null;box.addEventListener('input',()=>{clearTimeout(tmr);tmr=setTimeout(run,120);});
  const q=new URLSearchParams(location.search).get('q');if(q)box.value=q;run();box.focus();
}
