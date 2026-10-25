'use client';

import * as React from 'react';
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
  Chip,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Collapse,
  Divider,
} from '@mui/material';
import {
  Terminal,
  Shield,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Code2,
  FileText,
  Lock,
  Unlock,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { ARENA_EXERCISES } from '@/lib/arena-data';
import { SyntheticExercise } from '@/types';

export default function ArenaPage() {
  const [selectedExerciseId, setSelectedExerciseId] = React.useState<string>(ARENA_EXERCISES[0].id);
  const [selectedDomain, setSelectedDomain] = React.useState<string>('All');
  const [flagInput, setFlagInput] = React.useState<string>('');
  const [verifying, setVerifying] = React.useState<boolean>(false);
  const [feedback, setFeedback] = React.useState<{ correct: boolean; message: string } | null>(null);
  const [solvedExercises, setSolvedExercises] = React.useState<Set<string>>(new Set());
  const [showHint, setShowHint] = React.useState<boolean>(false);

  const currentExercise = ARENA_EXERCISES.find((e) => e.id === selectedExerciseId) || ARENA_EXERCISES[0];

  const filteredExercises = ARENA_EXERCISES.filter((e) => {
    if (selectedDomain === 'All') return true;
    return e.domain === selectedDomain;
  });

  const handleExerciseChange = (id: string) => {
    setSelectedExerciseId(id);
    setFlagInput('');
    setFeedback(null);
    setShowHint(false);
  };

  const handleFlagSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!flagInput.trim()) return;

    setVerifying(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/arena/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          exerciseId: currentExercise.id,
          flag: flagInput.trim(),
        }),
      });

      const data = await res.json();
      setFeedback(data);

      if (data.correct) {
        setSolvedExercises((prev) => new Set(prev).add(currentExercise.id));
      }
    } catch (err) {
      setFeedback({ correct: false, message: 'Server communication error during flag validation.' });
    } finally {
      setVerifying(false);
    }
  };

  const isCurrentSolved = solvedExercises.has(currentExercise.id);

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
            <Chip
              label="MODE A — SYNTHETIC LAB"
              size="small"
              sx={{
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: clayColors.accentPrimary,
                fontWeight: 700,
                fontSize: '0.72rem',
              }}
            />
            <Chip
              label={`${solvedExercises.size} / ${ARENA_EXERCISES.length} SOLVED`}
              size="small"
              sx={{
                backgroundColor: solvedExercises.size > 0 ? 'rgba(52, 211, 153, 0.15)' : clayColors.surfaceInset,
                color: solvedExercises.size > 0 ? clayColors.success : clayColors.textMuted,
                fontWeight: 700,
                fontSize: '0.72rem',
              }}
            />
          </Box>
          <Typography variant="h2" sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, color: clayColors.textPrimary, mb: 1.5 }}>
            Security Arena — Web & API Lab
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 880, lineHeight: 1.65 }}>
            Test your security instincts in a safe, controlled training environment. Inspect raw HTTP request and response structures, detect authorization defects and header anomalies, and validate your findings.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Left Column: Challenge Catalog */}
          <Grid item xs={12} lg={3.5}>
            <Paper
              sx={{
                p: 2.5,
                borderRadius: '16px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                  Challenge Catalog
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['All', 'Web', 'API'].map((dom) => (
                    <Chip
                      key={dom}
                      label={dom}
                      size="small"
                      clickable
                      onClick={() => setSelectedDomain(dom)}
                      sx={{
                        backgroundColor: selectedDomain === dom ? clayColors.accentPrimary : 'transparent',
                        color: selectedDomain === dom ? '#081018' : clayColors.textMuted,
                        fontWeight: selectedDomain === dom ? 700 : 500,
                        fontSize: '0.7rem',
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
                {filteredExercises.map((exercise) => {
                  const isSelected = exercise.id === currentExercise.id;
                  const isSolved = solvedExercises.has(exercise.id);

                  return (
                    <Box
                      key={exercise.id}
                      onClick={() => handleExerciseChange(exercise.id)}
                      sx={{
                        p: 1.8,
                        borderRadius: '12px',
                        cursor: 'pointer',
                        backgroundColor: isSelected ? clayColors.surfaceInset : 'transparent',
                        border: isSelected
                          ? `1px solid ${clayColors.borderActive}`
                          : `1px solid ${clayColors.borderSubtle}`,
                        boxShadow: isSelected ? 'inset 0 2px 4px rgba(0,0,0,0.4)' : 'none',
                        transition: 'all 0.15s ease',
                        '&:hover': {
                          backgroundColor: clayColors.surfaceInset,
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.8 }}>
                        <Chip
                          label={exercise.domain}
                          size="small"
                          sx={{
                            height: 20,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            backgroundColor: 'rgba(56, 189, 248, 0.1)',
                            color: clayColors.accentPrimary,
                          }}
                        />
                        {isSolved ? (
                          <Chip
                            icon={<CheckCircle2 size={12} color={clayColors.success} />}
                            label="SOLVED"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: '0.65rem',
                              fontWeight: 800,
                              backgroundColor: 'rgba(52, 211, 153, 0.15)',
                              color: clayColors.success,
                            }}
                          />
                        ) : (
                          <Typography variant="caption" sx={{ color: clayColors.textMuted, fontSize: '0.72rem' }}>
                            {exercise.difficulty}
                          </Typography>
                        )}
                      </Box>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.86rem',
                          color: isSelected ? clayColors.textPrimary : clayColors.textSecondary,
                          lineHeight: 1.35,
                        }}
                      >
                        {exercise.title}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Paper>

            <Paper
              sx={{
                p: 2.5,
                borderRadius: '16px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
              }}
            >
              <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 700, display: 'block', mb: 1, letterSpacing: '0.04em' }}>
                SAFETY ARCHITECTURE NOTE:
              </Typography>
              <Typography variant="caption" sx={{ color: clayColors.textSecondary, display: 'block', lineHeight: 1.5 }}>
                Mode A executes entirely on pre-captured synthetic transactions. The website does NOT expose live vulnerable endpoints or dangerous containers. All evaluations happen in constant time server-side.
              </Typography>
            </Paper>
          </Grid>

          {/* Right Column: Challenge Workspace */}
          <Grid item xs={12} lg={8.5}>
            {/* Scenario & Objective Card */}
            <Paper
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                mb: 3,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontSize: { xs: '1.3rem', md: '1.6rem' }, fontWeight: 800, color: clayColors.textPrimary, mb: 0.5 }}>
                    {currentExercise.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Chip label={`Category: ${currentExercise.category}`} size="small" sx={{ backgroundColor: clayColors.surfaceInset }} />
                    <Chip label={`Difficulty: ${currentExercise.difficulty}`} size="small" sx={{ backgroundColor: clayColors.surfaceInset }} />
                  </Box>
                </Box>
                {isCurrentSolved && (
                  <Chip
                    icon={<CheckCircle2 size={14} color={clayColors.success} />}
                    label="FLAG VERIFIED"
                    sx={{ backgroundColor: 'rgba(52, 211, 153, 0.15)', color: clayColors.success, fontWeight: 800 }}
                  />
                )}
              </Box>

              <Typography variant="body1" sx={{ color: clayColors.textSecondary, mb: 2, lineHeight: 1.65 }}>
                {currentExercise.scenario}
              </Typography>

              <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}`, mb: 2 }}>
                <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 700, display: 'block', mb: 0.5 }}>
                  OBJECTIVE:
                </Typography>
                <Typography variant="body2" sx={{ color: clayColors.textPrimary, fontSize: '0.88rem' }}>
                  {currentExercise.objective}
                </Typography>
              </Box>

              {/* Hint Toggle */}
              <Box>
                <Button
                  size="small"
                  onClick={() => setShowHint(!showHint)}
                  startIcon={<HelpCircle size={14} />}
                  sx={{ color: clayColors.textMuted, fontSize: '0.8rem', p: 0 }}
                >
                  {showHint ? 'Hide Guidance Hint' : 'Show Guidance Hint'}
                </Button>
                <Collapse in={showHint}>
                  <Box sx={{ mt: 1.5, p: 2, borderRadius: '10px', backgroundColor: 'rgba(250, 204, 21, 0.08)', border: '1px solid rgba(250, 204, 21, 0.2)' }}>
                    <Typography variant="caption" sx={{ color: clayColors.warning, fontWeight: 700, display: 'block', mb: 0.5 }}>
                      ANALYSIS HINT:
                    </Typography>
                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, fontSize: '0.85rem' }}>
                      {currentExercise.hint}
                    </Typography>
                  </Box>
                </Collapse>
              </Box>
            </Paper>

            {/* HTTP Request / Response Inspector (Side by Side or Stacked) */}
            <Grid container spacing={2.5} sx={{ mb: 3 }}>
              {/* Request Inspector */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2.5,
                    height: '100%',
                    borderRadius: '16px',
                    backgroundColor: clayColors.surfaceInset,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: clayColors.textPrimary, letterSpacing: '0.06em' }}>
                      SYNTHETIC HTTP REQUEST
                    </Typography>
                    <Chip
                      label={currentExercise.httpRequest.method}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        backgroundColor: currentExercise.httpRequest.method === 'GET' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(251, 146, 60, 0.2)',
                        color: currentExercise.httpRequest.method === 'GET' ? clayColors.accentPrimary : clayColors.severityHigh,
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#06090e', border: `1px solid ${clayColors.borderSubtle}`, mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: clayColors.accentPrimary, display: 'block', wordBreak: 'break-all' }}>
                      {currentExercise.httpRequest.method} {currentExercise.httpRequest.url} HTTP/1.1
                    </Typography>
                    {Object.entries(currentExercise.httpRequest.headers).map(([key, val]) => (
                      <Typography key={key} variant="caption" sx={{ fontFamily: 'monospace', color: '#94a3b8', display: 'block', wordBreak: 'break-all' }}>
                        <span style={{ color: '#cbd5e1' }}>{key}:</span> {val}
                      </Typography>
                    ))}
                  </Box>

                  {currentExercise.httpRequest.body && (
                    <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#06090e', border: `1px solid ${clayColors.borderSubtle}` }}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mb: 0.5, fontWeight: 700 }}>
                        PAYLOAD BODY:
                      </Typography>
                      <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.78rem', color: '#38bdf8', overflowX: 'auto' }}>
                        <code>{currentExercise.httpRequest.body}</code>
                      </pre>
                    </Box>
                  )}
                </Paper>
              </Grid>

              {/* Response Inspector */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2.5,
                    height: '100%',
                    borderRadius: '16px',
                    backgroundColor: clayColors.surfaceInset,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.4)',
                  }}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: clayColors.textPrimary, letterSpacing: '0.06em' }}>
                      SYNTHETIC HTTP RESPONSE
                    </Typography>
                    <Chip
                      label={`${currentExercise.httpResponse.status} ${currentExercise.httpResponse.statusText}`}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: '0.68rem',
                        fontWeight: 800,
                        backgroundColor: currentExercise.httpResponse.status === 200 ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)',
                        color: currentExercise.httpResponse.status === 200 ? clayColors.success : clayColors.severityCritical,
                      }}
                    />
                  </Box>

                  <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#06090e', border: `1px solid ${clayColors.borderSubtle}`, mb: 1.5 }}>
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: clayColors.success, display: 'block' }}>
                      HTTP/1.1 {currentExercise.httpResponse.status} {currentExercise.httpResponse.statusText}
                    </Typography>
                    {Object.entries(currentExercise.httpResponse.headers).map(([key, val]) => (
                      <Typography key={key} variant="caption" sx={{ fontFamily: 'monospace', color: '#94a3b8', display: 'block', wordBreak: 'break-all' }}>
                        <span style={{ color: '#cbd5e1' }}>{key}:</span> {val}
                      </Typography>
                    ))}
                  </Box>

                  <Box sx={{ p: 1.5, borderRadius: '8px', backgroundColor: '#06090e', border: `1px solid ${clayColors.borderSubtle}` }}>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mb: 0.5, fontWeight: 700 }}>
                      RESPONSE JSON BODY:
                    </Typography>
                    <pre style={{ margin: 0, fontFamily: 'monospace', fontSize: '0.78rem', color: '#a5f3fc', overflowX: 'auto' }}>
                      <code>{currentExercise.httpResponse.body}</code>
                    </pre>
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Answer / Flag Submission Console */}
            <Paper
              component="form"
              onSubmit={handleFlagSubmit}
              sx={{
                p: { xs: 3, md: 3.5 },
                borderRadius: '16px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                mb: 3,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                Flag Submission Console
              </Typography>
              <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2.5, fontSize: '0.85rem' }}>
                Identify the security finding token embedded in the response or synthesize the flag: <Box component="code" sx={{ color: clayColors.accentPrimary }}>FEKO&#123;...&#125;</Box>
              </Typography>

              {feedback && (
                <Alert
                  severity={feedback.correct ? 'success' : 'error'}
                  sx={{ mb: 2.5, borderRadius: '10px' }}
                >
                  {feedback.message}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="FEKO{...}"
                  value={flagInput}
                  onChange={(e) => setFlagInput(e.target.value)}
                  disabled={verifying}
                  sx={{
                    '& input': { fontFamily: 'monospace' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={verifying || !flagInput.trim()}
                  startIcon={verifying ? <CircularProgress size={16} /> : <Send size={15} />}
                  sx={{ borderRadius: '10px', px: 3, flexShrink: 0 }}
                >
                  Validate Flag
                </Button>
              </Box>
            </Paper>

            {/* Unlocked Root Cause Explanation (shown when solved) */}
            {isCurrentSolved && (
              <Paper
                sx={{
                  p: { xs: 3, md: 4 },
                  borderRadius: '16px',
                  backgroundColor: 'rgba(52, 211, 153, 0.05)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                  <Unlock size={18} color={clayColors.success} />
                  <Typography variant="h6" sx={{ fontWeight: 700, color: clayColors.success, fontSize: '1.05rem' }}>
                    Challenge Solved: Architectural Explanation & Defense
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: clayColors.textPrimary, mb: 2, lineHeight: 1.65 }}>
                  {currentExercise.explanation}
                </Typography>
                <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                  <Typography variant="caption" sx={{ color: clayColors.accentPrimary, fontWeight: 700, display: 'block', mb: 0.5 }}>
                    PREVENTATIVE ENGINEERING REMEDIATION:
                  </Typography>
                  <Typography variant="caption" sx={{ color: clayColors.textSecondary, display: 'block', lineHeight: 1.55 }}>
                    {currentExercise.remediation}
                  </Typography>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
