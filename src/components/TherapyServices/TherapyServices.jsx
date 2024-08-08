import React from "react";
import styles from "./TherapyServices.module.css";

const TherapyServices = () => {
  return (
    <div className={styles.services}>
      <div className={styles.serviceItem}>VIRTUAL THERAPY SESSIONS</div>
      <div className={styles.divider}></div>
      <div className={styles.serviceItem}>
        FLEXIBLE HOURS FOR YOUR BUSY SCHEDULE
      </div>
      <div className={styles.divider}></div>
      <div className={styles.serviceItem}>
        SPECIALIZING IN ANXIETY, DEPRESSION & LIFE STRESSORS
      </div>
    </div>
  );
};

export default TherapyServices;
