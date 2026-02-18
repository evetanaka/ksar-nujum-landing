import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ochre: '#BC9E73',
        darkBrown: '#2C241B',
        gold: '#D4AF37',
        sand: '#F5F2EB',
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'Cormorant Garamond', 'serif'],
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
