import { Page, Locator, expect } from "@playwright/test";

export class InventoryPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  item(name: string): Locator {
    return this.page.locator('[data-test="inventory-item"]', { hasText: name });
  }

  itemPrice(name: string): Locator {
    return this.item(name).locator('[data-test="inventory-item-price"]');
  }

  //Add to cart
  async addItemToCart(name: string): Promise<void> {
    await this.item(name).locator('[data-test^="add-to-cart"]').click();
  }

  // Asserts
  async verifyItemPrice(name: string, expectedPrice: string): Promise<void> {
    await expect(this.itemPrice(name)).toHaveText(expectedPrice);
  }

  async assertCartCount(count: number): Promise<void> {
    await expect(
      this.page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText(String(count));
  }

  async openCart(): Promise<void> {
    await this.page.locator('[data-test="shopping-cart-link"]').click();
  }
}
