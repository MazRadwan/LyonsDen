import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const Header = ({ currentPath, logoSrc }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const offsetRef = useRef(0);
  const ticking = useRef(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smart sticky header — DYNAMIC tracking (iOS-Safari-toolbar style):
  // the header slides out/in pixel-for-pixel with the scroll delta rather
  // than snapping after a direction change. When scrolling stops mid-way it
  // settles (animated) to fully shown or fully hidden, whichever is nearer.
  // rAF-throttled; transform is applied directly to the DOM node so there is
  // no React re-render per frame (state only flips for the hidden marker).
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    // Reduced motion: the slide still tracks scroll 1:1 (direct manipulation,
    // not autonomous animation) — only the decorative settle tween is dropped.
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const SHOW_AT_TOP = 80; // always fully show within this distance from the top
    let settleTimer;
    lastScrollY.current = window.scrollY;

    // Menu just opened (effect re-runs on isMenuOpen): snap fully visible
    if (isMenuOpen && offsetRef.current > 0) {
      offsetRef.current = 0;
      nav.style.transition = reducedMotion
        ? "none"
        : "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)";
      nav.style.transform = "translateY(0px)";
      setIsHidden(false);
    }

    const apply = (animated) => {
      nav.style.transition =
        animated && !reducedMotion
          ? "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
          : "none";
      nav.style.transform = `translateY(${-offsetRef.current}px)`;
      setIsHidden(offsetRef.current >= nav.offsetHeight - 1);
    };

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastScrollY.current;
      lastScrollY.current = y;

      if (y < SHOW_AT_TOP || isMenuOpen) {
        // Near the top, or the mobile menu is open: keep the header visible
        offsetRef.current = 0;
        apply(true);
      } else {
        // Track the scroll 1:1, clamped between fully shown and fully hidden
        const h = nav.offsetHeight;
        offsetRef.current = Math.min(Math.max(offsetRef.current + delta, 0), h);
        apply(false);
        // When scrolling pauses mid-way, settle to the nearest edge
        clearTimeout(settleTimer);
        settleTimer = setTimeout(() => {
          offsetRef.current = offsetRef.current > h / 2 ? h : 0;
          apply(true);
        }, 150);
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(settleTimer);
    };
  }, [isMenuOpen]);

  // Integrated scroll function. On phones the contact section stacks (info
  // panel above the form), so a contact anchor retargets to the form card;
  // on desktop the columns sit side by side and the section top is correct.
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (!element) return;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const target =
      (isMobile && element.querySelector("[data-contact-form]")) || element;
    target.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = (
    <ul className={styles.navLinks}>
      <li>
        {currentPath === "/" ? (
          <a
            href="#about"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("about");
            }}
          >
            About Adam
          </a>
        ) : (
          <a href="/#about" className={styles.navLink}>
            About Adam
          </a>
        )}
      </li>
      <li>
        <a
          href="/services"
          className={styles.navLink}
          aria-current={currentPath === "/services" ? "page" : undefined}
        >
          Therapy Services
        </a>
      </li>
      <li>
        <a
          href="/adhd-coaching"
          className={styles.navLink}
          aria-current={currentPath === "/adhd-coaching" ? "page" : undefined}
        >
          ADHD Coaching
        </a>
      </li>
      <li>
        <a
          href="https://alyonsdentherapy.blogspot.com/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          Blog
        </a>
      </li>
      <li>
        <a
          href="https://www.therapyportal.com/p/alyonsden/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.navLink}
        >
          Client Portal
        </a>
      </li>
      <li>
        {currentPath === "/" ? (
          <a
            href="#contact"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
          >
            Contact
          </a>
        ) : currentPath === "/services" ? (
          <a
            href="#contact-therapy"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact-therapy");
            }}
          >
            Contact
          </a>
        ) : currentPath === "/adhd-coaching" ? (
          <a
            href="#contact-coaching"
            className={styles.navLink}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("contact-coaching");
            }}
          >
            Contact
          </a>
        ) : (
          <a href="/#contact" className={styles.navLink}>
            Contact
          </a>
        )}
      </li>
    </ul>
  );

  return (
    <>
      {/* Scrim behind the open mobile menu — sibling of nav (fixed positioning
          inside the transformed nav would resolve against the nav, not the
          viewport). Tap to close. */}
      <div
        className={`${styles.scrim} ${isMenuOpen ? styles.scrimVisible : ""}`}
        onClick={() => setIsMenuOpen(false)}
        aria-hidden="true"
      />
    <nav ref={navRef} className={`${styles.navBar} ${isHidden ? styles.navBarHidden : ""}`}>
      <a href="/" className={styles.logoContainer}>
        <img src={logoSrc} alt="A Lyons Den Therapy" className={styles.logo} />
        <div className={styles.siteNameContainer}>
          <span className={styles.siteName}>A LYONS DEN</span>
          <hr className={styles.separator} />
          <span className={styles.siteSubName}>THERAPY</span>
        </div>
      </a>
      <div className={styles.desktopNav}>{navLinks}</div>
      <ConsultationButton
        href="https://www.therapyportal.com/p/alyonsden/appointments/availability/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.appointmentButton}
      >
        Book a Free Consultation
      </ConsultationButton>
      <div
        className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`}
        onClick={(e) => {
          // Any link tapped in the menu (nav rows or the CTA) dismisses it —
          // the card slides back up behind the bar via the existing closed-
          // state transition. Same-page hash links especially need this, as
          // they scroll without a page load.
          if (e.target.closest("a")) setIsMenuOpen(false);
        }}
      >
        {navLinks}
        <ConsultationButton
          href="https://www.therapyportal.com/p/alyonsden/appointments/availability/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.appointmentButton}
        >
          Book a Free Consultation
        </ConsultationButton>
      </div>
      <div
        className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ""}`}
        onClick={toggleMenu}
        role="button"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
    </>
  );
};

export default Header;
