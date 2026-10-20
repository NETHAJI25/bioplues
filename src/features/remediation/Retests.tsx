import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../app/providers';

const severityDot: Record<string, string> = {
  critical: 'bg-critical-red',
  high: 'bg-critical-red',
  medium: 'bg-amber',
  low: 'bg-teal',
  info: 'bg-secondary',
};

export function Retests() {
  const { findings } = useAppContext();
  const [submitted, setSubmitted] = useState<string[]>([]);

  const queue = findings.filter(f => f.status === 'ready_for_retest');
  const verified = findings.filter(f => f.status === 'verified_fixed');

  const runRetest = (findingId: string) => {
    setSubmitted(prev => (prev.includes(findingId) ? prev : [...prev, findingId]));
  };

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Retest Queue</h1>
            <Link to="/remediation" className="text-sm text-secondary/70 hover:text-secondary">
              Back to Remediation
            </Link>
          </div>
        </div>
      </header>

      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Awaiting Retest</h3>
            <p className="text-2xl font-bold text-amber">{queue.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Verified Fixed</h3>
            <p className="text-2xl font-bold text-teal">{verified.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Submitted This Session</h3>
            <p className="text-2xl font-bold text-electric-blue">{submitted.length}</p>
          </div>
        </div>

        {/* Queue */}
        <div className="bg-surface p-6 rounded-lg border border-border mb-8">
          <h2 className="text-lg font-semibold text-primary mb-4">Ready for Retest</h2>
          {queue.length === 0 ? (
            <p className="text-secondary/70 text-center py-8">
              No findings are waiting for retest. Mark a remediated finding as “Ready for Retest” first.
            </p>
          ) : (
            <div className="space-y-4">
              {queue.map(finding => (
                <div key={finding.id} className="flex items-start gap-4 p-4 bg-border/50 rounded-lg">
                  <div className={`w-3 h-3 flex-shrink-0 mt-1 rounded-full ${severityDot[finding.severity] ?? 'bg-secondary'}`} />
                  <div className="flex-1 min-w-0">
                    <h3 className="mb-1 text-lg font-medium text-primary">{finding.title}</h3>
                    <p className="text-sm text-secondary/80">{finding.category} · {finding.affectedUrl}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-amber/20 text-amber">
                        {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)} severity
                      </span>
                      <span className="px-2 py-1 text-xs rounded-full bg-electric-blue/20 text-electric-blue">
                        READY FOR RETEST
                      </span>
                      {submitted.includes(finding.id) && (
                        <span className="px-2 py-1 text-xs rounded-full bg-teal/20 text-teal">
                          RETEST SUBMITTED
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Link
                      to={`/findings/${finding.id}`}
                      className="px-3 py-1 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors"
                    >
                      View
                    </Link>
                    <button
                      type="button"
                      onClick={() => runRetest(finding.id)}
                      disabled={submitted.includes(finding.id)}
                      className="px-3 py-1 bg-teal/20 text-teal hover:bg-teal/30 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitted.includes(finding.id) ? 'Queued' : 'Run Retest'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* History */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Verified Fixes</h2>
          {verified.length === 0 ? (
            <p className="text-secondary/70 text-center py-8">No verified fixes yet</p>
          ) : (
            <div className="space-y-3">
              {verified.map(finding => (
                <div key={finding.id} className="flex items-center justify-between p-4 bg-border/50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-primary">{finding.title}</h3>
                    <p className="text-sm text-secondary/80">Last observed: {finding.lastObservedAt}</p>
                  </div>
                  <span className="px-2 py-1 text-xs rounded-full bg-teal/20 text-teal">VERIFIED FIXED</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
