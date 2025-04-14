import Hero from "@/components/hero";
import Homepage from "@/components/homepage";

export default function Home() {
  return (
    <div className="w-full h-screen">
      <div className="hidden md:block">
        <Hero />
      </div>
      <div className="block md:hidden">
        <Homepage />
      </div>
    </div>
  )
}