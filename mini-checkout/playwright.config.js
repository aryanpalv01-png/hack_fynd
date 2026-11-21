import { defineConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;
const includeWebKit = process.env.INCLUDE_WEBKIT === 'true' || process.env.ALL_BROWSERS === 'true';

/**
 * Senior Developer Production-Grade Multi-Browser Configuration
 * -------------------------------------------------------------
 * Automated Cross-Browser Testing Matrix:
 *  1. Desktop Chrome (Chromium) — Primary desktop engine
 *  2. Desktop Firefox (Gecko) — Standards compliance
 *  3. Mobile Chrome (Pixel 5) — Mobile viewport & touch gestures
 *  4. Desktop Safari (WebKit) — Enabled via ALL_BROWSERS=true or CI
 *  5. Mobile Safari (iPhone 13) — Enabled via ALL_BROWSERS=true or CI
 */
const projects = [
  /* Primary Desktop Engines */
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },

  /* Mobile Responsive Viewport */
  {
    name: 'mobile-chrome',
    use: { ...devices['Pixel 5'] },
  },
];

/* WebKit / Safari Suite (requires host OS libavif package or CI runner) */
if (includeWebKit) {
  projects.push(
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 13'] },
    }
  );
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 2 : 4,
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects,
  webServer: {
    command: 'npm run dev',
    port: 5173,
    reuseExistingServer: true,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
