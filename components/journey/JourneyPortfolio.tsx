import SmoothScroll from '@/components/SmoothScroll';
import PortfolioNav from '@/components/portfolio/PortfolioNav';
import Opening from '@/components/portfolio/Opening';
import Identity from '@/components/portfolio/Identity';
import Stack from '@/components/portfolio/Stack';
import Projects from '@/components/projects/Projects';
import { Process, Journey, Contact } from '@/components/portfolio/Closing';

export default function JourneyPortfolio() {
  return (
    <SmoothScroll>
      <PortfolioNav />
      <main id="main" tabIndex={-1}>
        <Opening />
        <Identity />
        <Stack />
        <Projects />
        <Process />
        <Journey />
      </main>
      <Contact />
    </SmoothScroll>
  );
}

