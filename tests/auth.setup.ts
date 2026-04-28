import { test as setup, expect } from '@fixtures/baseTest';
import { authStateFilePath } from '@config/env';        // ← add this line
import { users } from '@utils/testData';

setup('authenticate as standard user', async ({ page, loginPage, environment }) => {
  await loginPage.goto();
  await loginPage.login(users.standard.username, users.standard.password);

  // Confirm login succeeded before persisting storageState — capturing it
  // before post-login cookies are set produces an unauthenticated file.
  await expect(page).toHaveURL(/inventory/);

await page.context().storageState({ path: authStateFilePath(environment) });
});
