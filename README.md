# Data Visualization Dashboard

A futuristic, interactive data visualization dashboard with dark/light mode support, built with React, Node.js, Express, and MongoDB.

## Features

- ✅ **Complete Filter System**: End Year, Topics, Sector, Region, PEST, Source, SWOT, Country, City
- ✅ **Interactive Visualizations**: 
  - Intensity by Topic (Bar Chart)
  - Likelihood by Region (Line Chart)
  - Relevance by Sector (Pie Chart)
  - Yearly Trends (Area Chart)
  - Average Metrics by Country (Bar Chart)
  - Relevance by City (Line Chart)
  - Data Distribution by Topics (Pie Chart)
  - Intensity by Region (Area Chart)
- ✅ **Dark/Light Mode**: Full theme support with smooth transitions
- ✅ **Futuristic UI**: Modern design with gradient backgrounds and glassmorphism effects
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **Real-time Filtering**: Dynamic data filtering with MongoDB queries
- ✅ **Statistics Cards**: Overview cards showing key metrics

## Tech Stack

### Backend
- Node.js with Express
- MongoDB with Mongoose
- RESTful API

### Frontend
- React 19
- Vite
- Recharts for visualizations
- TailwindCSS for styling
- Framer Motion for animations
- Lucide React for icons

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd DataVisulization
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd visual-dashboard
   npm install
   ```

4. **Configure environment variables**

   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   PORT=5000
   ```

   Create a `.env` file in `visual-dashboard` directory:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Make sure MongoDB is running** and your data is already uploaded to MongoDB (collection name should be `data`).

## Running the Application

1. **Start the backend server** (from root directory):
   ```bash
   npm start
   ```
   The server will run on `http://localhost:5000`

2. **Start the frontend development server** (from visual-dashboard directory):
   ```bash
   cd visual-dashboard
   npm run dev
   ```
   The frontend will run on `http://localhost:5173` (or another port if 5173 is busy)

3. **Open your browser** and navigate to the frontend URL (usually `http://localhost:5173`)

## Project Structure

```
DataVisulization/
├── connectDB/
│   └── db.js              # MongoDB connection
├── controller/
│   └── visualRouteHandler.js  # API route handlers
├── models/
│   └── visualModel.js     # MongoDB schema
├── routes/
│   └── visualRoutes.js    # Express routes
├── server.js              # Express server setup
├── package.json
└── visual-dashboard/      # React frontend
    ├── src/
    │   ├── api/
    │   │   └── visualApi.js    # API client
    │   ├── components/
    │   │   ├── Charts/         # Chart components
    │   │   ├── Layouts/        # Layout components
    │   │   ├── Dashboard.jsx
    │   │   └── Filters.jsx
    │   ├── context/
    │   │   └── ThemeContext.jsx # Theme management
    │   └── App.jsx
    └── package.json
```

## Development

### Build for production

**Frontend:**
```bash
cd visual-dashboard
npm run dev
```

The built files will be in `visual-dashboard/dist`

### Backend scripts
- `npm start` - Start server with nodemon
