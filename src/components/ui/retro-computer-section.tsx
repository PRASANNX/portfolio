"use client";

import React from "react";

export function RetroComputerSection() {
  return (
    <section className="relative w-full min-h-[800px] h-[100vh] bg-[#111] overflow-hidden flex items-center justify-center">
      {/* Background Image Container */}
      <div 
        className="relative w-full h-full max-w-[1200px] max-h-[1200px] bg-no-repeat bg-center bg-cover shadow-2xl"
        style={{ backgroundImage: "url('/retro-bg.jpg')" }}
      >
        
        {/* Screen Container (Positioned over the green screen of the monitor) */}
        {/* Note: The percentages are estimated based on the uploaded image and may need fine-tuning */}
        <div className="absolute top-[28%] left-[23%] w-[54%] h-[35%] bg-black/90 overflow-hidden rounded-md border border-white/10 shadow-[inset_0_0_20px_rgba(0,255,0,0.1)] flex flex-col perspective-1000">
          
          {/* CRT Scanline overlay */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50"></div>
          
          {/* Inner Content (Terminal / UI) */}
          <div className="p-6 text-green-400 font-mono text-sm md:text-base h-full flex flex-col">
            <p className="mb-4 text-green-300/80">PRX OS v1.0.0 booting...</p>
            <p className="mb-2">&gt; Loading modules...</p>
            <p className="mb-2 text-green-500">[OK] 3D Renderer</p>
            <p className="mb-2 text-green-500">[OK] User Interface</p>
            <p className="mb-2 text-green-500">[OK] Neural Link</p>
            <div className="mt-8">
              <span className="mr-2 text-green-400">&gt; Execute: portfolio.exe</span>
              <span className="w-2 h-4 inline-block bg-green-400 animate-pulse"></span>
            </div>
            
            {/* Interactive placeholder content */}
            <div className="mt-auto border border-green-500/30 bg-green-900/20 p-4 rounded-sm flex items-center justify-between hover:bg-green-800/40 transition-colors cursor-pointer group">
              <div className="flex flex-col">
                <span className="text-green-300 font-bold group-hover:text-green-200">PROJECT_ALPHA.DAT</span>
                <span className="text-green-500/70 text-xs mt-1">SIZE: 1.2MB | TYPE: INTERACTIVE</span>
              </div>
              <div className="text-green-400 opacity-50 group-hover:opacity-100">
                [ RUN ]
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
