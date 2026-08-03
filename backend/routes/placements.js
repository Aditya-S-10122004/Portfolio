const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// GET /api/placements — public
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM placements ORDER BY date DESC, created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/placements — admin only
router.post('/', auth, async (req, res) => {
  const { company, role, date, status, reason, package: pkg, notes } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO placements (company, role, date, status, reason, package, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [company, role, date, status, reason, pkg, notes]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/placements/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { company, role, date, status, reason, package: pkg, notes } = req.body;
  try {
    const result = await pool.query(
      `UPDATE placements SET company=$1, role=$2, date=$3, status=$4,
       reason=$5, package=$6, notes=$7 WHERE id=$8 RETURNING *`,
      [company, role, date, status, reason, pkg, notes, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/placements/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM placements WHERE id = $1', [req.params.id]);
    res.json({ message: 'Placement deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
