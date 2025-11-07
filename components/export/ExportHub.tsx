'use client';

import React, { useState, useEffect } from 'react';
import { Expense } from '@/types';
import { ExportTemplate, CloudService, ExportFormat, CloudIntegration, ExportHistoryItem } from '@/types/export';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import {
  EXPORT_TEMPLATES,
  exportHistory,
  integrations,
  generateShareLink,
  sendEmailExport,
  exportToCloudService,
  estimateFileSize,
} from '@/lib/cloudExportUtils';
import { formatDate, formatCurrency } from '@/lib/utils';

interface ExportHubProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

type TabType = 'templates' | 'integrations' | 'history' | 'share' | 'schedule';

export function ExportHub({ isOpen, onClose, expenses }: ExportHubProps) {
  const [activeTab, setActiveTab] = useState<TabType>('templates');
  const [selectedTemplate, setSelectedTemplate] = useState<ExportTemplate>('standard');
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('csv');
  const [selectedService, setSelectedService] = useState<CloudService | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [cloudIntegrations, setCloudIntegrations] = useState<CloudIntegration[]>([]);
  const [history, setHistory] = useState<ExportHistoryItem[]>([]);
  const [shareLink, setShareLink] = useState<string>('');
  const [qrCode, setQrCode] = useState<string>('');
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (isOpen) {
      setCloudIntegrations(integrations.getIntegrations());
      setHistory(exportHistory.getHistory());
    }
  }, [isOpen]);

  const handleExport = async () => {
    if (!selectedService) return;

    setIsExporting(true);
    setShowSuccess(false);

    try {
      const result = await exportToCloudService(
        selectedService,
        selectedTemplate,
        selectedFormat,
        expenses
      );

      // Add to history
      const historyItem = exportHistory.addToHistory({
        template: selectedTemplate,
        format: selectedFormat,
        service: selectedService,
        recordCount: expenses.length,
        fileSize: estimateFileSize(expenses.length, selectedFormat),
        status: 'completed',
        downloadUrl: result.url,
      });

      setHistory([historyItem, ...history]);
      setSuccessMessage(result.message);
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleEmailExport = async () => {
    if (!email) return;

    setIsExporting(true);
    try {
      const result = await sendEmailExport(email, selectedTemplate, selectedFormat);

      exportHistory.addToHistory({
        template: selectedTemplate,
        format: selectedFormat,
        service: 'email',
        recordCount: expenses.length,
        fileSize: estimateFileSize(expenses.length, selectedFormat),
        status: 'completed',
      });

      setSuccessMessage(result.message);
      setShowSuccess(true);
      setEmail('');

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Email export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleGenerateShareLink = async () => {
    setIsExporting(true);
    try {
      const shareSettings = await generateShareLink(expenses, selectedTemplate);
      setShareLink(shareSettings.link);
      setQrCode(shareSettings.qrCode || '');
    } catch (error) {
      console.error('Failed to generate share link:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleToggleIntegration = (serviceId: CloudService) => {
    integrations.toggleConnection(serviceId);
    setCloudIntegrations(integrations.getIntegrations());
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setSuccessMessage('Copied to clipboard!');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  if (!isOpen) return null;

  const selectedTemplateConfig = EXPORT_TEMPLATES.find(t => t.id === selectedTemplate);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-3xl w-full bg-white shadow-xl flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white bg-opacity-20 p-2 rounded-lg">
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold">Export Hub</h2>
              <p className="text-sm text-green-100">Cloud-powered export & sharing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-2 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success Banner */}
        {showSuccess && (
          <div className="bg-green-50 border-l-4 border-green-500 px-6 py-3 flex items-center gap-3">
            <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-green-700 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-white px-6">
          <nav className="flex gap-6">
            {[
              { id: 'templates', label: 'Templates', icon: '📋' },
              { id: 'integrations', label: 'Integrations', icon: '🔗' },
              { id: 'history', label: 'History', icon: '📜' },
              { id: 'share', label: 'Share', icon: '🔗' },
              { id: 'schedule', label: 'Schedule', icon: '⏰' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Templates Tab */}
          {activeTab === 'templates' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Choose Export Template</h3>
                <div className="grid grid-cols-2 gap-4">
                  {EXPORT_TEMPLATES.map(template => (
                    <button
                      key={template.id}
                      onClick={() => setSelectedTemplate(template.id)}
                      className={`text-left p-4 border-2 rounded-lg transition-all ${
                        selectedTemplate === template.id
                          ? 'border-green-600 bg-green-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-3xl">{template.icon}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{template.name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{template.description}</p>
                          <p className="text-xs text-gray-400 mt-2 italic">{template.useCase}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedTemplateConfig && (
                <>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Format</h3>
                    <div className="grid grid-cols-4 gap-3">
                      {selectedTemplateConfig.formats.map(format => (
                        <button
                          key={format}
                          onClick={() => setSelectedFormat(format)}
                          className={`p-3 border-2 rounded-lg text-center transition-all ${
                            selectedFormat === format
                              ? 'border-green-600 bg-green-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-semibold text-sm uppercase">{format}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">Template Details</h4>
                    <div className="space-y-1 text-xs text-blue-700">
                      <p><strong>Fields included:</strong> {selectedTemplateConfig.fields.join(', ')}</p>
                      <p><strong>Records:</strong> {expenses.length}</p>
                      <p><strong>Est. size:</strong> {estimateFileSize(expenses.length, selectedFormat)}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Integrations Tab */}
          {activeTab === 'integrations' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud Integrations</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Connect your favorite cloud services for seamless export
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {cloudIntegrations.map(integration => (
                  <div
                    key={integration.id}
                    className="border border-gray-200 rounded-lg p-4 flex items-center justify-between hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-4xl">{integration.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{integration.name}</h4>
                        <p className="text-sm text-gray-500">{integration.description}</p>
                        {integration.connected && integration.lastSync && (
                          <p className="text-xs text-green-600 mt-1">
                            Last sync: {formatDate(integration.lastSync)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        integration.status === 'connected'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {integration.status}
                      </div>
                      <Button
                        size="sm"
                        variant={integration.connected ? 'secondary' : 'primary'}
                        onClick={() => {
                          handleToggleIntegration(integration.id);
                          setSelectedService(integration.connected ? null : integration.id);
                        }}
                      >
                        {integration.connected ? 'Disconnect' : 'Connect'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedService && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-green-900 mb-3">Ready to Export</h4>
                  <p className="text-sm text-green-700 mb-4">
                    Export {expenses.length} expenses to{' '}
                    {cloudIntegrations.find(i => i.id === selectedService)?.name}
                  </p>
                  <Button onClick={handleExport} disabled={isExporting}>
                    {isExporting ? (
                      <>
                        <Loading size="sm" />
                        <span className="ml-2">Exporting...</span>
                      </>
                    ) : (
                      `Export to ${cloudIntegrations.find(i => i.id === selectedService)?.name}`
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* History Tab */}
          {activeTab === 'history' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Export History</h3>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    exportHistory.clearHistory();
                    setHistory([]);
                  }}
                >
                  Clear History
                </Button>
              </div>

              {history.length === 0 ? (
                <div className="text-center py-12">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="mt-2 text-sm text-gray-500">No export history yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map(item => (
                    <div
                      key={item.id}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">
                              {EXPORT_TEMPLATES.find(t => t.id === item.template)?.name}
                            </span>
                            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded uppercase font-medium">
                              {item.format}
                            </span>
                            {item.service && (
                              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded">
                                {cloudIntegrations.find(i => i.id === item.service)?.name}
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">
                            {formatDate(item.timestamp)} • {item.recordCount} records • {item.fileSize}
                          </p>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          item.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {item.status}
                        </div>
                      </div>
                      {item.downloadUrl && (
                        <button
                          onClick={() => window.open(item.downloadUrl, '_blank')}
                          className="mt-3 text-sm text-green-600 hover:text-green-700 font-medium"
                        >
                          Open in {cloudIntegrations.find(i => i.id === item.service)?.name} →
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Share Tab */}
          {activeTab === 'share' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Data</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Generate secure shareable links or send via email
                </p>
              </div>

              {/* Email Export */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">✉️</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Send via Email</h4>
                    <p className="text-sm text-gray-500">Send export directly to your inbox</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleEmailExport} disabled={!email || isExporting}>
                    {isExporting ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </div>

              {/* Generate Share Link */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">🔗</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Shareable Link</h4>
                    <p className="text-sm text-gray-500">Create a secure link with QR code</p>
                  </div>
                </div>
                <Button onClick={handleGenerateShareLink} disabled={isExporting}>
                  {isExporting ? 'Generating...' : 'Generate Share Link'}
                </Button>

                {shareLink && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Share Link (expires in 7 days)
                      </label>
                      <div className="flex gap-2">
                        <Input
                          type="text"
                          value={shareLink}
                          readOnly
                          className="flex-1 bg-gray-50"
                        />
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => copyToClipboard(shareLink)}
                        >
                          Copy
                        </Button>
                      </div>
                    </div>

                    {qrCode && (
                      <div className="border border-gray-200 rounded-lg p-4 bg-white text-center">
                        <p className="text-sm font-medium text-gray-700 mb-3">Scan to Access</p>
                        <img
                          src={qrCode}
                          alt="QR Code"
                          className="mx-auto border border-gray-200 rounded"
                        />
                        <p className="text-xs text-gray-500 mt-3">
                          Anyone with this QR code can view your expense data
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Schedule Tab */}
          {activeTab === 'schedule' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Scheduled Exports</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Set up automatic exports to run on a schedule
                </p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="mt-2 text-sm font-semibold text-gray-900">No scheduled exports yet</h4>
                <p className="mt-1 text-sm text-gray-500">
                  Create automatic exports to run daily, weekly, or monthly
                </p>
                <Button size="sm" className="mt-4">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M12 4v16m8-8H4" />
                  </svg>
                  Create Schedule
                </Button>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
                <p className="text-sm text-blue-700">
                  Schedule monthly exports to Google Sheets for automatic budget tracking, or set up weekly
                  backups to Dropbox for peace of mind.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
