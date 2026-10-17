const R={rows(){return db.grades.slice().sort((a,b)=>a.date<b.date?-1:1).map(g=>({'درس':G.subj(g.subjectId)?.name||'',تاریخ:g.date,نوع:g.type,نمره:+g.score,حداکثر:+g.max,'درصد':+G.pct(g).toFixed(2),ضریب:+g.weight||1,معلم:g.teacher||'',یادداشت:g.note||''}))},
 dl(name,data,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([data],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)},
 csv(){const r=this.rows();if(!r.length)return toast('نمره‌ای برای خروجی نیست',1);const h=Object.keys(r[0]);
  this.dl('grades.csv','\ufeff'+[h.join(','),...r.map(o=>h.map(k=>'"'+String(o[k]).replace(/"/g,'""')+'"').join(','))].join('\n'),'text/csv')},
 json(){this.dl('gradeflow-backup.json',JSON.stringify({...db,profile:db.profile&&{...db.profile,hash:undefined,salt:undefined}},null,1),'application/json')},
 restore(file){const r=new FileReader();r.onload=()=>{try{const d=JSON.parse(r.result);if(!Array.isArray(d.grades)||!Array.isArray(d.subjects))throw 0;
  if(!confirm('اطلاعات فعلی با پشتیبان جایگزین می‌شود. ادامه می‌دهی؟'))return;const keep=db.profile;db=Object.assign(Store.def(),d);db.profile=keep;Store.save();toast('بازیابی شد');App.render()}catch(e){toast('فایل پشتیبان معتبر نیست',1)}};r.readAsText(file)},
 xlsx(){if(!window.XLSX)return toast('کتابخانه Excel بارگذاری نشد (اینترنت لازم است)',1);const wb=XLSX.utils.book_new();
  const all=G.avg(db.grades);XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet([{'نام':db.profile?.name,'مدرسه':db.profile?.school,'سال تحصیلی':db.profile?.year,'تعداد نمرات':db.grades.length,'معدل کل (درصد)':all==null?'':+all.toFixed(2),['معدل کل از '+db.settings.max]:all==null?'':+G.on20(all).toFixed(2)}]),'خلاصه');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(this.rows()),'نمرات');
  XLSX.utils.book_append_sheet(wb,XLSX.utils.json_to_sheet(db.subjects.map(s=>{const l=G.forSubject(s.id),a=G.avg(l);return{'درس':s.name,'تعداد ارزیابی':l.length,'میانگین (درصد)':a==null?'':+a.toFixed(2)}})),'آمار درس‌ها');
  XLSX.writeFile(wb,'gradeflow-report.xlsx')},
 print(){const rows=this.rows(),a=G.avg(db.grades);const p=db.profile||{};
  document.getElementById('printArea')?.remove();const d=document.createElement('div');d.id='printArea';d.dir='rtl';
  d.innerHTML=`<h2>گزارش نمرات</h2><p>${esc(p.name)} — ${esc(p.school)} — پایه ${esc(p.grade)} ${esc(p.klass)} — ${esc(p.year)}</p><p>معدل کل: <b>${G.fmt(a)}</b> از ${db.settings.max}</p>
  <table class="tbl"><tr><th>درس</th><th>تاریخ</th><th>نوع</th><th>نمره</th><th>مقیاس</th></tr>${rows.map(r=>`<tr><td>${esc(r['درس'])}</td><td>${esc(r['تاریخ'])}</td><td>${esc(r['نوع'])}</td><td>${r['نمره']}</td><td>${r['حداکثر']}</td></tr>`).join('')}</table>
  <h3>میانگین درس‌ها</h3><table class="tbl">${db.subjects.map(s=>`<tr><td>${esc(s.name)}</td><td>${G.fmt(G.avg(G.forSubject(s.id)))}</td></tr>`).join('')}</table><p style="margin-top:50px">امضا: ____________</p>`;
  document.body.append(d);toast('در پنجره چاپ «ذخیره به‌صورت PDF» را انتخاب کن');setTimeout(()=>print(),300)}};
