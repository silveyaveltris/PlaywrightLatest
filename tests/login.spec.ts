import { test, expect } from '../fixtures/baseTest';
import { users } from '../utils/testData';

test.use({ storageState: { cookies: [], origins: [] } });

test('valid credentials redirect to inventory', async ({ page, loginPage }) => {
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);

  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle(/Swag Labs/);
});