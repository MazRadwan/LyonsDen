import React, { useState, useRef, useEffect } from "react";
import styles from "./Specialization.module.css";

const Specialization = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const specializations = [
    {
      title: "ANXIETY",
      content: "Placeholder text for anxiety specialization.",
    },
    {
      title: "DEPRESSION",
      content: "Placeholder text for depression specialization.",
    },
    {
      title: "NAVIGATING STRESSORS AND LIFE TRANSITIONS",
      content:
        "Placeholder text for navigating stressors and life transitions.",
    },
    {
      title: "THERAPY FOR TEENS",
      content: "Placeholder text for therapy for teens.",
    },
    {
      title: "LIVING WITH ADHD AND NEURODIVERGENCE",
      content: "Placeholder text for living with ADHD and neurodivergence.",
    },
    {
      title: "TRAUMA PTSD & C-PTSD",
      content: "Placeholder text for trauma PTSD & C-PTSD.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headerRef.current.classList.add(styles.animateHeader);
          menuRef.current.classList.add(styles.animateMenu);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current && menuRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current && menuRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.specializationSection}>
      <div className={styles.container}>
        <h2 ref={headerRef} className={styles.header}>
          Areas Of Specialization
        </h2>
        <ul ref={menuRef} className={styles.specializationList}>
          {specializations.map((item, index) => (
            <li key={index} className={styles.specializationItem}>
              <button
                className={`${styles.specializationQuestion} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => toggleItem(index)}
              >
                {item.title}
                <span
                  className={activeIndex === index ? styles.minus : styles.plus}
                ></span>
              </button>
              {activeIndex === index && (
                <div className={styles.specializationAnswer}>
                  {item.content}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Specialization;
