/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "greenDark": "#429453",
        "greenLight": "#DFF0E7",
        "greenText": "#1A662A",
        "optionWhite": "#FAFAFA",
        "Input2": "#F5F5F5",
        "grayText": "#626562",
        "grayBg": "#EFEFEF",
        "warning": "#F46262",
        "Input":  "rgba(67, 65, 88, 0.13)",
        "textBlack13": "rgba(0, 0, 0, 0.23);"
      },
      fontSize: {
        
      },
      width: {
        "997": "62.3125",
        "982": "61.375rem",
        "953": "59.5625rem",
        "559": "34.9375rem",
        "471": "29.4375rem",
        "462": "28.875rem",
        "90": "5.625rem"
      },
      height: {
        "997": "62.3125",
        "982": "61.375rem",
        "953": "59.5625rem",
        "559": "34.9375rem",
        "471": "29.4375rem",
        "462": "28.875rem",
        "90": "5.625rem"
      },
      backgroundImage: {
        "agro": "url(/images/agro.png)",
        "agroLogo": "url(/images/logoAgroi9.png)"
      }
    },
  },
  plugins: [],
}
