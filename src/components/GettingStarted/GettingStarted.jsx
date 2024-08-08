import React, { useRef, useEffect } from "react";
import styles from "./GettingStarted.module.css";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const GettingStarted = () => {
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
    <section className={styles.section}>
      <div className={styles.lineWrapper}>
        <div className={styles.lineContainer}>
          <div className={styles.line}></div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.headerContainer}>
            <h2 className={styles.heading}>
              Getting started
              <br />
              is simple!
            </h2>
          </div>
          <div ref={contentRef} className={styles.animatedContent}>
            <p className={styles.text}>
              Book online or contact us. Offering online and in-person therapy
              in New York City and surrounding areas.
            </p>
            <div className={styles.buttonContainer}>
              <ConsultationButton
                href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK A FREE CONSULTATION
              </ConsultationButton>
              <Button
                href="https://calendar.app.google/jGxgSzFJxnU2spgP7"
                target="_blank"
                rel="noopener noreferrer"
              >
                BOOK AN APPOINTMENT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GettingStarted;
