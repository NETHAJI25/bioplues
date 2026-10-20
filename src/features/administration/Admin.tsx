const demoUsers = [
  { id: 'u1', name: 'Asha Patel', email: 'asha@example.com', role: 'Admin', status: 'active' },
  { id: 'u2', name: 'Marco Reyes', email: 'marco@example.com', role: 'Analyst', status: 'active' },
  { id: 'u3', name: 'Lena Chen', email: 'lena@example.com', role: 'Reviewer', status: 'invited' },
];

const demoAdapters = [
  { id: 'a1', name: 'DemoScannerAdapter', type: 'Built-in demo', status: 'available', detail: 'Simulated findings for training data' },
  { id: 'a2', name: 'OWASP ZAP', type: 'External scanner', status: 'not configured', detail: 'Requires ZAP API endpoint and key' },
  { id: 'a3', name: 'Nuclei', type: 'External scanner', status: 'not configured', detail: 'Requires template library and runner' },
];

const demoAuditLog = [
  { id: 'l1', at: '2026-10-19 10:12', actor: 'Asha Patel', action: 'Generated report report-1' },
  { id: 'l2', at: '2026-10-19 10:05', actor: 'Marco Reyes', action: 'Marked finding-1 as confirmed' },
  { id: 'l3', at: '2026-10-19 09:58', actor: 'System', action: 'Completed scan scan-1 (3 findings)' },
];

export function Admin() {
  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Administration</h1>
            <a href="/settings" className="text-sm text-secondary/70 hover:text-secondary">
              Go to Settings
            </a>
          </div>
        </div>
      </header>

      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Users */}
        <section className="mb-8 bg-surface p-6 rounded-lg border border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-primary">Users & Roles</h2>
            <button
              type="button"
              className="px-3 py-1 text-sm bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors"
            >
              + Invite User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-secondary border-b border-border">
                  <th className="py-2 pr-4 font-medium">Name</th>
                  <th className="py-2 pr-4 font-medium">Email</th>
                  <th className="py-2 pr-4 font-medium">Role</th>
                  <th className="py-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {demoUsers.map(user => (
                  <tr key={user.id} className="border-b border-border/50">
                    <td className="py-3 pr-4 text-primary">{user.name}</td>
                    <td className="py-3 pr-4 text-secondary/80">{user.email}</td>
                    <td className="py-3 pr-4">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.role === 'Admin' ? 'bg-violet/20 text-violet' : 'bg-electric-blue/20 text-electric-blue'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-1 text-xs rounded-full ${user.status === 'active' ? 'bg-teal/20 text-teal' : 'bg-amber/20 text-amber'}`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scanner adapters */}
        <section className="mb-8 bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Scanner Integrations</h2>
          <div className="space-y-4">
            {demoAdapters.map(adapter => (
              <div key={adapter.id} className="flex items-center justify-between p-4 bg-border/50 rounded-lg">
                <div>
                  <h3 className="font-medium text-primary">{adapter.name}</h3>
                  <p className="text-sm text-secondary/80">{adapter.type} · {adapter.detail}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${adapter.status === 'available' ? 'bg-teal/20 text-teal' : 'bg-secondary/20 text-secondary'}`}>
                    {adapter.status.toUpperCase()}
                  </span>
                  <button
                    type="button"
                    className="px-3 py-1 text-sm bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors"
                  >
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Audit log */}
        <section className="bg-surface p-6 rounded-lg border border-border">
          <h2 className="text-lg font-semibold text-primary mb-4">Audit Log</h2>
          <div className="space-y-3">
            {demoAuditLog.map(entry => (
              <div key={entry.id} className="flex items-start gap-4 text-sm p-3 bg-border/50 rounded-lg">
                <span className="text-secondary/70 w-36 flex-shrink-0">{entry.at}</span>
                <span className="text-electric-blue w-32 flex-shrink-0">{entry.actor}</span>
                <span className="text-primary">{entry.action}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
