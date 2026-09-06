import type { Page } from '@playwright/test';

/** Page object theo pattern Jarvis Sample LoginPage. */
export class LoginPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('/login');
    await this.page.getByTestId('hrm-login').waitFor({ state: 'visible' });
  }

  async submit(email: string, password: string): Promise<void> {
    await this.page.locator('#login-email').fill(email);
    await this.page.locator('#login-password').fill(password);
    await this.page.getByRole('button', { name: 'Đăng nhập' }).click();
  }
}
