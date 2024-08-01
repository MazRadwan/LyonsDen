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
          <h1 className={styles.header}>A LYON'S DEN THERAPY</h1>
          <p className={styles.subtext}>
            Connect with your authentic self and rediscover the joy of living!
          </p>
          <div className={styles.buttonContainer}>
            <Button>BOOK AN APPOINTMENT</Button>
            <ConsultationButton>BOOK A FREE CONSULTATION</ConsultationButton>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomHero;
