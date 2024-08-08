import React, { useState, useRef, useEffect } from "react";
import styles from "./Specialization.module.css";

const Specialization = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  const specializations = [
    {
      title: "ANXIETY",
      content:
        "Anxiety is not always bad, it helps to keep us safe. However, it can become overwhelming when it is working on overdrive, and “keeping us  safe” prevents us from living the life we want to live. Adam focuses on using cognitive, physical and behavioral awareness and change to be less overwhelmed by anxious feelings, understand what is making us anxious, and, where possible retrain our brain to better understand what is safe and not safe. Mostly CBT, some DBT. Skills focus on managing the anxious feelings and changing thought patters of what is and is not safe. Learning and understanding triggers.",
    },
    {
      title: "DEPRESSION",
      content:
        "Navigating feelings of sadness and hopelessness can be incredibly challenging and isolating. In therapy, I work with clients to explore the underlying causes of their depression and develop effective strategies to manage and alleviate these feelings. Using evidence-based approaches like cognitive behavior therapy (CBT) and psychodynamic processing, we focus on identifying and addressing negative thought patterns, understanding emotional triggers, and creating actionable plans for improving mood and overall well-being.Through our sessions, my goal is to provide a supportive and empathetic space where clients can openly discuss their experiences and work towards regaining a sense of hope and purpose. We’ll collaborate on developing coping mechanisms, building resilience, and finding ways to reconnect with activities and relationships that bring joy and fulfillment. By addressing both the emotional and practical aspects of depression, we can work together to help clients navigate their path towards recovery and a more balanced life.",
    },
    {
      title: "NAVIGATING STRESSORS AND LIFE TRANSITIONS",
      content:
        "Sometimes it is learning how to navigate and manage life stressors, other times it is making decisions. Can be difficult to figure out, see the options available and not available. Help to figure out personal goals and needs with someone who is completely impartial, and can help explore all angles. Focus on the stressor and its impact.",
    },
    {
      title: "THERAPY FOR TEENS",
      content:
        "The teen years can be tough; figuring out who you are and want to be, balancing being dependent on others and wanting to be independent, navigating family, school and peer pressures, in the age of social media, fomo, teen culture and identity. My therapy for adolescents is tailored to address these unique complexities, providing a supportive space where they can openly explore their feelings and experiences. Through a combination of cognitive behavior therapy (CBT), dialectical behavior therapy (DBT), and other integrative techniques, I work with adolescents to build resilience, enhance self-awareness, and develop coping strategies that foster personal growth and emotional stability.In our sessions, I focus on creating a safe and trusting environment where young people feel heard and understood. My approach is designed to help them navigate issues such as peer pressure, academic stress, and identity development, guiding them towards a more balanced and confident sense of self. By working collaboratively, we can address the challenges they face and equip them with tools to thrive both now and in the future.",
    },
    {
      title: "LIVING WITH ADHD AND NEURODIVERGENCE",
      content:
        "Many people struggle with ADHD  and other Neurodirgence (social anxiety, dyslexia, learning disorders etc) without knowing it. ADHD is more about the brain being able to process and organize than not having the knowledge/ability. People who experience ADHD often also experience Depression and Anxiety. Therapy focuses on separating the process of doing something from knowing how, being able to organize and communicate, focus and not get distracted. Living in our modern world with a neurodivergent brain can present unique challenges, impacting various aspects of life, from academic performance to self-esteem. I offer specialized support to help individuals manage their symptoms and harness their strengths.Together, we focus on developing effective coping strategies and building self-confidence. Whether it’s creating organizational systems, improving focus, or addressing any emotional impacts, my goal is to empower individuals to navigate their daily lives with greater ease and confidence. I aim to provide support that is both empathetic and practical, helping clients thrive amidst the challenges they face.",
    },
    {
      title: "TRAUMA PTSD & C-PTSD",
      content:
        "Whether it is one or many, traumatic experiences impact how we see the world. Experiences are traumatic experiences if WE perceive that our life or wellbeing or the life/wellbeing of someone we care about is in jeopardy. It is about our perception of the event and subsequent aftermath, not other’s experiences of the same event, or if life/limb was actually threatened. PTSD is when our brain goes into overdrive to protect us from experiencing this event again. EX: jumping and tensing up when we hear car brakes squeaking after we were in a serious car accident. Complex PTSD is about experiencing many events that were either traumatic or made us question our well-being and having to develop purposeful patterns of being around others, so that we did not have to question our well-being.",
    },
  ];

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
          Areas Of Specialization
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
