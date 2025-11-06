'use client';

import React from 'react';
import { Expense } from '@/types';
import { formatCurrency, formatDate, getCategoryBgColor, getCategoryTextColor } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onEdit, onDelete }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <Card className="text-center py-12">
        <div className="text-gray-400 mb-2">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No expenses yet</h3>
        <p className="text-gray-500">Add your first expense to get started</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {expenses.map((expense) => (
        <Card key={expense.id} padding="none" className="hover:shadow-lg transition-shadow">
          <div className="p-4 flex items-center justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryBgColor(
                    expense.category
                  )} ${getCategoryTextColor(expense.category)}`}
                >
                  {expense.category}
                </span>
                <span className="text-sm text-gray-500">{formatDate(expense.date)}</span>
              </div>
              <p className="text-gray-900 font-medium mb-1 truncate">{expense.description}</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(expense.amount)}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onEdit(expense)}
                className="whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit
              </Button>
              <Button
                size="sm"
                variant="danger"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this expense?')) {
                    onDelete(expense.id);
                  }
                }}
                className="whitespace-nowrap"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
