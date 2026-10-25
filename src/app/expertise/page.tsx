'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container, Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { Layers, Cpu, Shield, ArrowRight, CheckCircle2 } from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function ExpertisePage() {
  const webSecurityAreas = [
    {
      title: 'Authentication & Session Integrity',
      details: 'OAuth2/OIDC flow validation, session token lifecycle, state parameter races, multi-factor bypasses, and session fixation vulnerabilities.',
    },
    {
      title: 'Authorization & Access Controls',
      details: 'Vertical and horizontal privilege escalation, forced browsing, contextual role permission bypasses, and multi-tenant tenant isolation flaws.',
    },
    {
      title: 'Business Logic & State Desynchronization',
      details: 'Order flow state manipulation, currency/unit discrepancies, voucher/coupon race conditions, and multi-step transaction circumvention.',
    },
    {
      title: 'Server-Side Request Handling (SSRF)',
      details: 'Blind and second-order SSRF, DNS rebinding against cloud metadata services (169.254.169.254), egress proxy bypasses, and parser confusion.',
    },
    {
      title: 'Injection & Input Validation',
      details: 'SQL/NoSQL injection, template engine injection (SSTI), command execution boundaries, and unsafe deserialization mechanisms.',
    },
    {
      title: 'File Upload & Asset Storage Security',
      details: 'Path traversal, mime-type sniffing, SVG stored XSS, polyglot files, and presigned S3 upload URL authorization validation.',
    },
  ];

  const apiSecurityAreas = [
    {
      title: 'Broken Object Level Authorization (BOLA / IDOR)',
      details: 'Direct object reference enumeration in REST and GraphQL APIs, missing tenant context joins, and UUID predictability.',
    },
    {
      title: 'Broken Function Level Authorization (BFLA)',
      details: 'Administrative endpoint exposure, HTTP method swapping (e.g. GET vs POST vs PATCH), and undocumented internal debug routes.',
    },
    {
      title: 'Mass Assignment & Object Property Binding',
      details: 'Over-posting parameters into domain models, elevating user roles via profile updates, and modifying immutable audit fields.',
    },
    {
      title: 'API Authentication & Token Handling',
      details: 'JWT secret key bruteforce, algorithm confusion ("none" / RS256 to HS256), missing revocation checks, and token leakage in URL parameters.',
    },
    {
      title: 'Excessive Data Exposure',
      details: 'API endpoints filtering data on the client side while returning entire user objects (hashes, PII, internal flags) in JSON responses.',
    },
    {
      title: 'Rate Limiting & Resource Exhaustion',
      details: 'Bypassing throttling via header rotation (X-Forwarded-For), GraphQL query depth exhaustion, and batch operation abuse.',
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label="TECHNICAL FOCUS"
            size="small"
            sx={{
              backgroundColor: 'rgba(56, 189, 248, 0.12)',
              color: clayColors.accentPrimary,
              fontWeight: 700,
              fontSize: '0.72rem',
              mb: 1.5,
            }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, color: clayColors.textPrimary, mb: 2 }}>
            Areas of Technical Expertise
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 820, lineHeight: 1.65 }}>
            Organized research focus areas across Web Application Security and API Security. Presented as a rigorous technical taxonomy rather than arbitrary proficiency scores.
          </Typography>
        </Box>

        {/* Domain 1: Web Application Security */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '9px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: clayColors.accentPrimary,
              }}
            >
              <Layers size={20} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700, color: clayColors.textPrimary }}>
                Web Application Security
              </Typography>
              <Typography variant="body2" sx={{ color: clayColors.textMuted }}>
                Browser-to-server security architecture and trust boundary analysis
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            {webSecurityAreas.map((area, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '14px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1, fontSize: '0.96rem' }}>
                    {area.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: clayColors.textSecondary, fontSize: '0.84rem', lineHeight: 1.6 }}>
                    {area.details}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Domain 2: API Security */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: '9px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: clayColors.accentPrimary,
              }}
            >
              <Cpu size={20} />
            </Box>
            <Box>
              <Typography variant="h4" sx={{ fontSize: { xs: '1.4rem', md: '1.8rem' }, fontWeight: 700, color: clayColors.textPrimary }}>
                API & Microservice Security
              </Typography>
              <Typography variant="body2" sx={{ color: clayColors.textMuted }}>
                REST, GraphQL, gRPC, and federated service mesh vulnerability research
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={2.5}>
            {apiSecurityAreas.map((area, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  sx={{
                    p: 3,
                    height: '100%',
                    borderRadius: '14px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                  }}
                >
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1, fontSize: '0.96rem' }}>
                    {area.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: clayColors.textSecondary, fontSize: '0.84rem', lineHeight: 1.6 }}>
                    {area.details}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Interactive Lab Callout */}
        <Box
          sx={{
            p: 4,
            borderRadius: '18px',
            backgroundColor: clayColors.surfaceRaised,
            border: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            gap: 2,
          }}
        >
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 0.5 }}>
              Ready to test these vulnerability concepts?
            </Typography>
            <Typography variant="body2" sx={{ color: clayColors.textSecondary }}>
              Inspect live synthetic HTTP request and response pairs in the Security Arena.
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/arena"
            variant="contained"
            endIcon={<ArrowRight size={15} />}
            sx={{ borderRadius: '10px', px: 3 }}
          >
            Open Security Arena
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
