"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function Tournament() {
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

  if (loading)
    return (
      <div className="w-full h-screen bg-dark-900 flex items-center justify-center">
        <div className="text-accent-gold animate-pulse">Loading...</div>
      </div>
    );

  return (
    <div className="w-full h-screen bg-dark-900 flex items-center justify-center relative">
      <motion.button
        onClick={() => router.push("/home")}
        className="absolute top-8 left-8 text-accent-gold hover:text-accent-green transition-colors"
        whileHover={{ scale: 1.1 }}
      >
        ← Back
      </motion.button>

      <div className="text-center">
        <h1 className="text-5xl font-bold text-accent-gold mb-6">🏆 Vs Players</h1>
        <p className="text-2xl text-gray-300 mb-6">Coming Soon!</p>
        <p className="text-gray-400">
          Compete against real players in multiplayer tournaments.
        </p>
      </div>
    </div>
  );
}
