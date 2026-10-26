'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Box, Typography, Paper, Chip, Button, Divider } from '@mui/material';
import { ArrowLeft, Clock } from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { WRITEUPS } from '@/lib/writeups-data';
import { MarkdownContent } from '@/components/MarkdownContent';

export default function WriteupDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = React.use(params);
  const writeup = WRITEUPS.find((w) => w.slug === slug);

  if (!writeup) {
    notFound();
  }

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="md">
        {/* Back Link */}
        <Button
          component={Link}
          href="/writeups"
          startIcon={<ArrowLeft size={15} />}
          sx={{ color: clayColors.textSecondary, mb: 3, fontSize: '0.85rem' }}
        >
          Back to all writeups
        </Button>

        {/* Article Container */}
        <Paper
          sx={{
            p: { xs: 3.5, md: 6 },
            borderRadius: '20px',
            backgroundColor: clayColors.surfaceRaised,
            border: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
          }}
        >
          {/* Metadata Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap', mb: 2 }}>
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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: clayColors.textMuted, fontSize: '0.8rem', ml: 'auto' }}>
              <Clock size={14} />
              <span>{writeup.readingTime}</span>
              <span>•</span>
              <span>Published {writeup.publishedAt}</span>
            </Box>
          </Box>

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.4rem' },
              fontWeight: 800,
              color: clayColors.textPrimary,
              lineHeight: 1.25,
              mb: 2.5,
              letterSpacing: '-0.02em',
            }}
          >
            {writeup.title}
          </Typography>

          {/* Summary Box */}
          <Box
            sx={{
              p: 2.5,
              borderRadius: '12px',
              backgroundColor: clayColors.surfaceInset,
              border: `1px solid ${clayColors.borderSubtle}`,
              mb: 4,
            }}
          >
            <Typography variant="body1" sx={{ color: clayColors.textPrimary, fontStyle: 'italic', lineHeight: 1.6 }}>
              {writeup.summary}
            </Typography>
          </Box>

          <Divider sx={{ mb: 4, borderColor: clayColors.borderSubtle }} />

          {/* Formatted Content */}
          <Box sx={{ mb: 6 }}>
            <MarkdownContent content={writeup.content} />
          </Box>

          {/* Tags */}
          <Box sx={{ pt: 3, borderTop: `1px solid ${clayColors.borderSubtle}`, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {writeup.tags.map((tag) => (
              <Chip
                key={tag}
                label={`#${tag}`}
                size="small"
                sx={{
                  backgroundColor: clayColors.surfaceInset,
                  color: clayColors.textMuted,
                  fontSize: '0.74rem',
                }}
              />
            ))}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
