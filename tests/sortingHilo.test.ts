import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test( "Sorting items hilo", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  //login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  // sorting: Price (high to low)
  await page
    .locator('[data-test="product-sort-container"]')
    .selectOption("hilo");

  const prices = await page
    .locator('[data-test="inventory-item-price"]')
    .allTextContents();

  const numericPrices = prices.map((price) =>
    parseFloat(price.replace("$", ""))
  );

  for (let i = 0; i < numericPrices.length - 1; i++) {
    expect(numericPrices[i]).toBeGreaterThanOrEqual(numericPrices[i + 1]);
  }
});
