import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/lyonsdenlogo2.png";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <img
            src={logo}
            alt="A Lyon's Den Therapy Logo"
            className={styles.logo}
          />
          <div className={styles.siteNameContainer}>
            <span className={styles.siteName}>A LYON'S DEN</span>
            <hr className={styles.separator} />
            <span className={styles.siteSubName}>THERAPY</span>
          </div>
        </div>

        <div className={styles.linksSection}>
          <div className={styles.linkColumn}>
            <h3 className={styles.linkHeader}>GET STARTED</h3>
            <a href="#" className={styles.link}>
              Book a Free Consultation
            </a>
            <a href="#" className={styles.link}>
              Book an appointment
            </a>

            <a href="#" className={styles.link}>
              (716) 998-7316
            </a>
            <a href="#" className={styles.link}>
              Contact Form
            </a>
          </div>

          <div className={styles.linkColumn}>
            <h3 className={styles.linkHeader}>QUICK LINKS</h3>
            <a href="#" className={styles.link}>
              About Adam
            </a>
            <a href="#" className={styles.link}>
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
        2024 A Lyon's Den Therapy. All Rights reserved
      </div>
    </footer>
  );
};

export default Footer;
