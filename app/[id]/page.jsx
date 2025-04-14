'use client'
import { searchById } from "@/lib/searchFn";
import { useParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react"
import Image from "next/image"

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
  const [dpr, setDpr] = useState(1.5)
  const isDarkMode = "dark"
  return (
    <div className="relative w-full h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={"/bg2.png"}
            alt="Background"
            fill
            className={`object-cover opacity-40 mix-blend-multiply`}
          />
        </div>
      </div>
      <div className="absolute inset-0 z-10 " />
      <div className="relative z-20 h-full p-10 text-center font-bold text-2xl text-yellow-900">
        <Card className="shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:scale-110 transition-all duration-300 mb-6">
            <CardTitle className="text-[8vw] md:text-2xl font-serif text-slate-900 font-bold text-center">{name}</CardTitle>
        </Card>
        <div className="w-full mt-4">
          <Card className="shadow-2xl flex flex-col justify-center items-center bg-transparent/10 backdrop-blur-2xl hover:scale-110 transition-all duration-300">
            <Image
              src={"/block.svg"}
              alt="Block"
              width={200}
              height={200}
              className="object-cover "
            />
              <div className="text-[8vw] md:text-3xl text-slate-900 font-mono font-bold text-center">Block : {block}</div>
              <div className="text-[8vw] md:text-3xl text-slate-900 font-mono font-bold text-center">Floor : {floor}</div>
          </Card>
        </div>

        <Card className="shadow-2xl bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 hover:scale-110 transition-all duration-300 mt-6">
            <CardTitle className="text-[5vw] md:text-xl font-mono font-semibold text-center">
              Click below to find the way to your destination
            </CardTitle>
          <CardContent className="text-center flex flex-col items-center justify-center">
            <button
              className="relative w-fit h-[50px] text-[4vw] md:text-lg font-bold font-mono bg-transparent border-none text-[#f0f0f0] cursor-pointer z-10 px-[20px] py-[10px] flex items-center justify-center whitespace-nowrap select-none touch-manipulation transition-all duration-400 group"
              onClick={() => {
                window.open(gMapLinks[block], "_blank");
              }}
            >
              START NAVIGATION
              <div className="absolute inset-0 z-[-1] bg-[#28282d] rounded-[10px] transition-all duration-400 group-hover:translate-x-[5%] group-hover:translate-y-[20%] group-hover:w-[110%] group-hover:h-[110%]"></div>
              <div className="absolute bottom-0 right-0 z-[-1] w-[35px] h-[35px] bg-[#ffffff15] backdrop-blur-[5px] rounded-[50px] translate-x-[10px] translate-y-[10px] transition-all duration-400 group-hover:rounded-[10px] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:w-full group-hover:h-full"></div>
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}