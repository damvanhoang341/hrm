import { defineConfig, devices } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const root = __dirname;
const envFile = path.join(root, '.env');
if (fs.existsSync(envFile)) {
  for (const line of fs.readFileSync(envFile, 'utf8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

const apiURL = process.env.API_URL ?? 'http://127.0.0.1:5167';
const webURL = process.env.WEB_URL ?? 'http://127.0.0.1:5173';

export default defineConfig({
  testDir: path.join(root, 'tests'),
  fullyParallel: false,
  workers: 1,
  timeout: 60_000,
  reporter: [['list']],
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'api',
      testMatch: /tests[\\/]api[\\/].*\.spec\.ts/,
      use: { baseURL: apiURL, ...devices['Desktop Chrome'] },
    },
    {
      name: 'ui',
      testMatch: /tests[\\/]ui[\\/].*\.spec\.ts/,
      use: { baseURL: webURL, ...devices['Desktop Chrome'] },
    },
  ],
});
