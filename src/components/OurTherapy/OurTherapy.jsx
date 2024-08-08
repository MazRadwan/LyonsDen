import React from "react";
import TherapyCard from "./TherapyCard/TherapyCard";
import styles from "./OurTherapy.module.css";

// Import images
import image1 from "../../assets/lyonsdencard1a.png";
import image2 from "../../assets/lyonsdencard2a.png";
import image3 from "../../assets/lyonsdencard3a.png";

const therapyData = [
  {
    title: "THERAPY FOR TEENS",
    description: "Learn More",
    image: image3,
  },
  {
    title: "THERAPY FOR ADULTS",
    description: "Learn More",
    image: image2,
  },
  {
    title: "CLINICAL & ORGANIZATIONAL CONSULTING",
    description: "Learn More",
    image: image1,
  },
];

const OurTherapy = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Services</h2>
        <p className={styles.description}>
          Welcome to A. Lyons Den Therapy, where Adam Lyons provides dedicated
          virtual therapy services for teens and adults. With a compassionate
          and professional approach, Adam offers personalized support and
          guidance to help you navigate life's challenges and achieve meaningful
          growth.
        </p>
        <div className={styles.cardsContainer}>
          {therapyData.map((therapy, index) => (
            <TherapyCard
              key={index}
              title={therapy.title}
              description={therapy.description}
              image={therapy.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurTherapy;
