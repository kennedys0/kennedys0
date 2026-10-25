'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, Typography } from '@mui/material';
import { Home, ShieldAlert, Send, Terminal, MoreHorizontal } from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function MobileBottomDock() {
  const pathname = usePathname();

  const DOCK_ITEMS = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Research', href: '/research', icon: ShieldAlert },
    { label: 'Challenge', href: '/challenge', icon: Send },
    { label: 'Arena', href: '/arena', icon: Terminal },
    { label: 'More', href: '/about', icon: MoreHorizontal },
  ];

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1050,
        padding: '8px 16px',
        paddingBottom: 'calc(8px + env(safe-area-inset-bottom, 0px))',
        justifyContent: 'center',
        pointerEvents: 'none',
      }}
    >
      <Box
        sx={{
          pointerEvents: 'auto',
          width: '100%',
          maxWidth: 420,
          backgroundColor: 'rgba(21, 30, 42, 0.95)',
          backdropFilter: 'blur(16px)',
          borderRadius: '16px',
          border: `1px solid ${clayColors.borderSubtle}`,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '6px 8px',
        }}
      >
        {DOCK_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 1,
                padding: '4px 0',
                transition: 'all 0.15s ease',
              }}
            >
              <Box
                sx={{
                  width: 38,
                  height: 38,
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isActive ? clayColors.surfaceInset : 'transparent',
                  color: isActive ? clayColors.accentPrimary : clayColors.textSecondary,
                  boxShadow: isActive
                    ? 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)'
                    : 'none',
                  border: isActive ? `1px solid ${clayColors.borderSubtle}` : '1px solid transparent',
                  transition: 'all 0.15s ease',
                }}
              >
                <Icon size={18} strokeWidth={isActive ? 2.3 : 1.9} />
              </Box>
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.66rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? clayColors.textPrimary : clayColors.textMuted,
                  mt: 0.25,
                  letterSpacing: '0.01em',
                }}
              >
                {item.label}
              </Typography>
            </Link>
          );
        })}
      </Box>
    </Box>
  );
}
