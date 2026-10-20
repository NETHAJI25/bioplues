import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const organizations = sqliteTable('organizations', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  logo: text('logo'),
  website: text('website'),
  industry: text('industry'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  username: text('username').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  passwordHash: text('password_hash').notNull(),
  role: text('role', { enum: ['admin', 'analyst', 'viewer', 'auditor'] }).default('viewer').notNull(),
  orgId: text('org_id').references(() => organizations.id),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  mfaEnabled: integer('mfa_enabled', { mode: 'boolean' }).default(false).notNull(),
  mfaSecret: text('mfa_secret'),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }),
  avatar: text('avatar'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const apiKeys = sqliteTable('api_keys', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  keyHash: text('key_hash').notNull(),
  keyPrefix: text('key_prefix').notNull(),
  name: text('name').notNull(),
  scopes: text('scopes', { mode: 'json' }).$type<string[]>(),
  lastUsedAt: integer('last_used_at', { mode: 'timestamp' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }),
  isRevoked: integer('is_revoked', { mode: 'boolean' }).default(false).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const projects = sqliteTable('projects', {
  id: text('id').primaryKey(),
  orgId: text('org_id').notNull().references(() => organizations.id),
  name: text('name').notNull(),
  description: text('description'),
  status: text('status', { enum: ['active', 'archived', 'completed'] }).default('active').notNull(),
  ownerId: text('owner_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const targets = sqliteTable('targets', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name').notNull(),
  type: text('type', { enum: ['web', 'api', 'network', 'mobile', 'cloud'] }).notNull(),
  url: text('url'),
  ipAddress: text('ip_address'),
  scope: text('scope', { mode: 'json' }).$type<string[]>(),
  excludeScope: text('exclude_scope', { mode: 'json' }).$type<string[]>(),
  authConfig: text('auth_config', { mode: 'json' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const assets = sqliteTable('assets', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  targetId: text('target_id').references(() => targets.id),
  type: text('type', { enum: ['domain', 'ip', 'host', 'service', 'endpoint', 'certificate'] }).notNull(),
  name: text('name').notNull(),
  value: text('value').notNull(),
  criticality: text('criticality', { enum: ['critical', 'high', 'medium', 'low'] }).default('medium').notNull(),
  metadata: text('metadata', { mode: 'json' }),
  lastSeenAt: integer('last_seen_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const subdomains = sqliteTable('subdomains', {
  id: text('id').primaryKey(),
  assetId: text('asset_id').references(() => assets.id),
  projectId: text('project_id').notNull().references(() => projects.id),
  subdomain: text('subdomain').notNull(),
  ip: text('ip'),
  status: text('status', { enum: ['active', 'inactive', 'unknown'] }).default('unknown'),
  source: text('source'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const ports = sqliteTable('ports', {
  id: text('id').primaryKey(),
  assetId: text('asset_id').references(() => assets.id),
  projectId: text('project_id').notNull().references(() => projects.id),
  port: integer('port').notNull(),
  protocol: text('protocol', { enum: ['tcp', 'udp'] }).default('tcp').notNull(),
  state: text('state', { enum: ['open', 'closed', 'filtered'] }).default('open').notNull(),
  service: text('service'),
  version: text('version'),
  banner: text('banner'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const services = sqliteTable('services', {
  id: text('id').primaryKey(),
  assetId: text('asset_id').references(() => assets.id),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name').notNull(),
  port: integer('port'),
  protocol: text('protocol'),
  version: text('version'),
  product: text('product'),
  cpe: text('cpe'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const endpoints = sqliteTable('endpoints', {
  id: text('id').primaryKey(),
  assetId: text('asset_id').references(() => assets.id),
  projectId: text('project_id').notNull().references(() => projects.id),
  method: text('method').notNull(),
  path: text('path').notNull(),
  fullUrl: text('full_url').notNull(),
  parameters: text('parameters', { mode: 'json' }),
  authRequired: integer('auth_required', { mode: 'boolean' }).default(false),
  technologies: text('technologies', { mode: 'json' }).$type<string[]>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const scans = sqliteTable('scans', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  targetId: text('target_id').notNull().references(() => targets.id),
  name: text('name').notNull(),
  type: text('type', { enum: ['passive', 'active', 'full', 'api', 'web', 'network', 'cloud', 'secrets', 'sast', 'dast'] }).notNull(),
  status: text('status', { enum: ['queued', 'running', 'paused', 'completed', 'failed', 'cancelled'] }).default('queued').notNull(),
  progress: integer('progress').default(0).notNull(),
  modules: text('modules', { mode: 'json' }).$type<string[]>(),
  config: text('config', { mode: 'json' }),
  startedBy: text('started_by').references(() => users.id),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  duration: integer('duration'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const scanJobs = sqliteTable('scan_jobs', {
  id: text('id').primaryKey(),
  scanId: text('scan_id').notNull().references(() => scans.id),
  module: text('module').notNull(),
  status: text('status', { enum: ['queued', 'running', 'completed', 'failed'] }).default('queued').notNull(),
  progress: integer('progress').default(0).notNull(),
  logs: text('logs', { mode: 'json' }).$type<string[]>(),
  result: text('result', { mode: 'json' }),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
});

export const vulnerabilities = sqliteTable('vulnerabilities', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  cveId: text('cve_id'),
  cweId: text('cwe_id'),
  owaspCategory: text('owasp_category'),
  description: text('description'),
  severity: text('severity', { enum: ['critical', 'high', 'medium', 'low', 'info'] }).notNull(),
  cvssScore: real('cvss_score'),
  cvssVector: text('cvss_vector'),
  cvssVersion: text('cvss_version').default('3.1'),
  epssScore: real('epss_score'),
  epssPercentile: real('epss_percentile'),
  kev: integer('kev', { mode: 'boolean' }).default(false),
  vprScore: real('vpr_score'),
  remediation: text('remediation'),
  references: text('references', { mode: 'json' }).$type<string[]>(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const findings = sqliteTable('findings', {
  id: text('id').primaryKey(),
  scanId: text('scan_id').notNull().references(() => scans.id),
  projectId: text('project_id').notNull().references(() => projects.id),
  targetId: text('target_id').references(() => targets.id),
  assetId: text('asset_id').references(() => assets.id),
  vulnId: text('vuln_id').references(() => vulnerabilities.id),
  title: text('title').notNull(),
  description: text('description').notNull(),
  severity: text('severity', { enum: ['critical', 'high', 'medium', 'low', 'info'] }).notNull(),
  status: text('status', { enum: ['open', 'confirmed', 'false_positive', 'accepted_risk', 'remediated', 'retest'] }).default('open').notNull(),
  confidence: text('confidence', { enum: ['confirmed', 'firm', 'tentative'] }).default('firm').notNull(),
  cvssScore: real('cvss_score'),
  cvssVector: text('cvss_vector'),
  epssScore: real('epss_score'),
  kev: integer('kev', { mode: 'boolean' }).default(false),
  riskScore: real('risk_score'),
  location: text('location'),
  endpointId: text('endpoint_id').references(() => endpoints.id),
  affectedUrl: text('affected_url'),
  parameter: text('parameter'),
  proofOfConcept: text('proof_of_concept'),
  remediation: text('remediation'),
  impact: text('impact'),
  likelihood: text('likelihood'),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  assetCriticality: text('asset_criticality').default('medium'),
  discoveredAt: integer('discovered_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const evidence = sqliteTable('evidence', {
  id: text('id').primaryKey(),
  findingId: text('finding_id').notNull().references(() => findings.id),
  type: text('type', { enum: ['request', 'response', 'screenshot', 'log', 'payload', 'file'] }).notNull(),
  name: text('name').notNull(),
  content: text('content'),
  filePath: text('file_path'),
  mimeType: text('mime_type'),
  metadata: text('metadata', { mode: 'json' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const cves = sqliteTable('cves', {
  id: text('id').primaryKey(),
  cveId: text('cve_id').notNull().unique(),
  description: text('description'),
  publishedDate: text('published_date'),
  lastModifiedDate: text('last_modified_date'),
  cvssV2: text('cvss_v2', { mode: 'json' }),
  cvssV3: text('cvss_v3', { mode: 'json' }),
  cvssV4: text('cvss_v4', { mode: 'json' }),
  references: text('references', { mode: 'json' }).$type<string[]>(),
  cwes: text('cwes', { mode: 'json' }).$type<string[]>(),
  epssScore: real('epss_score'),
  epssPercentile: real('epss_percentile'),
  kev: integer('kev', { mode: 'boolean' }).default(false),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const complianceAudits = sqliteTable('compliance_audits', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  framework: text('framework').notNull(),
  name: text('name').notNull(),
  status: text('status', { enum: ['draft', 'in_progress', 'completed', 'archived'] }).default('draft').notNull(),
  score: real('score'),
  conductedBy: text('conducted_by').references(() => users.id),
  startedAt: integer('started_at', { mode: 'timestamp' }),
  completedAt: integer('completed_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const complianceControls = sqliteTable('compliance_controls', {
  id: text('id').primaryKey(),
  auditId: text('audit_id').notNull().references(() => complianceAudits.id),
  controlId: text('control_id').notNull(),
  title: text('title').notNull(),
  description: text('description'),
  category: text('category'),
  status: text('status', { enum: ['compliant', 'non_compliant', 'partial', 'not_applicable', 'not_tested'] }).default('not_tested').notNull(),
  evidence: text('evidence', { mode: 'json' }).$type<string[]>(),
  findings: text('findings', { mode: 'json' }).$type<string[]>(),
  notes: text('notes'),
  testedBy: text('tested_by').references(() => users.id),
  testedAt: integer('tested_at', { mode: 'timestamp' }),
});

export const threatModels = sqliteTable('threat_models', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name').notNull(),
  methodology: text('methodology', { enum: ['STRIDE', 'DREAD', 'PASTA', 'LINDDUN'] }).notNull(),
  description: text('description'),
  diagram: text('diagram', { mode: 'json' }),
  createdBy: text('created_by').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const automationWorkflows = sqliteTable('automation_workflows', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id),
  name: text('name').notNull(),
  description: text('description'),
  trigger: text('trigger', { mode: 'json' }),
  actions: text('actions', { mode: 'json' }).$type<any[]>(),
  status: text('status', { enum: ['active', 'inactive', 'draft'] }).default('draft').notNull(),
  createdBy: text('created_by').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const playbooks = sqliteTable('playbooks', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  category: text('category'),
  steps: text('steps', { mode: 'json' }).$type<any[]>(),
  tags: text('tags', { mode: 'json' }).$type<string[]>(),
  isPublic: integer('is_public', { mode: 'boolean' }).default(false),
  createdBy: text('created_by').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const reports = sqliteTable('reports', {
  id: text('id').primaryKey(),
  projectId: text('project_id').notNull().references(() => projects.id),
  name: text('name').notNull(),
  type: text('type', { enum: ['pdf', 'html', 'json', 'sarif', 'csv'] }).notNull(),
  template: text('template').default('default'),
  status: text('status', { enum: ['generating', 'completed', 'failed'] }).default('generating').notNull(),
  config: text('config', { mode: 'json' }),
  filePath: text('file_path'),
  generatedBy: text('generated_by').references(() => users.id),
  generatedAt: integer('generated_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const integrations = sqliteTable('integrations', {
  id: text('id').primaryKey(),
  projectId: text('project_id').references(() => projects.id),
  type: text('type').notNull(),
  name: text('name').notNull(),
  config: text('config', { mode: 'json' }),
  credentials: text('credentials', { mode: 'json' }),
  status: text('status', { enum: ['active', 'inactive', 'error'] }).default('inactive').notNull(),
  lastSyncAt: integer('last_sync_at', { mode: 'timestamp' }),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const auditLogs = sqliteTable('audit_logs', {
  id: text('id').primaryKey(),
  userId: text('user_id').references(() => users.id),
  orgId: text('org_id').references(() => organizations.id),
  action: text('action').notNull(),
  resource: text('resource').notNull(),
  resourceId: text('resource_id'),
  details: text('details', { mode: 'json' }),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
});

export const retests = sqliteTable('retests', {
  id: text('id').primaryKey(),
  findingId: text('finding_id').notNull().references(() => findings.id),
  scanId: text('scan_id').references(() => scans.id),
  status: text('status', { enum: ['pending', 'in_progress', 'verified_fixed', 'still_vulnerable', 'cannot_verify'] }).default('pending').notNull(),
  requestedBy: text('requested_by').references(() => users.id),
  verifiedBy: text('verified_by').references(() => users.id),
  notes: text('notes'),
  evidence: text('evidence', { mode: 'json' }).$type<string[]>(),
  requestedAt: integer('requested_at', { mode: 'timestamp' }).default(sql`(unixepoch())`).notNull(),
  verifiedAt: integer('verified_at', { mode: 'timestamp' }),
});
