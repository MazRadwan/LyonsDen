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

  const scrollToContact = (event) => {
    event.preventDefault();
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section}>
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.overlay}></div>
        <div ref={modalRef} className={`${styles.modal} ${styles.hidden}`}>
          <h2 className={styles.heading}>Looking for short-term support?</h2>
          <p className={styles.description}>
            I offer a six week program that might be just what you need. I can
            help you address immediate concerns and develop practical strategies
            moving forward. Whether you are dealing with a particular issue or
            seeking guidance through a short-term transition, this program
            provides targeted, effective suppport in a condensed timeframe.
          </p>
          <button className={styles.button} onClick={scrollToContact}>
            CONTACT US
          </button>
        </div>
      </div>
    </section>
  );
};

export default MinuteSession;
