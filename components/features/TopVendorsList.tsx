import React from 'react';
import { VendorSummary } from '@/types';
import { Card, CardContent } from '@/components/ui/Card';
import { formatCurrency, getCategoryColor, getCategoryTextColor } from '@/lib/utils';

interface TopVendorsListProps {
  vendors: VendorSummary[];
}

export function TopVendorsList({ vendors }: TopVendorsListProps) {
  if (vendors.length === 0) {
    return (
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
              <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Vendors Found</h3>
          <p className="text-gray-600">
            Add expenses to see your top vendors
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {vendors.map((vendor, index) => (
        <VendorCard key={vendor.vendor} vendor={vendor} rank={index + 1} />
      ))}
    </div>
  );
}

interface VendorCardProps {
  vendor: VendorSummary;
  rank: number;
}

function VendorCard({ vendor, rank }: VendorCardProps) {
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
            {/* Rank Badge */}
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold text-lg ${getBadgeColor(
                rank
              )}`}
            >
              {rank}
            </div>

            {/* Vendor Details */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl font-semibold text-gray-900">{vendor.vendor}</h3>
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full ${getCategoryColor(
                    vendor.topCategory
                  )} bg-opacity-20 ${getCategoryTextColor(vendor.topCategory)}`}
                >
                  {vendor.topCategory}
                </span>
                <span className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-700">
                  {vendor.percentage.toFixed(1)}% of total
                </span>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Total Spent</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(vendor.totalAmount)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Transactions</p>
                  <p className="text-lg font-semibold text-gray-900">{vendor.transactionCount}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Avg per Transaction</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(vendor.averageTransaction)}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${Math.min(vendor.percentage, 100)}%` }}
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
