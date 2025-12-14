import { test, expect } from '@playwright/test';
import { normalUser } from "../data/loginUsers";
import { LoginPage } from "../pages/LoginPage";

test('test', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

//login
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(normalUser);
  await loginPage.assertLoginSuccess();

  await expect(page).toHaveURL(/inventory/);

  //Hamburger menu on inventory page
  await expect(page.getByRole('button', { name: 'Open Menu' })).toBeVisible();
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await expect(page.locator('[data-test="about-sidebar-link"]')).toContainText('About');
  await page.locator('[data-test="about-sidebar-link"]').click();

  //Redirect on new page
  await expect(page).toHaveURL(/saucelabs/);
});