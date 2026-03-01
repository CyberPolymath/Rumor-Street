"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { ensureProfileExists } from "@/lib/profileHelper";
import { User } from "@supabase/supabase-js";

export default function Account() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("Not specified");
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [otpSent, setOtpSent] = useState({ email: false, phone: false });
  const [verified, setVerified] = useState({ email: false, phone: false });

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/auth");
        return;
      }

      setUser(session.user);
      setEmail(session.user.email || "");

      // Ensure profile exists for this user
      await ensureProfileExists(session.user);

      // Fetch user profile from profiles table if it exists
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profile) {
        setUserName(profile.username || "");
        setFullName(profile.full_name || "");
        setDob(profile.dob || "");
        setGender(profile.gender || "Not specified");
        setPhone(profile.phone || "");
      }

      setLoading(false);
    };

    getUser();
  }, [router]);

  const handleSaveProfile = async () => {
    if (!user) return;

    setSaving(true);
    setSaveMessage("");

    try {
      console.log('💾 Saving profile data:', {
        id: user.id,
        username: userName,
        full_name: fullName,
        dob,
        gender,
        phone,
        email,
      });

      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          username: userName,
          full_name: fullName,
          dob: dob || null,
          gender: gender || 'Not specified',
          phone: phone || null,
          email,
          updated_at: new Date().toISOString(),
        })
        .select();

      if (error) {
        console.error('❌ Save error:', error);
        throw error;
      }

      console.log('✅ Profile saved:', data);
      // Show success modal
      setShowSuccessModal(true);
      
      // Auto-navigate to home after 2.5 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
        router.push("/home");
      }, 2500);
    } catch (err: any) {
      console.error('❌ Exception saving profile:', err);
      setSaveMessage(`❌ Error: ${err.message}`);
      setTimeout(() => setSaveMessage(""), 3000);
    } finally {
      setSaving(false);
    }
  };

  const handleSendOTP = async (type: "email" | "phone") => {
    try {
      if (type === "email") {
        // Supabase OTP for email verification
        const { error } = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            shouldCreateUser: false,
          },
        });
        if (error) throw error;
        setOtpSent({ ...otpSent, email: true });
        setSaveMessage("📧 OTP sent to email!");
      } else {
        // Phone OTP would require Supabase SMS setup
        setSaveMessage("📱 OTP feature for phone coming soon!");
      }
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (err: any) {
      setSaveMessage(`❌ Error: ${err.message}`);
    }
  };

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      sessionStorage.removeItem("auth_screen_seen");
      router.replace("/auth");
    } catch (err: any) {
      console.error("Sign out error:", err.message);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-accent-gold animate-pulse text-xl">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-dark-900 overflow-auto" style={showSuccessModal ? { overflow: 'hidden' } : {}}>
      {/* Success Modal with Blur Background */}
      {showSuccessModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Blurred Background */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Success Card */}
          <motion.div
            className="relative bg-gradient-to-br from-dark-800 to-dark-900 border-3 border-accent-gold rounded-2xl p-12 shadow-2xl max-w-md w-full mx-4"
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            {/* Success Icon */}
            <motion.div
              className="flex justify-center mb-6"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.5 }}
            >
              <div className="text-6xl">✅</div>
            </motion.div>

            {/* Success Message */}
            <h2 className="text-3xl font-bold text-accent-gold text-center mb-4">
              Success!
            </h2>
            <p className="text-white text-center text-lg mb-8">
              Your account details have been successfully saved.
            </p>

            {/* Loading Animation */}
            <div className="flex justify-center items-center gap-2 mb-6">
              <motion.div
                className="w-2 h-2 bg-accent-gold rounded-full"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
              <motion.div
                className="w-2 h-2 bg-accent-gold rounded-full"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.1 }}
              />
              <motion.div
                className="w-2 h-2 bg-accent-gold rounded-full"
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
              />
            </div>

            {/* Redirect Message */}
            <p className="text-gray-400 text-center text-sm">
              Redirecting to home...
            </p>
          </motion.div>
        </motion.div>
      )}
      {/* Navbar */}
      <nav className="bg-dark-800 border-b-2 border-accent-gold border-opacity-30 sticky top-0 z-40 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Portfolio Icon (Left) */}
          <motion.button
            onClick={() => router.push("/portfolio")}
            className="text-accent-gold hover:text-accent-green transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Portfolio"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
          </motion.button>

          {/* Title (Center) */}
          <motion.h1
            className="text-3xl font-bold text-accent-gold tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            RUMORSTREET
          </motion.h1>

          {/* Leaderboard Icon (Right) */}
          <motion.button
            onClick={() => router.push("/leaderboard")}
            className="text-accent-gold hover:text-accent-green transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Leaderboard"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        className="max-w-4xl mx-auto px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-6">
          <motion.button
            onClick={() => router.push("/home")}
            className="bg-dark-800 border-2 border-accent-gold text-accent-gold hover:text-accent-green hover:border-accent-green font-bold px-5 py-2 rounded-lg transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ← Back to Home
          </motion.button>
        </div>

        {/* Status Message */}
        {saveMessage && (
          <motion.div
            className="mb-6 p-4 bg-dark-800 border-2 border-accent-gold rounded-lg text-center text-accent-gold font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {saveMessage}
          </motion.div>
        )}

        {/* Account Card */}
        <div className="bg-dark-800 border-3 border-accent-gold rounded-lg p-10 shadow-2xl">
          <h2 className="text-3xl font-bold text-accent-gold mb-12 text-center">
            Account Dashboard
          </h2>

          {/* Profile Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Username */}
            <div>
              <label className="block text-accent-gold font-bold mb-3 text-lg">
                Username
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                placeholder="Your username"
              />
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-accent-gold font-bold mb-3 text-lg">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                placeholder="Your full name"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-accent-gold font-bold mb-3 text-lg">
                Date of Birth
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-accent-gold font-bold mb-3 text-lg">
                Gender
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
              >
                <option>Not specified</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>

            {/* Email with OTP */}
            <div>
              <label className="block text-accent-gold font-bold mb-3 text-lg">
                Email Address {verified.email && "✔️"}
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  className="flex-1 bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                  placeholder="your@email.com"
                />
                <motion.button
                  onClick={() => handleSendOTP("email")}
                  className="bg-accent-gold hover:bg-yellow-500 text-dark-900 font-bold px-4 py-3 rounded-lg transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={saving}
                >
                  {otpSent.email ? "OTP Sent" : "Verify OTP"}
                </motion.button>
              </div>
            </div>

            {/* Phone with OTP */}
            <div>
              <label className="block text-accent-gold font-bold mb-3 text-lg">
                Phone Number {verified.phone && "✔️"}
              </label>
              <div className="flex gap-2">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1 bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                  placeholder="+1 (555) 000-0000"
                />
                <motion.button
                  onClick={() => handleSendOTP("phone")}
                  className="bg-accent-gold hover:bg-yellow-500 text-dark-900 font-bold px-4 py-3 rounded-lg transition-all whitespace-nowrap"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={saving}
                >
                  {otpSent.phone ? "OTP Sent" : "Verify OTP"}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="border-t-2 border-accent-gold border-opacity-30 pt-8 mt-8">
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              {/* Save Profile Button */}
              <motion.button
                onClick={handleSaveProfile}
                disabled={saving}
                className="bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold disabled:opacity-50 text-dark-900 font-bold py-3 px-8 rounded-lg transition-all flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {saving ? "Saving..." : "💾 Save Profile"}
              </motion.button>

              {/* Sign Out Button */}
              <motion.button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-8 rounded-lg transition-all flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🚪 Sign Out
              </motion.button>

              {/* Create Another Account Button */}
              <motion.button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-accent-green to-green-500 hover:from-green-500 hover:to-accent-green text-dark-900 font-bold py-3 px-8 rounded-lg transition-all flex-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ➕ Switch Account
              </motion.button>
            </div>
          </div>

          {/* User ID Info */}
          <div className="mt-8 p-4 bg-dark-900 border border-accent-gold border-opacity-30 rounded-lg text-center">
            <p className="text-gray-400 text-sm">
              User ID: <span className="text-accent-gold font-mono">{user?.id}</span>
            </p>
            <p className="text-gray-400 text-sm">
              Last Sign In:{" "}
              <span className="text-accent-gold">
                {user?.last_sign_in_at
                  ? new Date(user.last_sign_in_at).toLocaleString()
                  : "N/A"}
              </span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
