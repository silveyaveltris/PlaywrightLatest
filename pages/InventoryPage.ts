import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  private readonly menuBtn: Locator;
  private readonly allItemsLink: Locator;

  constructor(private readonly page: Page) {
    this.menuBtn      = page.getByRole('button', { name: 'Open Menu' });
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
  }

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
