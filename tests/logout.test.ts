import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

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
  await expect(page.locator('[data-test="login-button"]')).toContainText(
    "Login"
  );
});
