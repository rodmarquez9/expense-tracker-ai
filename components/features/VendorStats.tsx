import React from 'react';
import { VendorSummary } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { formatCurrency } from '@/lib/utils';

interface VendorStatsProps {
  vendors: VendorSummary[];
}

export function VendorStats({ vendors }: VendorStatsProps) {
  const totalVendors = vendors.length;
  const totalTransactions = vendors.reduce((sum, v) => sum + v.transactionCount, 0);
  const totalSpending = vendors.reduce((sum, v) => sum + v.totalAmount, 0);
  const averagePerVendor = totalVendors > 0 ? totalSpending / totalVendors : 0;
  const topVendor = vendors.length > 0 ? vendors[0] : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Vendors</p>
            <p className="text-2xl font-bold text-gray-900">{totalVendors}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Top Vendor</p>
            <p className="text-2xl font-bold text-gray-900">
              {topVendor ? topVendor.vendor : 'N/A'}
            </p>
            {topVendor && (
              <p className="text-xs text-gray-500 mt-1">
                {formatCurrency(topVendor.totalAmount)}
              </p>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Transactions</p>
            <p className="text-2xl font-bold text-gray-900">{totalTransactions}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Avg per Vendor</p>
            <p className="text-2xl font-bold text-gray-900">
              {formatCurrency(averagePerVendor)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
