-- =========================================
-- Companies Table Setup for RumorStreet
-- Run this in Supabase SQL Editor
-- =========================================

-- Step 1: Create companies table
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(10) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  headquarters VARCHAR(255) NOT NULL,
  lat NUMERIC(10, 6) NOT NULL,
  lng NUMERIC(10, 6) NOT NULL,
  color VARCHAR(10) NOT NULL DEFAULT '#3b82f6',
  price VARCHAR(20) NOT NULL DEFAULT '$0.00',
  change VARCHAR(20) NOT NULL DEFAULT '0.00%',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 2: Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies (everyone can read, only service role can insert/update/delete)
CREATE POLICY "Anyone can view companies" 
  ON companies FOR SELECT
  USING (true);

-- Step 4: Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_companies_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_companies_timestamp ON companies;
CREATE TRIGGER update_companies_timestamp
    BEFORE UPDATE ON companies
    FOR EACH ROW
    EXECUTE FUNCTION update_companies_updated_at();

-- Step 6: Insert sample companies with real headquarters coordinates
INSERT INTO companies (symbol, name, headquarters, lat, lng, color, price, change)
VALUES
  ('AAPL', 'Apple', 'Cupertino, CA, USA', 37.3346, -122.0096, '#6b7280', '$189.20', '+0.95%'),
  ('GOOGL', 'Google', 'Mountain View, CA, USA', 37.4220, -122.1430, '#3b82f6', '$140.50', '+1.85%'),
  ('AMZN', 'Amazon', 'Seattle, WA, USA', 47.6205, -122.3493, '#f59e0b', '$145.30', '+2.40%'),
  ('MSFT', 'Microsoft', 'Redmond, WA, USA', 47.6423, -122.1390, '#0ea5e9', '$420.15', '+2.10%'),
  ('TSLA', 'Tesla', 'Austin, TX, USA', 30.2672, -97.7431, '#ef4444', '$242.80', '-1.20%'),
  ('META', 'Meta', 'Menlo Park, CA, USA', 37.4849, -122.1477, '#3b82f6', '$310.75', '+3.50%'),
  ('NVDA', 'NVIDIA', 'Santa Clara, CA, USA', 37.3708, -121.9644, '#a3e635', '$875.50', '+5.20%'),
  ('NFLX', 'Netflix', 'Los Gatos, CA, USA', 37.2266, -121.9744, '#e11d48', '$485.60', '+1.75%')
ON CONFLICT (symbol) DO NOTHING;

-- Step 7: Verify the setup
SELECT symbol, name, headquarters, lat, lng, color, price, change
FROM companies
ORDER BY symbol;

-- SUCCESS! Companies table ready
-- ✅ All companies will be fetched dynamically from database
-- ✅ Add new companies via Supabase Table Editor → companies table
-- ✅ Changes reflect instantly on the map
-- ✅ Only admins can add/edit via Supabase dashboard
