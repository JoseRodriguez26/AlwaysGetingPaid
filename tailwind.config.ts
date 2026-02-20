import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#080808",
        surface: "#111111",
        "surface-2": "#1a1a1a",
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8c66d",
          dark: "#a07830",
        },
        purple: {
          brand: "#6b21a8",
          light: "#9333ea",
          glow: "#a855f7",
        },
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #c9a84c 0%, #e8c66d 50%, #a07830 100%)",
        "purple-gradient": "linear-gradient(135deg, #6b21a8 0%, #9333ea 100%)",
        "dark-gradient": "linear-gradient(180deg, #080808 0%, #111111 100%)",
        "hero-gradient": "linear-gradient(135deg, #080808 0%, #1a0a2e 50%, #080808 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.8s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px #c9a84c40" },
          "50%": { boxShadow: "0 0 40px #c9a84c80, 0 0 80px #c9a84c20" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
