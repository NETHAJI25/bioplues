import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background/90 to-background/95 text-primary antialiased">
      {/* Hero Section */}
      <section className="py-20 md:py-28 px-6 sm:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Security findings are only the beginning.
          </h1>
          <p className="mb-8 text-lg md:text-xl text-secondary/90">
            Test applications within an approved scope, understand vulnerabilities through evidence, and verify that fixes actually work.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard" className="flex-1 px-6 py-3 bg-electric-blue/20 text-electric-blue hover:bg-electric-blue/30 hover:text-primary rounded-lg transition-colors border border-electric-blue/50">
              Start Security Assessment
            </Link>
            <Link to="/demo" className="flex-1 px-6 py-3 bg-secondary/20 text-secondary hover:bg-secondary/30 hover:text-primary rounded-lg transition-colors border border-secondary/50">
              Explore Demo
            </Link>
          </div>
          <p className="mt-6 text-xs text-secondary/60">
            Local demo available · Sample scan data
          </p>
        </div>
      </section>

      {/* Security Overview Preview */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-8 text-2xl font-semibold text-center">
            Security Dashboard Preview
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-primary">Projects</h3>
              <p className="text-2xl font-bold text-electric-blue">3</p>
              <p className="text-sm text-secondary/70 mt-1">Active applications</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-primary">Scans Completed</h3>
              <p className="text-2xl font-bold text-teal">24</p>
              <p className="text-sm text-secondary/70 mt-1">Security assessments</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-primary">Open Findings</h3>
              <p className="text-2xl font-bold text-amber">12</p>
              <p className="text-sm text-secondary/70 mt-1">Needing attention</p>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border">
              <h3 className="mb-3 text-lg font-medium text-primary">Verified Fixes</h3>
              <p className="text-2xl font-bold text-teal">18</p>
              <p className="text-sm text-secondary/70 mt-1">Successfully resolved</p>
            </div>
          </div>
        </div>
      </section>

      {/* How ProofShield Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-12 text-2xl font-semibold text-center">How ProofShield Works</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-surface p-6 rounded-lg border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-primary">1. Authorise & Configure</h3>
                  <p className="text-sm text-secondary/90">
                    Define your application scope, set authentication, and choose assessment depth.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-teal/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 20h10a2 2 0 002-2V6a2 2 0 00-2-2H7a2 2 0 00-2-2v12z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-primary">2. Discover & Assess</h3>
                  <p className="text-sm text-secondary/90">
                    Passive reconnaissance followed by approved security checks within scope.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border h-full">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-primary">3. Prioritise & Remediate</h3>
                  <p className="text-sm text-secondary/90">
                    Review evidence-backed findings and track fixes through verification.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scan Coverage */}
      <section className="py-20 bg-surface/50">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-10 text-2xl font-semibold text-center">Comprehensive Scan Coverage</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-surface p-5 rounded-lg border border-border h-flex">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-electric-blue" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a6 6 0 01-6 6H6a6 6 0 01-6 6V4a2 2 0 00-2-2H0a2 2 0 00-2-2v2a2 2 0 002 2h2v4a2 2 0 002 2z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-primary">Transport Security</h4>
              </div>
              <p className="text-sm text-secondary/90 line-clamp-2">
                TLS configuration, HTTP security headers, cookie security, and transport-level protections.
              </p>
            </div>
            <div className="bg-surface p-5 rounded-lg border border-border h-flex">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-teal/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-teal" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 00-8 8v3a2 2 0 002 2h10a2 2 0 002-2V5a8 8 0 00-16 0z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-primary">Authentication</h4>
              </div>
              <p className="text-sm text-secondary/90 line-clamp-2">
                Login flows, session management, password reset, and multi-factor authentication.
              </p>
            </div>
            <div className="bg-surface p-5 rounded-lg border border-border h-flex">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-amber/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-amber" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 2a8 8 0 018 8v2a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2zM10 8a2 2 0 100-4 2 2 0 000 4zM16 10a2 2 0 11-4 0 2 2 0 014 0zM4 10a2 2 0 100-4 2 2 0 000 4z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-primary">Input Validation</h4>
              </div>
              <p className="text-sm text-secondary/90 line-clamp-2">
                SQL injection, XSS, command injection, path traversal, and input handling weaknesses.
              </p>
            </div>
            <div className="bg-surface p-5 rounded-lg border border-border h-flex">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-violet/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-violet" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4zM10 4a2 2 0 110-4 2 2 0 010 4zM16 10a2 2 0 10-4 0 2 2 0 014 0zM4 10a2 2 0 11-4 0 2 2 0 004 0z"/>
                  </svg>
                </div>
                <h4 className="text-lg font-medium text-primary">API Security</h4>
              </div>
              <p className="text-sm text-secondary/90 line-clamp-2">
                Authentication, authorization, input validation, and excessive data exposure in APIs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Evidence-First Findings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h2 className="mb-10 text-2xl font-semibold text-center">Evidence-First Findings</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="bg-surface p-6 rounded-lg border border-border h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-electric-blue/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-electric-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M20 13V9a2 2 0 00-2-2H6a2 2 0 00-2-2v4h10"/>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-primary">Rich Evidence Collection</h3>
                  <p className="text-sm text-secondary/90">
                    Every finding includes request/response evidence, headers, and reproduction steps.
                  </p>
                </div>
              </div>
              <div className="bg-border/50 p-4 rounded-lg mt-4">
                <p className="text-sm text-secondary/80 font-mono">
                  GET /api/users?id=1' OR '1'='1<br/>
                  HTTP/1.1 200 OK<br/>
                  Content-Type: application/json<br/>
                  <br/>
                  {'[{ "id": 1, "username": "admin", ... }]'}
                </p>
              </div>
            </div>
            <div className="bg-surface p-6 rounded-lg border border-border h-full">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-teal/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H3m8 6V3m-8 6h2m8 6v-2m8-2V6m0 6h2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-medium text-primary">Clear Impact Analysis</h3>
                  <p className="text-sm text-secondary/90">
                    Understand the business risk and technical severity of each vulnerability.
                  </p>
                </div>
              </div>
              <div className="bg-surface p-6 rounded-lg border border-border h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-amber/20 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-amber" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M5 18h1a2 2 0 012-2V9a2 2 0 01-2-2H5a2 2 0 01-2-2v6z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium text-primary">Actionable Remediation</h3>
                    <p className="text-sm text-secondary/90">
                      Specific fix recommendations with code examples and verification steps.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-electric-blue/5">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
          <h2 className="mb-6 text-3xl font-bold text-electric-blue">Ready to assess your application security?</h2>
          <p className="mb-8 text-lg text-secondary/90">
            Start with our interactive demo or set up your first project in seconds.
          </p>
          <Link to="/dashboard" className="inline-flex px-8 py-4 bg-electric-blue text-primary font-medium rounded-lg hover:bg-electric-blue/80 transition-colors">
            Begin Security Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}