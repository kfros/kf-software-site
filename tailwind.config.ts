import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#0F1A2C",
          primary: "#142847",
          accent: "#1A535C",
          light: "#F4F7F6",
          green: "#0B6623",
        },
      },
      boxShadow: {
        soft: "0 20px 60px rgba(15, 26, 44, 0.12)",
      },
    },
  },
  plugins: [],
};

export default config;
