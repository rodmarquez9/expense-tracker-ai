'use client';

import React from 'react';
import { ExpenseSummary } from '@/types';
import { formatCurrency, getCategoryColor } from '@/lib/utils';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';

interface CategoryChartProps {
  summary: ExpenseSummary;
}

export function CategoryChart({ summary }: CategoryChartProps) {
  const { categoryBreakdown } = summary;

  if (categoryBreakdown.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-center py-8">
            No expense data available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending by Category</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryBreakdown.map((item) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  {item.category}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {formatCurrency(item.amount)} ({item.percentage.toFixed(1)}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className={`h-full ${getCategoryColor(item.category)} transition-all duration-500 ease-out`}
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {categoryBreakdown.map((item) => (
              <div key={item.category} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${getCategoryColor(item.category)}`} />
                <span className="text-xs text-gray-600">{item.category}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
