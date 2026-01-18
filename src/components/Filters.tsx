'use client';

import { useState, useEffect } from 'react';
import { useFlights } from '../hooks/useFlights';

export default function Filters() {
  const { filters, setFilters, flights } = useFlights();
  const [stops, setStops] = useState({
    nonstop: filters.maxStops === 0 || false,
    oneStop: filters.maxStops === 1 || false,
    twoPlusStops: filters.maxStops === 2 || false
  });
  const [priceRange, setPriceRange] = useState({
    min: filters.maxPrice ? Math.max(0, filters.maxPrice - 200) : 0,
    max: filters.maxPrice || 1000
  });
  const [availableAirlines, setAvailableAirlines] = useState<{[key: string]: boolean}>({});

  // Extract unique airlines from flights
  useEffect(() => {
    if (flights.length > 0) {
      const airlines = flights.reduce((acc, flight) => {
        acc[flight.airline] = filters.preferredAirlines?.includes(flight.airline) || false;
        return acc;
      }, {} as {[key: string]: boolean});
      
      setAvailableAirlines(airlines);
    }
  }, [flights, filters.preferredAirlines]);

  // Handle stops filter change
  const handleStopsChange = (stopType: 'nonstop' | 'oneStop' | 'twoPlusStops') => {
    const newStops = { ...stops, [stopType]: !stops[stopType] };
    setStops(newStops);

    // Calculate maxStops based on selections
    let maxStopsValue: number | undefined;
    if (newStops.nonstop && !newStops.oneStop && !newStops.twoPlusStops) {
      maxStopsValue = 0;
    } else if ((newStops.nonstop || newStops.oneStop) && !newStops.twoPlusStops) {
      maxStopsValue = 1;
    } else if (newStops.nonstop || newStops.oneStop || newStops.twoPlusStops) {
      maxStopsValue = 2;
    }

    const newFilters = {
      ...filters,
      maxStops: maxStopsValue
    };
    setFilters(newFilters);
  };

  // Handle price range change
  const handlePriceChange = (type: 'min' | 'max', value: string) => {
    const numValue = parseInt(value) || 0;
    const newPriceRange = { ...priceRange, [type]: numValue };
    setPriceRange(newPriceRange);

    // Set maxPrice filter (using the lower of min/max to avoid invalid ranges)
    const effectiveMaxPrice = Math.min(newPriceRange.max, newPriceRange.min > 0 ? Infinity : newPriceRange.max);
    const newFilters = {
      ...filters,
      maxPrice: newPriceRange.max
    };
    setFilters(newFilters);
  };

  // Handle airline filter change
  const handleAirlineChange = (airline: string) => {
    const newAirlines = { ...availableAirlines, [airline]: !availableAirlines[airline] };
    setAvailableAirlines(newAirlines);

    // Get selected airlines
    const selectedAirlines = Object.entries(newAirlines)
      .filter(([_, isSelected]) => isSelected)
      .map(([airlineName, _]) => airlineName);

    const newFilters = {
      ...filters,
      preferredAirlines: selectedAirlines.length > 0 ? selectedAirlines : undefined
    };
    setFilters(newFilters);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Filters</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 sm:gap-8">
        {/* Stops Filter */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Stops</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={stops.nonstop}
                onChange={() => handleStopsChange('nonstop')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Non-stop</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={stops.oneStop}
                onChange={() => handleStopsChange('oneStop')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">1 Stop</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={stops.twoPlusStops}
                onChange={() => handleStopsChange('twoPlusStops')}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">2+ Stops</span>
            </label>
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Price Range</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1">Max Price</label>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => handlePriceChange('max', e.target.value)}
                min="0"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Airline Filter */}
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white mb-3">Airlines</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
            {Object.keys(availableAirlines).length > 0 ? (
              Object.keys(availableAirlines).map((airline) => (
                <label key={airline} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={availableAirlines[airline]}
                    onChange={() => handleAirlineChange(airline)}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-gray-700 dark:text-gray-300">{airline}</span>
                </label>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-sm">Search for flights to see airlines</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}