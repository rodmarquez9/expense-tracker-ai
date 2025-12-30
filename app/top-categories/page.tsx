'use client';

import React from 'react';
import { ExpenseCategory } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatCurrency, getCategoryColor, getCategoryBgColor, getCategoryTextColor } from '@/lib/utils';
import Link from 'next/link';

interface CategoryStat {
  category: ExpenseCategory;
  totalAmount: number;
  transactionCount: number;
  percentage: number;
  averageTransaction: number;
  monthlyAverage: number;
}

// Mock data for top expense categories
const mockCategoryStats: CategoryStat[] = [
  {
    category: 'Food',
    totalAmount: 2450.75,
    transactionCount: 48,
    percentage: 35.2,
    averageTransaction: 51.06,
    monthlyAverage: 817.58,
  },
  {
    category: 'Transportation',
    totalAmount: 1680.50,
    transactionCount: 32,
    percentage: 24.1,
    averageTransaction: 52.52,
    monthlyAverage: 560.17,
  },
  {
    category: 'Bills',
    totalAmount: 1250.00,
    transactionCount: 12,
    percentage: 17.9,
    averageTransaction: 104.17,
    monthlyAverage: 416.67,
  },
  {
    category: 'Entertainment',
    totalAmount: 890.25,
    transactionCount: 24,
    percentage: 12.8,
    averageTransaction: 37.09,
    monthlyAverage: 296.75,
  },
  {
    category: 'Shopping',
    totalAmount: 520.80,
    transactionCount: 16,
    percentage: 7.5,
    averageTransaction: 32.55,
    monthlyAverage: 173.60,
  },
  {
    category: 'Other',
    totalAmount: 175.50,
    transactionCount: 8,
    percentage: 2.5,
    averageTransaction: 21.94,
    monthlyAverage: 58.50,
  },
];

const totalSpending = mockCategoryStats.reduce((sum, stat) => sum + stat.totalAmount, 0);

export default function TopCategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
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
              </Link>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
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
                <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Expense Categories</h2>
          <p className="text-gray-600">
            Detailed breakdown of your spending across all categories
          </p>
        </div>

        {/* Summary Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Spending</p>
                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSpending)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockCategoryStats.reduce((sum, stat) => sum + stat.transactionCount, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Categories</p>
                <p className="text-2xl font-bold text-gray-900">{mockCategoryStats.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Cards */}
        <div className="space-y-4">
          {mockCategoryStats.map((stat, index) => (
            <CategoryCard key={stat.category} stat={stat} rank={index + 1} />
          ))}
        </div>

        {/* Empty State */}
        {mockCategoryStats.length === 0 && (
          <Card className="text-center py-12">
            <div className="flex flex-col items-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Expense Data Yet</h3>
              <p className="text-gray-600 mb-6">
                Start adding expenses to see your top spending categories
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Your First Expense
              </Link>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}

interface CategoryCardProps {
  stat: CategoryStat;
  rank: number;
}

function CategoryCard({ stat, rank }: CategoryCardProps) {
  const getBadgeColor = (rank: number): string => {
    if (rank === 1) return 'bg-yellow-500 text-white';
    if (rank === 2) return 'bg-gray-400 text-white';
    if (rank === 3) return 'bg-orange-600 text-white';
    return 'bg-gray-200 text-gray-700';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4 flex-1">
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${getBadgeColor(
                rank
              )}`}
            >
              {rank}
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-4 h-4 rounded-full ${getCategoryColor(stat.category)}`} />
                <h3 className={`text-xl font-semibold ${getCategoryTextColor(stat.category)}`}>
                  {stat.category}
                </h3>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryBgColor(
                    stat.category
                  )} ${getCategoryTextColor(stat.category)}`}
                >
                  {stat.percentage.toFixed(1)}% of total
                </span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(stat.totalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Transactions</p>
                  <p className="text-lg font-semibold text-gray-900">{stat.transactionCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Avg per Transaction</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(stat.averageTransaction)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Monthly Average</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(stat.monthlyAverage)}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${getCategoryColor(stat.category)}`}
                    style={{ width: `${stat.percentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
