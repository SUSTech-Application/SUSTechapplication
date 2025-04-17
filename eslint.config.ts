import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import vue from "eslint-plugin-vue";
import ts from "typescript-eslint";

export default ts.config(
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  vue.configs["flat/recommended"],
  {
    rules: {
      "vue/no-v-html": "off", // Disable v-html warning as we need it for formatted text
    },
  },
  {
    // FIXME: remove this once we no longer need the bracket fix
    ignores: ["**/*.js"],
  },
  {
    languageOptions: {
      parserOptions: {
        extraFileExtensions: ["vue"],
        parser: ts.parser,
        projectService: true,
      },
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        setTimeout: "readonly",
        console: "readonly",
        alert: "readonly",
        fetch: "readonly",
        ClipboardItem: "readonly",
      },
      // Add browser environment
      ecmaVersion: 2022,
      sourceType: "module",
    },
  },
  prettier,
);
