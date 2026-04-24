import { defineConfig, devices } from '@playwright/test';
import { ENV } from './config/env';

export default defineConfig({
  // 📁 Test location
  testDir: './tests',

  // 🗂️ Artifacts output (screenshots, videos, traces)
  outputDir: './test-results',

  // ⏱️ Per-test timeout (ms) — overrides 30s default
 // timeout: 30000,

  // ✅ Global expect() assertion timeout
  expect: {
    timeout: 10000,
  },

  // 🔍 Only run files matching this pattern
  testMatch: '**/*.spec.ts',

  // ⚡ Run tests in parallel
  fullyParallel: true,

  // 🚨 Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // 🔁 Retry failed tests in CI for stability
  retries: process.env.CI ? 2 : 1,

  // 👥 Control workers (parallel execution)
  workers: process.env.CI ? 1 : undefined,

  // 📊 Reporting — HTML opens on failure locally, never in CI
  reporter: [
    ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
    ['list'],
    ['allure-playwright'],
  ],

  // 🌐 Global settings for all tests
  use: {
    // Base URL for UI navigation
    baseURL: ENV.BASE_URL,

    // Use data-test as the attribute for page.getByTestId()
    testIdAttribute: 'data-test',

    // Headless in CI, headed locally for visibility
    headless: !!process.env.CI,
    launchOptions: {
      slowMo: process.env.CI ? 0 : 300,
    },

    // Per-action and navigation timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,

    // Capture trace on first retry for debugging
    trace: 'on-first-retry',

    // Screenshot and video on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // 🌍 Cross-browser testing setup
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],

  // 🔧 Global setup and teardown hooks
  globalSetup: './global-setup.ts',
  globalTeardown: './global-teardown.ts',

  // 🚀 Optional local server setup (uncomment if needed)
  /*
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  */
});