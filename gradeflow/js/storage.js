const Store={key:'gradeflow.v1',
 def(){return{profile:null,settings:{appName:'GradeFlow',theme:'light',max:20,pass:10,target:17},subjects:[],grades:[]}},
 load(){try{return Object.assign(this.def(),JSON.parse(localStorage.getItem(this.key)||'{}'))}catch(e){return this.def()}},
 save(){localStorage.setItem(this.key,JSON.stringify(db))},
 wipe(){localStorage.removeItem(this.key);db=this.def()}};
let db=Store.load();
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
const toast=(m,err)=>{const t=document.createElement('div');t.className='toast'+(err?' err':'');t.textContent=m;document.getElementById('toasts').append(t);setTimeout(()=>t.remove(),3000)};
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
