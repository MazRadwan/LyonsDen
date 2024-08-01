import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import TherapyStrip from "./components/TherapyStrip/TherapyStrip";
import TherapyServices from "./components/TherapyServices/TherapyServices";
import DontWaitSection from "./components/DontWaitSection/DontWaitSection";
import OurTherapy from "./components/OurTherapy/OurTherapy";
import MinuteSession from "./components/MinuteSession/MinuteSession";
import AreasSupport from "./components/AreasSupport/AreasSupport";
import GettingStarted from "./components/GettingStarted/GettingStarted";
import BioSection from "./components/BioSection/BioSection";
import ProvidesSection from "./components/ProvidesSection/ProvidesSection";
import OurApproach from "./components/OurApproach/OurApproach";
import FaqSection from "./components/FaqSection/FaqSection";
import GetStarted from "./components/GetStarted/GetStarted";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <TherapyStrip />
      <TherapyServices />
      <DontWaitSection />
      <OurTherapy />
      <MinuteSession />
      <AreasSupport />
      <GettingStarted />
      <BioSection />
      <ProvidesSection />
      <OurApproach />
      <FaqSection />
      <GetStarted />
      <main>
        {/* Placeholder for main content */}
        <h2>Welcome to the site</h2>
      </main>
    </div>
  );
}

export default App;
