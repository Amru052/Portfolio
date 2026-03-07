import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';
import { useLenis } from 'lenis/react';

gsap.registerPlugin(ScrollTrigger);

import algaeDashboard from '../assets/projects/algae/main_dashboard.webp';
import algaeBiomass from '../assets/projects/algae/biomass_analysis.webp';
import algaeExternal from '../assets/projects/algae/external_sources.webp';

import sentimentHome from '../assets/projects/sentiment/home_page.webp';
import sentimentProcess from '../assets/projects/sentiment/process.webp';
import sentimentOutput from '../assets/projects/sentiment/output.webp';

const financePlaceholder = "https://placehold.co/1200x800/111111/E8E4DD?text=Financial+Dashboard";

const projects = [
    {
        title: "Algae Monitoring Web App",
        client: "PETRONAS",
        desc: "Developed a full-stack dashboard deployed on NVIDIA Jetson Nano utilizing PHP and Node-RED for real-time control.",
        canvas: "laser",
        items: [
            { type: 'text', content: "Due to a signed NDA with PETRONAS Research Sdn. Bhd., the actual dashboard cannot be displayed. These are the 1st iteration designs with dummy data." },
            { type: 'image', src: algaeDashboard },
            { type: 'image', src: algaeBiomass },
            { type: 'image', src: algaeExternal }
        ]
    },
    {
        title: "Aspect-Based Sentiment Analysis",
        client: "Digital Population Identity",
        desc: "Built a CNN/NLP model achieving 84% accuracy for analyzing Indonesia's Digital Population Identity app reviews.",
        canvas: "geometry",
        items: [
            { type: 'image', src: sentimentHome },
            { type: 'image', src: sentimentProcess },
            { type: 'image', src: sentimentOutput }
        ]
    },
    {
        title: "Village Financial Dashboard",
        client: "KKN PM",
        desc: "Developed a local government budgeting dashboard to automate complex manual Excel transitions.",
        canvas: "waveform",
        items: [
            { type: 'image', src: financePlaceholder },
            { type: 'image', src: financePlaceholder },
            { type: 'image', src: financePlaceholder }
        ]
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
        <div className="absolute" style={{ top: data.top, left: data.left, transform: 'translate(-50%, -50%)', zIndex: 0 }}>
            <div key={data.key} className="whitespace-nowrap opacity-0 mix-blend-multiply" style={{ animation: 'popupSentiment 4s ease-in-out forwards' }}>
                <span className={isError ? 'text-accent' : 'text-dark'}>
                    {data.text}
                </span>
            </div>
        </div>
    );
}

function CardSwap({ items, onImageClick }) {
    const [cards, setCards] = useState(items.map((item, i) => ({ id: i, ...item })));
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        if (isHovered) return;
        const interval = setInterval(() => {
            setCards((prev) => {
                const newCards = [...prev];
                const topCard = newCards.pop();
                newCards.unshift(topCard);
                return newCards;
            });
        }, 3500); // Auto-flip every 3.5 seconds
        return () => clearInterval(interval);
    }, [isHovered]);

    const handleSwap = (e, index) => {
        e.stopPropagation();
        if (index !== cards.length - 1) return; // Only swap top card
        setCards((prev) => {
            const newCards = [...prev];
            const topCard = newCards.pop();
            newCards.unshift(topCard);
            return newCards;
        });
    };

    const handleBackgroundSwap = (e, isTop) => {
        e.stopPropagation();
        if (!isTop) {
            setCards((prev) => {
                const newCards = [...prev];
                const topCard = newCards.pop();
                newCards.unshift(topCard);
                return newCards;
            });
        }
    }

    return (
        <div
            className="relative w-full h-full flex items-center justify-center p-4 perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {cards.map((card, idx) => {
                const isTop = idx === cards.length - 1;
                const rIdx = cards.length - 1 - idx;
                const isImage = card.type === 'image';

                return (
                    <div
                        key={card.id}
                        className={`absolute w-full max-w-2xl flex items-center justify-center flex-col aspect-[4/3] rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer border border-white/20 ${!isImage ? 'bg-[#111111] p-8 text-center border-l-4 border-l-accent' : ''} ${isTop ? 'hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)]' : ''}`}
                        style={{
                            zIndex: idx,
                            transform: `translateY(${rIdx * 20}px) scale(${1 - rIdx * 0.05}) rotate(${rIdx === 0 ? 0 : rIdx % 2 === 0 ? rIdx * 2 : -rIdx * 2}deg)`,
                            opacity: 1 - rIdx * 0.2,
                        }}
                        onClick={(e) => isTop ? (isImage && onImageClick({ title: card.title || "Image", src: card.src })) : handleBackgroundSwap(e, isTop)}
                    >
                        {/* Overlay to dim backgrounds */}
                        {!isTop && <div className="absolute inset-0 bg-dark/20 mix-blend-overlay z-10 pointer-events-none"></div>}

                        {isImage ? (
                            <img src={card.src} alt="Project Preview" className="absolute w-full h-full object-cover object-top" />
                        ) : (
                            <p className="relative z-10 font-data text-white text-base md:text-xl lg:text-2xl leading-relaxed">
                                {card.content}
                            </p>
                        )}

                        {/* Expand hint for top card */}
                        {isTop && isImage && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-dark/40 z-20">
                                <span className="font-data text-paper border border-paper px-6 py-3 rounded-full uppercase tracking-widest text-sm backdrop-blur-md shadow-xl">
                                    Click to Expand
                                </span>
                            </div>
                        )}

                        {/* Swap button on the top card */}
                        {isTop && cards.length > 1 && (
                            <button
                                className="absolute bottom-4 right-4 z-30 font-data text-xs text-dark bg-paper/90 backdrop-blur-md px-4 py-2 rounded shadow-lg uppercase tracking-widest hover:bg-paper hover:scale-105 transition-all"
                                onClick={(e) => handleSwap(e, idx)}
                            >
                                Next Image
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default function Projects() {
    const containerRef = useRef(null);
    const [openedProject, setOpenedProject] = useState(null);
    const lenis = useLenis();

    const closeProjectModal = () => {
        // Trigger exit animation before unmounting
        const modal = document.querySelector('.project-modal-container');
        const backdrop = document.querySelector('.project-modal-backdrop');
        if (modal && backdrop) {
            gsap.to(modal, { y: '100%', duration: 0.4, ease: 'power3.in' });
            gsap.to(backdrop, {
                opacity: 0, duration: 0.4, ease: 'power3.in', onComplete: () => {
                    setOpenedProject(null);
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            setOpenedProject(null);
            document.body.style.overflow = 'auto';
        }
    };

    const openProjectImg = (title, src, index) => {
        // Find the ScrollTrigger instance for this specific project
        const st = ScrollTrigger.getById(`project-trigger-${index}`);
        const currentY = window.scrollY || document.documentElement.scrollTop;

        if (st && Math.abs(currentY - st.start) > 5) {
            // Concurrently smoothly scroll the background to perfectly align the project
            // using Lenis so it doesn't fight the user's smooth scroll instance
            if (lenis) {
                lenis.scrollTo(st.start, { duration: 0.8, lock: true }); // lock prevents user scrolling during auto-scroll
            } else {
                window.scrollTo({ top: st.start, behavior: 'smooth' });
            }

            // Wait 500ms for the scroll animation to visually progress before opening the modal
            setTimeout(() => {
                setOpenedProject({ title, src });
            }, 500);

            // Lock scrolling only after the alignment finishes, so we don't break the scroll animation
            setTimeout(() => {
                document.body.style.overflow = 'hidden';
            }, 850);
        } else {
            // If already aligned, open immediately
            setOpenedProject({ title, src });
            document.body.style.overflow = 'hidden';
        }
    };

    useEffect(() => {
        if (openedProject) {
            const modal = document.querySelector('.project-modal-container');
            const backdrop = document.querySelector('.project-modal-backdrop');
            if (modal && backdrop) {
                gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' });
                gsap.fromTo(modal, { y: '100%' }, { y: '0%', duration: 0.5, ease: 'power3.out', delay: 0.1 });
            }
        }
    }, [openedProject]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = gsap.utils.toArray('.project-card');

            cards.forEach((card, i) => {
                if (i < cards.length - 1) {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            id: `project-trigger-${i}`,
                            trigger: card,
                            start: "top top",
                            end: "+=150%",
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
                    }, 0.5);

                } else {
                    ScrollTrigger.create({
                        id: `project-trigger-${i}`,
                        trigger: card,
                        start: "top top",
                        end: "+=100%",
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
                    className="project-card h-[100vh] w-full flex flex-col justify-center items-center bg-paper border-t border-dark/10 p-4 md:p-8 lg:p-12 overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)] origin-top relative"
                    style={{ zIndex: i, marginTop: i > 0 ? '50vh' : '0' }}
                >
                    {/* Canvas representation */}
                    <div className="absolute inset-0 opacity-40 pointer-events-none flex items-center justify-center overflow-hidden z-0">
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

                    <div className="relative z-10 max-w-[90rem] mx-auto w-full flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 h-[90%] md:h-[95%] lg:h-[85%] mt-12 md:mt-16">

                        {/* Text Content */}
                        <div className="flex-none lg:flex-1 flex flex-col items-start bg-white/5 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.1)] border border-white/20 rounded-3xl p-6 md:p-8 lg:p-12 w-full max-w-lg md:max-w-2xl mx-auto lg:mx-0 order-2 lg:order-1 self-start lg:self-center mt-4 lg:mt-0 h-fit">
                            <div className="flex items-center gap-4 mb-6 md:mb-8">
                                <span className="font-data text-xs text-paper bg-dark px-3 py-1 rounded-sm uppercase tracking-widest flex-shrink-0">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="font-data text-xs md:text-sm text-dark/60 tracking-widest uppercase bg-paper/50 backdrop-blur-md px-3 py-1 rounded-sm block">
                                    {proj.client}
                                </span>
                            </div>

                            <h2 className="font-heading font-bold text-4xl md:text-5xl lg:text-7xl text-dark mb-4 md:mb-6 leading-[0.9] tracking-tighter">
                                {proj.title}
                            </h2>

                            <p className="font-data text-sm md:text-lg text-dark/70 w-full leading-relaxed">
                                {proj.desc}
                            </p>
                        </div>

                        {/* Card Swap Section */}
                        <div className="flex-1 lg:flex-1 w-full max-w-md md:max-w-2xl lg:max-w-none mx-auto min-h-0 relative flex items-center justify-center order-1 lg:order-2">
                            <CardSwap items={proj.items} onImageClick={({ title, src }) => openProjectImg(proj.title, src, i)} />
                        </div>
                    </div>
                </div>
            ))}

            {/* Project Full Image Modal */}
            {openedProject && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10" onClick={closeProjectModal}>
                    {/* Transparent Backdrop (No blur or dark overlay) */}
                    <div className="project-modal-backdrop absolute inset-0 bg-transparent opacity-0"></div>

                    {/* Modal Content - 80% width and height */}
                    <div
                        className="project-modal-container relative w-[95vw] h-auto max-h-[85vh] md:w-[80vw] md:h-[80vh] flex flex-col rounded-2xl shadow-2xl translate-y-full"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Light Bend Glass Overlay (Matches Navbar Gloss) */}
                        <div className="absolute inset-0 rounded-2xl pointer-events-none shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(255,255,255,0.2)] border border-white/20 z-30"></div>

                        {/* Title Bar (Matte Glass) */}
                        <div className="flex items-center justify-between p-4 bg-paper/85 backdrop-blur-md border-b border-dark/10 text-dark z-20 shadow-sm rounded-t-2xl flex-shrink-0">
                            <h3 className="font-data font-bold tracking-widest uppercase text-sm md:text-base">{openedProject.title}</h3>
                            <button
                                onClick={closeProjectModal}
                                className="w-8 h-8 hover:bg-dark/10 rounded flex items-center justify-center transition-colors duration-200"
                                aria-label="Close modal"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Image Viewer (Glossy Dark Glass) */}
                        <div className="w-full flex-1 min-h-0 overflow-hidden flex items-center justify-center p-2 md:p-4 bg-dark/40 backdrop-blur-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.5),0_4px_20px_rgba(0,0,0,0.1)] relative z-10 rounded-b-2xl">
                            <img
                                src={openedProject.src}
                                alt={openedProject.title}
                                className="w-full h-auto max-h-full md:w-auto md:h-full md:max-w-full object-contain mx-auto mix-blend-normal drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
