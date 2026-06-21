// Golden-master regression harness for the CRA → Astro migration.
// Same tests run against the CURRENT live site (baseline) and, later, the Astro
// preview — set BASE_URL to point them. Default targets production.
//   Capture/refresh baselines:  npx playwright test --update-snapshots
//   Run the gate:               npx playwright test
//   Against a local build:      BASE_URL=http://localhost:3000 npx playwright test
const { defineConfig, devices } = require("@playwright/test");

const BASE_URL = process.env.BASE_URL || "https://alyonsdentherapy.com";

module.exports = defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },
  // Visual diffs: freeze animations so we compare the settled state, and allow a
  // tiny diff ratio for font/AA noise. Behavior (the animations themselves) is
  // covered by behavior.spec.js, not by screenshots.
  expect: {
    toHaveScreenshot: {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    },
  },
  projects: [
    { name: "Desktop Chrome", use: { ...devices["Desktop Chrome"] } },
    { name: "Desktop Safari", use: { ...devices["Desktop Safari"] } }, // WebKit — the original-bug browser
    { name: "Mobile Safari", use: { ...devices["iPhone 13"] } },
  ],
});
