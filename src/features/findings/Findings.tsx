import { useAppContext } from '../../app/providers';
import { Link, useSearchParams } from 'react-router-dom';

export function Findings() {
  const { findings } = useAppContext();
  const [searchParams] = useSearchParams();

  // Filters from URL params
  const severityFilter = searchParams.get('severity') || '';
  const statusFilter = searchParams.get('status') || '';
  const categoryFilter = searchParams.get('category') || '';
  const confidenceFilter = searchParams.get('confidence') || '';
  const searchTerm = searchParams.get('q') || '';

  // Filter findings
  const filteredFindings = findings.filter(finding => {
    const matchesSeverity = !severityFilter || finding.severity === severityFilter;
    const matchesStatus = !statusFilter || finding.status === statusFilter;
    const matchesCategory = !categoryFilter || finding.category === categoryFilter;
    const matchesConfidence = !confidenceFilter || finding.confidence === confidenceFilter;
    const matchesSearch = !searchTerm ||
      finding.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      finding.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (finding.affectedUrl && finding.affectedUrl.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesSeverity && matchesStatus && matchesCategory && matchesConfidence && matchesSearch;
  });

  const handleFilterChange = (params: Record<string, string>) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value);
      }
    });
    // Update URL without triggering reload
    window.history.replaceState({}, '', `?${newParams.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Findings Inbox</h1>
            <div className="flex items-center gap-3">
              <input
                type="text"
                placeholder="Search findings..."
                value={searchTerm}
                onChange={(e) => {
                  const params = new URLSearchParams(searchParams);
                  params.set('q', e.target.value);
                  handleFilterChange(Object.fromEntries(params));
                }}
                className="px-4 py-3 bg-surface border border-border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-electric-blue"
              />
              <Link to="/findings" className="px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors">
                Clear Filters
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Filters */}
        <div className="mb-8">
          <div className="bg-surface p-6 rounded-lg border border-border">
            <h2 className="mb-4 text-xl font-semibold text-primary">Filter Findings</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Severity</label>
                <select
                  value={severityFilter}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('severity', e.target.value);
                    handleFilterChange(Object.fromEntries(params));
                  }}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">All Severities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                  <option value="info">Informational</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('status', e.target.value);
                    handleFilterChange(Object.fromEntries(params));
                  }}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">All Statuses</option>
                  <option value="new">New</option>
                  <option value="needs_review">Needs Review</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="false_positive">False Positive</option>
                  <option value="accepted_risk">Accepted Risk</option>
                  <option value="fix_in_progress">Fix In Progress</option>
                  <option value="ready_for_retest">Ready for Retest</option>
                  <option value="verified_fixed">Verified Fixed</option>
                  <option value="reopened">Reopened</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Confidence</label>
                <select
                  value={confidenceFilter}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('confidence', e.target.value);
                    handleFilterChange(Object.fromEntries(params));
                  }}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">All Confidence</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-secondary mb-2">Category</label>
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('category', e.target.value);
                    handleFilterChange(Object.fromEntries(params));
                  }}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">All Categories</option>
                  <option value="Transport and security configuration">Transport & Security</option>
                  <option value="Cookies and sessions">Cookies & Sessions</option>
                  <option value="Authentication">Authentication</option>
                  <option value="Authorisation">Authorisation</option>
                  <option value="Input handling">Input Handling</option>
                  <option value="API security">API Security</option>
                  <option value="File handling and uploads">File Handling</option>
                  <option value="Dependencies and deployment">Dependencies</option>
                  <option value="Data protection and browser security">Data Protection</option>
                  <option value="Business logic and workflow">Business Logic</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Findings Stats */}
        <div className="mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 text-sm text-secondary/80">
              <span>Showing {filteredFindings.length} of {findings.length} findings</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-secondary/80">
              <span>Critical: {findings.filter(f => f.severity === 'critical').length}</span>
              <span>High: {findings.filter(f => f.severity === 'high').length}</span>
              <span>Medium: {findings.filter(f => f.severity === 'medium').length}</span>
              <span>Low: {findings.filter(f => f.severity === 'low').length}</span>
            </div>
          </div>
        </div>

        {/* Findings List */}
        <div className="bg-surface p-6 rounded-lg border border-border">
          {filteredFindings.length === 0 ? (
            <p className="text-secondary/70 text-center py-8">No findings match the current filters</p>
          ) : (
            <div className="space-y-4">
              {filteredFindings.map((finding) => (
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
      </main>
    </div>
  );
}