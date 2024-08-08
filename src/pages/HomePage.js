import React from "react";
import Hero from "../components/Hero/Hero";
import TherapyStrip from "../components/TherapyStrip/TherapyStrip";
import TherapyServices from "../components/TherapyServices/TherapyServices";
import DontWaitSection from "../components/DontWaitSection/DontWaitSection";
import OurTherapy from "../components/OurTherapy/OurTherapy";
import MinuteSession from "../components/MinuteSession/MinuteSession";
import AreasSupport from "../components/AreasSupport/AreasSupport";
import GettingStarted from "../components/GettingStarted/GettingStarted";
import BioSection from "../components/BioSection/BioSection";
import ProvidesSection from "../components/ProvidesSection/ProvidesSection";
import OurApproach from "../components/OurApproach/OurApproach";
import FaqSection from "../components/FaqSection/FaqSection";
import GetStarted from "../components/GetStarted/GetStarted";
import BottomHero from "../components/BottomHero/BottomHero";

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero />
      <TherapyStrip />
      <TherapyServices />
      <DontWaitSection />
      <OurTherapy />
      <MinuteSession />
      <AreasSupport />
      <GettingStarted />
      <BioSection id="about" />
      <ProvidesSection />
      <OurApproach />
      <FaqSection />
      <GetStarted id="contact" />
      <BottomHero />
    </div>
  );
};

export default HomePage;
