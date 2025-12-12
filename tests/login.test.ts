import { test } from "../fixtures/loginFixture"; 
import { expect } from "@playwright/test";
import {
  normalUser,
  bannedUser,
  emptyUser,
  invalidUser,
} from "../data/loginUsers";

test.describe("Login tests", () => {
  // I would say "should be login successful with valid credentials"
  test("Successful login", async ({ loginPage }) => {
    await loginPage.login(normalUser);
    await loginPage.assertLoginSuccess();
  });

  // I would say "should fail and display error message for banned user"
  // Also - Should you check, if you are still on the login page, not the "successful login" page?
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
