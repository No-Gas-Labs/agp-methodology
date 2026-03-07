/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: '#0F172A', // Deep slate background
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
          500: '#64748B',
          400: '#78909C',
          300: '#CBD5E1',
          200: '#E2E8F0', // Primary text
          100: '#F1F5F9',
          50: '#F8FAFC',
        },
        cyan: {
          500: '#38BDF8', // Accent cyan
          400: '#22D3EE',
          300: '#06B6D4',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Source Serif 4', 'Georgia', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#E2E8F0',
            a: {
              color: '#38BDF8',
              '&:hover': {
                color: '#22D3EE',
              },
            },
            h1: {
              color: '#E2E8F0',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '700',
            },
            h2: {
              color: '#E2E8F0',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '700',
            },
            h3: {
              color: '#E2E8F0',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: '600',
            },
            strong: {
              color: '#E2E8F0',
            },
            code: {
              color: '#38BDF8',
              backgroundColor: '#1E293B',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
            },
            pre: {
              backgroundColor: '#1E293B',
              color: '#E2E8F0',
            },
            blockquote: {
              color: '#CBD5E1',
              borderLeftColor: '#38BDF8',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
