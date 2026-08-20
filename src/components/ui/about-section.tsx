"use client";

import React from "react";
import Image from "next/image";

export function AboutSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center border-t border-slate-900/10 bg-[#FAFAFA]">
      {/* Grid Background continuation */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Vertical lines */}
        <div className="absolute top-0 bottom-0 left-[33.333%] w-[1px] bg-slate-900/10" />
        <div className="absolute top-0 bottom-0 left-[66.666%] w-[1px] bg-slate-900/10" />

        {/* Horizontal lines */}
        <div className="absolute left-0 right-0 top-[35%] h-[1px] bg-slate-900/10" />
        <div className="absolute left-0 right-0 top-[70%] h-[1px] bg-slate-900/10" />

        {/* Intersections */}
        {/* We can skip markers or add them as needed, just keeping it simple here */}
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 items-center">
        {/* Left Column: Image & Signature */}
        <div className="col-span-1 relative flex justify-center md:justify-end">
          <div className="relative w-64 h-64 md:w-80 md:h-80 shadow-2xl overflow-hidden bg-slate-800">
             {/* Placeholder for the user's portrait */}
             <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-slate-500 font-mono text-sm">
                Portrait Placeholder
             </div>
          </div>
          
          {/* Neon Cursive Signature Overlay */}
          <div className="absolute -top-12 -left-12 md:-left-24 z-20 pointer-events-none transform -rotate-12">
            <svg width="300" height="150" viewBox="0 0 300 150" className="drop-shadow-lg">
               {/* This is a generated path resembling cursive "Prasann", matching the neon green style */}
              <path 
                d="M 50 100 Q 70 20 90 40 Q 95 90 100 110 Q 110 50 120 70 Q 125 100 130 90 Q 140 60 150 70 Q 155 100 160 80 Q 170 50 180 70 Q 185 90 190 80 Q 200 60 210 70 Q 215 100 230 70" 
                fill="none" 
                stroke="#A3FF00" 
                strokeWidth="4" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                style={{ filter: "drop-shadow(0 0 4px #A3FF00)" }}
              />
            </svg>
          </div>
        </div>

        {/* Right Column: Typography */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-center space-y-8 font-['Inter']">
          <p className="text-4xl md:text-5xl lg:text-6xl font-medium text-black leading-tight tracking-tight">
            I explore how to shape AI-era workflows with craft and taste, building the next generation of digital products.
          </p>
          
          <p className="text-3xl md:text-4xl lg:text-5xl font-normal text-[#999999] leading-tight tracking-tight relative">
            I’m building{" "}
            <span className="text-black relative inline-block">
              reunimos™
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-slate-300 -z-10"></span>
            </span>
            , and previously worked on Alibaba{" "}
            <span className="text-black relative inline-block">
              aDrive
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-slate-300 -z-10"></span>
            </span>
            ,{" "}
            <span className="text-black relative inline-block">
              Teambition
              <span className="absolute bottom-1 left-0 w-full h-[3px] bg-slate-300 -z-10"></span>
            </span>
            , and 100offer.
            {/* Neon Green Square */}
            <span className="inline-block w-4 h-4 bg-[#A3FF00] ml-2 translate-y-[-4px]"></span>
          </p>
        </div>
      </div>
    </section>
  );
}
