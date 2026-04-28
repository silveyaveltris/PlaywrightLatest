import { defineConfig, devices } from '@playwright/test';
import { getEnvConfig, resolveTargetEnvs, authStateFilePath, type Environment } from '@config/env';

const browsers = [
 { name: 'chromium', device: devices['Desktop Chrome']  },
// { name: 'firefox',  device: devices['Desktop Firefox'] },
// { name: 'webkit',   device: devices['Desktop Safari']  },
] as const;

const targetEnvs = resolveTargetEnvs();

const setupProjects = targetEnvs.map(env => ({
  name: `setup-${env}`,
  testMatch: /auth\.setup\.ts/,
  use: {
    baseURL: getEnvConfig(env).urls.base,
    environment: env,
  },
}));

const browserProjects = browsers.flatMap(b =>
  targetEnvs.map((env: Environment) => ({
    name: `${b.name}-${env}`,
    use: {
      ...b.device,
      baseURL: getEnvConfig(env).urls.base,
      environment: env,
      storageState: authStateFilePath(env),
    },
    dependencies: [`setup-${env}`],
  }))
);

export default defineConfig({
  //Test location
  testDir: './tests/',

  //Artifacts output (screenshots, videos, traces)
  outputDir: './test-results',

  //Global expect() assertion timeout
  expect: {
    timeout: 10000,
  },

  //Only run files matching this pattern
  testMatch: '**/*.spec.ts',

  //Run tests in parallel
  fullyParallel: true,

  //Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  //Retry failed tests in CI for stability
  retries: process.env.CI ? 2 : 1,

  //Control workers (parallel execution)
  workers: process.env.CI ? 1 : undefined,

  //Reporting — HTML opens on failure locally, never in CI
  reporter: [
    ['html', { open: process.env.CI ? 'never' : 'on-failure' }],
    ['list'],
    ['allure-playwright'],
  ],

  //Global settings for all tests
  use: {
    // Use data-test as the attribute for page.getByTestId()
    testIdAttribute: 'data-test',

    // Headless in CI, headed locally for visibility
    headless: !!process.env.CI,  //headless in CI, headed locally
   
    // Per-action and navigation timeouts
    actionTimeout: 10000,
    navigationTimeout: 30000,

    // Capture trace on first retry for debugging
    trace: 'on-first-retry',

    // Screenshot and video on failure
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
  ...setupProjects,        // generates setup-qa, setup-staging, etc
  ...browserProjects, //critical: must spread the generated array
],
});
