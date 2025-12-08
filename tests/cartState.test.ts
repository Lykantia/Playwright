import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test("Checking cart state after adding and removing item", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

//login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  //Adding
  await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  //Removing
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
  
  //Check item number in basket
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
  
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
});