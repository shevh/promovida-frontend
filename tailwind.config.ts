import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3ecdf3",
          50: "#e0f8ff",
          100: "#b3f0ff",
          500: "#3ecdf3",
          600: "#2bb8e0",
          700: "#1f9bc0",
        },
        secondary: {
          DEFAULT: "#35e47d",
          50: "#e0fff0",
          100: "#b3ffe0",
          500: "#35e47d",
          600: "#2ac96d",
          700: "#21a85a",
        },
      },
      backgroundImage: {
        "hero-gradient": "linear-gradient(135deg, #3ecdf3 0%, #35e47d 100%)",
        "card-gradient": "linear-gradient(135deg, #3ecdf3, #35e47d)",
      },
    },
  },
  plugins: [],
};

export default config;
