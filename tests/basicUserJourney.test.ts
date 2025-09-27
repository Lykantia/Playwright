import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkoutData } from "../data/checkout";

test("User can complete checkout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

//login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await expect(
    page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
  ).toContainText("Add to cart");
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText(
    "1"
  );

  //checkout form
  const checkoutPage = new CheckoutPage(page);

  await checkoutPage.openCart();
  await checkoutPage.startCheckout();
  await checkoutPage.fillCheckoutForm(
    checkoutData.valid.firstName,
    checkoutData.valid.lastName,
    checkoutData.valid.postalCode
    );
  await checkoutPage.continueCheckout();
  await checkoutPage.finishCheckout();

  await expect(checkoutPage.orderConfirmation).toContainText(
    "Thank you for your order!"
  );

  await expect(page.locator('[data-test="back-to-products"]')).toBeVisible();
  await page.locator('[data-test="back-to-products"]').click();
});
