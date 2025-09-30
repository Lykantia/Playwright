import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test("Number of items in cart", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  //login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText(
    ""
  );

  const addSelector = '[data-test^="add-to-cart"]'; //  = exact; ^ start with, $ end with, * contains.
  const badge = page.locator('[data-test="shopping-cart-badge"]');

  const addButtons = page.locator(addSelector);
  await expect(addButtons.first()).toBeVisible();

  while ((await addButtons.count()) > 0) {
    const btn = addButtons.first();
    await btn.scrollIntoViewIfNeeded(); 
    await expect(btn).toBeVisible();
    await btn.click();
    await page.waitForTimeout(100); 
  }

  await expect(badge).toHaveText("6");
});
