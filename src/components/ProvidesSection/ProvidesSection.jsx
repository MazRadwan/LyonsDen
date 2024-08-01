import React, { useRef, useEffect } from "react";
import styles from "./ProvidesSection.module.css";

const ProvidesSection = () => {
  const boxRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.fadeIn);
          }
        });
      },
      { threshold: 0.1 }
    );

    boxRefs.current.forEach((box) => {
      if (box) observer.observe(box);
    });

    return () => {
      boxRefs.current.forEach((box) => {
        if (box) observer.unobserve(box);
      });
    };
  }, []);

  const boxes = [
    {
      title: "COMPASSIONATE",
      content:
        "Compassion forms the cornerstone of our practice, allowing clients to explore their vulnerabilities openly, build deeper emotional connections, and fostering healing in a supportive environment.",
    },
    {
      title: "JUDGEMENT-FREE",
      content:
        "A nonjudgmental approach creates a space where clients feel accepted and understood, facilitating honest self-exploration without fear of criticism in order to work towards positive change.",
    },
    {
      title: "RESPECTFUL",
      content:
        "Respect is essential in our practice. It acknowledges the uniqueness of each individual's experience and history, creating an environment that encourages meaningful transformation & growth.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.header}>
          A Lyon's Den provides therapy that is:
        </h2>
        <div className={styles.boxesContainer}>
          {boxes.map((box, index) => (
            <div
              key={index}
              ref={(el) => (boxRefs.current[index] = el)}
              className={styles.box}
            >
              <h3 className={styles.boxTitle}>{box.title}</h3>
              <p className={styles.boxContent}>{box.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProvidesSection;
