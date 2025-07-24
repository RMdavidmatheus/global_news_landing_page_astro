import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1300px",
        "3xl": "1920px",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            secondary: {
              DEFAULT: "#F97316",
              100: "#FDD6B9",
              200: "#FBA96F",
              300: "#FA8938",
              400: "#F97A1F",
              500: "#F97316",
              600: "#E56306",
              700: "#CC5805",
              800: "#B84F05",
              900: "#813803",
              foreground: "#FFFFFF",
            },
          },
        },
        dark: {
          colors: {
            secondary: {
              DEFAULT: "#F97316",
              100: "#FDD6B9",
              200: "#FBA96F",
              300: "#FA8938",
              400: "#F97A1F",
              500: "#F97316",
              600: "#E56306",
              700: "#CC5805",
              800: "#B84F05",
              900: "#813803",
              foreground: "#FFFFFF",
            },
          },
        },
      },
    }),
  ],
};
