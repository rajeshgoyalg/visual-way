/* Unit 5 content: quick checks (PPS.Q), quiz (PPS.UQ), tracers (PPS.TR) and other widget data. */
(function(){
const Q=PPS.Q;
Q.u5l1=[
 {q:'What does defining struct student { int roll; float marks; }; do by itself?',o:['Creates a variable','Creates a new type (template) without allocating a variable','Allocates an array','Reads input'],a:1,w:'The definition describes the shape. Memory is used only when you declare a variable of that type.'},
 {q:'How do you set the marks of the 3rd student in struct student cls[60]?',o:['cls.marks[2] = 90;','cls[3].marks = 90;','cls[2].marks = 90;','cls->marks[2] = 90;'],a:2,w:'Index first (the 3rd student is index 2), then the member.'},
 {q:'Which operation works directly on two structure variables of the same type?',o:['s1 == s2','s2 = s1','s1 + s2','s1 > s2'],a:1,w:'Assignment copies every member. Comparison and arithmetic are not defined for structures.'}];
Q.u5l2=[
 {q:'struct student *p = &s1; Which expression reads s1\u2019s marks?',o:['p.marks','*p.marks','p->marks','&p->marks'],a:2,w:'p->marks is shorthand for (*p).marks.'},
 {q:'e is a struct employee with a member dob of type struct date. How do you read the year?',o:['e.year','e->dob->year','e.dob.year','dob.e.year'],a:2,w:'Chain the dots from outer to inner.'}];
Q.u5l3=[
 {q:'double *p holds 2000. What is p + 2?',o:['2002','2008','2016','2004'],a:2,w:'Each step is sizeof(double) = 8 bytes: 2000 + 2 × 8 = 2016.'},
 {q:'int a[5]; Which expression is the same as a[3]?',o:['*a + 3','*(a + 3)','&a + 3','a + 3'],a:1,w:'a[i] is defined as *(a + i).'},
 {q:'Which is not allowed?',o:['int *p = a; p++;','a++ where a is an array','p - q for two pointers into one array','*(p + 1)'],a:1,w:'An array name is a fixed address and cannot be changed.'}];
Q.u5l4=[
 {q:'For int a[3][4], which is equal to a[2][1]?',o:['*(a + 2 + 1)','*(*(a + 2) + 1)','**a + 3','*(a[1] + 2)'],a:1,w:'Move to row 2, then to column 1 within it, then dereference.'},
 {q:'What is the main space advantage of const char *names[] over char names[n][20]?',o:['Faster input','Each string uses only the space it needs','It allows numbers','Nothing'],a:1,w:'A 2-D char array gives every row the same width; an array of pointers points to strings of their own lengths.'}];
Q.u5l5=[
 {q:'Which mode adds to the end of an existing file without erasing it?',o:['"r"','"w"','"a"','"r+"'],a:2,w:'Append mode writes at the end and keeps existing data.'},
 {q:'fopen("data.txt", "r") returns NULL. What is the most likely reason?',o:['The file is empty','The file does not exist or cannot be opened','Mode r is invalid','The file is too large'],a:1,w:'Reading needs an existing, accessible file.'},
 {q:'Which function writes formatted output to a file?',o:['printf','fprintf','fputc','scanf'],a:1,w:'fprintf(fp, ...) is printf aimed at a file.'}];
PPS.UQ.u5=[
 {q:'What is the main difference between an array and a structure?',o:['Arrays are faster','An array holds elements of one type; a structure groups members of different types','Structures cannot be in arrays','There is no difference'],a:1,w:'Arrays are homogeneous; structures are heterogeneous records.'},
 {q:'Which line has an error? struct point { int x, y; } p;',o:['p.x = 3;','p->y = 4;','struct point q = p;','p.y = p.x;'],a:1,w:'p is a structure variable, not a pointer, so use the dot.'},
 {q:'struct point pt = {2, 5}; struct point *q = &pt; q->x += 10; What is pt.x?',o:['2','12','10','5'],a:1,w:'q points to pt, so q->x changes pt.x to 12.'},
 {q:'int a[] = {5, 10, 15, 20}; int *p = a + 1; What is *(p + 2)?',o:['15','20','10','Error'],a:1,w:'p points to a[1]; p + 2 points to a[3], which is 20.'},
 {q:'int a[] = {5, 10, 15}; int *p = a; printf("%d", *p + 1); prints:',o:['10','6','5','15'],a:1,w:'*p is 5, then + 1 gives 6. *(p + 1) would be 10.'},
 {q:'char *s = "CODE"; What does *(s + 2) give?',o:['\'C\'','\'O\'','\'D\'','\'E\''],a:2,w:'Index 2 of "CODE" is D.'},
 {q:'Two int pointers p and q point to a[1] and a[4]. What is q - p?',o:['3','12','4','16'],a:0,w:'Pointer difference counts elements, not bytes: 4 − 1 = 3.'},
 {q:'Which mode should a program use to start a fresh results file each time it runs?',o:['"r"','"w"','"a"','"r+"'],a:1,w:'"w" creates the file, or erases an existing one, before writing.'},
 {q:'What must be called to make sure written data is saved and the file is released?',o:['fopen','fclose','fprintf','free'],a:1,w:'fclose flushes buffered data and closes the file.'},
 {q:'while ((ch = fgetc(fp)) != EOF) count++; What does this count?',o:['Lines','Words','Characters in the file','Files'],a:2,w:'fgetc returns one character at a time until EOF.'}];

PPS.TR.u5struct={title:'Tracer: dot and arrow on the same structure',
 code:['struct student { int roll; float marks; };','struct student s1 = {101, 72.5};','struct student *p = &s1;','s1.marks = s1.marks + 5;     // dot: through the variable','p->marks = p->marks + 10;    // arrow: through the pointer','printf("%d %.1f", p->roll, s1.marks);'],
 steps:[
  {l:0,f:[{n:'main()',v:[]}],n:'The definition only describes the type. No memory is used yet.'},
  {l:1,f:[{n:'main()',v:[['s1',{roll:101,marks:'72.5'},'3000']]}],h:['s1'],n:'s1 is created at address 3000 with roll 101 and marks 72.5.'},
  {l:2,f:[{n:'main()',v:[['s1',{roll:101,marks:'72.5'},'3000'],['p','3000 → s1']]}],h:['p'],n:'p stores the address of s1.'},
  {l:3,f:[{n:'main()',v:[['s1',{roll:101,marks:'77.5'},'3000'],['p','3000 → s1']]}],h:['s1.marks'],n:'Dot operator on the variable: marks becomes 77.5.'},
  {l:4,f:[{n:'main()',v:[['s1',{roll:101,marks:'87.5'},'3000'],['p','3000 → s1']]}],h:['s1.marks'],n:'Arrow operator through the pointer reaches the same member: 87.5.'},
  {l:5,f:[{n:'main()',v:[['s1',{roll:101,marks:'87.5'},'3000'],['p','3000 → s1']]}],o:'101 87.5',n:'Output: 101 87.5. Both routes changed one record.'}]};

PPS.TR.u5parr={title:'Tracer: walking an array with a pointer',
 code:['int a[4] = {10, 20, 30, 40};','int *p = a;            // same as &a[0]','int sum = 0;','for (int i = 0; i < 4; i++)','    sum += *(p + i);','printf("%d", sum);'],
 steps:(function(){const a=[10,20,30,40],S=[];let sum='?';const mv=i=>[{n:'main()',v:[['a',a,'1000'],['p','1000 → a[0]']].concat(sum==='?'?[]:[['sum',sum]]).concat(i===undefined?[]:[['i',i]])}];
  S.push({l:0,f:[{n:'main()',v:[['a',a,'1000']]}],n:'The array starts at address 1000; each int takes 4 bytes.'});
  S.push({l:1,f:mv(),h:['p'],n:'p = a stores the address of the first element, 1000.'});sum=0;S.push({l:2,f:mv(),h:['sum'],n:'sum = 0.'});
  for(let i=0;i<4;i++){S.push({l:3,f:mv(i),h:['i'],n:'i = '+i+'.'});sum+=a[i];S.push({l:4,f:mv(i),h:['sum','a['+i+']'],n:'p + '+i+' = 1000 + '+i+' × 4 = '+(1000+i*4)+'. *(p + '+i+') reads '+a[i]+'. sum = '+sum+'.'});}
  S.push({l:5,f:mv(4),o:'100',n:'Output: 100. *(p + i) did exactly what a[i] does.'});return S;})()};

PPS.ST.u5file={title:'Open, use, close: watch marks.txt change',side:'Contents of marks.txt',frames:[
 {c:'⟦FILE *fp = fopen("marks.txt", "w");⟧',f:'',n:'"w" creates marks.txt (or erases it if it existed). fp now refers to the open file.'},
 {c:'if (fp == NULL) { ... }',f:'',n:'fopen succeeded, so fp is not NULL. Always check before using fp.'},
 {c:'⟦fprintf(fp, "%d %d\\n", 101, 88);⟧',f:'101 88\n',n:'fprintf writes a line into the file instead of the screen.'},
 {c:'⟦fprintf(fp, "%d %d\\n", 102, 74);⟧',f:'101 88\n102 74\n',n:'A second line is written after the first.'},
 {c:'⟦fclose(fp);⟧',f:'101 88\n102 74\n',n:'fclose saves everything to disk. The data now survives after the program ends.'},
 {c:'⟦fp = fopen("marks.txt", "a");⟧\nfprintf(fp, "%d %d\\n", 103, 91);\nfclose(fp);',f:'101 88\n102 74\n103 91\n',n:'Reopened in append mode: the new record goes at the end and the old lines stay.'},
 {c:'⟦fp = fopen("marks.txt", "r");⟧\nwhile (fscanf(fp, "%d %d", &roll, &m) == 2)\n    printf("Roll %d scored %d\\n", roll, m);',f:'101 88\n102 74\n103 91\n',n:'Read mode: fscanf reads two numbers per line and returns 2 each time, until the end of the file.'},
 {c:'fp = fopen("marks.txt", "r");\nwhile (fscanf(fp, "%d %d", &roll, &m) == 2) ...\n⟦fclose(fp);⟧',f:'101 88\n102 74\n103 91\n',n:'All three records were printed; fscanf returned EOF and the loop ended. Close the file.'},
 {c:'⟦fp = fopen("marks.txt", "w");⟧\nfclose(fp);',f:'',n:'Careful: opening the same file with "w" again erases it immediately, even before anything is written.'}]};

PPS.SO.u5modes={title:'Which mode would you use?',cats:['"r"','"w"','"a"'],items:[
 {c:'Read last semester\u2019s marks from marks.txt',a:0,w:'Only reading is needed and the file must already exist.'},
 {c:'Start a fresh attendance file every day, discarding yesterday\u2019s',a:1,w:'"w" erases old contents before writing.'},
 {c:'Add today\u2019s entry to log.txt without losing earlier entries',a:2,w:'"a" keeps existing data and writes at the end.'},
 {c:'Count the lines in an existing file',a:0,w:'Counting only reads.'},
 {c:'Save a new report, creating the file if it is missing and replacing any old version',a:1,w:'"w" creates or overwrites.'}]};

/* ---- pointer jump ---- */
PPS.init.push(function(){
  const el=$('#ptrjump');const T={char:1,int:4,float:4,double:8};
  el.innerHTML='<div class="label">Where does p + 1 land? Choose the pointer type</div><div class="tabs" role="group" aria-label="Pointer type">'+Object.keys(T).map((t,i)=>'<button type="button" aria-pressed="'+(i===1)+'" data-t="'+t+'">'+t+' *p</button>').join('')+'</div><div class="pj"></div><p class="stepnote" aria-live="polite"></p>';
  function draw(t){const sz=T[t];$$('.tabs button',el).forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t));
    let h='<div class="pj-bytes">';for(let b=0;b<32;b++){const el_=Math.floor(b/sz);h+='<div class="pj-b'+(el_%2?' alt':'')+(b%sz===0&&el_<4?' start':'')+'"><span>'+(b%sz===0&&el_<4?'p+'+el_:'')+'</span></div>';}
    h+='</div><div class="pj-axis"><span>1000</span><span>1008</span><span>1016</span><span>1024</span><span>1032</span></div>';$('.pj',el).innerHTML=h;
    $('.stepnote',el).textContent='sizeof('+t+') = '+sz+(sz===1?' byte':' bytes')+'. If p holds 1000, then p + 1 = '+(1000+sz)+', p + 2 = '+(1000+2*sz)+', p + 3 = '+(1000+3*sz)+'. Each shaded block is one '+t+'.';}
  $$('.tabs button',el).forEach(b=>b.addEventListener('click',()=>draw(b.dataset.t)));draw('int');
});

PPS.Q.u5l6=[
 {q:'char name[8]; strcpy(name, "Christopher"); What is the problem?',o:['Nothing, strcpy resizes name','11 characters plus \\0 need 12 bytes, so strcpy writes past the array: a buffer overflow','strcpy only copies 8 characters','It does not compile'],a:1,w:'C never checks the destination size. The extra bytes overwrite whatever lies next to name in memory.'},
 {q:'Which line reads a word safely into char s[20]?',o:['gets(s);','scanf("%s", s);','scanf("%19s", s);','scanf("%20s", s);'],a:2,w:'The width must leave room for \\0, so it is one less than the array size.'},
 {q:'A program prints a message typed by the user with printf(msg). Why is this risky?',o:['It is slower','Any % in the message is treated as a format code, so it can read or write memory it should not','printf cannot print strings','It adds a newline'],a:1,w:'Print user text with printf("%s", msg) so it is never interpreted as a format.'}];
PPS.SO.u5safe={title:'Safe or risky? Judge each line',cats:['Safe','Risky'],items:[
 {c:'fgets(line, sizeof line, stdin);',a:0,w:'fgets stops at the array size.'},
 {c:'gets(line);',a:1,w:'gets cannot stop at the end of the array. It was removed from C for this reason.'},
 {c:'scanf("%s", name);   /* char name[10] */',a:1,w:'No width, so a long word overflows name. Use %9s.'},
 {c:'printf("%s", userText);',a:0,w:'The user\u2019s text is printed as data, never read as a format.'},
 {c:'marks[i] = m;   /* i typed by the user, not checked */',a:1,w:'An unchecked index can write outside the array. Check 0 <= i < n first.'},
 {c:'if (scanf("%d", &n) != 1 || n < 1 || n > 100) return 1;',a:0,w:'Checks both that a number was read and that it is in range.'},
 {c:'snprintf(dest, sizeof dest, "%s", src);',a:0,w:'snprintf never writes more than sizeof dest bytes, including \\0.'},
 {c:'int *p; *p = 5;',a:1,w:'p points nowhere in particular. Writing through it corrupts memory.'}]};

PPS.Q.u5l4.push({q:'int a[3][4] starts at address 2000 and an int is 4 bytes. What address is a + 2?',o:['2008','2032','2002','2016'],a:1,w:'a + 2 skips two whole rows of 4 ints: 2 \u00d7 16 bytes = 32, so 2032.'});
})();
