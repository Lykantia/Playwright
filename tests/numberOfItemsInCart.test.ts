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

  // What if the page has more than 6 items? Would be better to use for loop with limit (6) 
  // Or if you want to add all, you should also update badge count - that badge should be updated after each add
  // Like: let badgeCount = 0; in loop badgeCount++;
  while ((await addButtons.count()) > 0) {
    const btn = addButtons.first();
    await btn.scrollIntoViewIfNeeded(); 
    await expect(btn).toBeVisible();
    await btn.click();
    await page.waitForTimeout(100); 
  }
  // await expect(badge).toHaveText(badgeCount.toString());
  await expect(badge).toHaveText("6");
});
