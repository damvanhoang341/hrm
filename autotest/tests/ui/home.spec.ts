import { test, expect } from '@playwright/test';

test.describe('Hrm UI @ui @smoke', () => {
  test('login then home shows title and ping @smoke', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('hrm-login')).toBeVisible();

    await page.locator('#login-email').fill('admin@gmail.com');
    await page.locator('#login-password').fill('Admin@123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();

    await expect(page.getByTestId('hrm-title')).toHaveText('HRM');
    await expect(page.getByTestId('hrm-home')).toBeVisible();
    await expect(page.getByTestId('hrm-ping')).toHaveAttribute('data-ok', 'true', {
      timeout: 15_000,
    });
  });

  test('hrm module routes stay in admin shell after login', async ({ page }) => {
    await page.goto('/');
    await page.locator('#login-email').fill('admin@gmail.com');
    await page.locator('#login-password').fill('Admin@123');
    await page.getByRole('button', { name: 'Đăng nhập' }).click();
    await expect(page.getByTestId('hrm-home')).toBeVisible();

    await page.goto('/employees');
    await expect(page.getByRole('heading', { name: 'Nhân viên' })).toBeVisible();

    await page.goto('/departments');
    await expect(page.getByRole('heading', { name: 'Phòng ban' })).toBeVisible();

    await page.goto('/roles');
    await expect(page).not.toHaveURL(/\/login/);

    await page.goto('/settings');
    await expect(page).not.toHaveURL(/\/login/);
  });
});
