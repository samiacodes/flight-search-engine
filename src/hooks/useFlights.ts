import { useState, useEffect } from 'react';
import { fetchFlights, Flight } from '../services/amadeus';

// Filter criteria for flight search
export interface FlightFilters {
  maxPrice?: number;
  maxStops?: number;
  preferredAirlines?: string[];
  departureTimeRange?: {
    start: string; // HH:mm format
    end: string;   // HH:mm format
  };
}

interface UseFlightsReturn {
  flights: Flight[];
  filteredFlights: Flight[];
  filters: FlightFilters;
  loading: boolean;
  error: string | null;
  loadFlights: (origin: string, destination: string, date: string) => Promise<void>;
  setFilters: (filters: FlightFilters) => void;
  clearFilters: () => void;
}

/**
 * Custom hook for flight search functionality
 * Manages flight data, filtering, and loading states
 */
export function useFlights(): UseFlightsReturn {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<Flight[]>([]);
  const [filters, setFiltersState] = useState<FlightFilters>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Load flights from the API service
   */
  const loadFlights = async (origin: string, destination: string, date: string): Promise<void> => {
    setLoading(true);
    setError(null);
    
    try {
      const flightData = await fetchFlights(origin, destination, date);
      setFlights(flightData);
      setFilteredFlights(flightData); // Initially show all flights
    } catch (err) {
      setError('Failed to load flights. Please try again.');
      console.error('Flight loading error:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply filters to the flight data
   */
  const applyFilters = (flightsToFilter: Flight[], currentFilters: FlightFilters): Flight[] => {
    return flightsToFilter.filter(flight => {
      // Price filter
      if (currentFilters.maxPrice !== undefined && flight.price > currentFilters.maxPrice) {
        return false;
      }

      // Stops filter
      if (currentFilters.maxStops !== undefined && flight.stops > currentFilters.maxStops) {
        return false;
      }

      // Preferred airlines filter
      if (currentFilters.preferredAirlines?.length && 
          !currentFilters.preferredAirlines.includes(flight.airline)) {
        return false;
      }

      // Departure time range filter
      if (currentFilters.departureTimeRange) {
        const flightDepartureHour = new Date(flight.departureTime).getHours();
        const flightDepartureMinute = new Date(flight.departureTime).getMinutes();
        const flightTimeInMinutes = flightDepartureHour * 60 + flightDepartureMinute;
        
        const [startHour, startMinute] = currentFilters.departureTimeRange.start.split(':').map(Number);
        const [endHour, endMinute] = currentFilters.departureTimeRange.end.split(':').map(Number);
        const startTimeInMinutes = startHour * 60 + startMinute;
        const endTimeInMinutes = endHour * 60 + endMinute;
        
        if (flightTimeInMinutes < startTimeInMinutes || flightTimeInMinutes > endTimeInMinutes) {
          return false;
        }
      }

      return true;
    });
  };

  /**
   * Update filters and reapply to current flights
   */
  const updateFilters = (newFilters: FlightFilters) => {
    setFiltersState(newFilters);
    setFilteredFlights(applyFilters(flights, newFilters));
  };

  /**
   * Clear all filters
   */
  const clearFilters = () => {
    const emptyFilters: FlightFilters = {};
    setFiltersState(emptyFilters);
    setFilteredFlights(flights);
  };

  // Re-apply filters when flights change (e.g., new search)
  useEffect(() => {
    setFilteredFlights(applyFilters(flights, filters));
  }, [flights]);

  return {
    flights,
    filteredFlights,
    filters,
    loading,
    error,
    loadFlights,
    setFilters: updateFilters,
    clearFilters
  };
}