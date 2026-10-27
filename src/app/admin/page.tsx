'use client';

import * as React from 'react';
import Image from 'next/image';
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
  MenuItem,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  Lock,
  Unlock,
  ShieldAlert,
  LogOut,
  CheckCircle2,
  Edit3,
  Clock,
  Eye,
  Check,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { ChallengeSubmission, ChallengeStatus } from '@/types';
import { TurnstileWidget, TurnstileWidgetHandle } from '@/components/TurnstileWidget';

const STATUS_OPTIONS: ChallengeStatus[] = [
  'Submitted',
  'Under Review',
  'Accepted',
  'In Progress',
  'Solved',
  'Declined',
  'Closed',
];

export default function AdminPage() {
  const [authenticated, setAuthenticated] = React.useState(false);
  const [password, setPassword] = React.useState('');
  const [turnstileToken, setTurnstileToken] = React.useState<string | null>(null);
  const turnstileRef = React.useRef<TurnstileWidgetHandle>(null);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState<string | null>(null);

  const handleTurnstileVerify = React.useCallback((token: string) => {
    setTurnstileToken(token);
    setAuthError(null);
  }, []);

  const handleTurnstileExpire = React.useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const handleTurnstileError = React.useCallback(() => {
    setTurnstileToken(null);
  }, []);

  // Dashboard State
  const [challenges, setChallenges] = React.useState<ChallengeSubmission[]>([]);
  const [loadingChallenges, setLoadingChallenges] = React.useState(false);
  const [selectedChallenge, setSelectedChallenge] = React.useState<ChallengeSubmission | null>(null);

  // Edit State
  const [editStatus, setEditStatus] = React.useState<ChallengeStatus>('Submitted');
  const [editNotes, setEditNotes] = React.useState('');
  const [publishOutcome, setPublishOutcome] = React.useState('');
  const [publishLessons, setPublishLessons] = React.useState('');
  const [updating, setUpdating] = React.useState(false);
  const [updateSuccess, setUpdateSuccess] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    if (!turnstileToken) {
      setAuthError('Please verify the Cloudflare CAPTCHA before signing in.');
      return;
    }

    setAuthLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, turnstileToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      setAuthenticated(true);
      loadAdminChallenges();
    } catch (err: any) {
      setAuthError(err.message || 'Invalid administrative passkey.');
      // Reset Turnstile challenge on auth failure
      turnstileRef.current?.reset();
      setTurnstileToken(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
    setPassword('');
    setChallenges([]);
  };

  const loadAdminChallenges = async () => {
    setLoadingChallenges(true);
    try {
      const res = await fetch('/api/admin/challenges');
      const data = await res.json();
      if (data.challenges) {
        setChallenges(data.challenges);
      }
    } catch (err) {
      console.error('Error fetching admin challenges:', err);
    } finally {
      setLoadingChallenges(false);
    }
  };

  const openEditModal = (c: ChallengeSubmission) => {
    setSelectedChallenge(c);
    setEditStatus(c.status);
    setEditNotes(c.adminNotes || '');
    setPublishOutcome(c.publishedSummary?.outcome || '');
    setPublishLessons(c.publishedSummary?.lessonsLearned || '');
    setUpdateSuccess(false);
  };

  const handleSaveUpdate = async () => {
    if (!selectedChallenge) return;
    setUpdating(true);

    try {
      const payload: any = {
        id: selectedChallenge.id,
        status: editStatus,
        adminNotes: editNotes,
      };

      if (publishOutcome.trim()) {
        payload.publishedSummary = {
          outcome: publishOutcome.trim(),
          lessonsLearned: publishLessons.trim() || 'Coordinated disclosure verification completed.',
          publishedAt: new Date().toISOString(),
        };
      }

      const res = await fetch('/api/admin/challenges', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Update failed');

      setUpdateSuccess(true);
      await loadAdminChallenges();
      setTimeout(() => setSelectedChallenge(null), 1200);
    } catch (err) {
      console.error('Error updating challenge:', err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Chip
              label="OPERATOR PORTAL"
              size="small"
              sx={{
                backgroundColor: 'rgba(248, 113, 113, 0.15)',
                color: clayColors.severityCritical,
                fontWeight: 700,
                fontSize: '0.72rem',
                mb: 1.5,
              }}
            />
            <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.5rem' }, fontWeight: 800, color: clayColors.textPrimary }}>
              Challenge Administration Portal
            </Typography>
            <Typography variant="body2" sx={{ color: clayColors.textSecondary }}>
              Review submitted scopes, manage investigation status, and coordinate safe public showcase releases.
            </Typography>
          </Box>

          {authenticated && (
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
              startIcon={<LogOut size={14} />}
              sx={{ borderRadius: '8px', color: clayColors.severityCritical, borderColor: 'rgba(248, 113, 113, 0.3)' }}
            >
              Sign Out
            </Button>
          )}
        </Box>

        {/* LOGIN SCREEN */}
        {!authenticated ? (
          <Box sx={{ maxWidth: 440, mx: 'auto', mt: 4 }}>
            <Paper
              component="form"
              onSubmit={handleLogin}
              sx={{
                p: 4,
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box
                  sx={{
                    width: 38,
                    height: 38,
                    borderRadius: '9px',
                    backgroundColor: clayColors.surfaceInset,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: '4px',
                  }}
                >
                  <Image
                    src="/logo.png"
                    alt="FEKOJEWAN Logo"
                    width={28}
                    height={28}
                    style={{ objectFit: 'contain' }}
                  />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                  Operator Passkey
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3, fontSize: '0.86rem' }}>
                Enter the master review secret to unlock the private challenge intake queue.
              </Typography>

              {authError && (
                <Alert severity="error" sx={{ mb: 2.5, borderRadius: '10px' }}>
                  {authError}
                </Alert>
              )}

              <TextField
                fullWidth
                size="small"
                type="password"
                required
                placeholder="Enter passkey..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2.5 }}
              />

              {/* Cloudflare Turnstile CAPTCHA */}
              <Box sx={{ mb: 3 }}>
                <TurnstileWidget
                  ref={turnstileRef}
                  onVerify={handleTurnstileVerify}
                  onExpire={handleTurnstileExpire}
                  onError={handleTurnstileError}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={authLoading || !turnstileToken}
                startIcon={authLoading ? <CircularProgress size={16} /> : <Unlock size={16} />}
                sx={{ py: 1.2, borderRadius: '10px' }}
              >
                {authLoading
                  ? 'Verifying...'
                  : !turnstileToken
                  ? 'Complete CAPTCHA to continue'
                  : 'Authenticate'}
              </Button>
            </Paper>
          </Box>
        ) : (
          /* DASHBOARD VIEW */
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                Intake Queue ({challenges.length} records)
              </Typography>
              <Button size="small" onClick={loadAdminChallenges}>
                Refresh Queue
              </Button>
            </Box>

            {loadingChallenges ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress size={30} />
              </Box>
            ) : challenges.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center', backgroundColor: clayColors.surfaceRaised }}>
                <Typography variant="body1" sx={{ color: clayColors.textMuted }}>
                  No challenges submitted yet.
                </Typography>
              </Paper>
            ) : (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                {challenges.map((c) => (
                  <Paper
                    key={c.id}
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      backgroundColor: clayColors.surfaceRaised,
                      border: `1px solid ${clayColors.borderSubtle}`,
                      boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5, flexWrap: 'wrap', gap: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip
                          label={c.status}
                          size="small"
                          sx={{
                            fontWeight: 700,
                            backgroundColor:
                              c.status === 'Solved'
                                ? 'rgba(52, 211, 153, 0.2)'
                                : c.status === 'In Progress'
                                  ? 'rgba(56, 189, 248, 0.2)'
                                  : clayColors.surfaceInset,
                            color:
                              c.status === 'Solved'
                                ? clayColors.success
                                : c.status === 'In Progress'
                                  ? clayColors.accentPrimary
                                  : clayColors.textPrimary,
                          }}
                        />
                        <Chip label={c.category} size="small" sx={{ backgroundColor: clayColors.surfaceInset }} />
                        <Chip label={`Difficulty: ${c.difficulty}`} size="small" sx={{ backgroundColor: clayColors.surfaceInset }} />
                      </Box>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted }}>
                        Tracking Token: <code>{c.trackingToken}</code>
                      </Typography>
                    </Box>

                    <Typography variant="h5" sx={{ fontSize: '1.2rem', fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                      {c.title}
                    </Typography>

                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2, lineHeight: 1.6 }}>
                      {c.description}
                    </Typography>

                    <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, mb: 2 }}>
                      <Typography variant="caption" sx={{ color: clayColors.accentPrimary, display: 'block', fontWeight: 700 }}>
                        SUBMITTED SCOPE: <code>{c.authorizedScope}</code>
                      </Typography>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mt: 0.5 }}>
                        Challenger: {c.challengerName} ({c.challengerEmail}) • Environment: {c.environmentType}
                      </Typography>
                      {c.adminNotes && (
                        <Typography variant="caption" sx={{ color: clayColors.warning, display: 'block', mt: 0.5 }}>
                          Internal Notes: {c.adminNotes}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Edit3 size={14} />}
                        onClick={() => openEditModal(c)}
                        sx={{ borderRadius: '8px' }}
                      >
                        Update Status & Review
                      </Button>
                    </Box>
                  </Paper>
                ))}
              </Box>
            )}

            {/* EDIT DIALOG */}
            <Dialog
              open={!!selectedChallenge}
              onClose={() => setSelectedChallenge(null)}
              fullWidth
              maxWidth="sm"
              PaperProps={{
                sx: {
                  backgroundColor: clayColors.surfaceRaised,
                  borderRadius: '16px',
                  border: `1px solid ${clayColors.borderSubtle}`,
                  p: 1,
                },
              }}
            >
              <DialogTitle sx={{ fontWeight: 800, color: clayColors.textPrimary }}>
                Review & Status Management
              </DialogTitle>
              <DialogContent>
                {updateSuccess && (
                  <Alert severity="success" sx={{ mb: 2.5, borderRadius: '10px' }}>
                    Challenge state saved successfully!
                  </Alert>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mt: 1 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                      LIFECYCLE STATUS
                    </Typography>
                    <TextField
                      select
                      fullWidth
                      size="small"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value as ChallengeStatus)}
                    >
                      {STATUS_OPTIONS.map((st) => (
                        <MenuItem key={st} value={st}>
                          {st}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                      INTERNAL RESEARCH NOTES (PRIVATE)
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      size="small"
                      placeholder="Notes on reproduction, root-cause findings, or communication..."
                      value={editNotes}
                      onChange={(e) => setEditNotes(e.target.value)}
                    />
                  </Box>

                  <Divider sx={{ my: 1, borderColor: clayColors.borderSubtle }} />

                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.textPrimary }}>
                    Public Showcase Publication (Optional)
                  </Typography>

                  <Box>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                      PUBLISHED OUTCOME SUMMARY
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="e.g. Vulnerability verified and patch coordinated..."
                      value={publishOutcome}
                      onChange={(e) => setPublishOutcome(e.target.value)}
                    />
                  </Box>

                  <Box>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                      LESSONS LEARNED & ARCHITECTURAL TAKEAWAY
                    </Typography>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="e.g. Always validate tenant ownership context inside nested resolvers..."
                      value={publishLessons}
                      onChange={(e) => setPublishLessons(e.target.value)}
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={() => setSelectedChallenge(null)} sx={{ color: clayColors.textMuted }}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSaveUpdate}
                  disabled={updating}
                  startIcon={updating ? <CircularProgress size={15} /> : <Check size={15} />}
                >
                  Save Changes
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        )}
      </Container>
    </Box>
  );
}
