import React, { useState } from "react";
import styles from "./GetStarted.module.css";
import {
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import Button from "../Button/Button";
import ConsultationButton from "../ConsultationButton/ConsultationButton";

const GetStarted = ({ id }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbykRg6K8fy3uTHqSqNvee5q03hn63NTFVjrKXKQ5JBMZ6MeccbleMoCVhsHe9MGVA6e/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify(formData),
        }
      );
      console.log(response); // Log the response for debugging
      setSubmitMessage("Message sent successfully!");
      setFormData({ name: "", email: "", phone: "", inquiry: "", message: "" });
    } catch (error) {
      setSubmitMessage("Failed to send message. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <section id={id} className={styles.getStarted}>
      <div className={styles.leftSection}>
        <h2 className={styles.largeHeader}>How To Get Started</h2>
        <h3 className={styles.smallHeader}>A LYONS DEN THERAPY</h3>
        <p className={styles.description}>
          If you're ready to get started, you can also book a consultation using
          the buttons below, call us, or send us a message. Current clients book
          an appointment using the button below.
        </p>
        <div className={styles.buttonContainer}>
          <ConsultationButton
            href="https://www.therapyportal.com/p/alyonsden/appointments/availability/"
            target="_blank"
            rel="noopener noreferrer"
          >
            BOOK A FREE CONSULTATION
          </ConsultationButton>
          <Button
            href="https://www.therapyportal.com/p/alyonsden/"
            target="_blank"
            rel="noopener noreferrer"
          >
            BOOK AN APPOINTMENT
          </Button>
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
              <p>New York and New Jersey — virtual and in-person</p>
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
        <div className={styles.socialLinks}>
          <a
            href="https://www.facebook.com/people/A-Lyons-Den-Therapy/61564147023316/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className={styles.socialIcon} />
          </a>
          <a
            href="https://www.instagram.com/alyonsdentmt/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className={styles.socialIcon} />
          </a>
          <a
            href="https://www.linkedin.com/company/alyonsdentherapy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className={styles.socialIcon} />
          </a>
        </div>
        <div className={styles.divider} aria-hidden="true"></div>
        <p className={styles.footer}>
          THERAPY & COACHING — VIRTUAL AND IN-PERSON — ACROSS NEW YORK AND NEW
          JERSEY
        </p>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.formCard}>
          <h3 className={styles.formHeader}>Send us a Message</h3>
          <p className={styles.formSubtext}>
            We usually respond within one business day.
          </p>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label htmlFor="name" className={styles.label}>
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className={styles.input}
                required
              />
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.field}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone" className={styles.label}>
                  Phone <span className={styles.optional}>(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 555-5555"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="inquiry" className={styles.label}>
                Reason for inquiry
              </label>
              <select
                id="inquiry"
                value={formData.inquiry}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="" disabled>
                  Select a reason…
                </option>
                <option value="consultation">Free Consultation</option>
                <option value="appointment">Book an Appointment</option>
                <option value="general">General Inquiry</option>
                <option value="corporate">Professional Services</option>
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="message" className={styles.label}>
                Message
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className={styles.textarea}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send Message"}
            </button>
          </form>
          {submitMessage && (
            <p className={styles.submitMessage} role="status">
              {submitMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
