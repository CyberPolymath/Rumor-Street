# Companies Database Integration - Setup Guide

## ✅ What Was Changed

### 1. Created Supabase Companies Table
**File**: `companies-table-setup.sql`

The table includes:
- `id` - Auto-incrementing primary key
- `symbol` - Company stock symbol (unique)
- `name` - Company name
- `headquarters` - Location (e.g., "Cupertino, CA, USA")
- `lat` - Latitude coordinate (auto-filled based on headquarters)
- `lng` - Longitude coordinate (auto-filled based on headquarters)
- `color` - Hex color for map marker
- `price` - Current stock price
- `change` - Price change percentage
- `created_at` / `updated_at` - Timestamps

### 2. Updated Home Page
**File**: `app/home/page.tsx`

Changes:
- ✅ Removed hardcoded `COMPANIES` array (lines 30-39)
- ✅ Added Supabase import
- ✅ Updated `Company` interface to use `lat/lng` instead of `x/y`
- ✅ Added `companies` state and `loadingCompanies` state
- ✅ Added `useEffect` to fetch companies from Supabase
- ✅ Pass `companies` and `loading` props to `GameMap` component

### 3. Updated GameMap Component
**File**: `components/GameMap.tsx`

Changes:
- ✅ Removed hardcoded `COMPANIES` array
- ✅ Updated props to accept `companies` and `loading`
- ✅ Updated `Company` interface to use `headquarters` instead of `country`
- ✅ Map now renders companies from props dynamically
- ✅ Added loading overlay while companies are being fetched
- ✅ Map re-renders when companies change (useEffect dependency)

---

## 🚀 Setup Steps

### Step 1: Run SQL in Supabase
1. Open **Supabase Dashboard** → Your project → **SQL Editor**
2. Copy entire contents of `companies-table-setup.sql`
3. **Paste** and **Run**
4. Verify output shows 8 companies inserted

### Step 2: Start Development Server
```powershell
npm run dev
```

### Step 3: Test the Integration
1. Navigate to `http://localhost:3000/home`
2. Wait for "Loading companies..." to complete
3. Map should display all companies from database
4. Click on any company marker to see details

---

## 📊 How to Add New Companies

### Option 1: Via Supabase Dashboard (Recommended for Admin)
1. Open **Supabase Dashboard** → **Table Editor**
2. Select **companies** table
3. Click **Insert row** button
4. Fill in the fields:
   - `symbol`: Stock symbol (e.g., "ORCL")
   - `name`: Company name (e.g., "Oracle")
   - `headquarters`: Location (e.g., "Austin, TX, USA")
   - `lat`: Latitude (e.g., 30.2672)
   - `lng`: Longitude (e.g., -97.7431)
   - `color`: Hex color (e.g., "#ef4444")
   - `price`: Current price (e.g., "$115.20")
   - `change`: Percentage change (e.g., "+1.45%")
5. Click **Save**
6. **Refresh your app** - company appears instantly on map! ✨

### Option 2: Via SQL
```sql
INSERT INTO companies (symbol, name, headquarters, lat, lng, color, price, change)
VALUES ('ORCL', 'Oracle', 'Austin, TX, USA', 30.2672, -97.7431, '#ef4444', '$115.20', '+1.45%');
```

---

## 🗺️ Finding Latitude/Longitude Coordinates

Use these tools to find headquarters coordinates:
1. **Google Maps**: Right-click location → Copy coordinates
2. **LatLong.net**: Search city/address → Get lat/lng
3. **OpenStreetMap**: Search location → URL shows coordinates

Example coordinates:
- **New York, NY**: `40.7128, -74.0060`
- **London, UK**: `51.5074, -0.1278`
- **Tokyo, Japan**: `35.6762, 139.6503`
- **Mumbai, India**: `19.0760, 72.8777`

---

## 🎨 Color Palette for Companies

Choose from these accent colors:
- `#3b82f6` - Blue (Tech)
- `#f59e0b` - Amber (E-commerce)
- `#ef4444` - Red (Automotive)
- `#a3e635` - Lime Green (Gaming/Graphics)
- `#6b7280` - Gray (Consumer Electronics)
- `#0ea5e9` - Sky Blue (Software)
- `#fbbf24` - Yellow (Retail)
- `#e11d48` - Rose (Entertainment)

---

## ✅ Benefits of This Approach

### Before (Hardcoded Array):
- ❌ Had to edit code to add companies
- ❌ Required redeployment for changes
- ❌ Not scalable for large datasets
- ❌ No way to update prices dynamically

### After (Database-Driven):
- ✅ Add companies via Supabase dashboard (no code changes)
- ✅ Changes reflect instantly on app refresh
- ✅ Scalable - can handle hundreds of companies
- ✅ Easy to integrate real-time price updates later
- ✅ Admin can manage companies without developer access
- ✅ Can add more columns as needed (market cap, volume, etc.)

---

## 🔮 Future Enhancements

You can easily extend this by adding columns:
- `market_cap` - Market capitalization
- `volume` - Trading volume
- `sector` - Industry sector
- `description` - Company description
- `logo_url` - Company logo image
- `is_active` - Enable/disable companies without deleting
- `last_updated` - Track when price was last updated

To add a new column:
```sql
ALTER TABLE companies ADD COLUMN market_cap VARCHAR(50);
```

Then update your interface and components to use the new field!

---

## 🎯 Testing Checklist

- [ ] Run SQL setup script in Supabase
- [ ] Verify 8 companies in `companies` table
- [ ] Start development server (`npm run dev`)
- [ ] Navigate to `/home` page
- [ ] Confirm "Loading companies..." appears briefly
- [ ] Confirm all 8 companies display on map
- [ ] Click a company marker - popup shows details
- [ ] Add a new company via Supabase dashboard
- [ ] Refresh app - new company appears on map ✅

---

## 🆘 Troubleshooting

**"Loading companies..." never disappears**
- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Check RLS policies allow SELECT on companies table

**Companies not showing on map**
- Verify data exists: `SELECT * FROM companies;`
- Check lat/lng values are valid numbers
- Look for console errors in browser DevTools

**"Permission denied" error**
- RLS policy may be blocking reads
- Run: `ALTER TABLE companies ENABLE ROW LEVEL SECURITY;`
- Ensure "Anyone can view companies" policy exists

---

## 🎉 You're All Set!

Your RumorStreet game now has a **dynamic, database-driven company system**. Just add companies through Supabase and they'll appear on the map instantly! 🚀
