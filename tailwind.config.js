/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,vue}", "./public/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
