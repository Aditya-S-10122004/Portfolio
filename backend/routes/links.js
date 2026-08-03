const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// GET /api/links — public
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM links ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/links — admin only
router.post('/', auth, async (req, res) => {
  const { label, url, icon } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO links (label, url, icon) VALUES ($1, $2, $3) RETURNING *',
      [label, url, icon]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/links/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { label, url, icon } = req.body;
  try {
    const result = await pool.query(
      'UPDATE links SET label=$1, url=$2, icon=$3 WHERE id=$4 RETURNING *',
      [label, url, icon, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/links/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM links WHERE id = $1', [req.params.id]);
    res.json({ message: 'Link deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
