'use client'

import { searchById } from "@/lib/searchFn";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { id } = useParams();

  const profDetails = searchById(id);

  const gMapLinks = {
    A: "https://maps.app.goo.gl/Lnb2VS7KyW9ZQv6h7",
    C: "https://maps.app.goo.gl/unw84ZyuV7HRR4bV8",
    D: "https://maps.app.goo.gl/ZLg4RYAP3L7bpkyk7",
  }

  if (!profDetails) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl font-bold">Professor not found</h1>
      </div>
    );
  }

  const { name, office, location } = profDetails;
  const block = office[1];
  const floor = office[2];

  return (
    <div className="p-4 sm:p-0 max-w-4xl mx-auto mt-10 space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">{name}</CardTitle>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Block</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-extrabold">{block}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Floor</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-5xl font-extrabold">{floor}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">
              Click below to find the way to your destination
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              variant="destructive"
              onClick={() => {
                window.open(gMapLinks[block], "_blank");
              }}
            >Google map</Button>
          </CardContent>
        </Card>
    </div>
  );
}