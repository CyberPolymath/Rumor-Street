import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          900: "#0a0e27",
          800: "#151a3a",
          700: "#1a2047",
        },
        accent: {
          gold: "#d4af37",
          green: "#00c896",
          red: "#ff6b6b",
        },
      },
      backgroundImage: {
        gradient: "linear-gradient(135deg, #0a0e27 0%, #1a2047 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
