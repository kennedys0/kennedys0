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
  MenuItem,
  Checkbox,
  FormControlLabel,
  Alert,
  Tabs,
  Tab,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Send,
  Search,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Copy,
  Check,
  ExternalLink,
  Award,
} from 'lucide-react';
import { clayColors } from '@/lib/theme';
import { ChallengeCategory, ChallengeDifficulty, ChallengeStatus } from '@/types';

const CATEGORIES: ChallengeCategory[] = [
  'Web Security',
  'API Security',
  'Authentication',
  'Authorization',
  'Business Logic',
  'Vulnerability Analysis',
  'CTF / Lab',
  'Other',
];

const DIFFICULTIES: ChallengeDifficulty[] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const LIFECYCLE_STEPS: ChallengeStatus[] = [
  'Submitted',
  'Under Review',
  'Accepted',
  'In Progress',
  'Solved',
];

export default function ChallengePage() {
  const [activeTab, setActiveTab] = React.useState<number>(0);

  // Form State
  const [challengerName, setChallengerName] = React.useState('');
  const [challengerEmail, setChallengerEmail] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [category, setCategory] = React.useState<ChallengeCategory>('Web Security');
  const [difficulty, setDifficulty] = React.useState<ChallengeDifficulty>('Intermediate');
  const [environmentType, setEnvironmentType] = React.useState('Staging / Sandbox');
  const [authorizedScope, setAuthorizedScope] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [objective, setObjective] = React.useState('');
  const [reproductionPrerequisites, setReproductionPrerequisites] = React.useState('');
  const [consentAttestation, setConsentAttestation] = React.useState(false);
  const [honeypot, setHoneypot] = React.useState('');

  const [submitting, setSubmitting] = React.useState(false);
  const [submitError, setSubmitError] = React.useState<string | null>(null);
  const [submissionSuccess, setSubmissionSuccess] = React.useState<{
    token: string;
    status: string;
  } | null>(null);
  const [copiedToken, setCopiedToken] = React.useState(false);

  // Tracking State
  const [trackTokenInput, setTrackTokenInput] = React.useState('');
  const [trackingLoading, setTrackingLoading] = React.useState(false);
  const [trackingError, setTrackingError] = React.useState<string | null>(null);
  const [trackedChallenge, setTrackedChallenge] = React.useState<any | null>(null);

  // Public Showcase State
  const [showcaseItems, setShowcaseItems] = React.useState<any[]>([]);
  const [showcaseLoading, setShowcaseLoading] = React.useState(false);

  const loadShowcase = async () => {
    setShowcaseLoading(true);
    try {
      const res = await fetch('/api/challenges');
      const data = await res.json();
      if (data.showcase) {
        setShowcaseItems(data.showcase);
      }
    } catch (err) {
      console.error('Error loading showcase:', err);
    } finally {
      setShowcaseLoading(false);
    }
  };

  React.useEffect(() => {
    if (activeTab === 2) {
      loadShowcase();
    }
  }, [activeTab]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!consentAttestation) {
      setSubmitError('You must attest that you have explicit authorization to submit this environment.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/challenges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challengerName,
          challengerEmail,
          title,
          category,
          difficulty,
          environmentType,
          authorizedScope,
          description,
          objective,
          reproductionPrerequisites,
          consentAttestation,
          honeypot,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit challenge');
      }

      setSubmissionSuccess({
        token: data.trackingToken,
        status: data.status,
      });

      // Clear sensitive form fields
      setChallengerName('');
      setChallengerEmail('');
      setTitle('');
      setAuthorizedScope('');
      setDescription('');
      setObjective('');
      setReproductionPrerequisites('');
      setConsentAttestation(false);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred while submitting.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleTrackLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError(null);
    setTrackedChallenge(null);

    if (!trackTokenInput.trim()) {
      setTrackingError('Please enter a tracking token.');
      return;
    }

    setTrackingLoading(true);
    try {
      const res = await fetch(`/api/challenges/${encodeURIComponent(trackTokenInput.trim())}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Challenge not found');
      }

      setTrackedChallenge(data);
    } catch (err: any) {
      setTrackingError(err.message || 'Failed to locate challenge tracking record.');
    } finally {
      setTrackingLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <Box sx={{ py: { xs: 4, md: 8 } }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ mb: 5 }}>
          <Chip
            label="FLAGSHIP COLLABORATION PLATFORM"
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
            sx={{ fontSize: { xs: '2rem', md: '2.8rem' }, fontWeight: 800, color: clayColors.textPrimary, mb: 1.5 }}
          >
            Think You&apos;ve Found a Challenge?
          </Typography>
          <Typography variant="body1" sx={{ fontSize: '1.05rem', color: clayColors.textSecondary, maxWidth: 840, lineHeight: 1.65 }}>
            Have a tricky Web or API security scenario? Challenge my research process with an authorized, reproducible security problem. Every challenge is audited manually with strict confidentiality.
          </Typography>
        </Box>

        {/* Tab Navigation */}
        <Paper
          sx={{
            mb: 4,
            borderRadius: '14px',
            backgroundColor: clayColors.surfaceRaised,
            border: `1px solid ${clayColors.borderSubtle}`,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
          }}
        >
          <Tabs
            value={activeTab}
            onChange={(_, val) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: clayColors.accentPrimary,
                height: 3,
                borderRadius: '3px 3px 0 0',
              },
            }}
          >
            <Tab
              label="Submit Challenge"
              icon={<Send size={15} />}
              iconPosition="start"
              sx={{ color: clayColors.textSecondary, fontWeight: 600, fontSize: '0.88rem' }}
            />
            <Tab
              label="Track Submission Status"
              icon={<Search size={15} />}
              iconPosition="start"
              sx={{ color: clayColors.textSecondary, fontWeight: 600, fontSize: '0.88rem' }}
            />
            <Tab
              label="Completed Challenge Showcase"
              icon={<Award size={15} />}
              iconPosition="start"
              sx={{ color: clayColors.textSecondary, fontWeight: 600, fontSize: '0.88rem' }}
            />
          </Tabs>
        </Paper>

        {/* TAB 0: SUBMISSION FORM */}
        {activeTab === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {submissionSuccess ? (
                <Paper
                  sx={{
                    p: { xs: 3.5, md: 5 },
                    borderRadius: '18px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderActive}`,
                    boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                    <CheckCircle2 size={28} color={clayColors.success} />
                    <Typography variant="h5" sx={{ fontWeight: 800, color: clayColors.textPrimary }}>
                      Challenge Successfully Registered
                    </Typography>
                  </Box>

                  <Typography variant="body1" sx={{ color: clayColors.textSecondary, mb: 3, lineHeight: 1.65 }}>
                    Your challenge has been persisted securely. FEKOJEWAN will manually review the authorized scope and reproduction criteria.
                  </Typography>

                  <Box
                    sx={{
                      p: 3,
                      borderRadius: '12px',
                      backgroundColor: clayColors.surfaceInset,
                      border: `1px solid ${clayColors.borderSubtle}`,
                      mb: 4,
                    }}
                  >
                    <Typography variant="caption" sx={{ color: clayColors.textMuted, display: 'block', mb: 0.5, fontWeight: 700 }}>
                      YOUR PRIVATE TRACKING TOKEN (SAVE THIS KEY):
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: 'monospace',
                          color: clayColors.accentPrimary,
                          fontWeight: 700,
                          wordBreak: 'break-all',
                        }}
                      >
                        {submissionSuccess.token}
                      </Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => copyToClipboard(submissionSuccess.token)}
                        startIcon={copiedToken ? <Check size={14} /> : <Copy size={14} />}
                        sx={{ flexShrink: 0 }}
                      >
                        {copiedToken ? 'Copied' : 'Copy'}
                      </Button>
                    </Box>
                  </Box>

                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setTrackTokenInput(submissionSuccess.token);
                        setActiveTab(1);
                      }}
                    >
                      Track Challenge Progress
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => setSubmissionSuccess(null)}
                    >
                      Submit Another
                    </Button>
                  </Box>
                </Paper>
              ) : (
                <Paper
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    p: { xs: 3, md: 4.5 },
                    borderRadius: '18px',
                    backgroundColor: clayColors.surfaceRaised,
                    border: `1px solid ${clayColors.borderSubtle}`,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 3 }}>
                    Challenge Specification Form
                  </Typography>

                  {submitError && (
                    <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                      {submitError}
                    </Alert>
                  )}

                  {/* Honeypot field (hidden from real users) */}
                  <input
                    type="text"
                    name="honeypot"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <Grid container spacing={2.5}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        CHALLENGER DISPLAY NAME *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        required
                        placeholder="e.g. Alex / SecOps Team"
                        value={challengerName}
                        onChange={(e) => setChallengerName(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        CONTACT EMAIL (CONFIDENTIAL) *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        required
                        type="email"
                        placeholder="you@organization.example"
                        value={challengerEmail}
                        onChange={(e) => setChallengerEmail(e.target.value)}
                        helperText="Used strictly for private coordination. Never published."
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        CHALLENGE TITLE *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        required
                        placeholder="e.g. Broken Object Authorization in Invoice Split API"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        CATEGORY *
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ChallengeCategory)}
                      >
                        {CATEGORIES.map((cat) => (
                          <MenuItem key={cat} value={cat}>
                            {cat}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        DIFFICULTY ESTIMATE *
                      </Typography>
                      <TextField
                        select
                        fullWidth
                        size="small"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value as ChallengeDifficulty)}
                      >
                        {DIFFICULTIES.map((diff) => (
                          <MenuItem key={diff} value={diff}>
                            {diff}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        ENVIRONMENT TYPE *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="e.g. Staging VPC / Sandbox"
                        value={environmentType}
                        onChange={(e) => setEnvironmentType(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        AUTHORIZED SCOPE (DOMAINS / ENDPOINTS) *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        required
                        placeholder="e.g. api.staging.example.com/v1/invoices/*"
                        value={authorizedScope}
                        onChange={(e) => setAuthorizedScope(e.target.value)}
                        helperText="URLs will be stored inertly. No automated scanning or fetching will occur."
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        CHALLENGE DESCRIPTION & CONTEXT *
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        required
                        placeholder="Describe the architecture, suspected vulnerability class, and how the target operates..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        EXPECTED OBJECTIVE *
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        required
                        placeholder="What constitutes a successful solution? (e.g. Obtain unauthorized cross-tenant object ID)"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, mb: 0.5, display: 'block' }}>
                        REPRODUCTION PREREQUISITES (OPTIONAL)
                      </Typography>
                      <TextField
                        fullWidth
                        size="small"
                        placeholder="e.g. Test credentials provided via secure channel, custom headers, or test org accounts"
                        value={reproductionPrerequisites}
                        onChange={(e) => setReproductionPrerequisites(e.target.value)}
                      />
                    </Grid>

                    {/* Attestation Checkbox */}
                    <Grid item xs={12}>
                      <Box
                        sx={{
                          p: 2,
                          borderRadius: '10px',
                          backgroundColor: clayColors.surfaceInset,
                          border: `1px solid ${clayColors.borderSubtle}`,
                        }}
                      >
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={consentAttestation}
                              onChange={(e) => setConsentAttestation(e.target.checked)}
                              sx={{ color: clayColors.accentPrimary }}
                            />
                          }
                          label={
                            <Typography variant="body2" sx={{ color: clayColors.textPrimary, fontSize: '0.84rem' }}>
                              I attest that I own or have explicit authorization to submit this environment for security assessment. I agree not to submit sensitive production credentials, and I understand this is not an invitation to attack unauthorized third parties.
                            </Typography>
                          }
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={submitting}
                        startIcon={submitting ? <CircularProgress size={16} /> : <Send size={16} />}
                        sx={{ borderRadius: '10px', px: 4, py: 1.2 }}
                      >
                        {submitting ? 'Persisting Submission...' : 'Submit Security Challenge'}
                      </Button>
                    </Grid>
                  </Grid>
                </Paper>
              )}
            </Grid>

            {/* Sidebar Guidelines */}
            <Grid item xs={12} md={4}>
              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: '16px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                  mb: 3,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                  Submission Rules & Safety
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {[
                    'Zero Automated Scans: Your target URL is never fetched or spidered automatically.',
                    'Manual Verification: FEKOJEWAN reviews every submission by hand.',
                    'Strict Authorization: Only environments you own or have verified testing rights for may be submitted.',
                    'Confidentiality: Contact details and private scope targets are never disclosed publicly.',
                  ].map((rule, idx) => (
                    <Box key={idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                      <ShieldCheck size={16} color={clayColors.accentPrimary} style={{ marginTop: 2, flexShrink: 0 }} />
                      <Typography variant="body2" sx={{ color: clayColors.textSecondary, fontSize: '0.83rem', lineHeight: 1.55 }}>
                        {rule}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>

              <Paper
                sx={{
                  p: 3.5,
                  borderRadius: '16px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderSubtle}`,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                  Lifecycle Management
                </Typography>
                <Typography variant="body2" sx={{ color: clayColors.textMuted, fontSize: '0.82rem', mb: 2 }}>
                  Your submission follows a transparent state transition:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
                  {LIFECYCLE_STEPS.map((step) => (
                    <Chip
                      key={step}
                      label={step}
                      size="small"
                      sx={{
                        backgroundColor: clayColors.surfaceInset,
                        color: clayColors.textSecondary,
                        fontSize: '0.72rem',
                        border: `1px solid ${clayColors.borderSubtle}`,
                      }}
                    />
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        )}

        {/* TAB 1: STATUS TRACKING */}
        {activeTab === 1 && (
          <Box sx={{ maxWidth: 760, mx: 'auto' }}>
            <Paper
              component="form"
              onSubmit={handleTrackLookup}
              sx={{
                p: { xs: 3, md: 4 },
                borderRadius: '18px',
                backgroundColor: clayColors.surfaceRaised,
                border: `1px solid ${clayColors.borderSubtle}`,
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                mb: 4,
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
                Challenge Status Lookup
              </Typography>
              <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 3 }}>
                Enter the 24-character hexadecimal tracking token provided during your challenge submission.
              </Typography>

              {trackingError && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: '10px' }}>
                  {trackingError}
                </Alert>
              )}

              <Box sx={{ display: 'flex', gap: 1.5, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="e.g. a4f91b7d8e204c559012beef"
                  value={trackTokenInput}
                  onChange={(e) => setTrackTokenInput(e.target.value)}
                  sx={{
                    '& input': { fontFamily: 'monospace' },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  disabled={trackingLoading}
                  startIcon={trackingLoading ? <CircularProgress size={16} /> : <Search size={16} />}
                  sx={{ borderRadius: '10px', px: 3, flexShrink: 0 }}
                >
                  Lookup Status
                </Button>
              </Box>
            </Paper>

            {/* Tracked Result Details */}
            {trackedChallenge && (
              <Paper
                sx={{
                  p: { xs: 3.5, md: 4.5 },
                  borderRadius: '18px',
                  backgroundColor: clayColors.surfaceRaised,
                  border: `1px solid ${clayColors.borderActive}`,
                  boxShadow: '0 6px 24px rgba(0,0,0,0.4)',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    label={`STATUS: ${trackedChallenge.status.toUpperCase()}`}
                    size="small"
                    sx={{
                      backgroundColor:
                        trackedChallenge.status === 'Solved'
                          ? 'rgba(52, 211, 153, 0.15)'
                          : 'rgba(56, 189, 248, 0.15)',
                      color:
                        trackedChallenge.status === 'Solved'
                          ? clayColors.success
                          : clayColors.accentPrimary,
                      fontWeight: 800,
                      fontSize: '0.74rem',
                      letterSpacing: '0.04em',
                    }}
                  />
                  <Typography variant="caption" sx={{ color: clayColors.textMuted }}>
                    Submitted: {new Date(trackedChallenge.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                  {trackedChallenge.title}
                </Typography>

                <Box sx={{ display: 'flex', gap: 1.5, mb: 3 }}>
                  <Chip label={`Category: ${trackedChallenge.category}`} size="small" sx={{ backgroundColor: clayColors.surfaceInset }} />
                  <Chip label={`Difficulty: ${trackedChallenge.difficulty}`} size="small" sx={{ backgroundColor: clayColors.surfaceInset }} />
                </Box>

                {/* Lifecycle Progress Bar */}
                <Box sx={{ p: 2.5, borderRadius: '12px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}`, mb: 3 }}>
                  <Typography variant="caption" sx={{ color: clayColors.textMuted, fontWeight: 700, display: 'block', mb: 1.5 }}>
                    LIFECYCLE PIPELINE:
                  </Typography>
                  <Grid container spacing={1}>
                    {LIFECYCLE_STEPS.map((step, idx) => {
                      const isCurrent = trackedChallenge.status === step;
                      const stepIdx = LIFECYCLE_STEPS.indexOf(trackedChallenge.status);
                      const isPast = stepIdx > idx;

                      return (
                        <Grid item xs={12} sm={2.4} key={step}>
                          <Box
                            sx={{
                              p: 1,
                              borderRadius: '8px',
                              textAlign: 'center',
                              backgroundColor: isCurrent
                                ? 'rgba(56, 189, 248, 0.2)'
                                : isPast
                                ? 'rgba(52, 211, 153, 0.1)'
                                : 'rgba(255, 255, 255, 0.02)',
                              border: isCurrent
                                ? `1px solid ${clayColors.accentPrimary}`
                                : `1px solid ${clayColors.borderSubtle}`,
                            }}
                          >
                            <Typography
                              variant="caption"
                              sx={{
                                fontWeight: isCurrent ? 700 : 500,
                                color: isCurrent ? clayColors.accentPrimary : isPast ? clayColors.success : clayColors.textMuted,
                                fontSize: '0.72rem',
                              }}
                            >
                              {step}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Box>

                {trackedChallenge.publishedSummary && (
                  <Box sx={{ p: 2.5, borderRadius: '12px', backgroundColor: 'rgba(52, 211, 153, 0.08)', border: '1px solid rgba(52, 211, 153, 0.2)' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: clayColors.success, mb: 0.5 }}>
                      Resolution Summary:
                    </Typography>
                    <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 1 }}>
                      {trackedChallenge.publishedSummary.outcome}
                    </Typography>
                    <Typography variant="caption" sx={{ color: clayColors.textMuted }}>
                      Lessons Learned: {trackedChallenge.publishedSummary.lessonsLearned}
                    </Typography>
                  </Box>
                )}
              </Paper>
            )}
          </Box>
        )}

        {/* TAB 2: PUBLIC SHOWCASE */}
        {activeTab === 2 && (
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 700, color: clayColors.textPrimary, mb: 1 }}>
              Published Challenge Outcomes
            </Typography>
            <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 4 }}>
              Selected authorized security challenges that have been successfully solved and cleared for educational publication. Confidential identities and proprietary program scopes remain protected.
            </Typography>

            {showcaseLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
                <CircularProgress size={30} />
              </Box>
            ) : showcaseItems.length === 0 ? (
              <Paper sx={{ p: 6, textAlign: 'center', backgroundColor: clayColors.surfaceRaised, borderRadius: '16px' }}>
                <Typography variant="h6" sx={{ color: clayColors.textPrimary, mb: 1 }}>
                  No published challenge summaries yet
                </Typography>
                <Typography variant="body2" sx={{ color: clayColors.textMuted }}>
                  Challenges under active research will appear here once solved and approved by the challenger.
                </Typography>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {showcaseItems.map((item) => (
                  <Grid item xs={12} md={6} key={item.id}>
                    <Paper
                      sx={{
                        p: 3.5,
                        borderRadius: '16px',
                        backgroundColor: clayColors.surfaceRaised,
                        border: `1px solid ${clayColors.borderSubtle}`,
                        boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(56, 189, 248, 0.1)',
                              color: clayColors.accentPrimary,
                              fontWeight: 700,
                              fontSize: '0.72rem',
                            }}
                          />
                          <Chip
                            label={`Difficulty: ${item.difficulty}`}
                            size="small"
                            sx={{
                              backgroundColor: clayColors.surfaceInset,
                              color: clayColors.textMuted,
                              fontSize: '0.72rem',
                            }}
                          />
                        </Box>

                        <Typography variant="h5" sx={{ fontSize: '1.2rem', fontWeight: 700, color: clayColors.textPrimary, mb: 1.5 }}>
                          {item.title}
                        </Typography>

                        <Typography variant="body2" sx={{ color: clayColors.textSecondary, mb: 2.5, lineHeight: 1.6 }}>
                          {item.publishedSummary?.outcome}
                        </Typography>
                      </Box>

                      <Box sx={{ p: 2, borderRadius: '10px', backgroundColor: clayColors.surfaceInset, border: `1px solid ${clayColors.borderSubtle}` }}>
                        <Typography variant="caption" sx={{ color: clayColors.success, fontWeight: 700, display: 'block', mb: 0.5 }}>
                          ARCHITECTURAL LESSON:
                        </Typography>
                        <Typography variant="caption" sx={{ color: clayColors.textSecondary, display: 'block', lineHeight: 1.5 }}>
                          {item.publishedSummary?.lessonsLearned}
                        </Typography>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </Box>
        )}
      </Container>
    </Box>
  );
}
