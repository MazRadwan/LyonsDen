import React from "react";
import styles from "./ConsultationButton.module.css";

const ConsultationButton = ({
  onClick,
  children,
  type = "button",
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.button} ${className}`}
    >
      {children}
    </button>
  );
};

export default ConsultationButton;
