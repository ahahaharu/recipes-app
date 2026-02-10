export const theme = {
  colors: {
    primary: '#ff6b6b',
    secondary: '#333333',
    background: '#f9f9f9',
    white: '#ffffff',
    text: {
      main: '#333333',
      light: '#666666',
      muted: '#999999',
    },
    border: '#e0e0e0',
    error: '#e74c3c',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
  },
  shadows: {
    sm: '0 2px 4px rgba(0,0,0,0.05)',
    md: '0 4px 12px rgba(0,0,0,0.05)',
    lg: '0 8px 16px rgba(0,0,0,0.1)',
  },
} as const;
