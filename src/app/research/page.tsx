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
  TextField,
  InputAdornment,
  Collapse,
} from '@mui/material';
import {
  Search,
  Shield,
  Filter,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { RESEARCH_FINDINGS } from '@/lib/research-data';
import { VulnerabilityFinding, SeverityLevel } from '@/types';

export default function ResearchPage() {
  const [selectedDomain, setSelectedDomain] = React.useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = React.useState<string>('All');
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [expandedId, setExpandedId] = React.useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const filteredFindings = RESEARCH_FINDINGS.filter((finding) => {
    const matchesDomain = selectedDomain === 'All' || finding.domain === selectedDomain;
    const matchesSeverity = selectedSeverity === 'All' || finding.severity === selectedSeverity;
    const matchesSearch =
      searchQuery === '' ||
      finding.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.affectedTechnology.toLowerCase().includes(searchQuery.toLowerCase()) ||
      finding.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesDomain && matchesSeverity && matchesSearch;
  });

  const getSeverityColor = (severity: SeverityLevel) => {
    switch (severity) {
      case 'Critical':
        return { bg: 'rgba(248, 113, 113, 0.15)', text: clayColors.severityCritical, border: 'rgba(248, 113, 113, 0.3)' };
      case 'High':
        return { bg: 'rgba(251, 146, 60, 0.15)', text: clayColors.severityHigh, border: 'rgba(251, 146, 60, 0.3)' };
      case 'Medium':
        return { bg: 'rgba(250, 204, 21, 0.15)', text: clayColors.severityMedium, border: 'rgba(250, 204, 21, 0.3)' };
      case 'Low':
        return { bg: 'rgba(74, 222, 128, 0.15)', text: clayColors.severityLow, border: 'rgba(74, 222, 128, 0.3)' };
      default:
        return { bg: 'rgba(96, 165, 250, 0.15)', text: clayColors.severityInfo, border: 'rgba(96, 165, 250, 0.3)' };
    }
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Page Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label="RESEARCH SHOWCASE"
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
            Security Research & Verified Findings
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 840, lineHeight: 1.65 }}>
            A curated showcase of verified web application and API security findings. Every entry represents coordinated disclosure, structured root-cause analysis, and practical remediation guidance.
          </Typography>
        </Box>

        {/* Filters & Search Control Bar */}
        <Paper
          sx={{
            p: 2.5,
            mb: 4,
            borderRadius: '16px',
            backgroundColor: clayColors.surfaceRaised,
            border: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            {/* Search Input */}
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search findings or tech..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search size={16} color={clayColors.textMuted} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            {/* Domain Filters */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 600, mr: 0.5 }}>
                  Domain:
                </Typography>
                {['All', 'Web', 'API'].map((domain) => (
                  <Chip
                    key={domain}
                    label={domain}
                    clickable
                    onClick={() => setSelectedDomain(domain)}
                    sx={{
                      backgroundColor: selectedDomain === domain ? clayColors.accentPrimary : clayColors.surfaceInset,
                      color: selectedDomain === domain ? '#081018' : clayColors.textSecondary,
                      fontWeight: selectedDomain === domain ? 700 : 500,
                      border: `1px solid ${selectedDomain === domain ? 'transparent' : clayColors.borderSubtle}`,
                    }}
                  />
                ))}
              </Box>
            </Grid>

            {/* Severity Filters */}
            <Grid item xs={12} sm={6} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 600, mr: 0.5 }}>
                  Severity:
                </Typography>
                {['All', 'Critical', 'High', 'Medium'].map((sev) => (
                  <Chip
                    key={sev}
                    label={sev}
                    clickable
                    onClick={() => setSelectedSeverity(sev)}
                    size="small"
                    sx={{
                      backgroundColor: selectedSeverity === sev ? clayColors.surfaceInset : 'transparent',
                      color: selectedSeverity === sev ? clayColors.textPrimary : clayColors.textMuted,
                      fontWeight: selectedSeverity === sev ? 700 : 500,
                      border: `1px solid ${selectedSeverity === sev ? clayColors.borderActive : clayColors.borderSubtle}`,
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Findings List */}
        {filteredFindings.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: 'center',
              borderRadius: '16px',
              backgroundColor: clayColors.surfaceRaised,
              border: `1px solid ${clayColors.borderSubtle}`,
            }}
          >
            <Typography variant="h6" sx={{ color: clayColors.textPrimary, mb: 1 }}>
              No research findings match this filter
            </Typography>
            <Typography variant="body2" sx={{ color: clayColors.textMuted, mb: 2 }}>
              Try adjusting your search query, domain, or severity filter.
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={() => {
                setSelectedDomain('All');
                setSelectedSeverity('All');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </Button>
          </Paper>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            {filteredFindings.map((finding) => {
              const isExpanded = expandedId === finding.id;
              const sevColors = getSeverityColor(finding.severity);

              return (
                <Paper
                  key={finding.id}
                  sx={{
                    p: { xs: 2.5, md: 3.5 },
                    borderRadius: '16px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    transition: 'border-color 0.15s ease',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.12)',
                    },
                  }}
                >
                  {/* Item Header */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'flex-start', sm: 'center' },
                      gap: 1.5,
                      mb: 2,
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={finding.domain}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(56, 189, 248, 0.1)',
                          color: clayColors.accentPrimary,
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      />
                      <Chip
                        label={finding.category}
                        size="small"
                        sx={{
                          backgroundColor: clayColors.surfaceInset,
                          color: clayColors.textSecondary,
                          fontSize: '0.72rem',
                          border: `1px solid ${clayColors.borderSubtle}`,
                        }}
                      />
                      <Chip
                        label={finding.severity}
                        size="small"
                        sx={{
                          backgroundColor: sevColors.bg,
                          color: sevColors.text,
                          border: `1px solid ${sevColors.border}`,
                          fontWeight: 700,
                          fontSize: '0.72rem',
                        }}
                      />
                      <Chip
                        label={finding.disclosureStatus}
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(52, 211, 153, 0.1)',
                          color: clayColors.success,
                          fontSize: '0.72rem',
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Typography variant="caption" sx={{ color: clayColors.textMuted }}>
                      Disclosed {finding.publicationDate}
                    </Typography>
                  </Box>

                  {/* Title & Summary */}
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: { xs: '1.15rem', md: '1.35rem' },
                      fontWeight: 700,
                      color: clayColors.textPrimary,
                      mb: 1.5,
                    }}
                  >
                    {finding.title}
                  </Typography>

                  <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2, lineHeight: 1.65 }}>
                    {finding.summary}
                  </Typography>

                  {/* Technology Tag */}
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 600 }}>
                      Target Tech:
                    </Typography>
                    <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontFamily: 'monospace' }}>
                      {finding.affectedTechnology}
                    </Typography>
                  </Box>

                  {/* Expand / Details Toggle */}
                  <Collapse in={isExpanded}>
                    <Box
                      sx={{
                        mt: 2,
                        pt: 2.5,
                        borderTop: `1px solid ${clayColors.borderSubtle}`,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                      }}
                    >
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: clayColors.textPrimary, fontWeight: 700, mb: 0.5 }}>
                          Technical Impact:
                        </Typography>
                        <Typography variant="body2" sx={{ color: clayColors.textSecondary, lineHeight: 1.6 }}>
                          {finding.impact}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="subtitle2" sx={{ color: clayColors.textPrimary, fontWeight: 700, mb: 0.5 }}>
                          Remediation Recommendation:
                        </Typography>
                        <Typography variant="body2" sx={{ color: clayColors.textSecondary, lineHeight: 1.6 }}>
                          {finding.remediation}
                        </Typography>
                      </Box>

                      {finding.references && finding.references.length > 0 && (
                        <Box>
                          <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, display: 'block', mb: 0.5 }}>
                            References & Taxonomy:
                          </Typography>
                          {finding.references.map((ref, idx) => (
                            <Typography key={idx} variant="caption" sx={{ color: clayColors.accentPrimary, display: 'block' }}>
                              • {ref}
                            </Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  </Collapse>

                  {/* Footer actions */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mt: 2,
                      pt: 1.5,
                      borderTop: `1px solid ${clayColors.borderSubtle}`,
                    }}
                  >
                    <Button
                      size="small"
                      onClick={() => toggleExpand(finding.id)}
                      endIcon={isExpanded ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                      sx={{ color: clayColors.textSecondary, fontSize: '0.82rem', p: 0 }}
                    >
                      {isExpanded ? 'Hide Technical Details' : 'View Impact & Remediation'}
                    </Button>

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
                        Read Full Writeup <ArrowRight size={13} />
                      </Link>
                    )}
                  </Box>
                </Paper>
              );
            })}
          </Box>
        )}
      </Container>
    </Box>
  );
}
