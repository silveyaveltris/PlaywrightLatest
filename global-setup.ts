import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Runs once before all test suites.
  // Use this for: seeding test data, creating auth state files, starting external services.
  console.log(`\n[Global Setup] Base URL: ${config.projects[0].use.baseURL}`);
}

export default globalSetup;
