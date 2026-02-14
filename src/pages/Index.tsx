import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { NeuroScan } from '@/components/sections/NeuroScan';
import { Savorcery } from '@/components/sections/Savorcery';
import { AlchemistLibrary } from '@/components/sections/AlchemistLibrary';
import { Footer } from '@/components/sections/Footer';
import { ParticleField } from '@/components/effects/ParticleField';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-x-hidden">
      {/* Global effects */}
      <ParticleField count={25} />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Sections */}
      <main>
        <Hero />
        <section id="scan">
          <NeuroScan />
        </section>
        <section id="reconstruct">
          <Savorcery />
        </section>
        <section id="library">
          <AlchemistLibrary />
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
