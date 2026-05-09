"use client";

import React from 'react';
import { BrandArchetype, ARCHETYPE_MAP } from '@/lib/brand-psychology';

interface ArchetypeSelectorProps {
  selected: BrandArchetype;
  onChange: (archetype: BrandArchetype) => void;
}

export function ArchetypeSelector({ selected, onChange }: ArchetypeSelectorProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {(Object.keys(ARCHETYPE_MAP) as BrandArchetype[]).map((key) => {
        const config = ARCHETYPE_MAP[key];
        const isActive = selected === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            className={`flex flex-col text-left p-4 rounded-xl border-2 transition-all duration-200 group ${
              isActive 
                ? 'border-[var(--accent)] bg-[var(--accent-light)]' 
                : 'border-gray-100 hover:border-gray-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between w-full mb-2">
              <span className={`text-sm font-bold ${isActive ? 'text-black' : 'text-gray-900'}`} style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {config.name}
              </span>
              <div 
                className="w-4 h-4 rounded-full border border-black/5" 
                style={{ backgroundColor: config.accentColor }} 
              />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              {config.description}
            </p>
            
            {/* Tiny Preview Box */}
            <div className="mt-3 flex gap-1 items-center">
              <div className="h-1 w-8 rounded-full" style={{ backgroundColor: config.accentColor }} />
              <div className="h-1 w-4 rounded-full bg-gray-200" />
            </div>
          </button>
        );
      })}
    </div>
  );
}
