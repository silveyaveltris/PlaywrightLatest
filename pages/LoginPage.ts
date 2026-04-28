import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  private readonly username: Locator;
  private readonly password: Locator;
  private readonly loginBtn: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    this.username     = page.getByTestId('username');
    this.password     = page.getByTestId('password');
    this.loginBtn     = page.getByTestId('login-button');
    this.errorMessage = page.getByTestId('error');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(user: string, pass: string) {
    await this.username.fill(user);
    await this.password.fill(pass);
    await this.loginBtn.click();
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message);
  }
}
