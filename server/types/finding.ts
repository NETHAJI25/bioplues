export type FindingSeverity = 'critical' | 'high' | 'medium' | 'low' | 'info';
export type FindingStatus = 'open' | 'confirmed' | 'false_positive' | 'accepted_risk' | 'remediated' | 'retest';
export type FindingConfidence = 'confirmed' | 'firm' | 'tentative';

export interface BulkUpdateFindingsRequest {
  findingIds: string[];
  updates: {
    status?: FindingStatus;
    severity?: FindingSeverity;
    tags?: string[];
    notes?: string;
  };
}

export interface FindingFilter extends Record<string, any> {
  severity?: FindingSeverity[];
  status?: FindingStatus[];
  projectId?: string;
  scanId?: string;
  kev?: boolean;
  minCvss?: number;
}
