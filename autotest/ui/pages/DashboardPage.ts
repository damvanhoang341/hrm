import type { Page } from '@playwright/test';

/** Dashboard / home sau login (AdminLayout index). */
export class DashboardPage {
  constructor(private readonly page: Page) {}

  async expectLoaded(): Promise<void> {
    await this.page.waitForURL((url) => !url.pathname.includes('/login'));
    await this.page.getByTestId('hrm-home').waitFor({ state: 'visible' });
    await this.page.getByTestId('hrm-title').waitFor({ state: 'visible' });
  }
}
