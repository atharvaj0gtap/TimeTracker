# Time Tracker

A simple time tracking application for managing contractor hours with automatic invoice generation based on bi-weekly pay periods.

## Features

- **Track Work Hours**: Log tasks with date, description, and hours worked
- **Automatic Invoice Numbers**: Invoices are automatically assigned based on pay periods (format: `INV-YYYY-MM-DD` where the date is the payment date)
- **Inline Editing**: Click any cell to edit entries directly in the table
- **Auto-Save**: Changes are saved automatically when you click outside the row or press Enter
- **Pay Period Preview**: See which pay period a date falls into before adding an entry
- **Excel Storage**: All data is stored in a local `Tracker.xlsx` file

## Pay Period System

- Pay periods are **2-week blocks** running Sunday to Saturday
- Payment occurs on the **Friday** following the 2nd Monday after the period ends
- Example: Work done Nov 9-22 → Invoice `INV-2025-11-28` (paid Nov 28)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

1. Clone or download this project
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App

**Option 1: Use the desktop shortcut**
- Double-click `Time Tracker` on your desktop (if you created the shortcut)

**Option 2: Run manually**
```bash
npm run dev:full
```
This starts both the backend server and the frontend.

**Option 3: Run separately**
```bash
# Terminal 1 - Start the backend server
npm run server

# Terminal 2 - Start the frontend
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

## Usage

### Adding Entries
1. Fill in the Task, Description, Date, and Hours fields
2. The Pay Period preview shows which invoice the entry will be assigned to
3. Click "Add Entry" to save

### Editing Entries
- Click any cell in the table to edit that row
- Press **Enter** to save, or click anywhere outside the row
- Press **Escape** to cancel without saving

### Deleting Entries
- Hover over a row and click the trash icon to delete

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS
- **Backend**: Express.js
- **Storage**: Excel file (xlsx)

## Project Structure

```
TimeTracker/
├── src/
│   ├── App.jsx          # Main React component
│   ├── main.jsx         # React entry point
│   └── index.css        # Tailwind imports
├── server/
│   └── index.js         # Express backend API
├── Tracker.xlsx         # Data storage (created on first run)
├── start-timetracker.bat # Desktop launcher script
└── package.json
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/entries` | Get all time entries |
| POST | `/api/entries` | Add a new entry |
| PUT | `/api/entries/:index` | Update an entry |
| DELETE | `/api/entries/:index` | Delete an entry |
