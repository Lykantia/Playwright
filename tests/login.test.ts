import { test } from "../fixtures/loginFixture"; 
import { expect } from "@playwright/test";
import {
  normalUser,
  bannedUser,
  emptyUser,
  invalidUser,
} from "../data/loginUsers";

test.describe("Login tests", () => {
  test("Successful login", async ({ loginPage }) => {
    await loginPage.login(normalUser);
    await loginPage.assertLoginSuccess();
  });

  test("Banned user login", async ({ loginPage }) => {
    await loginPage.login(bannedUser);
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  test("Empty login fields", async ({ loginPage }) => {
    await loginPage.login(emptyUser);
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username is required"
    );
  });

  test("Invalid user login", async ({ loginPage }) => {
    await loginPage.login(invalidUser);
    await expect(loginPage.errorMessage).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });
});
