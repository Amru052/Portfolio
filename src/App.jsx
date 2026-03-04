import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Philosophy from './components/Philosophy';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  return (
    <div className="relative min-h-screen bg-background text-dark overflow-hidden selection:bg-accent selection:text-white">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-[100] opacity-5 mix-blend-overlay">
        <svg width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Global Gooey Filter for Project Animations */}
      <svg width="0" height="0" className="hidden">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </svg>

      <Navbar />

      <main>
        <Hero />
        <Skills />
        <Experience />
        <Philosophy />
        <Projects />
        <Certifications />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}

export default App;
