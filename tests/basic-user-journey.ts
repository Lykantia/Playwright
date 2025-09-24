import { test, expect } from "@playwright/test";
import { normalUser } from "../data/users";

test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(normalUser.username);
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill(normalUser.password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await expect(
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  ).toContainText("Add to cart");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText(
    "1"
  );
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill("Test");
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill("Booking");
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill("700 00");
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  await expect(page.locator('[data-test="complete-header"]')).toContainText(
    "Thank you for your order!"
  );
  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
});
