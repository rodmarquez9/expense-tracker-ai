'use client';

import React from 'react';
import { ExpenseFilters, ExpenseCategory } from '@/types';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface ExpenseFiltersProps {
  filters: ExpenseFilters;
  onFiltersChange: (filters: ExpenseFilters) => void;
}

const categories: (ExpenseCategory | 'All')[] = [
  'All',
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export function ExpenseFiltersComponent({ filters, onFiltersChange }: ExpenseFiltersProps) {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({
      ...filters,
      category: e.target.value as ExpenseCategory | 'All',
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFiltersChange({
      ...filters,
      searchQuery: e.target.value,
    });
  };

  const handleDateChange = (type: 'start' | 'end', value: string) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [type]: value || null,
      },
    });
  };

  const handleReset = () => {
    onFiltersChange({
      category: 'All',
      dateRange: { start: null, end: null },
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.searchQuery;

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Input
            label="Search"
            type="text"
            placeholder="Search expenses..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <Select
            label="Category"
            value={filters.category}
            onChange={handleCategoryChange}
            options={categories.map((cat) => ({ value: cat, label: cat }))}
          />
        </div>

        <div>
          <Input
            label="From Date"
            type="date"
            value={filters.dateRange.start || ''}
            onChange={(e) => handleDateChange('start', e.target.value)}
          />
        </div>

        <div>
          <Input
            label="To Date"
            type="date"
            value={filters.dateRange.end || ''}
            onChange={(e) => handleDateChange('end', e.target.value)}
          />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={handleReset}>
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
