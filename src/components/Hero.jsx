import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDownRight } from 'lucide-react';

export default function Hero() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Stagger texts
            gsap.from('.hero-text', {
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.08,
                ease: 'power3.out',
                delay: 0.2
            });
            // Fade in button
            gsap.from('.hero-btn', {
                y: 20,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                delay: 0.6
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[100dvh] flex flex-col items-center justify-center px-6"
        >
            <div className="max-w-5xl w-full flex flex-col items-start z-10">
                <p className="hero-text font-data text-accent mb-4 tracking-widest uppercase text-sm">
                    System Initialized // v1.0.0
                </p>
                <h1 className="hero-text font-heading font-bold text-5xl md:text-7xl lg:text-8xl leading-tight text-dark tracking-tighter">
                    Extracting insights from the
                </h1>
                <h2 className="hero-text font-drama italic text-7xl md:text-9xl lg:text-[10rem] text-dark leading-none">
                    Noise.
                </h2>

                <div className="hero-btn mt-12 overflow-hidden">
                    <a
                        href="#projects"
                        className="group flex items-center gap-4 bg-accent text-paper px-8 py-4 rounded-full font-heading font-medium text-lg hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] relative"
                    >
                        <span className="relative z-10">View Projects</span>
                        <div className="relative z-10 w-8 h-8 rounded-full bg-paper/20 flex items-center justify-center group-hover:bg-paper/30 transition-colors">
                            <ArrowDownRight size={18} />
                        </div>
                        {/* Sliding background illusion via overflow */}
                        <div className="absolute inset-0 bg-dark transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] -z-0"></div>
                        <span className="absolute inset-x-0 inset-y-0 z-10 flex items-center gap-4 px-8 py-4 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                            <span className="text-paper">View Projects</span>
                            <div className="w-8 h-8 rounded-full bg-paper/20 flex items-center justify-center">
                                <ArrowDownRight size={18} className="text-paper" />
                            </div>
                        </span>
                    </a>
                </div>
            </div>
        </section>
    );
}
