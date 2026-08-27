const express = require('express');
const router  = express.Router();
const multer  = require('multer');
const auth    = require('../middleware/auth');

// Store file in memory (we forward it straight to Supabase)
const upload = multer({
  storage: multer.memoryStorage(),
  limits:  { fileSize: 10 * 1024 * 1024 }, // 10 MB max
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

// POST /api/upload  (admin only)
router.post('/', auth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

  const projectRef = process.env.SUPABASE_PROJECT_REF;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!projectRef || !serviceKey) {
    return res.status(500).json({ error: 'Supabase storage not configured. Add SUPABASE_PROJECT_REF and SUPABASE_SERVICE_KEY to .env' });
  }

  const bucket   = 'portfolio';
  const ext      = req.file.originalname.split('.').pop();
  const filename = `certificates/${Date.now()}.${ext}`;
  const uploadUrl = `https://${projectRef}.supabase.co/storage/v1/object/${bucket}/${filename}`;

  try {
    const response = await fetch(uploadUrl, {
      method:  'POST',
      headers: {
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type':  req.file.mimetype,
        'x-upsert':      'true',
      },
      body: req.file.buffer,
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('Supabase upload error:', text);
      return res.status(500).json({ error: 'Supabase upload failed', details: text });
    }

    const publicUrl = `https://${projectRef}.supabase.co/storage/v1/object/public/${bucket}/${filename}`;
    res.json({ url: publicUrl });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
