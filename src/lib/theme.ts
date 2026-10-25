import { createTheme, alpha } from '@mui/material/styles';

// Human Clay UI Design Tokens
export const clayColors = {
  // Environment Background
  bgDark: '#0b0f15',
  bgFlat: '#101721',
  
  // Surfaces
  surfaceRaised: '#151e2a',
  surfaceRaisedHighlight: 'rgba(255, 255, 255, 0.04)',
  surfaceInset: '#0e141d',
  
  // Borders & Dividers
  borderSubtle: 'rgba(255, 255, 255, 0.07)',
  borderActive: 'rgba(56, 189, 248, 0.35)',
  
  // Text
  textPrimary: '#edf2f7',
  textSecondary: '#94a3b8',
  textMuted: '#64748b',
  
  // Restrained Accents
  accentPrimary: '#38bdf8', // Sky Blue
  accentHover: '#0284c7',
  accentSubtle: 'rgba(56, 189, 248, 0.12)',
  
  // Semantic Indicators
  severityCritical: '#f87171',
  severityHigh: '#fb923c',
  severityMedium: '#facc15',
  severityLow: '#4ade80',
  severityInfo: '#60a5fa',
  
  success: '#34d399',
  warning: '#fbbf24',
  error: '#f87171',
};

export const clayTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: clayColors.accentPrimary,
      contrastText: '#081018',
    },
    background: {
      default: clayColors.bgDark,
      paper: clayColors.surfaceRaised,
    },
    text: {
      primary: clayColors.textPrimary,
      secondary: clayColors.textSecondary,
    },
    divider: clayColors.borderSubtle,
    success: { main: clayColors.success },
    warning: { main: clayColors.warning },
    error: { main: clayColors.error },
  },
  typography: {
    fontFamily: [
      'Plus Jakarta Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.025em',
      lineHeight: 1.15,
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h3: {
      fontWeight: 600,
      letterSpacing: '-0.015em',
      lineHeight: 1.25,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
    body1: {
      fontSize: '0.975rem',
      lineHeight: 1.6,
      color: clayColors.textSecondary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.55,
      color: clayColors.textMuted,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: clayColors.bgDark,
          color: clayColors.textPrimary,
          minHeight: '100vh',
          scrollBehavior: 'smooth',
        },
        '::selection': {
          backgroundColor: 'rgba(56, 189, 248, 0.25)',
          color: '#ffffff',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: clayColors.surfaceRaised,
          borderRadius: 14,
          border: `1px solid ${clayColors.borderSubtle}`,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          padding: '8px 18px',
          fontWeight: 600,
          transition: 'all 0.15s ease-out',
          '&:active': {
            transform: 'translateY(1px)',
          },
        },
        containedPrimary: {
          backgroundColor: clayColors.accentPrimary,
          color: '#081018',
          boxShadow: '0 2px 8px rgba(56, 189, 248, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
          '&:hover': {
            backgroundColor: '#7dd3fc',
            boxShadow: '0 4px 14px rgba(56, 189, 248, 0.35)',
          },
        },
        outlined: {
          borderColor: clayColors.borderSubtle,
          backgroundColor: clayColors.surfaceRaised,
          color: clayColors.textPrimary,
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.04)',
          '&:hover': {
            borderColor: 'rgba(255, 255, 255, 0.15)',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: clayColors.surfaceInset,
            borderRadius: 10,
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.35)',
            transition: 'border-color 0.15s ease',
            '& fieldset': {
              borderColor: clayColors.borderSubtle,
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&.Mui-focused fieldset': {
              borderColor: clayColors.accentPrimary,
              borderWidth: 1.5,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          fontSize: '0.75rem',
          height: 26,
        },
      },
    },
  },
});
