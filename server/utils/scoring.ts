import type { FindingSeverity } from '../types/index.ts';

const severityWeights: Record<FindingSeverity, number> = {
  critical: 9.5,
  high: 8.0,
  medium: 5.5,
  low: 2.5,
  info: 0.5,
};

const assetCriticalityWeights: Record<string, number> = {
  critical: 1.4,
  high: 1.2,
  medium: 1.0,
  low: 0.8,
};

export interface RiskFactors {
  severity: FindingSeverity;
  cvssScore?: number;
  epssScore?: number;
  kev?: boolean;
  assetCriticality?: string;
  exposure?: number; // 0-1
  confidence?: number; // 0-1
}

export const calculateRiskScore = (factors: RiskFactors): number => {
  const base = severityWeights[factors.severity] || 1.0;
  let score = base;
  
  if (factors.cvssScore && factors.cvssScore > 0) {
    score = Math.max(score, factors.cvssScore);
  }
  
  const crit = factors.assetCriticality || 'medium';
  score *= assetCriticalityWeights[crit] || 1.0;
  
  if (factors.kev) {
    score *= 1.25;
  }
  
  if (factors.epssScore !== undefined && factors.epssScore > 0) {
    score += factors.epssScore * 2.0;
  }
  
  if (factors.exposure !== undefined) {
    score *= (0.8 + factors.exposure * 0.4);
  }
  
  if (factors.confidence !== undefined) {
    score *= (0.7 + factors.confidence * 0.3);
  }
  
  return Math.min(10.0, Math.max(0.0, Math.round(score * 10) / 10));
};

export const getRiskLevel = (score: number): FindingSeverity => {
  if (score >= 9.0) return 'critical';
  if (score >= 7.0) return 'high';
  if (score >= 4.0) return 'medium';
  if (score >= 1.0) return 'low';
  return 'info';
};
