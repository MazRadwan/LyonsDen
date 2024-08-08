import React, { useState, useRef, useEffect } from "react";
import styles from "./OurApproach.module.css";
import heroImage from "../../assets/lyonsdenhero4.jpeg"; // Make sure to add this image
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const OurApproach = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current.classList.add(styles.animateHero);
          setTimeout(() => {
            modalRef.current.classList.add(styles.animateModal);
          }, 2000); // Delay modal animation by 2 seconds
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

  const menuItems = [
    {
      title: "Your initial 15-minute consultation",
      content:
        "All potential clients have a free consultation. This is your opportunity to share what you are struggling with and your goals for treatment, and ask any questions you need to determine if Adam is a good fit for you.",
    },
    {
      title: "Beginning your therapy journey",
      content:
        "After some initial paperwork, the first appointment is a 60-minute assessment. It focuses on developing a comprehensive assessment and clarifying your goals for treatment. From there, you and Adam will meet together 45 minutes a week for at least two months. ",
    },
    {
      title: "Reaching your goals",
      content:
        "You can expect your treatment to last as long as you have goals you want to work on. For some, treatment can be several months, for others, treatment may last longer. Good Mental Health is a journey that takes lifelong attention, with treatment starting and pausing many times over the years.",
    },
  ];

  return (
    <section ref={sectionRef} className={styles.section}>
      <div
        className={styles.heroImage}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles.overlay}></div>
      </div>
      <div ref={modalRef} className={styles.modal}>
        <h3 className={styles.modalTitle}>MY APPROACH</h3>
        <h2 className={styles.modalHeader}>What You Can Expect</h2>
        <div className={styles.foldingMenu}>
          {menuItems.map((item, index) => (
            <div key={index} className={styles.menuItem}>
              <button
                className={styles.menuButton}
                onClick={() => toggleMenu(index)}
              >
                {item.title}
                <span
                  className={
                    activeMenu === index ? styles.arrowUp : styles.arrowDown
                  }
                ></span>
              </button>
              {activeMenu === index && (
                <p className={styles.menuContent}>{item.content}</p>
              )}
            </div>
          ))}
        </div>
        <div className={styles.buttonContainer}>
          <a
            href="https://calendar.app.google/A3EpoEFdFNr8KvNE8"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <ConsultationButton>BOOK A FREE CONSULTATION</ConsultationButton>
          </a>
          <a
            href="https://calendar.app.google/jGxgSzFJxnU2spgP7"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none" }}
          >
            <Button>BOOK AN APPOINTMENT</Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
