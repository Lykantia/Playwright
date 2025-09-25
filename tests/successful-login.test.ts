import { test } from '@playwright/test';
import { normalUser } from '../data/users';
import { LoginPage } from '../pages/LoginPage';

test('Successful login', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();
});
