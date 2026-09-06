import { test, expect } from '@playwright/test';

test.describe('Hrm API @api @smoke', () => {
  test('GET /api/ping @smoke', async ({ request }) => {
    const res = await request.get('/api/ping');
    expect(res.ok()).toBeTruthy();
    const body = await res.json();
    const status = body?.data?.status ?? body?.status;
    const product = body?.data?.product ?? body?.product;
    expect(status).toBe('ok');
    expect(product).toBe('Hrm');
  });

  test('GET /health/live @smoke', async ({ request }) => {
    const res = await request.get('/health/live');
    expect(res.ok()).toBeTruthy();
  });

  test('GET /swagger/index.html @smoke', async ({ request }) => {
    const res = await request.get('/swagger/index.html');
    expect(res.ok()).toBeTruthy();
    const text = await res.text();
    expect(text.toLowerCase()).toContain('swagger');
  });
});
