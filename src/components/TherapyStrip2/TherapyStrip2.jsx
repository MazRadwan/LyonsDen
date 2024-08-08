import React from "react";
import styles from "./TherapyStrip2.module.css";

const TherapyStrip2 = () => {
  return (
    <div className={styles.strip}>
      <div className={styles.stripItem}>VIRTUAL THERAPY SESSIONS</div>
      <div className={styles.divider}></div>
      <div className={styles.stripItem}>
        FLEXIBLE HOURS FOR YOUR BUSY SCHEDULE
      </div>
      <div className={styles.divider}></div>
      <div className={styles.stripItem}>
        SPECIALIZING IN ANXIETY, DEPRESSION & LIFE STRESSORS
      </div>
    </div>
  );
};

export default TherapyStrip2;
