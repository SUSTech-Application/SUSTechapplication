import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.astro", "./public/**/*.html"],
  safelist: [
    {
      pattern: /^badge-/, // Dynamic class names not supported in dev mode
    },
  ],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss", daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
