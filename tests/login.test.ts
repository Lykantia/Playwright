import { test, expect } from '@playwright/test';
import { normalUser, bannedUser } from '../data/users';
import { LoginPage } from '../pages/LoginPage';

test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();
});

test('Banned user login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(bannedUser);
  await loginPage.assertLoginSuccess();

  await expect(loginPage.errorMessage).toHaveText(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

