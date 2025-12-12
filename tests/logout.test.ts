import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

// I would say "Logout"
// "user should be logged out and redirected to login page"
// if this fail, nobody will know what the fuck is going on :D 
// You would see "test failed" due .... // Do you get my point? 
test("test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");

  //login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  //logout

  await page.getByRole("button", { name: "Open Menu" }).click();
  await expect(page.locator('[data-test="logout-sidebar-link"]')).toContainText(
    "Logout"
  );
  await page.locator('[data-test="logout-sidebar-link"]').click();
  // sometime you have locators in page object, but here you use that directly in the test
  await expect(page.locator('[data-test="login-button"]')).toContainText(
    "Login"
  );
});
