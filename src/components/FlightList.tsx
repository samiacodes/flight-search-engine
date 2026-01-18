'use client';

import { useFlights } from '../hooks/useFlights';
import FlightCard from './FlightCard';
import PriceGraph from './PriceGraph';

export default function FlightList() {
  const { filteredFlights, loading, error } = useFlights();

  // Error state
  if (error) {
    return (
      <div className="py-12 text-center">
        <div className="text-red-500 dark:text-red-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            Failed to load flights
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Please try again.
          </p>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="py-12 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">
          Searching for flights...
        </p>
      </div>
    );
  }

  // Empty state
  if (filteredFlights.length === 0) {
    return (
      <div className="py-12 text-center">
        <div className="text-gray-400 dark:text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
            No flights found
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Try adjusting your search criteria
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Available Flights
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {filteredFlights.length} flight{filteredFlights.length !== 1 ? 's' : ''} found
        </p>
      </div>
      
      {/* Responsive layout: side by side on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-2/3">
          <div className="space-y-4">
            {filteredFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="h-full">
            <PriceGraph flights={filteredFlights} />
          </div>
        </div>
      </div>
    </div>
  );
}