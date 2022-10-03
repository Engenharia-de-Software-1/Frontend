/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./srccomponents/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "greenDark": "#429453",
        "greenLight": "#DFF0E7",
        "greenText": "#1A662A",
        "optionWhite": "#FAFAFA",
        "Input2": "#F5F5F5",
        "Input":  "rgba(67, 65, 88, 0.13)"
      },
      fontSize: {
        
      },
      width: {
        "982": "61.375rem",
        "953": "59.5625rem",
        "559": "34.9375rem",
        "471": "29.4375rem",
        "462": "28.875rem"
      },
      height: {
        "982": "61.375rem",
        "953": "59.5625rem",
        "559": "34.9375rem",
        "471": "29.4375rem",
        "462": "28.875rem"
      },
    },
  },
  plugins: [],
}
