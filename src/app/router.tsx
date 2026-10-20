import { Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from '../features/overview/LandingPage';
import { Dashboard } from '../features/overview/Dashboard';
import { Projects } from '../features/projects/Projects';
import { NewProject } from '../features/projects/NewProject';
import { ProjectDetail } from '../features/projects/ProjectDetail';
import { ScanCenter } from '../features/scans/ScanCenter';
import { NewScan } from '../features/scans/NewScan';
import { ScanDetail } from '../features/scans/ScanDetail';
import { Findings } from '../features/findings/Findings';
import { FindingDetail } from '../features/findings/FindingDetail';
import { Remediation } from '../features/remediation/Remediation';
import { Retests } from '../features/remediation/Retests';
import { Reports } from '../features/reports/Reports';
import { ReportDetail } from '../features/reports/ReportDetail';
import { Settings } from '../features/administration/Settings';
import { Admin } from '../features/administration/Admin';

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/demo" element={<Navigate to="/dashboard" replace />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/projects/new" element={<NewProject />} />
      <Route path="/projects/:projectId" element={<ProjectDetail />} />
      <Route path="/projects/:projectId/scope" element={<ProjectDetail />} />
      <Route path="/projects/:projectId/authentication" element={<ProjectDetail />} />
      <Route path="/projects/:projectId/api" element={<ProjectDetail />} />
      <Route path="/scans" element={<ScanCenter />} />
      <Route path="/scans/new" element={<NewScan />} />
      <Route path="/scans/:scanId" element={<ScanDetail />} />
      <Route path="/scans/:scanId/endpoints" element={<ScanDetail />} />
      <Route path="/scans/:scanId/logs" element={<ScanDetail />} />
      <Route path="/findings" element={<Findings />} />
      <Route path="/findings/:findingId" element={<FindingDetail />} />
      <Route path="/remediation" element={<Remediation />} />
      <Route path="/retests" element={<Retests />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/reports/:reportId" element={<ReportDetail />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}