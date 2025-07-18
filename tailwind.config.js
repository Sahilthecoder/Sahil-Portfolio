/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: true,
  safelist: [
    // Only safelist dynamic theme colors that can't be detected
    'bg-primary', 'bg-secondary', 'bg-accent',
    'text-primary', 'text-secondary', 'text-accent',
    'border-primary', 'border-secondary', 'border-accent',
    'hover:bg-primary', 'hover:bg-secondary', 'hover:bg-accent',
    'hover:text-primary', 'hover:text-secondary', 'hover:text-accent',
    'dark:bg-primary', 'dark:bg-secondary', 'dark:bg-accent',
    'dark:text-primary', 'dark:text-secondary', 'dark:text-accent',
    'dark:hover:bg-primary', 'dark:hover:bg-secondary', 'dark:hover:bg-accent',
    'dark:hover:text-primary', 'dark:hover:text-secondary', 'dark:hover:text-accent',
    // Animation classes
    'animate-float', 'animate-fade-in', 'animate-slide-up', 'animate-scale-in',
    'animate-pulse', 'animate-spin-slow', 'animate-bounce-slow',
    // Z-index utilities
    'z-dropdown', 'z-sticky', 'z-fixed', 'z-modal', 'z-popover', 'z-toast', 'z-tooltip'
  ],
  corePlugins: {
    preflight: true,
  },
  theme: {
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
      '3xl': '1920px',
      '4xl': '2560px',
    },
    zIndex: {
      auto: 'auto',
      base: '0',
      dropdown: '1000',
      sticky: '1020',
      fixed: '1030',
      modal: '1040',
      popover: '1050',
      toast: '1060',
      tooltip: '1070',
    },
    fontFamily: {
      sans: ['Inter var', 'Inter', ...defaultTheme.fontFamily.sans],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    extend: {
      colors: {
        // CSS Variables for Theming
        transparent: 'transparent',
        current: 'currentColor',
        
        // Semantic color names using CSS variables
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary) / 0.9)',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary) / 0.9)',
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent) / 0.9)',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        
        // UI Colors
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        card: 'rgb(var(--color-card) / <alpha-value>)',
        border: 'rgb(var(--color-border) / <alpha-value>)',
        background: 'rgb(var(--color-bg) / <alpha-value>)',
        foreground: 'rgb(var(--color-text) / <alpha-value>)',
        
        // Status Colors
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        danger: 'rgb(var(--color-danger) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        
        // Special Colors
        'neon-blue': 'rgb(var(--neon-blue) / <alpha-value>)',
        'neon-pink': 'rgb(var(--neon-pink) / <alpha-value>)',
        
        // Light/Dark Theme Colors
        light: {
          bg: '#F8FAFF',
          gradient: 'linear-gradient(135deg, #f1f5ff 0%, #ffffff 100%)',
          text: {
            title: '#1F2233',
            body: '#4C5466',
            muted: '#94A3B8',
          },
          status: {
            success: '#22C55E',
            error: '#EF4444',
            warning: '#FACC15',
          },
          glass: {
            DEFAULT: 'rgba(255, 255, 255, 0.45)',
            border: 'rgba(255, 255, 255, 0.3)',
            shadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
          },
        },
        dark: {
          bg: {
            DEFAULT: '#0D1117',
            gradient: 'linear-gradient(135deg, #0E1525 0%, #1F2233 100%)',
          },
          primary: {
            DEFAULT: '#6C9FF6',
            hover: '#A78BFA',
          },
          secondary: '#A78BFA',
          accent: {
            cyan: '#67E8F9',
            pink: '#F472B6',
          },
          text: {
            heading: '#E2E8F0',
            body: '#94A3B8',
            muted: '#64748B',
          },
          status: {
            success: '#10B981',
            error: '#F87171',
            warning: '#F59E0B',
          },
          glass: {
            DEFAULT: 'rgba(255, 255, 255, 0.08)',
            border: 'rgba(255, 255, 255, 0.12)',
            shadow: '0 6px 40px rgba(0, 0, 0, 0.3)',
          },
        },
      },
      backgroundImage: {
        'grid': "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e')",
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'bounce-subtle': 'bounce 3s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0) translateX(0) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) translateX(5px) rotate(1deg)' },
          '50%': { transform: 'translateY(5px) translateX(-5px) rotate(-1deg)' },
          '75%': { transform: 'translateY(-5px) translateX(10px) rotate(1deg)' },
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(-5%)',
            'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)'
          },
          '50%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)'
          },
        },
      },
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code VF', 'Fira Code', ...defaultTheme.fontFamily.mono],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
        'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
        'soft': '0 4px 20px -3px rgba(0, 0, 0, 0.1)',
        'soft-dark': '0 4px 20px -3px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 10px theme(colors.primary.500/20)',
        'glow-dark': '0 0 15px theme(colors.primary.400/30)',
        'none': 'none',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6C9FF6 0%, #A78BFA 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #5A6BD8 0%, #9F6BFF 100%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient-x': 'gradient-x 15s ease infinite',
        'pulse-glow': 'pulse-glow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-glow-pink': 'pulse-glow-pink 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'pulse-glow': {
          '0%, 100%': {
            'box-shadow': '0 0 0 0 rgba(108, 159, 246, 0.7)',
            'transform': 'scale(1)',
          },
          '50%': {
            'box-shadow': '0 0 20px 10px rgba(108, 159, 246, 0)',
            'transform': 'scale(1.02)',
          },
        },
        'pulse-glow-pink': {
          '0%, 100%': {
            'box-shadow': '0 0 0 0 rgba(244, 114, 182, 0.7)',
            'transform': 'scale(1)',
          },
          '50%': {
            'box-shadow': '0 0 20px 10px rgba(244, 114, 182, 0)',
            'transform': 'scale(1.02)',
          },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.800'),
              },
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.200'),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/container-queries'),
    require('tailwind-scrollbar'),
    require('tailwindcss-animate'),
  ],
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover', 'motion-safe', 'motion-reduce'],
      textColor: ['group-hover', 'focus-within', 'motion-safe', 'motion-reduce'],
      animation: ['motion-safe', 'motion-reduce'],
      transitionProperty: ['motion-safe', 'motion-reduce'],
      transform: ['motion-safe', 'motion-reduce'],
      scrollbar: ['rounded', 'dark'],
    },
  },
}
