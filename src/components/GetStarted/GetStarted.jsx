import React from "react";
import styles from "./GetStarted.module.css";

import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const GetStarted = () => {
  return (
    <section className={styles.getStarted}>
      <div className={styles.leftSection}>
        <h3 className={styles.smallHeader}>A LYON'S DEN THERAPY</h3>
        <h2 className={styles.largeHeader}>How To Get Started</h2>
        <p className={styles.description}>
          Get started with A Lyon's Den Therapy! We offer free consultations to
          answer your questions and ensure we are a good fit. If you're ready to
          get started, you can also book an appointment using the buttons below,
          call us, or send us a message.
        </p>
        <div className={styles.buttonContainer}>
          <Button>BOOK AN APPOINTMENT</Button>
          <ConsultationButton>BOOK A FREE CONSULTATION</ConsultationButton>
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhone className={styles.icon} />
            <div>
              <h4 className={styles.contactHeader}>CALL US</h4>
              <p>(212) 555-1234</p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <h4 className={styles.contactHeader}>VISIT US</h4>
              <p>
                555 5th Ave, Suite 401
                <br />
                New York, NY 10029
              </p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} />
            <div>
              <h4 className={styles.contactHeader}>EMAIL US</h4>
              <p>info@alyonsden.com</p>
            </div>
          </div>
        </div>
        <div className={styles.divider}></div>
        <p className={styles.footer}>
          IN-PERSON AND ONLINE THERAPY SESSIONS ACROSS NEW YORK CITY
        </p>
      </div>
      <div className={styles.rightSection}>
        <h3 className={styles.formHeader}>Send us a Message</h3>
        <form className={styles.form}>
          <input type="text" placeholder="Your Name" className={styles.input} />
          <input
            type="email"
            placeholder="Your Email Address"
            className={styles.input}
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            className={styles.input}
          />
          <select className={styles.select}>
            <option value="" disabled selected>
              What is the reason for your inquiry?
            </option>
            <option value="consultation">Free Consultation</option>
            <option value="appointment">Book an Appointment</option>
            <option value="general">General Inquiry</option>
          </select>
          <textarea
            placeholder="How can we help you?"
            className={styles.textarea}
          ></textarea>
          <button type="submit" className={styles.submitButton}>
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

export default GetStarted;
