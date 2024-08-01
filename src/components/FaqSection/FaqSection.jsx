import React, { useState, useRef, useEffect } from "react";
import styles from "./FaqSection.module.css";

const FaqSection = () => {
  const [activeItem, setActiveItem] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const faqItems = [
    {
      question: "DO YOU ACCEPT INSURANCE?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "HOW DO I KNOW IF THERAPY IS RIGHT FOR ME?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "WHAT ARE YOUR FEES?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "HOW OFTEN WILL I NEED TO ATTEND THERAPY?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      question: "HOW LONG WILL THERAPY LAST?",
      answer:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
    setActiveItem(activeItem === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.container}>
        <h2 ref={headerRef} className={styles.header}>
          Frequently Asked Questions
        </h2>
        <div ref={menuRef} className={styles.faqList}>
          {faqItems.map((item, index) => (
            <div key={index} className={styles.faqItem}>
              <button
                className={styles.faqQuestion}
                onClick={() => toggleItem(index)}
              >
                {item.question}
                <span
                  className={activeItem === index ? styles.minus : styles.plus}
                ></span>
              </button>
              {activeItem === index && (
                <div className={styles.faqAnswer}>{item.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
