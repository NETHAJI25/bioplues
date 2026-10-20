import { Link } from 'react-router-dom';
import { useAppContext } from '../../app/providers';

interface ReportSummary {
  id: string;
  title: string;
  projectId: string;
  generatedAt: string;
  status: 'ready' | 'draft';
}

const demoReports: ReportSummary[] = [
  {
    id: 'report-1',
    title: 'Security Assessment — Sample Store',
    projectId: 'demo-project-1',
    generatedAt: '2026-10-19',
    status: 'ready',
  },
  {
    id: 'report-2',
    title: 'Retest Summary — Sample Store',
    projectId: 'demo-project-1',
    generatedAt: '2026-10-19',
    status: 'draft',
  },
];

export function Reports() {
  const { findings } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Reports</h1>
            <button
              type="button"
              className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors"
            >
              + Generate Report
            </button>
          </div>
        </div>
      </header>

      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-3">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Reports</h3>
            <p className="text-2xl font-bold text-primary">{demoReports.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Findings Included</h3>
            <p className="text-2xl font-bold text-primary">{findings.length}</p>
          </div>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h3 className="mb-3 text-lg font-medium text-secondary">Open Findings</h3>
            <p className="text-2xl font-bold text-amber">
              {findings.filter(f => f.status !== 'verified_fixed' && f.status !== 'false_positive').length}
            </p>
          </div>
        </div>

        {/* Report list */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Generated Reports</h2>
          <div className="space-y-4">
            {demoReports.map(report => (
              <div key={report.id} className="flex items-center justify-between p-4 bg-border/50 rounded-lg hover:bg-surface/50 transition-colors">
                <div>
                  <h3 className="text-lg font-medium text-primary">{report.title}</h3>
                  <p className="text-sm text-secondary/80">
                    Generated {report.generatedAt} · Project {report.projectId}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`px-2 py-1 text-xs rounded-full ${report.status === 'ready' ? 'bg-teal/20 text-teal' : 'bg-amber/20 text-amber'}`}>
                    {report.status.toUpperCase()}
                  </span>
                  <Link
                    to={`/reports/${report.id}`}
                    className="px-3 py-1 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
