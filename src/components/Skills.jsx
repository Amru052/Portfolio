import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Statistical Quality Control Chart (New Pillar 1)
function ControlChartAnimator() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ repeat: -1 });

            // Animate line drawing
            tl.fromTo('.sqc-line',
                { strokeDashoffset: 1000 },
                { strokeDashoffset: 0, duration: 4, ease: 'none' }
            );

            // Animate points appearing
            tl.fromTo('.sqc-point',
                { scale: 0, opacity: 0, transformOrigin: 'center' },
                { scale: 1, opacity: 1, duration: 0.2, stagger: 0.3, ease: 'back.out(2)' },
                0 // start same time
            );

            // Flash the out-of-control point
            tl.to('.sqc-out-point', {
                fill: '#E63B2E', strokeWidth: 2, scale: 1.5, duration: 0.2, yoyo: true, repeat: 5
            }, 2.5);

            // Rest period before looping
            tl.to({}, { duration: 1 });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    const points = [
        { x: 10, y: 50 }, { x: 30, y: 40 }, { x: 50, y: 60 },
        { x: 70, y: 45 }, { x: 90, y: 55 }, { x: 110, y: 15, out: true }, // Spike above UCL!
        { x: 130, y: 50 }, { x: 150, y: 45 }, { x: 170, y: 55 }
    ];

    const pathD = `M ${points.map(p => `${p.x} ${p.y}`).join(' L ')}`;

    return (
        <div className="relative h-48 w-full bg-[#161616] rounded-xl border border-paper/10 p-4 overflow-hidden flex flex-col shadow-inner" ref={containerRef}>
            <div className="absolute top-3 left-3 text-[#F5F3EE]/40 uppercase text-[9px] tracking-widest border border-[#F5F3EE]/20 px-2 py-0.5 rounded">X-BAR_CHART</div>

            <svg viewBox="0 0 180 100" className="w-full h-full mt-4 overflow-visible">
                {/* Background Grid */}
                <g className="opacity-[0.05]">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <line key={`h-${i}`} x1="0" y1={i * 10} x2="180" y2={i * 10} stroke="#F5F3EE" strokeWidth="0.5" />
                    ))}
                    {Array.from({ length: 18 }).map((_, i) => (
                        <line key={`v-${i}`} x1={i * 10} y1="0" x2={i * 10} y2="100" stroke="#F5F3EE" strokeWidth="0.5" />
                    ))}
                </g>

                {/* Control Limits */}
                <line x1="0" y1="20" x2="180" y2="20" stroke="#E63B2E" strokeWidth="1" strokeDasharray="4 2" className="opacity-50" />
                <text x="178" y="16" fill="#E63B2E" fontSize="5" textAnchor="end" className="font-data opacity-80 uppercase tracking-wider">UCL</text>

                <line x1="0" y1="50" x2="180" y2="50" stroke="#F5F3EE" strokeWidth="1" className="opacity-30" />
                <text x="178" y="46" fill="#F5F3EE" fontSize="5" textAnchor="end" className="font-data opacity-50 uppercase tracking-wider">CL</text>

                <line x1="0" y1="80" x2="180" y2="80" stroke="#E63B2E" strokeWidth="1" strokeDasharray="4 2" className="opacity-50" />
                <text x="178" y="76" fill="#E63B2E" fontSize="5" textAnchor="end" className="font-data opacity-80 uppercase tracking-wider">LCL</text>

                {/* Data Line */}
                <path d={pathD} fill="none" stroke="#F5F3EE" strokeWidth="1.5" className="sqc-line opacity-80" strokeDasharray="1000" strokeDashoffset="1000" />

                {/* Data Points */}
                {points.map((p, i) => (
                    <circle
                        key={i}
                        cx={p.x}
                        cy={p.y}
                        r="2.5"
                        fill="#161616"
                        stroke={p.out ? "#E63B2E" : "#F5F3EE"}
                        strokeWidth="1.5"
                        className={`sqc-point ${p.out ? 'sqc-out-point drop-shadow-[0_0_5px_rgba(230,59,46,0.8)]' : ''}`}
                    />
                ))}
            </svg>
        </div>
    );
}

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
                <div key={i} className="shuffle-card absolute top-0 left-0 w-full bg-[#1A1A1A] border border-paper/10 p-5 rounded-xl shadow-[0_0_15px_rgba(0,0,0,0.5)] flex items-center justify-between">
                    <span className="font-heading font-semibold text-paper text-sm pr-4 leading-tight">{label}</span>
                    <div className="w-2.5 h-2.5 flex-shrink-0 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#E63B2E]"></div>
                </div>
            ))}
        </div>
    );
}

// Telemetry Typewriter
function TelemetryTypewriter() {
    const [displayLines, setDisplayLines] = useState([]);
    const [currentText, setCurrentText] = useState('');

    useEffect(() => {
        let isCancelled = false;

        const sequence = [
            { text: "Connecting to Power BI", dots: true },
            { text: "Transforming SQL Data", dots: true },
            { text: "Generating Chart.js visualization", dots: true },
            { text: "System ready.", dots: false },
            { text: ">", dots: false, keepCursor: true }
        ];

        const sleep = ms => new Promise(r => setTimeout(r, ms));

        const runSequence = async () => {
            while (!isCancelled) {
                setDisplayLines([]);
                setCurrentText('');

                let historicalLines = [];

                for (let i = 0; i < sequence.length; i++) {
                    if (isCancelled) return;

                    const step = sequence[i];
                    let currentString = "";

                    // Type out characters
                    for (let c = 0; c < step.text.length; c++) {
                        if (isCancelled) return;
                        currentString += step.text[c];
                        setCurrentText(currentString);
                        await sleep(25);
                    }

                    // Process Dots
                    if (step.dots) {
                        for (let d = 1; d <= 3; d++) {
                            await sleep(250);
                            if (isCancelled) return;
                            currentString += ".";
                            setCurrentText(currentString);
                        }
                        await sleep(200);
                    } else if (!step.keepCursor) {
                        await sleep(400);
                    }

                    if (step.keepCursor) {
                        // Let it blink at the end for a bit
                        await sleep(3500);
                    } else {
                        historicalLines.push(currentString);
                        setDisplayLines([...historicalLines]);
                        setCurrentText('');
                    }
                }
            }
        };

        runSequence();

        return () => { isCancelled = true; };
    }, []);

    return (
        <div className="bg-[#0A0A0A] text-[#F5F3EE] font-data p-5 rounded-xl text-xs h-48 overflow-hidden relative shadow-inner border border-paper/5">
            <div className="absolute top-3 right-3 text-[#F5F3EE]/40 uppercase text-[9px] tracking-widest border border-[#F5F3EE]/20 px-2 py-0.5 rounded">BI_METRICS_FEED</div>

            <div className="whitespace-pre-wrap leading-relaxed mt-5 text-[#E8E4DD] flex flex-col items-start gap-1">
                {displayLines.map((line, i) => (
                    <div key={i} className="opacity-60">{line}</div>
                ))}
                <div className="flex items-center">
                    <span>{currentText}</span>
                    <span className="inline-block w-2 bg-[#E63B2E] h-3 ml-1 animate-pulse"></span>
                </div>
            </div>
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
                .to('.server-node', { backgroundColor: '#E63B2E', duration: 0.3, boxShadow: '0 0 15px rgba(230,59,46,0.5)' }, "-=0.2")
                // Move to save
                .to('.fake-cursor', { x: 130, y: 70, duration: 1, ease: 'power2.inOut', delay: 0.5 })
                .to('.fake-cursor', { scale: 0.8, duration: 0.1, yoyo: true, repeat: 1 })
                // Save complete
                .to('.save-btn', { backgroundColor: '#E8E4DD', color: '#111111', duration: 0.3 }, "-=0.2")
                // Reset
                .to('.server-node', { backgroundColor: '#222', duration: 0.5, delay: 1, boxShadow: 'none' })
                .to('.save-btn', { backgroundColor: 'transparent', color: '#E8E4DD', duration: 0.5 }, "-=0.5")
                .to('.fake-cursor', { x: 0, y: 0, duration: 1, ease: 'power2.inOut' }, "-=0.5");

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="relative h-48 w-full bg-[#161616] rounded-xl border border-paper/10 p-4 overflow-hidden" ref={containerRef}>
            {/* Grid Pattern */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-[0.03] pointer-events-none">
                {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="border-[0.5px] border-paper"></div>
                ))}
            </div>

            {/* UI Elements */}
            <div className="server-node absolute top-8 left-8 w-12 h-12 bg-[#222] border border-paper/10 rounded-md flex items-center justify-center transition-all">
                <span className="text-paper text-[9px] font-data tracking-widest">NANO</span>
            </div>

            <div className="save-btn absolute top-[70px] left-[125px] border border-paper/30 text-paper px-3 py-1.5 rounded bg-transparent text-[10px] font-heading font-medium transition-colors">
                Deploy
            </div>

            {/* SVG Cursor */}
            <div className="fake-cursor absolute top-4 left-4 z-10 w-5 h-5 drop-shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#E63B2E" stroke="#111" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 3 7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
                    <path d="m13 13 6 6" />
                </svg>
            </div>
            <div className="absolute bottom-3 left-3 text-[9px] font-data text-paper/30 uppercase tracking-widest">Cursor_Deploy.sh</div>
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
        <section id="skills" ref={containerRef} className="relative w-full pt-24 pb-48 md:pb-64 px-6 md:px-12 max-w-6xl mx-auto z-10 transition-colors duration-300">
            <div className="mb-20">
                <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6 tracking-tight transition-colors duration-300">Functional Artifacts.</h2>
                <p className="font-data text-sm md:text-base opacity-60 max-w-2xl leading-relaxed transition-opacity duration-300">
                    A rigorous foundation in Business Statistics and Data Analytics, paired with Full-Stack engineering capabilities. Four core technical pillars driving robust, scalable, and intelligent solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">

                {/* Pillar 1: Business Statistics */}
                <div className="skill-card flex flex-col gap-6 group hover:-translate-y-1 hover:scale-[1.01] transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-current/5 backdrop-blur-2xl border border-current/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8">
                    <ControlChartAnimator />
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">Statistical Quality Control & Design</h3>
                        <p className="font-data text-sm opacity-50 transition-opacity duration-300 leading-relaxed">
                            Probability, Multivariate Analysis, QC, Experiment Design.
                        </p>
                    </div>
                </div>

                {/* Pillar 2: Machine Learning */}
                <div className="skill-card flex flex-col gap-6 group hover:-translate-y-1 hover:scale-[1.01] transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-current/5 backdrop-blur-2xl border border-current/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8">
                    <DiagnosticShuffler />
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">Machine Learning & Forecasting</h3>
                        <p className="font-data text-sm opacity-50 transition-opacity duration-300 leading-relaxed">
                            CNN, NLP, Business Forecasting, Unstructured Data.
                        </p>
                    </div>
                </div>

                {/* Pillar 3: Data Analytics & BI */}
                <div className="skill-card flex flex-col gap-6 group hover:-translate-y-1 hover:scale-[1.01] transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-current/5 backdrop-blur-2xl border border-current/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8">
                    <TelemetryTypewriter />
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">Data Exploration & Dashboards</h3>
                        <p className="font-data text-sm opacity-50 transition-opacity duration-300 leading-relaxed">
                            Telemetry, Power BI, Tableau, Chart.js.
                        </p>
                    </div>
                </div>

                {/* Pillar 4: Full-Stack */}
                <div className="skill-card flex flex-col gap-6 group hover:-translate-y-1 hover:scale-[1.01] transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] bg-current/5 backdrop-blur-2xl border border-current/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.05)] rounded-2xl p-6 md:p-8">
                    <CursorProtocolScheduler />
                    <div>
                        <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-accent transition-colors duration-300">Full-Stack Deployment</h3>
                        <p className="font-data text-sm opacity-50 transition-opacity duration-300 leading-relaxed">
                            SQL, PHP, Azure, Jetson Nano.
                        </p>
                    </div>
                </div>

            </div>
        </section>
    );
}
