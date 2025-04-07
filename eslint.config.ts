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
    },
  },
  prettier,
);
