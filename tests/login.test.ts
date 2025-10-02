import { test, expect } from "@playwright/test";
import {
  normalUser,
  bannedUser,
  emptyUser,
  invalidUser,
} from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test("Successful login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();
});

test("Banned user login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(bannedUser);
  await loginPage.assertLoginSuccess();

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("Empty login fileds", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(emptyUser);
  await loginPage.assertLoginSuccess();

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Username is required"
  );
});

test("Invalid user login", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(invalidUser);
  await loginPage.assertLoginSuccess();

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Username and password do not match any user in this service"
  );
});
