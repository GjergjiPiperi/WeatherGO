/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/index.html", "./src/**/*.{html,js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "serif"],
      },
    },
  },
  plugins: [],
};
