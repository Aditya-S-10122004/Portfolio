const express = require('express');
const router = express.Router();
const pool = require('../db');
const auth = require('../middleware/auth');

// POST /api/messages — public (contact form)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO messages (name, email, message) VALUES ($1, $2, $3) RETURNING *',
      [name, email, message]
    );
    res.status(201).json({ success: true, message: 'Message sent!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/messages — admin only
router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/messages/:id/read — admin only (mark as read)
router.put('/:id/read', auth, async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE messages SET read = true WHERE id = $1 RETURNING *',
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /api/messages/:id — admin only
router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM messages WHERE id = $1', [req.params.id]);
    res.json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
