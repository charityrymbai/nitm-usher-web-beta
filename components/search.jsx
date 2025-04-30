"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { searchPlaces } from "@/lib/searchFn";
import Link from "next/link";
import { useDebounce } from "@/lib/hooks"; // We'll create this hook

export default function Search() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Debounce the search query to avoid making too many API calls
  const debouncedQuery = useDebounce(query, 300);

  // Clear results when query is empty
  useEffect(() => {
    if (query.length === 0) {
      setSearchResults([]);
    }
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length === 0) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchPlaces(debouncedQuery);
        setSearchResults(
          results.map((place) => ({
            id: place.id,
            name: place.name,
            location: place.location
          }))
        );
      } catch (error) {
        console.error("Search error:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery]);

  return (
    <div className="w-full max-w-md mx-auto mt-10 relative">
      <Input
        type="text"
        placeholder="Search places..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full text-black font-bold border-red-900 border-2 p-3 rounded-md shadow-sm focus:ring focus:ring-red-200 focus:scale-105 transition-all duration-300"
      />
      
      {isLoading && (
        <div className="absolute right-3 top-2">
          <div className="animate-spin h-5 w-5 border-2 border-red-900 rounded-full border-t-transparent"></div>
        </div>
      )}
      
      {searchResults.length > 0 && (
        <div className="absolute w-full mt-3 bg-green-950/30 border border-green-900 rounded-md shadow-lg overflow-hidden p-0 z-50">
          <ul className="divide-y divide-green-950/30">
            {searchResults.map((result) => (
              <li key={result.id} className="p-2 hover:bg-green-800/30 text-black">
                <Link href={`/${result.id}`} className="block">
                  <div className="text-lg font-medium">{result.name}</div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}