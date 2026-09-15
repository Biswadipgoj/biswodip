import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 8000,
  },
  fullyParallel: false,
  retries: 0,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3000',
    screenshot: 'on',
    channel: 'msedge',
  },
  projects: [
    {
      name: 'Desktop Edge',
      use: {
        viewport: { width: 1440, height: 900 },
        channel: 'msedge',
      },
    },
    {
      name: 'Mobile Viewport',
      use: {
        viewport: { width: 390, height: 844 },
        channel: 'msedge',
      },
    },
  ],
});
