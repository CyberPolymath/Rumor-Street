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
        {/* Leaflet CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        {/* Leaflet MarkerCluster CSS */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.1/dist/MarkerCluster.css" />
        <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.1/dist/MarkerCluster.Default.css" />
        
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet.markercluster@1.5.1/dist/leaflet.markercluster.js"></script>

        {/* Vanta.js dependencies */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
