import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { SectionId } from './types';
import { DotNavigation } from './components/DotNavigation';
import { IntroOverlay } from './components/IntroOverlay';
import { Section1Cheese } from './components/Section1Cheese';
import { Section2Paramedic } from './components/Section2Paramedic';
import { Section3Faith } from './components/Section3Faith';
import { Section4Nerd } from './components/Section4Nerd';
import { Section5Marcus } from './components/Section5Marcus';
import { Section6Gallery } from './components/Section6Gallery';
import { Section7Finale } from './components/Section7Finale';

const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>(SectionId.Cheese);
  
  // Refs for each section to track visibility
  const sectionRefs = {
    [SectionId.Cheese]: useRef<HTMLDivElement>(null),
    [SectionId.Paramedic]: useRef<HTMLDivElement>(null),
    [SectionId.Faith]: useRef<HTMLDivElement>(null),
    [SectionId.Nerd]: useRef<HTMLDivElement>(null),
    [SectionId.Marcus]: useRef<HTMLDivElement>(null),
    [SectionId.Gallery]: useRef<HTMLDivElement>(null),
    [SectionId.Finale]: useRef<HTMLDivElement>(null),
  };

  const handleNavigate = (id: SectionId) => {
    const element = sectionRefs[id].current;
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Intersection Observer to update active dot based on Viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = Object.keys(sectionRefs).find(
              key => sectionRefs[key as SectionId].current === entry.target
            ) as SectionId;
            if (sectionId) setActiveSection(sectionId);
          }
        });
      },
      { 
        threshold: 0.2, // Lower threshold to catch taller sections like Nerd
        rootMargin: "-20% 0px -20% 0px" // Focus on center of screen
      }
    );

    // Observe all sections
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className="w-full min-h-screen bg-black text-white relative">
      
      <AnimatePresence>
        {showIntro && <IntroOverlay onComplete={() => setShowIntro(false)} />}
      </AnimatePresence>

      {/* Navigation Fixed to Right */}
      <DotNavigation activeSection={activeSection} onNavigate={handleNavigate} />
      
      {/* 1. Cheese Section (Full Screen) */}
      <div ref={sectionRefs[SectionId.Cheese]} className="min-h-screen w-full relative z-10">
        <Section1Cheese />
      </div>

      {/* 2. Paramedic Section (Full Screen) */}
      <div ref={sectionRefs[SectionId.Paramedic]} className="min-h-screen w-full relative z-10">
        <Section2Paramedic />
      </div>

      {/* 3. Faith Section (Full Screen) */}
      <div ref={sectionRefs[SectionId.Faith]} className="min-h-screen w-full relative z-10">
        <Section3Faith />
      </div>

      {/* 4. Nerd Section (Variable Height - No longer constrained) */}
      <div ref={sectionRefs[SectionId.Nerd]} className="min-h-screen w-full relative z-10 bg-[#1A1A1A]">
        <Section4Nerd />
      </div>

      {/* 5. Marcus Section (Full Screen) */}
      <div ref={sectionRefs[SectionId.Marcus]} className="min-h-screen w-full relative z-10">
        <Section5Marcus />
      </div>

      {/* 6. Gallery Section (Vertical Feed) */}
      <div ref={sectionRefs[SectionId.Gallery]} className="min-h-screen w-full relative z-10">
        <Section6Gallery />
      </div>

      {/* 7. Finale Section (Full Screen) */}
      <div ref={sectionRefs[SectionId.Finale]} className="min-h-screen w-full relative z-10">
        <Section7Finale />
      </div>

    </main>
  );
};

export default App;