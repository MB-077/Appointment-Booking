/** @type {import('tailwindcss').Config} */

import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./public/assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        n: {
          1: "#336ee0",
          4: "#253237",
          5: "#FF3864",
          6: "#ffffff",
          7: "#E0FBFC",
          8: "#000000",
          9: "#CE2D4F",
          11: "#131314",
        },
      },
      fontFamily: {
        openSans: "var(--font-openSans)",
      },
      letterSpacing: {
        tagline: ".15em",
      },
      spacing: {
        0.25: "0.0625rem",
        7.5: "1.875rem",
        15: "3.75rem",
      },
      backgroundImage: {
        gradient: "linear-gradient(45deg,#ce2d4f, #336ee0)",
      },
    },
  },
  plugins: [
    plugin(function ({ addBase, addComponents, addUtilities }) {
      addBase({});
      addComponents({
        ".flex": {
          "flex justify-content items-center gap": {},
        },
      });
    }),
  ],
};
