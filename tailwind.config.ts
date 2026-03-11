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
        bg: "#050505",
        surface: "#111111",
        "surface-2": "#1a1a1a",
        border: "#252525",
        gold: {
          DEFAULT: "#e4b84d",
          light: "#f0d078",
          dark: "#b8922e",
        },
        accent: {
          purple: "#a855f7",
          pink: "#ec4899",
          blue: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Playfair Display", "Georgia", "serif"],
      },
      backgroundImage: {
        "hero-glow": "radial-gradient(ellipse at center, rgba(228,184,77,0.12) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};

export default config;
