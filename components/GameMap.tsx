"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet.markercluster";

interface Company {
  id: number;
  name: string;
  symbol: string;
  lat: number;
  lng: number;
  price: string;
  change: string;
  color: string;
  country: string;
}

// Real-world company headquarters locations
const COMPANIES: Company[] = [
  {
    id: 1,
    name: "Apple",
    symbol: "AAPL",
    lat: 37.3346,
    lng: -122.0096,
    price: "$189.20",
    change: "+0.95%",
    color: "#6b7280",
    country: "USA - Cupertino, CA",
  },
  {
    id: 2,
    name: "Google",
    symbol: "GOOGL",
    lat: 37.422,
    lng: -122.143,
    price: "$140.50",
    change: "+1.85%",
    color: "#3b82f6",
    country: "USA - Mountain View, CA",
  },
  {
    id: 3,
    name: "Amazon",
    symbol: "AMZN",
    lat: 47.6205,
    lng: -122.3493,
    price: "$145.30",
    change: "+2.40%",
    color: "#f59e0b",
    country: "USA - Seattle, WA",
  },
  {
    id: 4,
    name: "Microsoft",
    symbol: "MSFT",
    lat: 47.674,
    lng: -122.1215,
    price: "$420.15",
    change: "+2.10%",
    color: "#0ea5e9",
    country: "USA - Redmond, WA",
  },
  {
    id: 5,
    name: "Tesla",
    symbol: "TSLA",
    lat: 30.2672,
    lng: -97.7431,
    price: "$242.80",
    change: "-1.20%",
    color: "#ef4444",
    country: "USA - Austin, TX",
  },
  {
    id: 6,
    name: "Meta",
    symbol: "META",
    lat: 37.4847,
    lng: -122.1477,
    price: "$310.75",
    change: "+3.50%",
    color: "#3b82f6",
    country: "USA - Menlo Park, CA",
  },
  {
    id: 7,
    name: "NVIDIA",
    symbol: "NVDA",
    lat: 37.3725,
    lng: -121.9849,
    price: "$875.50",
    change: "+5.20%",
    color: "#a3e635",
    country: "USA - Santa Clara, CA",
  },
  {
    id: 8,
    name: "Flipkart",
    symbol: "FLPK",
    lat: 12.9716,
    lng: 77.5946,
    price: "$85.90",
    change: "-0.85%",
    color: "#fbbf24",
    country: "India - Bangalore",
  },
];

interface GameMapProps {
  searchQuery: string;
  onSearchCleared?: () => void;
}

export default function GameMap({ searchQuery, onSearchCleared }: GameMapProps) {
  const [map, setMap] = useState<L.Map | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [markers, setMarkers] = useState<{ [key: number]: L.Marker }>({});
  const [stakeAmount, setStakeAmount] = useState<string>("");
  
  // Mock user holdings - in real app, this would come from backend/database
  const [userHoldings, setUserHoldings] = useState<{ [key: string]: number }>({
    AAPL: 15.5,
    GOOGL: 8.25,
    AMZN: 12.0,
    MSFT: 20.75,
    TSLA: 5.5,
    META: 0,
    NVDA: 3.25,
    FLPK: 0,
  });

  useEffect(() => {
    // Initialize map centered on North America
    const newMap = L.map("map").setView([39, -98], 4);

    // Add OpenStreetMap tiles with dark styling
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(newMap);

    // Add dark mode filter
    const mapElement = document.getElementById("map");
    if (mapElement) {
      mapElement.style.filter = "invert(0.93) hue-rotate(180deg)";
    }

    setMap(newMap);

    // Create marker cluster group
    const markerClusterGroup = L.markerClusterGroup({
      maxClusterRadius: 80,
      disableClusteringAtZoom: 9,
      iconCreateFunction: (cluster: any) => {
        const count = cluster.getChildCount();
        return L.divIcon({
          html: `
            <div class="flex items-center justify-center cursor-pointer" 
                 style="background: linear-gradient(135deg, #d4af37 0%, #f59e0b 100%); 
                        width: 50px; height: 50px; border-radius: 50%;
                        border: 3px solid #0a0e27; box-shadow: 0 0 15px rgba(212,175,55,0.5);
                        font-weight: bold; color: #0a0e27; font-size: 16px;">
              ${count}
            </div>
          `,
          iconSize: [50, 50],
          iconAnchor: [25, 25],
          className: "marker-cluster",
        });
      },
    });

    // Add company markers
    const newMarkers: { [key: number]: L.Marker } = {};

    COMPANIES.forEach((company) => {
      // Create custom marker icon
      const markerIcon = L.divIcon({
        html: `
          <div class="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform">
            <div class="w-12 h-12 rounded flex items-center justify-center font-bold text-white text-xs shadow-lg"
                 style="background-color: ${company.color}; box-shadow: 0 0 10px rgba(0,0,0,0.5)">
              ${company.symbol}
            </div>
            <div class="text-xs text-white mt-1 bg-black bg-opacity-70 px-2 py-1 rounded whitespace-nowrap">
              ${company.name}
            </div>
          </div>
        `,
        iconSize: [70, 80],
        iconAnchor: [35, 80],
        popupAnchor: [0, -80],
        className: "custom-div-icon",
      });

      const marker = L.marker([company.lat, company.lng], {
        icon: markerIcon,
      });

      // Show custom info box on click (no Leaflet popup)
      marker.on("click", () => setSelectedCompany(company));

      // Add marker to cluster group instead of directly to map
      markerClusterGroup.addLayer(marker);
      newMarkers[company.id] = marker;
    });

    // Add cluster group to map
    newMap.addLayer(markerClusterGroup);

    setMarkers(newMarkers);

    return () => {
      newMap.remove();
    };
  }, []);

  const handleZoomIn = () => {
    if (map) map.zoomIn();
  };

  const handleZoomOut = () => {
    if (map) map.zoomOut();
  };

  const centerOnCompany = (company: Company) => {
    if (map) {
      map.setView([company.lat, company.lng], 8);
      markers[company.id]?.openPopup();
    }
  };

  const handleBuy = () => {
    if (!selectedCompany || !stakeAmount) return;
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    // Update holdings
    setUserHoldings((prev) => ({
      ...prev,
      [selectedCompany.symbol]: (prev[selectedCompany.symbol] || 0) + amount,
    }));
    
    setStakeAmount("");
    alert(`Bought ${amount} shares of ${selectedCompany.symbol}`);
  };

  const handleSell = () => {
    if (!selectedCompany || !stakeAmount) return;
    const amount = parseFloat(stakeAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    
    const currentHoldings = userHoldings[selectedCompany.symbol] || 0;
    if (amount > currentHoldings) {
      alert(`Insufficient holdings. You only have ${currentHoldings} shares.`);
      return;
    }
    
    // Update holdings
    setUserHoldings((prev) => ({
      ...prev,
      [selectedCompany.symbol]: prev[selectedCompany.symbol] - amount,
    }));
    
    setStakeAmount("");
    alert(`Sold ${amount} shares of ${selectedCompany.symbol}`);
  };

  // Geocode places using OpenStreetMap Nominatim API
  const geocodePlace = async (placeName: string) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          placeName
        )}`
      );
      const results = await response.json();

      if (results.length > 0) {
        const result = results[0];
        const lat = parseFloat(result.lat);
        const lng = parseFloat(result.lon);

        if (map) {
          // Zoom level depends on the type of place
          let zoomLevel = 10;
          if (result.type === "country") zoomLevel = 4;
          else if (result.type === "state") zoomLevel = 6;
          else if (result.type === "city") zoomLevel = 10;

          map.setView([lat, lng], zoomLevel);
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error("Geocoding error:", error);
      return false;
    }
  };

  // Handle search query changes
  useEffect(() => {
    if (!searchQuery.trim() || !map) return;

    // First check if it's a company
    const company = COMPANIES.find(
      (c) =>
        c.symbol.toLowerCase() === searchQuery.toLowerCase() ||
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (company) {
      setSelectedCompany(company);
      centerOnCompany(company);
      if (onSearchCleared) {
        // Will use this to clear search input after search
      }
    } else {
      // Try geocoding for places
      geocodePlace(searchQuery);
    }
  }, [searchQuery, map, markers]);

  return (
    <div className="relative w-full h-full">
      {/* Leaflet Map Container */}
      <div id="map" className="w-full h-full" />

      {/* Zoom Controls */}
      <div className="absolute bottom-20 right-4 flex flex-col gap-2 z-20">
        <button
          onClick={handleZoomIn}
          className="bg-accent-gold hover:bg-yellow-500 text-dark-900 font-bold w-10 h-10 rounded flex items-center justify-center transition-all shadow-lg"
          title="Zoom in"
        >
          +
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-accent-gold hover:bg-yellow-500 text-dark-900 font-bold w-10 h-10 rounded flex items-center justify-center transition-all shadow-lg"
          title="Zoom out"
        >
          −
        </button>
      </div>

      {/* Company Info Popup */}
      <AnimatePresence>
        {selectedCompany && (
          <motion.div
            className="absolute top-20 left-20 bg-dark-800 border-2 border-accent-gold rounded-lg p-6 w-80 shadow-2xl z-30"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Header with Symbol, Price, Change, and Close Button */}
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-accent-gold mb-1">{selectedCompany.symbol}</h3>
                <p className="text-sm text-gray-400">{selectedCompany.name}</p>
                <p className="text-xs text-gray-500 mt-1">{selectedCompany.country}</p>
              </div>
              
              <div className="flex flex-col items-end gap-1 ml-4">
                <button
                  onClick={() => setSelectedCompany(null)}
                  className="text-gray-400 hover:text-accent-gold text-xl mb-2"
                >
                  ✕
                </button>
                <div className="text-right">
                  <p className="text-accent-gold font-bold text-lg">{selectedCompany.price}</p>
                  <p
                    className={`text-sm font-semibold ${
                      selectedCompany.change.includes("-") ? "text-red-400" : "text-green-400"
                    }`}
                  >
                    {selectedCompany.change}
                  </p>
                </div>
              </div>
            </div>

            {/* Holdings Section */}
            <div className="mb-4 pb-3 border-b border-accent-gold border-opacity-20">
              <p className="text-xs text-gray-400 mb-1">Your Holdings</p>
              <p className="text-white font-bold text-lg">
                {userHoldings[selectedCompany.symbol] || 0} shares
              </p>
            </div>

            {/* Stake Input */}
            <div className="mb-4">
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount of stake"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                className="w-full bg-dark-900 border border-accent-gold border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
              />
            </div>

            {/* Buy/Sell Buttons */}
            <div className="flex gap-3 mb-4">
              <button
                onClick={handleBuy}
                className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Buy
              </button>
              <button
                onClick={handleSell}
                className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
              >
                Sell
              </button>
            </div>

            {/* Action Buttons */}
            <button
              onClick={() => centerOnCompany(selectedCompany)}
              className="w-full bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold text-dark-900 font-bold py-2 px-4 rounded transition-all duration-300 mb-2"
            >
              Center on Map
            </button>

            <button
              onClick={() => console.log("Navigate to company info")}
              className="w-full bg-accent-gold bg-opacity-20 hover:bg-opacity-40 text-accent-gold font-bold py-2 px-4 rounded transition-all"
            >
              View Details
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
