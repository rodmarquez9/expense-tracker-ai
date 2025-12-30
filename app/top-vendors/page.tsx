'use client';

import React from 'react';
import Link from 'next/link';
import { TopVendorsList } from '@/components/features/TopVendorsList';
import { VendorStats } from '@/components/features/VendorStats';
import { generateSampleVendorData } from '@/lib/vendorUtils';

export default function TopVendorsPage() {
  // Using sample data for now - can be replaced with real data later
  const vendors = generateSampleVendorData();

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
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Vendors</h2>
          <p className="text-gray-600">
            Track your spending across different vendors and merchants
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="mb-8">
          <VendorStats vendors={vendors} />
        </div>

        {/* Vendor List */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">All Vendors</h3>
          <TopVendorsList vendors={vendors} />
        </div>
      </main>
    </div>
  );
}
