'use client';

import React, { useState, useEffect } from 'react';
import { Expense, ExpenseFilters } from '@/types';
import { storage } from '@/lib/storage';
import { filterExpenses, calculateSummary, exportToCSV } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { ExpenseForm } from '@/components/expenses/ExpenseForm';
import { ExpenseList } from '@/components/expenses/ExpenseList';
import { ExpenseFiltersComponent } from '@/components/expenses/ExpenseFilters';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { CategoryChart } from '@/components/dashboard/CategoryChart';
import { RecentExpenses } from '@/components/dashboard/RecentExpenses';
import { Loading } from '@/components/ui/Loading';

export default function ExpenseTrackerPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredExpenses, setFilteredExpenses] = useState<Expense[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'expenses'>('dashboard');

  const [filters, setFilters] = useState<ExpenseFilters>({
    category: 'All',
    dateRange: { start: null, end: null },
    searchQuery: '',
  });

  // Load expenses on mount
  useEffect(() => {
    const loadedExpenses = storage.getExpenses();
    setExpenses(loadedExpenses);
    setFilteredExpenses(loadedExpenses);
    setIsLoading(false);
  }, []);

  // Apply filters when expenses or filters change
  useEffect(() => {
    const filtered = filterExpenses(expenses, filters);
    setFilteredExpenses(filtered);
  }, [expenses, filters]);

  const handleAddExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense = storage.addExpense(expenseData);
    setExpenses([...expenses, newExpense]);
    setIsModalOpen(false);
  };

  const handleUpdateExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (!editingExpense) return;

    const updatedExpense = storage.updateExpense(editingExpense.id, expenseData);
    if (updatedExpense) {
      setExpenses(expenses.map(e => e.id === editingExpense.id ? updatedExpense : e));
    }
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    storage.deleteExpense(id);
    setExpenses(expenses.filter(e => e.id !== id));
  };

  const handleEditExpense = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
  };

  const handleExportCSV = () => {
    exportToCSV(filteredExpenses);
  };

  const summary = calculateSummary(expenses);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading size="lg" text="Loading expenses..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-2 rounded-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Expense Tracker</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleExportCSV}
                disabled={expenses.length === 0}
              >
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
                Export CSV
              </Button>
              <Button onClick={() => setIsModalOpen(true)}>
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M12 4v16m8-8H4" />
                </svg>
                Add Expense
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('expenses')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'expenses'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All Expenses
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? (
          <div className="space-y-6">
            {/* Summary Cards */}
            <SummaryCards summary={summary} />

            {/* Charts and Recent Expenses */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CategoryChart summary={summary} />
              <RecentExpenses expenses={summary.recentExpenses} />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Filters */}
            <ExpenseFiltersComponent filters={filters} onFiltersChange={setFilters} />

            {/* Expense Count */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredExpenses.length} of {expenses.length} expenses
              </p>
            </div>

            {/* Expense List */}
            <ExpenseList
              expenses={filteredExpenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          </div>
        )}
      </main>

      {/* Add/Edit Expense Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingExpense ? 'Edit Expense' : 'Add New Expense'}
      >
        <ExpenseForm
          onSubmit={editingExpense ? handleUpdateExpense : handleAddExpense}
          onCancel={handleCloseModal}
          initialData={editingExpense || undefined}
          isEdit={!!editingExpense}
        />
      </Modal>
    </div>
  );
}
