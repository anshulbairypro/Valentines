import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronsRight } from 'lucide-react';

const LINES = [
  "So... this is what I've been trying to do for the last 6 days.",
  "I hope you didn't feel bad for me not replying or spending time with you.",
  "I'm sorry if you felt left out...",
  "But I was never bored of you, Baby.",
  "I was just building this universe for you."
];

export const IntroOverlay = ({ onComplete }: { onComplete: () => void }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (index >= LINES.length) {
      const timeout = setTimeout(onComplete, 1000);
      return () => clearTimeout(timeout);
    }

    const currentLine = LINES[index];
    let charIndex = 0;
    
    // Start typing
    const typeInterval = setInterval(() => {
      charIndex++;
      setDisplayText(currentLine.slice(0, charIndex));
      
      if (charIndex === currentLine.length) {
        clearInterval(typeInterval);
        // Wait after finishing line
        setTimeout(() => {
          setDisplayText("");
          setIndex((prev) => prev + 1);
        }, 2500);
      }
    }, 50);

    return () => clearInterval(typeInterval);
  }, [index, onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-8"
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <div className="max-w-3xl w-full min-h-[200px] flex items-center justify-center relative">
        <h1 className="text-xl md:text-3xl font-mono text-white text-center leading-relaxed">
          {displayText}
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            className="inline-block w-2 h-6 md:h-8 bg-green-500 ml-2 align-middle shadow-[0_0_8px_#22c55e]"
          />
        </h1>
      </div>

      {/* SKIP BUTTON */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 flex items-center gap-2 text-white/20 hover:text-white transition-all duration-300 font-mono text-xs uppercase tracking-widest group z-50 cursor-pointer"
      >
        <span>Skip Intro</span>
        <ChevronsRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
};