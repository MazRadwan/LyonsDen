import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import ConsultationButton from "../ConsultationButton/ConsultationButton";
import logo from "../../assets/lyonsdenlogo2.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
        {location.pathname === "/" ? (
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
          <Link to="/#about" className={styles.navLink}>
            About Adam
          </Link>
        )}
      </li>
      <li>
        <Link to="/services" className={styles.navLink}>
          Therapy Services
        </Link>
      </li>
      <li>
        {location.pathname === "/" ? (
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
        ) : location.pathname === "/services" ? (
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
          <Link to="/#contact" className={styles.navLink}>
            Contact
          </Link>
        )}
      </li>
    </ul>
  );

  return (
    <nav className={styles.navBar}>
      <Link to="/" className={styles.logoContainer}>
        <img src={logo} alt="A Lyons Den Therapy" className={styles.logo} />
        <div className={styles.siteNameContainer}>
          <span className={styles.siteName}>A LYONS DEN</span>
          <hr className={styles.separator} />
          <span className={styles.siteSubName}>THERAPY</span>
        </div>
      </Link>
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
