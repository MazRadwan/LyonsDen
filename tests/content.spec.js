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

// Per-page SEO titles (added in the SEO sprint). These are the real, shipped
// titles — assert them exactly so a future regression to a generic title is caught.
test("home page has its per-page SEO title", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("A Lyons Den Therapy | Online Therapy in NY, NJ & CT");
});

test("services page has its per-page SEO title", async ({ page }) => {
  await page.goto("/services");
  expect(await page.title()).toBe("Therapy Services | A Lyons Den Therapy");
});
