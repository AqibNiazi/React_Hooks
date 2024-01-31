/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        color: "#593D88",
      },
      backgroundColor: {
        primary: "#8a2b06",
      },
    },
  },
  plugins: [],
};
