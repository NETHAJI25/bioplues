import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useAppContext } from '../../app/providers';
import { Link, useNavigate } from 'react-router-dom';

export function NewScan() {
  const { projects } = useAppContext();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    projectId: '',
    targetId: '', // In a real app, this would be a specific target within the project
    profileId: 'standard', // quick, standard, deep
    activeChecks: true,
    authenticatedChecks: false,
    apiTesting: false,
    crawlDepth: 2,
    maxRequests: 1000,
    timeLimit: 30, // minutes
    rateLimit: 10, // requests per second
  });

  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Select Project', description: 'Choose the project to assess' },
    { id: 2, title: 'Configure Scope', description: 'Review and adjust the assessment scope' },
    { id: 3, title: 'Select Profile', description: 'Choose the depth of security testing' },
    { id: 4, title: 'Advanced Settings', description: 'Fine-tune scan parameters' },
    { id: 5, title: 'Review & Launch', description: 'Confirm your settings and start the scan' }
  ];

  const nextStep = () => {
    if (step < steps.length) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const target = e.target;
    const name = target.name;
    const isCheckbox = target instanceof HTMLInputElement && target.type === 'checkbox';
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (target as HTMLInputElement).checked : target.value
    }));
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    setLoading(true);

    // Simulate scan creation
    setTimeout(() => {
      const newScan = {
        id: `scan-${Date.now()}`,
        projectId: formData.projectId,
        projectName: projects.find(p => p.id === formData.projectId)?.name || 'Unknown',
        profile: formData.profileId,
        status: 'running',
        startedAt: new Date().toISOString(),
        // In a real app, we would start the scan and then poll for status
      };

      // Navigate to scan detail page
      navigate(`/scans/${newScan.id}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/scans" className="text-sm text-electric-blue hover:text-electric-blue/80">
              ← Back to Scan Center
            </Link>
            <h1 className="text-2xl font-bold text-electric-blue">New Security Scan</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {/* Step Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-primary">{steps[step-1].title}</h2>
            <div className="flex items-center gap-4 text-sm">
              {steps.map((s, index) => (
                <div key={s.id} className={`flex items-center gap-1 ${index < step-1 ? 'text-teal' : index === step-1 ? 'text-electric-blue' : 'text-secondary/50'}`}>
                  <div className={`w-3 h-3 ${index < step-1 ? 'bg-teal' : index === step-1 ? 'bg-electric-blue' : 'bg-border/50'} rounded-full`}></div>
                  <span>{s.title}</span>
                  {index < steps.length - 1 && <span className="mx-2">→</span>}
                </div>
              ))}
            </div>
          </div>
          <p className="mt-2 text-sm text-secondary/90">{steps[step-1].description}</p>
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {step === 1 && (
            <>
              <div className="space-y-4">
                <label className="block text-sm font-medium text-secondary mb-2">Project</label>
                <select
                  name="projectId"
                  value={formData.projectId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                >
                  <option value="">Select a project</option>
                  {projects.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </select>
                {formData.projectId && (
                  <div className="mt-3 p-4 bg-surface border border-border rounded-lg">
                    <h3 className="mb-2 text-lg font-medium text-secondary">Selected Project</h3>
                    <p className="text-secondary/90">{projects.find(p => p.id === formData.projectId)?.name}</p>
                    <p className="text-sm text-secondary/80 mt-1">
                      {projects.find(p => p.id === formData.projectId)?.description}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-secondary mb-2">Scope Summary</h3>
                {formData.projectId ? (
                  <>
                    <div className="bg-surface p-4 rounded-lg border border-border">
                      <p className="text-sm text-secondary/90 font-mono">
                        {/* In a real app, we would fetch the project's scope details */}
                        http://localhost:3000<br />
                        Allowed: /*, /api/*, /admin/*<br />
                        Excluded: /logout, /webhooks/*
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-3">
                      <button className="px-3 py-1 bg-electric-blue/20 text-electric-blue text-sm rounded-lg hover:bg-electric-blue/30 transition-colors">
                        Edit Scope
                      </button>
                      <span className="text-secondary/70">(Scope editing would be implemented in a full version)</span>
                    </div>
                  </>
                ) : (
                  <p className="text-secondary/70">Please select a project first.</p>
                )}
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-secondary mb-2">Scan Profiles</h3>
                <div className="grid gap-4">
                  <div
                    className={`bg-surface p-5 rounded-lg border border-border cursor-pointer hover:bg-surface/50 transition-colors ${formData.profileId === 'quick' ? 'border-electric-blue' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, profileId: 'quick' }))}
                  >
                    <h4 className="mb-2 text-lg font-medium text-primary">Quick Review</h4>
                    <p className="text-sm text-secondary/90">Safe configuration checks, security headers, cookie attributes, TLS configuration.</p>
                    <p className="mt-2 text-xs text-secondary/80">~10-20 requests • 2-5 minutes</p>
                  </div>
                  <div
                    className={`bg-surface p-5 rounded-lg border border-border cursor-pointer hover:bg-surface/50 transition-colors ${formData.profileId === 'standard' ? 'border-electric-blue' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, profileId: 'standard' }))}
                  >
                    <h4 className="mb-2 text-lg font-medium text-primary">Standard Assessment</h4>
                    <p className="text-sm text-secondary/90">Quick Review + approved active checks, form discovery, API checks (if configured).</p>
                    <p className="mt-2 text-xs text-secondary/80">~50-100 requests • 10-20 minutes</p>
                  </div>
                  <div
                    className={`bg-surface p-5 rounded-lg border border-border cursor-pointer hover:bg-surface/50 transition-colors ${formData.profileId === 'deep' ? 'border-electric-blue' : ''}`}
                    onClick={() => setFormData(prev => ({ ...prev, profileId: 'deep' }))}
                  >
                    <h4 className="mb-2 text-lg font-medium text-primary">Deep Assessment</h4>
                    <p className="text-sm text-secondary/90">Standard + authenticated workflows, controlled fuzzing, business logic tests, API schema coverage.</p>
                    <p className="mt-2 text-xs text-secondary/80">~200-500 requests • 30-60 minutes</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Scan Options</h3>
                  <div className="space-y-3">
                    <label className="flex items-center gap-2 text-sm font-medium text-secondary">
                      <input
                        type="checkbox"
                        name="activeChecks"
                        checked={formData.activeChecks}
                        onChange={handleChange}
                        className="w-4 h-4 text-electric-blue border-border rounded focus:ring-electric-blue"
                      />
                      <span>Enable approved active checks</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-secondary">
                      <input
                        type="checkbox"
                        name="authenticatedChecks"
                        checked={formData.authenticatedChecks}
                        onChange={handleChange}
                        className="w-4 h-4 text-teal border-border rounded focus:ring-teal"
                      />
                      <span>Enable authenticated testing</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm font-medium text-secondary">
                      <input
                        type="checkbox"
                        name="apiTesting"
                        checked={formData.apiTesting}
                        onChange={handleChange}
                        className="w-4 h-4 text-amber border-border rounded focus:ring-amber"
                      />
                      <span>Include API security testing</span>
                    </label>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-secondary mb-2">Scan Limits</h3>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-secondary mb-2">Crawl Depth</label>
                    <input
                      type="number"
                      name="crawlDepth"
                      value={formData.crawlDepth}
                      onChange={handleChange}
                      min="1"
                      max="10"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-secondary mb-2">Max Requests</label>
                    <input
                      type="number"
                      name="maxRequests"
                      value={formData.maxRequests}
                      onChange={handleChange}
                      min="10"
                      max="10000"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-secondary mb-2">Time Limit (minutes)</label>
                    <input
                      type="number"
                      name="timeLimit"
                      value={formData.timeLimit}
                      onChange={handleChange}
                      min="5"
                      max="120"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-secondary mb-2">Rate Limit (req/sec)</label>
                    <input
                      type="number"
                      name="rateLimit"
                      value={formData.rateLimit}
                      onChange={handleChange}
                      min="1"
                      max="100"
                      className="w-full px-4 py-3 bg-surface border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 5 && (
            <>
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-secondary mb-2">Scan Configuration Summary</h3>
                <div className="bg-surface p-6 rounded-lg border border-border">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Project</span>
                      <span className="text-sm font-medium text-secondary">
                        {projects.find(p => p.id === formData.projectId)?.name || 'Not selected'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Scan Profile</span>
                      <span className="text-sm font-medium text-secondary">
                        {formData.profileId === 'quick' ? 'Quick Review' : formData.profileId === 'standard' ? 'Standard Assessment' : 'Deep Assessment'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Active Checks</span>
                      <span className="text-sm font-medium text-secondary">
                        {formData.activeChecks ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Authenticated Testing</span>
                      <span className="text-sm font-medium text-secondary">
                        {formData.authenticatedChecks ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">API Testing</span>
                      <span className="text-sm font-medium text-secondary">
                        {formData.apiTesting ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Crawl Depth</span>
                      <span className="text-sm font-medium text-secondary">{formData.crawlDepth}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Max Requests</span>
                      <span className="text-sm font-medium text-secondary">{formData.maxRequests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Time Limit</span>
                      <span className="text-sm font-medium text-secondary">{formData.timeLimit} minutes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-secondary/80">Rate Limit</span>
                      <span className="text-sm font-medium text-secondary">{formData.rateLimit} req/sec</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="px-6 py-3 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Starting Scan...' : 'Launch Scan'}
                  </button>
                  <Link to="/scans" className="text-sm text-secondary/70 hover:text-secondary">
                    Cancel
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Navigation Buttons */}
        {step < steps.length && step > 1 && (
          <div className="mt-8 flex items-center justify-between">
            <button onClick={prevStep} className="px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors">
              Previous
            </button>
            <button onClick={nextStep} className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
              Next Step
            </button>
          </div>
        )}
        {step === 1 && (
          <div className="mt-8 flex justify-end">
            <button onClick={nextStep} className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
              Next Step
            </button>
          </div>
        )}
        {step === steps.length && (
          <div className="mt-8 flex justify-end">
            <button onClick={prevStep} className="px-4 py-2 bg-surface border border-border rounded-lg hover:bg-surface/50 transition-colors">
              Previous
            </button>
          </div>
        )}
      </main>
    </div>
  );
}