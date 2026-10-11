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
const emptyCourse=()=>({done:{},best:{},answers:{},quizzes:{}});
let ldata={courses:{}},state=emptyCourse();
function courseState(id){const c=ldata.courses[id]||(ldata.courses[id]=emptyCourse());['done','best','answers','quizzes'].forEach(k=>{if(!c[k]||typeof c[k]!=='object')c[k]={};});return c;}
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
let uid=0;
function makeQ(item,host,opt){
  opt=opt||{};const id='q'+(uid++);
  const fs=document.createElement('fieldset');fs.className='q';
  fs.innerHTML='<legend></legend>'+item.o.map((t,i)=>'<label class="opt"><input type="radio" name="'+id+'" value="'+i+'"><span></span></label>').join('')+
   '<div class="row" style="margin-top:8px"><button type="button" class="btn qcheck">Check answer</button>'+(opt.retry?'<button type="button" class="btn ghost qretry" hidden>Try again</button>':'')+'<span class="err" aria-live="polite"></span></div><div class="fb" aria-live="polite"></div>';
  $('legend',fs).textContent=item.q;
  $$('.opt span',fs).forEach((s,i)=>s.textContent=item.o[i]);
  const btn=$('.qcheck',fs),retry=$('.qretry',fs),err=$('.err',fs),fb=$('.fb',fs);
  function show(v,ok,prev){
    $$('.opt',fs).forEach((l,i)=>{l.classList.toggle('right',i===item.a);l.classList.toggle('wrong',i===v&&!ok);});
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
function unitQuiz(el,u){
  const Q=PPS.UQ[u]||[];let qi=0,score=0;
  function show(){
    el.innerHTML='';
    if(qi>=Q.length){
      if(state.best[u]==null||score>state.best[u])state.best[u]=score;
      state.quizzes[u]=(state.quizzes[u]||[]).concat({s:score,n:Q.length,t:Date.now()}).slice(-20);save();refresh();
      const tries=state.quizzes[u].length;
      const d=document.createElement('div');d.className='panel';
      const msg=score>=9?'Excellent. You are ready for the next unit.':score>=6?'Good foundation. Revisit the lessons behind the questions you missed.':'Worth another pass. Re-read the traps boxes, then retry.';
      d.innerHTML='<div class="score">'+score+'/'+Q.length+'</div><p style="margin-top:10px"></p><p class="small"></p><div class="row"><button class="btn" type="button">Retry the quiz</button><a class="btn ghost" href="progress.html">See my progress</a></div>';
      const ps=$$('p',d);ps[0].textContent=msg;ps[1].textContent='Best score '+state.best[u]+'/'+Q.length+'. Attempts so far: '+tries+'.';
      $('button',d).addEventListener('click',()=>{qi=0;score=0;show();});el.appendChild(d);return;
    }
    const head=document.createElement('div');head.className='uq-head';head.innerHTML='<span>Question '+(qi+1)+' of '+Q.length+'</span><span>Score '+score+'</span>';el.appendChild(head);
    const fs=makeQ(Q[qi],el,{qid:u+'quiz.'+qi,onAnswer:ok=>{if(ok)score++;head.lastChild.textContent='Score '+score;
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
  const cy=H/2;let s='<svg viewBox="0 0 680 '+H+'" role="img" aria-label="Mind map of the lessons in '+esc(c1+' '+c2)+'">';
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
  let h='<div class="stats">'+
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
    let item,href,where;const un=set.match(/^u(\d)/);if(!un)return;const unit=m.units.find(u=>String(u.n)===un[1]);if(!unit)return;
    if(set.endsWith('quiz')){item=(PPS.UQ[set.replace('quiz','')]||[])[+i];href=unit.href+'#'+set;where='Unit '+unit.n+' quiz';}
    else{item=(PPS.Q[set]||[])[+i];href=unit.href+'#'+set;const l=unit.lessons.find(x=>x[0]===set);where=l?l[1]:'Unit '+unit.n;}
    if(item)rev.push({a,item,href,where});});
  rev.sort((x,y)=>(x.a.ok===y.a.ok?0:x.a.ok?1:-1)||y.a.w-x.a.w||y.a.t-x.a.t);
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
  try{if(p==='unit')initUnitPage();else if(p==='course')initCoursePage();else if(p==='home')initHomePage();else if(p==='progress')initProgressPage();}catch(e){console.error(e);}
  registerSW();
  if(!learners.current)openLearner(true);
}
