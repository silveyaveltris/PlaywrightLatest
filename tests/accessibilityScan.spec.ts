import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../utils/testData';

test('Accessibility scan', async ({ page }) => {
  const loginPage = new LoginPage(page);
  
    await loginPage.goto();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );
  
    await expect(page).toHaveURL(/inventory/);

    
  const results = await new AxeBuilder({ page }).analyze();
 // expect(results.violations).toEqual([]);
 const criticalViolations = results.violations.filter(
  v => v.impact === 'critical'
);

expect(criticalViolations).toEqual([]);
});