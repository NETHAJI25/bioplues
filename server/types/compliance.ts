export type ComplianceFramework = 
  | 'OWASP_ASVS' 
  | 'NIST_CSF_2.0' 
  | 'ISO_27001_2022' 
  | 'SOC2' 
  | 'PCI_DSS_V4' 
  | 'GDPR' 
  | 'HIPAA' 
  | 'CIS' 
  | 'FedRAMP';

export type ControlStatus = 'compliant' | 'non_compliant' | 'partial' | 'not_applicable' | 'not_tested';
