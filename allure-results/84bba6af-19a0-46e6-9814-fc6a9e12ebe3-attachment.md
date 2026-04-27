# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Verify successful login with valid credentials @regression @smoke
- Location: tests\login.spec.ts:6:5

# Error details

```
Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://staging.saucedemo.com/
Call log:
  - navigating to "https://staging.saucedemo.com/", waiting until "load"

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e6]:
    - heading "This site can’t be reached" [level=1] [ref=e7]
    - paragraph [ref=e8]: Check if there is a typo in staging.saucedemo.com.
    - generic [ref=e9]:
      - paragraph
      - list [ref=e10]:
        - listitem [ref=e11]:
          - text: If spelling is correct,
          - link "try running Windows Network Diagnostics" [ref=e12] [cursor=pointer]:
            - /url: javascript:diagnoseErrors()
          - text: .
    - generic [ref=e13]: DNS_PROBE_FINISHED_NXDOMAIN
  - button "Reload" [ref=e16] [cursor=pointer]
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
     |                     ^ Error: page.goto: net::ERR_NAME_NOT_RESOLVED at https://staging.saucedemo.com/
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