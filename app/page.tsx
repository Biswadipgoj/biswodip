import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Impact from '@/components/sections/Impact';
import Journey from '@/components/sections/Journey';
import GitHubSection from '@/components/sections/GitHubSection';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      {/* Every section floats over the one persistent 3D universe mounted in
          the layout — the camera flies through it as this page scrolls. */}
      <main className="relative">
        <Hero />
        <div className="relative">
          <About />
          <Skills />
          <Projects />
          <Impact />
          <Journey />
          <GitHubSection />
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}
