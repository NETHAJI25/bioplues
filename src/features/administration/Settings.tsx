import { useState } from 'react';
import type { FormEvent } from 'react';
import { useAppContext } from '../../app/providers';

export function Settings() {
  const { demoMode, setDemoMode } = useAppContext();
  const [saved, setSaved] = useState(false);
  const [scanType, setScanType] = useState('full');
  const [severityThreshold, setSeverityThreshold] = useState('low');
  const [notifyEmail, setNotifyEmail] = useState('security-team@example.com');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <h1 className="text-2xl font-bold text-electric-blue">Settings</h1>
        </div>
      </header>

      <main className="py-8 px-6 sm:px-8 lg:px-12 max-w-3xl">
        {saved && (
          <div className="mb-6 px-4 py-3 bg-teal/10 border border-teal/40 text-teal rounded-lg text-sm">
            Settings saved (demo mode — not persisted).
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Demo mode */}
          <section className="bg-surface p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-primary mb-2">Demo Mode</h2>
            <p className="text-sm text-secondary/80 mb-4">
              Demo mode serves built-in sample projects and simulated findings instead of running real scans.
            </p>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={demoMode}
                onChange={e => setDemoMode(e.target.checked)}
                className="w-4 h-4 accent-[#5B8CFF]"
              />
              <span className="text-sm text-primary">Enable demo mode</span>
            </label>
          </section>

          {/* Scan defaults */}
          <section className="bg-surface p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-primary mb-4">Scan Defaults</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="scanType" className="block text-sm font-medium text-secondary mb-2">
                  Default scan type
                </label>
                <select
                  id="scanType"
                  value={scanType}
                  onChange={e => setScanType(e.target.value)}
                  className="w-full px-3 py-2 bg-border/50 border border-border rounded-lg text-primary focus:outline-none focus:border-electric-blue"
                >
                  <option value="full">Full scan</option>
                  <option value="quick">Quick scan</option>
                  <option value="retest">Retest only</option>
                </select>
              </div>
              <div>
                <label htmlFor="threshold" className="block text-sm font-medium text-secondary mb-2">
                  Report findings at or above severity
                </label>
                <select
                  id="threshold"
                  value={severityThreshold}
                  onChange={e => setSeverityThreshold(e.target.value)}
                  className="w-full px-3 py-2 bg-border/50 border border-border rounded-lg text-primary focus:outline-none focus:border-electric-blue"
                >
                  <option value="info">Info</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section className="bg-surface p-6 rounded-lg border border-border">
            <h2 className="text-lg font-semibold text-primary mb-4">Notifications</h2>
            <label htmlFor="notifyEmail" className="block text-sm font-medium text-secondary mb-2">
              Notify on new high/critical findings
            </label>
            <input
              id="notifyEmail"
              type="email"
              value={notifyEmail}
              onChange={e => setNotifyEmail(e.target.value)}
              className="w-full px-3 py-2 bg-border/50 border border-border rounded-lg text-primary focus:outline-none focus:border-electric-blue"
            />
          </section>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-3 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors"
            >
              Save Settings
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
