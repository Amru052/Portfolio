import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Diagnostic Shuffler
function DiagnosticShuffler() {
    const containerRef = useRef(null);

    useEffect(() => {
        const cards = containerRef.current.querySelectorAll('.shuffle-card');
        let currentIndex = 0;

        // Initial setup
        gsap.set(cards, { y: i => i * 10, scale: i => 1 - i * 0.05, opacity: i => 1 - i * 0.2, zIndex: i => 10 - i });

        const interval = setInterval(() => {
            currentIndex = (currentIndex + 1) % cards.length;
            cards.forEach((card, i) => {
                const visualIndex = (i - currentIndex + cards.length) % cards.length;
                gsap.to(card, {
                    y: visualIndex * 15,
                    scale: 1 - visualIndex * 0.05,
                    opacity: visualIndex === 0 ? 1 : 0.6 - (visualIndex * 0.2),
                    zIndex: 10 - visualIndex,
                    duration: 0.8,
                    ease: 'power3.inOut'
                });
            });
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const labels = ["Aspect-Based Sentiment Analysis", "Lung Scan Classification", "Predictive Forecasting"];

    return (
        <div className="relative h-48 w-full max-w-sm" ref={containerRef}>
            {labels.map((label, i) => (
                <div key={i} className="shuffle-card absolute top-0 left-0 w-full bg-paper border border-dark/10 p-5 rounded-xl shadow-sm flex items-center justify-between">
                    <span className="font-heading font-semibold text-dark text-sm pr-4 leading-tight">{label}</span>
                    <div className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-accent animate-pulse"></div>
                </div>
            ))}
        </div>
    );
}

// Telemetry Typewriter
function TelemetryTypewriter() {
    const [text, setText] = useState('');
    const fullText = "Connecting to Power BI...\nTransforming SQL Data...\nGenerating Chart.js visualization...\nSystem ready.\n>";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.substring(0, i));
            i++;
            if (i > fullText.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-dark text-[#F5F3EE] font-data p-5 rounded-xl text-xs h-48 overflow-hidden relative shadow-inner">
            <div className="absolute top-3 right-3 text-[#F5F3EE]/40 uppercase text-[9px] tracking-widest border border-[#F5F3EE]/20 px-2 py-0.5 rounded">BI_METRICS_FEED</div>
            <pre className="whitespace-pre-wrap leading-relaxed mt-6 text-[#E8E4DD]">{text}<span className="inline-block w-2 bg-[#E63B2E] h-3 ml-1 animate-pulse"></span></pre>
        </div>
    );
}

// Cursor Protocol Scheduler
function CursorProtocolScheduler() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

            // Move cursor directly to NANO center (48x48 box at left-8/top-8)
            tl.to('.fake-cursor', { x: 32, y: 32, duration: 1, ease: 'power2.inOut' })
                // Click action
                .to('.fake-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
                // Server activate
                .to('.server-node', { backgroundColor: '#E63B2E', duration: 0.3 }, "-=0.2")
                // Move to save
                .to('.fake-cursor', { x: 130, y: 70, duration: 1, ease: 'power2.inOut', delay: 0.5 })
                .to('.fake-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
                // Save complete
                .to('.save-btn', { backgroundColor: '#111111', color: '#E8E4DD', duration: 0.3 }, "-=0.2")
                // Reset
                .to('.server-node', { backgroundColor: '#111111', duration: 0.5, delay: 1 })
                .to('.save-btn', { backgroundColor: 'transparent', color: '#111111', duration: 0.5 }, "-=0.5")
                .to('.fake-cursor', { x: 0, y: 0, duration: 1, ease: 'power2.inOut' }, "-=0.5");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative h-48 w-full bg-paper/50 rounded-xl border border-dark/10 p-4 overflow-hidden" ref={containerRef}>
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.03] pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-dark"></div>
                ))}
            </div>

            {/* UI Elements */}
            <div className="server-node absolute top-8 left-8 w-12 h-12 bg-dark rounded-md flex items-center justify-center transition-colors">
                <span className="text-paper text-[9px] font-data tracking-widest">NANO</span>
            </div>

            <div className="save-btn absolute top-[70px] left-[125px] border border-dark/30 text-dark px-3 py-1.5 rounded bg-transparent text-[10px] font-heading font-medium transition-colors">
                Deploy
            </div>

            {/* SVG Cursor */}
            <div className="fake-cursor absolute top-4 left-4 z-10 w-5 h-5 drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#F5F3EE" stroke="#111111" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    <path d="m13 13 6 6" />
                </svg>
            </div>
            <div className="absolute bottom-3 left-3 text-[9px] font-data text-dark/30 uppercase tracking-widest">Cursor_Deploy.sh</div>
        </div>
    );
}

export default function Skills() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.skill-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 75%',
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
        <section id="skills" ref={containerRef} className="py-24 px-6 md:px-12 max-w-6xl mx-auto">
            <div className="mb-20">
                <h2 className="font-heading font-bold text-4xl md:text-6xl text-dark mb-6 tracking-tight">Functional Artifacts.</h2>
                <p className="font-data text-sm md:text-base text-dark/60 max-w-xl leading-relaxed">
                    Three core technical pillars driving robust, scalable, and intelligent solutions. No decoration, pure information density.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="skill-card flex flex-col gap-6 group hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                    <DiagnosticShuffler />
                    <div>
                        <h3 className="font-heading font-bold text-xl text-dark mb-2">Machine Learning & Models</h3>
                        <p className="font-data text-sm text-dark/60">CNN, NLP, Python.</p>
                    </div>
                </div>

                <div className="skill-card flex flex-col gap-6 group hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                    <TelemetryTypewriter />
                    <div>
                        <h3 className="font-heading font-bold text-xl text-dark mb-2">Interactive Dashboards & BI</h3>
                        <p className="font-data text-sm text-dark/60">Power BI, Tableau, Chart.js.</p>
                    </div>
                </div>

                <div className="skill-card flex flex-col gap-6 group hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                    <CursorProtocolScheduler />
                    <div>
                        <h3 className="font-heading font-bold text-xl text-dark mb-2">Full-Stack Deployment</h3>
                        <p className="font-data text-sm text-dark/60">SQL, PHP, Azure, Jetson Nano.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
