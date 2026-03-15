// styles/design-tokens.ts

export const colors = {
  background: '#000000',
  backgroundAlpha: 'rgba(0, 0, 0, 0.8)',
  border: 'rgba(255, 255, 255, 0.1)',
  primary: {
    DEFAULT: '#22d3ee', // cyan-400
    hover: '#06b6d4',   // cyan-500
  },
  text: {
    primary: '#ffffff',
    secondary: '#a3a3a3', // neutral-400
    tertiary: '#737373',   // neutral-500
  },
  input: {
    bg: 'rgba(255, 255, 255, 0.05)',
    focus: 'rgba(255, 255, 255, 0.1)',
  },
};

export const spacing = {
  navbarHeight: '5.5rem',       // matches h-22 (5.5rem)
  containerPadding: '1.5rem',   // px-6
  gap: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },
};

export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    black: 900,
  },
};