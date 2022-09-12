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
    },
  },
  plugins: [require("flowbite/plugin")],
};
