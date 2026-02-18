import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4AF37",      // Or doré
        secondary: "#1C1C1C",    // Noir profond
        accent: "#8B7355",       // Terre/taupe
        background: "#FAF8F5",   // Off-white chaud
        foreground: "#2D2D2D",   // Text
      },
      fontFamily: {
        serif: ["Cormorant Garamond", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      spacing: {
        section: "120px",
        "section-mobile": "80px",
      },
    },
  },
  plugins: [],
};
export default config;
