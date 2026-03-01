"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function Portfolio() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/auth");
        return;
      }

      setLoading(false);
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="w-full h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-accent-gold animate-pulse text-xl">
          Loading portfolio...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-dark-900 overflow-auto">
      {/* Navbar */}
      <nav className="bg-dark-800 border-b-2 border-accent-gold border-opacity-30 sticky top-0 z-40 px-8 py-4">
        <div className="grid grid-cols-3 items-center max-w-7xl mx-auto">
          {/* Back Button (Left) */}
          <motion.button
            onClick={() => router.push("/home")}
            className="justify-self-start w-10 h-10 flex items-center justify-center text-accent-gold hover:text-accent-green transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Back"
          >
            <span className="text-xl">←</span>
          </motion.button>

          {/* Title (Center) */}
          <motion.h1
            className="text-3xl font-bold text-accent-gold tracking-widest text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            PORTFOLIO
          </motion.h1>

          {/* Account Icon (Right) */}
          <motion.button
            onClick={() => router.push("/account")}
            className="justify-self-end w-10 h-10 flex items-center justify-center text-accent-gold hover:text-accent-green transition-colors text-3xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title="Account"
          >
            👤
          </motion.button>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        className="max-w-6xl mx-auto px-8 py-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Portfolio Card */}
        <div className="bg-dark-800 border-3 border-accent-gold rounded-lg p-10 shadow-2xl text-center">
          <h2 className="text-4xl font-bold text-accent-gold mb-6">
            Your Portfolio
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            📊 The portfolio page is coming soon! Track your holdings, see your performance, and manage your investments here.
          </p>

          {/* Placeholder Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            <div className="bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg p-6">
              <h3 className="text-accent-gold text-lg font-bold mb-2">Total Value</h3>
              <p className="text-3xl font-bold text-accent-green">$10,000</p>
            </div>
            <div className="bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg p-6">
              <h3 className="text-accent-gold text-lg font-bold mb-2">Holdings</h3>
              <p className="text-3xl font-bold text-accent-gold">0</p>
            </div>
            <div className="bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg p-6">
              <h3 className="text-accent-gold text-lg font-bold mb-2">Gain/Loss</h3>
              <p className="text-3xl font-bold text-accent-green">+$0.00</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
