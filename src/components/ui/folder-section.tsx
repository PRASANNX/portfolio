"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const folders = [
  { id: "graphic", label: "Graphic Design", color: "#3B82F6", dot: "#fbbf24" }, // Blue
  { id: "uiux", label: "UI/UX", color: "#6366F1", dot: "#f87171" }, // Indigo
  { id: "photo", label: "Photography", color: "#8B5CF6", dot: "#34d399" }, // Violet
  { id: "marketing", label: "Marketing", color: "#EC4899", dot: "#60a5fa" }, // Pink
  { id: "content", label: "Content", color: "#F43F5E", dot: "#a78bfa" }, // Rose
];

export function FolderSection() {
  const [activeFolder, setActiveFolder] = useState(folders[0].id);

  // Rearrange folders so the active one is at the front (end of array)
  // but keep the tab order consistent visually if possible.
  // Actually, for a stacked effect, we can just map over them and set z-index based on active state.
  
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-6 bg-[#D1D5DB] overflow-hidden">
      
      {/* Top Header Placeholder (matching image) */}
      <div className="absolute top-6 left-6 font-bold text-slate-700 tracking-tight">Designer PRASANN</div>
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white rounded-full px-6 py-1.5 text-xs text-slate-400 shadow-sm border border-slate-200">www.prasannxabhi.com</div>
      <div className="absolute top-6 right-6 text-2xl text-slate-700 cursor-pointer">+</div>

      {/* Folders Container */}
      <div className="relative w-full max-w-[1000px] h-[500px] mt-12 perspective-1000">
        
        {folders.map((folder, index) => {
          const isActive = activeFolder === folder.id;
          // Calculate offset based on distance from front (if we want a static stack or dynamic stack)
          // Let's do a dynamic stack where active is z-index 50, and others go backwards.
          const activeIndex = folders.findIndex(f => f.id === activeFolder);
          
          // Distance from active (for simple stacking)
          let depthOffset = index - activeIndex;
          if (depthOffset < 0) depthOffset += folders.length; // wrap around
          
          // If it's active, depth is 0. 
          const zIndex = 50 - depthOffset;
          const scale = 1 - (depthOffset * 0.03);
          const translateY = depthOffset * -15; // Shift up as they go back

          return (
            <motion.div
              key={folder.id}
              className="absolute inset-0 w-full h-full flex flex-col"
              animate={{
                zIndex: zIndex,
                scale: scale,
                y: translateY,
              }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.2 }}
              style={{ transformOrigin: "bottom center" }}
            >
              
              {/* Folder Tabs Row - Only visible for the active folder? 
                  Wait, physical folders have their tabs fixed. 
                  Let's make a single shared tab bar, and the body changes. 
                  But the user asked for "5 different folders stacked upon each other".
                  Let's render the tab attached to the body.
              */}
              <div className="relative h-12 flex">
                <div 
                  className="flex items-center px-6 rounded-t-xl cursor-pointer shadow-lg transition-colors"
                  style={{ 
                    backgroundColor: folder.color,
                    marginLeft: `${index * 140}px`, // Shift each tab to the right
                    width: '160px',
                    filter: isActive ? 'brightness(1)' : 'brightness(0.85)'
                  }}
                  onClick={() => setActiveFolder(folder.id)}
                >
                  <span className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: folder.dot }}></span>
                  <span className="text-white font-bold text-sm">{folder.label}</span>
                </div>
                
                {/* Slanted edge for tab (CSS trick) */}
                <div 
                  className="w-8 h-12"
                  style={{
                    backgroundColor: folder.color,
                    clipPath: "polygon(0 0, 100% 100%, 0 100%)",
                    filter: isActive ? 'brightness(1)' : 'brightness(0.85)'
                  }}
                ></div>
              </div>

              {/* Folder Body */}
              <div 
                className="flex-1 rounded-b-2xl rounded-tr-2xl p-8 shadow-2xl relative overflow-hidden border border-white/10"
                style={{ 
                  backgroundColor: folder.color,
                  borderTopLeftRadius: index === 0 ? '0px' : '1rem' 
                }}
              >
                
                {/* Inner Content (Only show if active to save DOM / focus) */}
                <div className={`w-full h-full transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                  
                  {/* Top Right Expand Icon */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer shadow-md text-blue-600 hover:scale-110 transition-transform">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <polyline points="9 21 3 21 3 15"></polyline>
                      <line x1="21" y1="3" x2="14" y2="10"></line>
                      <line x1="3" y1="21" x2="10" y2="14"></line>
                    </svg>
                  </div>

                  {/* Wireframe Guides (matching reference image) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-[120px] flex flex-col justify-between pointer-events-none opacity-40">
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                    <div className="w-full h-[1px] bg-white"></div>
                  </div>

                  {/* Main Typography */}
                  <div className="w-full h-full flex flex-col justify-center relative z-10">
                    <div className="relative inline-block self-start">
                       {/* Dotted border box */}
                       <div className="absolute -inset-4 border-2 border-dashed border-white/50 pointer-events-none">
                         <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white"></div>
                         <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white"></div>
                         <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white"></div>
                         <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white"></div>
                       </div>
                       
                       <h2 className="text-[6rem] md:text-[8rem] font-serif font-bold text-white leading-none tracking-tight lowercase">
                         {folder.label.split(' ')[0]}<span className="text-white">.</span>
                       </h2>
                    </div>

                    {/* Bottom Action Tags */}
                    <div className="mt-12 flex space-x-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="px-5 py-2 rounded-full border border-white/50 text-white text-sm font-medium flex items-center hover:bg-white/10 cursor-pointer transition-colors">
                          <svg className="w-3 h-3 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="7" y1="17" x2="17" y2="7"></line>
                            <polyline points="7 7 17 7 17 17"></polyline>
                          </svg>
                          View Work
                        </div>
                      ))}
                    </div>

                  </div>

                  {/* Pixel Cursor Decorator */}
                  <div className="absolute bottom-[30%] right-[30%] pointer-events-none animate-bounce">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1.5">
                      <path d="M4 2l14 10-6 2 4 8-3 2-4-8-3 4z" />
                    </svg>
                  </div>

                  {/* Bottom Right Pixel Decorator */}
                  <div className="absolute bottom-8 right-8 flex space-x-1">
                    <div className="w-4 h-4 bg-white"></div>
                    <div className="w-4 h-4 bg-white/50"></div>
                    <div className="w-4 h-4 bg-white"></div>
                  </div>

                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {/* Footer Placeholders */}
      <div className="absolute bottom-6 left-6 flex items-center text-slate-700 font-medium">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
        hello@prasannxabhi.com
      </div>
    </section>
  );
}
