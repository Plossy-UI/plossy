// Testy Plossy uruchamiane na zbudowanej dokumentacji (docs/dist) — `npm test`.
import { defineConfig } from '@playwright/test';

const PORT = 4391;

export default defineConfig({
  testDir: 'tests',
  outputDir: 'tests/.wyniki',
  snapshotPathTemplate: 'tests/zrzuty/{arg}{ext}',
  fullyParallel: true,
  timeout: 45_000,
  retries: 0,
  reporter: [['list'], ['html', { outputFolder: 'tests/.raport', open: 'never' }]],
  use: {
    baseURL: `http://localhost:${PORT}`,
    // Systemowy Chrome — bez pobierania osobnej przeglądarki. W CI: `npx playwright install chromium` i usuń `channel`.
    channel: process.env.PW_CHANNEL === 'none' ? undefined : 'chrome',
    reducedMotion: 'no-preference',
    locale: 'pl-PL',
    timezoneId: 'Europe/Warsaw',
  },
  expect: {
    toHaveScreenshot: { animations: 'disabled', caret: 'hide', maxDiffPixelRatio: 0.01 },
  },
  webServer: {
    command: `npx astro preview --root docs --port ${PORT}`,
    url: `http://localhost:${PORT}/`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
