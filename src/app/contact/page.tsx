'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  Divider,
} from '@mui/material';
import {
  Mail,
  KeyRound,
  Shield,
  GitBranch,
  CheckCircle2,
  Copy,
  Check,
  Send,
  FileCheck2,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function ContactPage() {
  const [copiedPgp, setCopiedPgp] = React.useState(false);

  const pgpKeyFingerprint = '4A8E 9B01 2F6D 8C33 1A90 E7B2 9940 3F1D 82C1 00E4';
  const pgpPublicKey = `-----BEGIN PGP PUBLIC KEY BLOCK-----
Version: OpenPGP.js v5.0.0
Comment: https://fekojewan.com/contact

mQGNBF/9...FEKOJEWAN Security Research Master Key
4A8E9B012F6D8C331A90E7B299403F1D82C100E4
Subkey: ed25519 / cv25519
Contact: bounty@fekojewan.my.id
-----END PGP PUBLIC KEY BLOCK-----`;

  const copyPgp = () => {
    navigator.clipboard.writeText(pgpPublicKey);
    setCopiedPgp(true);
    setTimeout(() => setCopiedPgp(false), 2000);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label="SECURE COMMUNICATIONS"
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
            Coordinated Contact & Disclosure
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 840, lineHeight: 1.65 }}>
            Direct, encrypted communication channels for security research inquiries, bug bounty triage teams, and authorized challenge coordination.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Details */}
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
                Primary Contact Channels
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 4 }}>
                {/* Email Box */}
                <Box sx={{ p: 2.5, borderRadius: '12px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Mail size={18} color={clayColors.accentPrimary} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                      Encrypted Research Email
                    </Typography>
                  </Box>
                  <Typography
                    component="a"
                    href="mailto:bounty@fekojewan.my.id"
                    variant="body2"
                    sx={{
                      fontFamily: 'monospace',
                      color: clayColors.accentPrimary,
                      fontSize: '0.95rem',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                    }}
                  >
                    bounty@fekojewan.my.id
                  </Typography>
                  <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mt: 0.5 }}>
                    For security inquiries, vulnerability coordination, and research correspondence. Please encrypt sensitive technical details using the PGP key below.
                  </Typography>
                </Box>

                {/* Bug Bounty / Scope Intake */}
                <Box sx={{ p: 2.5, borderRadius: '12px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Send size={18} color={clayColors.success} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                      Target Environment Submission
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 1.5, fontSize: '0.88rem' }}>
                    Have an authorized Web application or API scope you would like reviewed? Use the Challenge Me platform.
                  </Typography>
                  <Button
                    component={Link}
                    href="/challenge"
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: '8px' }}
                  >
                    Go to Challenge Me
                  </Button>
                </Box>
              </Box>

              <Divider sx={{ mb: 3, borderColor: clayColors.borderSubtle }} />

              {/* Responsible Disclosure SLA */}
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                Triage Expectations & SLAs
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {[
                  'Initial acknowledgment of verified vulnerability reports within 24 to 48 hours.',
                  'Detailed impact classification and minimal reproduction test cases supplied with all disclosures.',
                  'Strict 90-day coordinated disclosure policy, with extensions granted when active patches are in testing.',
                ].map((item, idx) => (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.2 }}>
                    <FileCheck2 size={16} color={clayColors.success} style={{ marginTop: 2, flexShrink: 0 }} />
                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, fontSize: '0.85rem', lineHeight: 1.55 }}>
                      {item}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Grid>

          {/* PGP Key Card */}
          <Grid item xs={12} md={5}>
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <KeyRound size={18} color={clayColors.accentPrimary} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                    OpenPGP Public Key
                  </Typography>
                </Box>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={copyPgp}
                  startIcon={copiedPgp ? <Check size={13} /> : <Copy size={13} />}
                  sx={{ borderRadius: '8px', fontSize: '0.75rem', py: 0.4 }}
                >
                  {copiedPgp ? 'Copied' : 'Copy Key'}
                </Button>
              </Box>

              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}`, mb: 2.5 }}>
                <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mb: 0.5, fontWeight: 700 }}>
                  KEY FINGERPRINT:
                </Typography>
                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: clayColors.accentPrimary, display: 'block', wordBreak: 'break-all' }}>
                  {pgpKeyFingerprint}
                </Typography>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderRadius: '10px',
                  backgroundColor: '#06090e',
                  border: `1px solid ${clayColors.borderSubtle}`,
                  maxHeight: 220,
                  overflowY: 'auto',
                }}
              >
                <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.45 }}>
                  <code>{pgpPublicKey}</code>
                </pre>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
