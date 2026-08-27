-- Run this in Supabase Dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS certificates (
  id             SERIAL PRIMARY KEY,
  title          TEXT NOT NULL,
  issuer         TEXT NOT NULL,
  issue_date     DATE,
  credential_url TEXT,
  image_url      TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);
