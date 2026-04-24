import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users } from '../utils/testData';

type MyFixtures = {
  inventoryPage: InventoryPage;
};

export const test = base.extend<MyFixtures>({
  inventoryPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    await use(new InventoryPage(page));
  }
});