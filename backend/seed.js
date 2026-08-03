// Run this once to create tables and seed the admin user
require('dotenv').config();
const pool = require('./db');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function setup() {
  try {
    // Run schema
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    await pool.query(schema);
    console.log('✅ Tables created');

    // Seed admin
    const hash = await bcrypt.hash('ADITYAS@2315', 10);
    await pool.query(
      `INSERT INTO admins (username, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (username) DO UPDATE SET password_hash = $2`,
      ['AdityaSadalagi', hash]
    );
    console.log('✅ Admin user seeded: AdityaSadalagi');
    console.log('🎉 Database setup complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Setup failed:', err.message);
    process.exit(1);
  }
}

setup();
