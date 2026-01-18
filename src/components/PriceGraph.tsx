'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Flight {
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

interface PriceGraphProps {
  flights: Flight[];
}

const PriceGraph: React.FC<PriceGraphProps> = ({ flights }) => {
  // Prepare data for the chart
  const chartData = flights.map((flight, index) => ({
    name: flight.airline,
    price: flight.price,
    index: index + 1,
  }));

  if (flights.length === 0) {
    return null; // Don't render if no flights
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md h-full">
      <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white mb-4">Flight Prices</h3>
      <div className="h-64 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 60,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={60}
              tick={{ fontSize: 10 }}
            />
            <YAxis 
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip 
              formatter={(value) => [`$${value}`, 'Price']}
              labelFormatter={(label) => `Airline: ${label}`}
            />
            <Bar 
              dataKey="price" 
              fill="#4f46e5" 
              name="Price"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center">
        Showing prices for {flights.length} flight{flights.length !== 1 ? 's' : ''}
      </p>
    </div>
  );
};

export default PriceGraph;