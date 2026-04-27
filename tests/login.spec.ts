//import { test, expect } from '@playwright/test';
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

test('Verify successful login with valid credentials @regression @smoke', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );

  await expect(page).toHaveURL(/inventory/);
  await expect(page).toHaveTitle(/Swag Labs/);
});