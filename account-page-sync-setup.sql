-- =========================================
-- Account Page Database Sync Setup
-- Run this in Supabase SQL Editor
-- =========================================

-- Step 1: Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS profiles (
  id UUID NOT NULL PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(255),
  username VARCHAR(255),
  full_name VARCHAR(255),
  avatar_url VARCHAR(255),
  dob DATE,
  gender VARCHAR(50),
  phone VARCHAR(20),
  wallet_balance NUMERIC(15,2) DEFAULT 10000,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Step 1b: Add any missing columns to profiles table
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS username VARCHAR(255),
  ADD COLUMN IF NOT EXISTS full_name VARCHAR(255),
  ADD COLUMN IF NOT EXISTS dob DATE,
  ADD COLUMN IF NOT EXISTS gender VARCHAR(50),
  ADD COLUMN IF NOT EXISTS phone VARCHAR(20),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Step 2: Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS policies
CREATE POLICY "Users can view own profile" 
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" 
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Step 4: Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 5: Create function to auto-create profile when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, wallet_balance, created_at, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    SPLIT_PART(NEW.email, '@', 1),
    10000,
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 6: Drop old trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 7: Create trigger to auto-create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Step 8: Drop old timestamp trigger if exists
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;

-- Step 9: Create trigger to auto-update updated_at on every UPDATE
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Step 10: Verify the setup
SELECT 
  column_name, 
  data_type, 
  is_nullable
FROM information_schema.columns
WHERE table_name = 'profiles'
ORDER BY ordinal_position;

-- Expected columns:
-- id (uuid, NO)
-- email (varchar, YES)
-- username (varchar, YES)
-- full_name (varchar, YES)
-- avatar_url (varchar, YES)
-- dob (date, YES)
-- gender (varchar, YES)
-- phone (varchar, YES)
-- wallet_balance (numeric, YES)  
-- created_at (timestamptz, YES)
-- updated_at (timestamptz, YES)

-- SUCCESS! Your account page will now:
-- ✅ Save all fields (username, full_name, dob, gender, phone) to database
-- ✅ Auto-update the 'updated_at' timestamp on every save
-- ✅ Load saved data when user logs in (even from different devices)
-- ✅ Persist across all sessions and devices
