import React, { useRef, useEffect } from 'react';

const InteractiveDotGrid = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const parent = canvas.parentElement;
        let animationFrameId;

        // Particle settings
        const dotRadius = 1.5;
        const spacing = 35; // Distance between dots
        const mouseRadius = 150; // Radius of repulsion
        const returnSpeed = 0.1; // Spring force back to origin
        const friction = 0.8; // Dampening

        let dots = [];
        let mouse = { x: -1000, y: -1000 };
        let logicalWidth = 0;
        let logicalHeight = 0;

        const initDots = () => {
            if (!parent || !canvas) return;
            dots = [];
            const rect = parent.getBoundingClientRect();
            logicalWidth = rect.width;
            logicalHeight = rect.height;

            const dpr = window.devicePixelRatio || 1;
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            // Reset transform before scaling
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const cols = Math.floor(rect.width / spacing);
            const rows = Math.floor(rect.height / spacing);

            const offsetX = (rect.width - cols * spacing) / 2;
            const offsetY = (rect.height - rows * spacing) / 2;

            for (let i = 0; i <= cols; i++) {
                for (let j = 0; j <= rows; j++) {
                    const x = offsetX + i * spacing;
                    const y = offsetY + j * spacing;
                    dots.push({
                        x, y,
                        originX: x, originY: y,
                        vx: 0, vy: 0,
                    });
                }
            }
        };

        const resize = () => {
            initDots();
        };

        window.addEventListener('resize', resize);
        // Init after DOM is painted
        setTimeout(initDots, 50);

        const handleMouseMove = (e) => {
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener('mousemove', handleMouseMove);
        if (parent) parent.addEventListener('mouseleave', handleMouseLeave);

        const render = () => {
            ctx.clearRect(0, 0, logicalWidth, logicalHeight);

            ctx.fillStyle = 'rgba(17, 17, 17, 0.2)';

            for (let i = 0; i < dots.length; i++) {
                const dot = dots[i];

                const dx = mouse.x - dot.x;
                const dy = mouse.y - dot.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouseRadius) {
                    const force = (mouseRadius - dist) / mouseRadius;
                    const angle = Math.atan2(dy, dx);
                    dot.vx -= Math.cos(angle) * force * 4;
                    dot.vy -= Math.sin(angle) * force * 4;
                }

                dot.vx += (dot.originX - dot.x) * returnSpeed;
                dot.vy += (dot.originY - dot.y) * returnSpeed;
                dot.vx *= friction;
                dot.vy *= friction;
                dot.x += dot.vx;
                dot.y += dot.vy;

                ctx.beginPath();
                ctx.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            if (parent) parent.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ width: '100%', height: '100%' }}
        />
    );
};

export default InteractiveDotGrid;
