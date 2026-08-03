const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// GET /api/skills — public
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM skills ORDER BY category, level DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/skills — admin only
router.post('/', auth, async (req, res) => {
  const { name, category, level } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO skills (name, category, level) VALUES ($1, $2, $3) RETURNING *',
      [name, category, level]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/skills/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { name, category, level } = req.body;
  try {
    const result = await pool.query(
      'UPDATE skills SET name=$1, category=$2, level=$3 WHERE id=$4 RETURNING *',
      [name, category, level, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/skills/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM skills WHERE id = $1', [req.params.id]);
    res.json({ message: 'Skill deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
