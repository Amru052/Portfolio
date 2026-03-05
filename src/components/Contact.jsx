import React from 'react';
import { ArrowUpRight } from 'lucide-react';

export default function Contact() {
    return (
        <section id="contact" className="py-24 px-6 md:px-12 max-w-6xl mx-auto relative z-20 bg-background">
            <div className="w-full bg-paper border border-dark/10 rounded-[2.5rem] p-10 md:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 shadow-xl hover:shadow-2xl transition-shadow duration-500 group">
                <div className="flex-1">
                    <h2 className="font-heading font-bold text-5xl md:text-7xl text-dark mb-6 tracking-tight">
                        Initiate <br /><span className="text-accent italic font-drama">Protocol.</span>
                    </h2>
                    <p className="font-data text-sm md:text-base text-dark/60 max-w-md leading-relaxed">
                        System ready to integrate data pipelines, machine learning models, and interactive dashboards into your next mission-critical architecture.
                    </p>
                </div>

                <div className="flex flex-col gap-4 w-full lg:w-auto">
                    <a href="mailto:amru.rasyid.h@gmail.com" className="group/btn flex items-center justify-between gap-8 bg-dark text-paper px-8 py-5 rounded-2xl font-heading font-medium text-lg hover:bg-accent transition-colors duration-300 hover:scale-[1.03] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                        <span className="tracking-wide">Email transmission</span>
                        <ArrowUpRight size={22} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                    </a>

                    <a href="https://www.linkedin.com/in/amru-rasyid-hammami/" target="_blank" rel="noreferrer" className="group/btn flex items-center justify-between gap-8 bg-transparent border border-dark/20 text-dark px-8 py-5 rounded-2xl font-heading font-medium text-lg hover:border-dark transition-colors duration-300 hover:scale-[1.03] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                        <span className="tracking-wide">LinkedIn Node</span>
                        <ArrowUpRight size={22} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                    </a>
                </div>
            </div>
        </section>
    );
}
