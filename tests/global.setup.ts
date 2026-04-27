// tests/global.setup.ts
import { test as setup } from '@playwright/test';

setup('global setup', async () => {
  // Runs once before all dependent projects.
  // Use for: seeding data, creating storageState, starting external services.
  console.log('[Global Setup] Initializing test environment...');
});