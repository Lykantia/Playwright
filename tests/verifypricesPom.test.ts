import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { CartPage } from "../pages/CartPage";

test("Verify prices of two selected items in the cart", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);

  // Login
  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  // Dashboard prices 
  // IMHO: I am not huge fan to this approach - to hide assertion in the page object
  // it should be easy to see from the test what is expected and what is actual (how do you test it)
  await inventoryPage.verifyItemPrice("Sauce Labs Backpack", "$29.99");
  await inventoryPage.verifyItemPrice("Sauce Labs Bike Light", "$9.99");

  // Add to the cart
  await inventoryPage.addItemToCart("Sauce Labs Backpack");
  await inventoryPage.addItemToCart("Sauce Labs Bike Light");
  await inventoryPage.assertCartCount(2);

  // Check cart
  await inventoryPage.openCart();
  await cartPage.assertPrice("Sauce Labs Backpack", "$29.99");
  await cartPage.assertPrice("Sauce Labs Bike Light", "$9.99");

  const prices = await cartPage.getAllPrices();
  expect(prices).toContain("$29.99");
  expect(prices).toContain("$9.99");
  expect(prices.length).toBe(2);
});
