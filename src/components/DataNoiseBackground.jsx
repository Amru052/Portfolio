import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function DataNoiseBackground() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];
        let animationFrameId;

        const mouse = { x: -1000, y: -1000 };

        const rgbDark = { r: 17, g: 17, b: 17 };
        const rgbAccent = { r: 230, g: 59, b: 46 };

        const initParticles = () => {
            particles.forEach(p => gsap.killTweensOf(p));
            particles = [];

            const targetCount = 800;
            const area = width * height;
            const spacing = Math.sqrt(area / targetCount);

            const cols = Math.floor(width / spacing);
            const rows = Math.floor(height / spacing);

            // Recalculate exact spacing to fit screen perfectly
            const exactSpacingX = width / cols;
            const exactSpacingY = height / rows;

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const originX = i * exactSpacingX;
                    const originY = j * exactSpacingY;

                    particles.push({
                        originX,
                        originY,
                        // Start randomly placed for maximum initial noise
                        x: Math.random() * width,
                        y: Math.random() * height,
                        vx: (Math.random() - 0.5) * 1.5,
                        vy: (Math.random() - 0.5) * 1.5,
                        snapped: false,
                        r: rgbDark.r,
                        g: rgbDark.g,
                        b: rgbDark.b,
                        alpha: Math.random() * 0.2 + 0.1, // 0.1 to 0.3
                        baseAlpha: Math.random() * 0.2 + 0.1
                    });
                }
            }
        };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticles();
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e) => {
            // Since it's fixed/absolute to screen/section, we can just use client coords.
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                const dx = mouse.x - p.originX;
                const dy = mouse.y - p.originY;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 180) {
                    if (!p.snapped) {
                        p.snapped = true;
                        gsap.to(p, {
                            x: p.originX,
                            y: p.originY,
                            r: rgbAccent.r,
                            g: rgbAccent.g,
                            b: rgbAccent.b,
                            alpha: 0.8,
                            duration: 0.6,
                            ease: 'back.out(1.5)',
                            overwrite: 'auto'
                        });
                    }
                } else {
                    if (p.snapped) {
                        p.snapped = false;
                        p.vx = (Math.random() - 0.5) * 1.5;
                        p.vy = (Math.random() - 0.5) * 1.5;
                        gsap.to(p, {
                            r: rgbDark.r,
                            g: rgbDark.g,
                            b: rgbDark.b,
                            alpha: p.baseAlpha,
                            duration: 0.8,
                            ease: 'power2.out',
                            overwrite: 'auto'
                        });
                    }
                }

                if (!p.snapped) {
                    // Slight wandering noise for fluid movement
                    p.vx += (Math.random() - 0.5) * 0.1;
                    p.vy += (Math.random() - 0.5) * 0.1;

                    const maxV = 1.0;
                    const vMag = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
                    if (vMag > maxV) {
                        p.vx = (p.vx / vMag) * maxV;
                        p.vy = (p.vy / vMag) * maxV;
                    }

                    p.x += p.vx;
                    p.y += p.vy;

                    // Wrap around screen
                    if (p.x < 0) p.x = width;
                    if (p.x > width) p.x = 0;
                    if (p.y < 0) p.y = height;
                    if (p.y > height) p.y = 0;
                }

                ctx.fillStyle = `rgba(${Math.round(p.r)}, ${Math.round(p.g)}, ${Math.round(p.b)}, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.snapped ? 3.5 : 2.5, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
            particles.forEach(p => gsap.killTweensOf(p));
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0"
        />
    );
}
