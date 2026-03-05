import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // trigger once on mount in case already scrolled
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full z-50 flex justify-center pt-6 px-4 pointer-events-none mix-blend-difference text-white">
            <nav
                className={`pointer-events-auto relative flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-full max-w-5xl ${isScrolled ? 'backdrop-blur-md bg-white/5 border border-white/10' : 'border border-transparent'}`}
            >

                <div className="font-heading font-bold text-lg cursor-pointer hover:scale-[1.03] transition-transform duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                    Amru R. Hammami
                </div>

                <ul className="hidden md:flex items-center gap-8 font-data text-sm tracking-tight opacity-70">
                    {['Skills', 'Projects', 'Experience'].map((item) => (
                        <li key={item}>
                            <a href={`#${item.toLowerCase()}`} className="hover:text-accent hover:opacity-100 hover:scale-[1.03] transition-all inline-block duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>

                <a href="#contact" className="bg-white/10 border border-white/20 text-white px-6 py-2 rounded-full font-heading font-medium text-sm hover:bg-white hover:text-black transition-colors duration-300 hover:scale-[1.03] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]">
                    Contact
                </a>
            </nav>
        </header>
    );
}
