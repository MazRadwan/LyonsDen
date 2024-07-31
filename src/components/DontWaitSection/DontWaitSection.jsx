import React, { useEffect } from "react";
import styles from "./DontWaitSection.module.css";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";
import lionLogo from "../../assets/lyonsdenlogo.png";
import { observeElements } from "../../scrollAnimations";

const DontWaitSection = () => {
  useEffect(() => {
    observeElements([`.${styles.h2}`, `.${styles.p}`, `.${styles.highlight}`]);
  }, []);

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <img src={lionLogo} alt="Logo" className={styles.logo} />
        <h2 className={`${styles.h2} ${styles.hidden}`}>
          Don't wait until it's too hard.
        </h2>
        <p className={`${styles.p} ${styles.hidden}`}>
          Whether it's your relationship, your academics, your career, or how
          your children are doing—when you put mental health care at the bottom
          of your priority list, it can leave you and your family in a position
          you never thought you'd have to face.
        </p>
        <p className={`${styles.highlight} ${styles.hidden}`}>
          Get the care you need to bring more ease to your life today.
        </p>
        <div className={styles.buttons}>
          <Button>Book an Appointment</Button>
          <ConsultationButton>Book a Free Consultation</ConsultationButton>
        </div>
      </div>
    </div>
  );
};

export default DontWaitSection;
