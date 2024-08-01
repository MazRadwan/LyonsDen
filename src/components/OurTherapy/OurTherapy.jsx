import React from "react";
import TherapyCard from "./TherapyCard/TherapyCard";
import styles from "./OurTherapy.module.css";

// Import images
import image1 from "../../assets/lyonsdencard1.jpeg";
import image2 from "../../assets/lyonsdencard2.jpeg";
import image3 from "../../assets/lyonsdencard3.jpeg";

const therapyData = [
  {
    title: "INDIVIDUAL THERAPY",
    description: "Learn More",
    image: image1,
  },
  {
    title: "FAMILY THERAPY",
    description: "Learn More",
    image: image2,
  },
  {
    title: "TEEN THERAPY",
    description: "Learn More",
    image: image3,
  },
];

const OurTherapy = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Our Therapy Services</h2>
        <p className={styles.description}>
          Offering therapy for children, teens, adults, couples, and transgender
          individuals in New York City to provide compassionate support and
          guidance to help you navigate life's challenges.
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
