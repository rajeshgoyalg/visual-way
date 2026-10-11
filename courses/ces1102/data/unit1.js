/* Unit 1 content: questions and the custom widgets of lessons 1.1 to 1.5. */
(function(){
const QC={
 l1:[
  {q:'Which part of the CPU checks whether A is greater than B?',o:['Control unit','ALU','Registers','Main memory'],a:1,w:'The arithmetic logic unit does arithmetic and logical comparisons. The control unit only directs the order of work.'},
  {q:'You are typing an essay and the power goes off before saving. Where was the unsaved text?',o:['Secondary storage','ROM','RAM','The ALU'],a:2,w:'Unsaved work lives in RAM, which is volatile, so it is lost. Saving copies it to secondary storage.'},
  {q:'What does the stored-program concept say?',o:['Programs are stored on paper','Instructions and data are kept in the same memory','Only data is stored in memory','The CPU stores all files'],a:1,w:'Both the instructions and the data they work on live in main memory, so a new program can be loaded without rewiring.'}],
 l2:[
  {q:'Which translator converts assembly language into machine code?',o:['Compiler','Interpreter','Assembler','Linker'],a:2,w:'An assembler maps each mnemonic, such as ADD, to a machine instruction.'},
  {q:'Why can a machine-language program written for one processor fail on another?',o:['It is too slow','It is machine-dependent','It has no comments','It needs an interpreter'],a:1,w:'Machine code is the instruction set of one processor family. Different processors understand different binary instructions.'},
  {q:'Which statement about C is correct?',o:['C is interpreted line by line','C is compiled into an executable','C needs an assembler written by the programmer','C runs only on UNIX'],a:1,w:'A C compiler such as gcc translates the whole program into machine code before it runs.'}],
 l3:[
  {q:'An algorithm keeps repeating "add 1 to X" with no condition to stop. Which property does it break?',o:['Definiteness','Finiteness','Effectiveness','Input'],a:1,w:'An algorithm must finish after a finite number of steps.'},
  {q:'What is the minimum number of outputs an algorithm must produce?',o:['Zero','One','Two','As many as inputs'],a:1,w:'Inputs can be zero, but an algorithm must produce at least one output, otherwise it achieved nothing.'}],
 l4:[
  {q:'Which symbol should "Print SUM" use?',o:['Rectangle','Diamond','Parallelogram','Oval'],a:2,w:'Printing is output, and input or output uses a parallelogram.'},
  {q:'What makes RAPTOR useful for beginners?',o:['It writes C code for you','It runs your flowchart and shows variable values','It replaces the compiler','It only draws diagrams'],a:1,w:'RAPTOR executes the flowchart step by step, so you can test the logic before coding.'}],
 l5:[
  {q:'Which file does the linker produce?',o:['hello.c','hello.i','hello.o','The executable, such as hello or a.out'],a:3,w:'The linker joins your object code with library code and outputs the executable.'},
  {q:'A program compiles and runs, but the average of 4 and 6 prints as 7. What kind of error is this?',o:['Syntax error','Logical error','Linker error','No error'],a:1,w:'It runs but gives a wrong result, so the logic is wrong. Likely avg = a + b / 2 instead of (a + b) / 2.'},
  {q:'What does #include <stdio.h> do?',o:['Starts the program','Brings in declarations for input and output functions like printf','Ends the program','Declares main'],a:1,w:'It is a preprocessor directive that pastes in the standard input/output header before compiling.'}]
};
const UQ=[
 {q:'A calculator app reads two numbers, adds them and shows the result. Which step is the Process in the IPO model?',o:['Reading the two numbers','Adding them','Showing the result','Installing the app'],a:1,w:'Input is reading the numbers, Process is the addition done by the CPU, and Output is showing the result.'},
 {q:'A program\u2019s data must still be there after a power cut. Where should the program write it?',o:['RAM','A CPU register','Secondary storage such as an SSD','The ALU'],a:2,w:'RAM and registers are volatile and lose everything at power-off. Secondary storage keeps data permanently.'},
 {q:'A student writes MOV AX, 5 and ADD AX, 3. Which language is this, and which translator turns it into machine code?',o:['High-level, compiler','Assembly, assembler','Machine language, none needed','Assembly, interpreter'],a:1,w:'MOV and ADD are assembly mnemonics. An assembler converts each one into a machine instruction.'},
 {q:'Which is NOT a required property of an algorithm?',o:['Finiteness','Definiteness','It must be written in C','At least one output'],a:2,w:'An algorithm is language-independent. It can be written in English, pseudocode or as a flowchart.'},
 {q:'Which flowchart symbol has exactly two exits labelled Yes and No?',o:['Oval','Rectangle','Diamond','Parallelogram'],a:2,w:'The diamond is the decision symbol.'},
 {q:'Predict the output of printf("A\\nB");',o:['A\\nB on one line','A and B on separate lines','AB','A B'],a:1,w:'\\n is a newline character, so B is printed on the next line.'},
 {q:'int x = 10 int y = 20; produces which kind of error?',o:['Logical','Syntax','Runtime','None'],a:1,w:'A semicolon is missing after 10. That breaks C grammar, so the compiler reports a syntax error.'},
 {q:'For a = 4 and b = 6, what does avg = a + b / 2; store, using integers?',o:['5','7','10','3'],a:1,w:'Division happens before addition: b / 2 = 3, then 4 + 3 = 7. The correct code is (a + b) / 2.'},
 {q:'Arrange the build stages: which comes immediately after compiling to assembly?',o:['Linking','Preprocessing','Assembling into object code','Loading'],a:2,w:'Preprocess, compile, assemble (object file), link (executable), then load and run.'},
 {q:'A flowchart reads N, computes R = N % 2 and prints "Even" when R == 0. For N = 15, what prints?',o:['Even','Odd','15','Nothing'],a:1,w:'15 % 2 is 1, so R == 0 is false and the No branch prints "Odd".'}
];

Object.keys(QC).forEach(k=>PPS.Q["u1"+k]=QC[k]);PPS.UQ.u1=UQ;
})();
PPS.init.push(function(){
/* ---------- computer organization stepper ---------- */
const ORG=[
 {k:['in'],t:'You type 2 and 3 on the keyboard. The input unit turns each key press into binary.'},
 {k:['mem'],t:'The numbers and the program\u2019s instructions are both placed in main memory. That is the stored-program concept.'},
 {k:['cu'],t:'The control unit fetches the next instruction, "add", from memory and works out what must happen.'},
 {k:['reg','alu'],t:'2 and 3 are copied into registers. The ALU adds them: 2 + 3 = 5.'},
 {k:['mem'],t:'The result, 5, is written back into main memory.'},
 {k:['out','sto'],t:'The output unit shows 5 on screen. If you save it, it is copied to storage and survives power-off.'}];
let os=0;const dots=$('#orgDots');dots.innerHTML=ORG.map(()=>'<span></span>').join('');
function org(){ $$('#orgWidget g[data-k]').forEach(g=>g.classList.toggle('hot',ORG[os].k.includes(g.dataset.k)));
  $('#orgNote').textContent='Step '+(os+1)+' of '+ORG.length+'. '+ORG[os].t;
  $$('span',dots).forEach((d,i)=>d.classList.toggle('on',i===os));
  $('#orgPrev').disabled=os===0;$('#orgNext').textContent=os===ORG.length-1?'Start again':'Next step';}
$('#orgPrev').addEventListener('click',()=>{if(os>0){os--;org();}});
$('#orgNext').addEventListener('click',()=>{os=(os+1)%ORG.length;org();});org();

/* ---------- language ladder ---------- */
const LANG={
 hl:{c:'sum = a + b;',n:'One readable line. A compiler turns it into the instructions below. It works on any machine that has a C compiler.'},
 as:{c:'MOV  EAX, [a]     ; copy a into register EAX\nADD  EAX, [b]     ; add b to it\nMOV  [sum], EAX   ; store the result in sum',n:'Three mnemonics, one per machine instruction. Notice the registers: this is the CPU from lesson 1.1. (x86-style, simplified for illustration.)'},
 mc:{c:'10001011 01000101 11111000\n00000011 01000101 11111100\n10001001 01000101 11110100',n:'The same three instructions in binary. This is what the CPU actually runs, and why nobody writes it by hand any more. (Illustrative bytes.)'}};
function lang(k){$('#langCode').textContent=LANG[k].c;$('#langNote').textContent=LANG[k].n;$$('[data-lang]').forEach(b=>b.setAttribute('aria-pressed',b.dataset.lang===k));}
$$('[data-lang]').forEach(b=>b.addEventListener('click',()=>lang(b.dataset.lang)));lang('hl');

/* ---------- ordering ---------- */
const ORDER=['Start','Read A and B','TEMP ← A','A ← B','B ← TEMP','Print A and B','Stop'];
let cur=[];
function shuffle(){cur=ORDER.slice();do{for(let i=cur.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[cur[i],cur[j]]=[cur[j],cur[i]];}}while(cur.every((s,i)=>s===ORDER[i]));drawOrder();$('#orderFb').textContent='';}
function drawOrder(focusIdx,dir){const ol=$('#orderList');ol.innerHTML='';
  cur.forEach((s,i)=>{const li=document.createElement('li');
    li.innerHTML='<span class="t"></span><button type="button" aria-label="Move up">↑</button><button type="button" aria-label="Move down">↓</button>';
    $('.t',li).textContent=s;const [up,dn]=$$('button',li);up.disabled=i===0;dn.disabled=i===cur.length-1;
    up.addEventListener('click',()=>{[cur[i-1],cur[i]]=[cur[i],cur[i-1]];drawOrder(i-1,0);});
    dn.addEventListener('click',()=>{[cur[i+1],cur[i]]=[cur[i],cur[i+1]];drawOrder(i+1,1);});
    ol.appendChild(li);});
  if(focusIdx!==undefined){const b=$$('button',ol.children[focusIdx])[dir];if(b&&!b.disabled)b.focus();else $$('button',ol.children[focusIdx]).find(x=>!x.disabled).focus();}}
$('#orderCheck').addEventListener('click',()=>{let right=0;$$('#orderList li').forEach((li,i)=>{const ok=cur[i]===ORDER[i];if(ok)right++;li.classList.toggle('ok',ok);li.classList.toggle('no',!ok);});
  const fb=$('#orderFb');if(right===ORDER.length){fb.className='fb ok';fb.textContent='Perfect. Without TEMP, writing A ← B first would destroy the original A forever.';}
  else{fb.className='fb no';fb.textContent=right+' of 7 steps are in the right place. Hint: TEMP must save A before A is overwritten.';}});
$('#orderReset').addEventListener('click',shuffle);shuffle();

/* ---------- flowchart builder ---------- */
const SH={term:'Oval: terminal',io:'Parallelogram: I/O',proc:'Rectangle: process',dec:'Diamond: decision'};
const FC=[
 {id:'start',txt:'Start',want:'term',x:180,y:30,w:110,h:36},
 {id:'in',txt:'Read N',want:'io',x:180,y:95,w:140,h:40},
 {id:'proc',txt:'R = N % 2',want:'proc',x:180,y:160,w:140,h:40},
 {id:'dec',txt:'R == 0 ?',want:'dec',x:180,y:245,w:150,h:70},
 {id:'even',txt:'Print "Even"',want:'io',x:90,y:345,w:128,h:40},
 {id:'odd',txt:'Print "Odd"',want:'io',x:270,y:345,w:128,h:40},
 {id:'stop',txt:'Stop',want:'term',x:180,y:428,w:90,h:36}];
const choice={};
const steps=$('#fcSteps');
FC.forEach(n=>{const lab=document.createElement('label');lab.dataset.id=n.id;
  lab.innerHTML='<span></span><select><option value="">Choose a shape</option>'+Object.keys(SH).map(k=>'<option value="'+k+'">'+SH[k]+'</option>').join('')+'</select>';
  $('span',lab).textContent=n.txt;$('select',lab).addEventListener('change',e=>{choice[n.id]=e.target.value;drawFC();});steps.appendChild(lab);});
function shapeSVG(type,n,cls){const {x,y,w,h}=n,l=x-w/2,t=y-h/2;
  if(!type)return '<rect class="fc-node empty" x="'+l+'" y="'+t+'" width="'+w+'" height="'+h+'" rx="6"/>';
  if(type==='term')return '<rect class="'+cls+'" x="'+l+'" y="'+t+'" width="'+w+'" height="'+h+'" rx="'+h/2+'"/>';
  if(type==='proc')return '<rect class="'+cls+'" x="'+l+'" y="'+t+'" width="'+w+'" height="'+h+'" rx="2"/>';
  if(type==='io')return '<polygon class="'+cls+'" points="'+(l+14)+','+t+' '+(l+w)+','+t+' '+(l+w-14)+','+(t+h)+' '+l+','+(t+h)+'"/>';
  return '<polygon class="'+cls+'" points="'+x+','+t+' '+(l+w)+','+y+' '+x+','+(t+h)+' '+l+','+y+'"/>';}
function esc(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}
let lit=[];
function drawFC(){
  let s='<defs><marker id="fa" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M2 1L8 5L2 9" fill="none" stroke="currentColor" stroke-width="1.6"/></marker></defs><g style="color:var(--soft)">';
  const E=['M180 48 V73','M180 115 V138','M180 180 V208','M105 245 H90 V323','M255 245 H270 V323','M90 365 V428 H133','M270 365 V428 H227'];
  E.forEach(d=>s+='<path class="sv-line" d="'+d+'" marker-end="url(#fa)"/>');
  s+='</g><text class="sv-s" x="96" y="236" text-anchor="end">Yes</text><text class="sv-s" x="264" y="236">No</text>';
  let right=0;
  FC.forEach(n=>{const c=choice[n.id]||'';const ok=c===n.want;if(ok)right++;
    let cls='fc-node'+(c&&!ok?' wrongshape':'')+(lit.includes(n.id)?' lit':'');
    s+=shapeSVG(c,n,cls)+'<text class="fc-txt" x="'+n.x+'" y="'+(n.y+4)+'" text-anchor="middle">'+esc(n.txt)+'</text>';
    const lab=steps.querySelector('[data-id="'+n.id+'"]');lab.classList.toggle('ok',ok);lab.classList.toggle('no',!!c&&!ok);});
  $('#fcSvg').innerHTML=s;
  const st=$('#fcStatus'),all=right===FC.length;
  st.className='fb '+(all?'ok':'');st.textContent=all?'All 7 shapes are correct. The flowchart is ready to run.':right+' of 7 shapes correct. Red outlines mark a wrong shape.';
  $('#fcN').disabled=!all;$('#fcRun').disabled=!all;
}
drawFC();
let running=false;
$('#fcN').addEventListener('input',()=>{$('#fcErr').textContent='';});
$('#fcRun').addEventListener('click',()=>{
  if(running)return;const raw=$('#fcN').value.trim();
  if(raw===''||!/^-?\d+$/.test(raw)){$('#fcErr').textContent='Enter a whole number first.';return;}
  const N=parseInt(raw,10),R=N%2,even=R===0;
  const path=[['start','Start.'],['in','Read N. N = '+N+'.'],['proc','R = N % 2 = '+N+' % 2 = '+R+'. The % operator gives the remainder.'],
    ['dec','Is R == 0? '+(even?'Yes':'No')+', so take the '+(even?'Yes':'No')+' branch.'],[even?'even':'odd','Output: '+(even?'Even':'Odd')+'.'],['stop','Stop. The flowchart has finished.']];
  running=true;let i=0;const delay=reduce?0:900;
  (function step(){lit=[path[i][0]];drawFC();$('#fcTrace').textContent=path[i][1];i++;
    if(i<path.length)setTimeout(step,delay);else{setTimeout(()=>{running=false;},delay);}})();
});

/* ---------- build pipeline ---------- */
const PIPE=[
 {s:'Edit',f:'hello.c',n:'You write source code in an editor such as Code::Blocks, VS Code or vim, and save it with a .c extension.',c:'#include <stdio.h>\nint main(void)\n{\n    printf("Hello, World!\\n");\n    return 0;\n}'},
 {s:'Preprocess',f:'hello.i',n:'The preprocessor handles lines starting with #. It pastes in the contents of stdio.h and strips comments. Your 6 lines become hundreds.',c:'/* ...hundreds of lines from stdio.h... */\nint printf(const char *format, ...);\n/* ... */\nint main(void)\n{\n    printf("Hello, World!\\n");\n    return 0;\n}'},
 {s:'Compile',f:'hello.s',n:'The compiler checks the grammar (syntax errors are reported here) and translates C into assembly for your processor.',c:'main:\n    push  rbp\n    lea   rdi, .LC0      ; address of "Hello, World!"\n    call  puts\n    mov   eax, 0\n    pop   rbp\n    ret'},
 {s:'Assemble',f:'hello.o (object code)',n:'The assembler turns assembly into machine code. The result is object code: real binary, but the address of printf is still unknown.',c:'01010101 01001000 10001001 11100101\n01001000 10001101 00111101 ????????\n11101000 ????????   <- call printf: address not filled in yet'},
 {s:'Link',f:'hello, a.out or hello.exe (executable)',n:'The linker joins your object code with the C library code for printf and fills in the missing addresses. Out comes a complete executable.',c:'hello.o  +  C standard library (printf)\n            |\n            v\n        hello  (ready to run)'},
 {s:'Load and run',f:'./hello',n:'The operating system\u2019s loader copies the executable into RAM and the CPU starts at main(). Tip: gcc -save-temps hello.c keeps every intermediate file so you can look inside.',c:'$ ./hello\nHello, World!'}];
let ps=0;const pipe=$('#pipe');
PIPE.forEach((p,i)=>{const b=document.createElement('button');b.type='button';b.textContent=(i+1)+'. '+p.s;b.addEventListener('click',()=>{ps=i;drawPipe();});pipe.appendChild(b);});
function drawPipe(){$$('button',pipe).forEach((b,i)=>{if(i===ps)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
  $('#pipeFile').textContent='File: '+PIPE[ps].f;$('#pipeNote').textContent=PIPE[ps].n;$('#pipeCode').textContent=PIPE[ps].c;
  $('#pipePrev').disabled=ps===0;$('#pipeNext').textContent=ps===PIPE.length-1?'Back to the start':'Next stage';}
$('#pipePrev').addEventListener('click',()=>{if(ps>0){ps--;drawPipe();}});
$('#pipeNext').addEventListener('click',()=>{ps=(ps+1)%PIPE.length;drawPipe();});drawPipe();

/* ---------- error sorter ---------- */
const SORT=[
 {c:'printf("Hello")',a:'syntax',w:'Missing semicolon at the end of the statement. The compiler stops here.'},
 {c:'celsius = (f - 32) * 9 / 5;',a:'logical',w:'It compiles, but the formula is upside down. Celsius is (f - 32) * 5 / 9.'},
 {c:'Int count = 0;',a:'syntax',w:'C is case-sensitive. The keyword is int, so Int is an unknown word.'},
 {c:'area = 3.14 * r + r;   /* area of a circle */',a:'logical',w:'Valid C, wrong maths. Area is 3.14 * r * r.'},
 {c:'int main(void) { printf("Hi"); return 0;',a:'syntax',w:'The closing brace is missing, so the compiler reaches the end of the file unexpectedly.'}];
const so=$('#sorter');
SORT.forEach(it=>{const li=document.createElement('li');li.innerHTML='<code></code><div class="row"><button type="button" class="btn ghost">Syntax error</button><button type="button" class="btn ghost">Logical error</button></div><div class="sfb" aria-live="polite"></div>';
  $('code',li).textContent=it.c;const [b1,b2]=$$('button',li),fb=$('.sfb',li);
  [[b1,'syntax'],[b2,'logical']].forEach(([b,v])=>b.addEventListener('click',()=>{const ok=v===it.a;fb.className='sfb fb '+(ok?'ok':'no');fb.textContent=(ok?'Correct. ':'Not this time. ')+it.w;}));
  so.appendChild(li);});


});
