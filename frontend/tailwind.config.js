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
        },
    },
    plugins: [],
    darkMode: 'class',
};
