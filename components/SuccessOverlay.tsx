import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import canvasConfetti from 'canvas-confetti';
import { Heart } from 'lucide-react';

// --- FILE PLACEMENT GUIDE ---
// 1. Photo: public/images/us-final.jpg
// 2. Audio: public/audio/success-song.mp3

export const SuccessOverlay: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // 1. Trigger Audio
    const audio = new Audio('/audio/success-song.mp3');
    audio.volume = 0.6;
    audio.loop = true;
    audio.play().catch((err) => console.log("Audio play failed (interaction needed):", err));
    audioRef.current = audio;

    // 2. Trigger Massive Confetti
    const duration = 8000;
    const animationEnd = Date.now() + duration;
    
    // Heart Confetti
    const heartDefaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 100, 
      zIndex: 10000,
      shapes: ['square', 'circle'] as ('square' | 'circle')[] 
    };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Top Left Burst
      canvasConfetti({
        ...heartDefaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ffa500', '#ffffff', '#ffc0cb'] 
      });
      
      // Top Right Burst
      canvasConfetti({
        ...heartDefaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#ff0000', '#ffa500', '#ffffff', '#ffc0cb']
      });
    }, 250);

    return () => {
      clearInterval(interval);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-red-500"
            initial={{ y: "100vh", opacity: 0, x: Math.random() * 100 + "vw" }}
            animate={{ y: "-10vh", opacity: [0, 1, 0] }}
            transition={{ 
              duration: 5 + Math.random() * 5, 
              repeat: Infinity, 
              delay: Math.random() * 2 
            }}
          >
            <Heart size={20 + Math.random() * 30} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, rotate: -10, y: 100 }}
        animate={{ scale: 1, rotate: -3, y: 0 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
        className="relative bg-white p-6 pb-16 rounded shadow-[0_0_60px_rgba(255,215,0,0.6)] max-w-md w-full transform rotate-[-3deg] border-[12px] border-yellow-500/90"
      >
        {/* GOLD SHINE ON FRAME */}
        <div className="absolute inset-0 border-[2px] border-yellow-200/50 pointer-events-none"></div>

        {/* POLAROID FRAME */}
        <div className="aspect-[4/5] bg-gray-100 mb-8 overflow-hidden relative shadow-inner">
          <img 
            src="/images/us-final.jpg" 
            alt="Our First Valentine" 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback if image missing
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('flex', 'items-center', 'justify-center', 'bg-rose-100');
              e.currentTarget.parentElement!.innerHTML = `
                <div class="text-center p-4">
                  <span class="text-6xl block mb-2">📸</span>
                  <span class="text-rose-400 font-mono text-xs">Add /images/us-final.jpg</span>
                </div>
              `;
            }}
          />
          {/* Gloss Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
        </div>

        {/* HANDWRITTEN CAPTION */}
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-romantic text-gray-800 leading-tight">
            She said Yes!
          </h2>
          <p className="font-hand text-2xl md:text-3xl text-rose-600 transform -rotate-1">
            Our first Valentines together.
          </p>
          <p className="font-mono text-xs text-gray-400 mt-4 tracking-[0.3em] uppercase">
            I LOVE YOU, NICHOLE.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};