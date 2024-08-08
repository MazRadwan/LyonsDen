import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./TherapyCard.module.css";

const TherapyCard = ({ title, description, image }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div ref={cardRef} className={`${styles.card} ${styles.hidden}`}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{title}</h3>
        <Link to="/services" className={styles.button}>
          {description}
        </Link>
      </div>
    </div>
  );
};

export default TherapyCard;
