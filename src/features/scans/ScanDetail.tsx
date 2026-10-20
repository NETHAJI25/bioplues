import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function ScanDetail() {
  const { scanId } = useParams<{ scanId: string }>();

  const [scan, setScan] = useState<any>(null);
  const [findings, setFindings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo scan data
    const demoScan = {
      id: 'scan-1',
      projectId: 'demo-project-1',
      projectName: 'Sample Store — Security Training Lab',
      profile: 'Standard Assessment',
      status: 'completed',
      startedAt: '2026-10-19T10:00:00Z',
      completedAt: '2026-10-19T10:15:00Z',
      findingsCount: 3,
      criticalCount: 0,
      highCount: 1,
      mediumCount: 1,
      lowCount: 1,
      endpointsDiscovered: 24,
      endpointsInScope: 20,
      requestsMade: 158
    };

    // Load demo findings for this scan
    const demoFindings = [
      {
        id: 'finding-1',
        projectId: 'demo-project-1',
        scanId: 'scan-1',
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
        projectId: 'demo-project-1',
        scanId: 'scan-1',
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
        projectId: 'demo-project-1',
        scanId: 'scan-1',
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
    ];

    setScan(demoScan);
    setFindings(demoFindings);
    setLoading(false);
  }, [scanId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-primary antialiased flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-secondary/70">Loading scan details...</p>
        </div>
      </div>
    );
  }

  if (!scan) {
    return (
      <div className="min-h-screen bg-background text-primary antialiased flex items-center justify-center py-12">
        <p className="text-secondary/70">Scan not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/scans" className="text-sm text-electric-blue hover:text-electric-blue/80">
              ← Back to Scan Center
            </Link>
            <h1 className="text-2xl font-bold text-electric-blue">Scan Details</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-teal/20 text-teal hover:bg-teal/30 rounded-lg transition-colors">
                View Findings
              </button>
              <button className="px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors">
                Refresh
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Scan Overview */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">Scan Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Project</h3>
              <p className="text-primary">{scan.projectName}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Scan Profile</h3>
              <p className="text-primary">{scan.profile}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Status</h3>
              <span className={`px-3 py-1 ${scan.status === 'completed' ? 'bg-teal/20 text-teal' : scan.status === 'running' ? 'bg-electric-blue/20 text-electric-blue' : 'bg-amber/20 text-amber'} rounded-full text-sm`}>
                {scan.status.toUpperCase()}
              </span>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Duration</h3>
              <p className="text-primary">
                {scan.startedAt && scan.completedAt ?
                  `${(new Date(scan.completedAt).getTime() - new Date(scan.startedAt).getTime()) / 1000}s` :
                  'In progress'}
              </p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Start Time</h3>
              <p className="text-secondary/90">{scan.startedAt ? new Date(scan.startedAt).toLocaleString() : '-'}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">End Time</h3>
              <p className="text-secondary/90">{scan.completedAt ? new Date(scan.completedAt).toLocaleString() : '-'}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Findings</h3>
              <p className="text-2xl font-bold text-primary">{scan.findingsCount}</p>
            </div>
          </div>

          {/* Severity Breakdown */}
          <div className="mt-6">
            <h3 className="mb-3 text-lg font-medium text-secondary">Findings by Severity</h3>
            <div className="grid gap-4 sm:grid-cols-4">
              <div className="bg-surface p-4 rounded-lg border border-border text-center">
                <p className="text-secondary/80">Critical</p>
                <p className="text-2xl font-bold text-critical-red">{scan.criticalCount}</p>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border text-center">
                <p className="text-secondary/80">High</p>
                <p className="text-2xl font-bold text-critical-red">{scan.highCount}</p>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border text-center">
                <p className="text-secondary/80">Medium</p>
                <p className="text-2xl font-bold text-amber">{scan.mediumCount}</p>
              </div>
              <div className="bg-surface p-4 rounded-lg border border-border text-center">
                <p className="text-secondary/80">Low</p>
                <p className="text-2xl font-bold text-teal">{scan.lowCount}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Metrics */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">Scan Coverage</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Endpoints Discovered</h3>
              <p className="text-2xl font-bold text-primary">{scan.endpointsDiscovered}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Endpoints In-Scope</h3>
              <p className="text-2xl font-bold text-primary">{scan.endpointsInScope}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">HTTP Requests Made</h3>
              <p className="text-2xl font-bold text-primary">{scan.requestsMade}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Scan Duration</h3>
              <p className="text-2xl font-bold text-primary">15m</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Coverage %</h3>
              <p className="text-2xl font-bold text-primary">83%</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Requests/Minute</h3>
              <p className="text-2xl font-bold text-primary">10.5</p>
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">Discovered Findings</h2>
          <div className="bg-surface p-6 rounded-lg border border-border">
            {findings.length === 0 ? (
              <p className="text-secondary/70 text-center py-8">No findings discovered</p>
            ) : (
              <div className="space-y-4">
                {findings.map((finding) => (
                  <div key={finding.id} className="flex items-start gap-4 p-4 bg-border/50 rounded-lg">
                    <div className="w-3 h-3 flex-shrink-0">
                      <div className={`w-3 h-3 rounded-full ${finding.severity === 'critical' ? 'bg-critical-red' : finding.severity === 'high' ? 'bg-critical-red' : finding.severity === 'medium' ? 'bg-amber' : finding.severity === 'low' ? 'bg-teal' : 'bg-secondary'}`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-lg font-medium text-primary">{finding.title}</h3>
                      <p className="text-sm text-secondary/80">{finding.category}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          finding.severity === 'critical' ? 'bg-critical-red/20 text-critical-red' :
                            finding.severity === 'high' ? 'bg-critical-red/20 text-critical-red' :
                              finding.severity === 'medium' ? 'bg-amber/20 text-amber' :
                                finding.severity === 'low' ? 'bg-teal/20 text-teal' :
                                  'bg-secondary/20 text-secondary'}`}>
                          {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          finding.confidence === 'high' ? 'bg-teal/20 text-teal' :
                            finding.confidence === 'medium' ? 'bg-amber/20 text-amber' :
                              'bg-secondary/20 text-secondary'}`}>
                          {finding.confidence.charAt(0).toUpperCase() + finding.confidence.slice(1)}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          finding.status === 'confirmed' ? 'bg-teal/20 text-teal' :
                            finding.status === 'needs_review' ? 'bg-amber/20 text-amber' :
                              finding.status === 'false_positive' ? 'bg-secondary/20 text-secondary' :
                                finding.status === 'verified_fixed' ? 'bg-teal/20 text-teal' :
                                  'bg-border/20 text-border'}`}>
                          {finding.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <Link to={`/findings/${finding.id}`} className="block">
                      <div className="absolute inset-0"></div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <button className="px-6 py-3 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors">
            Retest Scan
          </button>
          <button className="px-6 py-3 bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors">
            Export Report
          </button>
        </div>
      </main>
    </div>
  );
}