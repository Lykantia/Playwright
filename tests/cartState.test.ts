import { expect, test } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";


// I would suggest to add describe block (it should describe what you are testing)
// and test should be how you are testing it (what you are doing)

test.describe("Cart state", () => {
  test("should be updated correctly after adding and removing item", async ({ page }) => {})
  test("should be empty after removing all items", async ({ page }) => {})
  test("should be empty by default", async ({ page }) => {})
})

// I would say that naming of the test should be more descriptive, like
// "Cart state should be updated correctly after adding and removing item"
// Then you should check the cart state (before and after)
test("Checking cart state after adding and removing item", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

//login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  //Adding
  // https://playwright.dev/docs/locators
  // ^^ After reading this, do you see any better way to find element?
  await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toContainText('Add to cart');
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  
  //Removing
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
  
  //Check item number in basket
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');

  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
  
  // Why do you have some action after assertion? Do you need that? 
  await page.locator('[data-test="continue-shopping"]').click();
  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
});