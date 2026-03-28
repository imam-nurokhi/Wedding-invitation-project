'use client';
import React from 'react';

interface OrnamentDividerProps {
  className?: string;
}

export default function OrnamentDivider({ className = '' }: OrnamentDividerProps) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <div className="flex items-center gap-3 w-full max-w-md">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-rose-gold opacity-60" />
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 15 C20 5, 5 10, 2 15 C5 20, 20 25, 30 15Z" fill="#C8A97C" fillOpacity="0.5"/>
          <path d="M30 15 C40 5, 55 10, 58 15 C55 20, 40 25, 30 15Z" fill="#C8A97C" fillOpacity="0.5"/>
          <circle cx="30" cy="15" r="4" fill="#C8A97C"/>
          <circle cx="30" cy="15" r="2" fill="#FDF8F0"/>
          <path d="M8 15 C8 12, 12 8, 16 10 C12 12, 12 18, 16 20 C12 22, 8 18, 8 15Z" fill="#C8A97C" fillOpacity="0.4"/>
          <path d="M52 15 C52 12, 48 8, 44 10 C48 12, 48 18, 44 20 C48 22, 52 18, 52 15Z" fill="#C8A97C" fillOpacity="0.4"/>
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-rose-gold opacity-60" />
      </div>
    </div>
  );
}
