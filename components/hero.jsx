"use client"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Environment, Stars, PerformanceMonitor } from "@react-three/drei"
import { Suspense, useState } from "react"
import Search from "./search"
import Image from "next/image";

export default function Hero() {
    const [dpr, setDpr] = useState(1.5) 
    const isDarkMode =  "dark"

    return (
        <section className="relative min-h-screen h-fit w-full mb-16 bg-black">
            <div className="earth absolute inset-0 z-0">
                <Canvas dpr={dpr} shadows>
                    <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
                    <Suspense fallback= {null}>
                        <Environment preset={isDarkMode ? "night" : "sunset"} />
                        {isDarkMode && <Stars radius={100} depth={50} count={7000} factor={4} saturation={0} fade speed={0.5} />}
                    </Suspense>
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        maxPolarAngle={Math.PI / 1.8}
                        minPolarAngle={Math.PI / 3}
                    />
                    <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
                </Canvas>
            </div>

            <div className="relative z-10 flex flex-col items-center p-20  h-screen text-center">
                <div className="flex justify-center items-center h-30 w-full text-white">
                    <Image
                      src="/NITM_logo.png"
                      alt="NITM logo"
                      width={150}
                      height={150}
                      className="absolute items-center z-10"
                    />
                </div>
                <div className=" backdrop-blur-sm pt-8 w-[80vw] md:w-fit rounded-lg ">
                    <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        NITM USHER
                    </h1>
                    <p className="text-md italic text-slate-100 md:text-xl mb-8 max-w-2xl">"Holds your hand and doesn't let you get lost"</p>
                    <Search />
                </div>
            </div>
        </section>
    )
}