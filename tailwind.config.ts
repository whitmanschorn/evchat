import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // Paths to your components/pages
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add more paths here if you have more directories where you use Tailwind classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
export default config;
