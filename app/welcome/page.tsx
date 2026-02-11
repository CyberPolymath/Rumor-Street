"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { motion } from "framer-motion";

export default function Welcome() {
  const router = useRouter();
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    // Show subtitle after title animation
    const subtitleTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1000);

    // Show CTA after subtitle
    const ctaTimer = setTimeout(() => {
      setShowCTA(true);
    }, 2500);

    return () => {
      clearTimeout(subtitleTimer);
      clearTimeout(ctaTimer);
    };
  }, []);

  const handleNavigation = () => {
    // Trigger exit animation
    setExitAnimation(true);
    // Navigate after animation completes
    setTimeout(() => {
      router.push("/auth");
    }, 800);
  };

  useEffect(() => {
    // Listen for mouse click
    window.addEventListener("click", handleNavigation);

    // Listen for any keyboard press
    window.addEventListener("keydown", handleNavigation);

    return () => {
      window.removeEventListener("click", handleNavigation);
      window.removeEventListener("keydown", handleNavigation);
    };
  }, [router]);

  // Title zoom animation
  const titleVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 2,
      transition: {
        duration: 0.8,
        ease: "easeIn",
      },
    },
  };

  // Subtitle fade in animation
  const subtitleVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };

  // CTA pulse animation
  const ctaVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      scale: 0,
      transition: {
        duration: 0.6,
        ease: "easeIn",
      },
    },
  };

  return (
    <motion.div
      className="relative w-full h-screen overflow-hidden bg-dark-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: exitAnimation ? 0 : 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Welcome Content - Positioned on top of background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="text-center px-4">
          {/* Animated Title with Zoom */}
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-6 text-accent-gold"
            variants={titleVariants}
            initial="hidden"
            animate={exitAnimation ? "exit" : "visible"}
          >
            RUMORSTREET
          </motion.h1>

          {/* Animated Subtitle */}
          {showSubtitle && (
            <motion.p
              className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto"
              variants={subtitleVariants}
              initial="hidden"
              animate={exitAnimation ? "exit" : "visible"}
            >
              Experience the thrill of the stock market. Invest in rumors, trade
              on news, and build your fortune.
            </motion.p>
          )}

          {/* Animated Call to Action */}
          {showCTA && (
            <motion.div
              variants={ctaVariants}
              initial="hidden"
              animate={exitAnimation ? "exit" : "visible"}
              className="animate-pulse"
            >
              <p className="text-xl md:text-2xl text-accent-green">
                Click anywhere or press any key to begin...
              </p>
            </motion.div>
          )}
        </div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute bottom-10 left-10 text-accent-gold text-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: exitAnimation ? 0 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm">Stock Market Simulation</div>
        </motion.div>

        <motion.div
          className="absolute bottom-10 right-10 text-accent-gold text-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: exitAnimation ? 0 : 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-sm">v1.0.0</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
