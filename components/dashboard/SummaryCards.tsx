'use client';

import React from 'react';
import { ExpenseSummary } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/Card';

interface SummaryCardsProps {
  summary: ExpenseSummary;
}

export function SummaryCards({ summary }: SummaryCardsProps) {
  const cards = [
    {
      title: 'Total Spending',
      value: formatCurrency(summary.totalSpending),
      icon: (
        <svg
          className="w-8 h-8 text-green-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
    },
    {
      title: 'This Month',
      value: formatCurrency(summary.monthlySpending),
      icon: (
        <svg
          className="w-8 h-8 text-blue-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Top Category',
      value: summary.topCategory?.category || 'N/A',
      subtitle: summary.topCategory ? formatCurrency(summary.topCategory.amount) : undefined,
      icon: (
        <svg
          className="w-8 h-8 text-purple-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
      ),
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Total Expenses',
      value: summary.categoryBreakdown.reduce((sum, cat) => sum + cat.amount, 0) > 0
        ? summary.categoryBreakdown.length.toString()
        : '0',
      subtitle: 'Categories',
      icon: (
        <svg
          className="w-8 h-8 text-orange-600"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <Card key={index} className={`${card.bgColor} border-none shadow-lg`}>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                {card.subtitle && (
                  <p className="text-sm text-gray-500 mt-1">{card.subtitle}</p>
                )}
              </div>
              <div>{card.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
