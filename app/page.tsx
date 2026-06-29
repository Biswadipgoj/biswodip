import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CursorGlow from '@/components/CursorGlow';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Journey from '@/components/sections/Journey';
import GitHubSection from '@/components/sections/GitHubSection';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <Navbar />
      <main className="relative">
        <Hero />
        {/* Sections flow into one another over a single continuous aurora canvas */}
        <div className="relative">
          <About />
          <Skills />
          <Projects />
          <Journey />
          <GitHubSection />
          <Contact />
        </div>
        <Footer />
      </main>
    </>
  );
}
