const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// GET /api/certificates — public
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM certificates ORDER BY issue_date DESC, created_at DESC'
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /api/certificates — admin only
router.post('/', auth, async (req, res) => {
  const { title, issuer, issue_date, credential_url, image_url } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO certificates (title, issuer, issue_date, credential_url, image_url)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, issuer, issue_date || null, credential_url, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/certificates/:id — admin only
router.put('/:id', auth, async (req, res) => {
  const { title, issuer, issue_date, credential_url, image_url } = req.body;
  try {
    const result = await pool.query(
      `UPDATE certificates SET title=$1, issuer=$2, issue_date=$3,
       credential_url=$4, image_url=$5 WHERE id=$6 RETURNING *`,
      [title, issuer, issue_date || null, credential_url, image_url, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/certificates/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM certificates WHERE id = $1', [req.params.id]);
    res.json({ message: 'Certificate deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
