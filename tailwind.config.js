/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#faf6ef", blush: "#f4e3e3", forest: "#2f4939", sage: "#8ea192",
        gold: "#b08d57", cinnabar: "#d43b2c", peony: "#f5b5c8", jade: "#3a7d6b", cloud: "#f7efe7",
      },
      fontFamily: {
        serif: ["Noto Serif TC", "Playfair Display", "serif"],
        sans: ["Noto Sans TC", "Josefin Sans", "sans-serif"],
        script: ["Great Vibes", "Ma Shan Zheng", "cursive"]
      },
      boxShadow: { soft: "0 10px 20px rgba(0,0,0,0.08)" }
    },
  },
  plugins: [],
}
