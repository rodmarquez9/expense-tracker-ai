import { Expense, ExpenseCategory, ExpenseFilters, ExpenseSummary } from '@/types';

// Format currency
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

// Get category color
export function getCategoryColor(category: ExpenseCategory): string {
  const colors: Record<ExpenseCategory, string> = {
    Food: 'bg-orange-500',
    Transportation: 'bg-blue-500',
    Entertainment: 'bg-purple-500',
    Shopping: 'bg-pink-500',
    Bills: 'bg-red-500',
    Other: 'bg-gray-500',
  };

  return colors[category];
}

// Get category text color
export function getCategoryTextColor(category: ExpenseCategory): string {
  const colors: Record<ExpenseCategory, string> = {
    Food: 'text-orange-600',
    Transportation: 'text-blue-600',
    Entertainment: 'text-purple-600',
    Shopping: 'text-pink-600',
    Bills: 'text-red-600',
    Other: 'text-gray-600',
  };

  return colors[category];
}

// Get category background color (light)
export function getCategoryBgColor(category: ExpenseCategory): string {
  const colors: Record<ExpenseCategory, string> = {
    Food: 'bg-orange-100',
    Transportation: 'bg-blue-100',
    Entertainment: 'bg-purple-100',
    Shopping: 'bg-pink-100',
    Bills: 'bg-red-100',
    Other: 'bg-gray-100',
  };

  return colors[category];
}

// Filter expenses
export function filterExpenses(expenses: Expense[], filters: ExpenseFilters): Expense[] {
  return expenses.filter(expense => {
    // Filter by category
    if (filters.category !== 'All' && expense.category !== filters.category) {
      return false;
    }

    // Filter by date range
    if (filters.dateRange.start) {
      const expenseDate = new Date(expense.date);
      const startDate = new Date(filters.dateRange.start);
      if (expenseDate < startDate) {
        return false;
      }
    }

    if (filters.dateRange.end) {
      const expenseDate = new Date(expense.date);
      const endDate = new Date(filters.dateRange.end);
      if (expenseDate > endDate) {
        return false;
      }
    }

    // Filter by search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesDescription = expense.description.toLowerCase().includes(query);
      const matchesCategory = expense.category.toLowerCase().includes(query);
      const matchesAmount = expense.amount.toString().includes(query);

      if (!matchesDescription && !matchesCategory && !matchesAmount) {
        return false;
      }
    }

    return true;
  });
}

// Calculate expense summary
export function calculateSummary(expenses: Expense[]): ExpenseSummary {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Total spending
  const totalSpending = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Monthly spending
  const monthlyExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
  });
  const monthlySpending = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  // Category breakdown
  const categoryTotals: Record<ExpenseCategory, number> = {
    Food: 0,
    Transportation: 0,
    Entertainment: 0,
    Shopping: 0,
    Bills: 0,
    Other: 0,
  };

  expenses.forEach(expense => {
    categoryTotals[expense.category] += expense.amount;
  });

  const categoryBreakdown = (Object.keys(categoryTotals) as ExpenseCategory[])
    .map(category => ({
      category,
      amount: categoryTotals[category],
      percentage: totalSpending > 0 ? (categoryTotals[category] / totalSpending) * 100 : 0,
    }))
    .filter(item => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  // Top category
  const topCategory = categoryBreakdown.length > 0
    ? { category: categoryBreakdown[0].category, amount: categoryBreakdown[0].amount }
    : null;

  // Recent expenses (last 5)
  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return {
    totalSpending,
    monthlySpending,
    categoryBreakdown,
    recentExpenses,
    topCategory,
  };
}

// Export to CSV
export function exportToCSV(expenses: Expense[]): void {
  const headers = ['Date', 'Category', 'Description', 'Amount'];
  const rows = expenses.map(expense => [
    formatDate(expense.date),
    expense.category,
    expense.description,
    expense.amount.toFixed(2),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `expenses-${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Validate expense form
export function validateExpenseForm(data: {
  date: string;
  amount: string;
  category: string;
  description: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.date) {
    errors.date = 'Date is required';
  }

  if (!data.amount || isNaN(parseFloat(data.amount)) || parseFloat(data.amount) <= 0) {
    errors.amount = 'Please enter a valid amount greater than 0';
  }

  if (!data.category) {
    errors.category = 'Category is required';
  }

  if (!data.description.trim()) {
    errors.description = 'Description is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

// Tailwind CSS class merger utility
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
