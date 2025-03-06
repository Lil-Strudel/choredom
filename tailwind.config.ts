import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        indie: ['"Indie Flower"', "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
