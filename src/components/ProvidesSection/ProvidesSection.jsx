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
      title: "PERSON-CENTERED",
      content:
        " I tailor each therapy session to fit your unique needs, recognizing that your personal experiences shape who you are. This means that my approach is always customized to align with your specific challenges, strengths, and goals. By deeply understanding your personal journey, I ensure that our work together is relevant and effective.",
    },
    {
      title: "GROWTH-FOCUSED",
      content:
        "I believe that therapy is a powerful tool for personal development and transformation. By exploring and understanding your experiences, we uncover opportunities for growth and learning. Together, we’ll focus on developing new skills and perspectives that empower you to navigate lifes challenges with greater confidence and resilience.",
    },
    {
      title: "JUDGEMENT-FREE",
      content:
        "Creating a judgment-free space is essential to fostering trust and openness in therapy. I am committed to providing a supportive environment where you can express yourself freely without fear of criticism. This means approaching each session with empathy and understanding, ensuring that you feel safe to explore your thoughts and feelings.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.header}>A Lyons Den provides therapy that is:</h2>
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
