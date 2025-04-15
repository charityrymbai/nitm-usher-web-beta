'use client';
import React from 'react';
import Image from 'next/image';
import Search from '@/components/search';
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Map() {
    return (
        <div className="relative w-full h-screen max-h-screen">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 w-full h-full">
                    <Image
                        src={"/bg3.png"}
                        alt="Background"
                        fill
                        className="object-cover opacity-60 mix-blend-multiply"
                        priority
                    />
                </div>
            </div>
            <div className="relative flex flex-col items-center z-20 h-full p-10 text-center font-bold font-mono text-2xl text-yellow-900">
                ENTER YOUR DESTINATION
                <Search />
                <div className='mt-[25vh]'>
                    <DotLottieReact
                        src="/walker.lottie"
                        loop
                        autoplay
                        className="flex flex-col items-center justify-center mt-20"
                    />
                </div>

            </div>
        </div>
    );
}