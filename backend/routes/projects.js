const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// Supabase via pg driver can return TEXT[] as a string like '{React,Node.js}'
// This helper ensures it's always a proper JS array
function parseArray(val) {
  if (Array.isArray(val)) return val;
  if (typeof val === 'string') {
    return val.replace(/^{|}$/g, '').split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

// GET /api/projects — public
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM projects ORDER BY featured DESC, created_at DESC'
    );
    const rows = result.rows.map(p => ({ ...p, tech_stack: parseArray(p.tech_stack) }));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/projects/:id — public
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM projects WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/projects — admin only
router.post('/', auth, async (req, res) => {
  const { title, description, tech_stack, live_url, github_url, image_url, featured } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO projects (title, description, tech_stack, live_url, github_url, image_url, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [title, description, tech_stack, live_url, github_url, image_url, featured || false]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/projects/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { title, description, tech_stack, live_url, github_url, image_url, featured } = req.body;
  try {
    const result = await pool.query(
      `UPDATE projects SET title=$1, description=$2, tech_stack=$3, live_url=$4,
       github_url=$5, image_url=$6, featured=$7 WHERE id=$8 RETURNING *`,
      [title, description, tech_stack, live_url, github_url, image_url, featured, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/projects/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM projects WHERE id = $1', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
