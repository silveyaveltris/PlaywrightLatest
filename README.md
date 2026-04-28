# Playwright Test Suite

Cross-browser, multi-environment end-to-end tests for [SauceDemo](https://www.saucedemo.com/), built on Playwright with centralized authentication via `storageState` and Allure reporting.

## Prerequisites

- Node.js 20+
- npm

## Setup

```bash
npm install
npx playwright install --with-deps
```

## Running tests

| Goal | Command |
|------|---------|
| Default run (qa env, all browsers) | `npm test` |
| Specific environment | `& { $env:TEST_ENV='staging'; npm test }` |
| Multiple environments | `& { $env:TEST_ENV='qa,staging'; npm test }` |
| Single project | `npx playwright test --project=chromium-qa` |
| Smoke subset (tests tagged `@smoke`) | `npx playwright test --grep "@smoke"` |
| Visual debugging (UI Mode) | `npm run test:ui` |
| Step through a single test | `npm run test:debug` |
| Open the last HTML report | `npm run report` |
| Wipe generated artifacts | `npm run clean` |
| List the matrix without running | `npx playwright test --list` |

> Commands above use PowerShell syntax for env vars. On bash/zsh, replace `& { $env:TEST_ENV='qa'; npm test }` with `TEST_ENV=qa npm test`.

## Architecture

### Project matrix

`playwright.config.ts` generates one project per (browser × environment) combination. With three browsers and one selected environment, you get three projects: `chromium-qa`, `firefox-qa`, `webkit-qa`. Setting `TEST_ENV='qa,staging'` doubles the matrix.

Environments are defined in [config/env.ts](config/env.ts). Adding a new one is a single entry there; the matrix grows automatically.

### Authentication via `storageState`

A `setup-<env>` project runs once per environment at the start of every invocation. It performs a real login and saves the authenticated browser state to `playwright/.auth/user-<env>.json`.

Browser projects declare `dependencies: ['setup-<env>']` and load the saved file via `use.storageState`. Tests start already authenticated — login overhead is paid **once per environment**, not once per test.

The exception is [tests/login.spec.ts](tests/login.spec.ts), which tests the login flow itself and opts out of `storageState` with `test.use({ storageState: { cookies: [], origins: [] } })`.

### Fixtures

[fixtures/baseTest.ts](fixtures/baseTest.ts) extends Playwright's base `test` with:

- **`environment`** — the active env name, available as a typed fixture in any test
- **`inventoryPage`** — pre-authenticated `InventoryPage` instance, already navigated to `/inventory.html`

All specs import from `../fixtures/baseTest`, not from `@playwright/test` directly.

### Page Object Model

UI is encapsulated in classes under [pages/](pages/). Tests interact with pages via methods (`loginPage.login(...)`, `inventoryPage.openMenu()`), not raw locators.

## Project structure

```
config/         Environment registry (URLs, future per-env data)
fixtures/       Custom Playwright test fixtures
pages/          Page Object Model classes
tests/          Spec files + auth.setup.ts
utils/          Test data (users, fixtures)
playwright.config.ts
```

## Test conventions

- **Naming** — test names should describe the behavior verified, not the steps taken. `'Sidebar "All Items" link shows the backpack'` over `'Verify menus after login'`.
- **Tags** — append `@smoke`, `@regression`, etc. to the test title for grep-based filtering.
- **Imports** — `import { test, expect } from '@fixtures/baseTest'` (never from `@playwright/test` directly in specs).
- **Fixtures over inline setup** — if multiple tests need the same precondition, lift it into a fixture.

## Reporting

Three reporters run by default:

- **HTML** — opens automatically on failure locally; saved to `playwright-report/`. View with `npm run report`.
- **List** — live console output during the run.
- **Allure** — raw JSON data written to `allure-results/`. Generate the HTML site with `npx allure serve allure-results`.

The HTML report includes the full **trace viewer** — failed tests can be replayed step-by-step with DOM snapshots, network calls, and console output. This is the primary debugging tool.

## CI

GitHub Actions runs `npm test` on every push and pull request to `main`. The HTML report is uploaded as a build artifact (30-day retention). See [.github/workflows/playwright.yml](.github/workflows/playwright.yml).

## Adding things

### A new environment

1. Add the name to the `Environment` union and `configs` map in [config/env.ts](config/env.ts).
2. Run with `TEST_ENV='<new-env>'`. The matrix picks it up automatically — no other config edits needed.

### A new test

1. Create `tests/<feature>.spec.ts`.
2. `import { test, expect } from '../fixtures/baseTest'`.
3. Use existing fixtures (`inventoryPage`, etc.) where applicable, or extend [fixtures/baseTest.ts](fixtures/baseTest.ts) to add a new one.
4. Tag with `@smoke` or `@regression` if you want grep filtering.

### A new page

1. Create `pages/<Feature>Page.ts` exporting a class with private locators and public action/query methods.
2. If many tests need it pre-loaded, add it as a fixture in [fixtures/baseTest.ts](fixtures/baseTest.ts).

## Generated directories (not committed)

| Path | Source | Purpose |
|------|--------|---------|
| `test-results/` | Playwright runner | Per-test screenshots, videos, traces |
| `playwright-report/` | HTML reporter | Static HTML report site |
| `allure-results/` | Allure reporter | Raw input for Allure CLI |
| `allure-report/` | `npx allure generate` | Compiled Allure HTML site |
| `playwright/.auth/` | `auth.setup.ts` | Saved `storageState` files (contain credentials — never commit) |
| `playwright/.cache/` | Playwright internals | Browser cache |

All are listed in [.gitignore](.gitignore) and regenerated on each run.
