import React from "react";
import styles from "./Button.module.css";

const Button = ({
  onClick,
  children,
  type = "button",
  className = "",
  href,
  target,
  rel,
}) => {
  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        className={`${styles.button} ${className}`}
      >
        {children}
      </a>
    );
  }

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

export default Button;
