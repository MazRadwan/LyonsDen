import React from "react";
import styles from "./DenServices.module.css";

const DenServices = () => {
  return (
    <section className={styles.denServices}>
      <div className={styles.content}>
        <h2 className={styles.title}>A Lyons Den Services</h2>
        <p className={styles.description}>
          Adam Lyons provides dedicated virtual therapy services for teens and
          adults. With a compassionate and professional approach, Adam offers
          personalized support and guidance to help you navigate life's
          challenges and achieve meaningful growth.
        </p>
      </div>
    </section>
  );
};

export default DenServices;
