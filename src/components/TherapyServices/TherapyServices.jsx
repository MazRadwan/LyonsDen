import React from "react";
import styles from "./TherapyServices.module.css";

const TherapyServices = () => {
  return (
    <div className={styles.services}>
      <div className={styles.serviceItem}>
        IN-PERSON & VIRTUAL THERAPY SESSIONS
      </div>
      <div className={styles.divider}></div>
      <div className={styles.serviceItem}>
        DAYTIME, EVENING, & WEEKEND AVAILABILITY
      </div>
      <div className={styles.divider}></div>
      <div className={styles.serviceItem}>
        SPECIALIZED THERAPY FOR TRANSGENDER INDIVIDUALS
      </div>
    </div>
  );
};

export default TherapyServices;
