export type ExpenseCategory =
  | 'Food'
  | 'Transportation'
  | 'Entertainment'
  | 'Shopping'
  | 'Bills'
  | 'Other';

export interface Expense {
  id: string;
  date: string; // ISO date string
  amount: number;
  category: ExpenseCategory;
  description: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface ExpenseFormData {
  date: string;
  amount: string;
  category: ExpenseCategory;
  description: string;
}

export interface DateRange {
  start: string | null;
  end: string | null;
}

export interface ExpenseFilters {
  category: ExpenseCategory | 'All';
  dateRange: DateRange;
  searchQuery: string;
}

export interface ExpenseSummary {
  totalSpending: number;
  monthlySpending: number;
  categoryBreakdown: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
  }[];
  recentExpenses: Expense[];
  topCategory: {
    category: ExpenseCategory;
    amount: number;
  } | null;
}

export interface VendorSummary {
  vendor: string;
  totalAmount: number;
  transactionCount: number;
  averageTransaction: number;
  percentage: number;
  topCategory: ExpenseCategory;
}
