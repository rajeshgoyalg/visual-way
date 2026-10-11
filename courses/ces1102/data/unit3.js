/* Unit 3 content: quick checks (PPS.Q), quiz (PPS.UQ), tracers (PPS.TR) and other widget data. */
(function(){
const Q=PPS.Q;
Q.u3l1=[
 {q:'int a[8]; What are the first and last valid indices?',o:['1 and 8','0 and 8','0 and 7','1 and 7'],a:2,w:'Indices run from 0 to size − 1.'},
 {q:'int a[5] = {4, 9}; What is a[3]?',o:['Garbage','9','0','Compile error'],a:2,w:'When an array is partly initialised, the remaining elements are set to 0.'},
 {q:'An int array starts at address 2000. With 4-byte ints, where is a[3]?',o:['2003','2012','2004','2016'],a:1,w:'2000 + 3 × 4 = 2012.'}];
Q.u3l2=[
 {q:'Which search needs the array to be sorted?',o:['Linear search','Binary search','Both','Neither'],a:1,w:'Binary search discards half the array based on order, so the data must be sorted.'},
 {q:'Roughly how many comparisons does binary search need for 1,024 elements in the worst case?',o:['1,024','512','10 or 11','32'],a:2,w:'Each comparison halves the range: 2¹⁰ = 1,024, so about 10 halvings.'},
 {q:'In binary search, the key is smaller than a[mid]. What is the next step?',o:['low = mid + 1','high = mid - 1','mid = mid + 1','Stop'],a:1,w:'The key must be in the left half, so the upper limit moves to mid − 1.'}];
Q.u3l3=[
 {q:'After the first pass of bubble sort (ascending), what is guaranteed?',o:['The smallest is at index 0','The largest is at the last index','The array is sorted','Nothing'],a:1,w:'Each pass carries the largest remaining value to the end of the unsorted part.'},
 {q:'Which sort makes at most n − 1 swaps?',o:['Bubble sort','Selection sort','Both','Neither'],a:1,w:'Selection sort makes one swap per pass at most.'}];
Q.u3l4=[
 {q:'int m[3][4]; how many ints does it hold?',o:['7','12','16','9'],a:1,w:'3 rows × 4 columns = 12 elements.'},
 {q:'In row-major order for int a[3][4], what is the offset of a[2][1] from the start?',o:['7','9','6','10'],a:1,w:'offset = i × cols + j = 2 × 4 + 1 = 9 elements.'},
 {q:'A is 2 × 3 and B is 3 × 4. What is the size of A × B?',o:['2 × 4','3 × 3','4 × 2','Not possible'],a:0,w:'Inner dimensions match (3 = 3); the result takes the outer dimensions, 2 × 4.'}];
Q.u3l5=[
 {q:'What is the minimum array size to store "MANIPAL" as a string?',o:['7','8','6','9'],a:1,w:'7 letters plus 1 for the terminating \\0.'},
 {q:'The user types "Ravi Kumar". What does scanf("%s", name) store?',o:['Ravi Kumar','Ravi','Kumar','Nothing'],a:1,w:'%s stops reading at the first whitespace.'}];
Q.u3l6=[
 {q:'What does strcmp("apple", "apple") return?',o:['1','0','-1','5'],a:1,w:'0 means the two strings are equal.'},
 {q:'What does strlen("C lab") return?',o:['4','5','6','7'],a:1,w:'C, space, l, a, b: 5 characters. The \\0 is not counted.'},
 {q:'How should you test whether two strings s1 and s2 hold the same text?',o:['s1 == s2','strcmp(s1, s2) == 0','strcpy(s1, s2)','strlen(s1) == strlen(s2)'],a:1,w:'== compares addresses. Equal length does not mean equal text.'}];
PPS.UQ.u3=[
 {q:'Which declaration creates space for 10 floats?',o:['float a(10);','float a[10];','float[10] a;','array float a[10];'],a:1,w:'Type, name, then size in square brackets.'},
 {q:'What does this print? int a[] = {3, 6, 9, 12}; printf("%d", a[1] + a[3]);',o:['15','18','9','21'],a:1,w:'a[1] is 6 and a[3] is 12, so 18.'},
 {q:'Linear search on an unsorted array of 50 elements. The key is not present. How many comparisons?',o:['1','25','50','6'],a:2,w:'Linear search must check every element before it can say not found.'},
 {q:'Binary search on {2, 5, 8, 12, 16, 23, 38} for 23. Which element is compared first?',o:['2','12','23','38'],a:1,w:'mid = (0 + 6) / 2 = 3, and a[3] is 12.'},
 {q:'How many comparisons does selection sort make on 5 elements?',o:['5','10','20','25'],a:1,w:'n(n − 1)/2 = 5 × 4 / 2 = 10.'},
 {q:'Bubble sort pass 1 on {5, 1, 4, 2}. What is the array after the pass?',o:['{1, 4, 2, 5}','{1, 2, 4, 5}','{5, 4, 2, 1}','{1, 5, 4, 2}'],a:0,w:'5↔1, 5↔4, 5↔2: 5 bubbles to the end, giving {1, 4, 2, 5}.'},
 {q:'int m[2][3] = {{1, 2, 3}, {4, 5, 6}}; What is m[1][0]?',o:['2','4','1','5'],a:1,w:'Row 1 is {4, 5, 6}; column 0 of it is 4.'},
 {q:'Which loop pattern prints a matrix row by row?',o:['A single loop','Outer loop over rows, inner over columns','Outer over columns, inner over rows','A while loop with break'],a:1,w:'Each row is printed fully (inner loop), then the next row.'},
 {q:'char s[] = "Hi"; What is sizeof(s)?',o:['2','3','4','1'],a:1,w:'H, i and \\0: 3 bytes.'},
 {q:'char a[20] = "Good"; strcat(a, "Day"); What is strlen(a)?',o:['4','7','8','20'],a:1,w:'a becomes "GoodDay", 7 characters.'}];

PPS.TR.u3max={title:'Tracer: find the largest element',
 code:['int a[5] = {12, 45, 7, 89, 23};','int max = a[0];','for (int i = 1; i < 5; i++) {','    if (a[i] > max)','        max = a[i];','}','printf("Max = %d", max);'],
 steps:(function(){const a=[12,45,7,89,23],S=[];let max='?';const mv=(i)=>[{n:'main()',v:[['a',a],['max',max]].concat(i===undefined?[]:[['i',i]])}];
  S.push({l:0,f:mv(),n:'The array is filled at declaration.'});max=a[0];S.push({l:1,f:mv(),h:['max','a[0]'],n:'Assume the first element is the largest: max = 12.'});
  for(let i=1;i<5;i++){S.push({l:2,f:mv(i),h:['i'],n:'i = '+i+', and '+i+' < 5, so the body runs.'});const big=a[i]>max;
   S.push({l:3,f:mv(i),h:['a['+i+']'],n:'Is a['+i+'] = '+a[i]+' > max = '+max+'? '+(big?'Yes.':'No.')});
   if(big){max=a[i];S.push({l:4,f:mv(i),h:['max','a['+i+']'],n:'max becomes '+max+'.'});}}
  S.push({l:6,f:mv(5),o:'Max = 89',n:'i reached 5 and the loop ended. Output: Max = 89.'});return S;})()};

PPS.TR.u3len={title:'Tracer: walk to the \\0 to find the length',
 code:['char s[10] = "CODE";','int len = 0;','while (s[len] != \'\\0\')','    len++;','printf("Length = %d", len);'],
 steps:(function(){const s=['C','O','D','E','\\0','\\0','\\0','\\0','\\0','\\0'],S=[];let len='?';const mv=()=>[{n:'main()',v:[['s',s],['len',len]]}];
  S.push({l:0,f:mv(),h:['s[4]'],n:'"CODE" fills s[0] to s[3]; s[4] is the terminator \\0, and the unused slots are also \\0.'});len=0;S.push({l:1,f:mv(),h:['len'],n:'len starts at 0.'});
  for(let i=0;i<=4;i++){const end=i===4;S.push({l:2,f:mv(),h:['s['+i+']'],n:'s['+i+'] is '+(end?'\\0, so the loop stops.':"'"+s[i]+"', not \\0, so keep going.")});if(end)break;len++;S.push({l:3,f:mv(),h:['len'],n:'len becomes '+len+'.'});}
  S.push({l:4,f:mv(),o:'Length = 4',n:'Output: Length = 4. This is exactly what strlen does.'});return S;})()};

PPS.TB.u3sorts={title:'The two sorts in C',tabs:[
 {label:'Bubble sort',code:'for (int i = 0; i < n - 1; i++) {          // passes\n    for (int j = 0; j < n - 1 - i; j++) {  // neighbours\n        if (a[j] > a[j + 1]) {\n            int t = a[j];\n            a[j] = a[j + 1];\n            a[j + 1] = t;\n        }\n    }\n}',note:'After pass i, the last i + 1 elements are in their final places, so the inner loop shrinks.'},
 {label:'Selection sort',code:'for (int i = 0; i < n - 1; i++) {\n    int min = i;\n    for (int j = i + 1; j < n; j++)\n        if (a[j] < a[min])\n            min = j;\n    if (min != i) {\n        int t = a[i];\n        a[i] = a[min];\n        a[min] = t;\n    }\n}',note:'Find the index of the smallest remaining element, then one swap puts it in position i.'}]};

PPS.TB.u3mat={title:'Three matrix programs every exam asks for',tabs:[
 {label:'Addition',code:'for (int i = 0; i < r; i++)\n    for (int j = 0; j < c; j++)\n        s[i][j] = a[i][j] + b[i][j];',note:'Both matrices must have the same size. Add matching cells.'},
 {label:'Transpose',code:'for (int i = 0; i < r; i++)\n    for (int j = 0; j < c; j++)\n        t[j][i] = a[i][j];',note:'Rows become columns. An r × c matrix becomes c × r.'},
 {label:'Multiplication',code:'if (c1 != r2) { printf("Cannot multiply"); return 0; }\nfor (int i = 0; i < r1; i++)\n    for (int j = 0; j < c2; j++) {\n        p[i][j] = 0;\n        for (int k = 0; k < c1; k++)\n            p[i][j] += a[i][k] * b[k][j];\n    }',note:'Three loops. Cell (i, j) is row i of A multiplied element by element with column j of B, then summed.'}]};

PPS.SO.u3safe={title:'Safe or bug? Judge each line',cats:['Safe','Bug'],items:[
 {c:'int a[5] = {1, 2, 3};',a:0,w:'a[3] and a[4] are set to 0 automatically.'},
 {c:'int a[5];  a[5] = 10;',a:1,w:'The valid indices are 0 to 4. a[5] writes outside the array.'},
 {c:'char name[4] = "Ravi";',a:1,w:'4 letters need 5 bytes including \\0. The string has no terminator.'},
 {c:'char city[20];  city = "Udupi";',a:1,w:'You cannot assign to an array. Use strcpy(city, "Udupi").'},
 {c:'if (strcmp(s1, s2) == 0)',a:0,w:'The correct way to test two strings for equal text.'},
 {c:'if (s1 == s2)',a:1,w:'This compares the addresses of the arrays, not their contents.'}]};

/* ---- array player ---- */
function parseArr(t){const p=t.split(/[\s,]+/).filter(Boolean);if(p.length<2||p.length>10)return null;const a=p.map(Number);return a.every(x=>Number.isInteger(x)&&Math.abs(x)<1000)?a:null;}
function gLinear(a,key){const F=[];let c=0;const out={};F.push({a:a.slice(),cls:{},n:'Linear search for '+key+'. Start at index 0.',c,s:0});
  for(let i=0;i<a.length;i++){c++;const hit=a[i]===key;const cls=Object.assign({},out);cls[i]=hit?'found':'cmp';
   F.push({a:a.slice(),cls,n:'Compare a['+i+'] = '+a[i]+' with '+key+': '+(hit?'match. Found at index '+i+' after '+c+' comparison'+(c>1?'s':'')+'.':'no match, move right.'),c,s:0});if(hit)return F;out[i]='out';}
  F.push({a:a.slice(),cls:out,n:key+' is not in the array. Every one of the '+a.length+' elements was checked.',c,s:0});return F;}
function gBinary(orig,key){const a=orig.slice().sort((x,y)=>x-y),F=[];let c=0,lo=0,hi=a.length-1;
  const sorted=orig.some((x,i)=>x!==a[i]);
  F.push({a:a.slice(),cls:{},tags:{0:'low',[hi]:'high'},n:(sorted?'Binary search needs sorted data, so the array was sorted first. ':'')+'Search for '+key+' between low = 0 and high = '+hi+'.',c,s:0});
  while(lo<=hi){const mid=Math.floor((lo+hi)/2);c++;const cls={};a.forEach((_,i)=>{if(i<lo||i>hi)cls[i]='out';});const tags={};tags[lo]='low';tags[hi]=(tags[hi]?tags[hi]+'/':'')+'high';tags[mid]=(tags[mid]?tags[mid]+'/':'')+'mid';
   if(a[mid]===key){cls[mid]='found';F.push({a:a.slice(),cls,tags,n:'mid = ('+lo+' + '+hi+') / 2 = '+mid+'. a['+mid+'] = '+a[mid]+' equals '+key+'. Found after '+c+' comparison'+(c>1?'s':'')+'.',c,s:0});return F;}
   cls[mid]='cmp';const left=key<a[mid];
   F.push({a:a.slice(),cls,tags,n:'mid = ('+lo+' + '+hi+') / 2 = '+mid+'. a['+mid+'] = '+a[mid]+'. '+key+(left?' is smaller, so keep the left half: high = '+(mid-1)+'.':' is bigger, so keep the right half: low = '+(mid+1)+'.'),c,s:0});
   if(left)hi=mid-1;else lo=mid+1;}
  const cls={};a.forEach((_,i)=>cls[i]='out');F.push({a:a.slice(),cls,n:'low passed high, so '+key+' is not present. Only '+c+' comparison'+(c>1?'s were':' was')+' needed.',c,s:0});return F;}
function gBubble(orig){const a=orig.slice(),n=a.length,F=[];let c=0,s=0;const done={};
  const base=()=>Object.assign({},done);F.push({a:a.slice(),cls:{},n:'Bubble sort: compare neighbours, swap if the left one is bigger.',c,s});
  for(let i=0;i<n-1;i++){let sw=false;
   for(let j=0;j<n-1-i;j++){c++;let cls=base();cls[j]=cls[j+1]='cmp';const need=a[j]>a[j+1];
    F.push({a:a.slice(),cls,n:'Pass '+(i+1)+': is '+a[j]+' > '+a[j+1]+'? '+(need?'Yes, swap.':'No, leave them.'),c,s});
    if(need){[a[j],a[j+1]]=[a[j+1],a[j]];s++;sw=true;cls=base();cls[j]=cls[j+1]='swap';F.push({a:a.slice(),cls,n:'Swapped.',c,s});}}
   done[n-1-i]='done';
   if(!sw){a.forEach((_,k)=>done[k]='done');F.push({a:a.slice(),cls:base(),n:'No swaps in pass '+(i+1)+', so the array is already sorted. Stop early.',c,s});return F;}
   F.push({a:a.slice(),cls:base(),n:'End of pass '+(i+1)+': '+a[n-1-i]+' is now in its final place.',c,s});}
  a.forEach((_,k)=>done[k]='done');F.push({a:a.slice(),cls:base(),n:'Sorted with '+c+' comparisons and '+s+' swaps.',c,s});return F;}
function gSelection(orig){const a=orig.slice(),n=a.length,F=[];let c=0,s=0;const done={};const base=()=>Object.assign({},done);
  F.push({a:a.slice(),cls:{},n:'Selection sort: find the smallest remaining value, swap it to the front.',c,s});
  for(let i=0;i<n-1;i++){let min=i;let cls=base();cls[i]='min';F.push({a:a.slice(),cls,n:'Pass '+(i+1)+': assume a['+i+'] = '+a[i]+' is the minimum.',c,s});
   for(let j=i+1;j<n;j++){c++;cls=base();cls[min]='min';cls[j]='cmp';const less=a[j]<a[min];
    F.push({a:a.slice(),cls,n:'Is '+a[j]+' < '+a[min]+'? '+(less?'Yes, new minimum at index '+j+'.':'No.'),c,s});if(less)min=j;}
   if(min!==i){[a[i],a[min]]=[a[min],a[i]];s++;cls=base();cls[i]=cls[min]='swap';F.push({a:a.slice(),cls,n:'Swap the minimum into index '+i+'.',c,s});}
   else F.push({a:a.slice(),cls:base(),n:'a['+i+'] is already the minimum. No swap needed.',c,s});
   done[i]='done';}
  a.forEach((_,k)=>done[k]='done');F.push({a:a.slice(),cls:base(),n:'Sorted with '+c+' comparisons and '+s+' swaps.',c,s});return F;}

function arrayPlayer(el){
  const search=el.dataset.mode==='search';
  const algos=search?[['linear','Linear search'],['binary','Binary search']]:[['bubble','Bubble sort'],['selection','Selection sort']];
  const id='ap'+(uid++);
  el.innerHTML='<div class="label">'+(search?'Search race: who needs fewer comparisons?':'Sort race: compare the counters')+'</div>'+
   '<div class="row ap-ctl"><label for="'+id+'a">Algorithm</label><select class="sel" id="'+id+'a">'+algos.map(x=>'<option value="'+x[0]+'">'+x[1]+'</option>').join('')+'</select>'+
   '<label for="'+id+'v">Array</label><input id="'+id+'v" type="text" value="'+(search?'34, 7, 23, 32, 5, 62, 15':'29, 10, 14, 37, 13, 5')+'" style="width:210px">'+
   (search?'<label for="'+id+'k">Find</label><input id="'+id+'k" type="text" inputmode="numeric" value="62" style="width:64px">':'')+
   '<button class="btn" type="button">Load</button><span class="err" aria-live="polite"></span></div>'+
   '<div class="ap-row" aria-hidden="true"></div><div class="ap-stats"><span>Comparisons <b>0</b></span>'+(search?'':'<span>Swaps <b>0</b></span>')+'</div>'+
   '<p class="stepnote" aria-live="polite"></p><div class="row ap-nav"><button class="btn ghost" type="button">Previous</button><button class="btn" type="button">Next step</button><button class="btn ghost" type="button">Play</button><span class="tr-count"></span></div>'+
   '<div class="legend"><span class="lg cmp"></span>comparing <span class="lg swap"></span>'+(search?'':'swapped ')+(search?'':'<span class="lg min"></span>current minimum ')+'<span class="lg done"></span>'+(search?'found':'in final place')+(search?' <span class="lg out"></span>ruled out':'')+'</div>';
  const alg=$('#'+id+'a'),arr=$('#'+id+'v'),key=search?$('#'+id+'k'):null,err=$('.ap-ctl .err',el);
  const [load]=$$('.ap-ctl .btn',el),[pv,nx,pl]=$$('.ap-nav .btn',el);
  if(search)$('.lg.swap',el).remove();
  let F=[],k=0,timer=null;
  function stop(){if(timer){clearInterval(timer);timer=null;pl.textContent='Play';}}
  function draw(){const f=F[k];
    $('.ap-row',el).innerHTML=f.a.map((v,i)=>'<div class="ap-cell '+(f.cls[i]||'')+'"><div class="box">'+v+'</div><div class="idx">['+i+']</div><div class="tag">'+((f.tags&&f.tags[i])||'')+'</div></div>').join('');
    const b=$$('.ap-stats b',el);b[0].textContent=f.c;if(b[1])b[1].textContent=f.s;
    $('.stepnote',el).textContent=f.n;$('.tr-count',el).textContent='Step '+(k+1)+' of '+F.length;pv.disabled=k===0;nx.disabled=k===F.length-1;}
  function build(){stop();err.textContent='';const a=parseArr(arr.value);if(!a){err.textContent='Enter 2 to 10 whole numbers separated by commas.';return;}
    let kk;if(search){if(!/^-?\d{1,3}$/.test(key.value.trim())){err.textContent='Enter a whole number to find.';return;}kk=+key.value.trim();}
    const g={linear:gLinear,binary:gBinary,bubble:gBubble,selection:gSelection}[alg.value];F=g(a,kk);k=0;draw();}
  [arr,key].forEach(x=>x&&x.addEventListener('input',()=>{err.textContent='';}));
  load.addEventListener('click',build);alg.addEventListener('change',build);
  pv.addEventListener('click',()=>{stop();if(k>0){k--;draw();}});nx.addEventListener('click',()=>{stop();if(k<F.length-1){k++;draw();}});
  pl.addEventListener('click',()=>{if(timer){stop();return;}if(k===F.length-1)k=0;pl.textContent='Pause';timer=setInterval(()=>{if(k>=F.length-1){stop();return;}k++;draw();},reduce?1200:700);});
  build();
}
PPS.init.push(()=>$$('.arrplayer').forEach(arrayPlayer));

/* ---- matrix lab ---- */
PPS.init.push(function(){
  const el=$('#matrixlab'),M=[[7,2,9,4],[3,8,1,6],[5,0,2,9]];let si=1,sj=2;
  el.innerHTML='<div class="label">int a[3][4]: click a cell to find it in memory</div><div class="mx-wrap"><div class="mx" role="group" aria-label="Matrix a, 3 rows by 4 columns"></div><div class="mx-mem"></div></div><p class="stepnote" aria-live="polite"></p>';
  function draw(){
    $('.mx',el).innerHTML='<div class="mx-h"></div>'+[0,1,2,3].map(j=>'<div class="mx-h">col '+j+'</div>').join('')+M.map((r,i)=>'<div class="mx-h">row '+i+'</div>'+r.map((v,j)=>'<button type="button" class="mx-c'+(i===si&&j===sj?' on':(i===si?' row':''))+'" data-i="'+i+'" data-j="'+j+'" aria-label="a['+i+']['+j+'] = '+v+'">'+v+'</button>').join('')).join('');
    const off=si*4+sj;
    $('.mx-mem',el).innerHTML='<div class="tr-l">Memory, one line, row after row</div><div class="cells">'+M.flat().map((v,k)=>'<div class="cell'+(k===off?' hot':'')+(Math.floor(k/4)===si&&k!==off?' rowc':'')+'"><div class="box">'+v+'</div><div class="idx">'+(2000+k*4)+'</div></div>').join('')+'</div>';
    $('.stepnote',el).textContent='a['+si+']['+sj+'] = '+M[si][sj]+'. Offset = row × columns + column = '+si+' × 4 + '+sj+' = '+off+'. Address = 2000 + '+off+' × 4 = '+(2000+off*4)+'.';
    $$('.mx-c',el).forEach(b=>b.addEventListener('click',()=>{si=+b.dataset.i;sj=+b.dataset.j;draw();const nb=el.querySelector('.mx-c[data-i="'+si+'"][data-j="'+sj+'"]');if(nb)nb.focus();}));}
  draw();
});

/* ---- string lab ---- */
PPS.init.push(function(){
  const el=$('#strlab');
  el.innerHTML='<div class="label">String lab: char s1[16], s2[16]</div><div class="row ap-ctl"><label for="sl1">s1</label><input id="sl1" type="text" value="Hello" maxlength="14" style="width:130px"><label for="sl2">s2</label><input id="sl2" type="text" value="World" maxlength="14" style="width:130px">'+
   '<label for="slf">Function</label><select id="slf" class="sel"><option value="len">strlen(s1)</option><option value="cpy">strcpy(s1, s2)</option><option value="cat">strcat(s1, s2)</option><option value="cmp">strcmp(s1, s2)</option></select><button class="btn" type="button">Run</button><span class="err" aria-live="polite"></span></div><div class="sl-out"></div><p class="stepnote" aria-live="polite"></p>';
  const s1=$('#sl1'),s2=$('#sl2'),fn=$('#slf'),err=$('.err',el);
  function cells(name,str,hot,size){const ch=str.split('');const total=Math.max(size,ch.length+1);let h='<div class="var"><span class="vn">'+name+'</span><div class="cells">';
    for(let i=0;i<total;i++){const c=i<ch.length?ch[i]:(i===ch.length?'\\0':'');const over=i>=size;h+='<div class="cell'+(hot&&hot(i)?' hot':'')+(over?' bad':'')+(c===''?' dim':'')+'"><div class="box">'+esc(c===' '?'␣':c)+'</div><div class="idx">'+i+'</div></div>';}
    return h+'</div></div>';}
  function run(){err.textContent='';const a=s1.value,b=s2.value;if(!a||!b){err.textContent='Type something in both s1 and s2.';return;}
    let html='',note='';const f=fn.value;
    if(f==='len'){html=cells('s1',a,i=>i<a.length,16);note='strlen(s1) = '+a.length+'. It counts the highlighted characters and stops at \\0, which is not counted.';}
    else if(f==='cpy'){html=cells('s1 after',b,i=>i<=b.length,16)+cells('s2',b,null,16);note='strcpy copied every character of s2, including \\0, into s1. The old "'+a+'" is gone.';}
    else if(f==='cat'){const r=a+b;html=cells('s1 after',r,i=>i>=a.length&&i<=r.length,16)+cells('s2',b,null,16);
      note=r.length+1>16?'Overflow! "'+r+'" needs '+(r.length+1)+' bytes but s1 has only 16. The red cells overwrite memory that is not yours. C will not stop you, so always check sizes first.':'strcat found the \\0 at s1['+a.length+'], wrote s2 from there, and added a new \\0. s1 is now "'+r+'" (length '+r.length+').';}
    else{let i=0;while(i<a.length&&i<b.length&&a[i]===b[i])i++;
      html=cells('s1',a,k=>k===i,16)+cells('s2',b,k=>k===i,16);
      if(i===a.length&&i===b.length)note='Every character matched, including the final \\0. strcmp returns 0: the strings are equal.';
      else{const ca=i<a.length?a.charCodeAt(i):0,cb=i<b.length?b.charCodeAt(i):0;const show=(s,k,c)=>k<s.length?"'"+s[k]+"' ("+c+')':'\\0 (0)';
        note='The first difference is at index '+i+': '+show(a,i,ca)+' versus '+show(b,i,cb)+'. '+(ca<cb?'s1\u2019s character is smaller, so strcmp returns a negative value: s1 comes first.':'s1\u2019s character is bigger, so strcmp returns a positive value: s2 comes first.');}}
    $('.sl-out',el).innerHTML=html;$('.stepnote',el).textContent=note;}
  [s1,s2].forEach(x=>x.addEventListener('input',()=>{err.textContent='';}));
  $('.btn',el).addEventListener('click',run);fn.addEventListener('change',run);run();
});
})();
