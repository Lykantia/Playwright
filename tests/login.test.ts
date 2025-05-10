import { test, expect } from '@playwright/test';
import { normalUser, bannedUser } from '../data/users';

test('Successful login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com');
  await page.locator ('[data-test="username"]').click();
  await page.locator ('[data-test="username"]').fill(normalUser.username);
  await page.locator ('[data-test="password"]').click();
  await page.locator ('[data-test="password"]').fill(normalUser.password);
  await page.locator ('[data-test="login-button"]').click();
  await expect(page.getByText('Swag Labs')).toBeVisible();
});

