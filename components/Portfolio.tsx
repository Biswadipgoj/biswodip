"use client";

import Navbar from "./Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Pipeline from "./sections/Pipeline";
import Projects from "./sections/Projects";
import Journey from "./sections/Journey";
import Impact from "./sections/Impact";
import Contact from "./sections/Contact";
import TerminalDispatch from "./sections/TerminalDispatch";
import Footer from "./Footer";
import ExperienceProvider from "./ExperienceProvider";
import SmoothScrollProvider from "./ui/SmoothScrollProvider";
import WorldCanvas from "./scene/WorldCanvas";
import FPSGauge from "./ui/FPSGauge";

export default function Portfolio() {
  return (
    <ExperienceProvider>
      <SmoothScrollProvider>
        <a className="skip-link" href="#main">Skip to content</a>
        <WorldCanvas />
        <FPSGauge />
        <Navbar />

        <main id="main" tabIndex={-1}>
          <Hero />
          <About />
          <Skills />
          <Pipeline />
          <Projects />
          <Journey />
          <Impact />
          <Contact />
          <TerminalDispatch />
        </main>

        <Footer />
      </SmoothScrollProvider>
    </ExperienceProvider>
  );
}
