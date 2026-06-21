// Behavioral parity — every interaction that must feel identical after the
// migration. These assert behavior, not pixels (visual is separate).
const { test, expect } = require("@playwright/test");

test.describe("Home page interactions", () => {
  test("smart-sticky header hides on scroll down, reveals on scroll up", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav").first();
    const isHidden = () => nav.evaluate((n) => /navBarHidden/.test(n.className));

    await expect.poll(isHidden).toBe(false); // visible at top

    // two downward jumps establish scroll direction past the 80px threshold
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.evaluate(() => window.scrollTo(0, 2600));
    await expect.poll(isHidden, { timeout: 3000 }).toBe(true); // hidden on scroll down

    await page.evaluate(() => window.scrollTo(0, 1200));
    await expect.poll(isHidden, { timeout: 3000 }).toBe(false); // revealed on scroll up
  });

  test('"What You Can Expect" modal fades in when scrolled into view', async ({ page }) => {
    await page.goto("/");
    const heading = page.getByRole("heading", { name: "What You Can Expect" });
    await heading.scrollIntoViewIfNeeded();
    const modalOpacity = () =>
      heading.evaluate((h) => {
        const modal = h.closest('[class*="modal"]') || h.parentElement;
        return parseFloat(getComputedStyle(modal).opacity);
      });
    await expect.poll(modalOpacity, { timeout: 4000 }).toBeGreaterThan(0.9);
  });

  test("FAQ accordion opens and closes", async ({ page }) => {
    await page.goto("/");
    const q = page.getByRole("button", { name: /DO YOU ACCEPT MY HEALTH INSURANCE/i });
    await q.scrollIntoViewIfNeeded();
    const answer = page.getByText(/including Aetna, Optum, United Health/i);

    await q.click();
    await expect(answer).toBeVisible();
    await q.click();
    await expect(answer).toHaveCount(0); // answer is unmounted when collapsed
  });

  test('header "Book a Free Consultation" points to the booking calendar', async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /book a free consultation/i }).first();
    await expect(cta).toHaveAttribute(
      "href",
      "https://calendar.app.google/A3EpoEFdFNr8KvNE8"
    );
  });

  test("contact form submits to the Apps Script endpoint", async ({ page }) => {
    // Intercept so the test never hits Adam's real sheet.
    let postBody = null;
    await page.route("**script.google.com/**", async (route) => {
      postBody = route.request().postData();
      await route.fulfill({ status: 200, body: "" });
    });

    await page.goto("/");
    await page.locator("#name").fill("Parity Test");
    await page.locator("#email").fill("parity@example.com");
    await page.locator("#phone").fill("5550001111");
    await page.locator("#inquiry").selectOption("consultation");
    await page.locator("#message").fill("Automated parity test — please ignore.");
    await page.getByRole("button", { name: /send message/i }).click();

    await expect(page.getByText("Message sent successfully!")).toBeVisible();
    expect(postBody).toContain("Parity Test");
  });
});

test.describe("Services page interactions", () => {
  test("Areas Of Specialization accordion opens", async ({ page }) => {
    await page.goto("/services");
    const q = page.getByRole("button", { name: /^ANXIETY/ });
    await q.scrollIntoViewIfNeeded();
    await q.click();
    await expect(page.getByText(/Anxiety is not always bad/i)).toBeVisible();
  });
});

test.describe("Mobile-only", () => {
  test("hamburger opens the mobile menu", async ({ page }, testInfo) => {
    test.skip(
      !testInfo.project.name.toLowerCase().includes("mobile"),
      "mobile viewport only"
    );
    await page.goto("/");
    await page.locator('[class*="hamburger"]').click();
    await expect(page.locator('[class*="mobileNav"]')).toHaveClass(/open/);
  });
});
