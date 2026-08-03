-- ============================================
-- Portfolio Database Schema
-- Run this on the NLP database
-- ============================================

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tech_stack TEXT[],
  live_url VARCHAR(500),
  github_url VARCHAR(500),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Skills Table
CREATE TABLE IF NOT EXISTS skills (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(100),
  level INT CHECK (level >= 0 AND level <= 100)
);

-- Placements Table
CREATE TABLE IF NOT EXISTS placements (
  id SERIAL PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  date DATE,
  status VARCHAR(50) CHECK (status IN ('selected', 'rejected', 'pending', 'on-hold')),
  reason TEXT,
  package VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Links Table
CREATE TABLE IF NOT EXISTS links (
  id SERIAL PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  url VARCHAR(500) NOT NULL,
  icon VARCHAR(100)
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Admin Table
CREATE TABLE IF NOT EXISTS admins (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

-- ============================================
-- Seed: Admin User
-- Username: AdityaSadalagi | Password: ADITYAS@2315
-- (bcrypt hash generated at cost 10)
-- ============================================
-- Run seed.js instead to insert the admin with a real hash
