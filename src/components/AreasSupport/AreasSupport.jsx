import React, { useEffect, useRef } from "react";
import styles from "./AreasSupport.module.css";
import icon from "../../assets/lyonsdenlogo.png";

const supportAreas = [
  {
    title: "ANXIETY",
    description:
      "Discover strategies to manage and reduce anxiety, finding relief from persistent worry and stress.",
  },
  {
    title: "DEPRESSION",
    description:
      "Explore ways to address feelings of sadness and hopelessness with supportive, effective techniques.",
  },
  {
    title: "THERAPY FOR TEENS",
    description:
      "Tailored therapy designed to support adolecents through the unique challenges of their teenage years.",
  },
  {
    title: "STRESS & LIFE TRANSITIONS",
    description:
      "Gain guidance for managing life's changes and stressors with practical, solution focused support.",
  },
  {
    title: "ADHD & NEURODIVERGENCE",
    description:
      "Receive specialized support for managing ADHD and other neurodivergent conditions, leveraging personal insights and strategies.",
  },
  {
    title: "TRAUMA, PTSD & C-PTSD",
    description:
      "Find healing from past traumatic experiences with compassionate, trauma-informed therapy.",
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
