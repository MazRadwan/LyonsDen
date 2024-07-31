import React from "react";
import styles from "./Header.module.css";
import Button from "../Button/Button";
import logo from "../../assets/lyonsdenlogo.png"; // Ensure this path is correct

const Header = () => {
  return (
    <nav className={styles.navBar}>
      <a href="/" className={styles.logoContainer}>
        <img src={logo} alt="A Lyon's Den Therapy" className={styles.logo} />
        <div className={styles.siteNameContainer}>
          <span className={styles.siteName}>A LYON'S DEN</span>
          <hr className={styles.separator} />
          <span className={styles.siteSubName}>THERAPY</span>
        </div>
      </a>
      <ul className={styles.navLinks}>
        <li>
          <a href="/about" className={styles.navLink}>
            About
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
      <Button className={styles.appointmentButton}>Book an Appointment</Button>
    </nav>
  );
};

export default Header;
