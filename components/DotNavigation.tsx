import React from 'react';
import { motion } from 'framer-motion';
import { SECTIONS, SectionId } from '../types';

interface DotNavigationProps {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
}

export const DotNavigation: React.FC<DotNavigationProps> = ({ activeSection, onNavigate }) => {
  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => onNavigate(section.id)}
          className="group relative flex items-center justify-end"
        >
          <span className="absolute right-6 mr-2 opacity-0 group-hover:opacity-100 transition-opacity text-white text-xs font-bold bg-black/50 px-2 py-1 rounded whitespace-nowrap">
            {section.label}
          </span>
          <motion.div
            animate={{
              scale: activeSection === section.id ? 1.5 : 1,
              backgroundColor: activeSection === section.id ? '#ffffff' : 'rgba(255, 255, 255, 0.4)'
            }}
            className="w-3 h-3 rounded-full shadow-lg border border-black/10"
          />
        </button>
      ))}
    </div>
  );
};