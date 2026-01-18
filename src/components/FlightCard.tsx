import { Flight } from '../services/amadeus';

interface FlightCardProps {
  flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
  // Format departure time to be more readable
  const formatTime = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Format date to be more readable
  const formatDate = (dateTimeString: string) => {
    return new Date(dateTimeString).toLocaleDateString([], { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Airline and Route */}
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            {flight.airline}
          </h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {flight.origin}
            </span>
            <span className="text-gray-400">→</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {flight.destination}
            </span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {formatDate(flight.departureTime)}
          </p>
        </div>

        {/* Flight Details */}
        <div className="flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">Dep:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatTime(flight.departureTime)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">Arr:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {formatTime(flight.arrivalTime)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-gray-500 dark:text-gray-400">Dur:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {flight.duration}
            </span>
          </div>
        </div>

        {/* Stops and Price */}
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              flight.stops === 0 
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
            }`}>
              {flight.stops === 0 ? 'Nonstop' : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {flight.currency} {flight.price}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              per person
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}