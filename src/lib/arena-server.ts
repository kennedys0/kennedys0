import crypto from 'crypto';

function hashFlag(flag: string): string {
  return crypto.createHash('sha256').update(flag.trim().toLowerCase()).digest('hex');
}

// Server-only precomputed hashes of acceptable flags & security flaw identifiers
const EXERCISE_ALLOWED_HASHES: Record<string, string[]> = {
  'arena-01': [
    hashFlag('FEKO{bola_order_id_sequential_leak}'),
    hashFlag('FEKO{bola}'),
    hashFlag('bola'),
    hashFlag('broken object level authorization'),
    hashFlag('idor'),
  ],
  'arena-02': [
    hashFlag('FEKO{jwt_alg_none_missing_signature_validation}'),
    hashFlag('FEKO{jwt_none}'),
    hashFlag('jwt algorithm none'),
    hashFlag('alg: none'),
    hashFlag('alg none'),
    hashFlag('none'),
  ],
  'arena-03': [
    hashFlag('FEKO{untrusted_forwarded_for_ip_spoof}'),
    hashFlag('FEKO{x_forwarded_for_spoof}'),
    hashFlag('x-forwarded-for'),
    hashFlag('ip spoofing'),
    hashFlag('rate limit bypass'),
  ],
  'arena-04': [
    hashFlag('FEKO{mass_assignment_unfiltered_dto_binding}'),
    hashFlag('FEKO{mass_assignment}'),
    hashFlag('mass assignment'),
    hashFlag('unfiltered dto'),
    hashFlag('privilege escalation'),
  ],
};

// Server-only solutions: only revealed after successful flag verification
export const EXERCISE_SOLUTIONS: Record<string, { explanation: string; remediation: string }> = {
  'arena-01': {
    explanation:
      'The order lookup query executed `SELECT * FROM orders WHERE id = :order_id` instead of `SELECT * FROM orders WHERE id = :order_id AND customer_id = :authenticated_user_id`. An attacker can increment order IDs sequentially to harvest all receipts.',
    remediation:
      'Always bind the query directly to the authenticated session context, or implement an object-level authorization filter before returning the entity.',
  },
  'arena-02': {
    explanation:
      'Early JWT implementations allowed the "none" algorithm for debugging. If the backend fails to enforce an explicit whitelist of allowed algorithms (e.g. RS256, ES256), attackers can forge any arbitrary claims simply by omitting the signature.',
    remediation:
      'Hardcode explicit allowed algorithms in the JWT verification library options (e.g., `algorithms: ["RS256"]`) and reject any tokens with "none" or mismatched algorithms.',
  },
  'arena-03': {
    explanation:
      'The application extracted the client IP from the user-controlled `X-Forwarded-For` header rather than the actual TCP socket connection address or trusted edge proxy headers.',
    remediation:
      'Configure the edge proxy to overwrite `X-Forwarded-For` with the remote client IP, or only inspect the leftmost IP if validated against known internal proxy CIDR ranges.',
  },
  'arena-04': {
    explanation:
      'The backend controller utilized an unchecked mass assignment pattern (e.g. `user.update(params)`), allowing the caller to inject privileged domain attributes.',
    remediation:
      'Use explicit Data Transfer Objects (DTOs) with strict parameter whitelists for update actions, ignoring any unexpected JSON fields.',
  },
};

export function verifyExerciseFlag(
  exerciseId: string,
  submittedFlag: string
): { correct: boolean; explanation?: string; remediation?: string } {
  const allowedHashes = EXERCISE_ALLOWED_HASHES[exerciseId];
  if (!allowedHashes || !submittedFlag || typeof submittedFlag !== 'string') {
    return { correct: false };
  }

  const submittedHash = hashFlag(submittedFlag);
  const isMatch = allowedHashes.some((expectedHash) => {
    const bufA = Buffer.from(expectedHash, 'utf8');
    const bufB = Buffer.from(submittedHash, 'utf8');
    if (bufA.length !== bufB.length) return false;
    return crypto.timingSafeEqual(bufA, bufB);
  });

  if (!isMatch) {
    return { correct: false };
  }

  const solution = EXERCISE_SOLUTIONS[exerciseId] || {
    explanation: 'Security flaw accurately identified and validated.',
    remediation: 'Implement contextual authorization checks and input boundary filters.',
  };

  return {
    correct: true,
    explanation: solution.explanation,
    remediation: solution.remediation,
  };
}
