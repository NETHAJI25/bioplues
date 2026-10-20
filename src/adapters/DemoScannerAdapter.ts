import type { ScanRequest, ScanStatus, SecurityFinding } from '../domain/types';

// Demo scanner adapter for ProofShield
export class DemoScannerAdapter {
  private scanScenarios: any = {
    'demo-project-1': {
      'scan-1': [
        {
          id: 'finding-1',
          title: 'Missing Security Headers',
          category: 'Transport and security configuration',
          severity: 'medium',
          confidence: 'high',
          status: 'confirmed',
          affectedUrl: 'http://localhost:3000/',
          httpMethod: 'GET',
          evidenceSummary: 'Response missing X-Frame-Options, X-Content-Type-Options, and Content-Security-Policy headers.',
          evidenceSource: 'simulated',
          impact: 'Clickjacking and MIME-sniffing attacks possible.',
          remediation: 'Add security headers to HTTP responses.',
          references: ['OWASP Secure Headers Project'],
          firstObservedAt: '2026-10-19T10:00:00Z',
          lastObservedAt: '2026-10-19T10:00:00Z',
        },
        {
          id: 'finding-2',
          title: 'Cookie Missing Secure Attribute',
          category: 'Cookies and sessions',
          severity: 'low',
          confidence: 'high',
          status: 'confirmed',
          affectedUrl: 'http://localhost:3000/login',
          httpMethod: 'POST',
          evidenceSummary: 'Session cookie missing Secure and HttpOnly attributes.',
          evidenceSource: 'simulated',
          impact: 'Session cookie transmitted over unencrypted connections and accessible to JavaScript.',
          remediation: 'Set Secure and HttpOnly attributes on session cookies.',
          references: ['OWASP Session Management Cheat Sheet'],
          firstObservedAt: '2026-10-19T10:05:00Z',
          lastObservedAt: '2026-10-19T10:05:00Z',
        },
        {
          id: 'finding-3',
          title: 'Potential SQL Injection in Search Parameter',
          category: 'Input handling',
          severity: 'high',
          confidence: 'medium',
          status: 'needs_review',
          affectedUrl: 'http://localhost:3000/api/products',
          httpMethod: 'GET',
          evidenceSummary: 'Search parameter "q" returns different error messages when testing with single quote.',
          evidenceSource: 'simulated',
          impact: 'Possible SQL injection vulnerability in product search.',
          remediation: 'Use parameterized queries or ORM with proper input validation.',
          references: ['OWASP SQL Injection Prevention Cheat Sheet'],
          firstObservedAt: '2026-10-19T10:10:00Z',
          lastObservedAt: '2026-10-19T10:10:00Z',
        }
      ]
    }
  };

  async validateConfiguration(): Promise<{ available: boolean; message: string }> {
    // In demo mode, always available
    return {
      available: true,
      message: 'Demo scanner is ready'
    };
  }

  async startScan(_request: ScanRequest): Promise<{ scanId: string; status: ScanStatus }> {
    // Simulate scan start
    return {
      scanId: `scan-${Date.now()}`,
      status: 'queued'
    };
  }

  async getScanStatus(scanId: string): Promise<{
    scanId: string;
    status: ScanStatus;
    progress: number;
  }> {
    // Simulate scan progress
    // For demo, we'll return a completed scan after a short progress
    // In a real implementation, this would check the actual scan status
    return {
      scanId,
      status: 'completed',
      progress: 100
    };
  }

  async getFindings(_scanId: string): Promise<SecurityFinding[]> {
    // Return demo findings based on projectId (we don't have projectId in scanId, so we'll use a fixed project)
    // In a real implementation, we would map scanId to project and return the appropriate findings
    return this.scanScenarios['demo-project-1']['scan-1'];
  }

  async cancelScan(_scanId: string): Promise<void> {
    // Simulate scan cancellation
    return Promise.resolve();
  }
}