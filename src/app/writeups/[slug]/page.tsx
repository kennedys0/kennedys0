'use client';

import * as React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Container, Box, Typography, Paper, Chip, Button, Divider, Grid } from '@mui/material';
import { ArrowLeft, Clock, Tag, Share2, Shield, AlertCircle } from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { WRITEUPS } from '@/lib/writeups-data';

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

  // Simple clean markdown-like parser for sections and code blocks
  const renderFormattedContent = (raw: string) => {
    const lines = raw.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let inCodeBlock = false;
    let codeBuffer: string[] = [];
    let codeLang = '';

    lines.forEach((line, idx) => {
      if (line.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeLang = line.replace('```', '').trim();
          codeBuffer = [];
        } else {
          inCodeBlock = false;
          elements.push(
            <Box
              key={`code-${idx}`}
              sx={{
                my: 2.5,
                p: 2.5,
                borderRadius: '12px',
                backgroundColor: clayColors.surfaceInset,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
                overflowX: 'auto',
              }}
            >
              {codeLang && (
                <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 700, mb: 1, display: 'block', textTransform: 'uppercase' }}>
                  {codeLang}
                </Typography>
              )}
              <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.86rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                <code>{codeBuffer.join('\n')}</code>
              </pre>
            </Box>
          );
        }
      } else if (inCodeBlock) {
        codeBuffer.push(line);
      } else if (line.startsWith('### ')) {
        elements.push(
          <Typography
            key={`h3-${idx}`}
            variant="h5"
            sx={{
              fontSize: '1.35rem',
              fontWeight: 700,
              color: clayColors.textPrimary,
              mt: 4,
              mb: 1.5,
            }}
          >
            {line.replace('### ', '')}
          </Typography>
        );
      } else if (line.startsWith('- ')) {
        elements.push(
          <Box key={`li-${idx}`} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.8, pl: 1 }}>
            <span style={{ color: clayColors.accentPrimary, marginTop: 2 }}>•</span>
            <Typography variant="body1" sx={{ color: clayColors.textSecondary, fontSize: '0.96rem', lineHeight: 1.65 }}>
              {line.replace('- ', '')}
            </Typography>
          </Box>
        );
      } else if (line.trim() !== '') {
        elements.push(
          <Typography
            key={`p-${idx}`}
            variant="body1"
            sx={{
              color: clayColors.textSecondary,
              fontSize: '0.98rem',
              lineHeight: 1.7,
              mb: 2,
            }}
          >
            {line}
          </Typography>
        );
      }
    });

    return elements;
  };

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
          <Box sx={{ mb: 6 }}>{renderFormattedContent(writeup.content)}</Box>

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
