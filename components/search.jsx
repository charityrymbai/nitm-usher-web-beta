"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchProfessors } from "@/lib/searchFn";
import Link from "next/link";

export default function Search() {
  const [query, setQuery] = useState("");
  const [filtersearchProfessors, setFiltersearchProfessors] = useState([]);

  console.log(filtersearchProfessors);
  useEffect(() => {
    if (query.length === 0) {
      setFiltersearchProfessors([]);
    }
  }, [query]);

  const handleSearch = () => {
    const results = searchProfessors(query);
    setFiltersearchProfessors(
      results.map((professor) => ({
        id: professor.id,
        name: professor.name,
      }))
    );
  };

  return (
    <div className="w-full max-w-md mx-auto mt-10 relative">
      <Input
        type="text"
        placeholder="Search Here ..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch();
        }}
        className="w-full text-black font-bold border-red-900 border-2 p-3 rounded-md shadow-sm focus:ring focus:ring-red-600 focus:scale-105 transition-all duration-300"
      />
      {filtersearchProfessors.length > 0 && (
        <Card className="absolute w-full mt-3 bg-green-950/30 border border-green-900 rounded-md shadow-lg overflow-hidden p-0">
          <ul className="divide-y divide-green-900">
            {filtersearchProfessors.map((result, index) => (
              <li key={index} className="p-2 hover:bg-gray-800 text-black">
                <Link href={`/${result.id}`}>
                  {result.name}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}