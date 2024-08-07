import React, { useRef, useEffect } from "react";
import styles from "./BioSection.module.css";
import Button from "../Button/Button";
import bioImage from "../../assets/lyonsdenbio-pic1.jpg";

const BioSection = () => {
  const headerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headerRef.current.classList.add(styles.animate);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.textContent}>
          {/* <h3 className={styles.sectionTitle}></h3> */}
          <h2 ref={headerRef} className={styles.header}>
            MEET ADAM LYONS
          </h2>
          <h4 className={styles.subheader}>Adam Lyons, LCSW</h4>
          <p className={styles.paragraph}>
            With over a decade of experience in therapy, I bring a compassionate
            and dynamic approach to his practice. Experiences leading adventure,
            team building and social/emotional learning programs, seeing
            participants learn/grow, and step out of their comfort zone, is what
            pushed me to become a therapist.Witnessing firsthand the
            transformative power of stepping beyond comfort zones, I was
            inspired to pursue therapy as a means to help people facilitate
            personal growth and resilience.
            <br />
            <br />
            My practice is rooted in a familial tradition of service &
            supporting others. I believe therapy is a journey of discovery and
            adaptation. My clinical framework is shaped by the belief that we
            learn who we are through our experiences, and therapy serves as a
            pivotal tool for both learning and unlearning. Whether guiding
            clients through new challenges or helping them shed old patterns, I
            aim to foster a supportive environment where growth and
            self-discovery can thrive.
            <br />
            <br />
            Maybe you would like to hear a bit about my personal journey because
            it's deeply connected to the work I do with young people. Growing up
            with ADHD and dyslexia, I faced daily challenges that shaped my
            understanding of what it's like to struggle with these conditions.
            Navigating school, work, and life with these differences wasn't
            always easy, but it taught me a lot about resilience and finding
            strategies that work.These experiences have been incredibly
            motivating for me.
            <br />
            <br />
            They’ve given me a unique perspective and a deep empathy for others.
            We all have struggles we deal with that may or not always be
            apparent to the outside world. I know firsthand how frustrating and
            isolating it can feel, and that’s why I’m so passionate about
            helping others who face these struggles.
          </p>

          {/* <Button className={styles.button}>BOOK AN APPOINTMENT</Button> */}
        </div>
        <div className={styles.imageContainer}>
          <img src={bioImage} alt="Adam Lyons" className={styles.bioImage} />
          <div className={styles.imageCaption}>
            <p>Adam Lyons , Certified Therapist</p>
            <p>Founder, A Lyon's Den Therapy</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BioSection;
