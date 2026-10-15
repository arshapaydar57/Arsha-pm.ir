/* NEXORA (no-server version). Data lives in this browser (localStorage).
   Features: multiple accounts, Jalali/Gregorian dates, Toman/Rial, separate income/expense categories, bilingual exports. */
const T = {
  en: { dashboard:'Dashboard', transactions:'Transactions', reports:'Reports', settings:'Settings', logout:'Log out', login:'Log in', signup:'Create account',
    name:'Full name', email:'Email', password:'Password', confirm:'Confirm password', remember:'Remember me', forgot:'Forgot password?',
    forgot_msg:'Password reset by email is not available yet.', have:'Already have an account?', noacc:'New to NEXORA?',
    err_name:'Enter your full name (2+ characters).', err_email:'Enter a valid email address.', err_pw:'Use at least 8 characters.', err_match:'Passwords do not match.',
    err_email_taken:'This email is already registered.', err_bad_credentials:'Email or password is incorrect.', err_server:'Something went wrong. Try again.',
    err_too_many:'Too many attempts. Try again in a few minutes.', err_invalid:'Check the highlighted fields.', err_amount:'Enter an amount above 0.', err_date:'Choose a date.', err_req:'Required.',
    balance:'Total balance', income_m:'Income this month', expense_m:'Spent this month', trend:'Monthly trend', by_cat:'Spending by category', recent:'Recent transactions',
    view_all:'View all', add:'+ Add transaction', edit:'Edit transaction', new:'New transaction', type:'Type', income:'Income', expense:'Expense', amount:'Amount', category:'Category',
    description:'Description', date:'Date', save:'Save', cancel:'Cancel', delete:'Delete', edit_b:'Edit', search:'Search descriptions', all:'All', from:'From', to:'To',
    export:'Export', export_t:'Export report', excel:'Download Excel', pdf:'Download PDF', empty:'No transactions yet. Add your first one.', confirm_del:'Delete this transaction?',
    saved:'Saved', deleted:'Deleted', language:'Language', no_data:'No data this month', actions:'Actions',
    cat_salary:'Salary', cat_freelance:'Freelance', cat_food:'Food', cat_rent:'Rent', cat_transport:'Transport', cat_shopping:'Shopping', cat_health:'Health', cat_entertainment:'Entertainment', cat_bills:'Bills', cat_other:'Other' },
  fa: { dashboard:'داشبورد', transactions:'تراکنش‌ها', reports:'گزارش‌ها', settings:'تنظیمات', logout:'خروج', login:'ورود', signup:'ساخت حساب',
    name:'نام کامل', email:'ایمیل', password:'رمز عبور', confirm:'تکرار رمز عبور', remember:'مرا به خاطر بسپار', forgot:'رمز را فراموش کرده‌اید؟',
    forgot_msg:'بازیابی رمز از طریق ایمیل هنوز فعال نیست.', have:'حساب دارید؟', noacc:'در نکسورا تازه‌اید؟',
    err_name:'نام کامل را وارد کنید (حداقل ۲ نویسه).', err_email:'یک ایمیل معتبر وارد کنید.', err_pw:'رمز باید حداقل ۸ نویسه باشد.', err_match:'رمزها یکسان نیستند.',
    err_email_taken:'این ایمیل قبلاً ثبت شده است.', err_bad_credentials:'ایمیل یا رمز عبور اشتباه است.', err_server:'مشکلی پیش آمد. دوباره تلاش کنید.',
    err_too_many:'تلاش بیش از حد. چند دقیقه بعد دوباره امتحان کنید.', err_invalid:'فیلدهای مشخص‌شده را بررسی کنید.', err_amount:'مبلغی بزرگ‌تر از ۰ وارد کنید.', err_date:'تاریخ را انتخاب کنید.', err_req:'الزامی است.',
    balance:'موجودی کل', income_m:'درآمد این ماه', expense_m:'هزینه این ماه', trend:'روند ماهانه', by_cat:'هزینه به تفکیک دسته', recent:'تراکنش‌های اخیر',
    view_all:'مشاهده همه', add:'+ افزودن تراکنش', edit:'ویرایش تراکنش', new:'تراکنش جدید', type:'نوع', income:'درآمد', expense:'هزینه', amount:'مبلغ', category:'دسته‌بندی',
    description:'توضیحات', date:'تاریخ', save:'ذخیره', cancel:'انصراف', delete:'حذف', edit_b:'ویرایش', search:'جستجو در توضیحات', all:'همه', from:'از', to:'تا',
    export:'خروجی', export_t:'خروجی گزارش', excel:'دانلود اکسل', pdf:'دانلود PDF', empty:'هنوز تراکنشی ثبت نشده. اولین را اضافه کنید.', confirm_del:'این تراکنش حذف شود؟',
    saved:'ذخیره شد', deleted:'حذف شد', language:'زبان', no_data:'این ماه داده‌ای نیست', actions:'عملیات',
    cat_salary:'حقوق', cat_freelance:'پروژه آزاد', cat_food:'خوراک', cat_rent:'اجاره', cat_transport:'حمل‌ونقل', cat_shopping:'خرید', cat_health:'سلامت', cat_entertainment:'سرگرمی', cat_bills:'قبوض', cat_other:'سایر' }
};
Object.assign(T.en, { accounts:'Accounts', account:'Account', all_accounts:'All accounts', add_account:'Add account', account_name:'Account name', rename:'Rename', currency:'Currency',
  toman:'Toman', rial:'Rial', calendar:'Calendar', jalali:'Persian (Jalali)', gregorian:'Gregorian', display_cur:'Show totals in', rate_note:'1 Toman = 10 Rial', export_lang:'Report language',
  persian:'Persian', english:'English', main_acc:'Main account', err_account_has_tx:'This account has transactions. Delete them first.', err_last_account:'You need at least one account.',
  err_acc_name:'Enter an account name.' });
Object.assign(T.fa, { accounts:'حساب‌ها', account:'حساب', all_accounts:'همه حساب‌ها', add_account:'افزودن حساب', account_name:'نام حساب', rename:'تغییر نام', currency:'واحد پول',
  toman:'تومان', rial:'ریال', calendar:'تقویم', jalali:'شمسی (جلالی)', gregorian:'میلادی', display_cur:'نمایش مجموع‌ها به', rate_note:'۱ تومان = ۱۰ ریال', export_lang:'زبان گزارش',
  persian:'فارسی', english:'English', main_acc:'حساب اصلی', err_account_has_tx:'این حساب تراکنش دارد. اول آن‌ها را حذف کنید.', err_last_account:'حداقل یک حساب لازم است.',
  err_acc_name:'نام حساب را وارد کنید.' });

Object.assign(T.en, { add_btn:'Add transaction', welcome:'Welcome back', savings:'Savings rate', brand_h:'Your money, finally clear.', brand_s:'Track every account, in Toman or Rial, with a calendar that fits you.',
  sub_login:'Log in to continue.', sub_signup:'Create your account in under a minute.', trend_sub:'Last 6 months' });
Object.assign(T.fa, { add_btn:'افزودن تراکنش', welcome:'خوش آمدید', savings:'نرخ پس‌انداز', brand_h:'پول شما، بالاخره شفاف.', brand_s:'همه حساب‌ها را به تومان یا ریال و با تقویم دلخواه دنبال کنید.',
  sub_login:'برای ادامه وارد شوید.', sub_signup:'ساخت حساب کمتر از یک دقیقه طول می‌کشد.', trend_sub:'۶ ماه اخیر' });

/* ---------- icons + small UI helpers ---------- */
const ICO = { dash:'<rect width="7" height="9" x="3" y="3" rx="1.5"/><rect width="7" height="5" x="14" y="3" rx="1.5"/><rect width="7" height="9" x="14" y="12" rx="1.5"/><rect width="7" height="5" x="3" y="16" rx="1.5"/>',
  swap:'<path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/>', chart:'<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',
  gear:'<path d="M20 7h-9"/><path d="M14 17H5"/><circle cx="17" cy="17" r="3"/><circle cx="7" cy="7" r="3"/>', out:'<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
  target:'<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>', x:'<path d="M18 6 6 18"/><path d="m6 6 12 12"/>', check:'<path d="M20 6 9 17l-5-5"/>', filter:'<path d="M3 5h18"/><path d="M6 12h12"/><path d="M10 19h4"/>', plus:'<path d="M5 12h14"/><path d="M12 5v14"/>', up:'<path d="M7 7h10v10"/><path d="M7 17 17 7"/>', down:'<path d="M17 7 7 17"/><path d="M17 17H7V7"/>',
  wallet:'<path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2"/><path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>',
  search:'<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>', dl:'<path d="M12 15V3"/><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/>',
  eye:'<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>', pct:'<path d="m19 5-14 14"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/>' };
const ico = (n, z = 18) => `<svg width="${z}" height="${z}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICO[n]}</svg>`;
function countTo(el, to, fmt = v => v) {
  if (matchMedia('(prefers-reduced-motion:reduce)').matches) { el.textContent = fmt(to); return; }
  const s0 = performance.now(); (function f(n) { const p = Math.min((n - s0) / 900, 1); el.textContent = fmt(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(s0);
}
function spark(vals, w = 340, h = 96) {   // smooth gradient line with soft fill
  const mn = Math.min(...vals), mx = Math.max(...vals), sy = v => h - 10 - ((v - mn) / ((mx - mn) || 1)) * (h - 24), pts = vals.map((v, i) => [i / (vals.length - 1) * w, sy(v)]);
  const d = pts.map((p, i) => { if (!i) return `M${p[0]} ${p[1]}`; const c = (pts[i - 1][0] + p[0]) / 2; return `C${c} ${pts[i - 1][1]} ${c} ${p[1]} ${p[0]} ${p[1]}`; }).join(' ');
  const ly = pts[pts.length - 1][1] / h * 100;
  return `<div class="sw"><svg viewBox="0 0 ${w} ${h}" class="spark" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="sg" x1="0" x2="1"><stop offset="0" stop-color="#6366F1"/><stop offset=".55" stop-color="#8B5CF6"/><stop offset="1" stop-color="#EC4899"/></linearGradient><linearGradient id="sf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8B5CF6" stop-opacity=".32"/><stop offset="1" stop-color="#8B5CF6" stop-opacity="0"/></linearGradient></defs><path d="${d} L${w} ${h} L0 ${h}Z" fill="url(#sf)"/><path class="line" d="${d}" fill="none" stroke="url(#sg)" stroke-width="2.5" stroke-linecap="round" vector-effect="non-scaling-stroke"/></svg><i class="dot" style="top:${ly}%"></i></div>`;
}
function initAuth() {   // language switch + show/hide password on login/signup
  const lg = document.getElementById('lg'); if (lg) { lg.textContent = L === 'fa' ? 'EN' : 'FA'; lg.onclick = () => setLang(L === 'fa' ? 'en' : 'fa'); }
  document.querySelectorAll('[data-eye]').forEach(b => b.onclick = () => { const i = b.parentNode.querySelector('input'); i.type = i.type === 'password' ? 'text' : 'password'; });
}

/* ---------- categories: separate lists for expenses and income ---------- */
const CAT = { transfer:['Transfer','انتقال'], fees:['Fees & commissions','کارمزد'], groceries:['Groceries','خواربار'], restaurants:['Restaurants & cafes','رستوران و کافه'], food:['Food','خوراک'], rent:['Rent','اجاره'], bills:['Bills & utilities','قبوض'],
  internet:['Internet & phone','اینترنت و تلفن'], transport:['Transport','حمل‌ونقل'], fuel:['Fuel','بنزین'], car:['Car & repairs','خودرو و تعمیرات'], health:['Health','سلامت'],
  education:['Education','آموزش'], shopping:['Shopping','خرید'], clothing:['Clothing','پوشاک'], entertainment:['Entertainment','سرگرمی'], travel:['Travel','سفر'], gifts:['Gifts','هدیه'],
  charity:['Charity','کمک خیریه'], insurance:['Insurance','بیمه'], loans:['Loans & installments','وام و قسط'], subscriptions:['Subscriptions','اشتراک‌ها'], other:['Other','سایر'],
  salary:['Salary','حقوق'], freelance:['Freelance','پروژه آزاد'], business:['Business','کسب‌وکار'], investment:['Investment','سرمایه‌گذاری'], interest:['Bank interest','سود بانکی'],
  rent_income:['Rental income','درآمد اجاره'], bonus:['Bonus','پاداش'], gift_in:['Gift received','هدیه دریافتی'], refund:['Refund','بازگشت وجه'], sale:['Sale','فروش'], other_in:['Other income','سایر درآمدها'] };
const EXP_CATS = ['groceries','restaurants','food','rent','bills','internet','transport','fuel','car','health','education','shopping','clothing','entertainment','travel','gifts','charity','insurance','loans','subscriptions','fees','other'];
const INC_CATS = ['salary','freelance','business','investment','interest','rent_income','bonus','gift_in','refund','sale','other_in'];
const catName = (c, l = typeof L === 'undefined' ? 'en' : L) => (CAT[c] || [c, c])[l === 'fa' ? 1 : 0];

/* ---------- language, calendar and currency preferences ---------- */
const PREF = (() => { try { return JSON.parse(localStorage.getItem('nexora:prefs')) || {}; } catch (e) { return {}; } })();
const THEME = (() => {   // light / dark / auto (follows the device). The landing page locks itself to dark.
  const h = document.documentElement; if (h.hasAttribute('data-lock')) return 'dark';
  const th = PREF.theme === 'light' || PREF.theme === 'dark' ? PREF.theme : (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  h.dataset.theme = th; const mt = document.querySelector && document.querySelector('meta[name=theme-color]'); if (mt) mt.content = th === 'light' ? '#F4F5F9' : '#09090E'; return th;
})();
const L = (() => { let s; try { s = localStorage.getItem('nexora-lang'); } catch (e) {}
  return s === 'fa' || s === 'en' ? s : (navigator.language || '').toLowerCase().startsWith('fa') ? 'fa' : 'en'; })();
const CAL = PREF.cal || (L === 'fa' ? 'jalali' : 'gregorian');
const CUR = PREF.cur || 'IRT';
document.documentElement.lang = L; document.documentElement.dir = L === 'fa' ? 'rtl' : 'ltr';
const t = k => T[L][k] ?? k;
function setPref(k, v) { PREF[k] = v; localStorage.setItem('nexora:prefs', JSON.stringify(PREF)); location.reload(); }
function setLang(l) { try { localStorage.setItem('nexora-lang', l); } catch (e) {} location.reload(); }
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));
const num = (n, l = L) => new Intl.NumberFormat(l === 'fa' ? 'fa-IR' : 'en-US', { useGrouping: false }).format(n);
function i18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach(e => e.textContent = t(e.dataset.i18n));
  root.querySelectorAll('[data-ph]').forEach(e => e.placeholder = t(e.dataset.ph));
}
function toast(msg, act) {
  const e = document.createElement('div'); e.className = 'toast'; e.textContent = msg;
  if (act) { const b = document.createElement('button'); b.textContent = act.label; b.onclick = () => { act.fn(); e.remove(); }; e.append(b); }
  document.body.append(e); const ms = act ? 5200 : 2400; setTimeout(() => e.classList.add('out'), ms); setTimeout(() => e.remove(), ms + 350);
}

/* Currency: Toman and Rial (1 Toman = 10 Rial) */
const CURS = { IRT: ['Toman', 'تومان'], IRR: ['Rial', 'ریال'] };
const curName = (c, l = L) => CURS[c][l === 'fa' ? 1 : 0];
const conv = (v, from, to) => from === to ? v : from === 'IRT' ? v * 10 : v / 10;
const money = (n, c = CUR, l = L) => (PREF.hide ? '••••' : new Intl.NumberFormat(l === 'fa' ? 'fa-IR' : 'en-US', { maximumFractionDigits: 2 }).format(n || 0)) + ' ' + curName(c, l);   // PREF.hide = privacy mode

/* Jalali (Persian) calendar via the browser's built-in Intl; dates are always stored as Gregorian YYYY-MM-DD */
const JM = { fa: ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'], en: ['Farvardin','Ordibehesht','Khordad','Tir','Mordad','Shahrivar','Mehr','Aban','Azar','Dey','Bahman','Esfand'] };
const pfm = new Intl.DateTimeFormat('en-u-ca-persian-nu-latn', { year: 'numeric', month: 'numeric', day: 'numeric', timeZone: 'UTC' });
const todayISO = () => new Date(Date.now() - new Date().getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
function toJ(iso) { const p = {}; pfm.formatToParts(new Date(iso + 'T12:00:00Z')).forEach(x => { if (x.type === 'year' || x.type === 'relatedYear') p.y = +x.value; if (x.type === 'month') p.m = +x.value; if (x.type === 'day') p.d = +x.value; }); return [p.y, p.m, p.d]; }
function fromJ(jy, jm, jd) { let t0 = Date.UTC(jy + 621, 2, 15, 12); for (let i = 0; i < 400; i++, t0 += 864e5) { const iso = new Date(t0).toISOString().slice(0, 10), j = toJ(iso); if (j[0] === jy && j[1] === jm && j[2] === jd) return iso; } return null; }
function fmtDate(iso, cal = CAL, l = L) {
  const d = new Date(iso + 'T12:00:00Z');
  if (cal === 'jalali' && l === 'en') { const j = toJ(iso); return `${j[0]}/${String(j[1]).padStart(2, '0')}/${String(j[2]).padStart(2, '0')}`; }
  if (cal === 'jalali') return new Intl.DateTimeFormat('fa-u-ca-persian', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'UTC' }).format(d);
  return l === 'fa' ? d.toLocaleDateString('fa-u-ca-gregory', { timeZone: 'UTC' }) : iso;
}
// Date picker = three selects (day / month / year) in the chosen calendar
const dateField = (id, iso, opt) => `<div class="dp flex gap-2" id="${id}" data-iso="${iso || ''}" data-opt="${opt ? 1 : 0}"></div>`;
function initDates(root) {
  root.querySelectorAll('.dp').forEach(dp => {
    const J = CAL === 'jalali', opt = dp.dataset.opt === '1', iso = dp.dataset.iso;
    const cur = J ? toJ(todayISO()) : todayISO().split('-').map(Number);
    const [y, m, d] = iso ? (J ? toJ(iso) : iso.split('-').map(Number)) : (opt ? [0, 0, 0] : [cur[0], cur[1], cur[2]]);
    const names = J ? JM[L] : [...Array(12)].map((_, i) => new Date(2000, i, 1).toLocaleDateString(L === 'fa' ? 'fa-u-ca-gregory' : 'en-US', { month: 'long' }));
    const dim = (yy, mm) => !mm ? 31 : J ? (mm <= 6 ? 31 : mm <= 11 ? 30 : (fromJ(yy, 12, 30) ? 30 : 29)) : new Date(yy, mm, 0).getDate();
    const opts = (items, val) => (opt ? `<option value="0" ${val ? '' : 'selected'}>—</option>` : '') + items.map(([v, l]) => `<option value="${v}" ${v === val ? 'selected' : ''}>${l}</option>`).join('');
    const days = (n, val) => opts([...Array(n)].map((_, i) => [i + 1, num(i + 1)]), val);
    const years = []; for (let i = cur[0] - 10; i <= cur[0] + 2; i++) years.push([i, num(i)]);
    dp.innerHTML = `<select class="input" data-p="d">${days(dim(y || cur[0], m), d)}</select><select class="input" data-p="m">${opts(names.map((n, i) => [i + 1, n]), m)}</select><select class="input" data-p="y">${opts(years, y)}</select>`;
    const sel = p => dp.querySelector(`[data-p=${p}]`);
    const refresh = () => { const dd = +sel('d').value; sel('d').innerHTML = days(dim(+sel('y').value || cur[0], +sel('m').value), dd); };
    sel('m').onchange = refresh; sel('y').onchange = refresh;
  });
}
function readDate(dp) {
  const [d, m, y] = ['d', 'm', 'y'].map(p => +dp.querySelector(`[data-p=${p}]`).value);
  if (!d || !m || !y) return '';
  return CAL === 'jalali' ? fromJ(y, m, d) : `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

/* ---------- Local "API": same calls as a server, data stays in this browser ---------- */
const DB = { get: k => { try { return JSON.parse(localStorage.getItem('nexora:' + k)); } catch (e) { return null; } }, set: (k, v) => localStorage.setItem('nexora:' + k, JSON.stringify(v)) };
const fail = (error, field) => { throw Object.assign(new Error(error), { field }); };
const nid = () => Date.now() * 1000 + Math.floor(Math.random() * 1000);
const RE_DATE = /^\d{4}-\d{2}-\d{2}$/;
// Passwords are never stored in plain text: PBKDF2 (150k rounds) with a random salt
async function hashPw(pw, salt) {
  const enc = new TextEncoder(), key = await crypto.subtle.importKey('raw', enc.encode(pw), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits({ name: 'PBKDF2', salt: enc.encode(salt), iterations: 150000, hash: 'SHA-256' }, key, 256);
  return [...new Uint8Array(bits)].map(x => x.toString(16).padStart(2, '0')).join('');
}
function filterTx(list, f, A) {
  const q = (f.q || '').toLowerCase();
  return list.filter(x => (!f.type || x.type === f.type) && (!f.category || x.category === f.category) && (!f.account || x.account_id == f.account) && (!f.from || x.date >= f.from) && (!f.to || x.date <= f.to) && (!q || (x.description || '').toLowerCase().includes(q)))
    .sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id)
    .map(({ user_id, ...r }) => ({ ...r, account: (A[r.account_id] || {}).name, currency: (A[r.account_id] || { currency: 'IRT' }).currency }));
}
function cleanTx(b, A) {
  const amount = Number(b.amount);
  if (!['income', 'expense'].includes(b.type) || !(amount > 0) || amount > 1e15 || !b.category || !RE_DATE.test(b.date || '') || !A[b.account_id]) fail('invalid');
  return { type: b.type, account_id: +b.account_id, amount: Math.round(amount * 100) / 100, category: String(b.category).slice(0, 40), description: String(b.description || '').trim().slice(0, 200), date: b.date };
}
function summarize(rows, accs, accId) {
  const A = Object.fromEntries(accs.map(a => [a.id, a])), cur = accId ? A[accId].currency : CUR, J = CAL === 'jalali';
  const v = x => conv(x.amount, (A[x.account_id] || { currency: 'IRT' }).currency, cur);
  const sum = l => ({ income: l.filter(x => x.type === 'income').reduce((a, x) => a + v(x), 0), expense: l.filter(x => x.type === 'expense').reduce((a, x) => a + v(x), 0) });
  const key = (y, m) => y + '-' + String(m).padStart(2, '0'), mk = iso => { if (!J) return iso.slice(0, 7); const j = toJ(iso); return key(j[0], j[1]); };
  const [cy, cm] = J ? toJ(todayISO()) : todayISO().split('-').map(Number);
  const months = [...Array(6)].map((_, i) => { let y = cy, m = cm - 5 + i; while (m < 1) { m += 12; y--; } return [y, m]; });
  const lab = ([y, m]) => J ? JM[L][m - 1] : new Date(y, m - 1, 1).toLocaleDateString(L === 'fa' ? 'fa-u-ca-gregory' : 'en-US', { month: 'short' });
  const ks = rows.filter(x => x.category !== 'transfer').map(x => [x, mk(x.date)]), inM = k => ks.filter(r => r[1] === k).map(r => r[0]), now = key(cy, cm), all = sum(rows), cats = {};
  inM(now).filter(x => x.type === 'expense').forEach(x => cats[x.category] = (cats[x.category] || 0) + v(x));
  return { currency: cur, balance: all.income - all.expense, month: sum(inM(now)), trend: months.map(mm => ({ label: lab(mm), ...sum(inM(key(...mm))) })),
    categories: Object.entries(cats).map(([category, total]) => ({ category, total })).sort((a, b) => b.total - a.total) };
}
async function api(path, opt = {}) {
  const m = (opt.method || 'GET').toUpperCase(), b = opt.body || {}, [p, qs] = path.split('?'), Q = Object.fromEntries(new URLSearchParams(qs || ''));
  const users = DB.get('users') || [];
  if (p === '/auth/signup') {
    const name = String(b.name || '').trim(), email = String(b.email || '').trim().toLowerCase(), pw = String(b.password || '');
    if (name.length < 2) fail('name', 'name');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) fail('email', 'email');
    if (pw.length < 8) fail('pw', 'password');
    if (pw !== b.confirm) fail('match', 'confirm');
    if (users.some(u => u.email === email)) fail('email_taken', 'email');
    const salt = crypto.randomUUID(), u = { id: nid(), name, email, salt, hash: await hashPw(pw, salt) };
    DB.set('users', [...users, u]); DB.set('session', u.id); return { user: { id: u.id, name, email } };
  }
  if (p === '/auth/login') {
    const u = users.find(x => x.email === String(b.email || '').trim().toLowerCase());
    if (!u || await hashPw(String(b.password || ''), u.salt) !== u.hash) fail('bad_credentials');
    DB.set('session', u.id); return { user: { id: u.id, name: u.name, email: u.email } };   // stays signed in on this device
  }
  if (p === '/auth/logout') { DB.set('session', null); return { ok: true }; }
  const me = users.find(u => u.id === DB.get('session'));
  if (!me) fail('unauthorized');
  if (p === '/auth/me') return { user: { id: me.id, name: me.name, email: me.email } };

  // Accounts (every user always has at least one; older data without accounts is moved into the first one)
  const allAcc = DB.get('acc') || []; let accs = allAcc.filter(a => a.user_id === me.id);
  if (!accs.length) { accs = [{ id: nid(), user_id: me.id, name: t('main_acc'), currency: 'IRT' }]; DB.set('acc', [...allAcc, ...accs]); }
  let all = DB.get('tx') || [];
  if (all.some(x => x.user_id === me.id && !x.account_id)) { all = all.map(x => x.user_id === me.id && !x.account_id ? { ...x, account_id: accs[0].id } : x); DB.set('tx', all); }
  if (all.some(x => x.user_id === me.id && !Number.isInteger(x.id))) { let k = 0; all = all.map(x => Number.isInteger(x.id) ? x : { ...x, id: nid() + (k++) }); DB.set('tx', all); }   // repair ids from the first version
  const A = Object.fromEntries(accs.map(a => [a.id, a])), mine = all.filter(x => x.user_id === me.id), saveAcc = list => DB.set('acc', [...allAcc.filter(a => a.user_id !== me.id), ...list]);
  const aid = (p.match(/^\/accounts\/(\d+)$/) || [])[1];
  if (p === '/accounts' && m === 'GET') return { accounts: accs };
  if (p === '/accounts' && m === 'POST') {
    const name = String(b.name || '').trim().slice(0, 40); if (!name) fail('acc_name'); if (!CURS[b.currency]) fail('invalid');
    saveAcc([...accs, { id: nid(), user_id: me.id, name, currency: b.currency }]); return { ok: true };
  }
  if (aid && m === 'PUT') { const name = String(b.name || '').trim().slice(0, 40); if (!name || !A[aid]) fail('acc_name'); saveAcc(accs.map(a => a.id == aid ? { ...a, name } : a)); return { ok: true }; }
  if (aid && m === 'DELETE') {
    if (accs.length < 2) fail('last_account'); if (mine.some(x => x.account_id == aid)) fail('account_has_tx');
    saveAcc(accs.filter(a => a.id != aid)); return { ok: true };
  }
  // Transfers: both sides (and the optional fee) are written in ONE save, so balances can never be half-updated
  if (p === '/transfers' && m === 'POST') {
    const f = A[b.from], to = A[b.to], amt = Number(b.amount), fee = Number(b.fee || 0);
    if (!f || !to || f.id === to.id) fail('same_account'); if (!(amt > 0) || !(fee >= 0) || !RE_DATE.test(b.date || '')) fail('invalid');
    const tid = nid(), got = Math.round(conv(amt, f.currency, to.currency) * 100) / 100, base = { user_id: me.id, category: 'transfer', date: b.date, transfer_id: tid };
    const legs = [{ id: nid(), ...base, type: 'expense', account_id: f.id, amount: amt, description: '→ ' + to.name }, { id: nid() + 1, ...base, type: 'income', account_id: to.id, amount: got, description: '← ' + f.name }];
    if (fee > 0) legs.push({ id: nid() + 2, user_id: me.id, type: 'expense', account_id: f.id, amount: fee, category: 'fees', description: '→ ' + to.name, date: b.date, transfer_id: tid });
    DB.set('tx', [...all, ...legs]); return { ok: true };
  }
  // Budgets: one monthly limit per expense category
  const budgets = (DB.get('bud') || []).filter(x => x.user_id === me.id), mkey = iso => { if (CAL !== 'jalali') return iso.slice(0, 7); const q = toJ(iso); return q[0] + '-' + String(q[1]).padStart(2, '0'); };
  if (p === '/budgets' && m === 'GET') { const nowK = mkey(todayISO());
    return { budgets: budgets.map(({ user_id, ...x }) => ({ ...x, spent: mine.filter(r => r.type === 'expense' && r.category === x.category && mkey(r.date) === nowK).reduce((s, r) => s + conv(r.amount, (A[r.account_id] || { currency: 'IRT' }).currency, x.currency), 0) })) }; }
  if (p === '/budgets' && m === 'POST') { const lim = Number(b.limit); if (!CAT[b.category] || !(lim > 0) || !CURS[b.currency]) fail('invalid');
    DB.set('bud', [...(DB.get('bud') || []).filter(x => !(x.user_id === me.id && x.category === b.category)), { id: nid(), user_id: me.id, category: b.category, limit: lim, currency: b.currency }]); return { ok: true }; }
  const bid = (p.match(/^\/budgets\/(\d+)$/) || [])[1];
  if (bid && m === 'DELETE') { DB.set('bud', (DB.get('bud') || []).filter(x => !(x.id == bid && x.user_id === me.id))); return { ok: true }; }
  // Savings goals
  const goals = (DB.get('goals') || []).filter(x => x.user_id === me.id), saveG = l => DB.set('goals', [...(DB.get('goals') || []).filter(x => x.user_id !== me.id), ...l]);
  if (p === '/goals' && m === 'GET') return { goals: goals.map(({ user_id, ...g }) => g) };
  if (p === '/goals' && m === 'POST') { const name = String(b.name || '').trim().slice(0, 60), target = Number(b.target);
    if (!name || !(target > 0) || !CURS[b.currency] || (b.deadline && !RE_DATE.test(b.deadline))) fail('invalid');
    saveG([...goals, { id: nid(), user_id: me.id, name, target, saved: 0, currency: b.currency, deadline: b.deadline || '' }]); return { ok: true }; }
  const gm = p.match(/^\/goals\/(\d+)(\/fund)?$/) || [];
  if (gm[1] && gm[2] && m === 'POST') { const amt = Number(b.amount), g = goals.find(x => x.id == gm[1]); if (!g || !Number.isFinite(amt) || !amt || g.saved + amt < 0) fail('invalid');
    saveG(goals.map(x => x.id == g.id ? { ...x, saved: Math.round((x.saved + amt) * 100) / 100 } : x)); return { ok: true }; }
  if (gm[1] && !gm[2] && m === 'DELETE') { saveG(goals.filter(x => x.id != gm[1])); return { ok: true }; }
  if (p === '/transactions' && m === 'GET') return { transactions: filterTx(mine, Q, A).slice(0, +Q.limit || 5000) };
  if (p === '/transactions' && m === 'POST') { DB.set('tx', [...all, { id: nid(), user_id: me.id, ...cleanTx(b, A) }]); return { ok: true }; }
  const id = (p.match(/^\/transactions\/(\d+)$/) || [])[1];
  if (id && m === 'PUT') { const v = cleanTx(b, A), c0 = mine.find(x => x.id == id); if (!c0 || c0.transfer_id) fail(c0 ? 'invalid' : 'not_found'); DB.set('tx', all.map(x => x.id == id && x.user_id === me.id ? { ...x, ...v } : x)); return { ok: true }; }
  if (id && m === 'DELETE') { const c0 = mine.find(x => x.id == id); DB.set('tx', all.filter(x => !(x.user_id === me.id && (x.id == id || (c0 && c0.transfer_id && x.transfer_id === c0.transfer_id))))); return { ok: true }; }   // deleting a transfer removes both sides
  if (p === '/reports/summary') return { ...summarize(Q.account ? mine.filter(x => x.account_id == Q.account) : mine, accs, Q.account || null),
    accounts: accs.map(a => ({ id: a.id, name: a.name, currency: a.currency, balance: mine.filter(x => x.account_id === a.id).reduce((s, x) => s + (x.type === 'income' ? x.amount : -x.amount), 0) })) };
  // Backup / restore (accounts + transactions only; never passwords)
  if (p === '/backup') return { app: 'nexora', version: 1, exported: todayISO(), accounts: accs.map(({ user_id, ...a }) => a), transactions: mine.map(({ user_id, ...r }) => r), budgets: budgets.map(({ user_id, ...x }) => x), goals: goals.map(({ user_id, ...x }) => x) };
  if (p === '/restore' && m === 'POST') {
    if (!(b && b.app === 'nexora' && Array.isArray(b.accounts) && Array.isArray(b.transactions) && b.accounts.length && b.accounts.length < 200 && b.transactions.length < 200000)) fail('backup');
    try {
      const idMap = {}, na = b.accounts.map((a, i) => { if (!CURS[a.currency] || !String(a.name || '').trim()) throw 0; const id = nid() + i; idMap[a.id] = id; return { id, user_id: me.id, name: String(a.name).trim().slice(0, 40), currency: a.currency }; });
      const NA = Object.fromEntries(na.map(a => [a.id, a])), nt = b.transactions.map((r, k) => { if (!idMap[r.account_id]) throw 0; return { id: nid() + 1000 + k, user_id: me.id, ...cleanTx({ ...r, account_id: idMap[r.account_id] }, NA), ...(r.transfer_id ? { transfer_id: r.transfer_id } : {}) }; });
      saveAcc(na); DB.set('tx', [...all.filter(x => x.user_id !== me.id), ...nt]);
      if (Array.isArray(b.budgets)) DB.set('bud', [...(DB.get('bud') || []).filter(x => x.user_id !== me.id), ...b.budgets.filter(x => CAT[x.category] && x.limit > 0 && CURS[x.currency]).map(x => ({ id: nid(), user_id: me.id, category: x.category, limit: +x.limit, currency: x.currency }))]);
      if (Array.isArray(b.goals)) saveG(b.goals.filter(x => x.name && x.target > 0 && CURS[x.currency]).map(x => ({ id: nid(), user_id: me.id, name: String(x.name).slice(0, 60), target: +x.target, saved: Math.max(+x.saved || 0, 0), currency: x.currency, deadline: RE_DATE.test(x.deadline || '') ? x.deadline : '' })));
      return { ok: true };
    } catch (e) { fail('backup'); }
  }
  fail('not_found');
}
async function guard() { try { return (await api('/auth/me')).user; } catch (e) { location.href = 'login.html'; await new Promise(() => {}); } }

function modal(html) {
  const m = document.createElement('div'); m.className = 'modal';
  m.innerHTML = `<div class="glass box" role="dialog" aria-modal="true"><div class="mb">${html}</div></div>`;
  const box = m.firstChild, mb = box.firstChild, rm = m.remove.bind(m); let closing = false;
  m.remove = () => { if (closing) return; closing = true; m.classList.add('out'); setTimeout(rm, 200); };   // animated close
  m.addEventListener('mousedown', e => { if (e.target === m) m.remove(); });
  const h = mb.querySelector(':scope > h2');
  if (h) {   // top bar: title + close button, stays visible while the form scrolls
    const bar = document.createElement('div'), x = document.createElement('button'); bar.className = 'mh'; x.type = 'button'; x.className = 'mx'; x.setAttribute('aria-label', 'Close'); x.innerHTML = ico('x', 18); x.onclick = () => m.remove();
    h.replaceWith(bar); bar.append(h, x); box.prepend(bar);
  }
  [mb, mb.querySelector(':scope > form')].forEach(c => c && [...c.children].forEach((el, i) => el.style.setProperty('--k', i)));   // staggered entrance
  // swipe down on the handle / top bar to dismiss (phones)
  let y0 = null, dy = 0;
  box.addEventListener('pointerdown', e => { if (innerWidth > 1023 || e.target.closest('button,input,select,textarea,a')) return; if (!(e.target.closest('.mh') || e.clientY - box.getBoundingClientRect().top < 40)) return; y0 = e.clientY; dy = 0; box.style.transition = 'none'; box.setPointerCapture(e.pointerId); });
  box.addEventListener('pointermove', e => { if (y0 === null) return; dy = Math.max(e.clientY - y0, 0); box.style.transform = `translateY(${dy}px)`; });
  const end = () => { if (y0 === null) return; y0 = null; box.style.transition = 'transform .4s cubic-bezier(.2,.8,.2,1)'; if (dy > 110) m.remove(); else box.style.transform = ''; };
  box.addEventListener('pointerup', end); box.addEventListener('pointercancel', end);
  document.body.append(m); i18n(m); initDates(m); m.querySelectorAll('.seg').forEach(segMove); return m;
}
function segMove(sg) {   // sliding highlight behind the active option
  let th = sg.querySelector('.thumb'); const first = !th;
  if (first) { th = document.createElement('i'); th.className = 'thumb'; th.style.transition = 'none'; sg.prepend(th); }
  const on = sg.querySelector('button.on');
  if (on) { th.style.width = on.offsetWidth + 'px'; th.style.transform = `translateX(${on.offsetLeft}px)`; }
  if (first) { th.offsetWidth; th.style.transition = ''; }   // animate only from the second move on
  if (first && document.fonts) document.fonts.ready.then(() => { const o = sg.querySelector('button.on'); if (o && sg.isConnected) { th.style.transition = 'none'; th.style.width = o.offsetWidth + 'px'; th.style.transform = `translateX(${o.offsetLeft}px)`; th.offsetWidth; th.style.transition = ''; } });
}
const stagger = id => [...document.getElementById(id).children].forEach((tr, i) => tr.style.setProperty('--i', i));
const accOptions = (accs, all, sel) => (all ? `<option value="">${t('all_accounts')}</option>` : '') + accs.map(a => `<option value="${a.id}" ${a.id == sel ? 'selected' : ''}>${esc(a.name)} (${curName(a.currency)})</option>`).join('');

/* App shell: sidebar on desktop, bottom bar on mobile, + floating add button */
function shell(active) {
  const u = (DB.get('users') || []).find(x => x.id === DB.get('session')) || { name: '', email: '' };
  const item = (id, href, ic, label) => `<a href="${href}" class="nav ${active === id ? 'on' : ''}" aria-label="${label}">${ico(ic, 20)}<span>${label}</span></a>`;
  const btn = (id, ic, label) => `<button class="nav" id="${id}" aria-label="${label}">${ico(ic, 20)}<span>${label}</span></button>`;
  document.body.insertAdjacentHTML('afterbegin', `<div class="app"><aside class="side glass">
    <a href="index.html" class="brand"><span class="logo">N</span><b>NEXORA</b></a>
    <button class="cmdk" id="cmdk">${ico('search', 16)}<span>${t('cmd_hint')}</span><kbd>Ctrl K</kbd></button>
    <nav class="menu">${item('dashboard', 'dashboard.html', 'dash', t('dashboard'))}${item('transactions', 'transactions.html', 'swap', t('transactions'))}${item('plan', 'budgets.html', 'target', t('plan'))}${btn('nReports', 'chart', t('reports'))}${btn('nSettings', 'gear', t('settings'))}${btn('nLogout', 'out', t('logout'))}</nav>
    <div class="user"><span class="avatar">${esc((u.name || '?').trim().slice(0, 1).toUpperCase())}</span><div><b>${esc(u.name)}</b><small>${esc(u.email)}</small></div></div></aside>
    <main id="main" class="main"></main></div><button class="fab" id="fab" aria-label="${t('add_btn')}">${ico('plus', 24)}</button>`);
  document.getElementById('nReports').onclick = exportModal;
  document.getElementById('nSettings').onclick = settingsModal;
  document.getElementById('nLogout').onclick = async () => { await api('/auth/logout', { method: 'POST' }).catch(() => {}); location.href = 'login.html'; };
  document.getElementById('fab').onclick = () => txModal(null, () => window.refresh ? window.refresh() : location.reload());
  document.getElementById('cmdk').onclick = palette;
  return document.getElementById('main');
}

/* Settings: language, calendar, display currency, accounts */
async function settingsModal() {
  const accs = (await api('/accounts')).accounts;
  const seg = (k, cur, items) => `<div class="seg">${items.map(([v, l]) => `<button type="button" class="${cur === v ? 'on' : ''}" data-s="${k}:${v}">${l}</button>`).join('')}</div>`;
  const m = modal(`<h2 class="mb-3 text-lg font-semibold">${t('settings')}</h2>
    <p class="lbl">${t('language')}</p>${seg('lang', L, [['en', 'English'], ['fa', 'فارسی']])}
    <p class="lbl mt-4">${t('theme')}</p>${seg('theme', PREF.theme || 'auto', [['auto', t('auto')], ['light', t('light')], ['dark', t('dark')]])}
    <p class="lbl mt-4">${t('calendar')}</p>${seg('cal', CAL, [['jalali', t('jalali')], ['gregorian', t('gregorian')]])}
    <p class="lbl mt-4">${t('display_cur')} <span class="text-xs">(${t('rate_note')})</span></p>${seg('cur', CUR, [['IRT', t('toman')], ['IRR', t('rial')]])}
    <p class="lbl mt-4">${t('accounts')}</p><div class="space-y-2">${accs.map(a => `<div class="flex items-center justify-between gap-2"><span>${esc(a.name)} <span class="chip">${curName(a.currency)}</span></span>
      <span class="flex gap-1"><button class="btn" data-ren="${a.id}">${t('rename')}</button><button class="btn" data-dac="${a.id}">${t('delete')}</button></span></div>`).join('')}</div>
    <div class="mt-3 flex gap-2"><input id="an" class="input" placeholder="${t('account_name')}"><select id="ac" class="input" style="width:8rem"><option value="IRT">${t('toman')}</option><option value="IRR">${t('rial')}</option></select><button id="aa" class="btn btn-grad">+</button></div>
    <p class="lbl mt-4">${t('backup')}</p><div class="flex flex-wrap gap-2"><button class="btn" id="bk">${ico('dl')}${t('dl_backup')}</button><button class="btn" id="rs">${t('restore')}</button><input type="file" id="rf" accept="application/json,.json" class="hidden"></div>`);
  const again = () => { m.remove(); settingsModal(); };
  m.onclick = async e => {
    try {
      const s = e.target.closest('[data-s]'), r = e.target.closest('[data-ren]'), d = e.target.closest('[data-dac]');
      if (s) { const [k, v] = s.dataset.s.split(':'); return k === 'lang' ? setLang(v) : setPref(k, v); }
      if (r) { const n = prompt(t('account_name')); if (n) { await api('/accounts/' + r.dataset.ren, { method: 'PUT', body: { name: n } }); again(); } }
      if (d && confirm(t('confirm_del'))) { await api('/accounts/' + d.dataset.dac, { method: 'DELETE' }); again(); }
      if (e.target.id === 'aa') { await api('/accounts', { method: 'POST', body: { name: m.querySelector('#an').value, currency: m.querySelector('#ac').value } }); again(); }
      if (e.target.closest('#bk')) { const d = await api('/backup'), a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([JSON.stringify(d)], { type: 'application/json' })); a.download = 'nexora-backup-' + todayISO() + '.json'; a.click(); }
      if (e.target.closest('#rs')) m.querySelector('#rf').click();
    } catch (er) { toast(t('err_' + er.message)); }
  };
  m.querySelector('#rf').onchange = async ev => {
    try { const f = ev.target.files[0]; if (!f) return; let d; try { d = JSON.parse(await f.text()); } catch (x) { fail('backup'); }
      if (!confirm(t('restore_confirm'))) return; await api('/restore', { method: 'POST', body: d }); toast(t('restored')); setTimeout(() => location.reload(), 700); }
    catch (er) { toast(t('err_' + er.message)); }
  };
}

/* Export: date range + account + report language → Excel (.xls, two sheets) or printable PDF */
const X = { en: { date: 'Date', type: 'Type', category: 'Category', account: 'Account', description: 'Description', amount: 'Amount', currency: 'Currency', income: 'Income', expense: 'Expense', net: 'Net',
  tin: 'Total income', tex: 'Total expense', netl: 'Net (money left)', tx: 'Transactions', sum: 'Summary', bycat: 'Expenses by category', report: 'Report', pdf: 'Print / Save as PDF', item: 'Item' },
  fa: { date: 'تاریخ', type: 'نوع', category: 'دسته‌بندی', account: 'حساب', description: 'توضیحات', amount: 'مبلغ', currency: 'واحد', income: 'درآمد', expense: 'هزینه', net: 'خالص',
  tin: 'جمع درآمد', tex: 'جمع هزینه', netl: 'خالص (باقیمانده پول)', tx: 'تراکنش‌ها', sum: 'خلاصه', bycat: 'هزینه به تفکیک دسته', report: 'گزارش', pdf: 'چاپ / ذخیره به‌صورت PDF', item: 'مورد' } };
async function exportModal() {
  const accs = (await api('/accounts')).accounts;
  const m = modal(`<h2 class="mb-4 text-lg font-semibold">${t('export_t')}</h2>
    <label class="lbl">${t('from')}</label>${dateField('xf', '', true)}<label class="lbl mt-3">${t('to')}</label>${dateField('xt', '', true)}
    <label class="lbl mt-3">${t('account')}</label><select id="xa" class="input">${accOptions(accs, true)}</select>
    <label class="lbl mt-3">${t('export_lang')}</label><select id="xl" class="input"><option value="fa" ${L === 'fa' ? 'selected' : ''}>${t('persian')}</option><option value="en" ${L === 'en' ? 'selected' : ''}>${t('english')}</option></select>
    <div class="mt-5 flex flex-wrap gap-2"><button class="btn btn-grad" data-x="excel">${t('excel')}</button><button class="btn" data-x="pdf">${t('pdf')}</button></div>`);
  m.querySelectorAll('[data-x]').forEach(b => b.onclick = () => { exportLocal(b.dataset.x, readDate(m.querySelector('#xf')), readDate(m.querySelector('#xt')), m.querySelector('#xl').value, m.querySelector('#xa').value); m.remove(); });
}
const xmlEsc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
async function exportLocal(kind, from, to, lang, acc) {
  const x = X[lang], fa = lang === 'fa', cal = fa ? 'jalali' : 'gregorian';
  const rows = (await api('/transactions?' + new URLSearchParams({ ...(from && { from }), ...(to && { to }), ...(acc && { account: acc }) }))).transactions;
  const v = r => conv(r.amount, r.currency, acc ? rows.find(q => q.account_id == acc)?.currency || CUR : CUR), outCur = acc && rows[0] ? rows[0].currency : CUR;
  const inc = rows.filter(r => r.type === 'income').reduce((a, r) => a + v(r), 0), exp = rows.filter(r => r.type === 'expense').reduce((a, r) => a + v(r), 0), cat = {};
  rows.filter(r => r.type === 'expense').forEach(r => { const k = catName(r.category, lang); cat[k] = (cat[k] || 0) + v(r); });
  const D = r => fmtDate(r.date, cal, lang), cn = curName(outCur, lang);
  if (kind === 'excel') {
    const rtl = fa ? '<WorksheetOptions xmlns="urn:schemas-microsoft-com:office:excel"><DisplayRightToLeft/></WorksheetOptions>' : '';
    const sheet = (n, rs) => `<Worksheet ss:Name="${n}"><Table>${rs.map(r => '<Row>' + r.map(c => typeof c === 'number' ? `<Cell><Data ss:Type="Number">${c}</Data></Cell>` : `<Cell><Data ss:Type="String">${xmlEsc(c)}</Data></Cell>`).join('') + '</Row>').join('')}</Table>${rtl}</Worksheet>`;
    const tt = [[x.date, x.type, x.category, x.account, x.description, x.amount, x.currency], ...rows.map(r => [D(r), x[r.type], catName(r.category, lang), r.account || '', r.description, r.amount, curName(r.currency, lang)]),
      ['', '', '', '', x.tin + ' (' + cn + ')', inc, cn], ['', '', '', '', x.tex + ' (' + cn + ')', exp, cn], ['', '', '', '', x.netl + ' (' + cn + ')', inc - exp, cn]];
    const ss = [[x.item, x.amount], [x.tin + ' (' + cn + ')', inc], [x.tex + ' (' + cn + ')', exp], [x.netl + ' (' + cn + ')', inc - exp], [''], [x.bycat], ...Object.entries(cat)];
    const xml = '<?xml version="1.0" encoding="UTF-8"?><Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet" xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">' + sheet(x.tx, tt) + sheet(x.sum, ss) + '</Workbook>';
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([xml], { type: 'application/vnd.ms-excel' })); a.download = 'nexora-report.xls'; a.click(); return;
  }
  const n = q => new Intl.NumberFormat(fa ? 'fa-IR' : 'en-US', { maximumFractionDigits: 2 }).format(q);
  const w = window.open('', '_blank'); if (!w) return toast('Allow pop-ups');
  w.document.write(`<!DOCTYPE html><html lang="${lang}" dir="${fa ? 'rtl' : 'ltr'}"><meta charset="utf-8"><title>NEXORA</title><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Vazirmatn:wght@400;600&display=swap" rel="stylesheet">
  <style>body{font-family:${fa ? 'Vazirmatn,Inter' : 'Inter,Vazirmatn'},Arial,sans-serif;margin:40px;color:#111}.logo{display:flex;align-items:center;gap:10px;font-size:22px;font-weight:700}.logo i{width:34px;height:34px;border-radius:9px;background:linear-gradient(120deg,#6366F1,#8B5CF6,#EC4899);color:#fff;display:grid;place-items:center;font-style:normal}.sum{display:flex;gap:30px;margin:22px 0}.sum b{display:block;font-size:20px}table{width:100%;border-collapse:collapse;font-size:13px}th{text-align:start;color:#6366F1;border-bottom:2px solid #6366F1;padding:6px}td{padding:6px;border-bottom:1px solid #eee}body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.sum{align-items:center}.netc{margin-inline-start:auto;padding:12px 20px;border-radius:14px;background:linear-gradient(120deg,#6366F1,#8B5CF6,#EC4899);color:#fff}.netc b{font-size:24px}.tot td{font-weight:700;border-top:2px solid #6366F1;border-bottom:0;padding-top:12px}@media print{button{display:none}}</style>
  <div class="logo"><i>N</i>NEXORA</div><p style="color:#666">${x.report}: ${from ? fmtDate(from, cal, lang) : '…'} → ${to ? fmtDate(to, cal, lang) : '…'}</p>
  <div class="sum"><div>${x.tin}<b>${n(inc)} ${cn}</b></div><div>${x.tex}<b>${n(exp)} ${cn}</b></div><div class="netc">${x.netl}<b>${n(inc - exp)} ${cn}</b></div></div><button onclick="print()">${x.pdf}</button>
  <table><tr><th>${x.date}</th><th>${x.type}</th><th>${x.category}</th><th>${x.account}</th><th>${x.description}</th><th>${x.amount}</th></tr>${rows.map(r => `<tr><td>${D(r)}</td><td>${x[r.type]}</td><td>${xmlEsc(catName(r.category, lang))}</td><td>${xmlEsc(r.account || '')}</td><td dir="auto">${xmlEsc(r.description)}</td><td>${r.type === 'expense' ? '-' : '+'}${n(r.amount)} ${curName(r.currency, lang)}</td></tr>`).join('')}<tr class="tot"><td colspan="5">${x.netl}</td><td>${n(inc - exp)} ${cn}</td></tr></table><script>setTimeout(print,600)<\/script>`);
  w.document.close();
}

/* Add / edit transaction: type switch, big amount, account, category pills, quick dates */
async function txModal(tx, done) {
  const accs = (await api('/accounts')).accounts, last = DB.get('lastAcc');
  const m = modal(`<h2>${tx ? t('edit') : t('new')}</h2><form id="tf" novalidate class="stack">
    <input type="hidden" name="type" value="expense"><input type="hidden" name="category" value="">
    <div class="seg typed" id="sg"><button type="button" data-v="expense">${ico('up', 16)}${t('expense')}</button><button type="button" data-v="income">${ico('down', 16)}${t('income')}</button></div>
    <div><div class="amtbox"><span class="sgn" id="sgn">−</span><input name="amount" type="text" inputmode="decimal" autocomplete="off" dir="ltr" class="amtin" placeholder="0" aria-label="${t('amount')}"></div><p class="cur" id="cu"></p><p class="err" data-e="amount" style="text-align:center"></p></div>
    <div><label class="lbl">${t('account')}</label><select name="account_id" class="input">${accOptions(accs, false, tx ? tx.account_id : (accs.find(a => a.id == last) || accs[0]).id)}</select></div>
    <div><label class="lbl">${t('category')}</label><div class="pills" id="pc"></div></div>
    <div><label class="lbl">${t('description')}</label><input name="description" maxlength="200" class="input"></div>
    <div><div class="lblrow"><label class="lbl">${t('date')}</label><span class="qd"><button type="button" class="pill sm" data-d="0">${t('today')}</button><button type="button" class="pill sm" data-d="1">${t('yesterday')}</button></span></div>${dateField('dt', tx ? tx.date : todayISO())}<p class="err" data-e="date"></p></div>
    <div class="mf"><button type="button" class="btn" id="tc">${t('cancel')}</button><button class="btn btn-grad" id="ts">${t('save')}</button></div></form>`);
  const f = m.querySelector('#tf'), pc = m.querySelector('#pc'), sg = m.querySelector('#sg');
  const fillCats = keep => {
    const list = [...(f.type.value === 'income' ? INC_CATS : EXP_CATS)]; if (keep && !list.includes(keep)) list.push(keep);
    const sel = keep || (list.includes(f.category.value) ? f.category.value : list[0]);
    pc.innerHTML = list.map(c => `<button type="button" class="pill ${c === sel ? 'on' : ''}" data-c="${c}">${esc(catName(c))}</button>`).join(''); f.category.value = sel;
    const on = pc.querySelector('.on'); if (on) setTimeout(() => on.scrollIntoView({ inline: 'center', block: 'nearest' }), 80);
  };
  const cur = () => { const a = accs.find(q => q.id == f.account_id.value); m.querySelector('#cu').textContent = a ? curName(a.currency) : ''; };
  const sync = () => { const v = f.type.value; sg.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.dataset.v === v)); sg.dataset.v = f.dataset.v = v; m.querySelector('#sgn').textContent = v === 'income' ? '+' : '−'; segMove(sg); };
  if (tx) { f.type.value = tx.type; f.amount.value = Number(tx.amount).toLocaleString('en-US', { maximumFractionDigits: 2 }); f.description.value = tx.description; }
  fillCats(tx && tx.category); cur(); sync();
  sg.onclick = e => { const b = e.target.closest('button'); if (b && b.dataset.v !== f.type.value) { f.type.value = b.dataset.v; sync(); fillCats(); navigator.vibrate && navigator.vibrate(8); } };
  pc.onclick = e => { const b = e.target.closest('.pill'); if (!b) return; f.category.value = b.dataset.c; pc.querySelectorAll('.pill').forEach(x => x.classList.toggle('on', x === b)); b.scrollIntoView({ inline: 'center', block: 'nearest', behavior: 'smooth' }); };
  m.querySelector('.qd').onclick = e => { const b = e.target.closest('[data-d]'); if (!b) return; const dp = m.querySelector('#dt'); dp.dataset.iso = b.dataset.d === '0' ? todayISO() : yest(); initDates(dp.parentNode); };
  f.amount.oninput = () => fmtAmtInput(f.amount); f.account_id.onchange = cur;
  m.querySelector('#tc').onclick = () => m.remove();
  if (matchMedia('(hover:hover)').matches) setTimeout(() => f.amount.focus(), 280);
  f.onsubmit = async e => {
    e.preventDefault();
    const body = Object.fromEntries(new FormData(f)); body.date = readDate(m.querySelector('#dt')); body.amount = parseAmt(body.amount); let bad = false;
    m.querySelectorAll('.err').forEach(q => q.textContent = '');
    if (!(body.amount > 0)) { m.querySelector('[data-e=amount]').textContent = t('err_amount'); bad = true; }
    if (!body.date) { m.querySelector('[data-e=date]').textContent = t('err_date'); bad = true; }
    if (bad) return;
    const sb = m.querySelector('#ts'); sb.disabled = true;
    try { await api(tx ? '/transactions/' + tx.id : '/transactions', { method: tx ? 'PUT' : 'POST', body }); DB.set('lastAcc', +body.account_id);
      sb.innerHTML = ico('check', 20); await new Promise(r => setTimeout(r, 380)); m.remove(); toast(t('saved')); done(); }
    catch (er) { sb.disabled = false; toast(t('err_' + er.message)); }
  };
}

/* One table row: icon + description, category, date, amount (+ edit/delete when `actions`) */
const txRow = (r, actions) => `<tr class="row"><td><div class="cell"><span class="tico ${r.type}">${ico(r.type === 'income' ? 'down' : 'up', 16)}</span><div><b>${esc(r.description) || esc(catName(r.category))}</b><small>${esc(r.account || '')}<span class="mcat"> · ${esc(catName(r.category))}</span></small></div></div></td>
  <td><span class="chip">${esc(catName(r.category))}</span></td><td class="muted">${fmtDate(r.date)}</td>
  <td class="amt ${r.type === 'income' ? 'inc' : 'exp'}">${r.type === 'income' ? '+' : '−'}${money(r.amount, r.currency)}</td>
  ${actions ? `<td class="acts">${r.transfer_id ? '' : `<button class="btn btn-sm" data-ed="${r.id}">${t('edit_b')}</button>`}<button class="btn btn-sm" data-del="${r.id}">${t('delete')}</button></td>` : ''}</tr>`;

/* ---------- motion: cursor spotlight on glass cards, subtle 3D tilt on KPI cards, page transitions ---------- */
(function () {
  addEventListener('pointermove', e => {
    const g = e.target.closest && e.target.closest('.glass'); if (!g) return;
    const r = g.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    g.style.setProperty('--mx', x + 'px'); g.style.setProperty('--my', y + 'px');
    if (g.classList.contains('kpi')) { g.style.setProperty('--ry', ((x / r.width - .5) * 8) + 'deg'); g.style.setProperty('--rx', (-(y / r.height - .5) * 8) + 'deg'); }
  });
  addEventListener('pointerout', e => { const g = e.target.closest && e.target.closest('.kpi'); if (g) { g.style.setProperty('--rx', '0deg'); g.style.setProperty('--ry', '0deg'); } });
  document.addEventListener('click', e => {
    const a = e.target.closest && e.target.closest('a[href]');
    if (!a || a.target || e.metaKey || e.ctrlKey || e.shiftKey || !/\.html(\?.*)?(#.*)?$/.test(a.getAttribute('href'))) return;
    e.preventDefault(); document.body.classList.add('leaving'); setTimeout(() => { location.href = a.href; }, 230);
  });
  addEventListener('pageshow', () => document.body.classList.remove('leaving'));
})();

/* ---------- amounts: Persian/Arabic digits accepted, thousands separators while typing ---------- */
const digits = s => String(s).replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g, d => '٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const parseAmt = s => Number(digits(s).replace(/[,٬\s]/g, '').replace('٫', '.'));
function fmtAmtInput(el) {
  const fromEnd = el.value.length - (el.selectionStart ?? el.value.length), raw = digits(el.value).replace(/[,٬\s]/g, '').replace('٫', '.').replace(/[^\d.]/g, ''), [i, ...f] = raw.split('.');
  el.value = i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f.length ? '.' + f.join('').slice(0, 2) : '');
  const p = Math.max(el.value.length - fromEnd, 0); try { el.setSelectionRange(p, p); } catch (e) {}
}
const yest = () => { const d = new Date(todayISO() + 'T12:00:00Z'); d.setUTCDate(d.getUTCDate() - 1); return d.toISOString().slice(0, 10); };

/* ---------- command palette (Ctrl/Cmd + K) and shortcut N = new transaction ---------- */
function palette() {
  const done = () => window.refresh ? window.refresh() : location.reload();
  const cmds = [[t('add_btn'), 'plus', () => txModal(null, done)], [t('dashboard'), 'dash', () => { location.href = 'dashboard.html'; }], [t('transactions'), 'swap', () => { location.href = 'transactions.html'; }],
    [t('export_t'), 'dl', exportModal], [t('settings'), 'gear', settingsModal], [t('cmd_lang'), 'gear', () => setLang(L === 'fa' ? 'en' : 'fa')],
    [t('cmd_cal'), 'gear', () => setPref('cal', CAL === 'jalali' ? 'gregorian' : 'jalali')], [t('cmd_cur'), 'gear', () => setPref('cur', CUR === 'IRT' ? 'IRR' : 'IRT')],
    [t('cmd_theme'), 'gear', () => setPref('theme', THEME === 'light' ? 'dark' : 'light')], [t('cmd_transfer'), 'swap', () => transferModal(done)], [t('plan'), 'target', () => { location.href = 'budgets.html'; }], [t('cmd_hide'), 'eye', () => setPref('hide', !PREF.hide)],
    [t('logout'), 'out', async () => { await api('/auth/logout', { method: 'POST' }).catch(() => {}); location.href = 'login.html'; }]];
  const m = modal(`<div class="search">${ico('search')}<input id="pq" class="input" placeholder="${t('cmd_ph')}" autocomplete="off"></div><div class="pl" id="pl"></div>`);
  m.classList.add('palm'); let sel = 0, list = cmds; const q = m.querySelector('#pq');
  const draw = () => { m.querySelector('#pl').innerHTML = list.map((c, i) => `<button class="pi ${i === sel ? 'on' : ''}" data-i="${i}">${ico(c[1], 18)}<span>${esc(c[0])}</span></button>`).join(''); };
  const run = i => { const c = list[i]; if (c) { m.remove(); setTimeout(c[2], 150); } };
  draw(); q.focus();
  q.oninput = () => { const v = q.value.toLowerCase(); list = cmds.filter(c => c[0].toLowerCase().includes(v)); sel = 0; draw(); };
  q.onkeydown = e => { if (e.key === 'ArrowDown') { sel = Math.min(sel + 1, list.length - 1); draw(); e.preventDefault(); } else if (e.key === 'ArrowUp') { sel = Math.max(sel - 1, 0); draw(); e.preventDefault(); } else if (e.key === 'Enter') run(sel); else if (e.key === 'Escape') m.remove(); };
  m.querySelector('#pl').onclick = e => { const b = e.target.closest('[data-i]'); if (b) run(+b.dataset.i); };
}
addEventListener('keydown', e => {
  if (!document.getElementById('nSettings') || document.querySelector('.modal')) return;
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); palette(); }
  else if (e.key === 'n' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); txModal(null, () => window.refresh ? window.refresh() : location.reload()); }
});
Object.assign(T.en, { today:'Today', yesterday:'Yesterday', undo:'Undo', backup:'Backup & restore', dl_backup:'Download backup', restore:'Restore from file', restore_confirm:'Replace ALL your accounts and transactions with the data in this file?',
  restored:'Restored', err_backup:'This is not a valid NEXORA backup file.', vs_prev:'vs last month', top_spend:'Top spending', cmd_hint:'Search or jump to…', cmd_ph:'Type a command…',
  cmd_lang:'Switch language (فارسی / English)', cmd_cal:'Switch calendar (Jalali / Gregorian)', cmd_cur:'Switch currency (Toman / Rial)', onb_t:"Let's get you set up", onb1:'Account created', onb2:'Add your first transaction', onb3:'Choose calendar and currency' });
Object.assign(T.fa, { today:'امروز', yesterday:'دیروز', undo:'بازگرداندن', backup:'پشتیبان‌گیری و بازیابی', dl_backup:'دانلود نسخه پشتیبان', restore:'بازیابی از فایل', restore_confirm:'همه حساب‌ها و تراکنش‌های فعلی شما با اطلاعات این فایل جایگزین شود؟',
  restored:'بازیابی شد', err_backup:'این فایل، نسخه پشتیبان معتبر نکسورا نیست.', vs_prev:'نسبت به ماه قبل', top_spend:'بیشترین هزینه', cmd_hint:'جستجو یا پرش به…', cmd_ph:'یک دستور بنویسید…',
  cmd_lang:'تغییر زبان (فارسی / English)', cmd_cal:'تغییر تقویم (شمسی / میلادی)', cmd_cur:'تغییر واحد پول (تومان / ریال)', onb_t:'بیایید شروع کنیم', onb1:'حساب ساخته شد', onb2:'اولین تراکنش را اضافه کنید', onb3:'تقویم و واحد پول را انتخاب کنید' });
// installable + works offline (network first, cache as fallback)
if ('serviceWorker' in navigator && /^https?:/.test(location.protocol)) addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));

/* ---------- transfer between accounts ---------- */
async function transferModal(done) {
  const accs = (await api('/accounts')).accounts; if (accs.length < 2) return toast(t('need2'));
  const m = modal(`<h2 class="mb-4 text-lg font-semibold">${t('transfer')}</h2><form id="xf" novalidate class="space-y-3">
    <div><label class="lbl">${t('from_acc')}</label><select name="from" class="input">${accOptions(accs, false, accs[0].id)}</select></div>
    <div><label class="lbl">${t('to_acc')}</label><select name="to" class="input">${accOptions(accs, false, accs[1].id)}</select></div>
    <div><label class="lbl">${t('amount')} <span id="xc" class="muted"></span></label><input name="amount" type="text" inputmode="decimal" autocomplete="off" dir="ltr" class="input" style="text-align:start"><p class="err" data-e="amount"></p><p id="xp" class="muted" style="font-size:.8rem;margin:.2rem 0 0"></p></div>
    <div><label class="lbl">${t('fee')} <span class="muted">(${t('optional')})</span></label><input name="fee" type="text" inputmode="decimal" autocomplete="off" dir="ltr" class="input" style="text-align:start"></div>
    <div><label class="lbl">${t('date')}</label>${dateField('xd', todayISO())}</div>
    <div class="mf"><button type="button" class="btn" id="xcn">${t('cancel')}</button><button class="btn btn-grad">${t('save')}</button></div></form>`);
  const f = m.querySelector('#xf'), A = Object.fromEntries(accs.map(a => [a.id, a]));
  const info = () => { const a = A[f.from.value], b = A[f.to.value], v = parseAmt(f.amount.value);
    m.querySelector('#xc').textContent = '(' + curName(a.currency) + ')';
    m.querySelector('#xp').textContent = v > 0 && a.currency !== b.currency ? '≈ ' + money(conv(v, a.currency, b.currency), b.currency) : ''; };
  f.amount.oninput = () => { fmtAmtInput(f.amount); info(); }; f.fee.oninput = () => fmtAmtInput(f.fee); f.from.onchange = f.to.onchange = info; info();
  m.querySelector('#xcn').onclick = () => m.remove();
  f.onsubmit = async e => { e.preventDefault(); m.querySelector('[data-e=amount]').textContent = '';
    const body = { from: f.from.value, to: f.to.value, amount: parseAmt(f.amount.value), fee: parseAmt(f.fee.value) || 0, date: readDate(m.querySelector('#xd')) };
    if (!(body.amount > 0)) { m.querySelector('[data-e=amount]').textContent = t('err_amount'); return; }
    try { await api('/transfers', { method: 'POST', body }); m.remove(); toast(t('saved')); done(); } catch (er) { toast(t('err_' + er.message)); } };
}
/* ---------- budgets and goals ---------- */
function budgetModal(b, done) {
  const m = modal(`<h2 class="mb-4 text-lg font-semibold">${t('add_budget')}</h2><form id="bf" novalidate class="space-y-3">
    <div><label class="lbl">${t('category')}</label><select name="category" class="input">${EXP_CATS.filter(c => c !== 'fees').map(c => `<option value="${c}">${catName(c)}</option>`).join('')}</select></div>
    <div><label class="lbl">${t('limit')}</label><input name="limit" type="text" inputmode="decimal" autocomplete="off" dir="ltr" class="input" style="text-align:start"><p class="err" data-e="limit"></p></div>
    <div><label class="lbl">${t('currency')}</label><select name="currency" class="input"><option value="IRT">${t('toman')}</option><option value="IRR">${t('rial')}</option></select></div>
    <div class="mf"><button type="button" class="btn" id="bc">${t('cancel')}</button><button class="btn btn-grad">${t('save')}</button></div></form>`);
  const f = m.querySelector('#bf'); f.currency.value = b ? b.currency : CUR; if (b) { f.category.value = b.category; f.limit.value = Number(b.limit).toLocaleString('en-US'); }
  f.limit.oninput = () => fmtAmtInput(f.limit); m.querySelector('#bc').onclick = () => m.remove();
  f.onsubmit = async e => { e.preventDefault(); const limit = parseAmt(f.limit.value); if (!(limit > 0)) { m.querySelector('[data-e=limit]').textContent = t('err_amount'); return; }
    try { await api('/budgets', { method: 'POST', body: { category: f.category.value, limit, currency: f.currency.value } }); m.remove(); toast(t('saved')); done(); } catch (er) { toast(t('err_' + er.message)); } };
}
function goalModal(done) {
  const m = modal(`<h2 class="mb-4 text-lg font-semibold">${t('new_goal')}</h2><form id="gf" novalidate class="space-y-3">
    <div><label class="lbl">${t('goal_name')}</label><input name="name" maxlength="60" class="input"><p class="err" data-e="name"></p></div>
    <div><label class="lbl">${t('target')}</label><input name="target" type="text" inputmode="decimal" autocomplete="off" dir="ltr" class="input" style="text-align:start"><p class="err" data-e="target"></p></div>
    <div><label class="lbl">${t('currency')}</label><select name="currency" class="input"><option value="IRT">${t('toman')}</option><option value="IRR">${t('rial')}</option></select></div>
    <div><label class="lbl">${t('deadline')} <span class="muted">(${t('optional')})</span></label>${dateField('gd', '', true)}</div>
    <div class="mf"><button type="button" class="btn" id="gc">${t('cancel')}</button><button class="btn btn-grad">${t('save')}</button></div></form>`);
  const f = m.querySelector('#gf'); f.currency.value = CUR; f.target.oninput = () => fmtAmtInput(f.target); m.querySelector('#gc').onclick = () => m.remove();
  f.onsubmit = async e => { e.preventDefault(); m.querySelectorAll('.err').forEach(x => x.textContent = ''); const target = parseAmt(f.target.value); let bad = false;
    if (!f.name.value.trim()) { m.querySelector('[data-e=name]').textContent = t('err_req'); bad = true; } if (!(target > 0)) { m.querySelector('[data-e=target]').textContent = t('err_amount'); bad = true; } if (bad) return;
    try { await api('/goals', { method: 'POST', body: { name: f.name.value, target, currency: f.currency.value, deadline: readDate(m.querySelector('#gd')) } }); m.remove(); toast(t('saved')); done(); } catch (er) { toast(t('err_' + er.message)); } };
}
function fundModal(g, done) {
  const m = modal(`<h2 class="mb-1 text-lg font-semibold">${esc(g.name)}</h2><p class="muted mb-4" style="margin-top:.2rem">${money(g.saved, g.currency)} / ${money(g.target, g.currency)}</p>
    <label class="lbl">${t('amount')} <span class="muted">(${curName(g.currency)})</span></label><input id="fa" type="text" inputmode="decimal" autocomplete="off" dir="ltr" class="input" style="text-align:start"><p class="err" id="fe"></p>
    <div class="mf"><button class="btn" id="fw">${t('withdraw')}</button><button class="btn btn-grad" id="fd">${t('add_funds')}</button></div>`);
  const i = m.querySelector('#fa'); i.oninput = () => fmtAmtInput(i); i.focus();
  const go = async sign => { const v = parseAmt(i.value); if (!(v > 0)) { m.querySelector('#fe').textContent = t('err_amount'); return; }
    try { await api(`/goals/${g.id}/fund`, { method: 'POST', body: { amount: sign * v } }); m.remove(); toast(t('saved')); done(); } catch (er) { toast(t('err_invalid_amt')); } };
  m.querySelector('#fd').onclick = () => go(1); m.querySelector('#fw').onclick = () => go(-1);
}
Object.assign(T.en, { plan:'Plan', budgets:'Budgets', goals:'Savings goals', add_budget:'Add budget', new_goal:'New goal', limit:'Monthly limit', remaining:'Left', over:'Over by', target:'Target amount', deadline:'Deadline',
  add_funds:'Add funds', withdraw:'Withdraw', per_month:'needed per month', past_deadline:'Deadline passed', goal_name:'Goal name', used:'used', reached:'Goal reached', no_budgets:'No budgets yet. Set a monthly limit for a category.', no_goals:'No goals yet. Start saving for something.',
  transfer:'Transfer', from_acc:'From account', to_acc:'To account', fee:'Fee', optional:'optional', need2:'You need at least two accounts to make a transfer.', err_same_account:'Choose two different accounts.', err_invalid_amt:'Not enough saved to withdraw that amount.',
  show_more:'Show more', cmd_hide:'Hide / show amounts', cmd_transfer:'Transfer between accounts' });
Object.assign(T.fa, { plan:'برنامه‌ریزی', budgets:'بودجه‌ها', goals:'اهداف پس‌انداز', add_budget:'افزودن بودجه', new_goal:'هدف جدید', limit:'سقف ماهانه', remaining:'باقیمانده', over:'بیشتر از سقف', target:'مبلغ هدف', deadline:'موعد',
  add_funds:'افزودن پول', withdraw:'برداشت', per_month:'در هر ماه لازم است', past_deadline:'موعد گذشته است', goal_name:'نام هدف', used:'مصرف‌شده', reached:'به هدف رسیدید', no_budgets:'هنوز بودجه‌ای نیست. برای یک دسته سقف ماهانه تعیین کنید.', no_goals:'هنوز هدفی نیست. برای چیزی پس‌انداز را شروع کنید.',
  transfer:'انتقال', from_acc:'از حساب', to_acc:'به حساب', fee:'کارمزد', optional:'اختیاری', need2:'برای انتقال حداقل دو حساب لازم است.', err_same_account:'دو حساب متفاوت انتخاب کنید.', err_invalid_amt:'موجودی هدف برای این برداشت کافی نیست.',
  show_more:'نمایش بیشتر', cmd_hide:'مخفی / نمایش مبلغ‌ها', cmd_transfer:'انتقال بین حساب‌ها' });

Object.assign(T.en, { theme:'Theme', auto:'Auto', light:'Light', dark:'Dark', cmd_theme:'Switch theme (light / dark)' });
Object.assign(T.fa, { theme:'پوسته', auto:'خودکار', light:'روشن', dark:'تیره', cmd_theme:'تغییر پوسته (روشن / تیره)' });

addEventListener('keydown', e => { if (e.key === 'Escape') { const ms = document.querySelectorAll('.modal:not(.out)'); if (ms.length) ms[ms.length - 1].remove(); } });
