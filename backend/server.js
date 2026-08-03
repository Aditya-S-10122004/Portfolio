require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'], // frontend + admin
  credentials: true,
}));
app.use(express.json());

// ─── Routes ───────────────────────────────────────────────
app.use('/api/auth',       require('./routes/auth'));
app.use('/api/projects',   require('./routes/projects'));
app.use('/api/skills',     require('./routes/skills'));
app.use('/api/placements', require('./routes/placements'));
app.use('/api/links',      require('./routes/links'));
app.use('/api/messages',   require('./routes/messages'));

// ─── Health check ─────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Aditya Portfolio API running 🚀' });
});

// ─── 404 ──────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ─── Start ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Portfolio API running on http://localhost:${PORT}`);
  console.log(`📋 Routes:
  POST   /api/auth/login
  GET    /api/projects
  GET    /api/skills
  GET    /api/placements
  GET    /api/links
  POST   /api/messages
  `);
});
