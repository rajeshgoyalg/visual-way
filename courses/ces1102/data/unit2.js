/* Unit 2 content: quick checks (PPS.Q), quiz (PPS.UQ), tracers (PPS.TR) and other widget data. */
(function(){
const Q=PPS.Q;
Q.u2l1=[
 {q:'Which of these is a valid variable name in C?',o:['2total','float','total_marks','total-marks'],a:2,w:'Letters, digits and underscore are allowed, the name cannot start with a digit, and it cannot be a keyword. A hyphen is the minus operator.'},
 {q:'Which format specifier reads a double with scanf?',o:['%d','%f','%lf','%c'],a:2,w:'scanf needs %lf for double. %f is for float.'},
 {q:'What is the difference between \'A\' and "A"?',o:['None','\'A\' is a char; "A" is a string of two bytes ending in \\0','"A" is a char; \'A\' is a string','\'A\' is invalid'],a:1,w:'Single quotes make one character. Double quotes make a string, which always ends with the null character \\0.'}];
Q.u2l2=[
 {q:'What is the value of 17 % 5?',o:['3','2','3.4','5'],a:1,w:'17 = 3 × 5 + 2, so the remainder is 2.'},
 {q:'int a = 5; int b = a++; What are a and b?',o:['a = 6, b = 6','a = 5, b = 6','a = 6, b = 5','a = 5, b = 5'],a:2,w:'Postfix gives b the old value 5, then increments a to 6.'},
 {q:'What is 12 & 10 (bitwise and)?',o:['22','8','14','2'],a:1,w:'1100 & 1010 = 1000, which is 8. Only bits set in both survive.'}];
Q.u2l3=[
 {q:'int sum = 7, n = 2; What is (float)sum / n?',o:['3','3.0','3.5','4'],a:2,w:'The cast makes sum 7.0 first, so float division gives 3.5.'},
 {q:'int x = 9.99; What does x hold?',o:['10','9','9.99','Compile error'],a:1,w:'Converting to int truncates the fraction. It does not round.'},
 {q:'What does max = (a > b) ? a : b; do?',o:['Assigns the larger of a and b to max','Always assigns a','Compares and prints','It is invalid C'],a:0,w:'The conditional operator picks a if the test is true, otherwise b.'}];
Q.u2l4=[
 {q:'What is 2 + 3 * 4 - 6 / 2?',o:['17','11','7','13'],a:1,w:'3 * 4 = 12 and 6 / 2 = 3 first, then 2 + 12 - 3 = 11.'},
 {q:'What is 20 / 4 * 2?',o:['2.5','10','40','5'],a:1,w:'/ and * share a rank and associate left to right: (20 / 4) * 2 = 10.'},
 {q:'Which group of operators associates right to left?',o:['* / %','+ -','Assignment operators such as =','== !='],a:2,w:'a = b = 5 assigns 5 to b first, then to a, which is right-to-left.'}];
Q.u2l5=[
 {q:'In an else-if ladder, how many branches can run for one input?',o:['All the true ones','At most one','Exactly two','Zero always'],a:1,w:'The ladder stops at the first true condition. If none is true, only the else (if present) runs.'},
 {q:'A switch case has no break. What happens?',o:['Compile error','Execution falls through into the next case','The program stops','The default runs'],a:1,w:'Without break, control continues into the following case statements.'},
 {q:'Which cannot be a switch case label?',o:['case 3:','case \'y\':','case 2.5:','case 10:'],a:2,w:'Case labels must be integer or character constants. Floats are not allowed.'}];
Q.u2l6=[
 {q:'Which loop always runs its body at least once?',o:['for','while','do-while','None'],a:2,w:'do-while checks the condition after the body, so the body runs before the first test.'},
 {q:'How many times does for (i = 0; i < 5; i++) run its body?',o:['4','5','6','Forever'],a:1,w:'i takes 0, 1, 2, 3, 4: five values.'},
 {q:'What does int n = 1234, s = 0; while (n > 0) { s += n % 10; n /= 10; } leave in s?',o:['1234','4321','10','4'],a:2,w:'It adds the digits 4 + 3 + 2 + 1 = 10.'}];
Q.u2l7=[
 {q:'What does continue do inside a for loop?',o:['Ends the loop','Skips to the next iteration, running the update','Restarts from i = 0','Exits the program'],a:1,w:'continue skips the rest of the body. In a for loop the update still runs before the next test.'},
 {q:'for (i = 1; i <= 5; i++) { if (i == 3) break; printf("%d ", i); } prints:',o:['1 2','1 2 3','1 2 4 5','1 2 3 4 5'],a:0,w:'At i = 3 the loop is left before printing, so only 1 and 2 appear.'}];
PPS.UQ.u2=[
 {q:'Which data type would you choose to store a CGPA such as 8.73?',o:['int','char','float','void'],a:2,w:'A decimal needs a floating type. float (or double) keeps the fraction.'},
 {q:'What is the value of 10 / 4?',o:['2.5','2','3','2.0'],a:1,w:'Both operands are integers, so the fraction is discarded.'},
 {q:'int a = 3; int b = ++a * 2; What are a and b?',o:['a = 4, b = 8','a = 3, b = 6','a = 4, b = 6','a = 3, b = 8'],a:0,w:'Prefix increments a to 4 first, then 4 * 2 = 8.'},
 {q:'What does 5 > 3 && 2 > 4 || !0 evaluate to?',o:['0','1','2','Error'],a:1,w:'!0 is 1; 5 > 3 is 1; 2 > 4 is 0; 1 && 0 is 0; 0 || 1 is 1.'},
 {q:'What is 6 << 1?',o:['3','12','7','61'],a:1,w:'Shifting left by one bit doubles the value: 110 becomes 1100, which is 12.'},
 {q:'Which loop is exit-controlled?',o:['for','while','do-while','switch'],a:2,w:'do-while tests its condition at the exit, after the body has run.'},
 {q:'int x = 0; if (x = 5) printf("Yes"); else printf("No"); What prints?',o:['Yes','No','Nothing','Compile error'],a:0,w:'x = 5 assigns 5, and 5 is non-zero, so the condition is true. This is the = versus == trap.'},
 {q:'for (i = 0; i < 10; i += 3) printf("%d ", i); prints:',o:['0 3 6 9','0 3 6','3 6 9','0 3 6 9 12'],a:0,w:'i goes 0, 3, 6, 9, then 12 fails the test.'},
 {q:'A switch on a char menu choice has case \'a\' with no break, followed by case \'b\'. The user types a. What runs?',o:['Only case a','Case a then case b','Only default','Nothing'],a:1,w:'Without break, execution falls through into case b.'},
 {q:'A loop should add positive numbers until the user types 0, skipping negatives. Which pair fits?',o:['break for 0, continue for negatives','continue for 0, break for negatives','break for both','continue for both'],a:0,w:'0 ends the loop (break); a negative is skipped but the loop carries on (continue).'}];

/* ---- tracers ---- */
PPS.TR.u2inc={title:'Prefix vs postfix, step by step',code:['int a = 5;','int b = a++;   // use, then increment','int c = ++a;   // increment, then use','printf("%d %d %d", a, b, c);'],
 steps:[
  {l:0,f:[{n:'main()',v:[['a',5]]}],h:['a'],n:'a starts at 5.'},
  {l:1,f:[{n:'main()',v:[['a',6],['b',5]]}],h:['a','b'],n:'Postfix: b receives the old value 5, and only then does a become 6.'},
  {l:2,f:[{n:'main()',v:[['a',7],['b',5],['c',7]]}],h:['a','c'],n:'Prefix: a becomes 7 first, then c receives the new value 7.'},
  {l:3,f:[{n:'main()',v:[['a',7],['b',5],['c',7]]}],o:'7 5 7',n:'Output: 7 5 7.'}]};

PPS.TR.u2if={title:'Else-if ladder: type marks and watch which branch runs',
 code:['if (marks >= 90)','    grade = \'A\';','else if (marks >= 75)','    grade = \'B\';','else if (marks >= 60)','    grade = \'C\';','else if (marks >= 40)','    grade = \'D\';','else','    grade = \'F\';','printf("Grade %c", grade);'],
 input:{label:'marks =',def:'68',check:v=>/^\d{1,3}$/.test(v)&&+v<=100?'':'Enter a whole number from 0 to 100.'},
 gen:v=>{const m=+v,S=[],cuts=[[90,'A'],[75,'B'],[60,'C'],[40,'D']];const mv=g=>[{n:'main()',v:[['marks',m],['grade',g]]}];
  for(let i=0;i<cuts.length;i++){const ok=m>=cuts[i][0];S.push({l:i*2,f:mv('?'),n:'Is '+m+' >= '+cuts[i][0]+'? '+(ok?'Yes.':'No, try the next condition.')});
   if(ok){S.push({l:i*2+1,f:mv("'"+cuts[i][1]+"'"),h:['grade'],n:'grade becomes '+cuts[i][1]+'. Every remaining condition is skipped.'});S.push({l:10,f:mv("'"+cuts[i][1]+"'"),o:'Grade '+cuts[i][1],n:'Output: Grade '+cuts[i][1]+'.'});return S;}}
  S.push({l:8,f:mv('?'),n:'No condition was true, so the else branch runs.'});S.push({l:9,f:mv("'F'"),h:['grade'],n:'grade becomes F.'});S.push({l:10,f:mv("'F'"),o:'Grade F',n:'Output: Grade F.'});return S;}};

PPS.TR.u2digits={title:'Loop tracer: sum of digits with a while loop',
 code:['int n, sum = 0, d;','scanf("%d", &n);','while (n > 0) {','    d = n % 10;     // last digit','    sum = sum + d;','    n = n / 10;     // drop last digit','}','printf("Sum = %d", sum);'],
 input:{label:'n =',def:'1234',check:v=>/^\d{1,6}$/.test(v)?'':'Enter a whole number from 0 to 999999.'},
 gen:v=>{let n=+v,sum=0,d='?';const S=[],mv=()=>[{n:'main()',v:[['n',n],['sum',sum],['d',d]]}];let it=0;
  S.push({l:0,f:[{n:'main()',v:[['n','?'],['sum',0],['d','?']]}],n:'Declare n, sum and d. sum starts at 0.'});
  S.push({l:1,f:mv(),h:['n'],n:'n is read as '+n+'.'});
  while(true){const ok=n>0;S.push({l:2,f:mv(),n:'Test: is n > 0? '+n+' > 0 is '+(ok?'true, so run the body.':'false, so leave the loop.')});if(!ok)break;it++;
   d=n%10;S.push({l:3,f:mv(),h:['d'],n:'Iteration '+it+': d = '+n+' % 10 = '+d+'.'});
   sum+=d;S.push({l:4,f:mv(),h:['sum'],n:'sum = '+(sum-d)+' + '+d+' = '+sum+'.'});
   const old=n;n=Math.floor(n/10);S.push({l:5,f:mv(),h:['n'],n:'n = '+old+' / 10 = '+n+' (integer division drops the last digit).'});}
  S.push({l:7,f:mv(),o:'Sum = '+sum,n:'The loop ran '+it+' time'+(it===1?'':'s')+'. Output: Sum = '+sum+'.'});return S;}};

PPS.TR.u2brk={title:'break and continue in one loop',
 code:['for (int i = 1; i <= 10; i++) {','    if (i % 3 == 0)','        continue;   // skip multiples of 3','    if (i == 8)','        break;      // stop completely at 8','    printf("%d ", i);','}','printf("Done");'],
 steps:(function(){const S=[];let o='';const mv=i=>[{n:'main()',v:[['i',i]]}];
  for(let i=1;i<=10;i++){S.push({l:0,f:mv(i),h:['i'],o:o,n:'i = '+i+'. Is i <= 10? Yes.'});
   if(i%3===0){S.push({l:1,f:mv(i),o:o,n:i+' % 3 == 0 is true.'});S.push({l:2,f:mv(i),o:o,n:'continue: skip printing, jump to i++.'});continue;}
   S.push({l:1,f:mv(i),o:o,n:i+' % 3 == 0 is false.'});
   if(i===8){S.push({l:3,f:mv(i),o:o,n:'i == 8 is true.'});S.push({l:4,f:mv(i),o:o,n:'break: leave the loop immediately. 9 and 10 never happen.'});break;}
   S.push({l:3,f:mv(i),o:o,n:'i == 8 is false.'});o+=i+' ';S.push({l:5,f:mv(i),o:o,n:'Print '+i+'.'});}
  o+='Done';S.push({l:7,f:mv(8),o:o,n:'After the loop. Output: 1 2 4 5 7 Done.'});return S;})()};

/* ---- steppers ---- */
PPS.ST.u2prec={title:'Evaluate: a = 10 + 4 * 3 - 8 / 2 % 3',frames:[
 {c:'a = 10 + ⟦4 * 3⟧ - 8 / 2 % 3',n:'* / % outrank + -. Among them, go left to right. First: 4 * 3 = 12.'},
 {c:'a = 10 + 12 - ⟦8 / 2⟧ % 3',n:'Next in the same rank, left to right: 8 / 2 = 4.'},
 {c:'a = 10 + 12 - ⟦4 % 3⟧',n:'Then 4 % 3 = 1.'},
 {c:'a = ⟦10 + 12⟧ - 1',n:'Now + and -, left to right: 10 + 12 = 22.'},
 {c:'a = ⟦22 - 1⟧',n:'22 - 1 = 21.'},
 {c:'⟦a = 21⟧',n:'Assignment has the lowest rank, so it happens last. a is 21.'}]};
PPS.ST.u2prec2={title:'Evaluate a logical expression: 5 > 3 && 2 > 4 || !0',frames:[
 {c:'5 > 3 && 2 > 4 || ⟦!0⟧',n:'Unary ! has the highest rank here. !0 is 1.'},
 {c:'⟦5 > 3⟧ && 2 > 4 || 1',n:'Relational operators next: 5 > 3 is true, so 1.'},
 {c:'1 && ⟦2 > 4⟧ || 1',n:'2 > 4 is false, so 0.'},
 {c:'⟦1 && 0⟧ || 1',n:'&& outranks ||. 1 && 0 is 0.'},
 {c:'⟦0 || 1⟧',n:'0 || 1 is 1. The final value is 1, meaning true.'}]};

/* ---- tabs ---- */
PPS.TB.u2cast={title:'Same numbers, different answers: where the cast goes matters',tabs:[
 {label:'No cast',code:'int sum = 7, n = 2;\nfloat avg = sum / n;\nprintf("%.2f", avg);   // 3.00',note:'Both are ints, so 7 / 2 = 3 (integer division). Storing 3 in a float gives 3.00. The half is already lost.'},
 {label:'Cast the operand',code:'int sum = 7, n = 2;\nfloat avg = (float)sum / n;\nprintf("%.2f", avg);   // 3.50',note:'sum becomes 7.0 before dividing, n is promoted to 2.0, and the result is 3.5. This is the correct way.'},
 {label:'Cast the result',code:'int sum = 7, n = 2;\nfloat avg = (float)(sum / n);\nprintf("%.2f", avg);   // 3.00',note:'The brackets force integer division first (3), and only then convert 3 to 3.0. Too late.'}]};
PPS.TB.u2loops={title:'Print 1 to 5 three ways',tabs:[
 {label:'while',code:'int i = 1;            // initialise\nwhile (i <= 5) {      // test first\n    printf("%d ", i);\n    i++;              // update\n}',note:'Entry-controlled. If i started at 6, the body would never run.'},
 {label:'do-while',code:'int i = 1;\ndo {\n    printf("%d ", i);\n    i++;\n} while (i <= 5);     // test last; note the semicolon',note:'Exit-controlled. Even if i started at 6, it would print 6 once before testing.'},
 {label:'for',code:'for (int i = 1; i <= 5; i++) {\n    printf("%d ", i);\n}',note:'Initialise; test; update, all in one line. Best when the count is known.'}]};

PPS.OR.u2for={title:'Put the for loop\u2019s execution order right',intro:'For for (i = 1; i <= 3; i++), arrange what happens from the very start until the loop ends.',
 steps:['Initialise i = 1 (happens once)','Test i <= 3: true','Run the body','Update i++','Test again, and repeat body and update while true','Test becomes false: leave the loop'],
 ok:'Correct. Initialisation runs once; then it is always test, body, update.',hint:'Initialisation happens only once, and the update comes after the body.'};

/* ---- bit lab ---- */
PPS.init.push(function(){
  const el=$('#bitlab');let A=12,B=10,op='&';
  el.innerHTML='<div class="label">Bit lab: click the bits of a and b, pick an operator</div><div class="row" style="margin-bottom:10px"><label for="bitop" style="font:500 .95rem var(--head)">Operator</label><select id="bitop" class="sel"><option value="&">a &amp; b (and)</option><option value="|">a | b (or)</option><option value="^">a ^ b (xor)</option><option value="~">~a (not)</option><option value="<<">a &lt;&lt; 1 (shift left)</option><option value=">>">a &gt;&gt; 1 (shift right)</option></select></div><div class="bits"></div><p class="stepnote" aria-live="polite"></p>';
  const box=$('.bits',el);
  function row(lbl,v,ed){return '<div class="bitrow"><span class="bl">'+lbl+'</span>'+[7,6,5,4,3,2,1,0].map(i=>{const b=(v>>i)&1;return ed?'<button type="button" class="bit'+(b?' on':'')+'" data-w="'+ed+'" data-i="'+i+'" aria-label="'+ed+' bit '+i+', '+(b?'1':'0')+'">'+b+'</button>':'<span class="bit'+(b?' on':'')+'">'+b+'</span>';}).join('')+'<span class="bd">= '+v+'</span></div>';}
  function draw(){let r,txt;
    if(op==='&'){r=A&B;txt='A result bit is 1 only where both a and b have 1.';}
    else if(op==='|'){r=A|B;txt='A result bit is 1 where either a or b has 1.';}
    else if(op==='^'){r=A^B;txt='A result bit is 1 where a and b differ.';}
    else if(op==='~'){r=(~A)&255;txt='Every bit of a flips. Shown as 8 bits; for a normal int, ~a equals -(a + 1), so ~'+A+' is '+(-(A+1))+'.';}
    else if(op==='<<'){r=(A<<1)&255;txt='Every bit moves one place left, so the value doubles (within 8 bits).';}
    else {r=A>>1;txt='Every bit moves one place right, so the value halves, dropping any remainder.';}
    const uses=op==='&'||op==='|'||op==='^';
    box.innerHTML=row('a',A,'a')+(uses?row('b',B,'b'):'')+'<div class="bitrow res">'+row('result',r,null).replace('<div class="bitrow">','').replace(/<\/div>$/,'')+'</div>';
    $('.stepnote',el).textContent=txt;
    $$('button.bit',box).forEach(b=>b.addEventListener('click',()=>{const i=+b.dataset.i;if(b.dataset.w==='a')A^=(1<<i);else B^=(1<<i);draw();const nb=box.querySelector('[data-w="'+b.dataset.w+'"][data-i="'+i+'"]');if(nb)nb.focus();}));}
  $('#bitop').addEventListener('change',e=>{op=e.target.value;draw();});draw();
});
})();
