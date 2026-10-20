import { createContext, useContext, useState, useEffect } from 'react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';

// App context type
interface AppContextType {
  // We'll add state and setters as needed
  demoMode: boolean;
  setDemoMode: (mode: boolean) => void;
  // Project state
  projects: any[];
  setProjects: Dispatch<SetStateAction<any[]>>;
  // Scan state
  activeScans: any[];
  setActiveScans: Dispatch<SetStateAction<any[]>>;
  // Findings state
  findings: any[];
  setFindings: Dispatch<SetStateAction<any[]>>;
}

// Default context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: ReactNode }) {
  const [demoMode, setDemoMode] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);
  const [activeScans, setActiveScans] = useState<any[]>([]);
  const [findings, setFindings] = useState<any[]>([]);

  // Load demo data on first mount if in demo mode
  useEffect(() => {
    if (demoMode) {
      loadDemoData();
    }
  }, [demoMode]);

  const loadDemoData = () => {
    // Load demo projects
    const demoProjects = [
      {
        id: 'demo-project-1',
        name: 'Sample Store — Security Training Lab',
        description: 'A deliberately vulnerable web application for security training.',
        environment: 'local',
        targetUrl: 'http://localhost:3000',
        owner: 'Security Team',
        status: 'active',
        createdAt: '2026-01-15',
        updatedAt: '2026-10-19',
      }
    ];
    setProjects(demoProjects);

    // Load demo findings
    const demoFindings = [
      {
        id: 'finding-1',
        projectId: 'demo-project-1',
        scanId: 'scan-1',
        title: 'Missing Security Headers',
        category: 'Transport and security configuration',
        severity: 'medium',
        confidence: 'high',
        status: 'confirmed',
        affectedUrl: 'http://localhost:3000/',
        httpMethod: 'GET',
        evidenceSummary: 'Response missing X-Frame-Options, X-Content-Type-Options, and Content-Security-Policy headers.',
        evidenceSource: 'simulated',
        impact: 'Clickjacking and MIME-sniffing attacks possible.',
        remediation: 'Add security headers to HTTP responses.',
        references: ['OWASP Secure Headers Project'],
        firstObservedAt: '2026-10-19T10:00:00Z',
        lastObservedAt: '2026-10-19T10:00:00Z',
      },
      {
        id: 'finding-2',
        projectId: 'demo-project-1',
        scanId: 'scan-1',
        title: 'Cookie Missing Secure Attribute',
        category: 'Cookies and sessions',
        severity: 'low',
        confidence: 'high',
        status: 'confirmed',
        affectedUrl: 'http://localhost:3000/login',
        httpMethod: 'POST',
        evidenceSummary: 'Session cookie missing Secure and HttpOnly attributes.',
        evidenceSource: 'simulated',
        impact: 'Session cookie transmitted over unencrypted connections and accessible to JavaScript.',
        remediation: 'Set Secure and HttpOnly attributes on session cookies.',
        references: ['OWASP Session Management Cheat Sheet'],
        firstObservedAt: '2026-10-19T10:05:00Z',
        lastObservedAt: '2026-10-19T10:05:00Z',
      },
      {
        id: 'finding-3',
        projectId: 'demo-project-1',
        scanId: 'scan-1',
        title: 'Potential SQL Injection in Search Parameter',
        category: 'Input handling',
        severity: 'high',
        confidence: 'medium',
        status: 'needs_review',
        affectedUrl: 'http://localhost:3000/api/products',
        httpMethod: 'GET',
        evidenceSummary: 'Search parameter "q" returns different error messages when testing with single quote.',
        evidenceSource: 'simulated',
        impact: 'Possible SQL injection vulnerability in product search.',
        remediation: 'Use parameterized queries or ORM with proper input validation.',
        references: ['OWASP SQL Injection Prevention Cheat Sheet'],
        firstObservedAt: '2026-10-19T10:10:00Z',
        lastObservedAt: '2026-10-19T10:10:00Z',
      }
    ];
    setFindings(demoFindings);
  };

  const value = {
    demoMode,
    setDemoMode,
    projects,
    setProjects,
    activeScans,
    setActiveScans,
    findings,
    setFindings,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use app context
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}