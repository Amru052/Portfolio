import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const projects = [
    {
        title: "Algae Monitoring Web App",
        client: "PETRONAS",
        desc: "Developed a full-stack dashboard deployed on NVIDIA Jetson Nano utilizing PHP and Node-RED for real-time control.",
        canvas: "laser"
    },
    {
        title: "Aspect-Based Sentiment Analysis",
        client: "Digital Population Identity",
        desc: "Built a CNN/NLP model achieving 84% accuracy for analyzing Indonesia's Digital Population Identity app reviews.",
        canvas: "geometry"
    },
    {
        title: "Village Financial Dashboard",
        client: "KKN PM",
        desc: "Developed a local government budgeting dashboard to automate complex manual Excel transitions.",
        canvas: "waveform"
    }
];

const sentimentPhrases = [
    "Good App", "Critical Error", "Seamless UX", "Crash on Startup",
    "Intuitive", "Laggy Response", "Perfect", "Needs Update",
    "Fast Loader", "Unresponsive UI", "Clean Interface", "Data Loss",
    "Highly Recommend", "Navigation Bug", "Secure", "Connection Refused"
];

function SentimentPopup() {
    const [data, setData] = useState(null);

    useEffect(() => {
        let timeout;
        const cycle = () => {
            setData({
                text: sentimentPhrases[Math.floor(Math.random() * sentimentPhrases.length)],
                top: `${20 + Math.random() * 60}%`, // 20% to 80%
                left: `${15 + Math.random() * 70}%`, // 15% to 85%
                key: Math.random()
            });
            // Show for 4s, wait random time before next
            timeout = setTimeout(cycle, 4000 + Math.random() * 3000);
        };
        // Stagger initial start
        timeout = setTimeout(cycle, Math.random() * 5000);
        return () => clearTimeout(timeout);
    }, []);

    if (!data) return null;

    const isError = ['Error', 'Crash', 'Lag', 'Unresponsive', 'Needs', 'Bug', 'Loss', 'Refused'].some(keyword => data.text.includes(keyword));

    return (
        <div className="absolute" style={{ top: data.top, left: data.left, transform: 'translate(-50%, -50%)' }}>
            <div key={data.key} className="whitespace-nowrap opacity-0 mix-blend-multiply" style={{ animation: 'popupSentiment 4s ease-in-out forwards' }}>
                <span className={isError ? 'text-accent' : 'text-dark'}>
                    {data.text}
                </span>
            </div>
        </div>
    );
}

export default function Projects() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-card');

            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: card,
                            start: "top top",
                            end: "+=150%", // Total scroll distance for this card
                            pin: true,
                            pinSpacing: false,
                            scrub: true,
                        }
                    });

                    tl.to(card, {
                        scale: 0.9,
                        filter: "blur(20px)",
                        opacity: 0.5,
                        ease: "none",
                        duration: 1
                    }, 0.5); // Add a 0.5 second relative delay before the blur starts (acts as a scroll buffer)

                } else {
                    ScrollTrigger.create({
                        trigger: card,
                        start: "top top",
                        end: "+=100%", // Give it some scrolling room
                        pin: true,
                        pinSpacing: true,
                    });
                }
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="projects" ref={containerRef} className="relative bg-background w-full">
            {projects.map((proj, i) => (
                <div
                    key={i}
                    className="project-card h-[100dvh] w-full flex flex-col justify-center items-center bg-paper border-t border-dark/10 p-6 md:p-12 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)] origin-top relative"
                    style={{ zIndex: i, marginTop: i > 0 ? '50vh' : '0' }}
                >
                    {/* Canvas representation */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none flex items-center justify-center overflow-hidden">
                        {proj.canvas === 'laser' && (
                            <div className="relative w-full h-full" style={{ filter: 'url(#goo)' }}>
                                <style>{`
                                    @keyframes float1 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(15vw, -15vh) scale(1.2); } }
                                    @keyframes float2 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-10vw, 20vh) scale(0.8); } }
                                    @keyframes float3 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-18vw, -10vh) scale(1.1); } }
                                    @keyframes float4 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(20vw, 20vh) scale(1.3); } }
                                    @keyframes float5 { 0%, 100% { transform: translate(0, 0) scale(1); } 50% { transform: translate(-5vw, -25vh) scale(0.9); } }
                                `}</style>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[35vw] h-[35vw] min-w-[400px] min-h-[400px] bg-accent rounded-full opacity-60 blur-xl mix-blend-multiply" style={{ animation: 'float1 12s ease-in-out infinite' }}></div>
                                <div className="absolute top-[30%] left-[20%] w-[25vw] h-[25vw] min-w-[300px] min-h-[300px] bg-accent rounded-full opacity-70 blur-xl mix-blend-multiply" style={{ animation: 'float2 10s ease-in-out infinite' }}></div>
                                <div className="absolute top-[70%] left-[80%] w-[40vw] h-[40vw] min-w-[500px] min-h-[500px] bg-accent rounded-full opacity-40 blur-xl mix-blend-multiply" style={{ animation: 'float3 15s ease-in-out infinite' }}></div>
                                <div className="absolute top-[80%] left-[25%] w-[20vw] h-[20vw] min-w-[250px] min-h-[250px] bg-accent rounded-full opacity-80 blur-xl mix-blend-multiply" style={{ animation: 'float4 9s ease-in-out infinite' }}></div>
                                <div className="absolute top-[20%] left-[75%] w-[28vw] h-[28vw] min-w-[350px] min-h-[350px] bg-accent rounded-full opacity-60 blur-xl mix-blend-multiply" style={{ animation: 'float5 11s ease-in-out infinite' }}></div>
                            </div>
                        )}

                        {proj.canvas === 'geometry' && (
                            <div className="relative w-full h-full font-data text-xl md:text-2xl font-bold uppercase tracking-widest text-dark overflow-hidden">
                                <style>{`
                                    @keyframes popupSentiment { 
                                        0% { opacity: 0; transform: scale(0.8) translateY(20px); } 
                                        15%, 85% { opacity: 1; transform: scale(1) translateY(0); } 
                                        100% { opacity: 0; transform: scale(1.1) translateY(-20px); } 
                                    }
                                `}</style>
                                {/* Background wireframe brain/node */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] border-[0.5px] border-dark/10 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none">
                                    <div className="absolute inset-x-0 h-px bg-dark/10 top-1/2"></div>
                                    <div className="absolute inset-y-0 w-px bg-dark/10 left-1/2"></div>
                                    <div className="absolute inset-0 border-[0.5px] border-dark/5 rounded-full scale-75"></div>
                                </div>

                                {/* 14 Independent Randomized Popups */}
                                {[...Array(14)].map((_, i) => <SentimentPopup key={i} />)}
                            </div>
                        )}

                        {proj.canvas === 'waveform' && (
                            <div className="relative w-full h-full flex items-center justify-center overflow-hidden opacity-40">
                                <style>{`
                                    @keyframes drawTrendLine { 0% { stroke-dashoffset: 100; } 100% { stroke-dashoffset: 0; } }
                                    @keyframes blinkTrendPoint { 0%, 100% { opacity: 1; r: 6; } 50% { opacity: 0.2; r: 16; } }
                                `}</style>
                                <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 500">
                                    <path id="trendLine" d="M 0 450 C 100 450, 150 350, 250 380 C 350 410, 450 200, 550 250 C 650 300, 750 100, 850 120 C 950 140, 1000 50, 1000 50"
                                        fill="none" stroke="#E63B2E" strokeWidth="4" pathLength="100"
                                        strokeDasharray="100" style={{ animation: 'drawTrendLine 10s linear infinite' }} />

                                    {/* Grid overlay */}
                                    <path d="M 0 100 L 1000 100 M 0 200 L 1000 200 M 0 300 L 1000 300 M 0 400 L 1000 400" fill="none" stroke="#111111" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.2" />
                                    <path d="M 200 0 L 200 500 M 400 0 L 400 500 M 600 0 L 600 500 M 800 0 L 800 500" fill="none" stroke="#111111" strokeWidth="0.5" strokeDasharray="5,5" opacity="0.2" />

                                    <circle cx="0" cy="0" r="6" fill="#E63B2E" style={{ animation: 'blinkTrendPoint 1s ease-in-out infinite' }}>
                                        <animateMotion dur="10s" repeatCount="indefinite">
                                            <mpath href="#trendLine" />
                                        </animateMotion>
                                    </circle>
                                </svg>
                            </div>
                        )}
                    </div>

                    <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-start px-4">
                        <div className="flex items-center gap-4 mb-8">
                            <span className="font-data text-xs text-paper bg-dark px-3 py-1 rounded-sm uppercase tracking-widest">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="font-data text-sm text-dark/60 tracking-widest uppercase bg-paper/50 backdrop-blur-md px-3 py-1 rounded-sm">
                                {proj.client}
                            </span>
                        </div>

                        <h2 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl text-dark mb-8 leading-[0.9] tracking-tighter">
                            {proj.title}
                        </h2>

                        <p className="font-data text-base md:text-xl text-dark/70 max-w-2xl leading-relaxed">
                            {proj.desc}
                        </p>
                    </div>
                </div>
            ))
            }
        </section >
    );
}
