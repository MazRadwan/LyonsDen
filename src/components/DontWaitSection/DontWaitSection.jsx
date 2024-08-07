import React, { useEffect, useRef } from "react";
import styles from "./DontWaitSection.module.css";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";
import lionLogo from "../../assets/lyonsdenlogo.png";

const DontWaitSection = () => {
  const h2Ref = useRef(null);
  const p1Ref = useRef(null);
  const p2Ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Delay the addition of the visible class
            setTimeout(() => {
              entry.target.classList.add(styles.visible);
            }, 300); // 300ms delay, adjust as needed
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5, // Increase threshold to trigger later
        rootMargin: "-50px", // Negative margin to trigger slightly after entering viewport
      }
    );

    [h2Ref, p1Ref, p2Ref].forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      [h2Ref, p1Ref, p2Ref].forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <img src={lionLogo} alt="Logo" className={styles.logo} />
        <h2 ref={h2Ref} className={`${styles.h2} ${styles.animated}`}>
          Don't wait to get the help you need.
        </h2>
        <p ref={p1Ref} className={`${styles.p} ${styles.animated}`}>
          Who we are is shaped by our experiences, environment, and biology.
          Sometimes, what once kept us safe and content no longer serves us, and
          it's time to find a new way.
        </p>
        <p ref={p2Ref} className={`${styles.highlight} ${styles.animated}`}>
          Set forth on a journey of self-discovery and empowerment.
        </p>
        <div className={styles.buttons}>
          <ConsultationButton>Book a Free Consultation</ConsultationButton>
          <Button>Book an Appointment</Button>
        </div>
      </div>
    </div>
  );
};

export default DontWaitSection;
