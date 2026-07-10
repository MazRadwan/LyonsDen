import React, { useState, useRef, useEffect } from "react";
import styles from "./FaqSection.module.css";

const defaultFaqItems = [
  {
    question: "DO YOU ACCEPT MY HEALTH INSURANCE?",
    answer:
      "Yes, Adam accepts most major health insurance plans, including Aetna, Optum, United Health, Blue Cross Blue Shield, Northwell Direct, and many others. However, accepted insurance plans can vary state by state, so please inquire about your specific plan.",
  },
  {
    question: "WHAT ABOUT PRIVATE PAY OR USING OUT-OF-NETWORK BENEFITS?",
    answer:
      "Yes, private pay rates are comparable to other providers in this space and are discussed during your initial consultation. Statements of services can be provided to all clients wishing to submit out-of-network claims for reimbursement for plans not covered. A sliding scale rate can be offered based on your income for those who qualify. A Good Faith Estimate can be provided at the client's request.",
  },
  {
    question: "WHAT TYPE OF THERAPY DO YOU PRACTICE?",
    answer:
      "I practice person-centered integrative therapy that draws on Cognitive Behavioral Therapy, Dialectal Behavioral Therapy, Mindfulness, and Psychodynamic therapy. There is no one “correct” type of therapy. The therapeutic approach should be tailored to the individual client and their needs. I believe all therapy is about helping clients understand their challenges and learn how best to navigate them moving forward.",
  },
  {
    question: "WHAT IS THE DIFFERENCE BETWEEN THERAPY AND COACHING?",
    answer:
      "Therapy focuses on exploring past and present patterns and experiences to heal emotional pain, trauma, mental health challenges, and dysfunction. Coaching focuses on clients' understanding of current patterns and on learning the skills necessary to achieve future goals and develop healthier, more consistent patterns.",
  },
  {
    question: "WHAT CAN I EXPECT FROM WORKING WITH ADAM?",
    answer:
      "All clients will receive trauma-informed and affirming care, focusing on exploring and understanding the challenges they face while learning new skills to better cope with and navigate these experiences.",
  },
  {
    question: "HOW FREQUENTLY WILL WE MEET?",
    answer: [
      "All clients will have a free 15-minute initial consultation call to answer questions and determine if we might be a good fit.",
      "For mental health therapy, Adam meets with clients weekly for at least the first two months.",
      "For ADHD & Executive Functioning Coaching, Adam and the client determine the frequency of the meetings based on the identified goals.",
    ],
  },
];

const FaqSection = ({ items = defaultFaqItems, title = "Frequently Asked Questions" }) => {
  const [activeItem, setActiveItem] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const faqItems = items;

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
          {title}
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
                <div className={styles.faqAnswer}>
                  {Array.isArray(item.answer)
                    ? item.answer.map((para, i) => <p key={i}>{para}</p>)
                    : item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
