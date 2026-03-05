import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InteractiveDotGrid from './InteractiveDotGrid';

const experiences = [
    {
        role: "Data Analyst Intern",
        company: "Center for Research in Data Science - Universiti Teknologi PETRONAS",
        location: "Seri Iskandar, Perak, Malaysia",
        date: "Apr 2025 - Aug 2025",
        details: [
            "Designed and developed an algae monitoring and control website for PETRONAS Research Sdn Bhd (PRSB).",
            "Implemented a full-stack solution deployed on an NVIDIA Jetson Nano to provide data monitoring and control.",
            "Engineered a front-end dashboard with Chart.js for dynamic data visualization of key metrics.",
            "Developed PHP server-side scripts to handle data compilation, updates, and storage using a lightweight JSON data structure.",
            "Utilized Node-RED to create a control interface, enabling real-time management of the algae cultivation system.",
            "Conducted a comparative analysis of algal growth to determine if there were significant differences between various fertilizers and to identify the primary factors influencing growth rates."
        ]
    },
    {
        role: "Assistant Lecturer - Statistical Quality Control",
        company: "Business Statistics Department ITS",
        location: "Surabaya, Jawa Timur, Indonesia",
        date: "Feb 2024 - Jul 2024",
        details: [
            "Taught Variable and Attribute Control Charts, including MR-I, Xbar-R, Xbar-S, P, NP, C, and U charts for monitoring process variation and defect rates.",
            "Guided students in Multivariate Control Charts (Generalized Variance, T²-Hotelling) and System Capability Analysis using control charts and capability indices.",
            "Instructed on Acceptance Sampling principles and methods for evaluating product quality."
        ]
    },
    {
        role: "Assistant Lecturer - Database Management",
        company: "Business Statistics Department ITS",
        location: "Surabaya, Jawa Timur, Indonesia",
        date: "Sep 2023 - Feb 2024",
        details: [
            "Taught database management and structuring using MySQL, PostgreSQL, HTML, PHP, and Azure.",
            "Instructed on database operations, web integration, and data storage in functional websites.",
            "Guided students in deploying online forms and securely storing data with Microsoft Azure."
        ]
    },
    {
        role: "Assistant Lecturer - Computer Programming",
        company: "Business Statistics Department ITS",
        location: "Surabaya, Jawa Timur, Indonesia",
        date: "Sep 2022 - Feb 2023",
        details: [
            "Taught Python fundamentals, including syntax and logic.",
            "Instructed on advanced techniques, focusing on data manipulation with Pandas.",
            "Emphasized practical applications for data analytics and related fields."
        ]
    }
];

export default function Experience() {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.exp-item', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse' // None at bottom so it doesn't disappear if scrolling past
                },
                y: 40,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: 'power3.out'
            });

            // Animate tracking line growing
            gsap.from('.exp-line', {
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 60%',
                    end: 'bottom 80%',
                    scrub: true,
                },
                height: 0,
                ease: 'none'
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="experience" ref={containerRef} className="relative w-full overflow-hidden transition-colors duration-300">
            <InteractiveDotGrid />

            <div className="py-24 px-6 md:px-12 max-w-6xl mx-auto z-10 relative">
                <div className="mb-20">
                    <h2 className="font-heading font-bold text-4xl md:text-6xl mb-6 tracking-tight transition-colors duration-300">Active Deployments.</h2>
                    <p className="font-data text-sm md:text-base opacity-60 max-w-xl leading-relaxed transition-opacity duration-300">
                        Tracking the execution history and operational roles across multiple academic and enterprise nodes.
                    </p>
                </div>

                <div className="relative pl-6 md:pl-10">
                    {/* Continuous tracking line */}
                    <div className="absolute top-0 left-[11px] md:left-[27px] w-px h-full bg-current opacity-10 transition-opacity duration-300"></div>
                    <div className="exp-line absolute top-0 left-[11px] md:left-[27px] w-px bg-accent shadow-[0_0_10px_#E63B2E]"></div>

                    <div className="flex flex-col gap-16">
                        {experiences.map((exp, i) => (
                            <div key={i} className="exp-item relative group">
                                {/* Timeline nodes */}
                                <div className="absolute -left-6 md:-left-10 w-3 h-3 rounded-full bg-background border-2 border-accent group-hover:bg-accent transition-colors duration-300 transform -translate-x-1/2 mt-2 z-10"></div>

                                <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 pl-6">
                                    <div className="lg:w-1/3 flex flex-col items-start gap-3">
                                        <span className="font-data text-xs uppercase tracking-widest border border-current opacity-70 px-3 py-1 rounded transition-colors duration-300">
                                            {exp.date}
                                        </span>
                                        <div>
                                            <h3 className="font-heading font-bold text-xl md:text-2xl leading-tight group-hover:text-accent transition-colors duration-300">
                                                {exp.role}
                                            </h3>
                                            <p className="font-drama italic text-lg opacity-80 mt-1 transition-opacity duration-300">
                                                {exp.company}
                                            </p>
                                            <p className="font-data text-[10px] opacity-50 tracking-widest uppercase mt-3 transition-opacity duration-300">
                                                [ {exp.location} ]
                                            </p>
                                        </div>
                                    </div>

                                    <div className="lg:w-2/3 bg-current/5 p-6 md:p-8 rounded-2xl border border-current/10 backdrop-blur-2xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.05)] transition-colors duration-300">
                                        <ul className="flex flex-col gap-3 font-data text-sm opacity-70 leading-relaxed transition-opacity duration-300">
                                            {exp.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-start gap-4">
                                                    <span className="text-accent/60 font-bold mt-0.5">›</span>
                                                    <span>{detail}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
