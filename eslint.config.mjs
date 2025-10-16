// eslint.config.js
import { defineConfig } from "eslint/config";
import tinymceEslintPlugin from "@tinymce/eslint-plugin";
import js from '@eslint/js';

export default defineConfig([
	{
    plugins: {
        "@tinymce": tinymceEslintPlugin
    },
    extends: [ "@tinymce/standard" ],
    files: [
      "src/**/*.ts",
      "src/**/*.tsx"
    ],
    ignores: [
        "src/demo/demo.ts",
        "src/**/*.stories.*"
    ],
    languageOptions: {
      parserOptions: {
          sourceType: "module",
          project: [
              "./tsconfig.json"
          ]
      },
    },
    rules: {
      "@tinymce/prefer-fun": "off"
    }
  },
  {
    files: [ "src/**/*.stories.*" ],
    languageOptions: {
      parserOptions: {
        sourceType: "module",
        project: [
            "./tsconfig.storybook.json"
        ]
      },
    },
    rules: {
      "@tinymce/prefer-fun": "off",
      "no-console": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-unsafe-argument": "off"
    }
  },
  {
    files: [
      "**/*.js"
    ],
    plugins: { js },
    env: {
      "es6": true,
      "node": true,
      "browser": true
    },
    extends: [ "js/recommended" ],
    parser: "espree",
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module"
      }
    },
    rules: {
      indent: [ "error", 2, { "SwitchCase": 1 } ],
      "no-shadow": "error",
      "no-unused-vars": [ "error", { "argsIgnorePattern": "^_" } ],
      "object-curly-spacing": [ "error", "always", { "arraysInObjects": false, "objectsInObjects": false } ],
      quotes: [ "error", "single" ],
      semi: "error"
    }
  }
]);