import { Page, expect } from '@playwright/test';

export class LoginPage {
  private readonly username = this.page.getByTestId('username');
  private readonly password = this.page.getByTestId('password');
  private readonly loginBtn = this.page.getByTestId('login-button');
  private readonly errorMessage = this.page.getByTestId('error');

  constructor(private readonly page: Page) {}

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