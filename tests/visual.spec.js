// Visual parity — full-page screenshots per route, per browser/device project.
// First run writes the baselines (the golden master). animations:'disabled' is
// set in playwright.config.js so we compare settled states.
// NOTE: image optimization in the Astro build will legitimately change some
// pixels — review and approve those diffs with `--update-snapshots`.
const { test, expect } = require("@playwright/test");

// The site reveals many sections via IntersectionObserver (opacity 0 → 1 on
// scroll-in). Scroll top→bottom to trigger every reveal, settle, return to top.
// (Inlined rather than imported — Playwright's transform hook trips over a
// relative require on Node 22.)
async function revealAndSettle(page) {
  // The interactive sections (Header, OurApproach, FaqSection, Specialization,
  // GetStarted) are React islands hydrated client:load; their reveal
  // IntersectionObservers attach only AFTER hydration. If we scroll before they
  // hydrate, the reveal never fires for that section → a non-deterministic
  // screenshot (esp. on the slower Mobile Safari project). So: wait for the
  // network to settle + a hydration buffer BEFORE triggering reveals.
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1500); // island hydration buffer
  // Scroll top→bottom in small overlapping steps so every section is observed.
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const step = Math.round(window.innerHeight * 0.6);
      const tick = () => {
        window.scrollTo(0, y);
        y += step;
        if (y < document.body.scrollHeight) {
          setTimeout(tick, 100);
        } else {
          window.scrollTo(0, document.body.scrollHeight);
          // settle long enough for the slowest staggered reveal (OurApproach
          // modal applies its class 500ms after intersect) to complete.
          setTimeout(resolve, 1000);
        }
      };
      tick();
    });
  });
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
}

for (const [name, path] of [
  ["home", "/"],
  ["services", "/services"],
]) {
  test(`${name} page — full-page visual`, async ({ page }) => {
    await page.goto(path);
    await revealAndSettle(page);
    await expect(page).toHaveScreenshot(`${name}.png`, { fullPage: true });
  });
}
