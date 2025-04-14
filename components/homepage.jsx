"use client"
import Image from "next/image"
import { useState } from "react"
import { useRouter } from 'next/navigation'

function Homepage() {
    const [clicked, setClicked] = useState(false)
    const router = useRouter();

    const handleClick = () => {
        setClicked(true)
        router.push('/map');
    }

    return (
        <main className="relative w-full h-screen overflow-hidden">
            <style jsx>{`
                @keyframes hop {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    50% {
                        transform: translateY(-5px);
                    }
                }

                .hopping {
                    animation: hop 1.4s infinite;
                }
            `}</style>

            <Image
                src="/ghibli-campus.png"
                alt="Ghibli Campus"
                fill
                className="object-cover z-0"
                priority
            />

            <div className="relative z-10 flex flex-col items-center p-5 h-screen">
                <Image
                    src="/NITM_logo.png"
                    alt="NITM logo"
                    width={150}
                    height={150}
                    className="absolute items-center z-10"
                />
            </div>

            <div className="flex flex-col items-center justify-center h-screen">
                <div className="absolute bottom-1/6 text-center backdrop-blur-sm pt-6 w-[80vw] md:w-fit rounded-4xl">
                    <h1 className="text-4xl md:text-7xl font-bold mb-4 bg-green-100 bg-clip-text text-transparent">
                        NITM USHER
                    </h1>
                    <p className="text-md italic text-red-100 md:text-xl mb-4 max-w-2xl">
                        "Holds your hand and doesn't let you get lost"
                    </p>
                </div>
            </div>

            <div className="absolute z-10 flex bottom-1/13 h-16 justify-center w-full">
                <button
                    onClick={handleClick}
                    className={`group flex font-serif items-center gap-2 px-6 py-3 rounded-full font-semibold text-lg shadow-2xl backdrop-blur-md transition-all duration-400
                        ${clicked
                            ? 'bg-green-700 text-white scale-95'
                            : 'bg-white/70 text-green-800 border-2 border-green-600 hopping'}
                      `}
                >
                    Enter <span className={`transition-transform duration-400 ${clicked ? 'translate-x-2' : ''}`}>➜</span>
                </button>
            </div>
        </main>
    )
}

export default Homepage
