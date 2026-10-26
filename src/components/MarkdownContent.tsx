'use client';

import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { clayColors } from '@/lib/theme';
import { tokenizeInlineMarkdown } from '@/lib/markdown';

interface InlineMarkdownProps {
  text: string;
}

export function InlineMarkdown({ text }: InlineMarkdownProps) {
  if (!text) return null;

  const tokens = tokenizeInlineMarkdown(text);

  return (
    <>
      {tokens.map((token, idx) => {
        switch (token.type) {
          case 'bold':
            return (
              <Box
                component="strong"
                key={idx}
                sx={{
                  fontWeight: 700,
                  color: clayColors.textPrimary,
                }}
              >
                {token.content.includes('`') ? (
                  <InlineMarkdown text={token.content} />
                ) : (
                  token.content
                )}
              </Box>
            );

          case 'code':
            return (
              <Box
                component="code"
                key={idx}
                sx={{
                  px: 0.8,
                  py: 0.2,
                  mx: 0.25,
                  borderRadius: '6px',
                  backgroundColor: clayColors.surfaceInset,
                  color: clayColors.accentPrimary,
                  fontSize: '0.86em',
                  fontFamily: 'monospace',
                  border: `1px solid ${clayColors.borderSubtle}`,
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
                  wordBreak: 'break-all',
                }}
              >
                {token.content}
              </Box>
            );

          case 'italic':
            return (
              <Box
                component="em"
                key={idx}
                sx={{
                  fontStyle: 'italic',
                  color: clayColors.textPrimary,
                }}
              >
                {token.content}
              </Box>
            );

          case 'link':
            return (
              <Box
                component="a"
                key={idx}
                href={token.url}
                target={token.url.startsWith('http') ? '_blank' : undefined}
                rel={token.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                sx={{
                  color: clayColors.accentPrimary,
                  textDecoration: 'none',
                  borderBottom: `1px dashed ${clayColors.accentPrimary}`,
                  transition: 'border-bottom-style 0.15s ease',
                  '&:hover': {
                    borderBottomStyle: 'solid',
                  },
                }}
              >
                {token.text}
              </Box>
            );

          case 'text':
          default:
            return <React.Fragment key={idx}>{token.content}</React.Fragment>;
        }
      })}
    </>
  );
}

interface MarkdownContentProps {
  content: string;
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  if (!content) return null;

  const lines = content.trim().split('\n');
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
              <Typography
                variant="caption"
                sx={{
                  color: clayColors.accentPrimary,
                  fontWeight: 700,
                  mb: 1,
                  display: 'block',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.72rem',
                }}
              >
                {codeLang}
              </Typography>
            )}
            <pre
              style={{
                margin: 0,
                fontFamily: 'monospace',
                fontSize: '0.86rem',
                color: '#e2e8f0',
                lineHeight: 1.55,
              }}
            >
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          </Box>
        );
      }
    } else if (inCodeBlock) {
      codeBuffer.push(line);
    } else if (line.startsWith('#### ')) {
      elements.push(
        <Typography
          key={`h4-${idx}`}
          variant="h6"
          sx={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: clayColors.textPrimary,
            mt: 3,
            mb: 1,
          }}
        >
          <InlineMarkdown text={line.slice(5)} />
        </Typography>
      );
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
          <InlineMarkdown text={line.slice(4)} />
        </Typography>
      );
    } else if (line.startsWith('## ')) {
      elements.push(
        <Typography
          key={`h2-${idx}`}
          variant="h4"
          sx={{
            fontSize: '1.6rem',
            fontWeight: 700,
            color: clayColors.textPrimary,
            mt: 4.5,
            mb: 2,
          }}
        >
          <InlineMarkdown text={line.slice(3)} />
        </Typography>
      );
    } else if (line.startsWith('# ')) {
      elements.push(
        <Typography
          key={`h1-${idx}`}
          variant="h3"
          sx={{
            fontSize: '1.9rem',
            fontWeight: 800,
            color: clayColors.textPrimary,
            mt: 5,
            mb: 2.5,
          }}
        >
          <InlineMarkdown text={line.slice(2)} />
        </Typography>
      );
    } else if (line.startsWith('> ')) {
      elements.push(
        <Box
          key={`bq-${idx}`}
          sx={{
            my: 2,
            p: 2,
            borderLeft: `3px solid ${clayColors.accentPrimary}`,
            borderRadius: '0 8px 8px 0',
            backgroundColor: clayColors.surfaceInset,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              lineHeight: 1.65,
              color: clayColors.textSecondary,
              fontStyle: 'italic',
            }}
          >
            <InlineMarkdown text={line.replace(/^>\s*/, '')} />
          </Typography>
        </Box>
      );
    } else {
      const olMatch = line.match(/^\s*(\d+)\.\s+(.*)$/);
      if (olMatch) {
        const [, num, itemText] = olMatch;
        elements.push(
          <Box
            key={`ol-${idx}`}
            sx={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 1.5,
              mb: 1.4,
              pl: 0.5,
            }}
          >
            <Box
              sx={{
                minWidth: 24,
                height: 24,
                borderRadius: '6px',
                backgroundColor: clayColors.surfaceInset,
                border: `1px solid ${clayColors.borderSubtle}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: clayColors.accentPrimary,
                mt: 0.15,
                flexShrink: 0,
                fontFamily: 'monospace',
                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.3)',
              }}
            >
              {num}
            </Box>
            <Typography
              variant="body1"
              sx={{
                color: clayColors.textSecondary,
                fontSize: '0.96rem',
                lineHeight: 1.65,
              }}
            >
              <InlineMarkdown text={itemText} />
            </Typography>
          </Box>
        );
      } else {
        const ulMatch = line.match(/^\s*[-*]\s+(.*)$/);
        if (ulMatch) {
          const [, bulletText] = ulMatch;
          elements.push(
            <Box
              key={`li-${idx}`}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1.5,
                mb: 1.2,
                pl: 0.5,
              }}
            >
              <Box
                sx={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: clayColors.accentPrimary,
                  mt: 1.1,
                  flexShrink: 0,
                  boxShadow: '0 0 6px rgba(56, 189, 248, 0.6)',
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: clayColors.textSecondary,
                  fontSize: '0.96rem',
                  lineHeight: 1.65,
                }}
              >
                <InlineMarkdown text={bulletText} />
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
              <InlineMarkdown text={line} />
            </Typography>
          );
        }
      }
    }
  });

  return <>{elements}</>;
}
