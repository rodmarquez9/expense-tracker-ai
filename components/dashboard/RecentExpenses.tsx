'use client';

import React from 'react';
import { Expense } from '@/types';
import { formatCurrency, formatDate, getCategoryBgColor, getCategoryTextColor } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface RecentExpensesProps {
  expenses: Expense[];
}

export function RecentExpenses({ expenses }: RecentExpensesProps) {
  if (expenses.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No recent expenses
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Expenses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {expenses.map((expense) => (
          <div
            key={expense.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${getCategoryBgColor(
                    expense.category
                  )} ${getCategoryTextColor(expense.category)}`}
                >
                  {expense.category}
                </span>
                <span className="text-xs text-gray-500">{formatDate(expense.date)}</span>
              </div>
              <p className="text-sm text-gray-900 truncate">{expense.description}</p>
            </div>
            <div className="ml-4">
              <p className="text-lg font-semibold text-gray-900">
                {formatCurrency(expense.amount)}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
