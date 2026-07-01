import Navbar from '@/components/mw/Navbar';
import Hero from '@/components/mw/Hero';
import Dashboard from '@/components/mw/Dashboard';
import PhoneShowcase from '@/components/mw/PhoneShowcase';
import Footer from '@/components/mw/Footer';

/**
 * Dipali's Mobile World — the three design screens composed into one product page:
 *   1a Portal + login (Hero) → 1b Dashboard → 1c Counter phone → footer.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <Hero />
        <Dashboard />
        <PhoneShowcase />
      </main>
      <Footer />
    </>
  );
}
