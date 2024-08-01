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
      title: "We learn about you",
      content:
        "Establishing a therapeutic relationship, we seek to deeply understand your history, experiences, and challenges. This understanding creates trust, empathy, and collaboration, which are essential for successful therapy.",
    },
    {
      title: "We formulate a plan",
      content:
        "Establishing a therapeutic relationship, we seek to deeply understand your history, experiences, and challenges. This understanding creates trust, empathy, and collaboration, which are essential for successful therapy.",
    },
    {
      title: "We guide you forward",
      content:
        "Establishing a therapeutic relationship, we seek to deeply understand your history, experiences, and challenges. This understanding creates trust, empathy, and collaboration, which are essential for successful therapy.",
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
        <h3 className={styles.modalTitle}>OUR APPROACH</h3>
        <h2 className={styles.modalHeader}>How Our Therapy Works</h2>
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
          <Button>BOOK AN APPOINTMENT</Button>
          <ConsultationButton>BOOK A FREE CONSULTATION</ConsultationButton>
        </div>
      </div>
    </section>
  );
};

export default OurApproach;
