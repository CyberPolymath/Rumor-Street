"use client";

import { useEffect, useRef } from "react";

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Wait for Vanta to be available or retry
    const initVanta = () => {
      const VANTA = (window as any).VANTA;
      const THREE = (window as any).THREE;

      if (!VANTA || !THREE) {
        // Retry after a short delay if libraries aren't loaded yet
        setTimeout(initVanta, 100);
        return;
      }

      // Initialize Vanta NET effect with stock market theme
      VANTA.NET({
        el: containerRef.current,
        THREE: THREE,
        color: 0xd4af37, // Gold color for nodes
        backgroundColor: 0x0a0e27, // Dark blue background
        points: 12, // Number of dots
        maxDistance: 22, // Connection distance
        spacing: 14, // Spacing between points
        showDots: true, // Show the dots
        mouseControls: true, // Mouse responsive
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        speed: 0.5, // Animation speed
      });
    };

    initVanta();
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full"
      style={{
        zIndex: 1,
        width: "100%",
        height: "100%",
      }}
    />
  );
};
