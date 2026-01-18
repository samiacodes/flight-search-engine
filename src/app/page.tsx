import SearchForm from "../components/SearchForm";
import FlightList from "../components/FlightList";
import Filters from "../components/Filters";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <SearchForm />
        <Filters />
        <FlightList />
      </div>
    </div>
  );
}
