# Budget Directory Frontend

A full-stack budget management application built with Angular 19, featuring AG Grid for data display, pagination, filtering, and comprehensive testing.

## Features

- **Budget Directory**: Browse and manage budgets with detailed information
- **AG Grid Integration**: Advanced data grid with sorting, filtering, and pagination
- **Responsive Design**: Bootstrap-based UI with mobile-friendly layout
- **Testing**: Comprehensive unit tests for WebService functionality
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

The application includes comprehensive testing:

```bash
ng test
```

**TestWSComponent** provides automated testing for:
- Budget data fetching
- Pagination functionality
- Individual budget retrieval
- API endpoint validation

## Backend Integration

This frontend connects to a Flask backend running on `http://localhost:5001`. Make sure the backend server is running before testing the application.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
