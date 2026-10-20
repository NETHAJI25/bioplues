import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function ScanCenter() {
  const navigate = useNavigate();

  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load demo scans
    const demoScans = [
      {
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
        lowCount: 1
      },
      {
        id: 'scan-2',
        projectId: 'demo-project-1',
        projectName: 'Sample Store — Security Training Lab',
        profile: 'Quick Review',
        status: 'completed',
        startedAt: '2026-10-18T14:30:00Z',
        completedAt: '2026-10-18T14:35:00Z',
        findingsCount: 1,
        criticalCount: 0,
        highCount: 0,
        mediumCount: 1,
        lowCount: 0
      }
    ];

    setScans(demoScans);
    setLoading(false);
  }, []);

  const handleNewScan = () => {
    navigate('/scans/new');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-primary antialiased flex items-center justify-center py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-electric-blue border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-secondary/70">Loading scans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Scan Center</h1>
            <div className="flex items-center gap-3">
              <button onClick={handleNewScan} className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
                New Scan
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
        {scans.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary/70">No scans found. Start your first scan to get started.</p>
            <Link to="/scans/new" className="inline-block mt-4 px-6 py-3 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors">
              Create First Scan
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">Scan History</h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search scans..."
                  className="px-4 py-2 bg-surface border border-border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-electric-blue"
                />
                <select
                  className="px-4 py-2 bg-surface border border-border rounded-lg"
                >
                  <option value="all">All Scans</option>
                  <option value="completed">Completed</option>
                  <option value="running">Running</option>
                  <option value="failed">Failed</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {scans.map((scan) => (
                <div key={scan.id} className="bg-surface p-6 rounded-lg border border-border hover:bg-surface/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                        </div>
                        <div>
                          <h3 className="mb-1 text-lg font-medium text-primary">{scan.projectName}</h3>
                          <p className="text-sm text-secondary/80">{scan.profile} • {new Date(scan.startedAt).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-teal/20 rounded-full"></div>
                        <span className="text-teal">{scan.findingsCount} findings</span>
                      </div>
                      <div className="px-3 py-1 bg-surface/20 rounded-full">
                        {scan.status.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <Link to={`/scans/${scan.id}`} className="block">
                    <div className="absolute inset-0"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}