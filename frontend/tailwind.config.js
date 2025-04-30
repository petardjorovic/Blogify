import { transform } from 'framer-motion';

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                mainBlue: '#0b6dc5',
                darkBlue: '#115899',
                lightGrey: '#f8f9fa',
                borderGray: '#dee2e6',
                backGray: '#9CA3AF',
            },
            boxShadow: {
                custom: '0 4px 6px gray',
            },
            animation: {
                fadeInScale: 'fadeInScale 0.3s ease-out',
            },
            keyframes: {
                fadeInScale: {
                    '0%': { opacity: 0, transform: 'scale(0.95)' },
                    '100%': { opacity: 1, transform: 'scale(1)' },
                },
            },
        },
    },
    plugins: [],
    darkMode: 'class',
};
