import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test("Verify that selected items have expected prices in the cart", async ({ page }) => {
  
  // Login
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  const backpack = page.locator('[data-test="inventory-item"]', { hasText: "Sauce Labs Backpack" });
  const bikeLight = page.locator('[data-test="inventory-item"]', { hasText: "Sauce Labs Bike Light" });

  await expect(backpack.locator('[data-test="inventory-item-price"]')).toHaveText("$29.99");
  await expect(bikeLight.locator('[data-test="inventory-item-price"]')).toHaveText("$9.99");

  // Add to the Cart
  await backpack.locator('[data-test^="add-to-cart"]').click();
  await bikeLight.locator('[data-test^="add-to-cart"]').click();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText("2");

  await page.locator('[data-test="shopping-cart-link"]').click();

  // Price Check
  const cartPrices = await page.locator('[data-test="inventory-item-price"]').allTextContents();
  expect(cartPrices).toContain("$29.99");
  expect(cartPrices).toContain("$9.99");

  // Item(s) Check
  expect(cartPrices.length).toBe(2);
});

