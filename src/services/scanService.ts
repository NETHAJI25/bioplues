import { DemoScannerAdapter } from '../adapters/DemoScannerAdapter';
import type { ScanRequest, ScanStatus, SecurityFinding } from '../domain/types';

const demoScanner = new DemoScannerAdapter();

export class ScanService {
  private static instance: ScanService;

  private constructor() {}

  public static getInstance(): ScanService {
    if (!ScanService.instance) {
      ScanService.instance = new ScanService();
    }
    return ScanService.instance;
  }

  async validateScanConfig(_projectId: string): Promise<{ available: boolean; message: string }> {
    return await demoScanner.validateConfiguration();
  }

  async startScan(request: ScanRequest): Promise<{ scanId: string; status: ScanStatus }> {
    return await demoScanner.startScan(request);
  }

  async getScanStatus(scanId: string): Promise<{
    scanId: string;
    status: ScanStatus;
    progress: number;
  }> {
    return await demoScanner.getScanStatus(scanId);
  }

  async getScanFindings(scanId: string): Promise<SecurityFinding[]> {
    return await demoScanner.getFindings(scanId);
  }

  async cancelScan(scanId: string): Promise<void> {
    return await demoScanner.cancelScan(scanId);
  }
}