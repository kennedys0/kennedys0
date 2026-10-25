import fs from 'fs';
import path from 'path';
import { ChallengeSubmission } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');
const CHALLENGES_FILE = path.join(DATA_DIR, 'challenges.json');

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Initial seed data with published challenges demonstrating FEKOJEWAN's verified work
const SEED_CHALLENGES: ChallengeSubmission[] = [
  {
    id: 'ch-seed-001',
    trackingToken: 'a4f91b7d8e204c559012beef',
    challengerName: 'Fintech SecOps Team',
    challengerEmail: 'security@fintech-partner.example',
    title: 'Microservices IDOR in Settlement Split API',
    category: 'API Security',
    difficulty: 'Advanced',
    description: 'A multi-tenant settlement transaction service allowed internal split transfers without cross-checking tenant organization boundaries on intermediate ledger nodes.',
    objective: 'Demonstrate whether an authorized ledger operator can alter split recipients across foreign merchant accounts.',
    environmentType: 'Staging Multi-Tenant Cluster',
    authorizedScope: 'api.staging.ledger-settle.internal/v2/splits/*',
    reproductionPrerequisites: 'Test merchant credentials for two isolated sandbox orgs.',
    status: 'Solved',
    createdAt: '2026-08-14T09:20:00Z',
    updatedAt: '2026-08-20T14:30:00Z',
    adminNotes: 'Confirmed BOLA via batch payload manipulation. Coordinated fix deployed within 72 hours.',
    publishedSummary: {
      outcome: 'Vulnerability verified and patch coordinated. Zero unauthorized funds transferred.',
      lessonsLearned: 'Decoupled ledger services must enforce organization boundary checks at the object validator layer, not solely in gateway tokens.',
      publishedAt: '2026-09-01T10:00:00Z',
    },
  },
  {
    id: 'ch-seed-002',
    trackingToken: '3c8e90f124a87b55d912feed',
    challengerName: 'Cloud SaaS Infrastructure Lead',
    challengerEmail: 'infosec@saas-identity.example',
    title: 'OAuth Dynamic State Relay & CSRF Race Condition',
    category: 'Authentication',
    difficulty: 'Expert',
    description: 'During federated SSO callback, rapid concurrent state exchanges could cause transient session binding desynchronization.',
    objective: 'Verify if a state parameter can be reused within the 30-second TTL across concurrent browser sessions.',
    environmentType: 'Pre-Production Staging SSO Portal',
    authorizedScope: 'auth.preprod.identity-hub.example/oauth/v2/callback',
    status: 'Solved',
    createdAt: '2026-09-10T11:00:00Z',
    updatedAt: '2026-09-15T18:00:00Z',
    adminNotes: 'Identified race window in Redis single-use state invalidation. Solved using atomic Lua script.',
    publishedSummary: {
      outcome: 'State invalidation hardened with atomic Lua transaction script; concurrent reuse rendered impossible.',
      lessonsLearned: 'Single-use cryptographic state tokens must be invalidated atomically in key-value caches upon first read.',
      publishedAt: '2026-09-25T12:00:00Z',
    },
  },
];

export async function getAllChallenges(): Promise<ChallengeSubmission[]> {
  ensureDataDir();
  try {
    if (!fs.existsSync(CHALLENGES_FILE)) {
      await fs.promises.writeFile(CHALLENGES_FILE, JSON.stringify(SEED_CHALLENGES, null, 2), 'utf8');
      return SEED_CHALLENGES;
    }
    const data = await fs.promises.readFile(CHALLENGES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading challenges data file:', err);
    return SEED_CHALLENGES;
  }
}

export async function getChallengeByToken(token: string): Promise<ChallengeSubmission | null> {
  const challenges = await getAllChallenges();
  const challenge = challenges.find((c) => c.trackingToken.toLowerCase() === token.trim().toLowerCase());
  return challenge || null;
}

export async function getChallengeById(id: string): Promise<ChallengeSubmission | null> {
  const challenges = await getAllChallenges();
  return challenges.find((c) => c.id === id) || null;
}

// Async mutex to serialize file writes and prevent race-condition lost updates
let writeLock: Promise<void> = Promise.resolve();

function withWriteLock<T>(fn: () => Promise<T>): Promise<T> {
  let release: (value: T) => void;
  let reject: (err: unknown) => void;
  const result = new Promise<T>((res, rej) => {
    release = res;
    reject = rej;
  });

  writeLock = writeLock.then(() =>
    fn().then(release!, reject!)
  ).catch(() => {/* keep chain alive */});

  return result;
}

export async function saveChallenge(submission: ChallengeSubmission): Promise<void> {
  return withWriteLock(async () => {
    ensureDataDir();
    const challenges = await getAllChallenges();
    const existingIdx = challenges.findIndex((c) => c.id === submission.id);

    if (existingIdx >= 0) {
      challenges[existingIdx] = submission;
    } else {
      challenges.unshift(submission);
    }

    // Atomic write via temp file
    const tempFile = `${CHALLENGES_FILE}.tmp.${Date.now()}`;
    await fs.promises.writeFile(tempFile, JSON.stringify(challenges, null, 2), 'utf8');
    await fs.promises.rename(tempFile, CHALLENGES_FILE);
  });
}

