import { test, expect } from "@playwright/test";
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test("Homepage Visual test", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");

  //login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  await page.goto("https://www.saucedemo.com/inventory.html", {
    waitUntil: "networkidle",
  });

  await expect(page).toHaveScreenshot({ maxDiffPixels: 100 });
});
