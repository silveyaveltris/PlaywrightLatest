import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  // ✅ Use locators
  username = this.page.locator('#user-name');
  password = this.page.locator('#password');
  loginBtn = this.page.locator('#login-button');

  async goto() {
    await this.page.goto('/');
    await expect(this.username).toBeVisible(); // ensure page loaded
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/inventory/);
  }
}