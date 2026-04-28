import { test } from '@fixtures/baseTest';

test('Sidebar "All Items" link shows the backpack @smoke @regression', async ({ inventoryPage }) => {
  await inventoryPage.openMenu();
  await inventoryPage.clickAllItems();
  await inventoryPage.expectItemVisible('Sauce Labs Backpack');   // ← renamed
});
