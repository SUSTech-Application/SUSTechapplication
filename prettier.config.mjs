/** @type {import("prettier").Config} */
export default {
  vueIndentScriptAndStyle: true, // Indents <script> and <style> contents
  plugins: ["prettier-plugin-astro", "prettier-plugin-vue"],
  overrides: [
    {
      files: "*.astro",
      options: {
        parser: "astro",
      },
    },
  ],
};
