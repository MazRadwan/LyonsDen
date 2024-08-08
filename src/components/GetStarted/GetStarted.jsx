import React from "react";
import styles from "./GetStarted.module.css";
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const GetStarted = ({ id }) => {
  return (
    <section id={id} className={styles.getStarted}>
      <div className={styles.leftSection}>
        <h2 className={styles.largeHeader}>How To Get Started</h2>
        <h3 className={styles.smallHeader}>A LYONS DEN THERAPY</h3>
        <p className={styles.description}>
          Get started with A Lyons Den Therapy! I offer free consultations to
          answer your questions and ensure we are a good fit. If you're ready to
          get started, you can also book an appointment using the buttons below,
          call us, or send us a message.
        </p>
        <div className={styles.buttonContainer}>
          <ConsultationButton>BOOK A FREE CONSULTATION</ConsultationButton>
          <Button>BOOK AN APPOINTMENT</Button>
        </div>
        <div className={styles.contactInfo}>
          <div className={styles.contactItem}>
            <FaPhone className={styles.icon} aria-hidden="true" />
            <div>
              <h4 className={styles.contactHeader}>CALL US</h4>
              <p>
                <a href="tel:+16465351262">(646) 535-1262</a>
              </p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <FaMapMarkerAlt className={styles.icon} aria-hidden="true" />
            <div>
              <h4 className={styles.contactHeader}>SERVICING</h4>
              <p>New York, New Jersey and Connecticut Area</p>
            </div>
          </div>
          <div className={styles.contactItem}>
            <FaEnvelope className={styles.icon} aria-hidden="true" />
            <div>
              <h4 className={styles.contactHeader}>EMAIL US</h4>
              <p>
                <a href="mailto:adam@alyonsdentherapy.com">
                  adam@alyonsdentherapy.com
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.divider} aria-hidden="true"></div>
        <p className={styles.footer}>
          ONLINE THERAPY SESSIONS ACROSS NEW YORK, NEW JERSEY AND CONNECTICUT
        </p>
      </div>
      <div className={styles.rightSection}>
        <h3 className={styles.formHeader}>Send us a Message</h3>
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="name" className={styles.srOnly}>
            Your Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            className={styles.input}
          />

          <label htmlFor="email" className={styles.srOnly}>
            Your Email Address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Your Email Address"
            className={styles.input}
          />

          <label htmlFor="phone" className={styles.srOnly}>
            Your Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            placeholder="Your Phone Number"
            className={styles.input}
          />

          <label htmlFor="inquiry" className={styles.srOnly}>
            Reason for Inquiry
          </label>
          <select id="inquiry" className={styles.select} defaultValue="">
            <option value="" disabled>
              What is the reason for your inquiry?
            </option>
            <option value="consultation">Free Consultation</option>
            <option value="appointment">Book an Appointment</option>
            <option value="general">General Inquiry</option>
          </select>

          <label htmlFor="message" className={styles.srOnly}>
            Your Message
          </label>
          <textarea
            id="message"
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
