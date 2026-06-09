import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import StatsSection from '@/components/StatsSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import FontGallery from '@/components/FontGallery';
import StartSection from '@/components/StartSection';
import Footer from '@/components/Footer';
import FountainPenCursor from '@/components/FountainPenCursor';

export default function Home() {
  return (
    <>
      <FountainPenCursor />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorks />
        <FontGallery />
        <StartSection />
      </main>
      <Footer />
    </>
  );
}
