# Budget Directory Frontend

A full-stack budget management application built with Angular 18.2.13, featuring AG Grid for data display, pagination, filtering, and comprehensive testing.

## Features

- **Budget Directory**: Browse and manage budgets with detailed information
- **AG Grid Integration**: Advanced data grid with sorting, filtering, and pagination
- **Responsive Design**: Bootstrap-based UI with mobile-friendly layout
- **Testing**: Comprehensive WebService testing functionality
- **Navigation**: Multi-page application with dedicated Grid view

## Requirements

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- [Angular CLI](https://angular.io/cli)

To install Angular CLI globally, run:

```bash
npm install -g @angular/cli
```

## Development server

First, install project dependencies:

```bash
npm install
```

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Documentation

To generate and serve the project documentation:

```bash
npm run compodoc
```

This will:
- Generate documentation from your TypeScript files
- Serve it on a local server (usually `http://localhost:8080`)
- Watch for changes and automatically update the documentation

The documentation includes:
- All components and services
- Route definitions
- Dependencies analysis
- Code coverage information

## Project Structure

### Key Components
- **AppComponent**: Main application component
- **GridComponent**: AG Grid implementation with pagination and filtering
- **BudgetComponent**: Individual budget details view
- **BudgetsComponent**: Paginated budget cards view
- **TestWSComponent**: WebService testing component
- **WebService**: HTTP service for API communication

### AG Grid Features
- Column filtering and floating filters
- Pagination with configurable page sizes (10, 25, 50)
- Custom theming with CSS variables
- Data binding to budget information
- Savings and income data display


## Testing

The application includes a comprehensive testing component that validates WebService functionality. To access the testing interface:

1. **Navigate to the test page**: Go to `http://localhost:4200/test` in your browser
2. **View test results**: The page will display results for:
   - Budget page fetching
   - Pagination functionality
   - Individual budget retrieval
   - Review fetching
   - Review posting

The test component automatically runs all tests when the page loads and displays PASS/FAIL results for each test case.

## Backend Integration

This frontend connects to a Flask backend running on `http://localhost:5001`. Make sure the backend server is running before testing the application.

## Database Setup

### Import Budget Data

To import the budget data into MongoDB:

1. **Use the budget data file**
   ```bash
   # The budget data is located in: src/assets/budgets.json
   ```

2. **Import into MongoDB**
   ```bash
   mongoimport --db budgetDB --collection budgets --file "src/assets/budgets.json" --jsonArray
   ```

3. **Verify the import**
   ```bash
   mongosh
   use budgetDB
   db.budgets.find().pretty()
   ```

**Note**: The budget data file contains complete budget records with reviews and location data for the full application functionality.