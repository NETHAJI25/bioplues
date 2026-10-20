// Shared domain types for scans and findings.
// These mirror the scanner adapter contract so real adapters
// (OWASP ZAP, etc.) can be swapped in without touching the UI.

export type ScanStatus =
  | 'queued'
  | 'running'
  | 'completed'
  | 'failed'
  | 'cancelled';

export type Severity = 'critical' | 'high' | 'medium' | 'low' | 'info';

export type Confidence = 'high' | 'medium' | 'low';

export type FindingStatus =
  | 'needs_review'
  | 'confirmed'
  | 'false_positive'
  | 'fix_in_progress'
  | 'ready_for_retest'
  | 'verified_fixed';

export type ScanType = 'full' | 'quick' | 'retest';

export interface ScanRequest {
  projectId: string;
  targetUrl: string;
  scanType?: ScanType;
  /** When re-running a scan to verify a fix. */
  retestOfScanId?: string;
  /** Optional scope allow-list; defaults to the project scope. */
  includePaths?: string[];
  excludePaths?: string[];
}

export interface ScanProgress {
  scanId: string;
  status: ScanStatus;
  progress: number;
}

export interface SecurityFinding {
  id: string;
  projectId?: string;
  scanId?: string;
  title: string;
  category: string;
  severity: Severity;
  confidence: Confidence;
  status: FindingStatus;
  affectedUrl: string;
  httpMethod: string;
  evidenceSummary: string;
  evidenceSource: 'simulated' | 'scanner' | 'manual';
  impact: string;
  remediation: string;
  references: string[];
  firstObservedAt: string;
  lastObservedAt: string;
}
