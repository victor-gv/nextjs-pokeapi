/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        4: "repeat(auto-fit, minmax(14rem, 1fr))",
      },
      backgroundColor: {
        grass: "#d2f2c2",
        poison: "#f7cdf7",
        fire: "#ffd1b5",
        flying: "#eae3ff",
        water: "#c2f3ff",
        bug: "#e0e8a2",
        normal: "#e6e6c3",
        electric: "#fff1ba",
        ground: "#e0ccb1",
        fighting: "#fcada9",
        psychic: "#ffc9da",
        rock: "#f0e09c",
        fairy: "#ffdee5",
        steel: "#e6eaf0",
        ice: "#e8feff",
        ghost: "#dbbaff",
        dragon: "#c4bdff",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
