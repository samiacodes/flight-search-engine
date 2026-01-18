# Flight Search Web App

A modern, responsive flight search application built with React and Next.js. The app features real-time flight searching, filtering, and visualization with interactive price graphs.

## Tech Stack

- **Next.js 16.1.3** - React framework for production
- **React 19.2.3** - Frontend library
- **TypeScript** - Static type checking
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Charting library for data visualization
- **React Hooks** - State management

## Features

- **Flight Search Form** - Search for flights by origin, destination, and travel date
- **Interactive Flight List** - Browse and compare flights with detailed information
- **Live Filtering System** - Filter flights by stops, price range, and airlines in real-time
- **Price Visualization** - Interactive bar chart showing flight prices across airlines
- **Responsive Design** - Fully responsive layout that works on mobile, tablet, and desktop
- **Dark Mode Support** - Automatic dark/light mode based on system preference
- **Loading & Error States** - Comprehensive UI states for better user experience
- **Real-time Updates** - Price graph and flight list update simultaneously with filters

## Installation & Running

1. **Clone the repository or navigate to the project directory**
   ```bash
   cd flight-search
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000) to view the application

## Usage

1. Enter origin and destination airports (e.g., JFK, LAX)
2. Select a travel date
3. Click "Search Flights" to load available flights
4. Use the filters to refine your search:
   - Stops: Filter by non-stop, 1 stop, or 2+ stops
   - Price Range: Set maximum price
   - Airlines: Select preferred airlines
5. View the flight list and corresponding price graph
6. The price graph updates in real-time as you apply filters

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/             # Reusable UI components
│   ├── FlightCard.tsx      # Individual flight display
│   ├── FlightList.tsx      # Flight list container
│   ├── PriceGraph.tsx      # Price visualization chart
│   ├── SearchForm.tsx      # Flight search form
│   └── Filters.tsx         # Filter controls
├── hooks/                  # Custom React hooks
│   └── useFlights.ts       # Flight data management
└── services/               # External service integrations
    └── amadeus.ts          # Mock flight data service
```

## Key Functionality

- **State Management**: Custom `useFlights` hook manages flight data, filters, and loading states
- **Data Flow**: Single source of truth for filtered flights shared between list and graph
- **Responsive Design**: Mobile-first approach with breakpoints for all screen sizes
- **Performance**: Optimized rendering and efficient filtering algorithms
- **Accessibility**: Semantic HTML and proper ARIA attributes

## UX Highlights

- Clean, intuitive interface with consistent spacing and typography
- Smooth transitions and hover effects for better interactivity
- Real-time synchronization between flight list and price graph
- Comprehensive loading, empty, and error state handling
- Visual indicators for flight stops (non-stop vs connecting)
- Dark mode support for comfortable viewing in any lighting