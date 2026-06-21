// Content parity — the copy must NOT change during the migration.
// (Meta/title WILL change intentionally with the SEO work — those are asserted
// loosely here and updated on purpose when we add per-page meta.)
const { test, expect } = require("@playwright/test");

test("home page key copy is present", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Helping You Live Life To The Fullest/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Frequently Asked Questions/i })
  ).toBeVisible();
  await expect(page.getByText(/How To Get Started/i)).toBeVisible();
  await expect(
    page.getByText(/online therapy sessions across new york, new jersey and connecticut/i)
  ).toBeVisible();
});

test("services page key copy is present", async ({ page }) => {
  await page.goto("/services");
  await expect(page.getByRole("heading", { name: /THERAPY SERVICES/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Areas Of Specialization/i })
  ).toBeVisible();
});

// Baseline of the CURRENT (pre-SEO) head. Expected to change ON PURPOSE when we
// add per-page titles/meta — update these asserts at that point.
test("current title baseline (pre-SEO)", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("Lyons Den");
});
