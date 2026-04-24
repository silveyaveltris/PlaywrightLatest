import { Page, expect } from '@playwright/test';

export class InventoryPage {
  constructor(private page: Page) {}

  menuBtn = this.page.locator('#react-burger-menu-btn');
  allItemsLink = this.page.getByTestId('inventory-sidebar-link');

  getItemByName(itemName: string) {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: itemName });
  }

  async openMenu() {
    await this.menuBtn.click();
  }

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async verifyInventoryPage() {
    await expect(this.page).toHaveURL(/inventory/);
  }

  async verifyItemVisible(itemName: string) {
    await expect(this.getItemByName(itemName)).toBeVisible();
  }
}