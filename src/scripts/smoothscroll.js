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
      return document.querySelector(sel);
    } catch (e) {
      return null;
    }
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
})();
