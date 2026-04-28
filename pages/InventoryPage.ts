import { Page, expect } from '@playwright/test';

export class InventoryPage {
  private readonly menuBtn = this.page.getByRole('button', { name: 'Open Menu' });
  private readonly allItemsLink = this.page.getByTestId('inventory-sidebar-link');

  constructor(private readonly page: Page) {}

  private itemByName(itemName: string) {
    return this.page.getByTestId('inventory-item-name').filter({ hasText: itemName });
  }

  async openMenu() {
    await this.menuBtn.click();
  }

  async clickAllItems() {
    await this.allItemsLink.click();
  }

  async expectItemVisible(itemName: string) {
    await expect(this.itemByName(itemName)).toBeVisible();
  }
}