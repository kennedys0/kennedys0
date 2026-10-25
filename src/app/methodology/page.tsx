'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container, Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import {
  Compass,
  Layers,
  Sparkles,
  ShieldCheck,
  Activity,
  FileCheck2,
  Lock,
  RefreshCw,
  ArrowRight,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function MethodologyPage() {
  const steps = [
    {
      num: '01',
      title: 'Scope Understanding & Invariant Mapping',
      icon: Compass,
      summary: 'Before sending a single probe, the authorized boundaries, tenant isolation models, and business objectives are thoroughly analyzed.',
      details: [
        'Define explicit allowed domains, subdomains, API paths, and excluded hosts.',
        'Map out user roles, subscription tiers, and multi-tenant organizational hierarchies.',
        'Review program disclosure policies and designated safe harbor commitments.',
      ],
    },
    {
      num: '02',
      title: 'Attack Surface & Topology Reconnaissance',
      icon: Layers,
      summary: 'Building a structural mental model of the application rather than running noisy automated vulnerability scanners.',
      details: [
        'Passive inspection of JavaScript bundles, sourcemaps, and client API endpoints.',
        'Documentation of authentication state transfers, cookies, and OAuth redirect URIs.',
        'Identification of background queues, third-party webhook receivers, and microservice gateways.',
      ],
    },
    {
      num: '03',
      title: 'Hypothesis Development',
      icon: Sparkles,
      summary: 'Formulating precise, falsifiable theories about where developer assumptions might diverge from runtime reality.',
      details: [
        'Can a user in Tenant A supply an ID belonging to Tenant B to nested sub-resolvers?',
        'Does the payment or credit deduction step verify idempotency atomically in the database?',
        'Are deserialized request parameters strictly restricted to safe Data Transfer Objects?',
      ],
    },
    {
      num: '04',
      title: 'Controlled & Non-Destructive Validation',
      icon: ShieldCheck,
      summary: 'Executing focused test cases designed to confirm or disprove the hypothesis with minimal operational footprint.',
      details: [
        'Crafting minimal HTTP requests containing only the necessary parameters.',
        'Respecting rate limits and avoiding heavy concurrency that could degrade service.',
        'Testing solely against researcher-owned test accounts and dummy sandbox records.',
      ],
    },
    {
      num: '05',
      title: 'Technical Impact Assessment',
      icon: Activity,
      summary: 'Distinguishing theoretical bugs from actual security risks to prevent alert fatigue for triage teams.',
      details: [
        'Determining whether the finding permits unauthorized read, modification, or elevation.',
        'Evaluating real-world prerequisite barriers (e.g. required privileges, user interaction).',
        'Assigning realistic CVSS scores based on demonstrable exploitability.',
      ],
    },
    {
      num: '06',
      title: 'Deterministic Evidence Collection',
      icon: FileCheck2,
      summary: 'Documenting clear, self-contained reproduction artifacts so developers can immediately replicate and fix the issue.',
      details: [
        'Raw HTTP request and response pairs with sensitive personal details redacted.',
        'Deterministic curl commands or minimal Python reproduction scripts.',
        'Precise code references or root-cause explanations when open source or client-accessible.',
      ],
    },
    {
      num: '07',
      title: 'Responsible & Coordinated Disclosure',
      icon: Lock,
      summary: 'Engaging directly with security teams through established disclosure channels.',
      details: [
        'Submitting structured reports via bug bounty platforms, security.txt, or PGP-encrypted email.',
        'Maintaining prompt and constructive communication during triage.',
        'Respecting embargo periods while engineering teams prepare and roll out patches.',
      ],
    },
    {
      num: '08',
      title: 'Verification & Remediation Review',
      icon: RefreshCw,
      summary: 'Validating that the deployed patch truly fixes the architectural root cause rather than just filtering a symptom.',
      details: [
        'Re-testing the original attack vector in staging or production after fix confirmation.',
        'Checking whether adjacent endpoints or nested methods remain vulnerable.',
        'Collaborating on long-term prevention guidelines and unit/integration test cases.',
      ],
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label="METHODICAL RIGOR"
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
            Research Methodology
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 840, lineHeight: 1.65 }}>
            A disciplined 8-step security workflow. Security research conducted as a structured engineering discipline, prioritizing non-destructive validation, clear evidence, and actionable remediation.
          </Typography>
        </Box>

        {/* Steps Grid */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <Grid item xs={12} md={6} key={step.num}>
                <Paper
                  sx={{
                    p: { xs: 3, md: 3.5 },
                    height: '100%',
                    borderRadius: '16px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '10px',
                          backgroundColor: clayColors.surfaceInset,
                          border: `1px solid ${clayColors.borderSubtle}`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: clayColors.accentPrimary,
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)',
                        }}
                      >
                        <Icon size={20} />
                      </Box>
                      <Typography variant="h6" sx={{ color: clayColors.textMuted, fontWeight: 800, fontSize: '1.1rem' }}>
                        {step.num}
                      </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontSize: '1.15rem', fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                      {step.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                      {step.summary}
                    </Typography>
                  </Box>

                  <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                    <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 700, display: 'block', mb: 1, letterSpacing: '0.04em' }}>
                      KEY ACTIVITIES:
                    </Typography>
                    {step.details.map((detail, idx) => (
                      <Typography key={idx} variant="caption" sx={{ color: clayColors.textSecondary, display: 'block', mb: 0.5, lineHeight: 1.5 }}>
                        • {detail}
                      </Typography>
                    ))}
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        {/* CTA Banner */}
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
              Put this methodology to work on your systems
            </Typography>
            <Typography variant="body2" sx={{ color: clayColors.textSecondary }}>
              Submit an authorized Web or API target to the Challenge Me intake pipeline.
            </Typography>
          </Box>
          <Button
            component={Link}
            href="/challenge"
            variant="contained"
            endIcon={<ArrowRight size={15} />}
            sx={{ borderRadius: '10px', px: 3 }}
          >
            Submit Scope
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
