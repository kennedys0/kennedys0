'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import {
  Shield,
  Menu,
  X,
  FileCode2,
  Terminal,
  Send,
  BookOpen,
  Award,
  Layers,
  Wrench,
  User,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Expertise', href: '/expertise' },
  { label: 'Research', href: '/research' },
  { label: 'Methodology', href: '/methodology' },
  { label: 'Tools', href: '/tools' },
  { label: 'Writeups', href: '/writeups' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(11, 15, 21, 0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: `1px solid ${clayColors.borderSubtle}`,
        top: 0,
        zIndex: 1100,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 68, justifyContent: 'space-between' }}>
          {/* Brand Wordmark */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 2px 6px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: clayColors.accentPrimary,
              }}
            >
              <Shield size={18} strokeWidth={2.2} />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  color: clayColors.textPrimary,
                  lineHeight: 1.1,
                }}
              >
                FEKOJEWAN
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: clayColors.textMuted,
                  fontSize: '0.68rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Security Researcher
              </Typography>
            </Box>
          </Link>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: 'none', lg: 'flex' },
              alignItems: 'center',
              gap: 0.5,
              backgroundColor: clayColors.surfaceInset,
              padding: '4px 6px',
              borderRadius: '12px',
              border: `1px solid ${clayColors.borderSubtle}`,
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
            }}
          >
            {NAV_LINKS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  size="small"
                  sx={{
                    color: isActive ? clayColors.textPrimary : clayColors.textSecondary,
                    fontSize: '0.84rem',
                    fontWeight: isActive ? 600 : 500,
                    padding: '5px 12px',
                    borderRadius: '8px',
                    backgroundColor: isActive ? clayColors.surfaceRaised : 'transparent',
                    boxShadow: isActive
                      ? '0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)'
                      : 'none',
                    border: isActive ? `1px solid ${clayColors.borderSubtle}` : '1px solid transparent',
                    '&:hover': {
                      backgroundColor: isActive ? clayColors.surfaceRaised : 'rgba(255,255,255,0.03)',
                      color: clayColors.textPrimary,
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>

          {/* Action CTAs */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1.5 }}>
            <Button
              component={Link}
              href="/challenge"
              variant="outlined"
              size="small"
              startIcon={<Send size={14} />}
              sx={{
                fontSize: '0.82rem',
                border: `1px solid ${clayColors.borderSubtle}`,
                color: clayColors.textPrimary,
                borderRadius: '9px',
                padding: '6px 14px',
                backgroundColor: clayColors.surfaceRaised,
                boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
                '&:hover': {
                  borderColor: clayColors.borderActive,
                  backgroundColor: 'rgba(56, 189, 248, 0.05)',
                },
              }}
            >
              Challenge Me
            </Button>
            <Button
              component={Link}
              href="/arena"
              variant="contained"
              size="small"
              startIcon={<Terminal size={14} />}
              sx={{
                fontSize: '0.82rem',
                backgroundColor: clayColors.accentPrimary,
                color: '#081018',
                borderRadius: '9px',
                padding: '6px 14px',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(56, 189, 248, 0.3)',
                '&:hover': {
                  backgroundColor: '#7dd3fc',
                },
              }}
            >
              Security Arena
            </Button>
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{
              display: { xs: 'flex', lg: 'none' },
              color: clayColors.textPrimary,
              border: `1px solid ${clayColors.borderSubtle}`,
              borderRadius: '8px',
              backgroundColor: clayColors.surfaceRaised,
              p: 1,
            }}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </IconButton>
        </Toolbar>
      </Container>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: clayColors.surfaceRaised,
            p: 2,
            borderLeft: `1px solid ${clayColors.borderSubtle}`,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem', color: clayColors.textPrimary }}>
            FEKOJEWAN
          </Typography>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: clayColors.textSecondary }} aria-label="Close menu">
            <X size={20} />
          </IconButton>
        </Box>

        <List sx={{ p: 0 }}>
          {NAV_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <ListItem key={item.href} disablePadding sx={{ mb: 0.5 }}>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={toggleDrawer(false)}
                  sx={{
                    borderRadius: '8px',
                    backgroundColor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'transparent',
                    color: isActive ? clayColors.accentPrimary : clayColors.textPrimary,
                    py: 1,
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.9rem',
                      fontWeight: isActive ? 700 : 500,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          <Button
            component={Link}
            href="/challenge"
            onClick={toggleDrawer(false)}
            variant="outlined"
            fullWidth
            startIcon={<Send size={15} />}
            sx={{ fontSize: '0.85rem' }}
          >
            Challenge Me
          </Button>
          <Button
            component={Link}
            href="/arena"
            onClick={toggleDrawer(false)}
            variant="contained"
            fullWidth
            startIcon={<Terminal size={15} />}
            sx={{ fontSize: '0.85rem' }}
          >
            Security Arena
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
