"use client";

import React from "react";
import { StickerSwarm } from "./sticker-swarm";

export function HelloStickerSection() {
  return (
    <section className="relative w-full min-h-screen bg-[#f0f4f8] overflow-hidden flex items-center justify-center border-t border-slate-200">
      
      {/* 3D WebGL Background Swarm */}
      <StickerSwarm />
      
      {/* Grid Overlay matching reference */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30">
        <div className="absolute top-0 bottom-0 left-[33.33%] w-[1px] bg-slate-400"></div>
        <div className="absolute top-0 bottom-0 left-[66.66%] w-[1px] bg-slate-400"></div>
        <div className="absolute left-0 right-0 top-[33.33%] h-[1px] bg-slate-400"></div>
        <div className="absolute left-0 right-0 top-[66.66%] h-[1px] bg-slate-400"></div>
        
        {/* Intersection Plus Marks */}
        <div className="absolute top-[33.33%] left-[33.33%] -translate-x-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">+</div>
        <div className="absolute top-[33.33%] left-[66.66%] -translate-x-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">+</div>
        <div className="absolute top-[66.66%] left-[33.33%] -translate-x-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">+</div>
        <div className="absolute top-[66.66%] left-[66.66%] -translate-x-1/2 -translate-y-1/2 text-slate-500 font-mono text-sm">+</div>
      </div>

      {/* DOM Content Overlay */}
      <div className="relative z-20 w-full h-full p-6 flex flex-col justify-between pointer-events-none">
        
        {/* Top Header */}
        <div className="flex justify-between w-full font-mono text-xs uppercase text-slate-800 tracking-wider">
          <div className="font-bold">HAOQI.DESIGN</div>
          <div className="hidden md:flex space-x-12">
            <span>Work</span>
            <span>Contact</span>
            <span>Theme[L]</span>
            <span>Sound[-]</span>
          </div>
        </div>

        {/* Intro text (Top left) */}
        <div className="absolute top-24 left-6 md:left-12 flex space-x-16 text-slate-800 pointer-events-auto">
          <h2 className="text-xl md:text-2xl font-serif">Design & <br/>Engineering</h2>
          <p className="font-mono text-xs max-w-[200px] leading-relaxed hidden md:block">
            Thinking in systems. <br/>
            Designing with care.
          </p>
        </div>

        {/* Intro text (Top right) */}
        <div className="absolute top-24 right-6 md:right-12 text-slate-800 font-mono text-xs max-w-[300px] leading-relaxed hidden lg:block text-right pointer-events-auto">
          I'm Haoqi Wen, leading Design Engineering and AI exploration at ██████, engineering, and AI at scale. Outside work, I build design tools for team efficiency.
        </div>

        {/* Center 3D Hello Typography */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 select-none pointer-events-auto flex items-center justify-center">
          {/* We use a heavy drop-shadow and gradient text to simulate the 3D 'hello' bubble effect if a real 3D model isn't available. */}
          <h1 
            className="text-[10rem] md:text-[18rem] font-serif italic tracking-tighter leading-none"
            style={{
              background: "linear-gradient(180deg, #93c5fd 0%, #3b82f6 50%, #1e3a8a 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 20px 30px rgba(59,130,246,0.3)) drop-shadow(0 4px 6px rgba(255,255,255,0.8))",
            }}
          >
            hello
          </h1>
          
          {/* Specular highlights for 'hello' to make it look like a glossy balloon */}
          <div className="absolute top-[30%] left-[25%] w-8 h-4 bg-white rounded-full blur-[2px] opacity-70 rotate-12"></div>
          <div className="absolute top-[40%] right-[30%] w-6 h-3 bg-white rounded-full blur-[2px] opacity-70 -rotate-12"></div>
        </div>

        {/* Big Bottom Text */}
        <div className="absolute bottom-24 left-6 md:left-12 text-slate-900 pointer-events-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
            I Bring<br />
            Craft & Taste<br />
            To Digital Work
          </h1>
        </div>

      </div>

    </section>
  );
}
