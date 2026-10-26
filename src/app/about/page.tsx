'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container, Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { Shield, Eye, FileText, Lock, CheckCircle, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function AboutPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Chip
              label="RESEARCHER PROFILE"
              size="small"
              sx={{
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: clayColors.accentPrimary,
                fontWeight: 700,
                fontSize: '0.72rem',
                mb: 1.5,
              }}
            />
            <Typography
              variant="h2"
              component="h1"
              sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, color: clayColors.textPrimary, mb: 2 }}
            >
              About FEKOJEWAN
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 800, lineHeight: 1.65 }}>
              Independent Bug Bounty Hunter and Security Researcher with a primary focus on Web Application Security and API Security architectures.
            </Typography>
          </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {/* Main Philosophy */}
          <Grid item xs={12} md={7}>
            <Paper
              sx={{
                p: { xs: 3.5, md: 4.5 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                mb: 4,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 2 }}>
                Security Philosophy
              </Typography>
              <Typography variant="body1" sx={{ color: clayColors.textSecondary, mb: 2.5, lineHeight: 1.7 }}>
                Modern software systems rarely fail due to missing syntax or primitive oversights; they fail because of broken assumptions made during architecture and integration. When microservices scale and developers prioritize velocity, the implicit boundaries between services often become permeable.
              </Typography>
              <Typography variant="body1" sx={{ color: clayColors.textSecondary, mb: 2.5, lineHeight: 1.7 }}>
                My research focuses on understanding the exact intent of developers, mapping the actual data pathways, and rigorously testing edge scenarios where authentication, authorization, or state synchronization deviate from intended design.
              </Typography>
              <Typography variant="body1" sx={{ color: clayColors.textSecondary, lineHeight: 1.7 }}>
                The ultimate goal of security research is not exploitation, but clarity: providing engineering teams with deterministic evidence, actionable remediation advice, and an architectural perspective that prevents recurring failure modes.
              </Typography>
            </Paper>

            <Paper
              sx={{
                p: { xs: 3.5, md: 4.5 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 2 }}>
                Responsible Disclosure Policy
              </Typography>
              <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2, lineHeight: 1.65 }}>
                Every vulnerability research activity is conducted strictly within authorized scope under coordinated vulnerability disclosure standards:
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  'Never access, alter, exfiltrate, or delete user data beyond demonstrating minimal proof of concept.',
                  'Never disrupt system availability or perform automated volumetric denial of service testing.',
                  'Submit comprehensive reports containing detailed technical impacts and clear reproduction steps directly to authorized security contacts.',
                  'Maintain strict confidentiality until coordinated fixes are deployed and program teams authorize technical publication.',
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
                    <ShieldCheck size={16} color={clayColors.success} style={{ marginTop: 3, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, lineHeight: 1.55 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* Research Focus & Standards Sidebar */}
          <Grid item xs={12} md={5}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: '16px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 2 }}>
                  Research Interests
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    { title: 'Broken Object Level Authorization (BOLA)', desc: 'Multi-tenant isolation and API tenant leakage.' },
                    { title: 'Complex Business Logic & TOCTOU', desc: 'Concurrency desynchronization in ledger & state machines.' },
                    { title: 'Federated GraphQL Subgraphs', desc: 'Entity resolver authorization and schema boundaries.' },
                    { title: 'Server-Side Request Handling', desc: 'Second-order SSRF in asynchronous worker pipelines.' },
                    { title: 'Authentication State Traps', desc: 'OAuth dynamic callback desync and JWT token confusion.' },
                  ].map((interest, i) => (
                    <Box key={i} sx={{ p: 1.8, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: clayColors.accentPrimary, fontSize: '0.86rem' }}>
                        {interest.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mt: 0.5 }}>
                        {interest.desc}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: '16px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                  Verified Engagements
                </Typography>
                <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2.5, fontSize: '0.88rem', lineHeight: 1.6 }}>
                  FEKOJEWAN works with engineering teams, bug bounty programs, and organizations to test and validate mission-critical Web and API attack surfaces.
                </Typography>
                <Button
                  component={Link}
                  href="/challenge"
                  variant="outlined"
                  fullWidth
                  endIcon={<ArrowRight size={14} />}
                  sx={{ borderRadius: '9px', fontSize: '0.85rem' }}
                >
                  Submit Authorized Scope
                </Button>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
