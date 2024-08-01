import React, { useRef, useEffect } from "react";
import styles from "./BioSection.module.css";
import Button from "../Button/Button";
import bioImage from "../../assets/lyonsdenbio-pic.jpeg";

const BioSection = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headerRef.current.classList.add(styles.animate);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          <h3 className={styles.sectionTitle}>WHY US</h3>
          <h2 ref={headerRef} className={styles.header}>
            A Lyon's Den Therapy
          </h2>
          <h4 className={styles.subheader}>
            YOU ARE THE EXPERT OF YOUR LIFE, AND IT IS OUR GOAL TO HELP YOU
            REALIZE YOUR FULL POTENTIAL.
          </h4>
          <p className={styles.paragraph}>
            At A Lyon's Den, our goal is to guide you towards a deeper
            understanding of yourself, equip you with the tools you need to
            navigate life's challenges, and ultimately find joy in the present
            moment. Having grown up in a wealthy household, I understand
            firsthand the delicate balance between assimilation and honouring
            our rich heritage. While navigating these cultural nuances, I've
            witnessed the profound impact mental health stigma can have on a
            person and a family. This journey has inspired my mission to create
            a safe, compassionate space where individuals can truly feel seen,
            heard, and understood. As the founder of A Lyon's Den my commitment
            is to provide a safe haven for those who aspire to achieve their
            dreams and live fulfilling lives.
          </p>
          <p className={styles.clientMessage}>
            OUR CLIENTS AREN'T JUST PATIENTS; THEY'RE VALUED INDIVIDUALS ON A
            TRANSFORMATIVE PATH TOWARD PERSONAL GROWTH & WELL-BEING.
          </p>
          <Button className={styles.button}>BOOK AN APPOINTMENT</Button>
        </div>
        <div className={styles.imageContainer}>
          <img src={bioImage} alt="Adam Lyons" className={styles.bioImage} />
          <div className={styles.imageCaption}>
            <p>Adam Lyons , Certified Therapist</p>
            <p>Founder, A Lyon's Den Therapy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
