import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import ConsultationButton from "../ConsultationButton/ConsultationButton";
import logo from "../../assets/lyonsdenlogo2.png";

const Header = ({ currentPath }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Smart sticky header: hide on scroll down, reveal on scroll up.
  // rAF-throttled and ref-based so we only re-render when visibility flips.
  useEffect(() => {
    const SHOW_AT_TOP = 80; // always show within this distance from the top
    const DELTA = 6; // ignore sub-pixel scroll jitter

    const update = () => {
      const currentY = window.scrollY;

      if (currentY < SHOW_AT_TOP || isMenuOpen) {
        // Near the top, or the mobile menu is open: keep the header visible
        setIsHidden(false);
      } else if (Math.abs(currentY - lastScrollY.current) > DELTA) {
        // Hide when scrolling down, reveal when scrolling up
        setIsHidden(currentY > lastScrollY.current);
      }

      lastScrollY.current = currentY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMenuOpen]);

  // Integrated scroll function
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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
        <a href="/services" className={styles.navLink}>
          Therapy Services
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
        ) : (
          <a href="/#contact" className={styles.navLink}>
            Contact
          </a>
        )}
      </li>
    </ul>
  );

  return (
    <nav className={`${styles.navBar} ${isHidden ? styles.navBarHidden : ""}`}>
      <a href="/" className={styles.logoContainer}>
        <img src={logo.src ?? logo} alt="A Lyons Den Therapy" className={styles.logo} />
        <div className={styles.siteNameContainer}>
          <span className={styles.siteName}>A LYONS DEN</span>
          <hr className={styles.separator} />
          <span className={styles.siteSubName}>THERAPY</span>
        </div>
      </a>
      <div className={styles.desktopNav}>{navLinks}</div>
      <ConsultationButton
        href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.appointmentButton}
      >
        Book a Free Consultation
      </ConsultationButton>
      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`}>
        {navLinks}
        <ConsultationButton
          href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.appointmentButton}
        >
          Book a Free Consultation
        </ConsultationButton>
      </div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};

export default Header;
