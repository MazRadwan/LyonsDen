import React, { useRef, useEffect } from "react";
import styles from "./MinuteSession.module.css";
import heroImage from "../../assets/lyonsdenhero2a.jpeg";

const MinuteSession = () => {
  const modalRef = useRef(null);

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

    if (modalRef.current) {
      observer.observe(modalRef.current);
    }

    return () => {
      if (modalRef.current) {
        observer.unobserve(modalRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section}>
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.overlay}></div>
        <div ref={modalRef} className={`${styles.modal} ${styles.hidden}`}>
          <h2 className={styles.heading}>
            Looking for a single 50-minute session?
          </h2>
          <p className={styles.description}>
            When you're seeking support or a fresh perspective, we offer a
            qualified listening ear to help you move forward with a difficult
            decision or specific challenge.
          </p>
          <button className={styles.button}>CONTACT US</button>
        </div>
      </div>
    </section>
  );
};

export default MinuteSession;
