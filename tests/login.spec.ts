import { test, expect } from '../fixtures/baseTest';
import { users, invalidCredentials, lockedOutErrorMessage } from '../utils/testData';

test.describe('Login flow', () => {
  test.use({ storageState: { cookies: [], origins: [] } });

  test('valid credentials redirect to inventory @smoke', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);

    await expect(page).toHaveURL(/inventory/);
    await expect(page).toHaveTitle(/Swag Labs/);
  });

  test('locked-out user sees lockout banner @regression', async ({ page, loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);

    await expect(page).not.toHaveURL(/inventory/);
    await loginPage.expectErrorMessage(lockedOutErrorMessage);
  });

  test.describe('rejects invalid credentials', () => {
    for (const { description, username, password, expectedError } of invalidCredentials) {
      test(`${description} @regression`, async ({ page, loginPage }) => {
        await loginPage.goto();
        await loginPage.login(username, password);

        await expect(page).not.toHaveURL(/inventory/);
        await loginPage.expectErrorMessage(expectedError);
      });
    }
  });
});