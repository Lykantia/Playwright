import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get cartLink(): Locator {
    return this.page.getByTestId("shopping-cart-link");
  }

  get cartBadge(): Locator {
    return this.page.getByTestId("shopping-cart-badge");
  }

  get cartItems(): Locator {
    return this.page.locator(".cart_item");
  }

  itemPrice(name: string): Locator {
    return this.page
      .locator(".cart_item", { hasText: name })
      .locator(".inventory_item_price");
  }

  async openCart(): Promise<void> {
    await this.cartLink.click();
  }

  async assertCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge).toHaveText(String(expectedCount));
  }

  async assertPrice(name: string, expectedPrice: string): Promise<void> {
    const priceLocator = this.itemPrice(name);
    await priceLocator.first().waitFor({ state: "visible", timeout: 5000 });
    const actualText = await priceLocator.innerText();
    console.log(`Product: ${name}, actual price: ${actualText}`);
    await expect(priceLocator).toHaveText(expectedPrice);
  }

  async getAllPrices(): Promise<string[]> {
    await this.cartItems.first().waitFor({ state: "visible", timeout: 5000 });

    const prices = await this.page
      .locator(".inventory_item_price")
      .allInnerTexts();

    console.log("Actual Prices:", prices);
    return prices;
  }
}
