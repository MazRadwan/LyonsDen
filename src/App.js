import React from "react";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import TherapyStrip from "./components/TherapyStrip/TherapyStrip";
import TherapyServices from "./components/TherapyServices/TherapyServices";
import DontWaitSection from "./components/DontWaitSection/DontWaitSection";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <TherapyStrip />
      <TherapyServices />
      <DontWaitSection />
      <main>
        {/* Placeholder for main content */}
        <h2>Welcome to the site</h2>
      </main>
    </div>
  );
}

export default App;
