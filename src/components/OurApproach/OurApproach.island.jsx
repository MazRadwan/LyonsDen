import React, { useState, useRef, useEffect } from "react";
import styles from "./OurApproach.module.css";
import heroImage from "../../assets/lyonsdenhero4.jpeg";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

// heroSrc is a prop seam for Sprint 3 (story-1.3.6): the .astro parent will
// pass an optimized URL/srcset once astro:assets processes lyonsdenhero4.jpeg.
// When absent the imported local asset is used so today's pixels are unchanged.
const OurApproach = ({ heroSrc }) => {
  // Coerce to a URL string: a Vite/Astro image import is an ImageMetadata object
  // ({src,width,...}), so `url(${obj})` emits url([object Object]) and the bg photo
  // never renders. Sprint 3's heroSrc prop will already be a string; the default
  // import needs `.src`.
  const _img = heroSrc || heroImage;
  const bg = typeof _img === "string" ? _img : _img.src; // prop seam for Sprint 3

  const [activeMenu, setActiveMenu] = useState(null);
  const sectionRef = useRef(null);
  const modalRef = useRef(null);

  const toggleMenu = (index) => {
    setActiveMenu(activeMenu === index ? null : index);
  };

  useEffect(() => {
    let modalTimer;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          sectionRef.current.classList.add(styles.animateHero);
          // Small stagger so the modal follows the hero scale-in rather than
          // snapping in at the same instant. Cancellable on unmount below.
          modalTimer = setTimeout(() => {
            modalRef.current?.classList.add(styles.animateModal);
          }, 500);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      clearTimeout(modalTimer);
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
        style={{ backgroundImage: `url(${bg})` }}
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
