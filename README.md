# Expense Tracker

A modern, professional expense tracking web application built with Next.js 14, TypeScript, and Tailwind CSS. Track your personal finances with an intuitive interface, powerful filtering, and visual analytics.

![Expense Tracker](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=flat-square&logo=tailwind-css)

## Features

### Core Functionality
- **Add Expenses**: Create expenses with date, amount, category, and description
- **Edit & Delete**: Full CRUD operations for expense management
- **Smart Filtering**: Filter by category, date range, and search text
- **Data Persistence**: All data stored in browser localStorage
- **CSV Export**: Export filtered expenses to CSV format

### Dashboard Analytics
- **Total Spending**: View all-time spending totals
- **Monthly Summary**: Current month spending at a glance
- **Top Category**: See which category you spend most on
- **Category Breakdown**: Visual bar charts showing spending by category
- **Recent Expenses**: Quick view of your latest 5 expenses

### Categories
- Food
- Transportation
- Entertainment
- Shopping
- Bills
- Other

### Design Features
- Clean, modern interface with green color palette
- Fully responsive (mobile, tablet, desktop)
- Loading states and animations
- Form validation with error messages
- Modal dialogs for add/edit operations
- Visual feedback for user actions

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd expense-tracker
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open your browser and visit:
```
http://localhost:3000
```

### Building for Production

Build the optimized production bundle:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Usage Guide

### Adding an Expense

1. Click the **"Add Expense"** button in the header
2. Fill in the form:
   - **Date**: Select the expense date (defaults to today)
   - **Amount**: Enter the expense amount (e.g., 25.50)
   - **Category**: Choose from the dropdown
   - **Description**: Add details about the expense
3. Click **"Add Expense"** to save

### Viewing Expenses

#### Dashboard Tab
- View summary cards showing:
  - Total spending across all expenses
  - Current month spending
  - Top spending category
  - Total number of expense categories
- See spending breakdown by category with visual bar charts
- Quick view of 5 most recent expenses

#### All Expenses Tab
- See complete list of all expenses
- Each expense shows:
  - Category badge with color coding
  - Date of expense
  - Description
  - Amount in USD currency format
  - Edit and Delete buttons

### Filtering Expenses

In the **All Expenses** tab, use the filter panel to:

1. **Search**: Enter keywords to search descriptions, categories, or amounts
2. **Category Filter**: Select a specific category or "All"
3. **Date Range**: Filter by start date and/or end date
4. **Reset Filters**: Click the reset button to clear all filters

### Editing an Expense

1. Click the **"Edit"** button on any expense
2. Modify the fields in the modal form
3. Click **"Update Expense"** to save changes

### Deleting an Expense

1. Click the **"Delete"** button on any expense
2. Confirm the deletion in the popup dialog
3. The expense will be permanently removed

### Exporting Data

1. Navigate to the **All Expenses** tab
2. Apply any filters you want (optional)
3. Click **"Export CSV"** in the header
4. A CSV file will download with your filtered expenses

The CSV includes: Date, Category, Description, and Amount

## Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks (useState, useEffect)
- **Data Storage**: Browser localStorage
- **Icons**: SVG icons (inline)
- **Form Handling**: Controlled components with validation

## Project Structure

```
expense-tracker/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Main expense tracker page
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Card.tsx
│   │   ├── Modal.tsx
│   │   └── Loading.tsx
│   ├── expenses/            # Expense-specific components
│   │   ├── ExpenseForm.tsx
│   │   ├── ExpenseList.tsx
│   │   └── ExpenseFilters.tsx
│   └── dashboard/           # Dashboard components
│       ├── SummaryCards.tsx
│       ├── CategoryChart.tsx
│       └── RecentExpenses.tsx
├── lib/
│   ├── storage.ts           # localStorage utilities
│   └── utils.ts             # Helper functions
├── types/
│   └── index.ts             # TypeScript type definitions
└── public/                  # Static assets
```

## Key Features Explained

### Data Persistence
All expenses are stored in browser localStorage under the key `expense-tracker-data`. Data persists across page refreshes and browser sessions. To clear data, use your browser's developer tools to clear localStorage.

### Form Validation
The expense form validates:
- Date is required
- Amount must be a positive number
- Category must be selected
- Description must not be empty

Errors are displayed inline below each field.

### Currency Formatting
All amounts are displayed in USD format using JavaScript's `Intl.NumberFormat` API (e.g., $1,234.56).

### Date Handling
Dates are stored as ISO 8601 strings and displayed in a user-friendly format (e.g., "Jan 5, 2025").

### Category Colors
Each category has a unique color scheme:
- **Food**: Orange
- **Transportation**: Blue
- **Entertainment**: Purple
- **Shopping**: Pink
- **Bills**: Red
- **Other**: Gray

### Responsive Design
The application is fully responsive with breakpoints for:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Adding Sample Data

To test the application with sample data, open the browser console and run:

```javascript
// Add sample expenses
const sampleExpenses = [
  { date: new Date().toISOString(), amount: 45.50, category: 'Food', description: 'Grocery shopping at Whole Foods' },
  { date: new Date().toISOString(), amount: 12.00, category: 'Transportation', description: 'Uber to work' },
  { date: new Date().toISOString(), amount: 89.99, category: 'Entertainment', description: 'Concert tickets' },
  { date: new Date().toISOString(), amount: 150.00, category: 'Shopping', description: 'New running shoes' },
  { date: new Date().toISOString(), amount: 120.00, category: 'Bills', description: 'Internet bill' },
];

// Add to localStorage
const storage = { addExpense: (exp) => {
  const expenses = JSON.parse(localStorage.getItem('expense-tracker-data') || '[]');
  const newExp = { ...exp, id: crypto.randomUUID(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };
  expenses.push(newExp);
  localStorage.setItem('expense-tracker-data', JSON.stringify(expenses));
}};

sampleExpenses.forEach(exp => storage.addExpense(exp));
location.reload(); // Refresh to see changes
```

## Future Enhancements

Potential features for future versions:
- Backend API integration
- User authentication
- Multiple currency support
- Budget tracking and alerts
- Recurring expenses
- Receipt image uploads
- Data visualization charts (pie charts, line graphs)
- Export to PDF
- Dark mode
- Multi-user support

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or contributions, please open an issue on the project repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
