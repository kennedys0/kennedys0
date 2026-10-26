'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  Menu as MuiMenu,
  MenuItem,
  ListItemIcon,
} from '@mui/material';
import {
  Menu,
  X,
  Terminal,
  Send,
  ChevronDown,
  Wrench,
  User,
  Mail,
  Home,
  ShieldCheck,
  FileCode,
  Layers,
  Compass,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';

const PRIMARY_LINKS = [
  { label: 'Research', href: '/research', icon: ShieldCheck },
  { label: 'Writeups', href: '/writeups', icon: FileCode },
  { label: 'Expertise', href: '/expertise', icon: Layers },
  { label: 'Methodology', href: '/methodology', icon: Compass },
];

const SECONDARY_LINKS = [
  { label: 'Tools', href: '/tools', icon: Wrench },
  { label: 'About', href: '/about', icon: User },
  { label: 'Contact', href: '/contact', icon: Mail },
];

const ALL_LINKS = [
  ...PRIMARY_LINKS,
  ...SECONDARY_LINKS,
];

const MOBILE_NAV_LINKS = [
  { label: 'Home', href: '/', icon: Home },
  ...ALL_LINKS,
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(null);

  const toggleDrawer = (open: boolean) => () => {
    setMobileOpen(open);
  };

  const handleOpenMore = (event: React.MouseEvent<HTMLElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };

  const handleCloseMore = () => {
    setMoreAnchorEl(null);
  };

  const isRouteActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  const isAnySecondaryActive = SECONDARY_LINKS.some((item) => isRouteActive(item.href));

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'rgba(11, 15, 21, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid ${clayColors.borderSubtle}`,
        boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.5), inset 0 -1px 0 rgba(255, 255, 255, 0.02)',
        top: 0,
        zIndex: 1100,
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          disableGutters
          sx={{
            height: 72,
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: { xs: 1, md: 1.5, lg: 2 },
          }}
        >
          {/* Brand Wordmark & Availability */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #182332 0%, #111823 100%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: '3px',
                transition: 'transform 0.1s ease',
                '&:active': { transform: 'scale(0.96)' },
              }}
            >
              <Image
                src="/logo.png"
                alt="FEKOJEWAN Logo"
                width={32}
                height={32}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                priority
              />
            </Box>
            <Box sx={{ whiteSpace: 'nowrap' }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.05rem',
                  letterSpacing: '0.04em',
                  color: clayColors.textPrimary,
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                }}
              >
                FEKOJEWAN
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.3 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                    boxShadow: '0 0 6px rgba(16, 185, 129, 0.75)',
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: clayColors.textMuted,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    lineHeight: 1,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Security Researcher
                </Typography>
              </Box>
            </Box>
          </Link>

          {/* Desktop Navigation Links */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.3,
              backgroundColor: 'rgba(14, 20, 29, 0.85)',
              padding: '3px 4px',
              borderRadius: '12px',
              border: `1px solid ${clayColors.borderSubtle}`,
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255, 255, 255, 0.02)',
              flexShrink: 0,
            }}
          >
            {/* Primary Links (Always visible on md and up) */}
            {PRIMARY_LINKS.map((item) => {
              const isActive = isRouteActive(item.href);
              return (
                <Button
                  key={item.href}
                  component={Link}
                  href={item.href}
                  size="small"
                  sx={{
                    color: isActive ? '#ffffff' : clayColors.textSecondary,
                    fontSize: { md: '0.8rem', lg: '0.84rem' },
                    fontWeight: isActive ? 600 : 500,
                    padding: { md: '5px 8px', lg: '5px 12px' },
                    borderRadius: '9px',
                    backgroundColor: isActive ? clayColors.surfaceRaised : 'transparent',
                    boxShadow: isActive
                      ? '0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
                      : 'none',
                    border: isActive
                      ? '1px solid rgba(255, 255, 255, 0.08)'
                      : '1px solid transparent',
                    whiteSpace: 'nowrap',
                    textTransform: 'none',
                    minWidth: 'auto',
                    transition: 'color 0.15s ease, background-color 0.15s ease, transform 0.1s ease',
                    '&:hover': {
                      backgroundColor: isActive ? clayColors.surfaceRaised : 'rgba(255,255,255,0.04)',
                      color: '#ffffff',
                    },
                    '&:active': {
                      transform: 'scale(0.96)',
                    },
                  }}
                >
                  {item.label}
                </Button>
              );
            })}

            {/* Secondary Links (Directly visible on large screens >= 1200px) */}
            <Box sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', gap: 0.3 }}>
              {SECONDARY_LINKS.map((item) => {
                const isActive = isRouteActive(item.href);
                return (
                  <Button
                    key={item.href}
                    component={Link}
                    href={item.href}
                    size="small"
                    sx={{
                      color: isActive ? '#ffffff' : clayColors.textSecondary,
                      fontSize: '0.84rem',
                      fontWeight: isActive ? 600 : 500,
                      padding: '5px 12px',
                      borderRadius: '9px',
                      backgroundColor: isActive ? clayColors.surfaceRaised : 'transparent',
                      boxShadow: isActive
                        ? '0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
                        : 'none',
                      border: isActive
                        ? '1px solid rgba(255, 255, 255, 0.08)'
                        : '1px solid transparent',
                      whiteSpace: 'nowrap',
                      textTransform: 'none',
                      minWidth: 'auto',
                      transition: 'color 0.15s ease, background-color 0.15s ease, transform 0.1s ease',
                      '&:hover': {
                        backgroundColor: isActive ? clayColors.surfaceRaised : 'rgba(255,255,255,0.04)',
                        color: '#ffffff',
                      },
                      '&:active': {
                        transform: 'scale(0.96)',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* "More" Dropdown on medium screens (900px - 1199px) */}
            <Box sx={{ display: { xs: 'none', md: 'flex', lg: 'none' } }}>
              <Button
                size="small"
                onClick={handleOpenMore}
                endIcon={<ChevronDown size={14} />}
                sx={{
                  color: isAnySecondaryActive ? '#ffffff' : clayColors.textSecondary,
                  fontSize: '0.8rem',
                  fontWeight: isAnySecondaryActive ? 600 : 500,
                  padding: '5px 8px',
                  borderRadius: '9px',
                  backgroundColor: isAnySecondaryActive ? clayColors.surfaceRaised : 'transparent',
                  boxShadow: isAnySecondaryActive
                    ? '0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.08)'
                    : 'none',
                  border: isAnySecondaryActive
                    ? '1px solid rgba(255, 255, 255, 0.08)'
                    : '1px solid transparent',
                  whiteSpace: 'nowrap',
                  textTransform: 'none',
                  minWidth: 'auto',
                  transition: 'color 0.15s ease, background-color 0.15s ease, transform 0.1s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    color: '#ffffff',
                  },
                  '&:active': {
                    transform: 'scale(0.96)',
                  },
                }}
              >
                More
              </Button>
              <MuiMenu
                anchorEl={moreAnchorEl}
                open={Boolean(moreAnchorEl)}
                onClose={handleCloseMore}
                slotProps={{
                  backdrop: { invisible: true },
                }}
                PaperProps={{
                  sx: {
                    backgroundColor: '#1a2433',
                    border: '1px solid rgba(255, 255, 255, 0.14)',
                    borderRadius: '14px',
                    boxShadow: '0 16px 36px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                    mt: 1.2,
                    minWidth: 175,
                    p: 0.75,
                  },
                }}
              >
                {SECONDARY_LINKS.map((item) => {
                  const isActive = isRouteActive(item.href);
                  const Icon = item.icon;
                  return (
                    <MenuItem
                      key={item.href}
                      component={Link}
                      href={item.href}
                      onClick={handleCloseMore}
                      sx={{
                        borderRadius: '9px',
                        py: 1,
                        px: 1.5,
                        fontSize: '0.86rem',
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? '#38bdf8' : '#f1f5f9',
                        backgroundColor: isActive ? 'rgba(56, 189, 248, 0.12)' : 'transparent',
                        transition: 'background-color 0.12s ease, transform 0.1s ease',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                        },
                        '&:active': {
                          transform: 'scale(0.98)',
                        },
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 28, color: isActive ? '#38bdf8' : '#94a3b8' }}>
                        <Icon size={16} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{
                          fontSize: '0.86rem',
                          fontWeight: isActive ? 600 : 500,
                          color: 'inherit',
                        }}
                      />
                    </MenuItem>
                  );
                })}
              </MuiMenu>
            </Box>
          </Box>

          {/* Action CTAs */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              alignItems: 'center',
              gap: { sm: 1, md: 1.2 },
              flexShrink: 0,
            }}
          >
            <Button
              component={Link}
              href="/challenge"
              variant="outlined"
              size="small"
              startIcon={<Send size={14} />}
              sx={{
                fontSize: { sm: '0.78rem', md: '0.82rem' },
                fontWeight: 600,
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: clayColors.textPrimary,
                borderRadius: '10px',
                padding: { sm: '5px 10px', md: '6px 14px' },
                backgroundColor: clayColors.surfaceRaised,
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'border-color 0.15s ease, background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
                '&:hover': {
                  borderColor: clayColors.borderActive,
                  backgroundColor: 'rgba(56, 189, 248, 0.06)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                },
                '&:active': {
                  transform: 'scale(0.96)',
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
                fontSize: { sm: '0.78rem', md: '0.82rem' },
                backgroundColor: clayColors.accentPrimary,
                color: '#081018',
                borderRadius: '10px',
                padding: { sm: '5px 12px', md: '6px 15px' },
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(56, 189, 248, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(56, 189, 248, 0.8)',
                textTransform: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                transition: 'background-color 0.15s ease, transform 0.1s ease, box-shadow 0.15s ease',
                '&:hover': {
                  backgroundColor: '#7dd3fc',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 4px 14px rgba(56, 189, 248, 0.45)',
                },
                '&:active': {
                  transform: 'scale(0.96)',
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
              display: { xs: 'flex', md: 'none' },
              color: clayColors.textPrimary,
              border: `1px solid ${clayColors.borderSubtle}`,
              borderRadius: '9px',
              backgroundColor: clayColors.surfaceRaised,
              p: 1,
              '&:active': { transform: 'scale(0.96)' },
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
            p: 2.5,
            borderLeft: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '-8px 0 24px rgba(0, 0, 0, 0.6)',
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 28,
                height: 28,
                borderRadius: '8px',
                backgroundColor: clayColors.surfaceInset,
                border: `1px solid ${clayColors.borderSubtle}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: '3px',
              }}
            >
              <Image
                src="/logo.png"
                alt="FEKOJEWAN Logo"
                width={22}
                height={22}
                style={{ objectFit: 'contain', width: '100%', height: '100%' }}
              />
            </Box>
            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '0.98rem', color: clayColors.textPrimary }}>
              FEKOJEWAN
            </Typography>
          </Box>
          <IconButton onClick={toggleDrawer(false)} sx={{ color: clayColors.textSecondary }} aria-label="Close menu">
            <X size={20} />
          </IconButton>
        </Box>

        <List sx={{ p: 0 }}>
          {MOBILE_NAV_LINKS.map((item) => {
            const isActive = isRouteActive(item.href);
            const Icon = item.icon;
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
                    px: 1.5,
                    border: isActive ? `1px solid ${clayColors.borderActive}` : '1px solid transparent',
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: isActive ? clayColors.accentPrimary : clayColors.textSecondary }}>
                    <Icon size={18} />
                  </ListItemIcon>
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
            sx={{
              fontSize: '0.85rem',
              borderRadius: '9px',
              textTransform: 'none',
              fontWeight: 600,
              border: `1px solid ${clayColors.borderSubtle}`,
              color: clayColors.textPrimary,
            }}
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
            sx={{
              fontSize: '0.85rem',
              borderRadius: '9px',
              textTransform: 'none',
              fontWeight: 700,
              backgroundColor: clayColors.accentPrimary,
              color: '#081018',
            }}
          >
            Security Arena
          </Button>
        </Box>
      </Drawer>
    </AppBar>
  );
}
