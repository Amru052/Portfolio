import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

import bnspFront from '../assets/certificates/bnsp/front.webp';
import bnspBack from '../assets/certificates/bnsp/back.webp';
import toeflCertFront from '../assets/certificates/toefl/certificate_front.webp';
import toeflCertBack from '../assets/certificates/toefl/certificate_back.webp';
import toeflScoreFront from '../assets/certificates/toefl/score_report_front.webp';
import toeflScoreBack from '../assets/certificates/toefl/score_report_back.webp';
import sqlAdvanced from '../assets/certificates/sql/sql_advanced_certificate.webp';

const certs = [
    {
        title: "Business Intelligence Analyst",
        issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
        date: "Sep 2025 - Sep 2028",
        points: [
            "Certified in the full data analysis pipeline: data collection, validation, integration, and modelling.",
            "Competent in developing BI solutions (dashboards & reports) to support strategic business decisions.",
            "Officially recognized by the Indonesian government based on national competency standards (SKKNI)."
        ],
        images: [bnspFront, bnspBack]
    },
    {
        title: "TOEFL ITP® Official Score Report",
        issuer: "ETS",
        date: "Oct 2025",
        points: [
            "Total Score: 600 / 677",
            "Achieved C1-level proficiency in Listening Comprehension (68/68 - Max Score) and Reading Comprehension (61/67)."
        ],
        images: [
            toeflScoreFront,
            toeflScoreBack,
            toeflCertFront,
            toeflCertBack
        ]
    },
    {
        title: "SQL Advanced",
        issuer: "HackerRank",
        date: "May 2025",
        points: [
            "Demonstrated proficiency in advanced SQL techniques, including Window Functions, Common Table Expressions (CTEs), and Pivots.",
            "Assessed on core database concepts including effective Data Modeling, Indexing strategies, and principles of Query Optimization.",
            "Verified technical skills through a standardized assessment on HackerRank, a leading industry platform for evaluating developer talent."
        ],
        images: [sqlAdvanced]
    }
];

export default function Certifications() {
    const containerRef = useRef(null);
    const modalRef = useRef(null);

    // Modal State
    const [selectedCert, setSelectedCert] = useState(null);
    const [currentImageIdx, setCurrentImageIdx] = useState(0);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
    const imageContainerRef = useRef(null);

    const openModal = (cert) => {
        setSelectedCert(cert);
        setCurrentImageIdx(0);
        document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    };

    const closeModal = () => {
        // Trigger exit animation before unmounting
        const modal = document.querySelector('.cert-modal-container');
        const backdrop = document.querySelector('.cert-modal-backdrop');
        if (modal && backdrop) {
            gsap.to(modal, { y: '100%', opacity: 0, duration: 0.4, ease: 'power3.in' });
            gsap.to(backdrop, {
                opacity: 0, duration: 0.4, ease: 'power3.in', onComplete: () => {
                    setSelectedCert(null);
                    setIsZoomed(false);
                    document.body.style.overflow = 'auto';
                }
            });
        } else {
            setSelectedCert(null);
            setIsZoomed(false);
            document.body.style.overflow = 'auto';
        }
    };

    const nextImage = (e) => {
        e.stopPropagation();
        if (!selectedCert) return;
        setCurrentImageIdx((prev) => (prev + 1) % selectedCert.images.length);
        setIsZoomed(false);
    };

    const prevImage = (e) => {
        e.stopPropagation();
        if (!selectedCert) return;
        setCurrentImageIdx((prev) => (prev === 0 ? selectedCert.images.length - 1 : prev - 1));
        setIsZoomed(false);
    };

    const handleMouseMove = (e) => {
        if (!isZoomed || !imageContainerRef.current) return;
        const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
        // Calculate percentages
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setZoomOrigin(`${x}% ${y}%`);
    };

    const toggleZoom = (e) => {
        e.stopPropagation();
        if (!isZoomed && imageContainerRef.current) {
            // Set initial zoom origin to cursor position
            const { left, top, width, height } = imageContainerRef.current.getBoundingClientRect();
            const x = ((e.clientX - left) / width) * 100;
            const y = ((e.clientY - top) / height) * 100;
            setZoomOrigin(`${x}% ${y}%`);
        }
        setIsZoomed(!isZoomed);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo('.cert-card',
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.15,
                    ease: 'power3.out'
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    // Animate Modal In
    useEffect(() => {
        if (selectedCert && modalRef.current) {
            const backdrop = document.querySelector('.cert-modal-backdrop');
            if (backdrop) {
                gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' });
            }
            gsap.fromTo(modalRef.current,
                { opacity: 0, y: '100%' },
                { opacity: 1, y: '0%', duration: 0.5, ease: 'power3.out', delay: 0.1 }
            );
        }
    }, [selectedCert]);

    return (
        <section id="certifications" ref={containerRef} className={`py-24 px-6 md:px-12 max-w-6xl mx-auto relative transition-colors duration-300 ${selectedCert ? 'z-50' : 'z-10'}`}>
            <div className="mb-20">
                <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6 tracking-tight transition-colors duration-300">Verified Protocols.</h2>
                <p className="font-data text-sm md:text-base opacity-60 max-w-xl leading-relaxed transition-opacity duration-300">
                    Standardized competencies, official licenses, and technical validations backing the deployed systems.
                </p>
            </div>

            <div className="flex flex-col gap-10">
                {certs.map((cert, i) => (
                    <div key={i} className="cert-card bg-current/5 backdrop-blur-2xl border border-current/10 p-8 md:p-12 rounded-2xl flex flex-col md:flex-row gap-8 md:gap-16 shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_8px_30px_rgba(0,0,0,0.1)] transition-transform transition-shadow duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group">
                        <div className="md:w-1/3 flex flex-col items-start justify-between min-h-full">
                            <div>
                                <span className="font-data text-xs text-accent uppercase tracking-widest mb-4 border border-accent/20 bg-accent/5 px-2 py-1 rounded inline-block">
                                    {cert.date}
                                </span>
                                <h3 className="font-heading font-bold text-2xl md:text-3xl mb-2 leading-tight group-hover:text-accent transition-colors duration-300">
                                    {cert.title}
                                </h3>
                                <p className="font-data text-sm opacity-50 tracking-widest uppercase mb-8 transition-opacity duration-300">
                                    {cert.issuer}
                                </p>
                            </div>

                            {/* View Credential Button */}
                            {cert.images && cert.images.length > 0 && (
                                <button
                                    onClick={() => openModal(cert)}
                                    className="flex items-center gap-2 font-data text-xs tracking-widest uppercase border border-current/20 px-4 py-2 hover:bg-current hover:text-background transition-colors duration-300 mt-auto"
                                >
                                    <ExternalLink size={14} /> View Credential
                                </button>
                            )}
                        </div>

                        <div className="md:w-2/3 flex flex-col gap-4 justify-center">
                            <ul className="flex flex-col gap-3 font-data text-sm opacity-70 leading-relaxed transition-opacity duration-300">
                                {cert.points.map((pt, idx) => (
                                    <li key={idx} className="flex items-start gap-4">
                                        <span className="inline-block w-1.5 h-1.5 bg-accent rounded-sm mt-1.5 flex-shrink-0"></span>
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            {/* Credential Modal */}
            {selectedCert && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" onClick={closeModal}>
                    {/* Backdrop */}
                    <div className="cert-modal-backdrop absolute inset-0 bg-dark/80 backdrop-blur-sm opacity-0"></div>

                    {/* Modal Content */}
                    <div
                        ref={modalRef}
                        className="cert-modal-container relative w-full max-w-[95vw] md:max-w-[85vw] bg-paper shadow-2xl rounded-sm overflow-hidden flex flex-col pt-10 opacity-0 translate-y-full"
                        style={{ maxHeight: '95vh', height: 'fit-content' }}
                        onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark/5 hover:bg-accent hover:text-white rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Viewer */}
                        <div
                            ref={imageContainerRef}
                            className="relative w-full flex items-center justify-center p-4 bg-[#E8E4DD] overflow-hidden"
                            style={{
                                height: 'calc(95vh - 100px)',
                                cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                            }}
                            onMouseMove={handleMouseMove}
                            onClick={toggleZoom}
                        >
                            <img
                                src={selectedCert.images[currentImageIdx]}
                                alt={`${selectedCert.title} credential page ${currentImageIdx + 1}`}
                                className="max-w-full max-h-full w-auto object-contain shadow-lg border border-black/5 transition-transform duration-200 ease-out"
                                style={{
                                    transform: isZoomed ? 'scale(2.5)' : 'scale(1)',
                                    transformOrigin: zoomOrigin
                                }}
                            />

                            {/* Slider Controls (Only show if multiple images) */}
                            {selectedCert.images.length > 1 && (
                                <>
                                    <button
                                        onClick={prevImage}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-accent text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button
                                        onClick={nextImage}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-accent text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200"
                                    >
                                        <ChevronRight size={24} />
                                    </button>

                                    {/* Dots Indicator */}
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {selectedCert.images.map((_, idx) => (
                                            <div
                                                key={idx}
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentImageIdx ? 'bg-accent w-6' : 'bg-black/20'}`}
                                            ></div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>

                        {/* Footer Info */}
                        <div className="p-6 bg-paper border-t border-black/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h4 className="font-heading font-bold text-xl text-[#111111]">{selectedCert.title}</h4>
                                <p className="font-data text-xs text-[#111111]/50 uppercase tracking-widest mt-1">{selectedCert.issuer}</p>
                            </div>
                            <div className="font-data text-xs bg-[#111111] text-paper px-3 py-1.5 rounded uppercase tracking-widest">
                                {selectedCert.date}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
