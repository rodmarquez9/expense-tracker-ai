import QRCode from 'qrcode';
import {
  ExportTemplate,
  ExportTemplateConfig,
  CloudIntegration,
  ExportHistoryItem,
  CloudService,
  ExportFormat,
  ShareSettings,
} from '@/types/export';
import { Expense } from '@/types';

const HISTORY_KEY = 'export-history';
const INTEGRATIONS_KEY = 'cloud-integrations';

/**
 * Export Template Configurations
 */
export const EXPORT_TEMPLATES: ExportTemplateConfig[] = [
  {
    id: 'standard',
    name: 'Standard Export',
    description: 'All expense data with standard fields',
    icon: '📊',
    formats: ['csv', 'json', 'pdf', 'excel'],
    fields: ['date', 'category', 'description', 'amount'],
    useCase: 'General purpose export for analysis',
  },
  {
    id: 'tax-report',
    name: 'Tax Report',
    description: 'IRS-compliant expense report',
    icon: '🧾',
    formats: ['pdf', 'excel'],
    fields: ['date', 'category', 'description', 'amount', 'tax-category'],
    useCase: 'Tax filing and deductions',
  },
  {
    id: 'monthly-summary',
    name: 'Monthly Summary',
    description: 'Aggregated monthly breakdown',
    icon: '📅',
    formats: ['pdf', 'excel'],
    fields: ['month', 'category', 'total', 'count'],
    useCase: 'Budget reviews and planning',
  },
  {
    id: 'category-analysis',
    name: 'Category Analysis',
    description: 'Spending by category with charts',
    icon: '📈',
    formats: ['pdf', 'excel'],
    fields: ['category', 'total', 'percentage', 'trend'],
    useCase: 'Identify spending patterns',
  },
  {
    id: 'detailed-breakdown',
    name: 'Detailed Breakdown',
    description: 'Comprehensive expense details',
    icon: '🔍',
    formats: ['excel', 'csv'],
    fields: ['date', 'category', 'description', 'amount', 'created', 'updated', 'tags'],
    useCase: 'In-depth analysis and auditing',
  },
  {
    id: 'simple-list',
    name: 'Simple List',
    description: 'Basic expense list',
    icon: '📝',
    formats: ['csv', 'pdf'],
    fields: ['date', 'description', 'amount'],
    useCase: 'Quick reference and sharing',
  },
];

/**
 * Cloud Service Integrations
 */
export const DEFAULT_INTEGRATIONS: CloudIntegration[] = [
  {
    id: 'email',
    name: 'Email',
    icon: '✉️',
    description: 'Send exports via email',
    connected: true,
    status: 'connected',
  },
  {
    id: 'google-sheets',
    name: 'Google Sheets',
    icon: '📗',
    description: 'Export directly to Google Sheets',
    connected: false,
    status: 'disconnected',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: '💾',
    description: 'Save to Google Drive',
    connected: false,
    status: 'disconnected',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: '📦',
    description: 'Sync with Dropbox',
    connected: false,
    status: 'disconnected',
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    icon: '☁️',
    description: 'Microsoft OneDrive integration',
    connected: false,
    status: 'disconnected',
  },
  {
    id: 'notion',
    name: 'Notion',
    icon: '📓',
    description: 'Export to Notion database',
    connected: false,
    status: 'disconnected',
  },
  {
    id: 'airtable',
    name: 'Airtable',
    icon: '🗂️',
    description: 'Sync with Airtable base',
    connected: false,
    status: 'disconnected',
  },
];

/**
 * Export History Management
 */
export const exportHistory = {
  getHistory(): ExportHistoryItem[] {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(HISTORY_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addToHistory(item: Omit<ExportHistoryItem, 'id' | 'timestamp'>): ExportHistoryItem {
    const history = this.getHistory();
    const newItem: ExportHistoryItem = {
      ...item,
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
    };
    history.unshift(newItem);
    // Keep only last 50 items
    const trimmedHistory = history.slice(0, 50);
    this.saveHistory(trimmedHistory);
    return newItem;
  },

  saveHistory(history: ExportHistoryItem[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error saving export history:', error);
    }
  },

  clearHistory(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(HISTORY_KEY);
  },
};

/**
 * Cloud Integrations Management
 */
export const integrations = {
  getIntegrations(): CloudIntegration[] {
    if (typeof window === 'undefined') return DEFAULT_INTEGRATIONS;
    try {
      const data = localStorage.getItem(INTEGRATIONS_KEY);
      return data ? JSON.parse(data) : DEFAULT_INTEGRATIONS;
    } catch {
      return DEFAULT_INTEGRATIONS;
    }
  },

  updateIntegration(id: CloudService, updates: Partial<CloudIntegration>): void {
    const integrationsList = this.getIntegrations();
    const index = integrationsList.findIndex(i => i.id === id);
    if (index !== -1) {
      integrationsList[index] = { ...integrationsList[index], ...updates };
      this.saveIntegrations(integrationsList);
    }
  },

  saveIntegrations(integrationsList: CloudIntegration[]): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(INTEGRATIONS_KEY, JSON.stringify(integrationsList));
    } catch (error) {
      console.error('Error saving integrations:', error);
    }
  },

  toggleConnection(id: CloudService): void {
    const integrationsList = this.getIntegrations();
    const integration = integrationsList.find(i => i.id === id);
    if (integration) {
      this.updateIntegration(id, {
        connected: !integration.connected,
        status: !integration.connected ? 'connected' : 'disconnected',
        lastSync: !integration.connected ? new Date().toISOString() : undefined,
      });
    }
  },
};

/**
 * Generate shareable link and QR code
 */
export async function generateShareLink(
  expenses: Expense[],
  template: ExportTemplate
): Promise<ShareSettings> {
  // In a real app, this would upload to a server and get a real URL
  const mockShareId = crypto.randomUUID().substring(0, 8);
  const shareLink = `https://expense-tracker.app/share/${mockShareId}`;

  // Generate QR code
  let qrCode: string | undefined;
  try {
    qrCode = await QRCode.toDataURL(shareLink, {
      width: 200,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });
  } catch (error) {
    console.error('Error generating QR code:', error);
  }

  return {
    link: shareLink,
    qrCode,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
    allowDownload: true,
    viewCount: 0,
  };
}

/**
 * Simulate email export
 */
export async function sendEmailExport(
  email: string,
  template: ExportTemplate,
  format: ExportFormat
): Promise<{ success: boolean; message: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));

  return {
    success: true,
    message: `Export sent successfully to ${email}`,
  };
}

/**
 * Simulate cloud service export
 */
export async function exportToCloudService(
  service: CloudService,
  template: ExportTemplate,
  format: ExportFormat,
  expenses: Expense[]
): Promise<{ success: boolean; url?: string; message: string }> {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 2000));

  const serviceNames: Record<CloudService, string> = {
    'email': 'Email',
    'google-sheets': 'Google Sheets',
    'google-drive': 'Google Drive',
    'dropbox': 'Dropbox',
    'onedrive': 'OneDrive',
    'notion': 'Notion',
    'airtable': 'Airtable',
  };

  const mockUrls: Record<CloudService, string> = {
    'email': '',
    'google-sheets': 'https://docs.google.com/spreadsheets/d/abc123',
    'google-drive': 'https://drive.google.com/file/d/xyz789',
    'dropbox': 'https://www.dropbox.com/s/abc123',
    'onedrive': 'https://onedrive.live.com/view.aspx?id=xyz',
    'notion': 'https://notion.so/Expense-Report-abc123',
    'airtable': 'https://airtable.com/appXYZ/tblABC',
  };

  return {
    success: true,
    url: mockUrls[service],
    message: `Successfully exported to ${serviceNames[service]}`,
  };
}

/**
 * Format file size
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Calculate estimated file size
 */
export function estimateFileSize(recordCount: number, format: ExportFormat): string {
  const bytesPerRecord: Record<ExportFormat, number> = {
    csv: 150,
    json: 300,
    pdf: 400,
    excel: 250,
  };

  const baseSize = 1024; // 1 KB base
  const totalBytes = baseSize + (recordCount * bytesPerRecord[format]);

  return formatFileSize(totalBytes);
}
