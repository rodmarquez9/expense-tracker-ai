import { Expense } from './index';

export type ExportFormat = 'csv' | 'json' | 'pdf' | 'excel';

export type CloudService =
  | 'email'
  | 'google-sheets'
  | 'google-drive'
  | 'dropbox'
  | 'onedrive'
  | 'notion'
  | 'airtable';

export type ExportTemplate =
  | 'standard'
  | 'tax-report'
  | 'monthly-summary'
  | 'category-analysis'
  | 'detailed-breakdown'
  | 'simple-list';

export interface ExportTemplateConfig {
  id: ExportTemplate;
  name: string;
  description: string;
  icon: string;
  formats: ExportFormat[];
  fields: string[];
  useCase: string;
}

export interface CloudIntegration {
  id: CloudService;
  name: string;
  icon: string;
  description: string;
  connected: boolean;
  lastSync?: string;
  status: 'connected' | 'disconnected' | 'syncing' | 'error';
}

export interface ExportHistoryItem {
  id: string;
  timestamp: string;
  template: ExportTemplate;
  format: ExportFormat;
  service?: CloudService;
  recordCount: number;
  fileSize: string;
  status: 'completed' | 'failed' | 'in-progress';
  downloadUrl?: string;
  shareLink?: string;
}

export interface ScheduledExport {
  id: string;
  template: ExportTemplate;
  format: ExportFormat;
  service: CloudService;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  enabled: boolean;
  recipients?: string[];
}

export interface ShareSettings {
  link: string;
  qrCode?: string;
  expiresAt?: string;
  password?: string;
  allowDownload: boolean;
  viewCount: number;
}
