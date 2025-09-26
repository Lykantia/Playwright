import { Page, expect } from "@playwright/test";
import { User } from "../data/users";

export class LoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.saucedemo.com");
  }

  async login(user: User) {
    await this.page.locator('[data-test="username"]').fill(user.username);
    await this.page.locator('[data-test="password"]').fill(user.password);
    await this.page.locator('[data-test="login-button"]').click();
  }

  async assertLoginSuccess() {
    await expect(this.page.getByText("Swag Labs")).toBeVisible();
  }

get errorMessage() {
  return this.page.locator('[data-test="error"]');
}


}