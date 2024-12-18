/** @type {import("prettier").Config} */
export default {
  vueIndentScriptAndStyle: true, // Indents <script> and <style> contents
  plugins: ["prettier-plugin-vue"],
  overrides: [
    {
      files: "*.vue",
      options: {
        parser: "vue",
      },
    },
  ],
};
