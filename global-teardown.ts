import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Runs once after all test suites complete.
  // Use this for: deleting temp test data, closing DB connections, stopping external services.
  console.log('\n[Global Teardown] Test suite finished.');
}

export default globalTeardown;
