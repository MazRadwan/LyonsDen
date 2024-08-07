import React, { useState, useRef, useEffect } from "react";
import styles from "./FaqSection.module.css";

const FaqSection = () => {
  const [activeItem, setActiveItem] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const faqItems = [
    {
      question: "DO YOU ACCEPT MY HEALTH INSURANCE?",
      answer:
        "Yes, Adam accepts most major health insurance plans, including Aetna, Optum, United Health, Blue Cross Blue Shield, and many others. However, accepted insurance plans can vary state by state, so please inquire about your specific plan.",
    },
    {
      question: "WHAT ABOUT PRIVATE PAY OR USING OUT-OF-NETWORK BENEFITS?",
      answer:
        "Yes, private pay sessions are $175 per 45 min. session. Statements of services can be provided to all clients wishing to submit out-of-network claims for reimbursement for plans not covered.  A sliding scale rate can be offered based on your income for those who qualify. A Good Fit estimate can be provided at the client's request.",
    },
    {
      question: "WHAT TYPE OF THERAPY DO YOU PRACTICE?",
      answer:
        "I practice person-centered integrative therapy that draws on Cognitive Behavioral Therapy, Dialectal Behavioral Therapy, Mindfulness, and Psychodynamic therapy. There is no one “correct” type of therapy. The therapeutic approach should be tailored to the individual client and their needs. I believe all therapy is about helping clients understand their challenges and learn how best to navigate them moving forward.",
    },
    {
      question: "WHAT CHALLENGES DO YOU SPECIALIZE IN TREATING?",
      answer:
        " I specialize in treating adults and adolescents struggling with challenges related to anxiety, depression, trauma (and complex trauma), ADHD, and anyone who needs support navigating life's challenges.",
    },
    {
      question: "WHAT CAN I EXPECT FROM THERAPY?",
      answer:
        "All clients will receive trauma-informed and affirming care, focusing on exploring and understating the challenges they face while learning new skills to better cope with and navigate these experiences.",
    },
    {
      question: "HOW FREQUENT ARE THE THERAPY SESSIONS?",
      answer:
        "All clients will have a free 15-minute initial consultation call to answer questions and determine if we might be a good fit. After the consultation and completion of some history and enrollment forms, clients meet with Adam for an initial intake assessment to start focusing on the treatment. All clients meet for sessions at least once a week for the first two months. After two months, that may change to every other week, based on how things are going.",
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
