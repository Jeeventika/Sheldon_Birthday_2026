/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Clove Design System Core Palette
        "background": "#FFF8F8",
        "night-bg": "#1c0c26",
        "deep-plum": "#25152F",
        "dark-violet": "#45245F",
        "clove-purple": "#8050A8",
        "primary": "#d4bbff",
        "primary-container": "#b99bef",
        "primary-fixed": "#ebdcff",
        "on-primary": "#3c1f6b",
        "secondary": "#fcafdb",
        "secondary-container": "#6d3257",
        "secondary-fixed": "#ffd8eb",
        "secondary-coral": "#F28CA9",
        "on-secondary": "#521c40",
        "tertiary": "#94d2c9",
        "tertiary-container": "#78b5ad",
        "tertiary-fixed": "#b0eee5",
        "on-tertiary": "#003732",
        "surface": "#FFF8F8",
        "surface-dark": "#1c0c26",
        "surface-container-low": "#25152f",
        "surface-container": "#291933",
        "surface-container-high": "#34233e",
        "surface-container-highest": "#3f2e4a",
        "surface-bright": "#44324e",
        "on-surface": "#25152F",
        "on-surface-dark": "#f3dafe",
        "on-surface-variant": "#5E4369",
        "on-surface-variant-dark": "#cbc4d1",
        "outline": "#897193",
        "outline-variant": "#D8C7D8",
        "outline-variant-dark": "#4a4550",
        "parchment": "#FAF6FD",
      },
      fontFamily: {
        display: ["Playfair Display", "serif"],
        editorial: ["Cormorant Garamond", "serif"],
        body: ["Plus Jakarta Sans", "sans-serif"],
        handwriting: ["Caveat", "cursive"]
      },
      borderRadius: {
        'sm': '0.5rem',
        'DEFAULT': '1rem',
        'md': '1.5rem',
        'lg': '2rem',
        'xl': '2.5rem',
        '2xl': '3rem',
        '3xl': '3.5rem',
        'full': '9999px'
      },
      boxShadow: {
        'clove-glow': '0 0 24px rgba(185, 155, 239, 0.45)',
        'clove-pink-glow': '0 0 24px rgba(243, 167, 210, 0.45)',
        'clove-teal-glow': '0 0 20px rgba(155, 217, 208, 0.35)',
      }
    },
  },
  plugins: [],
}
