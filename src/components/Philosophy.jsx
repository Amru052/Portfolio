import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Philosophy() {
    const containerRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Parallax effect on the background noise/texture
            gsap.to('.philo-bg', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: 150,
                ease: 'none'
            });

            // Text reveal animation
            gsap.from('.philo-text', {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    toggleActions: 'play reverse play reverse'
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative py-40 px-6 md:px-12 bg-dark text-paper overflow-hidden"
        >
            <div className="philo-bg absolute -top-40 left-0 w-full h-[150%] opacity-10 pointer-events-none mix-blend-overlay">
                <svg width="100%" height="100%">
                    <filter id="philo-noise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#philo-noise)" />
                </svg>
            </div>

            <div className="relative z-10 max-w-5xl mx-auto" ref={textRef}>
                <p className="philo-text font-data text-sm md:text-base text-paper/40 uppercase tracking-widest mb-16 border-l-2 border-accent pl-4">
                    The Manifesto
                </p>

                <h3 className="philo-text font-heading text-3xl md:text-4xl lg:text-5xl text-paper/60 font-medium mb-10 leading-tight">
                    Most analysts focus on: <br className="hidden md:block" /> isolated static reporting.
                </h3>

                <h2 className="philo-text font-drama italic text-6xl md:text-8xl lg:text-9xl leading-[0.9] text-paper">
                    I focus on: integrated, end-to-end <br className="hidden md:block" />
                    <span className="text-accent not-italic font-heading font-bold ml-2">data solutions.</span>
                </h2>
            </div>
        </section>
    );
}
