'use client';

import React, { useState, useEffect } from 'react';
import { Expense, ExpenseCategory, ExpenseFormData } from '@/types';
import { validateExpenseForm } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface ExpenseFormProps {
  onSubmit: (data: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
  initialData?: Expense;
  isEdit?: boolean;
}

const categories: ExpenseCategory[] = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Bills',
  'Other',
];

export function ExpenseForm({ onSubmit, onCancel, initialData, isEdit = false }: ExpenseFormProps) {
  const [formData, setFormData] = useState<ExpenseFormData>({
    date: initialData?.date.split('T')[0] || new Date().toISOString().split('T')[0],
    amount: initialData?.amount.toString() || '',
    category: initialData?.category || 'Food',
    description: initialData?.description || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validation = validateExpenseForm(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'> = {
        date: new Date(formData.date).toISOString(),
        amount: parseFloat(formData.amount),
        category: formData.category,
        description: formData.description.trim(),
      };

      onSubmit(expenseData);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Date"
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        error={errors.date}
        max={new Date().toISOString().split('T')[0]}
      />

      <Input
        label="Amount"
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        error={errors.amount}
        placeholder="0.00"
        step="0.01"
        min="0"
      />

      <Select
        label="Category"
        name="category"
        value={formData.category}
        onChange={handleChange}
        error={errors.category}
        options={categories.map(cat => ({ value: cat, label: cat }))}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={(e) => handleChange(e as any)}
          rows={3}
          className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${
            errors.description
              ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300'
          }`}
          placeholder="Enter expense description..."
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isSubmitting} className="flex-1">
          {isSubmitting ? 'Saving...' : isEdit ? 'Update Expense' : 'Add Expense'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
