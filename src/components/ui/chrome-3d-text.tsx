"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";

interface Chrome3DTextProps {
  text: string;
  className?: string;
}

export function Chrome3DText({ text, className }: Chrome3DTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  // Smooth animation loop for lerped rotation
  useEffect(() => {
    const animate = () => {
      const lerp = 0.08;
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * lerp;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * lerp;
      setRotation({ x: currentRef.current.x, y: currentRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Map to rotation range: ±15 degrees
    targetRef.current = {
      x: (y - 0.5) * -20,
      y: (x - 0.5) * 20,
    };

    // Glare position follows cursor
    setGlare({ x: x * 100, y: y * 100 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    targetRef.current = { x: 0, y: 0 };
    setGlare({ x: 50, y: 50 });
    setIsHovering(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={`relative cursor-pointer select-none ${className || ""}`}
      style={{ perspective: "1200px" }}
    >
      <div
        className="relative"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovering ? "none" : "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        }}
      >
        {/* Deep 3D Extrusion Layers (back to front) */}
        {Array.from({ length: 12 }).map((_, i) => (
          <span
            key={`depth-${i}`}
            aria-hidden="true"
            className="absolute inset-0 font-black tracking-tighter text-center"
            style={{
              fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
              fontSize: "clamp(6rem, 18vw, 14rem)",
              lineHeight: 1,
              color: `hsl(220, ${10 + i * 3}%, ${28 + i * 3}%)`,
              transform: `translateZ(${-i * 1.5}px)`,
              WebkitTextStroke: "0.5px rgba(0,0,0,0.15)",
            }}
          >
            {text}
          </span>
        ))}

        {/* Main Chrome Face Layer */}
        <span
          className="relative block font-black tracking-tighter text-center"
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            background: `
              linear-gradient(
                135deg,
                #d4d4d8 0%,
                #fafafa 12%,
                #a1a1aa 20%,
                #e4e4e7 30%,
                #71717a 42%,
                #fafafa 50%,
                #a1a1aa 58%,
                #e4e4e7 68%,
                #52525b 78%,
                #fafafa 85%,
                #d4d4d8 100%
              )
            `,
            backgroundSize: "200% 200%",
            backgroundPosition: `${glare.x}% ${glare.y}%`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
            transform: "translateZ(1px)",
            transition: "background-position 0.1s ease-out",
          }}
        >
          {text}
        </span>

        {/* Bright Specular Highlight Layer */}
        <span
          aria-hidden="true"
          className="absolute inset-0 font-black tracking-tighter text-center pointer-events-none"
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            background: `
              radial-gradient(
                ellipse at ${glare.x}% ${glare.y}%,
                rgba(255,255,255,0.9) 0%,
                rgba(255,255,255,0.3) 25%,
                transparent 60%
              )
            `,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: "translateZ(2px)",
            mixBlendMode: "overlay",
          }}
        >
          {text}
        </span>

        {/* Edge Highlight (Inner Stroke Simulation) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 font-black tracking-tighter text-center pointer-events-none"
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            WebkitTextStroke: "1.5px rgba(255,255,255,0.35)",
            WebkitTextFillColor: "transparent",
            transform: "translateZ(3px)",
          }}
        >
          {text}
        </span>

        {/* Refraction Lines (diagonal streaks across the chrome) */}
        <span
          aria-hidden="true"
          className="absolute inset-0 font-black tracking-tighter text-center pointer-events-none"
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            background: `
              repeating-linear-gradient(
                ${120 + rotation.y * 2}deg,
                transparent 0px,
                transparent 8px,
                rgba(255,255,255,0.12) 8px,
                rgba(255,255,255,0.12) 9px,
                transparent 9px,
                transparent 18px
              )
            `,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: "translateZ(4px)",
          }}
        >
          {text}
        </span>
      </div>

      {/* Sparkle Flares */}
      <Sparkle x="12%" y="15%" delay={0} size={28} />
      <Sparkle x="88%" y="12%" delay={0.6} size={24} />
      <Sparkle x="50%" y="85%" delay={1.2} size={26} />
      <Sparkle x="35%" y="50%" delay={0.3} size={18} />
      <Sparkle x="72%" y="45%" delay={0.9} size={20} />

      {/* Bottom Reflection */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 pointer-events-none overflow-hidden"
        style={{
          top: "100%",
          height: "40%",
          transform: "scaleY(-1)",
          opacity: 0.12,
          maskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 80%)",
          WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 80%)",
        }}
      >
        <span
          className="block font-black tracking-tighter text-center"
          style={{
            fontFamily: "var(--font-montserrat), 'Montserrat', sans-serif",
            fontSize: "clamp(6rem, 18vw, 14rem)",
            lineHeight: 1,
            background: "linear-gradient(135deg, #a1a1aa 0%, #d4d4d8 50%, #71717a 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {text}
        </span>
      </div>
    </div>
  );
}

/* ─── Sparkle Component ─────────────────────────────────── */
function Sparkle({
  x,
  y,
  delay,
  size,
}: {
  x: string;
  y: string;
  delay: number;
  size: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        left: x,
        top: y,
        transform: "translate(-50%, -50%)",
        width: size,
        height: size,
        animation: `sparkle-pulse 2.5s ease-in-out ${delay}s infinite`,
      }}
    >
      {/* 4-point star */}
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="none">
        <path
          d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5Z"
          fill="url(#sparkle-grad)"
          className="origin-center"
        />
        {/* Secondary cross flare */}
        <path
          d="M12 4L12.8 11.2L20 12L12.8 12.8L12 20L11.2 12.8L4 12L11.2 11.2Z"
          fill="white"
          opacity="0.8"
        />
        <defs>
          <radialGradient id="sparkle-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" />
            <stop offset="50%" stopColor="rgba(255,200,180,0.9)" />
            <stop offset="100%" stopColor="rgba(255,150,120,0)" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
