import React, { useEffect } from "react";
import styles from "./Hero.module.css";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";
import heroImage from "../../assets/lyonsdenhero1.png"; // Ensure this path is correct

const Hero = () => {
  useEffect(() => {
    const hero = document.querySelector(`.${styles.hero}`);
    hero.style.opacity = 1;
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.heroMask}></div>
      <div className={styles.heroContent}>
        <h1>Helping You Live Life To The Fullest</h1>
        <div className={styles.buttons}>
          <ConsultationButton
            href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.appointmentButton}
          >
            Book a Free Consultation
          </ConsultationButton>
          <Button
            href="https://calendar.app.google/jGxgSzFJxnU2spgP7 "
            target="_blank"
            rel="noopener noreferrer"
          >
            Book an Appointment
          </Button>
        </div>
      </div>
      <img src={heroImage} alt="Hero" className={styles.heroImage} />
    </div>
  );
};

export default Hero;
