/**
 * reveal.js — shared scroll-reveal for static .astro components.
 *
 * Replaces the per-component IntersectionObservers for reveal-only sections.
 * React island components (OurApproach, FaqSection, Specialization) keep their
 * own observers inside the island — this script is ONLY for static .astro components.
 *
 * Usage: author markup with data attributes on the element to reveal:
 *   data-reveal              — required; marks element for observation
 *   data-reveal-class        — CSS class name to add when intersecting (required)
 *   data-reveal-threshold    — IntersectionObserver threshold (default "0.1")
 *   data-reveal-margin       — IntersectionObserver rootMargin (default "0px")
 *   data-reveal-delay        — ms delay before adding the class (default "0")
 *   data-reveal-once         — attribute presence flag; if present, unobserve after reveal
 *                              (default: unobserve always — all reveals are one-shot)
 *
 * Per-element stagger contract (AreasSupport 100ms stagger):
 *   Each box carries its own data-reveal-delay="0", "100", "200", etc.
 *   No group bookkeeping needed in this script.
 *
 * DontWaitSection parameters:
 *   data-reveal-threshold="0.5" data-reveal-margin="-50px" data-reveal-delay="300"
 *
 * Hero special case:
 *   Hero.astro uses a static base style (opacity:1); it does NOT use data-reveal.
 *
 * Sprint 2 islands (OurApproach stagger 500ms, FaqSection, Specialization):
 *   Keep their own observers. NOT handled here.
 */
(function () {
  "use strict";

  function applyReveal(el) {
    var cls = el.dataset.revealClass;
    var delay = parseInt(el.dataset.revealDelay || "0", 10);
    if (!cls) return;
    if (delay > 0) {
      setTimeout(function () {
        el.classList.add(cls);
      }, delay);
    } else {
      el.classList.add(cls);
    }
  }

  var els = document.querySelectorAll("[data-reveal]");

  els.forEach(function (el) {
    var threshold = parseFloat(el.dataset.revealThreshold || "0.1");
    var rootMargin = el.dataset.revealMargin || "0px";

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            applyReveal(entry.target);
            // Always unobserve after first trigger (one-shot reveal)
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: threshold, rootMargin: rootMargin }
    );

    obs.observe(el);
  });
})();
