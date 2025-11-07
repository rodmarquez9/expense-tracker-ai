'use client';

import React, { useState, useMemo } from 'react';
import { Expense, ExpenseCategory } from '@/types';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Loading } from '@/components/ui/Loading';
import { formatCurrency, formatDate, getCategoryBgColor, getCategoryTextColor } from '@/lib/utils';
import { exportToCSVAdvanced, exportToJSON, exportToPDF } from '@/lib/exportUtils';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  expenses: Expense[];
}

type ExportFormat = 'csv' | 'json' | 'pdf';

const CATEGORIES: ExpenseCategory[] = ['Food', 'Transportation', 'Entertainment', 'Shopping', 'Bills', 'Other'];

export function ExportModal({ isOpen, onClose, expenses }: ExportModalProps) {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [filename, setFilename] = useState('expenses-export');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<ExpenseCategory[]>([...CATEGORIES]);
  const [isExporting, setIsExporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Filter expenses based on selected criteria
  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      // Category filter
      if (!selectedCategories.includes(expense.category)) {
        return false;
      }

      // Date range filter
      if (startDate) {
        const expenseDate = new Date(expense.date);
        const start = new Date(startDate);
        if (expenseDate < start) {
          return false;
        }
      }

      if (endDate) {
        const expenseDate = new Date(expense.date);
        const end = new Date(endDate);
        if (expenseDate > end) {
          return false;
        }
      }

      return true;
    });
  }, [expenses, selectedCategories, startDate, endDate]);

  const handleCategoryToggle = (category: ExpenseCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleSelectAllCategories = () => {
    setSelectedCategories([...CATEGORIES]);
  };

  const handleDeselectAllCategories = () => {
    setSelectedCategories([]);
  };

  const handleExport = async () => {
    if (filteredExpenses.length === 0) {
      alert('No expenses to export with the selected filters.');
      return;
    }

    setIsExporting(true);

    try {
      // Simulate async operation for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      const exportFilename = `${filename}-${new Date().toISOString().split('T')[0]}`;

      switch (format) {
        case 'csv':
          exportToCSVAdvanced(filteredExpenses, exportFilename);
          break;
        case 'json':
          exportToJSON(filteredExpenses, exportFilename);
          break;
        case 'pdf':
          await exportToPDF(filteredExpenses, exportFilename);
          break;
      }

      // Close modal after successful export
      setTimeout(() => {
        setIsExporting(false);
        onClose();
      }, 500);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
      setIsExporting(false);
    }
  };

  const totalAmount = filteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Expenses" size="lg">
      <div className="space-y-6">
        {/* Format Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-3">
            {[
              { value: 'csv', label: 'CSV', icon: '📊', description: 'Spreadsheet format' },
              { value: 'json', label: 'JSON', icon: '📄', description: 'Data format' },
              { value: 'pdf', label: 'PDF', icon: '📑', description: 'Document format' },
            ].map(({ value, label, icon, description }) => (
              <button
                key={value}
                onClick={() => setFormat(value as ExportFormat)}
                className={`p-4 border-2 rounded-lg text-center transition-all ${
                  format === value
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{icon}</div>
                <div className="font-semibold text-sm">{label}</div>
                <div className="text-xs text-gray-500 mt-1">{description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Filename Input */}
        <div>
          <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-2">
            File Name
          </label>
          <Input
            id="filename"
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="expenses-export"
          />
          <p className="text-xs text-gray-500 mt-1">
            Date will be appended automatically (e.g., {filename}-{new Date().toISOString().split('T')[0]}.{format})
          </p>
        </div>

        {/* Date Range Filter */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-2">
              Start Date
            </label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-2">
              End Date
            </label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="block text-sm font-medium text-gray-700">
              Categories
            </label>
            <div className="flex gap-2">
              <button
                onClick={handleSelectAllCategories}
                className="text-xs text-green-600 hover:text-green-700 font-medium"
              >
                Select All
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={handleDeselectAllCategories}
                className="text-xs text-gray-600 hover:text-gray-700 font-medium"
              >
                Deselect All
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {CATEGORIES.map(category => (
              <label
                key={category}
                className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedCategories.includes(category)
                    ? 'border-green-600 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryToggle(category)}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm font-medium">{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Export Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Export Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500">Records</p>
              <p className="text-2xl font-bold text-gray-900">{filteredExpenses.length}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Categories</p>
              <p className="text-2xl font-bold text-gray-900">{selectedCategories.length}</p>
            </div>
          </div>
        </div>

        {/* Preview Toggle */}
        <div>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
          >
            <svg
              className={`w-4 h-4 transition-transform ${showPreview ? 'rotate-90' : ''}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
            {showPreview ? 'Hide' : 'Show'} Data Preview ({filteredExpenses.length} records)
          </button>
        </div>

        {/* Data Preview */}
        {showPreview && (
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="max-h-64 overflow-y-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredExpenses.slice(0, 10).map(expense => (
                    <tr key={expense.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                        {formatDate(expense.date)}
                      </td>
                      <td className="px-4 py-3 text-sm whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getCategoryBgColor(expense.category)} ${getCategoryTextColor(expense.category)}`}>
                          {expense.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {expense.description}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900 text-right font-medium">
                        {formatCurrency(expense.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredExpenses.length > 10 && (
                <div className="px-4 py-3 bg-gray-50 text-xs text-gray-500 text-center border-t">
                  Showing first 10 of {filteredExpenses.length} records
                </div>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleExport}
            disabled={isExporting || filteredExpenses.length === 0}
          >
            {isExporting ? (
              <>
                <Loading size="sm" />
                <span className="ml-2">Exporting...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export {format.toUpperCase()}
              </>
            )}
          </Button>
        </div>

        {filteredExpenses.length === 0 && (
          <div className="text-center py-8">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="mt-2 text-sm text-gray-500">
              No expenses match the selected filters
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}
