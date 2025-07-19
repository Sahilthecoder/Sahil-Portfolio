/** 
 * Premium Tailwind CSS Configuration
 * Enhanced with modern features, plugins, and optimizations
 */
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');

// Custom color palette with modern, accessible colors
const customColors = {
  // Primary brand color
  primary: {
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
    DEFAULT: '#0ea5e9',
  },
  // Secondary brand color
  secondary: {
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
    DEFAULT: '#8b5cf6',
  },
  // Accent color
  accent: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    DEFAULT: '#22c55e',
  },
  // Dark mode colors
  dark: {
    900: '#0f172a',
    800: '#1e293b',
    700: '#334155',
    600: '#475569',
  },
  // Light mode colors
  light: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
  },
};

module.exports = {
  // Future features
  future: {
    hoverOnlyWhenSupported: true,
    respectDefaultRingColorOpacity: true,
    disableColorOpacityUtilitiesByDefault: true,
  },
  experimental: {
    optimizeUniversalDefaults: true,
  },
  // Content sources for PurgeCSS
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  
  // Dark mode configuration
  darkMode: ['class', '[data-mode="dark"]'],
  
  // Important for overriding other styles when needed
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
    // Responsive breakpoints
    screens: {
      'xs': '360px',
      ...defaultTheme.screens,
      '3xl': '1920px',
      '4xl': '2560px',
      'tall': { 'raw': '(min-height: 800px)' },
      'short': { 'raw': '(max-height: 600px)' },
    },
    
    // Container configuration
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px',
      },
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
    // Typography settings
    fontFamily: {
      sans: [
        'Inter var', 
        'ui-sans-serif', 
        'system-ui', 
        '-apple-system', 
        'BlinkMacSystemFont', 
        'Segoe UI', 
        'Roboto', 
        'Helvetica Neue', 
        'Arial', 
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      mono: [
        'ui-monospace', 
        'SFMono-Regular', 
        'Menlo', 
        'Monaco', 
        'Consolas', 
        'Liberation Mono', 
        'Courier New', 
        'monospace'
      ],
      display: ['Cal Sans', 'Inter var', 'sans-serif'],
    },
    
    // Font size settings with fluid typography
    fontSize: {
      'xs': ['0.75rem', { lineHeight: '1rem' }],
      'sm': ['0.875rem', { lineHeight: '1.25rem' }],
      'base': ['1rem', { lineHeight: '1.5rem' }],
      'lg': ['1.125rem', { lineHeight: '1.75rem' }],
      'xl': ['1.25rem', { lineHeight: '1.75rem' }],
      '2xl': ['1.5rem', { lineHeight: '2rem' }],
      '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
      '5xl': ['3rem', { lineHeight: '1' }],
      '6xl': ['3.75rem', { lineHeight: '1' }],
      '7xl': ['4.5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    
    // Font weight settings
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },
    
    // Letter spacing settings
    letterSpacing: {
      tighter: '-0.05em',
      tight: '-0.025em',
      normal: '0em',
      wide: '0.025em',
      wider: '0.05em',
      widest: '0.1em',
    },
    
    // Line height settings
    lineHeight: {
      none: '1',
      tight: '1.25',
      snug: '1.375',
      normal: '1.5',
      relaxed: '1.625',
      loose: '2',
      3: '.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
      10: '2.5rem',
    },
    extend: {
      colors: {
        // CSS Variables for Theming
        transparent: 'transparent',
        current: 'currentColor',
        ...customColors,
        
        // Semantic color names using CSS variables
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          hover: 'rgb(var(--color-primary) / 0.9)',
          ...customColors.primary,
        },
        secondary: {
          DEFAULT: 'rgb(var(--color-secondary) / <alpha-value>)',
          hover: 'rgb(var(--color-secondary) / 0.9)',
          ...customColors.secondary,
        },
        accent: {
          DEFAULT: 'rgb(var(--color-accent) / <alpha-value>)',
          hover: 'rgb(var(--color-accent) / 0.9)',
          ...customColors.accent,
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
      // Animation timing functions
      transitionTimingFunction: {
        'in-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-expo': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'in-back': 'cubic-bezier(0.6, -0.28, 0.735, 0.045)',
        'out-back': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        'in-out-back': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      
      // Custom animations
      animation: {
        // Basic animations
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-down': 'fadeDown 0.6s ease-out forwards',
        'fade-left': 'fadeLeft 0.6s ease-out forwards',
        'fade-right': 'fadeRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-out': 'scaleOut 0.3s cubic-bezier(0.87, 0, 0.13, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-left': 'slideLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-right': 'slideRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        
        // Special effects
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-fast': 'float 4s ease-in-out infinite',
        'pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'ping-fast': 'ping 0.75s cubic-bezier(0, 0, 0.2, 1) infinite',
        'spin': 'spin 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
        'spin-fast': 'spin 0.5s linear infinite',
        'bounce': 'bounce 1s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'bounce-fast': 'bounce 0.5s infinite',
        'bounce-subtle': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeRight: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scaleOut: {
          '0%': { opacity: '1', transform: 'scale(1)' },
          '100%': { opacity: '0', transform: 'scale(0.9)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.800'),
            a: {
              color: theme('colors.primary.600'),
              '&:hover': {
                color: theme('colors.primary.800')
              }
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.primary.400'),
              '&:hover': {
                color: theme('colors.primary.200')
              }
            }
          }
        }
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
    require('tailwindcss-text-balance'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar'),
    require('tailwindcss-animate'),
    plugin(function({ addBase, theme }) {
      addBase({
        ':root': {
          '--color-primary': '14 165 233',
          '--color-secondary': '139 92 246',
          '--color-accent': '34 197 94',
          '--color-text': '15 23 42',
          '--color-bg': '255 255 255',
          '--color-muted': '100 116 139',
          '--color-card': '255 255 255',
          '--color-border': '226 232 240',
          '--color-success': '22 163 74',
          '--color-warning': '234 179 8',
          '--color-danger': '220 38 38',
          '--color-info': '59 130 246',
          '--neon-blue': '59 130 246',
          '--neon-pink': '236 72 153',
        },
        '.dark': {
          '--color-primary': '108 159 246',
          '--color-secondary': '167 139 250',
          '--color-accent': '34 197 94',
          '--color-text': '226 232 240',
          '--color-bg': '13 17 23',
          '--color-muted': '100 116 139',
          '--color-card': '30 41 59',
          '--color-border': '51 65 85',
          '--color-success': '16 185 129',
          '--color-warning': '245 158 11',
          '--color-danger': '248 113 113',
          '--color-info': '59 130 246',
        },
      });
    }),
  ],
  variants: {
    extend: {
      backgroundColor: ['active', 'group-hover', 'motion-safe', 'motion-reduce'],
      textColor: ['group-hover', 'focus-within', 'motion-safe', 'motion-reduce'],
      opacity: ['disabled', 'group-hover'],
      scale: ['active', 'group-hover'],
      transform: ['motion-safe', 'motion-reduce'],
      animation: ['motion-safe', 'motion-reduce', 'hover', 'focus'],
      transitionProperty: ['motion-safe', 'motion-reduce'],
      transitionDuration: ['motion-safe', 'motion-reduce'],
      transitionTimingFunction: ['motion-safe', 'motion-reduce'],
      transitionDelay: ['motion-safe', 'motion-reduce'],
      width: ['responsive', 'hover', 'focus'],
      height: ['responsive', 'hover', 'focus'],
      padding: ['responsive', 'hover', 'focus'],
      margin: ['responsive', 'hover', 'focus'],
      borderRadius: ['responsive', 'hover', 'focus'],
      borderWidth: ['responsive', 'hover', 'focus'],
      boxShadow: ['responsive', 'hover', 'focus', 'active'],
      zIndex: ['responsive', 'hover', 'focus'],
      position: ['responsive', 'hover', 'focus'],
      inset: ['responsive', 'hover', 'focus'],
      display: ['responsive', 'group-hover', 'group-focus'],
      visibility: ['responsive', 'group-hover', 'group-focus'],
      overflow: ['responsive', 'hover', 'focus'],
      whitespace: ['responsive', 'hover', 'focus'],
      textOverflow: ['responsive', 'hover', 'focus'],
      textDecoration: ['responsive', 'hover', 'focus', 'group-hover'],
      textTransform: ['responsive', 'hover', 'focus'],
      fontStyle: ['responsive', 'hover', 'focus'],
      fontWeight: ['responsive', 'hover', 'focus', 'group-hover'],
      textAlign: ['responsive', 'hover', 'focus'],
      verticalAlign: ['responsive', 'hover', 'focus'],
      listStyleType: ['responsive', 'hover', 'focus'],
      listStylePosition: ['responsive', 'hover', 'focus'],
      placeholderColor: ['responsive', 'dark', 'focus'],
      placeholderOpacity: ['responsive', 'dark', 'focus'],
      lineClamp: ['responsive', 'hover', 'focus'],
      aspectRatio: ['responsive', 'hover', 'focus'],
      cursor: ['responsive', 'hover', 'focus'],
      userSelect: ['responsive', 'hover', 'focus'],
      pointerEvents: ['responsive', 'hover', 'focus'],
      resize: ['responsive', 'hover', 'focus'],
      objectFit: ['responsive', 'hover', 'focus'],
      objectPosition: ['responsive', 'hover', 'focus'],
      fill: ['responsive', 'hover', 'focus'],
      stroke: ['responsive', 'hover', 'focus'],
      strokeWidth: ['responsive', 'hover', 'focus'],
      outline: ['responsive', 'hover', 'focus'],
      ringWidth: ['responsive', 'hover', 'focus'],
      ringColor: ['responsive', 'dark', 'hover', 'focus'],
      ringOffsetWidth: ['responsive', 'hover', 'focus'],
      ringOffsetColor: ['responsive', 'dark', 'hover', 'focus'],
      ringOpacity: ['responsive', 'dark', 'hover', 'focus'],
      ringOffset: ['responsive', 'hover', 'focus'],
      ring: ['responsive', 'hover', 'focus'],
      backdropBlur: ['responsive', 'hover', 'focus'],
      backdropBrightness: ['responsive', 'hover', 'focus'],
      backdropContrast: ['responsive', 'hover', 'focus'],
      backdropGrayscale: ['responsive', 'hover', 'focus'],
      backdropHueRotate: ['responsive', 'hover', 'focus'],
      backdropInvert: ['responsive', 'hover', 'focus'],
      backdropOpacity: ['responsive', 'hover', 'focus'],
      backdropSaturate: ['responsive', 'hover', 'focus'],
      backdropSepia: ['responsive', 'hover', 'focus'],
      blur: ['responsive', 'hover', 'focus'],
      brightness: ['responsive', 'hover', 'focus'],
      contrast: ['responsive', 'hover', 'focus'],
      dropShadow: ['responsive', 'hover', 'focus'],
      grayscale: ['responsive', 'hover', 'focus'],
      hueRotate: ['responsive', 'hover', 'focus'],
      invert: ['responsive', 'hover', 'focus'],
      saturate: ['responsive', 'hover', 'focus'],
      sepia: ['responsive', 'hover', 'focus'],
      filter: ['responsive', 'hover', 'focus'],
      backdropFilter: ['responsive', 'hover', 'focus'],
      scrollBehavior: ['responsive', 'hover', 'focus'],
      scrollMargin: ['responsive', 'hover', 'focus'],
      scrollPadding: ['responsive', 'hover', 'focus'],
      scrollSnapAlign: ['responsive', 'hover', 'focus'],
      scrollSnapStop: ['responsive', 'hover', 'focus'],
      scrollSnapType: ['responsive', 'hover', 'focus'],
      touchAction: ['responsive', 'hover', 'focus'],
      willChange: ['responsive', 'hover', 'focus'],
      content: ['responsive', 'hover', 'focus'],
      cursor: ['responsive', 'hover', 'focus'],
      pointerEvents: ['responsive', 'hover', 'focus'],
      resize: ['responsive', 'hover', 'focus'],
      userSelect: ['responsive', 'hover', 'focus'],
    },
  },
};
