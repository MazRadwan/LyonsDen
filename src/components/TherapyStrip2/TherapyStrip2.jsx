import React from "react";
import styles from "./TherapyStrip2.module.css";

const TherapyStrip2 = () => {
  return (
    <div className={styles.strip}>
      <div className={styles.stripItem}>
        EXPLORE SELF-DISCOVERY AND PERSONAL GROWTH
      </div>
      <div className={styles.divider}></div>
      <div className={styles.stripItem}>
        GET TOOLS TO MANAGE ANXIETY AND STRESS
      </div>
      <div className={styles.divider}></div>
      <div className={styles.stripItem}>
        LEARN TO GROW AND MAINTAIN HEALTHY RELATIONSHIPS
      </div>
    </div>
  );
};

export default TherapyStrip2;
