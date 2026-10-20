export type ScanType = 'passive' | 'active' | 'full' | 'api' | 'web' | 'network' | 'cloud' | 'secrets' | 'sast' | 'dast';
export type ScanStatus = 'queued' | 'running' | 'paused' | 'completed' | 'failed' | 'cancelled';

export interface StartScanRequest {
  targetId: string;
  name: string;
  type: ScanType;
  modules?: string[];
  config?: Record<string, any>;
}

export interface ScanProgressEvent {
  scanId: string;
  status: ScanStatus;
  progress: number;
  currentModule?: string;
  message?: string;
  findingsCount?: number;
}
