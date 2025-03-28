import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import ts from "typescript-eslint";

export default ts.config(
  {
    ignores: [
      "cache",
      "dist",
      // FIXME: remove this once we no longer need the bracket fix
      "**/*.js",
    ],
  },
  js.configs.recommended,
  ts.configs.strictTypeChecked,
  ts.configs.stylisticTypeChecked,
  vue.configs["flat/recommended"],
  { languageOptions: { parserOptions: { projectService: true } } },
);
