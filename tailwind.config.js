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
      },
      keyframes: {
        wiggle: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(90deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 0.5s ease-in-out",
      },
      boxShadow: {
        "image-panel": "0px 150px 5px -100px rgba(0, 0, 0, 0.6) inset",
      },
      backgroundImage: {
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
