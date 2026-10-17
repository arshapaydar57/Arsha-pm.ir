const PR={1:'کم',2:'متوسط',3:'زیاد'},today=()=>new Date().toISOString().slice(0,10);
const days=d=>Math.round((new Date(d)-new Date(today()))/864e5);
Object.assign(App,{
 soon(){const l=db.exams.filter(e=>days(e.date)>=0&&days(e.date)<=7),t=db.tasks.filter(x=>!x.done&&days(x.due)<0);
  return (l.length?`<p class="card alert warn">امتحان نزدیک: ${l.map(e=>esc(G.subj(e.subjectId)?.name)+' ('+(days(e.date)||'امروز')+(days(e.date)?' روز دیگر':'')+')').join('، ')}</p>`:'')+(t.length?`<p class="card alert">${t.length} تکلیف از مهلت گذشته است.</p>`:'')},
 v_planner(){const ex=db.exams.slice().sort((a,b)=>a.date<b.date?-1:1),tk=db.tasks.slice().sort((a,b)=>a.done-b.done||a.due.localeCompare(b.due));
  const opt=s=>db.subjects.map(x=>`<option value="${x.id}" ${x.id===s?'selected':''}>${esc(x.name)}</option>`).join('');
  return `<h1>برنامه</h1><p class="sub">امتحان‌ها، تکالیف و یادداشت‌های درسی</p><div class="two"><div class="card"><div class="row" style="justify-content:space-between"><h3>تقویم امتحانات</h3><button class="btn" onclick="App.itemForm('exams')">افزودن</button></div>
  ${ex.length?ex.map(e=>{const d=days(e.date);return `<div class="item"><i class="dot" style="background:${G.subj(e.subjectId)?.color}"></i><div><b>${esc(e.title||G.subj(e.subjectId)?.name)}</b><small>${esc(G.subj(e.subjectId)?.name)} · ${esc(e.date)}</small></div><span class="badge ${d<0?'':d<=7?'low':'good'}">${d<0?'گذشته':d===0?'امروز':d+' روز'}</span><button class="ghost" onclick="App.delItem('exams','${e.id}')">حذف</button></div>`}).join(''):'<p class="empty">امتحانی ثبت نشده.</p>'}</div>
  <div class="card"><div class="row" style="justify-content:space-between"><h3>برنامه تکالیف</h3><button class="btn" onclick="App.itemForm('tasks')">افزودن</button></div>
  ${tk.length?tk.map(x=>`<div class="item ${x.done?'done':''}"><input type="checkbox" ${x.done?'checked':''} onchange="App.toggle('${x.id}')"><div><b>${esc(x.title)}</b><small>${esc(G.subj(x.subjectId)?.name)} · مهلت ${esc(x.due)} · اولویت ${PR[x.prio]}</small></div><button class="ghost" onclick="App.delItem('tasks','${x.id}')">حذف</button></div>`).join(''):'<p class="empty">تکلیفی ثبت نشده.</p>'}</div></div>
  <div class="card" style="margin-top:16px"><h3>یادداشت و برنامه مطالعه هر درس</h3>${db.subjects.length?db.subjects.map(s=>`<label><span><i class="dot" style="background:${s.color}"></i>${esc(s.name)}</span><textarea onchange="App.note('${s.id}',this.value)" placeholder="نکته‌های مهم، فصل‌ها، برنامه مطالعه...">${esc(s.note)}</textarea></label>`).join(''):'<p class="empty">ابتدا درس اضافه کن.</p>'}</div>`},
 note(id,v){G.subj(id).note=v;Store.save();toast('یادداشت ذخیره شد')},
 toggle(id){const t=db.tasks.find(x=>x.id===id);t.done=!t.done;Store.save();this.render()},
 delItem(k,id){if(confirm('حذف شود؟')){db[k]=db[k].filter(x=>x.id!==id);Store.save();this.render()}},
 itemForm(k){if(!db.subjects.length)return toast('ابتدا یک درس بساز',1);const ex=k==='exams';
  dlg.innerHTML=`<form id="pf"><h3>${ex?'امتحان جدید':'تکلیف جدید'}</h3><label>درس<select name="subjectId">${db.subjects.map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label><label>عنوان<input name="title" ${ex?'':'required'}></label>
  <div class="row"><label>${ex?'تاریخ':'مهلت'}<input type="date" name="${ex?'date':'due'}" value="${today()}" required></label>${ex?'':'<label>اولویت<select name="prio"><option value="1">کم</option><option value="2" selected>متوسط</option><option value="3">زیاد</option></select></label>'}</div>
  <div class="row"><button class="btn">ذخیره</button><button type="button" class="ghost" onclick="dlg.close()">انصراف</button></div></form>`;dlg.showModal();
  pf.onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(pf));if(!ex)f.prio=+f.prio,f.done=false;db[k].push({id:uid(),...f});Store.save();dlg.close();toast('ذخیره شد');this.render()}},
 monthly(){const m={};db.grades.filter(G.valid).forEach(g=>(m[g.date.slice(0,7)]??=[]).push(g));return Object.keys(m).sort().map(k=>[k,G.avg(m[k]),m[k].length])},
 cmpForm(){const q=n=>cmp.elements[n].value,r=(a,b)=>db.grades.filter(g=>(!a||g.date>=a)&&(!b||g.date<=b)),
  x=G.avg(r(q('a1'),q('b1'))),y=G.avg(r(q('a2'),q('b2')));if(x==null||y==null)return toast('در یکی از بازه‌ها نمره‌ای نیست',1);
  const d=G.on20(y)-G.on20(x);cmpOut.innerHTML=`بازه ۱: <b>${G.fmt(x)}</b> | بازه ۲: <b>${G.fmt(y)}</b> — <b class="${d<0?'low':''}">${d>0?'پیشرفت':d<0?'افت':'بدون تغییر'} ${Math.abs(d).toFixed(2)}</b>`}});
Object.assign(App.pages,{planner:'برنامه'});App.ic.planner='M7 3v3M17 3v3M4 8h16M5 5h14v16H5zM9 13l2 2 4-4';
const _rep=App.v_reports;App.v_reports=function(){return _rep.call(this)+`<div class="two" style="margin-top:16px"><div class="card"><h3>معدل ماهانه</h3>${this.monthly().map(([k,a,n])=>`<div class="item"><b>${k}</b><small>${n} ارزیابی</small><span class="badge">${G.fmt(a)}</span></div>`).join('')||'<p class="empty">داده‌ای نیست.</p>'}</div>
 <form class="card" id="cmp" onsubmit="event.preventDefault();App.cmpForm()"><h3>مقایسه دو بازه</h3><div class="row"><label>بازه ۱ از<input type="date" name="a1"></label><label>تا<input type="date" name="b1"></label></div><div class="row"><label>بازه ۲ از<input type="date" name="a2"></label><label>تا<input type="date" name="b2"></label></div><button class="btn">مقایسه</button><p id="cmpOut"></p></form></div>`};
App.init();
