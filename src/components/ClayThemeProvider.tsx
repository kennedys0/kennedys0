'use client';

import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { clayTheme } from '@/lib/theme';

export default function ClayThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <AppRouterCacheProvider options={{ enableCssLayer: false }}>
      <ThemeProvider theme={clayTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
