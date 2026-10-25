export type ChallengeCategory =
  | 'Web Security'
  | 'API Security'
  | 'Authentication'
  | 'Authorization'
  | 'Business Logic'
  | 'Vulnerability Analysis'
  | 'CTF / Lab'
  | 'Other';

export type ChallengeDifficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export type ChallengeStatus =
  | 'Submitted'
  | 'Under Review'
  | 'Accepted'
  | 'In Progress'
  | 'Solved'
  | 'Declined'
  | 'Closed';

export interface ChallengeSubmission {
  id: string;
  trackingToken: string;
  challengerName: string;
  challengerEmail: string;
  title: string;
  category: ChallengeCategory;
  difficulty: ChallengeDifficulty;
  description: string;
  objective: string;
  environmentType: string;
  authorizedScope: string;
  reproductionPrerequisites?: string;
  referenceLinks?: string;
  rulesConstraints?: string;
  status: ChallengeStatus;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  publishedSummary?: {
    outcome: string;
    lessonsLearned: string;
    publishedAt: string;
  };
}

export type SeverityLevel = 'Critical' | 'High' | 'Medium' | 'Low' | 'Informational';

export interface VulnerabilityFinding {
  id: string;
  title: string;
  category: string;
  domain: 'Web' | 'API';
  severity: SeverityLevel;
  affectedTechnology: string;
  summary: string;
  impact: string;
  remediation: string;
  disclosureStatus: 'Disclosed' | 'Remediated & Coordinated' | 'Report Accepted';
  publicationDate: string;
  references?: string[];
  publicWriteupSlug?: string;
}

export interface SecurityWriteup {
  slug: string;
  title: string;
  summary: string;
  category: string;
  domain: 'Web' | 'API';
  readingTime: string;
  publishedAt: string;
  tags: string[];
  content: string; // Markdown / structured content
  remediationSnippet?: string;
}

export interface SyntheticExercise {
  id: string;
  title: string;
  domain: 'Web' | 'API';
  category: string;
  difficulty: ChallengeDifficulty;
  scenario: string;
  objective: string;
  hint: string;
  httpRequest: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    headers: Record<string, string>;
    body?: string;
  };
  httpResponse: {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    body: string;
  };
  explanation: string;
  remediation: string;
}
