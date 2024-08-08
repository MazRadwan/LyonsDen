import React, { useState } from "react";
import styles from "./Header.module.css";
import ConsultationButton from "../ConsultationButton/ConsultationButton";
import logo from "../../assets/lyonsdenlogo2.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = (
    <ul className={styles.navLinks}>
      <li>
        <a href="/about" className={styles.navLink}>
          About Adam
        </a>
      </li>
      <li>
        <a href="/services" className={styles.navLink}>
          Therapy Services
        </a>
      </li>
      <li>
        <a href="/contact" className={styles.navLink}>
          Contact
        </a>
      </li>
    </ul>
  );

  return (
    <nav className={styles.navBar}>
      <a href="/" className={styles.logoContainer}>
        <img src={logo} alt="A Lyons Den Therapy" className={styles.logo} />
        <div className={styles.siteNameContainer}>
          <span className={styles.siteName}>A LYON'S DEN</span>
          <hr className={styles.separator} />
          <span className={styles.siteSubName}>THERAPY</span>
        </div>
      </a>
      <div className={styles.desktopNav}>{navLinks}</div>
      <ConsultationButton className={styles.appointmentButton}>
        Book a Free Consultation
      </ConsultationButton>
      <div className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ""}`}>
        {navLinks}
        <ConsultationButton className={styles.appointmentButton}>
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
