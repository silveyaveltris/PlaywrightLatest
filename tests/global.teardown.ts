// tests/global.teardown.ts
import { test as teardown } from '@playwright/test';

teardown('global teardown', async () => {
  // Runs once after all dependent projects complete.
  // Use for: deleting temp data, closing connections, stopping services.
  console.log('[Global Teardown] Test suite finished.');
});