/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  important: true,
  corePlugins: {
    preflight: true,
  },
  theme: {
    fontFamily: {
      sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
    },
    extend: {
      backgroundImage: {
        'grid': "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgb(148 163 184 / 0.1)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e')"
      },
      colors: {
        primary: {
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
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
        },
        secondary: {
          DEFAULT: '#7c3aed',
          hover: '#6d28d9',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          hover: '#7c3cf5',
        },
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
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        mono: ['Fira Code VF', 'Fira Code', ...defaultTheme.fontFamily.mono],
      },
      backdropBlur: {
        xs: '2px',
        sm: '6px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
      boxShadow: {
        'glass-light': '0 4px 30px rgba(0, 0, 0, 0.05)',
        'glass-dark': '0 6px 40px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 15px rgba(108, 159, 246, 0.5)',
        'glow-pink': '0 0 15px rgba(244, 114, 182, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6C9FF6 0%, #A78BFA 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #5A6BD8 0%, #9F6BFF 100%)',
      },
      backdropBlur: {
        'xs': '2px',
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
  ],
}
