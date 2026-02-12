"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { motion } from "framer-motion";

export default function Auth() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreed, setAgreed] = useState(false);

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    console.log("Google login clicked");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement backend authentication
    if (isLogin) {
      console.log("Login:", { email, password });
    } else {
      if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      console.log("Signup:", { email, password });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-900">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md bg-black bg-opacity-20 z-10"></div>

      {/* Back button */}
      <motion.button
        onClick={() => router.back()}
        className="absolute top-8 left-8 z-30 text-accent-gold hover:text-accent-green transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <span className="text-2xl">← Back</span>
      </motion.button>

      {/* Auth Container with Title Above */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        {/* Title just above box */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-accent-gold mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          RUMORSTREET
        </motion.h1>

        {/* Auth Box */}
        <motion.div
          className="bg-dark-800 border border-accent-gold border-opacity-30 rounded-lg p-8 w-full max-w-sm shadow-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <h2 className="text-3xl font-bold text-accent-gold mb-8 text-center">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {/* Google Login Button */}
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-lg mb-6 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-accent-gold bg-opacity-20"></div>
            <span className="text-gray-400 text-sm">or</span>
            <div className="flex-1 h-px bg-accent-gold bg-opacity-20"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-dark-900 border border-accent-gold border-opacity-30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                placeholder="your@email.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-dark-900 border border-accent-gold border-opacity-30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                placeholder="••••••••"
              />
            </div>

            {/* Confirm Password - Only for Signup */}
            {!isLogin && (
              <div>
                <label className="block text-gray-300 text-sm font-bold mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-dark-900 border border-accent-gold border-opacity-30 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            {/* Agreement Checkbox - Only for Signup */}
            {!isLogin && (
              <div className="flex items-start gap-2 mt-4">
                <input
                  type="checkbox"
                  id="agree"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 cursor-pointer"
                />
                <label htmlFor="agree" className="text-gray-400 text-sm cursor-pointer">
                  I agree to the terms and conditions
                </label>
              </div>
            )}
          </form>

          {/* Toggle Login/Signup */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setEmail("");
                setPassword("");
                setConfirmPassword("");
              }}
              className="text-accent-gold hover:text-accent-green transition-colors font-bold"
            >
              {isLogin ? "Sign Up" : "Log In"}
            </button>
          </div>

          {/* Captcha and Proceed Section */}
          <div className="mt-8 pt-6 border-t border-accent-gold border-opacity-20">
            <div className="flex items-center gap-4 justify-between">
              {/* Captcha Placeholder */}
              <div className="flex-1 bg-dark-900 border border-accent-gold border-opacity-30 rounded px-4 py-3 text-gray-500 text-sm h-14 flex items-center justify-center">
                reCAPTCHA
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleSubmit}
                disabled={!isLogin && !agreed}
                className="bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold disabled:opacity-50 disabled:cursor-not-allowed text-dark-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Proceed
              </button>
            </div>
          </div>

          {/* Info text */}
          <p className="text-gray-500 text-xs text-center mt-6">
            Your data is secure and encrypted
          </p>
        </motion.div>
      </div>
    </div>
  );
}
