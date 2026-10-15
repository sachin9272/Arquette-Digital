'use client';

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: string;
  content: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  defaultOpenIndex?: number;
  allowMultiple?: boolean;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  defaultOpenIndex = 0,
  allowMultiple = false,
  className = '',
}) => {
  const [openIndices, setOpenIndices] = useState<number[]>(
    defaultOpenIndex !== undefined ? [defaultOpenIndex] : []
  );

  const toggleIndex = (index: number) => {
    if (allowMultiple) {
      if (openIndices.includes(index)) {
        setOpenIndices(openIndices.filter((i) => i !== index));
      } else {
        setOpenIndices([...openIndices, index]);
      }
    } else {
      setOpenIndices(openIndices.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className={`divide-y divide-brand-border border-y border-brand-border ${className}`}>
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        return (
          <div key={item.id || index} className="py-4">
            <button
              type="button"
              onClick={() => toggleIndex(index)}
              className="w-full flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-accent rounded-md py-1 group cursor-pointer"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg font-semibold text-brand-text group-hover:text-brand-primary transition-colors pr-4">
                {item.title}
              </span>
              <span
                className={`p-1.5 rounded-full bg-brand-surface-low text-brand-muted group-hover:text-brand-primary transition-transform duration-300 ${
                  isOpen ? 'rotate-180 bg-brand-accent-light text-brand-accent' : ''
                }`}
              >
                <ChevronDown className="w-5 h-5" />
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="text-sm sm:text-base text-brand-muted leading-relaxed pr-6">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
