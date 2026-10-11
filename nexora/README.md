# NEXORA
Local: `npm i`, copy `.env.example` to `.env`, set DATABASE_URL + JWT_SECRET, `npm run dev`, open http://localhost:3000
Deploy API: Railway (add Postgres plugin, set JWT_SECRET, NODE_ENV=production). Tables are created on boot.
Deploy frontend: Vercel (root of this folder). Put your Railway URL in vercel.json so /api/* is proxied (same-origin cookies).
