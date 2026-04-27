import { test as base } from '@playwright/test';
import type { Environment } from '../config/env';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

type TestOptions = {
  environment: Environment;
};

type Fixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestOptions & Fixtures>({
  // The `{ option: true }` tuple form makes this configurable per-project via `use`.
  environment: ['qa', { option: true }],

  inventoryPage: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await use(new InventoryPage(page));
  },
});

export { expect } from '@playwright/test';