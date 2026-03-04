/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                paper: '#E8E4DD',
                accent: '#E63B2E',
                background: '#F5F3EE',
                dark: '#111111',
            },
            fontFamily: {
                heading: ['"Space Grotesk"', 'sans-serif'],
                drama: ['"DM Serif Display"', 'serif'],
                data: ['"Space Mono"', 'monospace'],
            },
            transitionTimingFunction: {
                'magnetic': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }
        },
    },
    plugins: [],
}
