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
        'rose-gold': '#C8A97C',
        'blush': '#F5E6D3',
        'cream': '#FDF8F0',
        'dark-brown': '#4A2C0A',
        'wedding-brown': '#8B4513',
        'gold': '#D4AF37',
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'great-vibes': ['Great Vibes', 'cursive'],
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
        'fade-in': 'fadeIn 1s ease-in-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'wedding-gradient': 'linear-gradient(135deg, #FDF8F0 0%, #F5E6D3 50%, #FDF8F0 100%)',
        'gold-gradient': 'linear-gradient(135deg, #C8A97C, #D4AF37, #C8A97C)',
      },
    },
  },
  plugins: [],
};

export default config;
