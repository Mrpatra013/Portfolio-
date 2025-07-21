import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'accent-primary': 'var(--accent-primary)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'accent-highlight': 'var(--accent-highlight)',
        'space-dark': 'var(--space-dark)',
        'space-nebula': 'var(--space-nebula)',
        'space-glow': 'var(--space-glow)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(76, 201, 240, 0.3)' },
          '100%': { boxShadow: '0 0 20px rgba(76, 201, 240, 0.6)' },
        },
      },
      backgroundImage: {
        'space-gradient': 'radial-gradient(circle at 25% 25%, rgba(114, 9, 183, 0.2) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(76, 201, 240, 0.15) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};

export default config;