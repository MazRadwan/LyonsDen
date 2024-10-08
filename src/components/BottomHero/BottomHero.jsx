import React, { useRef, useEffect } from "react";
import styles from "./BottomHero.module.css";
import heroImage from "../../assets/lyonsdenhero5.jpeg";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const BottomHero = () => {
  const contentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          contentRef.current.classList.add(styles.animate);
        }
      },
      { threshold: 0.1 }
    );

    if (contentRef.current) {
      observer.observe(contentRef.current);
    }

    return () => {
      if (contentRef.current) {
        observer.unobserve(contentRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.bottomHero}>
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.overlay}></div>
        <div ref={contentRef} className={styles.content}>
          <h1 className={styles.header}>A LYONS DEN THERAPY</h1>
          <p className={styles.subtext}>
            Make today the day you choose to invest in your well-being.
          </p>
          <div className={styles.buttonContainer}>
            <a
              href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <ConsultationButton>BOOK A FREE CONSULTATION</ConsultationButton>
            </a>
            <a
              href="https://calendar.app.google/jGxgSzFJxnU2spgP7"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none" }}
            >
              <Button>BOOK AN APPOINTMENT</Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomHero;
