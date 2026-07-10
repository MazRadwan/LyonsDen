import React, { useState, useRef, useEffect } from "react";
import styles from "./Specialization.module.css";

const defaultSpecializations = [
    {
      title: "ANXIETY",
      content:
        "Anxiety is not always bad; it helps to keep us safe. However, it can become overwhelming when it is working on overdrive, and “keeping us safe” prevents us from living the life we want. I focus on using cognitive, physical, and behavioral awareness and change to be less overwhelmed by anxious feelings, understand what makes us anxious, and, where possible, retrain our brain to understand better what is safe and not safe. Mainly CBT, some DBT. Skills focus on managing anxious feelings and changing thought patterns of what is and is not safe.",
    },
    {
      title: "DEPRESSION",
      content:
        "Navigating feelings of sadness and hopelessness can be incredibly challenging and isolating. In therapy, I work with clients to explore the underlying causes of their depression and develop effective strategies to manage and alleviate these feelings. In the supportive and empathetic space of our sessions, I use evidence-based approaches like cognitive behavior therapy (CBT) and psychodynamic processing, and we focus on exploring and addressing negative thought patterns, understanding emotional triggers, and creating actionable plans for improving mood and overall well-being. Together we will collaborate on developing coping mechanisms, building resilience, and finding ways to reconnect with activities and relationships that bring joy and fulfillment. By addressing both the emotional and practical aspects of depression, we can work together to help clients navigate their path toward recovery and a more balanced life.",
    },
    {
      title: "NAVIGATING STRESSORS AND LIFE TRANSITIONS",
      content:
        "Sometimes, it is difficult to know how to navigate life stressors and feel confident in the decisions that we make. It can be difficult to see what options are and are not available to us, and sometimes we need an impartial sounding board. In therapy, I help clients explore the challenges they are facing. In some cases, I support the client in determining a course of action, and supporting them to implement their decision. In other cases, I support the client to better understand the challenge they are facing, and find value or meaning as they accept what is and is not in their control as they navigate their experience.",
    },
    {
      title: "THERAPY FOR TEENS",
      content:
        "The teen years can be challenging: figuring out who you are and want to be, balancing being dependent on others and wanting to be independent, navigating family, school, and peer pressures in the age of social media, FOMO, teen culture, and identity. My therapeutic approach for adolescents is tailored to address these unique complexities, providing a supportive space where they can openly explore their feelings and experiences. I work with adolescents to build resilience, enhance self-awareness, and develop coping strategies that foster personal growth and emotional stability. By working collaboratively, we can address challenges such as paper pressure, academic stress, identity development, and more while equipping them with tools to thrive both now and in the future.",
    },
    {
      title: "ADHD & NEURODIVERGENCE",
      content:
        "Many people struggling with ADHD and Neurodivergence (autism spectrum disorder, dyslexia, learning disorders, etc.) also struggle with other mental health challenges. People with ADHD and Neurodivergence can have a different way of processing information and expressing their experiences, which can lead to anxieties, low self-esteem, feeling othered, and difficulty navigating situations and relationships, as they try to navigate expectations based on the neuro-majority. ADHD and Neurodivergent informed therapy allows clients to better connect with the strengths they have because of their ADHD or Neurodivergence, while helping them better understand past experiences and build their confidence and coping abilities to live the life they choose.",
    },
    {
      title: "TRAUMA, PTSD & C-PTSD",
      content:
        "Whether someone has experienced one or many traumatic events, traumatic experiences impact how we see the world. Any time we perceive that our life/well-being, or the life/well-being of a loved one, is in jeopardy, can be a traumatic experience. With PTSD, our brain goes into overdrive to protect us from experiencing this event again. EX: jumping and tensing up when we hear car brakes squeaking after we were in a severe car accident. Complex PTSD is about experiencing many events that were either traumatic or made us question our well-being and having to develop purposeful patterns of being around others so that we do not have to depend on others to feel confident about our well-being. Trauma therapy uses both physical/sensory practices and cognitive/emotional practices to re-ground clients in the present to let the brain know they are no longer experiencing an event where their life/well-being is at risk. Once clients have more control over their initial symptoms, they are supported to process their trauma(s) in a supportive and empathetic manner, exploring and, when appropriate, reframing how their experiences have impacted their self and world views.",
    },
];

const Specialization = ({
  items = defaultSpecializations,
  title = "Areas Of Specialization",
}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const specializations = items;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          headerRef.current.classList.add(styles.animateHeader);
          menuRef.current.classList.add(styles.animateMenu);
        }
      },
      { threshold: 0.1 }
    );

    if (headerRef.current && menuRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current && menuRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  const toggleItem = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className={styles.specializationSection}>
      <div className={styles.container}>
        <h2 ref={headerRef} className={styles.header}>
          {title}
        </h2>
        <ul ref={menuRef} className={styles.specializationList}>
          {specializations.map((item, index) => (
            <li key={index} className={styles.specializationItem}>
              <button
                className={`${styles.specializationQuestion} ${
                  activeIndex === index ? styles.active : ""
                }`}
                onClick={() => toggleItem(index)}
              >
                {item.title}
                <span
                  className={activeIndex === index ? styles.minus : styles.plus}
                ></span>
              </button>
              {activeIndex === index && (
                <div className={styles.specializationAnswer}>
                  {item.content}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Specialization;
