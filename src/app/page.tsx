'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Chip,
  Paper,
} from '@mui/material';
import {
  Shield,
  ArrowRight,
  Terminal,
  Send,
  Lock,
  Layers,
  Search,
  CheckCircle2,
  FileText,
  AlertCircle,
  Cpu,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { RESEARCH_FINDINGS } from '@/lib/research-data';

export default function HomePage() {
  const featuredFindings = RESEARCH_FINDINGS.slice(0, 3);

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box
          sx={{
            py: { xs: 5, md: 8 },
            px: { xs: 3, md: 6 },
            borderRadius: { xs: '16px', md: '24px' },
            backgroundColor: clayColors.surfaceRaised,
            border: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            position: 'relative',
            overflow: 'hidden',
            mb: { xs: 6, md: 10 },
          }}
        >
          {/* Subtle Accent Glow */}
          <Box
            sx={{
              position: 'absolute',
              top: -80,
              right: -80,
              width: 240,
              height: 240,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <Box sx={{ maxWidth: 840 }}>
            {/* Status & Identity Indicator */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Chip
                icon={<Shield size={13} color={clayColors.accentPrimary} />}
                label="INDEPENDENT SECURITY RESEARCHER"
                size="small"
                sx={{
                  backgroundColor: clayColors.surfaceInset,
                  border: `1px solid ${clayColors.borderSubtle}`,
                  color: clayColors.textPrimary,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  px: 0.5,
                }}
              />
              <Chip
                label="ETHICAL DISCLOSURE"
                size="small"
                sx={{
                  backgroundColor: 'rgba(52, 211, 153, 0.1)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  color: clayColors.success,
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              />
            </Box>

            {/* Headline */}
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3.1rem', md: '3.8rem' },
                fontWeight: 800,
                color: clayColors.textPrimary,
                mb: 2.5,
                letterSpacing: '-0.03em',
              }}
            >
              Breaking Assumptions.{' '}
              <Box component="span" sx={{ color: clayColors.accentPrimary }}>
                Securing Systems.
              </Box>
            </Typography>

            {/* Supporting Copy */}
            <Typography
              variant="body1"
              sx={{
                fontSize: { xs: '1rem', md: '1.18rem' },
                lineHeight: 1.65,
                color: clayColors.textSecondary,
                mb: 4.5,
                maxWidth: 720,
              }}
            >
              Bug bounty hunter specializing in{' '}
              <Box component="strong" sx={{ color: clayColors.textPrimary, fontWeight: 600 }}>
                Web Application Security
              </Box>{' '}
              and{' '}
              <Box component="strong" sx={{ color: clayColors.textPrimary, fontWeight: 600 }}>
                API Security
              </Box>
              . Exploring attack surfaces, uncovering deep logic weaknesses, and translating technical discoveries into clear remediation guidance.
            </Typography>

            {/* Hero CTAs */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
                alignItems: { xs: 'stretch', sm: 'center' },
              }}
            >
              <Button
                component={Link}
                href="/research"
                variant="contained"
                size="large"
                endIcon={<ArrowRight size={16} />}
                sx={{
                  py: 1.4,
                  px: 3.5,
                  fontSize: '0.92rem',
                  fontWeight: 700,
                  borderRadius: '11px',
                }}
              >
                Explore Findings
              </Button>

              <Button
                component={Link}
                href="/challenge"
                variant="outlined"
                size="large"
                startIcon={<Send size={16} />}
                sx={{
                  py: 1.4,
                  px: 3,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  borderRadius: '11px',
                }}
              >
                Challenge Me
              </Button>

              <Button
                component={Link}
                href="/arena"
                variant="text"
                size="large"
                startIcon={<Terminal size={16} />}
                sx={{
                  py: 1.4,
                  px: 2.5,
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  color: clayColors.textSecondary,
                  '&:hover': { color: clayColors.textPrimary, backgroundColor: 'rgba(255,255,255,0.03)' },
                }}
              >
                Security Arena Lab
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Specialization Domains */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="caption"
              sx={{
                color: clayColors.accentPrimary,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 0.5,
              }}
            >
              Core Specialization
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2.1rem' }, color: clayColors.textPrimary }}>
              Research Focus Domains
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {/* Domain 1: Web App Security */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '18px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      backgroundColor: clayColors.surfaceInset,
                      border: `1px solid ${clayColors.borderSubtle}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: clayColors.accentPrimary,
                      mb: 2.5,
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Layers size={22} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                    Web Application Security
                  </Typography>
                  <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                    Investigating complex state machines, authentication and session integrity, input validation boundaries, Server-Side Request Forgery (SSRF), and business logic flaws across modern browser-facing architectures.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {[
                      'Authentication Bypasses',
                      'Session Synchronization',
                      'Second-Order SSRF',
                      'Business Logic Desync',
                      'Race Conditions',
                    ].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: clayColors.surfaceInset,
                          color: clayColors.textSecondary,
                          fontSize: '0.74rem',
                          border: `1px solid ${clayColors.borderSubtle}`,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Button
                  component={Link}
                  href="/expertise"
                  endIcon={<ArrowRight size={14} />}
                  sx={{
                    alignSelf: 'flex-start',
                    color: clayColors.accentPrimary,
                    p: 0,
                    mt: 2,
                    fontSize: '0.85rem',
                    '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                  }}
                >
                  View Web Security Taxonomy
                </Button>
              </Paper>
            </Grid>

            {/* Domain 2: API Security */}
            <Grid item xs={12} md={6}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderRadius: '18px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)',
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '10px',
                      backgroundColor: clayColors.surfaceInset,
                      border: `1px solid ${clayColors.borderSubtle}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: clayColors.accentPrimary,
                      mb: 2.5,
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)',
                    }}
                  >
                    <Cpu size={22} />
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                    API Security & Microservices
                  </Typography>
                  <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                    Specialized auditing of REST, GraphQL, and microservice meshes. Deep focus on Broken Object Level Authorization (BOLA), mass assignment, gateway token propagation, and endpoint exposure.
                  </Typography>

                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                    {[
                      'BOLA / IDOR Detection',
                      'GraphQL Federation',
                      'JWT Algorithm Traps',
                      'Mass Assignment',
                      'Rate Limit Circumvention',
                    ].map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        sx={{
                          backgroundColor: clayColors.surfaceInset,
                          color: clayColors.textSecondary,
                          fontSize: '0.74rem',
                          border: `1px solid ${clayColors.borderSubtle}`,
                        }}
                      />
                    ))}
                  </Box>
                </Box>

                <Button
                  component={Link}
                  href="/expertise"
                  endIcon={<ArrowRight size={14} />}
                  sx={{
                    alignSelf: 'flex-start',
                    color: clayColors.accentPrimary,
                    p: 0,
                    mt: 2,
                    fontSize: '0.85rem',
                    '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' },
                  }}
                >
                  View API Security Taxonomy
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Selected Research Showcase */}
        <Box sx={{ mb: { xs: 8, md: 12 } }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 4 }}>
            <Box>
              <Typography
                variant="caption"
                sx={{
                  color: clayColors.accentPrimary,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  display: 'block',
                  mb: 0.5,
                }}
              >
                Verified Disclosures
              </Typography>
              <Typography variant="h3" sx={{ fontSize: { xs: '1.6rem', md: '2.1rem' }, color: clayColors.textPrimary }}>
                Selected Research Findings
              </Typography>
            </Box>
            <Button
              component={Link}
              href="/research"
              endIcon={<ArrowRight size={15} />}
              sx={{ color: clayColors.textSecondary, fontSize: '0.85rem', display: { xs: 'none', sm: 'flex' } }}
            >
              All Findings
            </Button>
          </Box>

          <Grid container spacing={3}>
            {featuredFindings.map((finding) => (
              <Grid item xs={12} md={4} key={finding.id}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    borderRadius: '14px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.15s ease',
                    '&:hover': {
                      borderColor: clayColors.borderActive,
                    },
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                      <Chip
                        label={finding.domain}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(56, 189, 248, 0.1)',
                          color: clayColors.accentPrimary,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                        }}
                      />
                      <Chip
                        label={finding.severity}
                        size="small"
                        sx={{
                          backgroundColor:
                            finding.severity === 'Critical'
                              ? 'rgba(248, 113, 113, 0.15)'
                              : 'rgba(251, 146, 60, 0.15)',
                          color:
                            finding.severity === 'Critical'
                              ? clayColors.severityCritical
                              : clayColors.severityHigh,
                          fontSize: '0.7rem',
                          fontWeight: 700,
                        }}
                      />
                    </Box>

                    <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                      {finding.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, fontSize: '0.84rem', mb: 2, lineHeight: 1.55 }}>
                      {finding.summary}
                    </Typography>
                  </Box>

                  <Box sx={{ pt: 2, borderTop: `1px solid ${clayColors.borderSubtle}` }}>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mb: 1 }}>
                      Tech: {finding.affectedTechnology}
                    </Typography>
                    {finding.publicWriteupSlug && (
                      <Link
                        href={`/writeups/${finding.publicWriteupSlug}`}
                        style={{
                          textDecoration: 'none',
                          color: clayColors.accentPrimary,
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                        }}
                      >
                        Read Technical Writeup <ArrowRight size={13} />
                      </Link>
                    )}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Methodology Snapshot */}
        <Box
          sx={{
            p: { xs: 3.5, md: 5 },
            borderRadius: '20px',
            backgroundColor: clayColors.surfaceRaised,
            border: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.35)',
            mb: { xs: 8, md: 12 },
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="caption"
              sx={{
                color: clayColors.accentPrimary,
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                display: 'block',
                mb: 0.5,
              }}
            >
              Rigorous Process
            </Typography>
            <Typography variant="h3" sx={{ fontSize: { xs: '1.5rem', md: '1.9rem' }, color: clayColors.textPrimary }}>
              Security Research Methodology
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {[
              { num: '01', title: 'Scope & Recon', desc: 'Map authorized domains, endpoints, and architectural roles.' },
              { num: '02', title: 'Surface Modeling', desc: 'Identify trust boundaries and state transitions.' },
              { num: '03', title: 'Hypothesis Design', desc: 'Construct targeted test cases around edge conditions.' },
              { num: '04', title: 'Controlled Validation', desc: 'Verify behavior non-destructively within defined limits.' },
              { num: '05', title: 'Impact Assessment', desc: 'Quantify actual confidentiality and integrity exposure.' },
              { num: '06', title: 'Evidence Collection', desc: 'Capture deterministic reproduction steps and raw HTTP traces.' },
              { num: '07', title: 'Coordinated Disclosure', desc: 'Submit structured findings directly to security teams.' },
              { num: '08', title: 'Remediation Review', desc: 'Assist in evaluating permanent architectural patches.' },
            ].map((step) => (
              <Grid item xs={12} sm={6} md={3} key={step.num}>
                <Box
                  sx={{
                    p: 2.2,
                    borderRadius: '12px',
                    backgroundColor: clayColors.surfaceInset,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    height: '100%',
                    boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.35)',
                  }}
                >
                  <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 800, fontSize: '0.75rem' }}>
                    {step.num}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary, mt: 0.5, mb: 0.5 }}>
                    {step.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: clayColors.textMuted, fontSize: '0.8rem', lineHeight: 1.45 }}>
                    {step.desc}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Signature Features Teaser Grid */}
        <Grid container spacing={3}>
          {/* Challenge Me Teaser */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 3.5, md: 4.5 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Send size={18} color={clayColors.accentPrimary} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: clayColors.accentPrimary, letterSpacing: '0.06em' }}>
                    COLLABORATIVE SECURITY TESTING
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', md: '1.65rem' }, fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                  Think You&apos;ve Found a Challenge?
                </Typography>
                <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                  Have an authorized Web or API environment with an elusive security anomaly? Submit the scope to challenge my research workflow. Every submission receives a private tracking token.
                </Typography>
              </Box>

              <Button
                component={Link}
                href="/challenge"
                variant="outlined"
                startIcon={<Send size={15} />}
                sx={{ alignSelf: 'flex-start', borderRadius: '10px' }}
              >
                Submit a Challenge
              </Button>
            </Box>
          </Grid>

          {/* Security Arena Teaser */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                p: { xs: 3.5, md: 4.5 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <Terminal size={18} color={clayColors.accentPrimary} />
                  <Typography variant="caption" sx={{ fontWeight: 700, color: clayColors.accentPrimary, letterSpacing: '0.06em' }}>
                    SYNTHETIC TRAINING LAB
                  </Typography>
                </Box>
                <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', md: '1.65rem' }, fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                  Test Your Security Instincts
                </Typography>
                <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3, lineHeight: 1.6 }}>
                  Practice identifying realistic Web and API vulnerabilities in safe synthetic environments. Analyze raw HTTP request and response pairs, reason through access flaws, and submit validated flags.
                </Typography>
              </Box>

              <Button
                component={Link}
                href="/arena"
                variant="contained"
                startIcon={<Terminal size={15} />}
                sx={{ alignSelf: 'flex-start', borderRadius: '10px' }}
              >
                Enter Security Arena
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
