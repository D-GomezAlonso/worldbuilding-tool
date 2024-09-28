import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        "gray-navbar": "#1f1f1f",
        "gray-background": "#121212",
        "gray-toolbar": "#292929",
        "navbar-selected": "#31281f",
        "navbar-hover": "#313131",
        "navbar-accordion-line": "rgba(255, 255, 255, 0.15)",
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
        gradient: {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out",
        gradient: "gradient 15s ease infinite",
      },
      boxShadow: {
        "image-panel": "0px 150px 5px -100px rgba(0, 0, 0, 0.6) inset",
      },
      backgroundImage: {
        "home-gradient":
          "linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)",
        "radial-gradient":
          "linear-gradient(rgb(18, 18, 18) 0%, rgba(16, 16, 16, 0) 25%, rgba(24, 24, 24, 0) 75%, rgb(18, 18, 18) 100%)",
      },
      backgroundSize: {
        radial: "5PX",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
