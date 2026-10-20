import { useAppContext } from '../../app/providers';
import { useParams, Link } from 'react-router-dom';

export function ProjectDetail() {
  const { projects } = useAppContext();
  const { projectId } = useParams<{ projectId: string }>();

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-primary antialiased flex items-center justify-center py-12">
        <p className="text-secondary/70">Project not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link to="/projects" className="text-sm text-electric-blue hover:text-electric-blue/80">
              ← Back to Projects
            </Link>
            <h1 className="text-2xl font-bold text-electric-blue">{project.name}</h1>
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
                Edit
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
        {/* Project Overview */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">Project Overview</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Environment</h3>
              <p className="text-primary">{project.environment}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Target URL</h3>
              <p className="text-secondary/90 break-all">{project.targetUrl}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Owner</h3>
              <p className="text-primary">{project.owner}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Status</h3>
              <span className="px-3 py-1 bg-teal/20 text-teal rounded-full text-sm">
                {project.status}
              </span>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Created</h3>
              <p className="text-secondary/90">{new Date(project.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-2 text-lg font-medium text-secondary">Updated</h3>
              <p className="text-secondary/90">{new Date(project.updatedAt).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-lg font-medium text-secondary">Description</h3>
            <p className="text-secondary/90">{project.description}</p>
          </div>
        </div>

        {/* Scope Configuration */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">Scope Configuration</h2>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-secondary">Allowed Paths</h3>
                <button className="px-3 py-1 bg-electric-blue/20 text-electric-blue text-sm rounded-lg hover:bg-electric-blue/30 transition-colors">
                  Edit
                </button>
              </div>
              <div className="bg-border/50 p-4 rounded-lg">
                <p className="text-sm text-secondary/90 font-mono">
                  /*<br />
                  /api/*<br />
                  /admin/*<br />
                  /user/*
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-secondary">Excluded Paths</h3>
              <button className="px-3 py-1 bg-electric-blue/20 text-electric-blue text-sm rounded-lg hover:bg-electric-blue/30 transition-colors">
                Edit
              </button>
            </div>
            <div className="bg-border/50 p-4 rounded-lg">
              <p className="text-sm text-secondary/90 font-mono">
                /logout<br />
                /password-change<br />
                /webhooks/*
              </p>
            </div>
          </div>
        </div>

        {/* Authentication Profiles */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">Authentication Profiles</h2>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-secondary">Configured Auth Methods</h3>
              <button className="px-3 py-1 bg-teal/20 text-teal text-sm rounded-lg hover:bg-teal/30 transition-colors">
                Add Profile
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-border/50 rounded-lg">
                <div className="w-8 h-8 bg-teal/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 2a.5.5 0 110-1 .5.5 0 010 1z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-primary">Form-based login</p>
                  <p className="text-sm text-secondary/70">Configured for /login endpoint</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* API Specifications */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-primary">API Specifications</h2>
          <div className="bg-surface p-6 rounded-lg border border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-secondary">Imported Specs</h3>
              <button className="px-3 py-1 bg-teal/20 text-teal text-sm rounded-lg hover:bg-teal/30 transition-colors">
                Import API Spec
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-border/50 rounded-lg">
                <div className="w-8 h-8 bg-teal/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-primary">REST API v2.1</p>
                  <p className="text-sm text-secondary/70">OpenAPI 3.0 specification</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}