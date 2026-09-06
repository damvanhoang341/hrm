import { test, expect } from '@playwright/test';
import { LoginPage } from '../../ui/pages/LoginPage';
import { DashboardPage } from '../../ui/pages/DashboardPage';

/**
 * Luồng: mở login → đăng nhập mock → vào dashboard.
 * Credentials theo Jarvis Sample SPA: admin@gmail.com / Admin@123
 */
test.describe('Hrm login → dashboard @ui @smoke', () => {
  test('mở login, đăng nhập admin, vào được dashboard @smoke', async ({
    page,
  }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.open();
    await expect(page.getByTestId('hrm-login')).toBeVisible();

    await login.submit('admin@gmail.com', 'Admin@123');

    await dashboard.expectLoaded();
    await expect(page.getByTestId('hrm-title')).toHaveText('HRM');
    await expect(page).not.toHaveURL(/\/login/);
    await expect(page.getByTestId('hrm-home')).toBeVisible();
  });
});
