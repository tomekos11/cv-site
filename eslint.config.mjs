import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

/** @type {import('eslint').Linter.Config[]} */
export default  withNuxt([
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  { files: ['**/*.vue'], languageOptions: { parserOptions: { parser: tseslint.parser } } },
  
  {
    rules: {
      // Wymusza średnik na końcu każdej instrukcji
      semi: ['error', 'always'],

      // Preferuje użycie 'const' zamiast 'let', gdy zmienna nie jest ponownie przypisywana
      'prefer-const': ['error'],

      // Wymaga używania pojedynczych cudzysłowów w łańcuchach znaków
      quotes: ['error', 'single'],

      // Wymusza wcięcia na 2 spacje (dotyczy również plików Vue)
      'indent': ['error', 2],
      'vue/html-indent': ['error', 2],

      // Wymaga użycia ścisłej równości (===) zamiast luźnej (==)
      'eqeqeq': ['error', 'always'],

      // Wymaga, aby wszystkie zmienne były zadeklarowane przed ich użyciem
      'no-use-before-define': ['error', { 'variables': false }],

      // Zabezpiecza przed nieużywanymi zmiennymi
      'no-unused-vars': ['error', { 'args': 'none' }],

      // Zabezpiecza przed niepotrzebnymi funkcjami anonimowymi
      'no-new-func': 'error',

      // Zabezpiecza przed używaniem funkcji eval
      'no-eval': 'error',

      // Wymaga, aby obiekty i tablice były deklarowane na jednej linii, jeśli są małe
      'object-curly-spacing': ['error', 'always'],

      // Wymaga przestrzegania konwencji w nazwach plików (camelCase)
      'camelcase': ['error', { 'properties': 'always' }],

      // Wymaga używania template literals zamiast string concatenation, gdzie to możliwe
      'prefer-template': 'error',

      // Wymaga przestrzegania zasad organizacji importów (np. porządek)
      'import/order': ['error', { 'groups': [['builtin', 'external', 'internal']] }],

      'vue/multi-word-component-names': 'off'
    },
  },
]);