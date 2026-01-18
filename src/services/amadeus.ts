// Mock flight data service - Amadeus API simulation
export interface Flight {
  id: string;
  airline: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  currency: string;
  stops: number;
  aircraft: string;
}

// Mock flight data
const MOCK_FLIGHTS: Flight[] = [
  {
    id: 'FL001',
    airline: 'Sky Airlines',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2026-01-18T08:00:00',
    arrivalTime: '2026-01-18T11:30:00',
    duration: '5h 30m',
    price: 299,
    currency: 'USD',
    stops: 0,
    aircraft: 'Boeing 737'
  },
  {
    id: 'FL002',
    airline: 'Ocean Airways',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2026-01-18T14:15:00',
    arrivalTime: '2026-01-18T17:45:00',
    duration: '5h 30m',
    price: 249,
    currency: 'USD',
    stops: 0,
    aircraft: 'Airbus A320'
  },
  {
    id: 'FL003',
    airline: 'Global Connect',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2026-01-18T22:30:00',
    arrivalTime: '2026-01-19T02:00:00',
    duration: '5h 30m',
    price: 199,
    currency: 'USD',
    stops: 0,
    aircraft: 'Boeing 787'
  },
  {
    id: 'FL004',
    airline: 'Budget Flyers',
    origin: 'JFK',
    destination: 'LAX',
    departureTime: '2026-01-18T10:45:00',
    arrivalTime: '2026-01-18T18:15:00',
    duration: '7h 30m',
    price: 159,
    currency: 'USD',
    stops: 1,
    aircraft: 'Airbus A321'
  }
];

/**
 * Mock function to fetch flights
 * Simulates API call to Amadeus flight search endpoint
 * @param origin - Origin airport code
 * @param destination - Destination airport code
 * @param date - Travel date
 * @returns Promise resolving to array of flights
 */
export async function fetchFlights(
  origin: string,
  destination: string,
  date: string
): Promise<Flight[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return mock flights (in real implementation, this would call actual API)
  return Promise.resolve(MOCK_FLIGHTS);
}