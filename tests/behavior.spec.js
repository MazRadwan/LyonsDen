// Behavioral parity — every interaction that must feel identical after the
// migration. These assert behavior, not pixels (visual is separate).
const { test, expect } = require("@playwright/test");

test.describe("Home page interactions", () => {
  test("smart-sticky header hides on scroll down, reveals on scroll up", async ({ page }) => {
    // Fonts load async (non-render-blocking) — wait for the swap to settle so the
    // reflow doesn't race the programmatic scroll-direction sequence below. The
    // header's hide/reveal behavior itself is unchanged; this only de-flakes timing.
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready.then(() => true));
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

  test('header "Book a Free Consultation" points to TherapyPortal availability', async ({ page }) => {
    await page.goto("/");
    const cta = page.getByRole("link", { name: /book a free consultation/i }).first();
    await expect(cta).toHaveAttribute(
      "href",
      "https://www.therapyportal.com/p/alyonsden/appointments/availability/"
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

test.describe("ADHD coaching page interactions", () => {
  // The accordions are React islands (client:load). On slower WebKit runs a
  // click can land on the SSR'd button BEFORE hydration attaches the handler —
  // the click silently does nothing. expect.poll(click-until-open) makes the
  // assertion hydration-proof without a fixed sleep.
  const clickUntilOpen = async (page, button, answer) => {
    await page.waitForLoadState("networkidle").catch(() => {});
    await button.scrollIntoViewIfNeeded();
    await expect
      .poll(
        async () => {
          if (await answer.isVisible()) return true;
          await button.click();
          return answer.isVisible();
        },
        { timeout: 8000 }
      )
      .toBe(true);
  };

  test("Coaching Services accordion opens", async ({ page }) => {
    await page.goto("/adhd-coaching");
    const q = page.getByRole("button", { name: /INDIVIDUAL SKILL DEVELOPMENT COACHING/i });
    const answer = page.getByText(/develop better habits, create systems/i);
    await clickUntilOpen(page, q, answer);
  });

  test("Coaching FAQ accordion opens", async ({ page }) => {
    await page.goto("/adhd-coaching");
    const q = page.getByRole("button", {
      name: /DOES MY HEALTH INSURANCE COVER ADHD & EXECUTIVE FUNCTION COACHING/i,
    });
    const answer = page.getByText(/major health insurances do not cover/i);
    await clickUntilOpen(page, q, answer);
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

// Asset integrity — guards against broken <img> srcs that a full-page screenshot
// can miss under maxDiffPixelRatio (e.g. an Astro/Vite ImageMetadata object passed
// straight to src renders url([object Object]) → 404 → naturalWidth 0). Also protects
// the Sprint 3 astro:assets image work. A loaded-but-zero-width image is broken.
test.describe("Asset integrity", () => {
  for (const [name, path] of [["home", "/"], ["services", "/services"], ["adhd-coaching", "/adhd-coaching"]]) {
    test(`no broken images on ${name} page`, async ({ page }) => {
      await page.goto(path);
      await page.evaluate(async () => {
        window.scrollTo(0, document.body.scrollHeight);
        await new Promise((r) => setTimeout(r, 600));
        window.scrollTo(0, 0);
      });
      await page.waitForLoadState("networkidle").catch(() => {});
      const broken = await page.evaluate(() =>
        Array.from(document.querySelectorAll("img"))
          .filter((i) => i.complete && i.naturalWidth === 0)
          .map((i) => i.getAttribute("src"))
      );
      expect(broken).toEqual([]);
    });
  }
});
