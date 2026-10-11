/* NEXORA API — Express + PostgreSQL. Auth: JWT in httpOnly cookie, bcrypt hashes. */
require('dotenv').config();
const express = require('express'), helmet = require('helmet'), cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit'), bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken');
const { Pool } = require('pg'), ExcelJS = require('exceljs'), PDFDocument = require('pdfkit'), path = require('path');

const PROD = process.env.NODE_ENV === 'production';
const SECRET = process.env.JWT_SECRET;
if (!SECRET || SECRET.length < 16) { console.error('JWT_SECRET (16+ chars) is required'); process.exit(1); }
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: process.env.PGSSL === '1' ? { rejectUnauthorized: false } : false });
const q = (sql, p = []) => pool.query(sql, p);

const app = express();
app.set('trust proxy', 1);
app.use(helmet({ contentSecurityPolicy: { directives: {
  defaultSrc: ["'self'"], scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.tailwindcss.com', 'https://cdn.jsdelivr.net'],
  styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'], fontSrc: ['https://fonts.gstatic.com'],
  imgSrc: ["'self'", 'data:'], connectSrc: ["'self'"] } } }));
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ---------- helpers ---------- */
const wrap = fn => (req, res) => fn(req, res).catch(e => { console.error(e); res.status(500).json({ error: 'server' }); });
const isDate = s => /^\d{4}-\d{2}-\d{2}$/.test(s || '') && !isNaN(Date.parse(s));
const isEmail = s => typeof s === 'string' && s.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
const sign = (id, days) => jwt.sign({ id }, SECRET, { expiresIn: `${days}d` });
function setCookie(res, id, remember) {
  res.cookie('token', sign(id, remember ? 30 : 1), { httpOnly: true, sameSite: 'lax', secure: PROD,
    ...(remember ? { maxAge: 30 * 864e5 } : {}) });
}
const auth = (req, res, next) => {
  try { req.uid = jwt.verify(req.cookies.token, SECRET).id; next(); }
  catch { res.status(401).json({ error: 'unauthorized' }); }
};

/* ---------- auth ---------- */
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 30, handler: (_, r) => r.status(429).json({ error: 'too_many' }) });
app.post('/api/auth/signup', limiter, wrap(async (req, res) => {
  const { name, email, password, confirm } = req.body || {};
  if (typeof name !== 'string' || name.trim().length < 2 || name.length > 80) return res.status(400).json({ error: 'name', field: 'name' });
  if (!isEmail(email)) return res.status(400).json({ error: 'email', field: 'email' });
  if (typeof password !== 'string' || password.length < 8 || password.length > 72) return res.status(400).json({ error: 'pw', field: 'password' });
  if (password !== confirm) return res.status(400).json({ error: 'match', field: 'confirm' });
  const hash = await bcrypt.hash(password, 12);
  try {
    const { rows } = await q('INSERT INTO users(name,email,password_hash) VALUES($1,$2,$3) RETURNING id,name,email', [name.trim(), email.toLowerCase(), hash]);
    setCookie(res, rows[0].id, false);
    res.status(201).json({ user: rows[0] });
  } catch (e) {
    if (e.code === '23505') return res.status(409).json({ error: 'email_taken', field: 'email' });
    throw e;
  }
}));
app.post('/api/auth/login', limiter, wrap(async (req, res) => {
  const { email, password, remember } = req.body || {};
  const { rows } = await q('SELECT * FROM users WHERE email=$1', [String(email || '').toLowerCase()]);
  // Same error for unknown email / wrong password (no account enumeration)
  const ok = rows[0] && typeof password === 'string' && await bcrypt.compare(password, rows[0].password_hash);
  if (!ok) return res.status(401).json({ error: 'bad_credentials' });
  setCookie(res, rows[0].id, !!remember);
  res.json({ user: { id: rows[0].id, name: rows[0].name, email: rows[0].email } });
}));
app.post('/api/auth/logout', (req, res) => { res.clearCookie('token'); res.json({ ok: true }); });
app.get('/api/auth/me', auth, wrap(async (req, res) => {
  const { rows } = await q('SELECT id,name,email FROM users WHERE id=$1', [req.uid]);
  if (!rows[0]) return res.status(401).json({ error: 'unauthorized' });
  res.json({ user: rows[0] });
}));

/* ---------- transactions ---------- */
const COLS = `id,type,amount::float AS amount,category,description,to_char(date,'YYYY-MM-DD') AS date`;
function where(uid, f) { // shared by list + export; every value is parameterised
  const w = ['user_id=$1'], p = [uid];
  const add = (sql, v) => { p.push(v); w.push(sql.replace('?', '$' + p.length)); };
  if (['income', 'expense'].includes(f.type)) add('type=?', f.type);
  if (f.category) add('category=?', String(f.category).slice(0, 40));
  if (isDate(f.from)) add('date>=?', f.from);
  if (isDate(f.to)) add('date<=?', f.to);
  if (f.q) add('description ILIKE ?', '%' + String(f.q).slice(0, 100).replace(/[%_\\]/g, '\\$&') + '%');
  return { w: w.join(' AND '), p };
}
function cleanTx(b) {
  const amount = Number(b.amount), d = String(b.description || '').trim().slice(0, 200);
  if (!['income', 'expense'].includes(b.type)) return null;
  if (!(amount > 0) || amount > 1e12) return null;
  if (!b.category || String(b.category).length > 40 || !isDate(b.date)) return null;
  return [b.type, amount.toFixed(2), String(b.category), d, b.date];
}
app.get('/api/transactions', auth, wrap(async (req, res) => {
  const { w, p } = where(req.uid, req.query);
  const limit = Math.min(parseInt(req.query.limit) || 500, 1000);
  const { rows } = await q(`SELECT ${COLS} FROM transactions WHERE ${w} ORDER BY date DESC,id DESC LIMIT ${limit}`, p);
  res.json({ transactions: rows });
}));
app.post('/api/transactions', auth, wrap(async (req, res) => {
  const v = cleanTx(req.body || {}); if (!v) return res.status(400).json({ error: 'invalid' });
  const { rows } = await q(`INSERT INTO transactions(user_id,type,amount,category,description,date) VALUES($1,$2,$3,$4,$5,$6) RETURNING ${COLS}`, [req.uid, ...v]);
  res.status(201).json({ transaction: rows[0] });
}));
app.put('/api/transactions/:id', auth, wrap(async (req, res) => {
  const v = cleanTx(req.body || {}), id = parseInt(req.params.id);
  if (!v || !id) return res.status(400).json({ error: 'invalid' });
  const { rows } = await q(`UPDATE transactions SET type=$3,amount=$4,category=$5,description=$6,date=$7 WHERE id=$1 AND user_id=$2 RETURNING ${COLS}`, [id, req.uid, ...v]);
  rows[0] ? res.json({ transaction: rows[0] }) : res.status(404).json({ error: 'not_found' });
}));
app.delete('/api/transactions/:id', auth, wrap(async (req, res) => {
  const r = await q('DELETE FROM transactions WHERE id=$1 AND user_id=$2', [parseInt(req.params.id) || 0, req.uid]);
  r.rowCount ? res.json({ ok: true }) : res.status(404).json({ error: 'not_found' });
}));

/* ---------- reports ---------- */
app.get('/api/reports/summary', auth, wrap(async (req, res) => {
  const sum = `COALESCE(SUM(amount) FILTER(WHERE type='income'),0)::float AS income, COALESCE(SUM(amount) FILTER(WHERE type='expense'),0)::float AS expense`;
  const month = `date>=date_trunc('month',CURRENT_DATE)`;
  const [all, mon, trend, cats] = await Promise.all([
    q(`SELECT ${sum} FROM transactions WHERE user_id=$1`, [req.uid]),
    q(`SELECT ${sum} FROM transactions WHERE user_id=$1 AND ${month}`, [req.uid]),
    q(`SELECT to_char(date_trunc('month',date),'YYYY-MM') AS m, ${sum} FROM transactions WHERE user_id=$1 AND date>=date_trunc('month',CURRENT_DATE)-interval '5 months' GROUP BY 1 ORDER BY 1`, [req.uid]),
    q(`SELECT category, SUM(amount)::float AS total FROM transactions WHERE user_id=$1 AND type='expense' AND ${month} GROUP BY 1 ORDER BY 2 DESC`, [req.uid])
  ]);
  res.json({ balance: all.rows[0].income - all.rows[0].expense, month: mon.rows[0], trend: trend.rows, categories: cats.rows });
}));

/* ---------- export ---------- */
async function exportData(req) {
  const { w, p } = where(req.uid, { from: req.query.from, to: req.query.to });
  const { rows } = await q(`SELECT ${COLS} FROM transactions WHERE ${w} ORDER BY date DESC,id DESC`, p);
  const income = rows.filter(r => r.type === 'income').reduce((a, r) => a + r.amount, 0);
  const expense = rows.filter(r => r.type === 'expense').reduce((a, r) => a + r.amount, 0);
  const byCat = {}; rows.filter(r => r.type === 'expense').forEach(r => byCat[r.category] = (byCat[r.category] || 0) + r.amount);
  return { rows, income, expense, byCat };
}
app.get('/api/export/excel', auth, wrap(async (req, res) => {
  const { rows, income, expense, byCat } = await exportData(req);
  const wb = new ExcelJS.Workbook(); wb.creator = 'NEXORA';
  const s1 = wb.addWorksheet('Transactions');
  s1.columns = [{ header: 'Date', key: 'date', width: 13 }, { header: 'Type', key: 'type', width: 10 }, { header: 'Category', key: 'category', width: 16 },
    { header: 'Description', key: 'description', width: 40 }, { header: 'Amount', key: 'amount', width: 14, style: { numFmt: '#,##0.00' } }];
  s1.addRows(rows);
  s1.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
  s1.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF6366F1' } };
  const last = s1.rowCount + 1;
  s1.addRow({ description: 'Total income', amount: income }).font = { bold: true };
  s1.addRow({ description: 'Total expense', amount: expense }).font = { bold: true };
  s1.addRow({ description: 'Net', amount: income - expense }).font = { bold: true };
  const s2 = wb.addWorksheet('Summary');
  s2.columns = [{ header: 'Item', key: 'k', width: 22 }, { header: 'Amount', key: 'v', width: 16, style: { numFmt: '#,##0.00' } }];
  s2.addRows([{ k: 'Total income', v: income }, { k: 'Total expense', v: expense }, { k: 'Net', v: income - expense }, {}, { k: 'Expenses by category' }]);
  Object.entries(byCat).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => s2.addRow({ k, v }));
  s2.getRow(1).font = { bold: true };
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=nexora-report.xlsx');
  await wb.xlsx.write(res); res.end();
}));
app.get('/api/export/pdf', auth, wrap(async (req, res) => {
  const { rows, income, expense } = await exportData(req);
  const doc = new PDFDocument({ margin: 48, size: 'A4' }), f = n => n.toLocaleString('en-US', { minimumFractionDigits: 2 });
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=nexora-report.pdf');
  doc.pipe(res);
  // Logo mark + wordmark
  doc.roundedRect(48, 44, 30, 30, 8).fill('#6366F1');
  doc.fillColor('#fff').font('Helvetica-Bold').fontSize(16).text('N', 48, 52, { width: 30, align: 'center' });
  doc.fillColor('#111').fontSize(20).text('NEXORA', 88, 50);
  doc.font('Helvetica').fontSize(10).fillColor('#666').text(`${req.query.from || 'Start'} to ${req.query.to || 'Today'}`, 48, 90);
  doc.fontSize(12).fillColor('#111').text(`Income ${f(income)}    Expense ${f(expense)}    Net ${f(income - expense)}`, 48, 112);
  let y = 150;
  const row = (c, bold) => { doc.font(bold ? 'Helvetica-Bold' : 'Helvetica').fontSize(9).fillColor(bold ? '#6366F1' : '#222');
    [[c[0], 48, 70], [c[1], 120, 60], [c[2], 182, 80], [c[3], 264, 190], [c[4], 456, 90]].forEach(([t, x, w], i) => doc.text(String(t), x, y, { width: w, align: i === 4 ? 'right' : 'left', lineBreak: false }));
    y += 18; };
  row(['Date', 'Type', 'Category', 'Description', 'Amount'], true);
  for (const r of rows) {
    if (y > 780) { doc.addPage(); y = 48; }
    row([r.date, r.type, r.category, r.description.slice(0, 40), (r.type === 'expense' ? '-' : '+') + f(r.amount)]);
  }
  doc.end();
}));

/* ---------- boot: create tables, then listen ---------- */
async function init() {
  await q(`CREATE TABLE IF NOT EXISTS users(id SERIAL PRIMARY KEY, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
    CREATE TABLE IF NOT EXISTS transactions(id SERIAL PRIMARY KEY, user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      type TEXT NOT NULL CHECK(type IN('income','expense')), amount NUMERIC(14,2) NOT NULL CHECK(amount>0), category TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '', date DATE NOT NULL, created_at TIMESTAMPTZ DEFAULT now());
    CREATE INDEX IF NOT EXISTS tx_user_date ON transactions(user_id,date DESC);`);
  app.listen(process.env.PORT || 3000, () => console.log('NEXORA running'));
}
init().catch(e => { console.error(e); process.exit(1); });
