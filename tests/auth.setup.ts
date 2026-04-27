import { test as setup, expect } from '../fixtures/baseTest';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

setup('authenticate as standard user', async ({ page, environment }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Confirm login succeeded before persisting storageState.
  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: `playwright/.auth/user-${environment}.json` });
});