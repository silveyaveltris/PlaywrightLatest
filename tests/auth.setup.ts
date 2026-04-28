import { test as setup, expect } from '../fixtures/baseTest';
import { users } from '../utils/testData';

setup('authenticate as standard user', async ({ page, loginPage, environment }) => {
  await loginPage.goto();
  await loginPage.login(users.validUser.username, users.validUser.password);

  // Confirm login succeeded before persisting storageState — capturing it
  // before post-login cookies are set produces an unauthenticated file.
  await expect(page).toHaveURL(/inventory/);

  await page.context().storageState({ path: `playwright/.auth/user-${environment}.json` });
});