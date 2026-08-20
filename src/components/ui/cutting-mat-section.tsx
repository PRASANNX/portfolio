"use client";

import React from "react";

export function CuttingMatSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA] overflow-hidden">
      {/* The Cutting Mat Card */}
      <div className="relative w-full max-w-[1600px] h-[900px] rounded-[16px] shadow-2xl overflow-hidden"
           style={{ backgroundColor: "#1a4731" }}>
        
        {/* SVG Grid Overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-80" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </pattern>
            <pattern id="largeGrid" width="100" height="100" patternUnits="userSpaceOnUse">
              <rect width="100" height="100" fill="url(#smallGrid)" />
              <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#largeGrid)" />
          <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <line x1="20%" y1="100%" x2="100%" y2="20%" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          
          <text x="30%" y="70%" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">45°</text>
          <text x="40%" y="50%" fill="rgba(255,255,255,0.6)" fontSize="12" fontFamily="monospace">60°</text>

          {/* Top Ruler */}
          <g fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" textAnchor="middle">
            {[...Array(20)].map((_, i) => (
              <text key={`top-${i}`} x={(i + 1) * 100} y="15">{(i + 1) * 10}</text>
            ))}
          </g>

          {/* Left Ruler */}
          <g fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="monospace" textAnchor="end">
            {[...Array(10)].map((_, i) => (
              <text key={`left-${i}`} x="15" y={(i + 1) * 100 + 4}>{(i + 1) * 100}</text>
            ))}
          </g>

          {/* Label Box */}
          <rect x="20" y="20" width="180" height="80" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
          <text x="30" y="45" fill="rgba(255,255,255,0.8)" fontSize="14" fontFamily="sans-serif" fontWeight="bold">CUTTING MAT</text>
          <text x="30" y="65" fill="rgba(255,255,255,0.8)" fontSize="12" fontFamily="sans-serif">NO. CM-45 A3</text>
          <text x="30" y="80" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="sans-serif">450x300x3m/m</text>
        </svg>

        {/* Scattered Elements Container */}
        <div className="relative z-10 w-full h-full perspective-1000">
          
          {/* Main Central Project Card (Website Mockup style) */}
          <div className="absolute top-[15%] left-[20%] w-[60%] h-[60%] bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -rotate-2 hover:rotate-0 transition-transform duration-500 overflow-hidden border border-gray-200 flex flex-col z-20">
            {/* Fake Browser Header */}
            <div className="w-full h-10 bg-gray-100 border-b border-gray-200 flex items-center px-4 space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
              <div className="ml-4 px-4 py-1 bg-white rounded-md text-xs text-gray-500 shadow-sm w-64 text-center mx-auto">
                my-portfolio.com
              </div>
            </div>
            {/* Mockup Content */}
            <div className="flex-1 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 flex flex-col">
               <h3 className="text-3xl font-bold text-slate-800 font-['Montserrat']">Curated Portfolios</h3>
               <div className="grid grid-cols-3 gap-6 mt-8">
                  {/* Mock grid items */}
                  {[1,2,3].map(i => (
                    <div key={i} className="bg-white p-4 rounded-lg shadow-sm border border-slate-100">
                      <div className="w-full h-32 bg-slate-200 rounded-md mb-4 bg-gradient-to-tr from-slate-200 to-slate-300"></div>
                      <div className="h-4 w-3/4 bg-slate-200 rounded mb-2"></div>
                      <div className="h-3 w-1/2 bg-slate-200 rounded"></div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Polaroid 1 (Left) */}
          <div className="absolute top-[40%] left-[8%] w-[240px] h-[300px] bg-white p-4 pb-12 shadow-[0_15px_30px_rgba(0,0,0,0.4)] transform -rotate-12 hover:-translate-y-4 hover:rotate-[-5deg] transition-all duration-300 z-30 cursor-pointer">
            <div className="w-full h-full bg-slate-800 bg-gradient-to-br from-blue-900 to-indigo-900 relative overflow-hidden">
               {/* Placeholder Image content */}
               <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm">Paris</div>
            </div>
            <p className="absolute bottom-4 left-0 w-full text-center font-['Inter'] text-gray-800 font-handwriting text-lg italic">Paris, France</p>
            {/* Red Push Pin */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 shadow-md border-2 border-red-700 z-10">
              <div className="w-2 h-2 rounded-full bg-red-400 absolute top-1 left-1"></div>
            </div>
          </div>

          {/* Polaroid 2 (Right) */}
          <div className="absolute top-[20%] right-[10%] w-[220px] h-[280px] bg-white p-4 pb-12 shadow-[0_15px_30px_rgba(0,0,0,0.4)] transform rotate-6 hover:-translate-y-4 hover:rotate-[2deg] transition-all duration-300 z-20 cursor-pointer">
            <div className="w-full h-full bg-slate-800 bg-gradient-to-br from-emerald-900 to-teal-900 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-sm">London</div>
            </div>
            <p className="absolute bottom-4 left-0 w-full text-center font-['Inter'] text-gray-800 font-handwriting text-lg italic">London, UK</p>
            {/* Red Push Pin */}
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-red-600 shadow-md border-2 border-red-700 z-10">
              <div className="w-2 h-2 rounded-full bg-red-400 absolute top-1 left-1"></div>
            </div>
          </div>

          {/* Floating Sticky Note */}
          <div className="absolute bottom-[15%] right-[25%] w-[200px] h-[200px] bg-[#fef08a] shadow-[0_10px_20px_rgba(0,0,0,0.3)] transform rotate-12 z-30 p-6">
            <p className="font-mono text-gray-800 text-lg leading-relaxed">
              Don't forget to update the 3D WebGL renderer pipeline!
            </p>
            <div className="absolute top-2 right-4 text-gray-400 text-2xl font-bold opacity-30">#</div>
          </div>

          {/* Newspaper / Document Fragment */}
          <div className="absolute bottom-[5%] left-[25%] w-[350px] h-[200px] bg-[#f5f5f1] shadow-[0_8px_16px_rgba(0,0,0,0.4)] transform -rotate-3 z-10 p-6 border border-gray-300">
            <h1 className="font-serif text-3xl font-bold border-b-2 border-black pb-2 mb-2">THE DAILY NEWS</h1>
            <p className="font-serif text-xs text-justify columns-2 gap-4 text-gray-700 leading-tight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.
            </p>
          </div>

          {/* Connecting Red String (SVG overlay on top of cards) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-40 drop-shadow-md" xmlns="http://www.w3.org/2000/svg">
            <path d="M 220 360 Q 400 200 600 350 T 1100 220" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeDasharray="5,5" />
          </svg>

          {/* Decorative Tools (Absolute positioned emojis/shapes as placeholders) */}
          {/* Magnifying Glass */}
          <div className="absolute bottom-[20%] right-[5%] text-[100px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform -rotate-45 z-40 opacity-90 select-none">
            🔍
          </div>
          {/* Pen */}
          <div className="absolute top-[10%] left-[5%] text-[80px] drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] transform rotate-45 z-40 opacity-90 select-none">
            🖋️
          </div>
          {/* Paperclip */}
          <div className="absolute top-[30%] left-[30%] text-[40px] drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] transform rotate-12 z-40 opacity-90 select-none">
            📎
          </div>

        </div>
      </div>
    </section>
  );
}
