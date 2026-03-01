import { supabase } from '@/lib/supabase';
import { User } from '@supabase/supabase-js';

/**
 * Ensures a profile exists for the given user
 * Creates one if it doesn't exist yet
 */
export const ensureProfileExists = async (user: User) => {
  if (!user) {
    console.log('❌ No user provided to ensureProfileExists');
    return false;
  }

  console.log('🔍 Checking profile for user:', user.id, user.email);

  try {
    // Check if profile already exists
    const { data: existingProfile, error: selectError } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', user.id)
      .single();

    if (selectError && selectError.code !== 'PGRST116') {
      // PGRST116 means no rows returned (which is expected for new users)
      console.log('❌ Error checking profile:', selectError);
    }

    // Profile already exists
    if (existingProfile) {
      console.log('✅ Profile already exists for user:', user.id);
      return true;
    }

    console.log('📝 Creating new profile for user:', user.id);

    // Profile doesn't exist, create it
    const profileData = {
      id: user.id,
      email: user.email || '',
      username: user.email?.split('@')[0] || 'User',
      full_name: user.user_metadata?.full_name || '',
      avatar_url: user.user_metadata?.avatar_url || '',
      wallet_balance: 10000, // Starting balance
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    console.log('📊 Profile data to insert:', profileData);

    const { data, error } = await supabase
      .from('profiles')
      .insert([profileData])
      .select();

    if (error) {
      console.error('❌ Error creating profile:', error.message, error.details);
      return false;
    }

    console.log('✅ Profile created successfully:', data);
    return true;
  } catch (err: any) {
    console.error('❌ Exception in ensureProfileExists:', err.message);
    return false;
  }
};
