import re, html, json
import os
C=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','courses','ces1102')+'/'
def text(h):
    h=re.sub(r'<(svg|script|style)\b.*?</\1>',' ',h,flags=re.S)
    h=re.sub(r'<[^>]+>',' ',h)
    return re.sub(r'\s+',' ',html.unescape(h)).strip()
idx=[]
for n in range(1,6):
    s=open(C+f'unit{n}.html').read()
    for m in re.finditer(r'<section class="lesson" id="([^"]+)" data-title="([^"]+)"',s):
        sid,title=m.group(1),html.unescape(m.group(2))
        a=m.start(); b=s.find('<section class="lesson"',a+10); b=len(s) if b<0 else b
        body=text(s[a:b])
        if sid.endswith('quiz'): continue
        name={'Practice lab':f'Unit {n} practice lab','Exam cheat sheet':f'Unit {n} cheat sheet'}.get(title,title)
        idx.append({'h':f'unit{n}.html#{sid}','t':name,'g':f'Unit {n}','x':body})
src=open(C+'data/sdl.js').read(); sdl=json.loads(src[src.index('PPS.SDL=')+8:src.rindex(';')])
for p in sdl:
    idx.append({'h':f'sdl.html#p{p["n"]}','t':f'Project {p["n"]}: {p["title"]}','g':'Projects','x':p['brief']+' '+' '.join(m[0] for m in p['milestones'])})
idx.append({'h':'exam.html','t':'End-semester exam preparation','g':'Exam prep','x':'Mock papers, marking schemes, revision plan, 5 questions of 10 marks, 180 minutes, 14 to 28 November.'})
idx.append({'h':'practice.html','t':'Assessment practice and drills','g':'Practice','x':'Assignment 2 and Assignment 3 practice, timed quiz, written questions, predict the output sprint, bug hunt, mixed practice.'})
open(C+'data/search.js','w').write('/* Search index, built from the lesson pages and projects. Rebuild it when lesson text changes. */\nPPS.SEARCH='+json.dumps(idx,ensure_ascii=False)+';\n')
print(len(idx),'entries', len(json.dumps(idx))//1024,'KB')
