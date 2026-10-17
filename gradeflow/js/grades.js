const G={pct:g=>g.max>0?g.score/g.max*100:null,
 valid:g=>Number.isFinite(+g.score)&&g.score!==''&&g.max>0,
 avg(list,weighted=true){const l=list.filter(this.valid);if(!l.length)return null;let s=0,w=0;l.forEach(g=>{const k=weighted?(+g.weight||1):1;s+=this.pct(g)*k;w+=k});return s/w},
 on20(p){return p==null?null:p/100*db.settings.max},
 fmt(p){return p==null?'—':G.on20(p).toFixed(2)},
 subj:id=>db.subjects.find(s=>s.id===id),
 forSubject:id=>db.grades.filter(g=>g.subjectId===id),
 needed(targetPct,list,nextMaxWeight=1){const l=list.filter(this.valid);let s=0,w=0;l.forEach(g=>{const k=+g.weight||1;s+=this.pct(g)*k;w+=k});return (targetPct*(w+nextMaxWeight)-s)/nextMaxWeight}};
