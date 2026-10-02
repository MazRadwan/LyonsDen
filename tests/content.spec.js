// Content assertions — protect the CURRENT intended copy (post ADHD-pivot,
// July 2026). Originally a migration-parity spec; now guards the approved
// content state. Update alongside any approved copy change.
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
  // Therapy + coaching across NY/NJ/CT (CT re-added 10/2026, license current)
  await expect(
    page.getByText(/therapy & coaching — virtual and in-person — across new york, new jersey and connecticut/i)
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Mental Health Specialties/i })
  ).toBeVisible();
});

test("services page key copy is present", async ({ page }) => {
  await page.goto("/services");
  await expect(page.getByRole("heading", { name: /THERAPY SERVICES/i })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Areas Of Specialization/i })
  ).toBeVisible();
});

test("adhd-coaching page key copy is present", async ({ page }) => {
  await page.goto("/adhd-coaching");
  await expect(
    page.getByRole("heading", { level: 1, name: /ADHD & EXECUTIVE FUNCTION COACHING/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Understanding ADHD/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /^Individual Coaching$/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /Group Coaching & Workshops/i })
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: /FAQ About Coaching/i })
  ).toBeVisible();
});

// Per-page SEO titles — assert exactly so a regression to a generic title is caught.
test("home page has its per-page SEO title", async ({ page }) => {
  await page.goto("/");
  expect(await page.title()).toBe("A Lyons Den Therapy | Therapy & ADHD Coaching in NY, NJ & CT");
});

test("services page has its per-page SEO title", async ({ page }) => {
  await page.goto("/services");
  expect(await page.title()).toBe("Therapy Services | A Lyons Den Therapy");
});

test("adhd-coaching page has its per-page SEO title", async ({ page }) => {
  await page.goto("/adhd-coaching");
  expect(await page.title()).toBe("ADHD & Executive Function Coaching | A Lyons Den Therapy");
});

// Licensure accuracy (YMYL): Connecticut is back (client confirmed the CT
// license is current, 10/2026) — every page names all three states.
test("every page lists NY, NJ and CT service areas", async ({ page }) => {
  for (const path of ["/", "/services", "/adhd-coaching"]) {
    await page.goto(path);
    const body = (await page.locator("body").innerText()).toLowerCase();
    for (const state of ["new york", "new jersey", "connecticut"]) {
      expect(body).toContain(state);
    }
  }
});

// In-person offices are sublet: landmark descriptions only, never a street
// address (client request, 10/2026).
test("in-person offices are described without street addresses", async ({ page }) => {
  for (const path of ["/", "/services", "/adhd-coaching"]) {
    await page.goto(path);
    const body = await page.locator("body").innerText();
    expect(body).toMatch(/Scarsdale Metro-North station/);
    expect(body).toMatch(/181 St \(A\) subway station/);
    expect(body).toMatch(/Exact location is provided to clients/);
    expect(body).not.toMatch(/1 Chase Rd|851 W 181st|10583|10033/i);
  }
});
