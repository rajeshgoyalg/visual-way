/* Unit 4 content: quick checks (PPS.Q), quiz (PPS.UQ), tracers (PPS.TR) and other widget data. */
(function(){
const Q=PPS.Q;
Q.u4l1=[
 {q:'In s = add(a, b); what are a and b called?',o:['Formal parameters','Actual arguments','Prototypes','Return values'],a:1,w:'The values supplied in the call are the actual arguments.'},
 {q:'Which line is a correct prototype?',o:['int max(int a, int b)','int max(int, int);','max(int a, int b);','int max;'],a:1,w:'A prototype gives return type, name and parameter types, and ends with a semicolon. Parameter names are optional.'}];
Q.u4l2=[
 {q:'Which return type does a function that only prints a banner have?',o:['int','void','char','float'],a:1,w:'It returns nothing, so its type is void.'},
 {q:'A variable declared inside main is visible in which functions?',o:['All functions','Only main','Only functions called by main','Functions below main'],a:1,w:'Local variables are visible only inside the block that declares them.'},
 {q:'int x = 5; (global) and inside f: int x = 9; printf("%d", x); What prints inside f?',o:['5','9','14','Error'],a:1,w:'The local x hides the global x inside f.'}];
Q.u4l3=[
 {q:'int x = 7; int *p = &x; What is *p?',o:['The address of x','7','The address of p','0'],a:1,w:'*p goes to the address stored in p, which is x, and reads 7.'},
 {q:'int x = 4; int *p = &x; *p = *p + 1; What is x now?',o:['4','5','Unchanged address','Error'],a:1,w:'Writing through *p changes x itself.'}];
Q.u4l4=[
 {q:'void f(int n) { n = 100; } and in main: int a = 5; f(a); What is a after the call?',o:['100','5','0','Error'],a:1,w:'f received a copy. The original a is untouched.'},
 {q:'Which call lets a function change the caller\u2019s variable k?',o:['g(k)','g(*k)','g(&k)','g(k&)'],a:2,w:'Passing &k gives the function k\u2019s address, so it can write through a pointer.'}];
Q.u4l5=[
 {q:'What does C actually pass when you call total(marks, 4)?',o:['A copy of all elements','The address of marks[0]','Only marks[4]','The array size'],a:1,w:'An array argument decays to a pointer to its first element.'},
 {q:'Which parameter is valid for a 2-D array with 5 columns?',o:['int m[][]','int m[5][]','int m[][5]','int m'],a:2,w:'The first dimension may be left empty; the column count must be given.'}];
Q.u4l6=[
 {q:'What stops a recursive function from calling itself forever?',o:['The return type','The base case','The prototype','A global variable'],a:1,w:'The base case returns without making another call.'},
 {q:'fact(n) = n * fact(n − 1), with fact(1) = 1. How many calls does fact(4) make in total, including itself?',o:['3','4','5','24'],a:1,w:'fact(4), fact(3), fact(2), fact(1): four calls.'},
 {q:'int f(int n) { if (n == 0) return 0; return n + f(n - 1); } What is f(4)?',o:['4','10','24','0'],a:1,w:'4 + 3 + 2 + 1 + 0 = 10.'}];
PPS.UQ.u4=[
 {q:'Which is the main benefit of functions?',o:['Programs run faster','Code is reusable and easier to test and read','They remove the need for variables','They avoid compiling'],a:1,w:'Functions break a problem into named, reusable, testable pieces.'},
 {q:'What does a function prototype tell the compiler?',o:['The body of the function','Name, return type and parameter types','Where the function is stored','The output'],a:1,w:'The prototype is a declaration that lets calls be checked before the definition is seen.'},
 {q:'A function must give back both the largest and the smallest value of an array. Which design works?',o:['Two return statements, one after the other','return max, min;','Pass &max and &min and write through pointer parameters','It cannot be done in C'],a:2,w:'return sends back only one value, and code after the first return never runs. Pointer parameters let the function write both results into the caller\u2019s variables.'},
 {q:'int a = 10; int *p = &a; printf("%d", *p + 5); prints:',o:['10','15','An address','5'],a:1,w:'*p is 10, plus 5 is 15.'},
 {q:'Which correctly swaps two ints in the caller?',o:['void swap(int x, int y)','void swap(int *x, int *y) { int t = *x; *x = *y; *y = t; }','void swap(int *x, int *y) { int *t = x; x = y; y = t; }','void swap(int &x, int &y)'],a:1,w:'Only dereferenced writes change the caller\u2019s values. Swapping the pointer copies does nothing outside.'},
 {q:'A function receives int a[] and sets a[0] = 99. What happens to the caller\u2019s array?',o:['Nothing','Its first element becomes 99','Compile error','The whole array is copied'],a:1,w:'Arrays are passed as addresses, so the function modifies the original.'},
 {q:'Why must the size be passed with a 1-D array?',o:['C requires two parameters','The function cannot find the length from the pointer alone','It makes the program faster','It is optional style'],a:1,w:'Inside the function the array is just a pointer; the length is unknown.'},
 {q:'int fib(int n) { if (n <= 1) return n; return fib(n-1) + fib(n-2); } What is fib(5)?',o:['3','5','8','13'],a:1,w:'0, 1, 1, 2, 3, 5: fib(5) is 5.'},
 {q:'A recursive function has no base case. What happens when it runs?',o:['It returns 0','The calls pile up until a stack overflow crashes the program','The compiler rejects it','It runs once'],a:1,w:'Each call adds a frame to the stack; without a stopping point memory runs out.'},
 {q:'Which variable exists only while its function is running?',o:['A global variable','A local variable','A #define constant','A string literal'],a:1,w:'Locals are created when the function is called and destroyed when it returns.'}];

/* ---- tracers ---- */
PPS.TR.u4fn={title:'Tracer: a function call and its stack frame',
 code:['int add(int x, int y);      // prototype','int main(void) {','    int a = 3, b = 4, s;','    s = add(a, b);','    printf("%d", s);','    return 0;','}','int add(int x, int y) {','    int r = x + y;','    return r;','}'],
 steps:[
  {l:2,f:[{n:'main()',v:[['a',3],['b',4],['s','?']]}],n:'main starts. a and b are set; s has no value yet.'},
  {l:3,f:[{n:'main()',v:[['a',3],['b',4],['s','?']]}],n:'Call add(a, b). main pauses here and waits.'},
  {l:7,f:[{n:'main()',v:[['a',3],['b',4],['s','?']]},{n:'add()',v:[['x',3],['y',4]]}],h:['x','y'],n:'A new frame for add. The actual values 3 and 4 are copied into the formal parameters x and y.'},
  {l:8,f:[{n:'main()',v:[['a',3],['b',4],['s','?']]},{n:'add()',v:[['x',3],['y',4],['r',7]]}],h:['r'],n:'r = 3 + 4 = 7. r is local to add.'},
  {l:9,f:[{n:'main()',v:[['a',3],['b',4],['s','?']]},{n:'add()',v:[['x',3],['y',4],['r',7]]}],n:'return r sends 7 back. add\u2019s frame (x, y, r) is about to disappear.'},
  {l:3,f:[{n:'main()',v:[['a',3],['b',4],['s',7]]}],h:['s'],n:'Back in main exactly where it paused. The returned 7 is stored in s.'},
  {l:4,f:[{n:'main()',v:[['a',3],['b',4],['s',7]]}],o:'7',n:'Output: 7.'}]};

PPS.TR.u4ptr={title:'Tracer: & and * in action',
 code:['int x = 10;','int *p = &x;     // p stores the address of x','*p = 20;         // write through the pointer','printf("%d %d", x, *p);'],
 steps:[
  {l:0,f:[{n:'main()',v:[['x',10,'1000']]}],h:['x'],n:'x lives at address 1000 (addresses are made up for clarity) and holds 10.'},
  {l:1,f:[{n:'main()',v:[['x',10,'1000'],['p','1000 → x','2000']]}],h:['p'],n:'&x is 1000. p is a separate variable, at its own address 2000, and its value is 1000: it points to x.'},
  {l:2,f:[{n:'main()',v:[['x',20,'1000'],['p','1000 → x','2000']]}],h:['x'],n:'*p means "go to address 1000". Writing 20 there changes x. p itself is unchanged.'},
  {l:3,f:[{n:'main()',v:[['x',20,'1000'],['p','1000 → x','2000']]}],o:'20 20',n:'x and *p are the same box, so both print 20.'}]};

const swapCode=(ref)=>ref?['void swap(int *x, int *y) {','    int t = *x; *x = *y; *y = t;','}','int main(void) {','    int a = 1, b = 2;','    swap(&a, &b);','    printf("%d %d", a, b);','}']:['void swap(int x, int y) {','    int t = x; x = y; y = t;','}','int main(void) {','    int a = 1, b = 2;','    swap(a, b);','    printf("%d %d", a, b);','}'];
PPS.TR.u4swapv={title:'Call by value: swap gets copies',code:swapCode(false),steps:[
  {l:4,f:[{n:'main()',v:[['a',1],['b',2]]}],n:'main has a = 1 and b = 2.'},
  {l:5,f:[{n:'main()',v:[['a',1],['b',2]]}],n:'swap(a, b) passes the values 1 and 2.'},
  {l:0,f:[{n:'main()',v:[['a',1],['b',2]]},{n:'swap()',v:[['x',1],['y',2]]}],h:['x','y'],n:'swap\u2019s frame gets its own copies: x = 1, y = 2.'},
  {l:1,f:[{n:'main()',v:[['a',1],['b',2]]},{n:'swap()',v:[['x',2],['y',1],['t',1]]}],h:['x','y'],n:'x and y are swapped, but only the copies.'},
  {l:2,f:[{n:'main()',v:[['a',1],['b',2]]}],n:'swap returns and its frame vanishes, taking the swapped copies with it.'},
  {l:6,f:[{n:'main()',v:[['a',1],['b',2]]}],o:'1 2',n:'Output: 1 2. Nothing changed in main.'}]};
PPS.TR.u4swapr={title:'Call by reference: swap gets addresses',code:swapCode(true),steps:[
  {l:4,f:[{n:'main()',v:[['a',1,'1000'],['b',2,'1004']]}],n:'a is at 1000 and b at 1004.'},
  {l:5,f:[{n:'main()',v:[['a',1,'1000'],['b',2,'1004']]}],n:'swap(&a, &b) passes the addresses 1000 and 1004.'},
  {l:0,f:[{n:'main()',v:[['a',1,'1000'],['b',2,'1004']]},{n:'swap()',v:[['x','1000 → a'],['y','1004 → b']]}],h:['x','y'],n:'x and y are pointers into main\u2019s variables.'},
  {l:1,f:[{n:'main()',v:[['a',2,'1000'],['b',1,'1004']]},{n:'swap()',v:[['x','1000 → a'],['y','1004 → b'],['t',1]]}],h:['a','b'],n:'*x and *y are a and b themselves, so main\u2019s values are swapped.'},
  {l:2,f:[{n:'main()',v:[['a',2,'1000'],['b',1,'1004']]}],n:'swap returns. The change stays because it was made in main\u2019s memory.'},
  {l:6,f:[{n:'main()',v:[['a',2,'1000'],['b',1,'1004']]}],o:'2 1',n:'Output: 2 1. Swapped.'}]};

PPS.TR.u4arr={title:'Tracer: passing an array to a function',
 code:['int total(int m[], int n) {','    int s = 0;','    for (int i = 0; i < n; i++)','        s += m[i];','    return s;','}','int main(void) {','    int marks[4] = {70, 85, 60, 90};','    printf("%d", total(marks, 4));','}'],
 steps:(function(){const mk=[70,85,60,90],S=[];const M=()=>({n:'main()',v:[['marks',mk]]});
  S.push({l:7,f:[M()],n:'main creates marks.'});S.push({l:8,f:[M()],n:'total(marks, 4) passes the address of marks[0] and the size 4.'});
  let s='?';const T=i=>({n:'total()',v:[['m','→ marks[0] in main'],['n',4],['s',s]].concat(i===undefined?[]:[['i',i]])});
  S.push({l:0,f:[M(),T()],h:['m'],n:'m is not a copy. It points at main\u2019s array, so m[i] reads marks[i] directly.'});
  s=0;S.push({l:1,f:[M(),T()],h:['s'],n:'s = 0.'});
  for(let i=0;i<4;i++){S.push({l:2,f:[M(),T(i)],h:['i'],n:'i = '+i+' < 4.'});s+=mk[i];const h=['s','marks['+i+']'];S.push({l:3,f:[M(),T(i)],h,n:'s += m['+i+'] (which is marks['+i+'] = '+mk[i]+'), so s = '+s+'.'});}
  S.push({l:4,f:[M(),T(4)],n:'i = 4 ends the loop. return 305.'});S.push({l:8,f:[M()],o:'305',n:'The frame for total is gone. printf prints 305.'});return S;})()};

PPS.TR.u4fact={title:'Call-stack viewer: watch fact(n) wind and unwind',
 code:['int fact(int n) {','    if (n <= 1)','        return 1;          // base case','    return n * fact(n - 1);   // recursive case','}','int main(void) {','    printf("%d", fact(N));','}'],
 input:{label:'N =',def:'4',check:v=>/^[1-6]$/.test(v)?'':'Pick a whole number from 1 to 6 so the stack fits on screen.'},
 gen:v=>{const N=+v,S=[];const frames=[{n:'main()',v:[['calls','fact('+N+')']]}];const cp=()=>frames.map(f=>({n:f.n,v:f.v.map(x=>x.slice())}));
  S.push({l:6,f:cp(),n:'main calls fact('+N+') and waits for the answer.'});
  for(let k=N;k>=1;k--){frames.push({n:'fact('+k+')',v:[['n',k],['waiting for','—']]});
   S.push({l:0,f:cp(),h:['n'],n:'New frame: fact('+k+') with its own n = '+k+'. Stack depth: '+(frames.length-1)+'.'});
   if(k>1){S.push({l:1,f:cp(),n:'Is '+k+' <= 1? No.'});frames[frames.length-1].v[1][1]='fact('+(k-1)+')';S.push({l:3,f:cp(),h:['waiting for'],n:'Needs fact('+(k-1)+') before it can multiply. This call pauses; the stack winds deeper.'});}
   else{S.push({l:1,f:cp(),n:'Is 1 <= 1? Yes: the base case.'});S.push({l:2,f:cp(),n:'fact(1) returns 1 without calling anything. Now the stack unwinds.'});}}
  let r=1;frames.pop();
  for(let k=2;k<=N;k++){r*=k;frames[frames.length-1].v[1][1]='got '+(r/k);S.push({l:3,f:cp(),h:['waiting for'],n:'fact('+k+') receives '+(r/k)+' and returns '+k+' × '+(r/k)+' = '+r+'.'});frames.pop();}
  S.push({l:6,f:cp(),o:String(r),n:'All frames are gone. main prints '+N+'! = '+r+'.'});return S;}};

PPS.TB.u4rec={title:'More classic recursive functions',tabs:[
 {label:'Fibonacci',code:'int fib(int n) {\n    if (n <= 1) return n;            // fib(0) = 0, fib(1) = 1\n    return fib(n - 1) + fib(n - 2);\n}',note:'Two recursive calls per step. Simple to write, but slow for large n because values are recomputed.'},
 {label:'Sum of digits',code:'int sumDigits(int n) {\n    if (n == 0) return 0;\n    return n % 10 + sumDigits(n / 10);\n}',note:'Last digit plus the sum of the remaining digits. Compare with the while-loop version in Unit 2.'},
 {label:'GCD (Euclid)',code:'int gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}',note:'gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) = 6.'},
 {label:'Power',code:'long power(int x, int n) {\n    if (n == 0) return 1;\n    return x * power(x, n - 1);\n}',note:'x to the power n is x multiplied by x to the power n − 1.'}]};

PPS.SO.u4cbr={title:'Value or reference? Classify each situation',cats:['Call by value','Call by reference'],items:[
 {c:'The function gets a copy; changes stay inside it.',a:0,w:'That is the definition of call by value.'},
 {c:'swap(&a, &b);',a:1,w:'Addresses are passed so the function can change a and b.'},
 {c:'float area(float r) called as area(radius)',a:0,w:'Only the value of radius is needed; it is not modified.'},
 {c:'A function must give back both the minimum and the maximum of an array.',a:1,w:'return gives one value; pointer parameters can carry the second.'},
 {c:'scanf("%d", &n);',a:1,w:'scanf needs n\u2019s address to store the number it reads.'}]};
})();
