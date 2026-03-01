"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function Leaderboard() {
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
          Loading leaderboard...
        </div>
      </div>
    );
  }

  // Mock leaderboard data
  const leaderboardData = [
    { rank: 1, username: "Champion_Pro", score: "$125,450", change: "+25.4%" },
    { rank: 2, username: "MarketMaster", score: "$118,900", change: "+18.9%" },
    { rank: 3, username: "StockGuru", score: "$105,630", change: "+5.6%" },
    { rank: 4, username: "TrendSpotter", score: "$98,200", change: "+15.2%" },
    { rank: 5, username: "RumorKing", score: "$92,350", change: "+12.8%" },
  ];

  return (
    <div className="w-full h-screen bg-dark-900 overflow-auto">
      {/* Navbar */}
      <nav className="bg-dark-800 border-b-2 border-accent-gold border-opacity-30 sticky top-0 z-40 px-8 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Back Button (Left) */}
          <motion.button
            onClick={() => router.push("/home")}
            className="text-accent-gold hover:text-accent-green transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-2xl">← Back to Home</span>
          </motion.button>

          {/* Title (Center) */}
          <motion.h1
            className="text-3xl font-bold text-accent-gold tracking-widest"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            LEADERBOARD
          </motion.h1>

          {/* Account Icon (Right) */}
          <motion.button
            onClick={() => router.push("/account")}
            className="text-accent-gold hover:text-accent-green transition-colors text-3xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            👤
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
        {/* Leaderboard Card */}
        <div className="bg-dark-800 border-3 border-accent-gold rounded-lg p-10 shadow-2xl">
          <h2 className="text-4xl font-bold text-accent-gold mb-2 text-center">
            🏆 Global Leaderboard
          </h2>
          <p className="text-gray-300 text-center mb-8">
            Top traders by portfolio value
          </p>

          {/* Leaderboard Table */}
          <div className="space-y-3">
            {leaderboardData.map((player, idx) => (
              <motion.div
                key={player.rank}
                className="bg-dark-900 border-2 border-accent-gold border-opacity-50 rounded-lg p-4 flex items-center justify-between hover:bg-opacity-50 transition-all"
                whileHover={{ x: 5 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent-gold bg-opacity-20 rounded-full">
                    <span className="text-xl font-bold text-accent-gold">
                      {player.rank === 1 ? "🥇" : player.rank === 2 ? "🥈" : player.rank === 3 ? "🥉" : player.rank}
                    </span>
                  </div>
                  <div>
                    <p className="text-accent-gold font-bold text-lg">
                      {player.username}
                    </p>
                    <p className="text-gray-400 text-sm">Rank #{player.rank}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-accent-gold font-bold text-xl">
                    {player.score}
                  </p>
                  <p className="text-accent-green text-sm font-semibold">
                    {player.change}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Your Rank Placeholder */}
          <div className="mt-8 pt-6 border-t-2 border-accent-gold border-opacity-30">
            <div className="bg-dark-900 border-2 border-accent-green rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-accent-green bg-opacity-20 rounded-full">
                    <span className="text-xl">👤</span>
                  </div>
                  <div>
                    <p className="text-accent-green font-bold text-lg">Your Rank</p>
                    <p className="text-gray-400 text-sm">Join the leaderboard by playing!</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-accent-green font-bold text-xl">$10,000.00</p>
                  <p className="text-gray-400 text-sm">Starting balance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
