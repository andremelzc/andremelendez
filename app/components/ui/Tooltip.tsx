"use client";
import React, { ReactNode, useState } from "react";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
}

export default function Tooltip({ content, children }: TooltipProps) {
  const [show, setShow] = useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1 z-10 flex flex-col items-center">
          <span className="px-3 py-1 rounded bg-midnight-700 text-cream-100 text-xs shadow-lg whitespace-nowrap pointer-events-none transition-opacity duration-200 opacity-100 z-20">
            {content}
          </span>
          <span className="w-3 h-3 bg-midnight-700 rotate-45 -mt-2 z-10"></span>
        </span>
      )}
    </span>
  );
}
