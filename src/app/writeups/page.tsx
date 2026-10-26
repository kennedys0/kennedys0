'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container, Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { BookOpen, Clock, Tag, ArrowRight } from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { WRITEUPS } from '@/lib/writeups-data';

export default function WriteupsPage() {
  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6 }}>
            <Chip
              label="KNOWLEDGE BASE"
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
              Technical Writeups & Analysis
            </Typography>
            <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 840, lineHeight: 1.65 }}>
              Detailed architectural writeups, exploit mechanics, root cause analyses, and defensive patterns. Authored for security researchers, software engineers, and application architects.
            </Typography>
          </Box>

        {/* Writeups List */}
        <Grid container spacing={3}>
          {WRITEUPS.map((writeup) => (
            <Grid item xs={12} key={writeup.slug}>
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: '16px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    borderColor: clayColors.borderActive,
                    transform: 'translateY(-1px)',
                  },
                }}
              >
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
                      label={writeup.domain}
                      size="small"
                      sx={{
                        backgroundColor: 'rgba(56, 189, 248, 0.1)',
                        color: clayColors.accentPrimary,
                        fontWeight: 700,
                        fontSize: '0.72rem',
                      }}
                    />
                    <Chip
                      label={writeup.category}
                      size="small"
                      sx={{
                        backgroundColor: clayColors.surfaceInset,
                        color: clayColors.textSecondary,
                        fontSize: '0.72rem',
                        border: `1px solid ${clayColors.borderSubtle}`,
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, color: clayColors.textMuted }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8rem' }}>
                      <Clock size={14} />
                      <span>{writeup.readingTime}</span>
                    </Box>
                    <Typography variant="caption">{writeup.publishedAt}</Typography>
                  </Box>
                </Box>

                <Typography
                  variant="h5"
                  component={Link}
                  href={`/writeups/${writeup.slug}`}
                  sx={{
                    textDecoration: 'none',
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 700,
                    color: clayColors.textPrimary,
                    display: 'block',
                    mb: 1.5,
                    '&:hover': { color: clayColors.accentPrimary },
                  }}
                >
                  {writeup.title}
                </Typography>

                <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3, lineHeight: 1.65, maxWidth: 900 }}>
                  {writeup.summary}
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', sm: 'center' },
                    gap: 2,
                    pt: 2,
                    borderTop: `1px solid ${clayColors.borderSubtle}`,
                  }}
                >
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                    {writeup.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={`#${tag}`}
                        size="small"
                        sx={{
                          backgroundColor: clayColors.surfaceInset,
                          color: clayColors.textMuted,
                          fontSize: '0.7rem',
                        }}
                      />
                    ))}
                  </Box>

                  <Button
                    component={Link}
                    href={`/writeups/${writeup.slug}`}
                    endIcon={<ArrowRight size={15} />}
                    sx={{ color: clayColors.accentPrimary, fontSize: '0.86rem', p: 0 }}
                  >
                    Read Article
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
