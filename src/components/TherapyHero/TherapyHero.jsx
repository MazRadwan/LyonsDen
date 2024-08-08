import React, { useEffect, useRef } from "react";
import styles from "./TherapyHero.module.css";
import heroImage from "../../assets/lyonsdenhero6.png";

const TherapyHero = () => {
  const heroRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);

  return (
    <div ref={heroRef} className={`${styles.hero} ${styles.hidden}`}>
      <img
        src={heroImage}
        alt="Therapy Services Hero"
        className={styles.heroImage}
      />
      <div className={styles.heroMask}></div>
      <div className={styles.heroContent}>
        <h1>THERAPY SERVICES</h1>
        <p>
          Compassionate therapy to help you live in the present moment, <br />
          free from the weight of the past or worries about the future.
        </p>
      </div>
    </div>
  );
};

export default TherapyHero;
