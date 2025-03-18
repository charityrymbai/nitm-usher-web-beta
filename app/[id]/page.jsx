'use client'

import { searchById } from "@/lib/searchFn";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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
      <div className="flex justify-center items-center h-screen bg-black">
        <div className="text-center bg-slate-950 w-[90vw] md:w-1/2 p-2 h-1/3 rounded-xl flex justify-center items-center border-2 border-slate-700"> 
          <h1 className="text-xl md:text-4xl text-white font-serif font-bold">404 : Page not found</h1>
        </div>
      </div>
    );
  }

  const { name, office, location } = profDetails;
  const block = office[1];
  const floor = office[2];

  return (
    <div className="size-18 bg-radial-[at_25%_25%] from-gray-500 to-black to-75% h-fit min-h-screen w-full p-10">
      <div className="p-4 sm:p-0 max-w-4xl mx-auto mt-10 space-y-6">
        <Card className="shadow-2xl bg-transparent/10 backdrop-blur-2xl hover:scale-110 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-4xl font-serif text-slate-100 font-bold text-center">{name}</CardTitle>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="shadow-2xl bg-transparent/10 backdrop-blur-2xl hover:scale-110 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-100 font-bold text-center">Block</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-100 font-serif text-5xl font-extrabold">{block}</p>
            </CardContent>
          </Card>

          <Card className="shadow-2xl bg-transparent/10 backdrop-blur-2xl hover:scale-110 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-3xl text-slate-100 font-bold text-center">Floor</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-slate-100 font-serif text-5xl font-extrabold">{floor}</p>
            </CardContent>
          </Card>
        </div>
        <Card className="shadow-2xl text-slate-100 bg-transparent/10 backdrop-blur-2xl hover:scale-105 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-sans font-semibold text-center">
              Click below to find the way to your destination
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center flex flex-col items-center justify-center">
            <button
              className="relative w-[150px] h-[50px] text-[16px] font-bold font-serif bg-transparent border-none text-[#f0f0f0] cursor-pointer z-10 px-[20px] py-[10px] flex items-center justify-center whitespace-nowrap select-none touch-manipulation transition-all duration-400 group"
              onClick={() => {
                window.open(gMapLinks[block], "_blank");
              }}
            >
              Google map
              <div className="absolute inset-0 z-[-1] bg-[#28282d] rounded-[10px] transition-all duration-400 group-hover:translate-x-[5%] group-hover:translate-y-[20%] group-hover:w-[110%] group-hover:h-[110%]"></div>
              <div className="absolute bottom-0 right-0 z-[-1] w-[35px] h-[35px] bg-[#ffffff15] backdrop-blur-[5px] rounded-[50px] translate-x-[10px] translate-y-[10px] transition-all duration-400 group-hover:rounded-[10px] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:w-full group-hover:h-full"></div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}