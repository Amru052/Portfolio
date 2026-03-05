import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    // Toggle for Glass Finish: 'gloss' or 'matte'
    // 'gloss' = high reflection, edge distortion, glassy feel
    // 'matte' = smoother blur, less reflection
    const glassStyle = 'gloss';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // trigger once on mount in case already scrolled
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Dynamic classes based on glass finish toggle
    let backgroundClasses = 'border border-transparent';
    if (isScrolled) {
        if (glassStyle === 'gloss') {
            // Glassy edge distortion with complex inset shadows and higher definition reflection
            backgroundClasses = 'bg-white/5 backdrop-blur-md shadow-[inset_0_1px_2px_rgba(255,255,255,0.5),inset_0_-1px_2px_rgba(255,255,255,0.2),0_4px_20px_rgba(0,0,0,0.1)] border border-white/20';
        } else {
            // Frosted matte glass with smooth blur
            backgroundClasses = 'bg-white/10 backdrop-blur-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] border border-white/10';
        }
    }

    // Extracting the inner layout so the glass background can mirror its exact size invisibly
    const InnerNav = ({ isVisible }) => (
        <nav className={`relative flex items-center justify-between px-6 py-3 w-full max-w-5xl ${!isVisible ? 'opacity-0 pointer-events-none' : 'pointer-events-auto'}`}>
            <div className={`font-heading font-bold text-lg ${isVisible ? 'cursor-pointer hover:scale-[1.03]' : ''} transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}>
                Amru R. Hammami
            </div>

            <ul className="hidden md:flex items-center gap-8 font-data text-sm tracking-tight text-white/90">
                {['Skills', 'Projects', 'Experience'].map((item) => (
                    <li key={item}>
                        <a href={`#${item.toLowerCase()}`} className={`${isVisible ? 'hover:text-white hover:scale-[1.03]' : ''} transition-all inline-block duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}>
                            {item}
                        </a>
                    </li>
                ))}
            </ul>

            <a href="#contact" className={`bg-white text-black px-6 py-2 rounded-full font-heading font-medium text-sm ${isVisible ? 'hover:scale-[1.03]' : ''} transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]`}>
                Contact
            </a>
        </nav>
    );

    return (
        <>
            {/* Background Layer (Fixed z-40) - separate from text so mix-blend-mode blends with the whole page */}
            <div className="fixed top-0 left-0 w-full z-40 flex justify-center pt-6 px-4 pointer-events-none">
                <div className={`w-full max-w-5xl rounded-full transition-all duration-500 ${backgroundClasses}`}>
                    {/* Invisible spacer guarantees identical pill shape and height */}
                    <InnerNav isVisible={false} />
                </div>
            </div>

            {/* Content Layer (Fixed z-50) - uses mix-blend-difference at the root, directly against the page */}
            <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none mix-blend-difference text-white">
                <InnerNav isVisible={true} />
            </header>
        </>
    );
}
