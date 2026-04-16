import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        pubgGold: "#f2b90c",
        pubgSteel: "#1f2329",
        pubgAsh: "#6f7681"
      }
    }
  },
  plugins: []
};

export default config;
