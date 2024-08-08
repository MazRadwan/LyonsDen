import React from "react";
import TherapyHero from "../components/TherapyHero/TherapyHero";
import TherapyStrip2 from "../components/TherapyStrip2/TherapyStrip2";
import DenServices from "../components/DenServices/DenServices";
import Specialization from "../components/Specialization/Specialization";
import OurApproach from "../components/OurApproach/OurApproach";
import FaqSection from "../components/FaqSection/FaqSection";
import GetStarted from "../components/GetStarted/GetStarted";
import BottomHero from "../components/BottomHero/BottomHero";

const TherapyServices = () => {
  return (
    <div className="therapy-services-page">
      <TherapyHero />
      <TherapyStrip2 />
      <DenServices />
      <Specialization /> {/* Add the new Specialization component here */}
      <OurApproach />
      <FaqSection />
      <GetStarted id="contact-therapy" />
      <BottomHero />
    </div>
  );
};

export default TherapyServices;
