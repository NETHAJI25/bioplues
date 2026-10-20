import { useAppContext } from '../../app/providers';

export function Dashboard() {
  const { projects, findings } = useAppContext();

  // Calculate stats
  const totalProjects = projects.length;
  const scansCompleted = 24; // demo data
  const openFindings = findings.filter(f => f.status !== 'verified_fixed' && f.status !== 'false_positive').length;
  const criticalHighFindings = findings.filter(f => (f.severity === 'critical' || f.severity === 'high') && f.status !== 'verified_fixed').length;
  const findingsAwaitingRetest = findings.filter(f => f.status === 'ready_for_retest').length;
  const verifiedFixes = findings.filter(f => f.status === 'verified_fixed').length;
  const latestScanStatus = 'completed'; // demo
  const coverageSummary = '85%'; // demo

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Security Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
                New Project
              </button>
              <button className="px-4 py-2 bg-teal/20 text-teal hover:bg-teal/30 rounded-lg transition-colors">
                New Scan
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Overview Cards */}
        <div className="grid gap-6 mb-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Total Projects</h3>
            <p className="text-2xl font-bold text-primary">{totalProjects}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Scans Completed</h3>
            <p className="text-2xl font-bold text-teal">{scansCompleted}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Open Findings</h3>
            <p className="text-2xl font-bold text-amber">{openFindings}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Critical & High</h3>
            <p className="text-2xl font-bold text-critical-red">{criticalHighFindings}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Awaiting Retest</h3>
            <p className="text-2xl font-bold text-amber">{findingsAwaitingRetest}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Verified Fixes</h3>
            <p className="text-2xl font-bold text-teal">{verifiedFixes}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Latest Scan</h3>
            <p className="text-2xl font-bold text-primary">{latestScanStatus}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Coverage</h3>
            <p className="text-2xl font-bold text-primary">{coverageSummary}</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid gap-8 mb-8 sm:grid-cols-1 lg:grid-cols-2">
          {/* Severity Distribution */}
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-4 text-lg font-medium text-secondary">Finding Severity Distribution</h3>
            <div className="h-40">
              {/* Placeholder for chart */}
              <div className="flex items-center justify-center text-secondary/50">
                Severity Chart (Recharts would go here)
              </div>
            </div>
          </div>
          {/* Findings Over Time */}
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-4 text-lg font-medium text-secondary">Findings Over Time</h3>
            <div className="h-40">
              <div className="flex items-center justify-center text-secondary/50">
                Timeline Chart (Recharts would go here)
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h3 className="mb-4 text-lg font-medium text-secondary">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-border/50 rounded-lg">
              <div className="w-8 h-8 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a.5.5 0 110-1 .5.5 0 010 1z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary">Scan completed for Sample Store</p>
                <p className="text-sm text-secondary/70">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-border/50 rounded-lg">
              <div className="w-8 h-8 bg-teal/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M5 18h1a2 2 0 012-2V9a2 2 0 01-2-2H5a2 2 0 01-2 2v6z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary">New finding: Missing Security Headers</p>
                <p className="text-sm text-secondary/70">5 minutes ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-border/50 rounded-lg">
              <div className="w-8 h-8 bg-amber/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
              </div>
              <div>
                <p className="font-medium text-primary">Retest initiated for Cookie Security</p>
                <p className="text-sm text-secondary/70">10 minutes ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}