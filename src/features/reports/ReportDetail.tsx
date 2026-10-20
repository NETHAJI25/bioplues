import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useAppContext } from '../../app/providers';

const severityOrder = ['critical', 'high', 'medium', 'low', 'info'] as const;

const severityText: Record<string, string> = {
  critical: 'text-critical-red',
  high: 'text-critical-red',
  medium: 'text-amber',
  low: 'text-teal',
  info: 'text-secondary',
};

export function ReportDetail() {
  const { reportId } = useParams();
  const { findings } = useAppContext();
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  const openFindings = findings.filter(f => f.status !== 'verified_fixed' && f.status !== 'false_positive');
  const fixedFindings = findings.filter(f => f.status === 'verified_fixed');

  const bySeverity = severityOrder.map(severity => ({
    severity,
    count: findings.filter(f => f.severity === severity).length,
  }));

  const handleExport = (format: string) => {
    setExportMessage(`${format} export queued (demo mode — no file generated).`);
  };

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link to="/reports" className="text-sm text-electric-blue hover:text-electric-blue/80">
                ← Back to Reports
              </Link>
              <h1 className="text-2xl font-bold text-primary mt-1">
                Security Assessment Report
              </h1>
              <p className="text-sm text-secondary/80">Report ID: {reportId} · Sample Store — Security Training Lab</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => handleExport('JSON')}
                className="px-3 py-2 text-sm bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors"
              >
                Export JSON
              </button>
              <button
                type="button"
                onClick={() => handleExport('CSV')}
                className="px-3 py-2 text-sm bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors"
              >
                Export CSV
              </button>
              <button
                type="button"
                onClick={() => handleExport('PDF')}
                className="px-3 py-2 text-sm bg-electric-blue text-primary rounded-lg hover:bg-electric-blue/80 transition-colors"
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-8 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        {exportMessage && (
          <div className="mb-6 px-4 py-3 bg-teal/10 border border-teal/40 text-teal rounded-lg text-sm">
            {exportMessage}
          </div>
        )}

        {/* Executive summary */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Total Findings</h3>
            <p className="text-2xl font-bold text-primary">{findings.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Open</h3>
            <p className="text-2xl font-bold text-amber">{openFindings.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Verified Fixed</h3>
            <p className="text-2xl font-bold text-teal">{fixedFindings.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Scan Coverage</h3>
            <p className="text-2xl font-bold text-electric-blue">1 scan</p>
          </div>
        </div>

        {/* Severity breakdown */}
        <div className="mb-8 bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Findings by Severity</h2>
          <div className="space-y-3">
            {bySeverity.map(({ severity, count }) => (
              <div key={severity} className="flex items-center gap-4">
                <span className={`w-24 text-sm font-medium capitalize ${severityText[severity]}`}>{severity}</span>
                <div className="flex-1 h-3 bg-border/50 rounded-full overflow-hidden">
                  <div
                    className={`h-3 rounded-full ${
                      severity === 'critical' || severity === 'high'
                        ? 'bg-critical-red'
                        : severity === 'medium'
                          ? 'bg-amber'
                          : severity === 'low'
                            ? 'bg-teal'
                            : 'bg-secondary'
                    }`}
                    style={{ width: `${findings.length > 0 ? (count / findings.length) * 100 : 0}%` }}
                  />
                </div>
                <span className="w-8 text-right text-sm text-secondary">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Finding list */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Findings Detail</h2>
          <div className="space-y-4">
            {findings.map(finding => (
              <Link
                key={finding.id}
                to={`/findings/${finding.id}`}
                className="block p-4 bg-border/50 rounded-lg hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-medium text-primary">{finding.title}</h3>
                    <p className="text-sm text-secondary/80 mt-1">{finding.evidenceSummary}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      finding.severity === 'critical' || finding.severity === 'high'
                        ? 'bg-critical-red/20 text-critical-red'
                        : finding.severity === 'medium'
                          ? 'bg-amber/20 text-amber'
                          : 'bg-teal/20 text-teal'
                    }`}>
                      {finding.severity.toUpperCase()}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-secondary/20 text-secondary">
                      {finding.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
