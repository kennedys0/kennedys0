'use client';

import * as React from 'react';
import Link from 'next/link';
import { Container, Box, Typography, Grid, Paper, Chip, Button } from '@mui/material';
import { Wrench, Terminal, Cpu, Globe, Code2, Network, ArrowRight } from 'lucide-react';
import { clayColors } from '@/lib/theme';

export default function ToolsPage() {
  const tools = [
    {
      name: 'Burp Suite Professional',
      category: 'HTTP Proxy & Traffic Analysis',
      icon: Network,
      purpose: 'Deep HTTP/S inspection, repeater-based parameter tampering, automated sequence analysis, and custom extension authoring (BApp/Java/Python).',
      workflow: 'Intercepts traffic between browser/API clients and backend microservices, allowing micro-second request repeats, header alterations, and session diffing.',
    },
    {
      name: 'Postman & Bruno',
      category: 'API Client & Schema Exploration',
      icon: Globe,
      purpose: 'REST, GraphQL, and WebSocket request orchestration with environment variable chaining and automated token rotation.',
      workflow: 'Used to model multi-stage user journeys, simulate concurrent client actions, and test nested GraphQL sub-queries.',
    },
    {
      name: 'Browser Developer Tools',
      category: 'DOM & Client-Side Execution',
      icon: Terminal,
      purpose: 'Analyzing single-page app (SPA) JavaScript bundles, IndexedDB session storage, Web Workers, and Content Security Policy (CSP) evaluations.',
      workflow: 'Setting client-side breakpoints on state management mutations to reveal hidden administrative endpoints, unpublished API paths, and deserialization routines.',
    },
    {
      name: 'Python (AsyncIO / Requests / Scapy)',
      category: 'Custom Automation & Fuzzing',
      icon: Code2,
      purpose: 'Authoring custom, deterministic proof-of-concept scripts, concurrency race condition demonstrators, and specialized payload generators.',
      workflow: 'When off-the-shelf tools are too noisy or inflexible, custom asynchronous Python scripts fire sub-millisecond concurrent requests to validate timing races.',
    },
    {
      name: 'TypeScript & Node.js',
      category: 'Fullstack Research & Mocking',
      icon: Cpu,
      purpose: 'Re-implementing minimal reproducible mock servers to safely simulate and explain complex microservice authorization defects.',
      workflow: 'Enables quick creation of local replica environments where vulnerable application flows can be demonstrated safely to development teams.',
    },
    {
      name: 'mitmproxy & Network Sniffers',
      category: 'Non-Standard Protocol Debugging',
      icon: Wrench,
      purpose: 'Inspecting gRPC, HTTP/2, WebSocket, and custom TCP traffic that standard web proxies struggle to parse natively.',
      workflow: 'Command-line scripting of traffic transformation pipelines, allowing transparent traffic manipulation on mobile and embedded apps.',
    },
  ];

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Chip
            label="RESEARCH STACK"
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
            Tools & Technical Workflow
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 840, lineHeight: 1.65 }}>
            Real-world security research relies on purposeful instrumentation. Here is a transparent breakdown of the primary tools utilized in FEKOJEWAN research and what each contributes to uncovering complex vulnerabilities.
          </Typography>
        </Box>

        {/* Tools Grid */}
        <Grid container spacing={3} sx={{ mb: 8 }}>
          {tools.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Grid item xs={12} md={6} key={idx}>
                <Paper
                  sx={{
                    p: 3.5,
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
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          width: 42,
                          height: 42,
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
                      <Chip
                        label={tool.category}
                        size="small"
                        sx={{
                          backgroundColor: clayColors.surfaceInset,
                          color: clayColors.textMuted,
                          fontSize: '0.72rem',
                          border: `1px solid ${clayColors.borderSubtle}`,
                        }}
                      />
                    </Box>

                    <Typography variant="h5" sx={{ fontSize: '1.2rem', fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                      {tool.name}
                    </Typography>

                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2, lineHeight: 1.6 }}>
                      {tool.purpose}
                    </Typography>
                  </Box>

                  <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                    <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 700, display: 'block', mb: 0.5 }}>
                      PRACTICAL ROLE IN WORKFLOW:
                    </Typography>
                    <Typography variant="caption" sx={{ color: clayColors.textSecondary, display: 'block', lineHeight: 1.5 }}>
                      {tool.workflow}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}
