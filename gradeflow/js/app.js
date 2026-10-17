const TYPES=['امتحان','کوئیز','تکلیف','پروژه','شفاهی','فعالیت کلاسی'];
const App={page:'dashboard',charts:[],filter:{s:'',t:'',q:''},
 ic:{dashboard:'M3 12l9-8 9 8M5 10v10h14V10',grades:'M5 3h14v18H5zM9 8h6M9 12h6M9 16h4',subjects:'M4 5h16M4 12h16M4 19h10',reports:'M12 3v12m0 0l-4-4m4 4l4-4M4 20h16',settings:'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12l2-1-2-4-2 1-2-1-1-2h-4l-1 2-2 1-2-1-2 4 2 1v2l-2 1 2 4 2-1 2 1 1 2h4l1-2 2-1 2 1 2-4-2-1z'},
 pages:{dashboard:'داشبورد',grades:'نمرات',subjects:'درس‌ها',reports:'گزارش‌ها',settings:'تنظیمات'},
 init(){document.documentElement.dataset.theme=db.settings.theme;
  document.getElementById('burger').onclick=()=>side.classList.toggle('open');
  logout.onclick=()=>{sessionStorage.removeItem('gf');location.reload()};
  if(sessionStorage.getItem('gf')&&db.profile)return this.start();
  auth.hidden=false;const reg=!db.profile;regFields.hidden=!reg;authBtn.textContent=reg?'ساخت حساب':'ورود';
  if(!reg)authHint.textContent='خوش آمدی '+db.profile.name+'. وارد شو.';
  authForm.onsubmit=async e=>{e.preventDefault();const f=Object.fromEntries(new FormData(authForm));
   if(!window.crypto?.subtle)return toast('این مرورگر یا آدرس از رمزنگاری پشتیبانی نمی‌کند (HTTPS لازم است)',1);
   if(reg){if(!f.name||f.pass.length<4)return toast('نام و رمز (حداقل ۴ نویسه) لازم است',1);await Auth.register(f)}
   else if(!await Auth.check(f.user,f.pass))return toast('نام کاربری یا رمز اشتباه است',1);
   sessionStorage.setItem('gf',1);this.start()}},
 start(){auth.hidden=true;app.hidden=false;appName.textContent=db.settings.appName;document.title=db.settings.appName;
  nav.innerHTML=Object.entries(this.pages).map(([k,v])=>`<a data-p="${k}"><svg viewBox="0 0 24 24"><path d="${this.ic[k]}"/></svg>${v}</a>`).join('');
  nav.onclick=e=>{const p=e.target.dataset.p;if(p){this.page=p;side.classList.remove('open');this.render()}};this.render()},
 render(){this.charts.forEach(c=>c.destroy());this.charts=[];nav.querySelectorAll('a').forEach(a=>a.classList.toggle('on',a.dataset.p===this.page));view.innerHTML=this['v_'+this.page]()},
 chart(id,cfg){if(window.Chart){const c=document.getElementById(id);if(c)this.charts.push(new Chart(c,cfg))}},
 v_dashboard(){const gs=db.grades.filter(G.valid),a=G.avg(gs),ps=gs.map(g=>G.pct(g)),pr=a==null?'—':Math.round(a)+'٪';
  setTimeout(()=>{const ss=db.subjects.filter(s=>G.forSubject(s.id).some(G.valid));
   this.chart('c1',{type:'bar',data:{labels:ss.map(s=>s.name),datasets:[{data:ss.map(s=>+G.avg(G.forSubject(s.id)).toFixed(1)),backgroundColor:ss.map(s=>s.color)}]},options:{plugins:{legend:{display:false}}}});
   const t=gs.slice().sort((a,b)=>a.date<b.date?-1:1);this.chart('c2',{type:'line',data:{labels:t.map(g=>g.date),datasets:[{data:t.map(g=>+G.pct(g).toFixed(1)),borderColor:'#14c8c0',tension:.3}]},options:{plugins:{legend:{display:false}}}})},0);
  const low=gs.filter(g=>G.on20(G.pct(g))<db.settings.pass).length;
  return `<div class="card hero"><div class="ring" style="--p:${a==null?0:Math.round(a)}"><b>${G.fmt(a)}</b><span>از ${db.settings.max}</span></div><div><h1>سلام ${esc((db.profile.name||'').split(' ')[0])}</h1><p>${a==null?'اولین نمره‌ات را ثبت کن تا معدلت اینجا نشان داده شود.':'معدل کل تو بر پایهٔ '+gs.length+' ارزیابی، با نمرهٔ هدف '+db.settings.target+'.'}</p></div></div><div class="grid">${[['نمرات',db.grades.length],['درس‌ها',db.subjects.length],['بالاترین',ps.length?G.on20(Math.max(...ps)).toFixed(2):'—'],['پایین‌ترین',ps.length?G.on20(Math.min(...ps)).toFixed(2):'—'],['درصد کل',pr]].map(([l,v])=>`<div class="card stat"><b>${v}</b><span>${l}</span></div>`).join('')}</div>
  ${this.soon()}${low?`<p class="card alert">هشدار: ${low} نمره زیر حد قبولی (${db.settings.pass}) است.</p>`:''}
  ${gs.length?`<div class="two"><div class="card"><canvas id="c1"></canvas></div><div class="card"><canvas id="c2"></canvas></div></div>
  <div class="card" style="margin-top:14px"><h3>آخرین نمرات</h3>${this.table(db.grades.slice(-5).reverse(),false)}</div>`:'<div class="card empty">هنوز نمره‌ای ثبت نشده. ابتدا یک درس بساز، سپس در بخش نمرات اولین نمره را ثبت کن.</div>'}`},
 table(list,act=true){return `<div class="wrap"><table class="tbl"><tr><th>درس</th><th>تاریخ</th><th>نوع</th><th>نمره</th><th>درصد</th>${act?'<th></th>':''}</tr>${list.map(g=>{const s=G.subj(g.subjectId),p=G.pct(g);return `<tr><td><i class="dot" style="background:${s?.color}"></i>${esc(s?.name)}</td><td>${esc(g.date)}</td><td><span class="tag">${esc(g.type)}</span></td><td>${g.score}/${g.max}</td><td><span class="badge ${G.on20(p)<db.settings.pass?'low':G.on20(p)>=db.settings.target?'good':''}">${p.toFixed(1)}</span></td>${act?`<td><button class="ghost" onclick="App.gradeForm('${g.id}')">ویرایش</button> <button class="ghost" onclick="App.delGrade('${g.id}')">حذف</button></td>`:''}</tr>`}).join('')}</table></div>`},
 v_grades(){const f=this.filter;let l=db.grades.filter(g=>(!f.s||g.subjectId===f.s)&&(!f.t||g.type===f.t)&&(!f.q||(G.subj(g.subjectId)?.name+g.note+g.date).includes(f.q)));
  l.sort((a,b)=>a.date<b.date?1:-1);const avg=G.avg(l),avgS=G.avg(l,false);
  return `<h1>نمرات</h1><div class="card"><div class="row"><select onchange="App.filter.s=this.value;App.render()"><option value="">همه درس‌ها</option>${db.subjects.map(s=>`<option value="${s.id}" ${f.s===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select>
  <select onchange="App.filter.t=this.value;App.render()"><option value="">همه انواع</option>${TYPES.map(t=>`<option ${f.t===t?'selected':''}>${t}</option>`).join('')}</select>
  <input placeholder="جست‌وجو" value="${esc(f.q)}" onchange="App.filter.q=this.value;App.render()"><button class="btn" onclick="App.gradeForm()">ثبت نمره</button></div>
  <p>میانگین وزنی: <b>${G.fmt(avg)}</b> | میانگین ساده: <b>${G.fmt(avgS)}</b> (از ${db.settings.max}؛ فرمول وزنی: مجموع درصد×ضریب ÷ مجموع ضرایب)</p>
  ${l.length?this.table(l):'<p>نمره‌ای پیدا نشد.</p>'}</div>`},
 gradeForm(id){if(!db.subjects.length)return toast('ابتدا یک درس بساز',1);const g=db.grades.find(x=>x.id===id)||{date:new Date().toISOString().slice(0,10),type:TYPES[0],max:db.settings.max,weight:1};
  dlg.innerHTML=`<form id="gf"><h3>${id?'ویرایش':'ثبت'} نمره</h3><label>درس<select name="subjectId">${db.subjects.map(s=>`<option value="${s.id}" ${g.subjectId===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select></label>
  <div class="row"><label>تاریخ<input type="date" name="date" value="${g.date}" required></label><label>نوع<select name="type">${TYPES.map(t=>`<option ${g.type===t?'selected':''}>${t}</option>`).join('')}</select></label></div>
  <div class="row"><label>نمره<input type="number" step="any" name="score" value="${g.score??''}" required></label><label>حداکثر<input type="number" step="any" name="max" value="${g.max}" required></label><label>ضریب<input type="number" step="any" name="weight" value="${g.weight}"></label></div>
  <label>معلم<input name="teacher" value="${esc(g.teacher)}"></label><label>یادداشت<textarea name="note">${esc(g.note)}</textarea></label>
  <div class="row"><button class="btn">ذخیره</button><button type="button" class="ghost" onclick="dlg.close()">انصراف</button></div></form>`;dlg.showModal();
  gf.onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(gf));f.score=+f.score;f.max=+f.max;f.weight=+f.weight||1;
   if(!(f.max>0)||f.score<0||f.score>f.max)return toast('نمره باید بین ۰ و حداکثر باشد',1);
   if(id)Object.assign(g,f);else db.grades.push({id:uid(),...f});Store.save();dlg.close();toast(id?'نمره ویرایش شد':'نمره ثبت شد');this.render()}},
 delGrade(id){if(confirm('این نمره حذف شود؟')){db.grades=db.grades.filter(g=>g.id!==id);Store.save();toast('نمره حذف شد');this.render()}},
 v_subjects(){return `<h1>درس‌ها</h1><div class="card"><button class="btn" onclick="App.subjForm()">افزودن درس</button>
  <div class="wrap"><table class="tbl"><tr><th>درس</th><th>ارزیابی‌ها</th><th>میانگین</th><th></th></tr>${db.subjects.map(s=>{const l=G.forSubject(s.id);return `<tr><td><i class="dot" style="background:${s.color}"></i>${esc(s.name)}</td><td>${l.length}</td><td>${G.fmt(G.avg(l))}</td><td><button class="ghost" onclick="App.subjForm('${s.id}')">ویرایش</button> <button class="ghost" onclick="App.delSubj('${s.id}')">حذف</button></td></tr>`}).join('')}</table></div>${db.subjects.length?'':'<p>درسی نیست. اولین درس را اضافه کن.</p>'}</div>`},
 subjForm(id){const s=db.subjects.find(x=>x.id===id)||{name:'',color:'#1f6bff'};
  dlg.innerHTML=`<form id="sf"><h3>${id?'ویرایش':'افزودن'} درس</h3><label>نام درس<input name="name" value="${esc(s.name)}" required></label><label>رنگ<input type="color" name="color" value="${s.color}"></label><div class="row"><button class="btn">ذخیره</button><button type="button" class="ghost" onclick="dlg.close()">انصراف</button></div></form>`;dlg.showModal();
  sf.onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(sf));f.name=f.name.trim();if(!f.name)return toast('نام درس لازم است',1);
   if(db.subjects.some(x=>x.name===f.name&&x.id!==id))return toast('این درس قبلاً وجود دارد',1);
   if(id)Object.assign(s,f);else db.subjects.push({id:uid(),...f});Store.save();dlg.close();toast('ذخیره شد');this.render()}},
 delSubj(id){const n=G.forSubject(id).length;if(n)return toast(`این درس ${n} نمره دارد. اول نمرات را حذف کن`,1);if(confirm('درس حذف شود؟')){db.subjects=db.subjects.filter(s=>s.id!==id);Store.save();this.render()}},
 v_reports(){return `<h1>گزارش‌ها</h1><div class="card"><div class="row"><button class="btn" onclick="R.print()">گزارش PDF (چاپ A4)</button><button class="btn" onclick="R.xlsx()">Excel (XLSX)</button><button class="ghost" onclick="R.csv()">CSV</button><button class="ghost" onclick="R.json()">پشتیبان JSON</button>
  <label class="ghost" style="flex:0;cursor:pointer;margin:0">بازیابی پشتیبان<input type="file" accept=".json" hidden onchange="R.restore(this.files[0])"></label></div></div>`},
 v_settings(){const s=db.settings,p=db.profile;return `<h1>تنظیمات</h1><form class="card" id="st"><label>نام برنامه<input name="appName" value="${esc(s.appName)}"></label>
  <div class="row"><label>مقیاس نمره<input type="number" name="max" value="${s.max}"></label><label>حد قبولی<input type="number" step="any" name="pass" value="${s.pass}"></label><label>نمره هدف<input type="number" step="any" name="target" value="${s.target}"></label></div>
  <label>تم<select name="theme"><option value="light" ${s.theme==='light'?'selected':''}>روشن</option><option value="dark" ${s.theme==='dark'?'selected':''}>تاریک</option></select></label>
  <label>نام<input name="pname" value="${esc(p.name)}"></label><label>مدرسه<input name="school" value="${esc(p.school)}"></label>
  <div class="row"><label>پایه<input name="grade" value="${esc(p.grade)}"></label><label>کلاس<input name="klass" value="${esc(p.klass)}"></label><label>سال تحصیلی<input name="year" value="${esc(p.year)}"></label></div>
  <div class="row"><button class="btn">ذخیره تنظیمات</button><button type="button" class="danger" onclick="App.wipe()">پاک‌کردن کامل اطلاعات</button></div></form>
  <div class="card" style="margin-top:14px"><b>نمره لازم برای هدف</b><p>${db.grades.filter(G.valid).length?`برای رسیدن به معدل ${s.target} با یک ارزیابی بعدی هم‌ضریب، باید حدود <b>${Math.min(...[1]).toString()&&G.on20(G.needed(s.target/s.max*100,db.grades)).toFixed(2)}</b> بگیری${G.on20(G.needed(s.target/s.max*100,db.grades))>s.max?' (بیشتر از حداکثر؛ با یک ارزیابی ممکن نیست)':''}.`:'پس از ثبت نمره محاسبه می‌شود.'}</p></div>`},
 wipe(){if(confirm('همه اطلاعات برای همیشه پاک شود؟ (ابتدا پشتیبان بگیر)')){Store.wipe();sessionStorage.clear();location.reload()}}};
document.addEventListener('submit',e=>{if(e.target.id!=='st')return;e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
 if(!(f.max>0))return toast('مقیاس نامعتبر است',1);Object.assign(db.settings,{appName:f.appName||'GradeFlow',max:+f.max,pass:+f.pass,target:+f.target,theme:f.theme});
 Object.assign(db.profile,{name:f.pname,school:f.school,grade:f.grade,klass:f.klass,year:f.year});Store.save();
 document.documentElement.dataset.theme=f.theme;appName.textContent=db.settings.appName;toast('ذخیره شد');App.render()});
