import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Microsoft Edge Color Palette
        edge: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0078d4', // Primary Edge Blue
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.25)',
          dark: 'rgba(30, 30, 30, 0.25)',
        },
      },
      // Add custom colors to textColor and borderColor for utility availability
      textColor: {
        'glass-light': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(30, 30, 30, 0.25)',
      },
      borderColor: {
        'glass-light': 'rgba(255, 255, 255, 0.25)',
        'glass-dark': 'rgba(30, 30, 30, 0.25)',
      },
      fontFamily: {
        'edge': ['Segoe UI', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backdropBlur: {
        'edge': '16px',
      },
      borderRadius: {
        'edge': '8px',
        'edge-lg': '12px',
        'edge-xl': '16px',
      },
      boxShadow: {
        'edge-sm': '0 1px 2px rgba(0, 0, 0, 0.04)',
        'edge-md': '0 4px 8px rgba(0, 0, 0, 0.08)',
        'edge-lg': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'edge-xl': '0 16px 40px rgba(0, 0, 0, 0.16)',
        'edge-glow': '0 0 20px rgba(0, 120, 212, 0.3)',
        'edge-glow-dark': '0 0 20px rgba(79, 195, 247, 0.3)',
      },
      animation: {
        // Enhanced animations with Microsoft Fluent motion
        'fade-in': 'fadeIn 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'fade-out': 'fadeOut 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'slide-down': 'slideDown 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'slide-left': 'slideLeft 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'slide-right': 'slideRight 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'scale-in': 'scaleIn 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'scale-out': 'scaleOut 300ms cubic-bezier(0.1, 0.9, 0.2, 1)',
        'bounce-in': 'bounceIn 400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'shimmer': 'shimmer 1.5s infinite',
        'pulse-glow': 'pulseGlow 2s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-30px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        scaleOut: {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.9)', opacity: '0' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.3)', opacity: '0' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(0, 120, 212, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(0, 120, 212, 0.8)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      transitionTimingFunction: {
        'edge': 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [],
};

export default config;
