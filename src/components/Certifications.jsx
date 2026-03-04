import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const certs = [
    {
        title: "Business Intelligence Analyst",
        issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
        date: "Sep 2025 - Sep 2028",
        points: [
            "Certified in the full data analysis pipeline: data collection, validation, integration, and modelling.",
            "Competent in developing BI solutions (dashboards & reports) to support strategic business decisions.",
            "Officially recognized by the Indonesian government based on national competency standards (SKKNI)."
        ]
    },
    {
        title: "TOEFL ITP® Official Score Report",
        issuer: "ETS",
        date: "Oct 2025",
        points: [
            "Total Score: 600 / 677",
            "Achieved C1-level proficiency in Listening Comprehension (68/68 - Max Score) and Reading Comprehension (61/67)."
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
        ]
    }
];

export default function Certifications() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cert-card', {
                scrollTrigger: {
                    trigger: containerRef.current,
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
        <section id="certifications" ref={containerRef} className="py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 relative bg-background">
            <div className="mb-20">
                <h2 className="font-heading font-bold text-4xl md:text-6xl text-dark mb-6 tracking-tight">Verified Protocols.</h2>
                <p className="font-data text-sm md:text-base text-dark/60 max-w-xl leading-relaxed">
                    Standardized competencies, official licenses, and technical validations backing the deployed systems.
                </p>
            </div>

            <div className="flex flex-col gap-10">
                {certs.map((cert, i) => (
                    <div key={i} className="cert-card bg-paper border border-dark/10 p-8 md:p-12 rounded-xl flex flex-col md:flex-row gap-8 md:gap-16 hover:shadow-lg transition-shadow duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group">
                        <div className="md:w-1/3 flex flex-col items-start">
                            <span className="font-data text-xs text-accent uppercase tracking-widest mb-4 border border-accent/20 bg-accent/5 px-2 py-1 rounded">
                                {cert.date}
                            </span>
                            <h3 className="font-heading font-bold text-2xl md:text-3xl text-dark mb-2 leading-tight group-hover:text-accent transition-colors duration-300">
                                {cert.title}
                            </h3>
                            <p className="font-data text-sm text-dark/50 tracking-widest uppercase">
                                {cert.issuer}
                            </p>
                        </div>

                        <div className="md:w-2/3 flex flex-col gap-4 justify-center">
                            <ul className="flex flex-col gap-3 font-data text-sm text-dark/70 leading-relaxed">
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
        </section>
    );
}
