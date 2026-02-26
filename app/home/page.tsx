"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import GameMap from "@/components/GameMap";

interface Rumor {
  id: number;
  company: string;
  symbol: string;
  time: string;
  description: string;
  sentiment: "positive" | "negative" | "neutral";
  reliability: number;
  tag: string;
}

interface Company {
  id: number;
  name: string;
  symbol: string;
  x: number;
  y: number;
  price: string;
  change: string;
  color: string;
}

const COMPANIES: Company[] = [
  { id: 1, name: "Amazon", symbol: "AMZN", x: 50, y: 30, price: "$145.30", change: "+2.40%", color: "#f59e0b" },
  { id: 2, name: "Google", symbol: "GOOGL", x: 70, y: 25, price: "$140.50", change: "+1.85%", color: "#3b82f6" },
  { id: 3, name: "Apple", symbol: "AAPL", x: 75, y: 50, price: "$189.20", change: "+0.95%", color: "#6b7280" },
  { id: 4, name: "Tesla", symbol: "TSLA", x: 45, y: 55, price: "$242.80", change: "-1.20%", color: "#ef4444" },
  { id: 5, name: "Microsoft", symbol: "MSFT", x: 60, y: 65, price: "$420.15", change: "+2.10%", color: "#0ea5e9" },
  { id: 6, name: "Meta", symbol: "META", x: 65, y: 40, price: "$310.75", change: "+3.50%", color: "#3b82f6" },
  { id: 7, name: "NVIDIA", symbol: "NVDA", x: 40, y: 70, price: "$875.50", change: "+5.20%", color: "#a3e635" },
  { id: 8, name: "Flipkart", symbol: "FLPK", x: 55, y: 75, price: "$85.90", change: "-0.85%", color: "#fbbf24" },
];

const RUMORS: Rumor[] = [
  {
    id: 1,
    company: "Tesla",
    symbol: "TSLA",
    time: "10m ago",
    description: "Insider sources suggest Tesla is developing a revolutionary battery technology that could double EV range.",
    sentiment: "positive",
    reliability: 65,
    tag: "Rumor",
  },
  {
    id: 2,
    company: "Amazon",
    symbol: "AMZN",
    time: "7/15/2023",
    description: "Amazon announces Q3 2023 earnings beat expectations with 15% growth in cloud services.",
    sentiment: "positive",
    reliability: 95,
    tag: "News",
  },
  {
    id: 3,
    company: "Google",
    symbol: "GOOGL",
    time: "20m ago",
    description: "Unconfirmed reports of Google planning to launch a new AI-powered search engine.",
    sentiment: "neutral",
    reliability: 45,
    tag: "Rumor",
  },
  {
    id: 4,
    company: "Microsoft",
    symbol: "MSFT",
    time: "5m ago",
    description: "Microsoft partnership expansion with OpenAI signals stronger AI integration.",
    sentiment: "positive",
    reliability: 88,
    tag: "News",
  },
  {
    id: 5,
    company: "Meta",
    symbol: "META",
    time: "2h ago",
    description: "Meta faces regulatory scrutiny over data privacy practices in EU.",
    sentiment: "negative",
    reliability: 78,
    tag: "News",
  },
];

export default function Home() {
  const router = useRouter();
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  const filteredRumors = RUMORS.filter(
    (rumor) =>
      rumor.company.toLowerCase().includes(filterQuery.toLowerCase()) ||
      rumor.symbol.toLowerCase().includes(filterQuery.toLowerCase())
  );

  const handleCompanyHover = (companyId: number) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      const company = COMPANIES.find((c) => c.id === companyId);
      if (company) setSelectedCompany(company);
    }, 2000);
  };

  const handleCompanyHoverEnd = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
  };

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Search is now handled by GameMap component via prop
    // This just allows Enter key to trigger the search
    if (e.key === "Enter") {
      // Search is automatic via GameMap's useEffect watching searchQuery prop
    }
  };

  return (
    <div className="w-full h-screen bg-dark-900 overflow-hidden">
      {/* Disclaimer Modal */}
      <AnimatePresence>
        {showDisclaimer && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-lg z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDisclaimer(false)}
          >
            <motion.div
              className="bg-dark-800 border-2 border-accent-gold rounded-lg p-10 max-w-2xl mx-auto text-center"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <h1 className="text-4xl font-bold text-accent-gold mb-6">⚠️ DISCLAIMER</h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Welcome to <span className="text-accent-gold font-bold">RumorStreet</span>! This game is based on real financial scenarios combined with fake news and rumors that typically circulate alongside genuine market information. Here, you'll experience the real-world phenomenon of how news and rumors shape stock market movements. Through active participation, you'll develop critical skills to identify reliable information sources and make informed investment decisions. Remember: not all news is true, and not all rumors are false. Master the art of distinction and become a savvy investor!
              </p>
              <button
                onClick={() => setShowDisclaimer(false)}
                className="bg-gradient-to-r from-accent-gold to-yellow-500 hover:from-yellow-500 hover:to-accent-gold text-dark-900 font-bold py-3 px-8 rounded-lg transition-all duration-300"
              >
                I Understand, Let's Play
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex h-full w-full">
        {/* Left Sidebar - 1/3 */}
        {!isMapFullscreen && (
          <motion.div
            className="w-1/3 bg-dark-800 border-r border-accent-gold border-opacity-20 overflow-hidden flex flex-col p-6"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Rumor Feed Header */}
            <h2 className="text-2xl font-bold text-accent-gold mb-6">Rumor Feed</h2>

            {/* Search Box */}
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search companies..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full bg-dark-900 border border-accent-gold border-opacity-30 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all"
              />
            </div>

            {/* Rumors List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {filteredRumors.map((rumor) => (
                <motion.div
                  key={rumor.id}
                  className="bg-dark-900 border border-accent-gold border-opacity-20 rounded-lg p-4 hover:border-opacity-50 transition-all cursor-pointer"
                  whileHover={{ y: -2 }}
                >
                  {/* Company Tag */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold px-3 py-1 bg-red-500 bg-opacity-20 text-red-400 rounded">
                        {rumor.symbol}
                      </span>
                      <span className="text-xs text-gray-400">{rumor.company}</span>
                    </div>
                    <span className="text-xs text-gray-500">{rumor.time}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-300 mb-3 line-clamp-2">{rumor.description}</p>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          rumor.sentiment === "positive"
                            ? "text-green-400"
                            : rumor.sentiment === "negative"
                            ? "text-red-400"
                            : "text-gray-400"
                        }`}
                      >
                        {rumor.sentiment === "positive"
                          ? "📈 Positive"
                          : rumor.sentiment === "negative"
                          ? "📉 Negative"
                          : "➡️ Neutral"}
                      </span>
                      <div className="w-24 h-1 bg-dark-700 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-accent-gold to-yellow-500"
                          style={{ width: `${rumor.reliability}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{rumor.reliability}%</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-accent-gold bg-opacity-20 text-accent-gold rounded">
                      {rumor.tag}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Right Section - 2/3 */}
        <motion.div
          className={`${isMapFullscreen ? "w-full" : "w-2/3"} bg-dark-900 flex flex-col`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* Top Navbar */}
          <div className="bg-dark-800 border-b border-accent-gold border-opacity-20 px-8 py-4 flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <div className="relative">
                <svg
                  className="absolute left-3 top-3 w-5 h-5 text-accent-gold"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search companies or places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  className="w-full bg-dark-900 border border-accent-gold border-opacity-30 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent-gold focus:border-opacity-100 transition-all text-sm"
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4 ml-6">
              {/* Video Icon - YouTube */}
              <button className="text-red-500 hover:text-red-600 transition-colors">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </button>
              {/* Portfolio Icon */}
              <button
                onClick={() => router.push("/portfolio")}
                className="text-accent-gold hover:text-accent-green transition-colors text-2xl"
              >
                📊
              </button>
              {/* Account Icon */}
              <button
                onClick={() => router.push("/account")}
                className="text-accent-gold hover:text-accent-green transition-colors text-2xl"
              >
                👤
              </button>
            </div>
          </div>

          {/* Map Area */}
          <div className="flex-1 relative overflow-hidden">
            <GameMap searchQuery={searchQuery} />

            {/* Fullscreen Toggle Button */}
            <button
              onClick={() => setIsMapFullscreen(!isMapFullscreen)}
              className="absolute bottom-4 right-4 bg-accent-gold bg-opacity-20 hover:bg-opacity-40 text-accent-gold border border-accent-gold rounded-lg p-2 transition-all z-10"
              title="Toggle fullscreen"
            >
              {isMapFullscreen ? "⛶" : "⛶"}
            </button>
          </div>

          {/* Footer - 4 Buttons */}
          <div className="bg-dark-800 border-t border-accent-gold border-opacity-20 px-8 py-6 grid grid-cols-4 gap-4">
            <button
              onClick={() => router.push("/playAI")}
              className="bg-dark-900 border-2 hover:bg-opacity-10 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              style={{ borderColor: 'rgb(212, 175, 55)', color: 'rgb(212, 175, 55)' }}
            >
              <span>🤖</span> Play with AI
            </button>

            <button
              onClick={() => router.push("/learnAI")}
              className="bg-dark-900 border-2 hover:bg-opacity-10 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              style={{ borderColor: 'rgb(212, 175, 55)', color: 'rgb(212, 175, 55)' }}
            >
              <span>🧠</span> Learn with AI
            </button>

            <button
              onClick={() => router.push("/knowledge")}
              className="bg-dark-900 border-2 hover:bg-opacity-10 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              style={{ borderColor: 'rgb(212, 175, 55)', color: 'rgb(212, 175, 55)' }}
            >
              <span>📚</span> Build Financial IQ
            </button>

            <button
              onClick={() => router.push("/tournament")}
              className="bg-dark-900 border-2 hover:bg-opacity-10 font-bold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              style={{ borderColor: 'rgb(212, 175, 55)', color: 'rgb(212, 175, 55)' }}
            >
              <span>🏆</span> Vs Players
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
