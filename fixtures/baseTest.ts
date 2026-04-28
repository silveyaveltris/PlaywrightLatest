import { test as base } from '@playwright/test';
import type { Environment } from '../config/env';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
//import { users } from '../utils/testData';

type TestOptions = {
  environment: Environment;
};

type Fixtures = {
  loginPage: LoginPage;
  inventoryReady: import('@playwright/test').Page;
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestOptions & Fixtures>({
  // The `{ option: true }` tuple form makes this configurable per-project via `use`.
  environment: ['qa', { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  // Gap 3.3 split: navigation as one fixture, page-object construction as another.
  inventoryReady: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await use(page);
  },

  inventoryPage: async ({ inventoryReady }, use) => {
    await use(new InventoryPage(inventoryReady));
  },
});

export { expect } from '@playwright/test';