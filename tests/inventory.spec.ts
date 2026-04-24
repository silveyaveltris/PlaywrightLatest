import { test } from '../fixtures/baseTest';

test('Verify menus after login', async ({ page, inventoryPage }) => {
  await inventoryPage.openMenu();
  await inventoryPage.clickAllItems();
  await inventoryPage.verifyItemVisible('Sauce Labs Backpack');
});