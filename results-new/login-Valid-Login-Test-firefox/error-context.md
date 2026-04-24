# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: login.spec.ts >> Valid Login Test
- Location: tests\login.spec.ts:6:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('#login-button')
    - locator resolved to <input type="submit" value="Login" id="login-button" name="login-button" data-test="login-button" class="submit-button btn_action"/>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - generic [ref=e4]: Swag Labs
  - generic [ref=e5]:
    - generic [ref=e9]:
      - textbox "Username" [ref=e11]: standard_user
      - textbox "Password" [active] [ref=e13]: secret_sauce
      - button "Login" [ref=e15] [cursor=pointer]
    - generic [ref=e17]:
      - generic [ref=e18]:
        - heading "Accepted usernames are:" [level=4] [ref=e19]
        - text: standard_user
        - text: locked_out_user
        - text: problem_user
        - text: performance_glitch_user
        - text: error_user
        - text: visual_user
      - generic [ref=e20]:
        - heading "Password for all users:" [level=4] [ref=e21]
        - text: secret_sauce
```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | import { ENV } from '../config/env';
  3  | 
  4  | export class LoginPage {
  5  |   constructor(private page: Page) {}
  6  | 
  7  |   username = '#user-name';
  8  |   password = '#password';
  9  |   loginBtn = '#login-button';
  10 | 
  11 |   async goto() {
  12 |      await this.page.goto(ENV.BASE_URL);
  13 |   }
  14 | 
  15 |   async login(user: string, pass: string) {
  16 |     await this.page.fill(this.username, user);
  17 |     await this.page.fill(this.password, pass);
> 18 |     await this.page.click(this.loginBtn);
     |                     ^ Error: page.click: Test timeout of 30000ms exceeded.
  19 |   }
  20 | }
```