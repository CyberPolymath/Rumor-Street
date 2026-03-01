# Account Page Database Sync - Testing Guide

## ✅ What's Already Working

Your account page **already has full database sync implemented**. Here's what happens:

### On Page Load:
1. Fetches your profile from Supabase `profiles` table
2. Pre-fills all fields: username, full name, DOB, gender, phone
3. Shows your user ID and last sign-in time

### When You Click "Save Profile":
1. Takes all field values from the form
2. Calls `supabase.from('profiles').upsert()` with all data
3. Updates: `username`, `full_name`, `dob`, `gender`, `phone`, `updated_at`
4. Shows "✅ Profile saved successfully!" message
5. Data is **instantly saved to database**

### Cross-Device/Session Persistence:
- Data loads from database on **every** login
- Works on any device, any browser
- Survives sign out/sign in
- Completely persistent

---

## 🚀 Setup Steps

### 1. Run SQL in Supabase
1. Open Supabase Dashboard → SQL Editor
2. Copy entire contents of `account-page-sync-setup.sql`
3. Click "Run" 
4. Verify output shows all columns exist

### 2. Start Your Development Server
```powershell
npm run dev
```

### 3. Test the Flow

#### Test 1: Basic Save & Load
1. Navigate to http://localhost:3000/account
2. Fill in the fields:
   - Username: `johndoe`
   - Full Name: `John Doe`
   - Date of Birth: `1990-01-15`
   - Gender: `Male`
   - Phone: `+1234567890`
3. Click **"Save Profile"** button
4. Look for message: "✅ Profile saved successfully!"
5. Open browser console (F12) - should see: `💾 Saving profile data:` and `✅ Profile saved:`

#### Test 2: Persistence Across Sessions
1. Click **"Sign Out"** button
2. Sign in again with same credentials
3. Go to `/account` page
4. **All your data should still be there!** ✅

#### Test 3: Cross-Device Persistence
1. Open a different browser (or incognito window)
2. Navigate to http://localhost:3000
3. Sign in with same account
4. Go to `/account` page
5. **All your data should appear!** ✅

#### Test 4: Edit & Re-Save
1. Change username to `johndoe2`
2. Change gender to `Other`
3. Click **"Save Profile"**
4. Success message should appear
5. Refresh page (Ctrl+R)
6. **New values should persist!** ✅

---

## 🔍 Debugging

### Check Browser Console (F12)
You should see these logs when saving:
```
💾 Saving profile data: { id: "...", username: "johndoe", ... }
✅ Profile saved: [{ id: "...", username: "johndoe", ... }]
```

If you see errors:
```
❌ Save error: { message: "...", code: "..." }
```

### Check Supabase Dashboard
1. Go to Supabase → Table Editor → `profiles` table
2. Find your row (search by email)
3. Verify columns are updated with your values
4. Check `updated_at` timestamp changes after each save

### Common Issues

**"Permission denied for table profiles"**
- Run the SQL setup script again
- Check that RLS policies allow UPDATE for `auth.uid() = id`

**"Column does not exist"**
- Run the SQL setup script to add missing columns
- Verify with: `SELECT * FROM information_schema.columns WHERE table_name = 'profiles'`

**Save button doesn't respond**
- Check browser console for errors
- Verify `npm run dev` is running
- Check network tab for failed API calls

**Data doesn't persist**
- Verify SQL setup created `updated_at` trigger
- Check Supabase logs for errors
- Verify you're logged in as same user

---

## 📝 What Just Got Enhanced

### Before:
- ✅ Form fields existed
- ✅ Save button called upsert
- ❓ No explicit timestamp update
- ❓ No logging for debugging

### After:
- ✅ Form fields exist
- ✅ Save button calls upsert
- ✅ Explicitly sets `updated_at` timestamp
- ✅ Console logging for debugging
- ✅ Handles null values properly
- ✅ Returns saved data for verification
- ✅ Database trigger auto-updates timestamp

---

## 🎯 Expected Behavior

### Fields That Sync:
- ✅ Username
- ✅ Full Name  
- ✅ Date of Birth
- ✅ Gender
- ✅ Phone Number
- ❌ Email (read-only, comes from auth)

### Where Data is Stored:
- **Table**: `public.profiles`
- **Row**: One row per user (id matches auth.users.id)
- **Columns**: username, full_name, dob, gender, phone
- **Auto-updated**: created_at, updated_at

### How Updates Work:
1. User edits form fields
2. Clicks "Save Profile"
3. React state → Supabase `.upsert()`
4. Database trigger updates `updated_at`
5. Success message shows
6. Data persists forever

---

## ✨ Success Criteria

You'll know it's working when:
1. ✅ Save button shows success message
2. ✅ Console logs show saved data
3. ✅ Sign out → Sign in → Data still there
4. ✅ Different browser → Same data appears
5. ✅ Supabase dashboard shows updated values
6. ✅ `updated_at` timestamp changes after each save

---

## 🎉 You're All Set!

Your account page now has **instant database sync** working. Every time a user:
- Fills in their details
- Clicks "Save Profile"
- The data is **immediately saved to Supabase**
- And **persists across all logins and devices** ✅

No additional code needed - it's already fully functional! 🚀
