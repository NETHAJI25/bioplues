import type { FindingSeverity } from '../types/index.ts';

export interface DedupCandidate {
  title: string;
  assetId?: string | null;
  affectedUrl?: string | null;
  parameter?: string | null;
  severity: FindingSeverity;
}

export const createFindingKey = (f: DedupCandidate): string => {
  const asset = f.assetId || 'global';
  const url = f.affectedUrl || '';
  const param = f.parameter || '';
  const title = f.title.toLowerCase().trim().replace(/\s+/g, ' ');
  return `${asset}:${url}:${param}:${title}`;
};

export const deduplicateFindings = <T extends DedupCandidate>(findings: T[]): T[] => {
  const seen = new Set<string>();
  return findings.filter((f) => {
    const key = createFindingKey(f);
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
};
