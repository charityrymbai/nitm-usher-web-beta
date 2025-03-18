"use client"

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { searchProfessors } from "@/lib/searchFn";
import Link from "next/link";

export default function Home() {
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
        placeholder="Search..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          handleSearch();
        }}
        className="w-full border border-gray-300 p-2 rounded-md shadow-sm focus:ring focus:ring-blue-300"
      />
      {filtersearchProfessors.length > 0 && (
        <Card className="absolute w-full mt-2 bg-white border border-gray-200 rounded-md shadow-lg overflow-hidden">
          <ul className="divide-y divide-gray-200">
            {filtersearchProfessors.map((result, index) => (
              <li key={index} className="p-2 hover:bg-gray-100 text-black">
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