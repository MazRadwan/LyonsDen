import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/lyonsdenlogo2.png";

const Footer = () => {
  const scrollToSection = (id) => (e) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="A Lyons Den Therapy Logo"
            className={styles.logo}
          />
          <div className={styles.siteNameContainer}>
            <span className={styles.siteName}>A LYONS DEN</span>
            <hr className={styles.separator} />
            <span className={styles.siteSubName}>THERAPY</span>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h3 className={styles.linkHeader}>GET STARTED</h3>
            <a
              href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Book a Free Consultation
            </a>
            <a
              href="https://calendar.app.google/jGxgSzFJxnU2spgP7"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              Book an appointment
            </a>
            <a href="tel:+16465351262" className={styles.link}>
              (646) 535-1262
            </a>
            <a
              href="#contact"
              onClick={scrollToSection("contact")}
              className={styles.link}
            >
              Contact Form
            </a>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.linkHeader}>QUICK LINKS</h3>
            <a
              href="#about"
              onClick={scrollToSection("about")}
              className={styles.link}
            >
              About Adam
            </a>
            <a href="/services" className={styles.link}>
              Therapy Services
            </a>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.linkHeader}>SERVICING</h3>
            <p className={styles.address}>
              New York, New Jersey
              <br />
              and Connecticut Area
            </p>
          </div>
        </div>
      </div>
      <div className={styles.copyright}>
        2024 A Lyons Den Therapy. All Rights reserved
      </div>
    </footer>
  );
};

export default Footer;
