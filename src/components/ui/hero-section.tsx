"use client";

import React, { useEffect, useState } from "react";
import Script from "next/script";
import { CloudShader } from "@/components/ui/cloud-shader";
import { StickerSwarm } from "@/components/ui/sticker-swarm";

export function HeroSection() {
  const [domLoaded, setDomLoaded] = useState(false);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <section className="hero-grid-bg min-h-screen w-full flex flex-col items-center justify-center relative px-6 overflow-hidden">
      {/* Load Spline viewer script tag */}
      <Script 
        type="module" 
        src="https://cdn.spline.design/@splinetool/viewer@2.0.0/build/spline-viewer.js"
        strategy="afterInteractive"
      />

      {/* Cloud shader layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <CloudShader className="h-full w-full" count={5} speed={0.8} />
      </div>

      {/* Floating Sticker Swarm (WebGL R3F) */}
      <StickerSwarm />

      {/* Grid Lines Layout */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute top-0 bottom-0 left-[33.333%] w-[1px] bg-slate-900/10" />
        <div className="absolute top-0 bottom-0 left-[66.666%] w-[1px] bg-slate-900/10" />
        <div className="absolute left-0 right-0 top-[35%] h-[1px] bg-slate-900/10" />
        <div className="absolute left-0 right-0 top-[70%] h-[1px] bg-slate-900/10" />

        {/* Top-row (35%) Intersection Markers */}
        <div className="absolute top-[35%] left-0 -translate-y-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none -translate-x-1/2">+</div>
        <div className="absolute top-[35%] left-[33.333%] -translate-y-1/2 -translate-x-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute top-[35%] left-[66.666%] -translate-y-1/2 -translate-x-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute top-[35%] right-0 -translate-y-1/2 translate-x-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>

        {/* Bottom-row (70%) Intersection Markers */}
        <div className="absolute top-[70%] left-0 -translate-y-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none -translate-x-1/2">+</div>
        <div className="absolute top-[70%] left-[33.333%] -translate-y-1/2 -translate-x-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute top-[70%] left-[66.666%] -translate-y-1/2 -translate-x-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute top-[70%] right-0 -translate-y-1/2 translate-x-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>

        {/* Top/Bottom Edge Markers */}
        <div className="absolute top-0 left-[33.333%] -translate-x-1/2 -translate-y-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute top-0 left-[66.666%] -translate-x-1/2 -translate-y-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute bottom-0 left-[33.333%] -translate-x-1/2 translate-y-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
        <div className="absolute bottom-0 left-[66.666%] -translate-x-1/2 translate-y-1/2 text-slate-900/40 font-mono text-base font-light select-none leading-none">+</div>
      </div>

      {/* Top Left Name */}
      <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
        <span className="font-['Montserrat'] text-lg md:text-xl font-black text-black tracking-tighter uppercase">
          PRASANN SHARMA
        </span>
      </div>

      {/* Center Spline 3D Asset */}
      <div className="relative z-10 w-full h-[600px] flex items-center justify-center pointer-events-auto">
        {domLoaded && React.createElement("spline-viewer", {
          url: "https://prod.spline.design/dqcnXZ2JX9IJwVXx/scene.splinecode"
        })}
      </div>
    </section>
  );
}
