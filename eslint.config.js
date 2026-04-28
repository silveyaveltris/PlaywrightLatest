import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-config-prettier';

export default [
  // Don't lint generated dirs or vendored code
  {
    ignores: [
      'node_modules/',
      'test-results/',
      'playwright-report/',
      'blob-report/',
      'allure-results/',
      'allure-report/',
      'playwright/.auth/',
      'playwright/.cache/',
    ],
  },

  // TypeScript baseline
  ...tseslint.configs.recommended,

  // Playwright plugin + the project's import boundary (Gap 6.4)
  {
    files: ['tests/**/*.{ts,tsx}'],
    plugins: { playwright },
    rules: {
      ...playwright.configs.recommended.rules,
      'no-restricted-imports': ['error', {
        paths: [{
          name: '@playwright/test',
          message: 'Import test/expect from @fixtures/baseTest. The framework is wrapped by the project facade.',
        }],
      }],
    },
  },

  // baseTest is the ONE place allowed to touch the framework directly
  {
    files: ['fixtures/**/*.ts'],
    rules: {
      'no-restricted-imports': 'off',
    },
  },

  // Must come last — disables ESLint formatting rules that fight Prettier
  prettier,
];