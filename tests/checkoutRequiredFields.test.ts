import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkoutData } from "../data/checkout";

test("Sequential validation of fields in checkout", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  //login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  const checkout = new CheckoutPage(page);

  await checkout.openCart();
  await checkout.startCheckout();

  // First Name
  await checkout.continueCheckout();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Error: First Name is required"
  );
  await checkout.firstNameInput.fill(checkoutData.valid.firstName);

  // Last Name
  await checkout.continueCheckout();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Error: Last Name is required"
  );
  await checkout.lastNameInput.fill(checkoutData.valid.lastName);

  // Postal Code
  await checkout.continueCheckout();
  await expect(page.locator('[data-test="error"]')).toContainText(
    "Error: Postal Code is required"
  );
  await checkout.postalCodeInput.fill(checkoutData.valid.lastName);

  // Finish
  await checkout.continueCheckout();
  await expect(checkout.finishButton).toBeVisible();
});
