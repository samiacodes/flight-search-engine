import SearchForm from "../components/SearchForm";
import FlightList from "../components/FlightList";
import Filters from "../components/Filters";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <SearchForm />
        </div>
        <div className="space-y-6 sm:space-y-8">
          <Filters />
          <FlightList />
        </div>
      </div>
    </div>
  );
}
