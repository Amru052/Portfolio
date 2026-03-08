import React, { useEffect, useRef } from 'react';
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

import { ReactLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

function App() {
  const appRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    function update(time) {
      if (lenisRef.current?.lenis) {
        lenisRef.current.lenis.raf(time * 1000);
      }
    }

    gsap.ticker.lagSmoothing(500, 33);
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a timeline specifically for background color shifts
      const bgTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills', // Target the skills section
          start: 'top 60%',   // When the top of the skills section hits 60% of viewport
          end: 'bottom 20%',  // When the bottom of the skills section hits 20% of viewport (pushes end point further down)
          scrub: 0.5,         // Smooth, fluid transition synced with scrolling
        }
      });

      // Morph background to dark and text to light as we enter #skills
      // Morph background back to light and text to dark as we leave and enter Experience
      bgTimeline
        .to(appRef.current, { backgroundColor: '#111111', color: '#E8E4DD', duration: 1 })
        .to(appRef.current, { backgroundColor: '#F5F3EE', color: '#111111', duration: 1 }, '+=2'); // Add a longer pause where it stays dark inside the section
    }, appRef);

    return () => ctx.revert();
  }, []);

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      <div ref={appRef} className="relative min-h-screen bg-background text-dark overflow-hidden selection:bg-accent selection:text-white">
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
    </ReactLenis>
  );
}

export default App;
