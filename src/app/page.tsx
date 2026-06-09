import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import HowItWorks from '@/components/HowItWorks';
import FontGallery from '@/components/FontGallery';
import StartSection from '@/components/StartSection';
import ColorPalette from '@/components/ColorPalette';
import PricingSection from '@/components/PricingSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorks />
        <FontGallery />
        <StartSection />
        <ColorPalette />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
