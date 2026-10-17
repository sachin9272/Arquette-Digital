'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { AlertCircle } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  treatmentName: string;
  timeframe?: string;
  disclaimer?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = 'Before clinical treatment',
  afterAlt = 'After clinical treatment result',
  treatmentName,
  timeframe = 'Results after 3 months',
  disclaimer = 'Individual clinical results may vary. Unretouched patient case photograph taken under standardized medical clinic lighting.',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.min(Math.max((x / rect.width) * 100, 0), 100);
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e.clientX);
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // fallback if pointer capture fails
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setSliderPosition((prev) => Math.max(prev - 5, 0));
    } else if (e.key === 'ArrowRight') {
      setSliderPosition((prev) => Math.min(prev + 5, 100));
    }
  };

  return (
    <div className="w-full flex flex-col space-y-2">
      <div className="flex items-center justify-between text-xs font-semibold text-brand-text mb-1">
        <span className="text-sm font-bold text-brand-primary">{treatmentName}</span>
        <span className="text-brand-muted">{timeframe}</span>
      </div>

      <div
        ref={containerRef}
        tabIndex={0}
        role="slider"
        aria-label={`Before and after comparison for ${treatmentName}`}
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden shadow-md select-none cursor-ew-resize border border-brand-border outline-hidden focus:ring-2 focus:ring-brand-primary/40 touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        {/* After Image (Full background) */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={afterImage}
            alt={afterAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-brand-primary/85 text-white backdrop-blur-xs shadow-xs pointer-events-none select-none">
            After Treatment
          </span>
        </div>

        {/* Before Image (Revealed over After image using clipPath) */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <Image
            src={beforeImage}
            alt={beforeAlt}
            fill
            sizes="(max-width: 768px) 100vw, 800px"
            className="object-cover"
          />
          <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-black/80 text-white backdrop-blur-xs shadow-xs pointer-events-none select-none">
            Before
          </span>
        </div>

        {/* Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.6)] z-20 flex items-center justify-center -translate-x-1/2 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-white text-brand-primary shadow-xl border border-brand-border flex items-center justify-center text-[11px] font-black tracking-tighter">
            &#x2194;
          </div>
        </div>
      </div>

      {/* Medical Disclaimer */}
      <div className="flex items-start gap-1.5 pt-1 text-[11px] text-brand-muted leading-tight">
        <AlertCircle className="w-3.5 h-3.5 text-brand-secondary shrink-0 mt-0.5" />
        <span>{disclaimer}</span>
      </div>
    </div>
  );
};
