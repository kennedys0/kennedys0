import * as React from 'react';
import Link from 'next/link';
import { Container, Box, Typography, Grid, Divider } from '@mui/material';
import { Shield, KeyRound, Mail, GitBranch, FileCheck2 } from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: clayColors.bgFlat,
        borderTop: `1px solid ${clayColors.borderSubtle}`,
        pt: 6,
        pb: { xs: 12, md: 6 }, // Add clearance for mobile bottom dock
        mt: 10,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Brand & Purpose */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: '7px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: clayColors.accentPrimary,
                }}
              >
                <Shield size={16} />
              </Box>
              <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1rem', color: clayColors.textPrimary }}>
                FEKOJEWAN
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2, pr: 2 }}>
              Independent Bug Bounty Hunter specializing in Web Application and API Security. Breaking assumptions, securing systems, and turning technical findings into actionable insights.
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: clayColors.textMuted, fontSize: '0.8rem' }}>
              <KeyRound size={14} />
              <span>PGP: 4A8E 9B01 2F6D 8C33 1A90</span>
            </Box>
          </Grid>

          {/* Quick Nav */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
              Research & Labs
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/research" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Vulnerability Findings
              </Link>
              <Link href="/methodology" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Research Methodology
              </Link>
              <Link href="/writeups" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Technical Writeups
              </Link>
              <Link href="/arena" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Security Arena
              </Link>
            </Box>
          </Grid>

          {/* Platform & Governance */}
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
              Engagement
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="/challenge" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Challenge Me
              </Link>
              <Link href="/expertise" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Security Focus Areas
              </Link>
              <Link href="/tools" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Tools & Workflow
              </Link>
              <Link href="/contact" style={{ textDecoration: 'none', color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                Responsible Disclosure
              </Link>
            </Box>
          </Grid>

          {/* Ethical Disclosure Commitment */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
              Ethical Standards
            </Typography>
            <Box
              sx={{
                p: 2,
                borderRadius: '10px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                <FileCheck2 size={15} color={clayColors.success} />
                <Typography variant="caption" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                  Strict Safe Harbor
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: clayColors.textSecondary, display: 'block', lineHeight: 1.5 }}>
                All research strictly adheres to authorized scope, coordinated vulnerability disclosure, and privacy protections. No automated port scanning or destructive tests.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: clayColors.borderSubtle }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: clayColors.textMuted }}>
            © {new Date().getFullYear()} FEKOJEWAN. All rights reserved. Crafted with Human Clay UI.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link href="/contact" style={{ textDecoration: 'none', color: clayColors.textMuted, fontSize: '0.78rem' }}>
              PGP Key
            </Link>
            <Link href="/challenge" style={{ textDecoration: 'none', color: clayColors.textMuted, fontSize: '0.78rem' }}>
              Submit Scope
            </Link>
            <Link href="/admin" style={{ textDecoration: 'none', color: clayColors.textMuted, fontSize: '0.78rem' }}>
              Portal Access
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
