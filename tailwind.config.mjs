/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        sans: ['"Geist"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0a0b',
          elevated: '#111113',
          surface: '#16161a',
        },
        accent: {
          DEFAULT: '#00ff9c',
          dim: '#00cc7d',
          glow: 'rgba(0, 255, 156, 0.15)',
        },
        danger: {
          DEFAULT: '#ff4d6d',
          glow: 'rgba(255, 77, 109, 0.15)',
        },
        warn: {
          DEFAULT: '#ffb84d',
        },
        text: {
          DEFAULT: '#e8e8ea',
          dim: '#9a9aa3',
          faint: '#5a5a64',
        },
        line: '#1f1f25',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'blink': 'blink 1.2s steps(2) infinite',
        'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
    },
  },
  plugins: [],
};
