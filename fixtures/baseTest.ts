import { test as base, type Page } from '@playwright/test';
import type { Environment } from '@config/env';
import { LoginPage } from '@pages/LoginPage';
import { InventoryPage } from '@pages/InventoryPage';

type TestOptions = {
  environment: Environment;
};

type Fixtures = {
  loginPage: LoginPage;
  inventoryReady: Page;
  inventoryPage: InventoryPage;
};

export const test = base.extend<TestOptions & Fixtures>({
  environment: ['qa', { option: true }],

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  //split: navigation as one fixture, page-object construction as another.
  inventoryReady: async ({ page }, use) => {
    await page.goto('/inventory.html');
    await use(page);
  },

  inventoryPage: async ({ inventoryReady }, use) => {
    await use(new InventoryPage(inventoryReady));
  },
});

export { expect } from '@playwright/test';
