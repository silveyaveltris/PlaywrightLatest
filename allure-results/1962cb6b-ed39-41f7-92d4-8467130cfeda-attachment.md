# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Verify successful login with valid credentials @regression @smoke
- Location: tests\login.spec.ts:6:5

# Error details

```
Error: page.goto: Could not resolve hostname
Call log:
  - navigating to "https://staging.saucedemo.com/", waiting until "load"

```

# Test source

```ts
  1  | import { Page, expect } from '@playwright/test';
  2  | 
  3  | export class LoginPage {
  4  |   constructor(private page: Page) {}
  5  | 
  6  |   // ✅ Use locators
  7  |   username = this.page.locator('#user-name');
  8  |   password = this.page.locator('#password');
  9  |   loginBtn = this.page.locator('#login-button');
  10 | 
  11 |   async goto() {
> 12 |     await this.page.goto('/');
     |                     ^ Error: page.goto: Could not resolve hostname
  13 |     await expect(this.username).toBeVisible(); // ensure page loaded
  14 |   }
  15 | 
  16 |   async login(user: string, pass: string) {
  17 |     await this.username.fill(user);
  18 |     await this.password.fill(pass);
  19 |     await this.loginBtn.click();
  20 |   }
  21 | 
  22 |   async verifyLoginSuccess() {
  23 |     await expect(this.page).toHaveURL(/inventory/);
  24 |   }
  25 | }
```