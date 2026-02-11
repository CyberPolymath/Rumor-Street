import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RumorStreet - Stock Market Simulation Game",
  description:
    "A dynamic and immersive stock market simulation game based on real news and rumors.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Vanta.js dependencies */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
