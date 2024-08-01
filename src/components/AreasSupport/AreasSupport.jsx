import React, { useEffect, useRef } from "react";
import styles from "./AreasSupport.module.css";
import icon from "../../assets/lyonsdenlogo.png";

const supportAreas = [
  {
    title: "INTERGENERATIONAL CONFLICT",
    description:
      "Solutions to help you navigate cultures with conflicting values without losing yourself.",
  },
  {
    title: "ANXIETY & PANIC",
    description:
      "Learn effective coping strategies to ease worry or panic, helping you regain control and find peace.",
  },
  {
    title: "DEPRESSION & LOW MOOD",
    description:
      "Compassionate support to help you break the cycle of sadness and hopelessness & rediscover your joy.",
  },
  {
    title: "TRAUMA & PTSD",
    description:
      "Process and heal the physiological & emotional symptoms from traumatic experiences.",
  },
  {
    title: "RELATIONSHIP & INTERPERSONAL CHALLENGES",
    description:
      "Improve communication patterns, resolve conflict, rebuild trust, and foster deeper connections.",
  },
  {
    title: "STRESS & OVERWHELM",
    description:
      "Identify sources of stress & burnout, learning skills to restore balance and vitality to your life.",
  },
];

const AreasSupport = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const boxRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headingRef.current.classList.add(styles.animateHeading);
          subtextRef.current.classList.add(styles.animateSubtext);
          boxRefs.current.forEach((box, index) => {
            setTimeout(() => {
              box.classList.add(styles.animateBox);
            }, index * 100); // Stagger the box animations
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.sectionWrapper}>
      <section ref={sectionRef} className={styles.section}>
        <h1 ref={headingRef} className={styles.heading}>
          Areas of Support
        </h1>
        <p ref={subtextRef} className={styles.subtext}>
          Our team of psychologists and psychotherapists are trained to gently
          guide you through the process of healing your relationship with
          yourself and others.
        </p>
        <div className={styles.grid}>
          {supportAreas.map((area, index) => (
            <div
              key={index}
              ref={(el) => (boxRefs.current[index] = el)}
              className={styles.box}
            >
              <img src={icon} alt="Support icon" className={styles.icon} />
              <h2 className={styles.boxTitle}>{area.title}</h2>
              <p className={styles.boxDescription}>{area.description}</p>
              <button className={styles.button}>Learn More</button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AreasSupport;
