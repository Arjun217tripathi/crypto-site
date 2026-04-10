import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                black: '#000000',
                carbon: '#0B0B0B',
                panel: 'rgba(255,255,255,0.04)',
                border: 'rgba(255,255,255,0.08)',

                textPrimary: '#FFFFFF',
                textSecondary: 'rgba(255,255,255,0.65)',
                textMuted: 'rgba(255,255,255,0.4)',

                neonPurple: '#B56CFF',
                neonPink: '#FF5EC9',
                neonCyan: '#4FEAFF',
                neonBlue: '#4A7DFF',
            },
            fontFamily: {
                display: ['var(--font-outfit)', 'Inter', 'sans-serif'],
                body: ['var(--font-outfit)', 'Inter', 'sans-serif'],
            },
            spacing: {
                section: '9rem',
                heroBottom: '7rem',
                cardGap: '2.5rem',
                contentGap: '1.5rem',
            },
            borderRadius: {
                sm: '0.75rem',
                md: '1.25rem',
                lg: '1.75rem',
                xl: '2.5rem',
                pill: '9999px',
            },
            fontSize: {
                hero: ['7rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
                section: ['3.5rem', { lineHeight: '1.1' }],
                cardTitle: ['1.25rem', { fontWeight: '500' }],
                body: ['1rem', { lineHeight: '1.7' }],
                small: ['0.875rem'],
            },
            boxShadow: {
                soft: '0 10px 40px rgba(0,0,0,0.6)',
                glow: '0 0 40px rgba(150,100,255,0.35)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
export default config;
