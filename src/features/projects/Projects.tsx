import { useAppContext } from '../../app/providers';
import { Link } from 'react-router-dom';

export function Projects() {
  const { projects } = useAppContext();

  return (
    <div className="min-h-screen bg-background text-primary antialiased">
      {/* Header */}
      <header className="bg-surface/50 backdrop-blur-sm border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-electric-blue">Project Directory</h1>
            <Link to="/projects/new" className="px-4 py-2 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 rounded-lg transition-colors">
              New Project
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8 px-6 sm:px-8 lg:px-12">
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-secondary/70">No projects found. Create your first project to get started.</p>
            <Link to="/projects/new" className="inline-block mt-4 px-6 py-3 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors">
              Create First Project
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-primary">Your Projects</h2>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="px-4 py-2 bg-surface border border-border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-electric-blue"
                />
                <select
                  className="px-4 py-2 bg-surface border border-border rounded-lg"
                >
                  <option value="all">All Projects</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              {projects.map((project) => (
                <div key={project.id} className="bg-surface p-6 rounded-lg border border-border hover:bg-surface/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="mb-1 text-lg font-medium text-primary">{project.name}</h3>
                      <p className="text-sm text-secondary/80">{project.description}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-electric-blue/20 text-electric-blue text-xs rounded-full">{project.environment}</span>
                        <span className="px-2 py-1 bg-teal/20 text-teal text-xs rounded-full">{project.status}</span>
                      </div>
                    </div>
                    <Link to={`/projects/${project.id}`} className="text-sm text-electric-blue hover:text-electric-blue/80">
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}