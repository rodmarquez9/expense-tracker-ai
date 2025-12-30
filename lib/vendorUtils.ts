import { Expense, ExpenseCategory, VendorSummary } from '@/types';

/**
 * Detects vendor name from expense description using pattern matching
 */
export function detectVendorFromDescription(description: string): string {
  const lowerDesc = description.toLowerCase();

  // Common vendor patterns
  const vendorPatterns: Record<string, RegExp> = {
    'Amazon': /amazon/i,
    'Walmart': /walmart/i,
    'Target': /target/i,
    'Costco': /costco/i,
    'Starbucks': /starbucks/i,
    'McDonald\'s': /mcdonald/i,
    'Subway': /subway/i,
    'Uber': /uber/i,
    'Lyft': /lyft/i,
    'Shell': /shell/i,
    'Chevron': /chevron/i,
    'BP': /\bbp\b/i,
    'Netflix': /netflix/i,
    'Spotify': /spotify/i,
    'Apple': /apple/i,
    'Google': /google/i,
    'Microsoft': /microsoft/i,
    'Verizon': /verizon/i,
    'AT&T': /at&t|att/i,
    'T-Mobile': /t-mobile|tmobile/i,
    'Home Depot': /home\s*depot/i,
    'Lowe\'s': /lowe/i,
    'Best Buy': /best\s*buy/i,
    'Whole Foods': /whole\s*foods/i,
    'Trader Joe\'s': /trader\s*joe/i,
    'Safeway': /safeway/i,
    'Kroger': /kroger/i,
    'CVS': /cvs/i,
    'Walgreens': /walgreens/i,
    'Rite Aid': /rite\s*aid/i,
  };

  // Check for matches
  for (const [vendor, pattern] of Object.entries(vendorPatterns)) {
    if (pattern.test(description)) {
      return vendor;
    }
  }

  // If no pattern matches, try to extract first meaningful word
  const words = description.trim().split(/\s+/);
  if (words.length > 0 && words[0].length > 2) {
    return words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
  }

  return 'Unknown Vendor';
}

/**
 * Calculates vendor summaries from expenses
 */
export function calculateVendorSummaries(expenses: Expense[]): VendorSummary[] {
  if (expenses.length === 0) return [];

  // Group expenses by vendor
  const vendorMap = new Map<string, {
    totalAmount: number;
    transactionCount: number;
    categories: Map<ExpenseCategory, number>;
  }>();

  expenses.forEach(expense => {
    const vendor = detectVendorFromDescription(expense.description);

    if (!vendorMap.has(vendor)) {
      vendorMap.set(vendor, {
        totalAmount: 0,
        transactionCount: 0,
        categories: new Map(),
      });
    }

    const vendorData = vendorMap.get(vendor)!;
    vendorData.totalAmount += expense.amount;
    vendorData.transactionCount += 1;

    const currentCategoryAmount = vendorData.categories.get(expense.category) || 0;
    vendorData.categories.set(expense.category, currentCategoryAmount + expense.amount);
  });

  // Calculate total spending for percentages
  const totalSpending = expenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Convert to VendorSummary array
  const summaries: VendorSummary[] = [];

  vendorMap.forEach((data, vendor) => {
    // Find top category for this vendor
    let topCategory: ExpenseCategory = 'Other';
    let maxCategoryAmount = 0;

    data.categories.forEach((amount, category) => {
      if (amount > maxCategoryAmount) {
        maxCategoryAmount = amount;
        topCategory = category;
      }
    });

    summaries.push({
      vendor,
      totalAmount: data.totalAmount,
      transactionCount: data.transactionCount,
      averageTransaction: data.totalAmount / data.transactionCount,
      percentage: (data.totalAmount / totalSpending) * 100,
      topCategory,
    });
  });

  // Sort by total amount descending
  return summaries.sort((a, b) => b.totalAmount - a.totalAmount);
}

/**
 * Generates sample vendor data for demonstration
 */
export function generateSampleVendorData(): VendorSummary[] {
  return [
    {
      vendor: 'Amazon',
      totalAmount: 1245.50,
      transactionCount: 18,
      averageTransaction: 69.19,
      percentage: 22.5,
      topCategory: 'Shopping',
    },
    {
      vendor: 'Starbucks',
      totalAmount: 892.75,
      transactionCount: 35,
      averageTransaction: 25.51,
      percentage: 16.1,
      topCategory: 'Food',
    },
    {
      vendor: 'Shell',
      totalAmount: 675.00,
      transactionCount: 12,
      averageTransaction: 56.25,
      percentage: 12.2,
      topCategory: 'Transportation',
    },
    {
      vendor: 'Walmart',
      totalAmount: 598.40,
      transactionCount: 8,
      averageTransaction: 74.80,
      percentage: 10.8,
      topCategory: 'Shopping',
    },
    {
      vendor: 'Netflix',
      totalAmount: 450.00,
      transactionCount: 9,
      averageTransaction: 50.00,
      percentage: 8.1,
      topCategory: 'Entertainment',
    },
    {
      vendor: 'Whole Foods',
      totalAmount: 425.30,
      transactionCount: 14,
      averageTransaction: 30.38,
      percentage: 7.7,
      topCategory: 'Food',
    },
    {
      vendor: 'AT&T',
      totalAmount: 390.00,
      transactionCount: 6,
      averageTransaction: 65.00,
      percentage: 7.0,
      topCategory: 'Bills',
    },
    {
      vendor: 'Uber',
      totalAmount: 285.50,
      transactionCount: 11,
      averageTransaction: 25.95,
      percentage: 5.2,
      topCategory: 'Transportation',
    },
    {
      vendor: 'Target',
      totalAmount: 245.75,
      transactionCount: 6,
      averageTransaction: 40.96,
      percentage: 4.4,
      topCategory: 'Shopping',
    },
    {
      vendor: 'Trader Joe\'s',
      totalAmount: 198.80,
      transactionCount: 9,
      averageTransaction: 22.09,
      percentage: 3.6,
      topCategory: 'Food',
    },
    {
      vendor: 'CVS',
      totalAmount: 125.00,
      transactionCount: 4,
      averageTransaction: 31.25,
      percentage: 2.3,
      topCategory: 'Other',
    },
  ];
}
