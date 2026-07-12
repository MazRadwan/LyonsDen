/**
 * smoothscroll.js — shared in-page smooth scrolling.
 *
 * Reproduces the CRA per-click `scrollIntoView({behavior:"smooth"})` behavior
 * (Footer #contact/#about links, MinuteSession "CONTACT US", and the Sprint-2
 * Header nav anchors) via ONE delegated click handler. Deliberately NOT a global
 * CSS `scroll-behavior: smooth` — that would also animate the harness's
 * `window.scrollTo(...)` calls and could perturb the sticky-header test.
 *
 * Targets:
 *   <a href="#id">            — in-page anchor links
 *   <element data-scroll-to="#id"> — non-anchor triggers (e.g. a styled <button>)
 */
(function () {
  "use strict";

  function targetFor(el) {
    var sel = el.getAttribute("data-scroll-to");
    if (!sel) {
      var href = el.getAttribute("href");
      sel = href && href.charAt(0) === "#" ? href : null;
    }
    if (!sel || sel === "#") return null;
    try {
      return refineTarget(document.querySelector(sel));
    } catch (e) {
      return null;
    }
  }

  // On phones the contact section's columns stack (info panel first, form a
  // full screen below) — a contact anchor should land on the FORM there. On
  // desktop the two sit side by side, so the section top is correct.
  function refineTarget(el) {
    if (!el) return el;
    if (window.matchMedia("(max-width: 768px)").matches) {
      var form = el.querySelector("[data-contact-form]");
      if (form) return form;
    }
    return el;
  }

  document.addEventListener("click", function (e) {
    if (!e.target || !e.target.closest) return;
    var el = e.target.closest("a[href^='#'], [data-scroll-to]");
    if (!el) return;
    // Match CRA: always preventDefault for in-page triggers, THEN no-op if the
    // target is missing on this page (e.g. Footer #contact/#about on /services,
    // where CRA's handler preventDefault'd then found no element and did nothing).
    e.preventDefault();
    var target = targetFor(el);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });

  // On load with a hash (e.g. arriving via a cross-page /#about link from the
  // services-page Header), smooth-scroll to the target — reproduces CRA's
  // ScrollToTop post-navigation smooth scroll (old src/App.js). Undo the browser's
  // native instant jump first so the scroll animates from the top, as CRA did.
  function scrollToHashOnLoad() {
    var hash = location.hash;
    if (!hash || hash === "#") return;
    var target;
    try {
      target = refineTarget(document.querySelector(hash));
    } catch (e) {
      return;
    }
    if (!target) return;
    window.scrollTo(0, 0);
    setTimeout(function () {
      target.scrollIntoView({ behavior: "smooth" });
    }, 0);
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scrollToHashOnLoad);
  } else {
    scrollToHashOnLoad();
  }
})();
