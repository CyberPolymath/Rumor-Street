"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AnimatedBackground } from "@/components/AnimatedBackground";

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    const handleNavigation = () => {
      router.push("/auth");
    };

    // Listen for mouse click
    window.addEventListener("click", handleNavigation);

    // Listen for any keyboard press
    window.addEventListener("keydown", handleNavigation);

    return () => {
      window.removeEventListener("click", handleNavigation);
      window.removeEventListener("keydown", handleNavigation);
    };
  }, [router]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-dark-900">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Welcome Content - Positioned on top of background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
        <div className="text-center px-4">
          {/* Logo/Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-accent-gold">
            RUMORSTREET
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Experience the thrill of the stock market. Invest in rumors, trade on
            news, and build your fortune.
          </p>

          {/* Call to Action */}
          <div className="animate-pulse">
            <p className="text-xl md:text-2xl text-accent-green">
              Click anywhere or press any key to begin...
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10 text-accent-gold text-opacity-50">
          <div className="text-sm">Stock Market Simulation</div>
        </div>

        <div className="absolute bottom-10 right-10 text-accent-gold text-opacity-50">
          <div className="text-sm">v1.0.0</div>
        </div>
      </div>
    </div>
  );
}
