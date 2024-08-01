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
          Don't wait until it's too hard.
        </h2>
        <p ref={p1Ref} className={`${styles.p} ${styles.animated}`}>
          Whether it's your relationship, your academics, your career, or how
          your children are doing—when you put mental health care at the bottom
          of your priority list, it can leave you and your family in a position
          you never thought you'd have to face.
        </p>
        <p ref={p2Ref} className={`${styles.highlight} ${styles.animated}`}>
          Get the care you need to bring more ease to your life today.
        </p>
        <div className={styles.buttons}>
          <Button>Book an Appointment</Button>
          <ConsultationButton>Book a Free Consultation</ConsultationButton>
        </div>
      </div>
    </div>
  );
};

export default DontWaitSection;
