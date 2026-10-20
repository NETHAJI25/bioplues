import { useAppContext } from '../../app/providers';

export function Remediation() {
  const { findings } = useAppContext();

  // Get findings that need remediation
  const remediationFindings = findings.filter(f =>
    f.status === 'confirmed' ||
    f.status === 'needs_review' ||
    f.status === 'fix_in_progress'
  );

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Remediation Queue</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Stats */}
        <div className="mb-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Total Findings</h3>
              <p className="text-2xl font-bold text-primary">{findings.length}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Needing Remediation</h3>
              <p className="text-2xl font-bold text-amber">{remediationFindings.length}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">In Progress</h3>
              <p className="text-2xl font-bold text-amber">{findings.filter(f => f.status === 'fix_in_progress').length}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-secondary">Ready for Retest</h3>
              <p className="text-2xl font-bold text-teal">{findings.filter(f => f.status === 'ready_for_retest').length}</p>
            </div>
          </div>
        </div>

        {/* Remediation List */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          {remediationFindings.length === 0 ? (
            <p className="text-secondary/70 text-center py-8">No findings require remediation</p>
          ) : (
            <div className="space-y-4">
              {remediationFindings.map((finding) => (
                <div key={finding.id} className="flex items-start gap-4 p-4 bg-border/50 rounded-lg hover:bg-surface/50 transition-colors cursor-pointer">
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
                        finding.status === 'fix_in_progress' ? 'bg-amber/20 text-amber' :
                          'bg-secondary/20 text-secondary'}`}>
                        {finding.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <button className="px-3 py-1 bg-teal/20 text-teal hover:bg-teal/30 rounded-lg transition-colors">
                      Assign
                    </button>
                    <button className="px-3 py-1 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}