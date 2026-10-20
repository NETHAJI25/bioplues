import { useAppContext } from '../../app/providers';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';

export function FindingDetail() {
  const { findings, setFindings } = useAppContext();
  const { findingId } = useParams<{ findingId: string }>();
  const navigate = useNavigate();

  const finding = findings.find(f => f.id === findingId);

  const [status, setStatus] = useState(finding?.status ?? 'needs_review');
  const [remediationNote, setRemediationNote] = useState('');

  // Keep the editable status in sync when the finding loads or changes.
  useEffect(() => {
    if (finding?.status) {
      setStatus(finding.status);
    }
  }, [finding?.status]);

  if (!finding) {
    return (
      <div className="min-h-screen bg-background text-primary antialiased flex items-center justify-center py-12">
        <p className="text-secondary/70">Finding not found</p>
      </div>
    );
  }

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSave = () => {
    // Update the finding in the context
    setFindings(prev =>
      prev.map(f =>
        f.id === findingId
          ? { ...f, status, ...(remediationNote && { remediationNote }) }
          : f
      )
    );
    navigate('/findings');
  };

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/findings" className="text-sm text-electric-blue hover:text-electric-blue/80">
              ← Back to Findings
            </Link>
            <h1 className="text-2xl font-bold text-electric-blue">Finding Details</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Finding Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 flex-shrink-0">
              <div className={`w-8 h-8 rounded-full
                ${finding.severity === 'critical' ? 'bg-critical-red' :
                  finding.severity === 'high' ? 'bg-critical-red' :
                  finding.severity === 'medium' ? 'bg-amber' :
                  finding.severity === 'low' ? 'bg-teal' : 'bg-secondary'}`}>
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {finding.severity.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="mb-2 text-3xl font-bold text-primary">{finding.title}</h1>
              <div className="flex flex-wrap gap-4 mb-4">
                <span className={`px-3 py-1 text-xs rounded-full
                  ${finding.severity === 'critical' ? 'bg-critical-red/20 text-critical-red' :
                    finding.severity === 'high' ? 'bg-critical-red/20 text-critical-red' :
                    finding.severity === 'medium' ? 'bg-amber/20 text-amber' :
                    finding.severity === 'low' ? 'bg-teal/20 text-teal' :
                    'bg-secondary/20 text-secondary'}`}>
                  {finding.severity.charAt(0).toUpperCase() + finding.severity.slice(1)}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full
                  ${finding.confidence === 'high' ? 'bg-teal/20 text-teal' :
                    finding.confidence === 'medium' ? 'bg-amber/20 text-amber' :
                    'bg-secondary/20 text-secondary'}`}>
                  {finding.confidence.charAt(0).toUpperCase() + finding.confidence.slice(1)}
                </span>
                <span className={`px-3 py-1 text-xs rounded-full
                  ${finding.status === 'confirmed' ? 'bg-teal/20 text-teal' :
                    finding.status === 'needs_review' ? 'bg-amber/20 text-amber' :
                    finding.status === 'false_positive' ? 'bg-secondary/20 text-secondary' :
                    finding.status === 'verified_fixed' ? 'bg-teal/20 text-teal' :
                    'bg-border/20 text-border'}`}>
                  {finding.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-secondary/90">{finding.category}</p>
            </div>
          </div>
        </div>

        {/* Tabs for different sections */}
        <div className="mb-8">
          <div className="border-b border-border">
            <div className="flex items-center justify-between pb-4">
              <div className="flex-1 w-0">
                <ul className="flex flex-wrap -mb-px">
                  <li className="mr-2">
                    <Link
                      to={`/findings/${findingId}`}
                      className={`px-3 py-2 text-sm font-medium
                        ${window.location.pathname === `/findings/${findingId}`
                          ? 'text-electric-blue border-b-2 border-electric-blue'
                          : 'text-secondary/60 hover:text-secondary'}`}
                    >
                      Overview
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link
                      to={`/findings/${findingId}/evidence`}
                      className={`px-3 py-2 text-sm font-medium
                        ${window.location.pathname === `/findings/${findingId}/evidence`
                          ? 'text-electric-blue border-b-2 border-electric-blue'
                          : 'text-secondary/60 hover:text-secondary'}`}
                    >
                      Evidence
                    </Link>
                  </li>
                  <li className="mr-2">
                    <Link
                      to={`/findings/${findingId}/remediation`}
                      className={`px-3 py-2 text-sm font-medium
                        ${window.location.pathname === `/findings/${findingId}/remediation`
                          ? 'text-electric-blue border-b-2 border-electric-blue'
                          : 'text-secondary/60 hover:text-secondary'}`}
                    >
                      Remediation
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="space-y-6">
            {window.location.pathname === `/findings/${findingId}` && (
              <>
                {/* Overview Tab */}
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Overview</h2>
                    <p className="text-secondary/90">{finding.evidenceSummary}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Impact</h2>
                    <p className="text-secondary/90">{finding.impact}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">Remediation Guidance</h2>
                    <p className="text-secondary/90">{finding.remediation}</p>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-primary">References</h2>
                    <ul className="list-disc list-space pl-5">
                      {finding.references.map((ref: string, index: number) => (
                        <li key={index} className="text-secondary/90">{ref}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                </>
              )}

              {window.location.pathname === `/findings/${findingId}/evidence` && (
                <>
                  {/* Evidence Tab */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-primary">Request Evidence</h2>
                      <div className="bg-surface p-4 rounded-lg border border-border">
                        <p className="text-sm text-secondary/90 font-mono">
                          GET {finding.affectedUrl?.split('?')[0] || '/api/endpoint'} HTTP/1.1<br/>
                          Host: localhost:3000<br/>
                          Accept: */*<br/>
                          {finding.httpMethod === 'POST' && 'Content-Type: application/x-www-form-urlencoded'}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-primary">Response Evidence</h2>
                      <div className="bg-surface p-4 rounded-lg border border-border">
                        <p className="text-sm text-secondary/90 font-mono">
                          HTTP/1.1 200 OK<br/>
                          Date: Thu, 19 Oct 2026 10:00:00 GMT<br/>
                          Content-Type: application/json<br/>
                          Content-Length: 1234<br/>
                          <br/>
                          {/* Redacted sensitive data */}
                          {finding.id === 'finding-1' && (
                            <>
                              {/* Missing security headers example */}
                              {`
                              {
                                "status": "success",
                                "data": [...]
                              }
                              `}
                            </>
                          )}
                          {finding.id === 'finding-2' && (
                            <>
                              {/* Cookie example */}
                              {`
                              Set-Cookie: sessionid=abc123; Path=/; HttpOnly
                              `}
                            </>
                          )}
                          {finding.id === 'finding-3' && (
                            <>
                              {/* SQL injection example */}
                              {`
                              {
                                "error": "You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near ''' at line 1"
                              }
                              `}
                            </>
                          )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
              )}

              {window.location.pathname === `/findings/${findingId}/remediation` && (
                <>
                  {/* Remediation Tab */}
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-primary">Update Status</h2>
                      <div className="bg-surface p-4 rounded-lg border border-border">
                        <label className="block text-sm font-medium text-secondary mb-2">Current Status</label>
                        <select
                          value={status}
                          onChange={handleStatusChange}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                        >
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
                    </div>

                    <div className="space-y-4">
                      <h2 className="text-xl font-semibold text-primary">Remediation Notes</h2>
                      <div className="bg-surface p-4 rounded-lg border border-border">
                        <textarea
                          value={remediationNote}
                          onChange={(e) => setRemediationNote(e.target.value)}
                          className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                          rows={4}
                          placeholder="Add notes about remediation progress..."
                        />
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-3">
                      <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors"
                      >
                        Save Changes
                      </button>
                      <Link to={`/findings/${findingId}`} className="text-sm text-secondary/70 hover:text-secondary">
                        Cancel
                      </Link>
                    </div>
                  </div>
                  </>
              )}
            </div>
          </div>
        </main>
      </div>
    );
}