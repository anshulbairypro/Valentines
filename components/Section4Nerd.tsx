import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Palette, Sparkles, Flame, Monitor, Terminal, User } from 'lucide-react';
import canvasConfetti from 'canvas-confetti';

// --- Scene Configurations ---

type SceneId = 'art' | 'lotr' | 'hunger' | 'loki';

interface SceneConfig {
  id: SceneId;
  label: string;
  icon: React.ReactNode;
}

const SCENES: SceneConfig[] = [
  { id: 'art', label: 'The Creative Spark', icon: <Palette size={18} /> },
  { id: 'lotr', label: 'The Elven Realm', icon: <Sparkles size={18} /> },
  { id: 'hunger', label: 'The Revolution', icon: <Flame size={18} /> },
  { id: 'loki', label: 'The Timeline', icon: <Monitor size={18} /> },
];

interface Section4NerdProps {
  containerRef?: React.RefObject<HTMLElement>;
}

export const Section4Nerd: React.FC<Section4NerdProps> = ({ containerRef }) => {
  const [currentSceneIdx, setCurrentSceneIdx] = useState(0);
  const [isGlorious, setIsGlorious] = useState(false); // Finale state
  const [isConfirmed, setIsConfirmed] = useState(false); // Image reveal state
  const currentScene = SCENES[currentSceneIdx];

  const nextScene = () => {
    setCurrentSceneIdx((prev) => (prev + 1) % SCENES.length);
  };

  const prevScene = () => {
    setCurrentSceneIdx((prev) => (prev - 1 + SCENES.length) % SCENES.length);
  };

  // Logic for Loki Scene Finale
  useEffect(() => {
    if (currentScene.id === 'loki') {
      setIsGlorious(false);
      setIsConfirmed(false);
      
      // Sync with "SACRED TIMELINE CONFIRMED" text reveal (approx 5.5s)
      const confirmTimer = setTimeout(() => {
        setIsConfirmed(true);
      }, 5500);

      // Sync with "For All Time. Always." text (approx 7.0s)
      const gloriousTimer = setTimeout(() => {
        setIsGlorious(true);
        triggerLokiConfetti();
      }, 7000);

      return () => {
        clearTimeout(confirmTimer);
        clearTimeout(gloriousTimer);
      };
    } else {
      setIsGlorious(false);
      setIsConfirmed(false);
    }
  }, [currentSceneIdx]);

  const triggerLokiConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const colors = ['#C9A86A', '#FFD700', '#ffffff']; // Sacred Gold & White

    (function frame() {
      // Left Cannon
      canvasConfetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
        shapes: ['square'], // Retro feel
        scalar: 1.2
      });
      // Right Cannon
      canvasConfetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
        shapes: ['square'],
        scalar: 1.2
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  return (
    <motion.div 
      className="relative w-full h-full overflow-hidden flex flex-col justify-center items-center transition-colors duration-700"
      initial={{ width: "95%", opacity: 0 }}
      whileInView={{ width: "100%", opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      viewport={{ once: false }}
    >
      
      {/* 1. SCENE: ART (The Creative Spark) - VISUAL REFACTOR */}
      {currentScene.id === 'art' && (
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900 via-orange-800 to-rose-900 flex flex-col items-center justify-center overflow-hidden">
           
           {/* Ambient Glows (Darker/Richer) */}
           <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 0.4 }}
             transition={{ duration: 2, ease: "easeOut" }}
             className="absolute top-0 left-0 w-[600px] h-[600px] bg-rose-600 rounded-full blur-[120px] mix-blend-screen opacity-20"
           />
           <motion.div 
             initial={{ scale: 0, opacity: 0 }}
             animate={{ scale: 1, opacity: 0.3 }}
             transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
             className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-600 rounded-full blur-[120px] mix-blend-screen opacity-20"
           />
           
           {/* Grain Texture */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>

           <motion.div 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ duration: 1 }}
             className="relative z-10 max-w-5xl text-center p-10 md:p-16 border border-white/10 rounded-3xl bg-black/20 backdrop-blur-md shadow-2xl"
           >
              {/* Elegant Line Decoration */}
              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto mb-8 opacity-60"></div>

              <h2 className="text-5xl md:text-8xl font-serif italic text-white mb-10 drop-shadow-md">
                The Creative Spark
              </h2>
              
              <div className="space-y-8">
                <p className="text-lg md:text-2xl font-sans uppercase tracking-[0.15em] font-light text-white/90 leading-relaxed max-w-3xl mx-auto">
                  "I WANT YOU TO Rediscover your passion for Art & Creativity."
                </p>
                
                <div className="flex items-center justify-center gap-4 opacity-50 my-6">
                   <div className="h-[1px] w-12 bg-white"></div>
                   <Palette size={24} className="text-amber-200" />
                   <div className="h-[1px] w-12 bg-white"></div>
                </div>

                <p className="text-3xl md:text-5xl font-serif text-[#FFD700] tracking-wide drop-shadow-[0_0_25px_rgba(255,215,0,0.4)] animate-pulse">
                  "I WANT TO SEE IT !!!"
                </p>
              </div>

              <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-amber-200 to-transparent mx-auto mt-12 opacity-60"></div>
           </motion.div>
        </div>
      )}

      {/* 2. SCENE: LOTR (The Elven Realm) */}
      {currentScene.id === 'lotr' && (
        <div className="absolute inset-0 bg-[#4B5320] flex flex-col items-center justify-center overflow-hidden">
          {/* Dense Grain Overlay */}
          <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')]"></div>
          
          {/* Vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000000_100%)] opacity-80 pointer-events-none"></div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="relative z-10 max-w-4xl px-8 text-center"
          >
             {/* Celtic/Elven Border simulation */}
             <div className="border-t-2 border-b-2 border-[#D4AF37]/30 py-12 relative">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#D4AF37] text-2xl">❖</div>
               <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 text-[#D4AF37] text-2xl">❖</div>

               <p className="font-garamond text-[#D4AF37] text-xl md:text-2xl italic mb-8 opacity-80">
                 "I Owe you a massive apology for falling asleep while watching Your favourite movie. Can you please forgive me for that?"
               </p>

               {/* The One Ring Interaction */}
               <h3 className="font-garamond text-4xl md:text-6xl text-[#FFD700] cursor-pointer transition-all duration-500 hover:text-[#FF4500] hover:text-shadow-[0_0_20px_#FF4500] group relative">
                 "Restoration Plan: <br/>
                 <span className="font-bold">CAN WE HAVE A LOTR DATE???"</span>
               </h3>
               
               <p className="mt-8 font-garamond text-[#D4AF37] text-lg opacity-60">
                 (Hover over the text above to reveal the fire within)
               </p>
             </div>
          </motion.div>
        </div>
      )}

      {/* 3. SCENE: HUNGER GAMES (The Revolution) */}
      {currentScene.id === 'hunger' && (
        <div className="absolute inset-0 bg-[#1A1A1A] flex flex-col items-center justify-center overflow-hidden">
           {/* Concrete Texture */}
           <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')]"></div>
           
           <motion.div 
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             transition={{ duration: 0.8 }}
             className="relative z-10 w-full max-w-3xl p-8 md:p-12 panem-card rounded-xl overflow-hidden group"
           >
              {/* Scanning Line Animation */}
              <motion.div 
                className="absolute top-0 left-0 w-full h-[2px] bg-[#00F2FF]/50 shadow-[0_0_10px_#00F2FF] z-20 pointer-events-none"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />

              <div className="flex justify-between items-center mb-10 border-b border-white/10 pb-4">
                 <div className="text-xs font-oswald text-[#00F2FF] tracking-[0.2em] uppercase">Panem Secure Channel</div>
                 <Flame size={20} className="text-[#D4AF37]" />
              </div>

              <div className="text-center space-y-8">
                 <h2 className="text-3xl md:text-5xl font-oswald font-bold text-[#F2F2F2] uppercase tracking-wide">
                   "I want to be your <span className="text-[#D4AF37]">Peeta Mellark</span>."
                 </h2>

                 <div className="grid grid-cols-2 gap-4 text-left font-sans text-sm text-neutral-400">
                    <div className="border-l-2 border-[#00F2FF]/30 pl-4">
                       <p className="uppercase text-[10px] tracking-widest text-[#00F2FF] mb-1">Confession</p>
                       <p>"I'm sorry for being mean to the plotholes! I was watching as a critique."</p>
                    </div>
                    <div className="border-l-2 border-[#D4AF37]/30 pl-4">
                       <p className="uppercase text-[10px] tracking-widest text-[#D4AF37] mb-1">Proposal</p>
                       <p>"I WANT TO FINISH ALL THE PARTS & I'm pretty sure I'd love the series."</p>
                    </div>
                 </div>
              </div>
           </motion.div>
        </div>
      )}

      {/* 4. SCENE: LOKI (The Timeline) */}
      {currentScene.id === 'loki' && (
        <div className="absolute inset-0 bg-[#1A2F25] flex flex-col items-center justify-center overflow-hidden font-courier text-[#C9A86A]">
           {/* CRT Effects */}
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.05]"></div>
           <div className="absolute inset-0 scanlines opacity-20 pointer-events-none"></div>
           <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_60%,#000000_100%)] opacity-80 pointer-events-none"></div>
           
           <motion.div 
             className={`relative z-10 w-full max-w-6xl p-6 md:p-12 border-2 bg-[#1A2F25]/80 rounded-lg min-h-[500px] flex flex-col transition-all duration-1000 ${
               isGlorious 
                 ? "border-[#C9A86A] shadow-[0_0_100px_rgba(201,168,106,0.8)] bg-[#1A2F25]/95 scale-105" 
                 : "border-[#C9A86A]/20 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
             }`}
             style={{ textShadow: "0 0 5px rgba(201, 168, 106, 0.5)" }}
           >
              {/* Header */}
              <div className="flex items-center justify-between gap-2 mb-8 opacity-70 border-b border-[#C9A86A]/30 pb-2">
                 <div className="flex items-center gap-2">
                    <Terminal size={16} />
                    <span className="text-xs tracking-widest">TVA TEMPAD V.2.14</span>
                 </div>
                 <div className="flex gap-1">
                   <div className="w-2 h-2 rounded-full bg-[#C9A86A] animate-pulse"></div>
                 </div>
              </div>

              {/* SPLIT CONTENT: LEFT (TEXT) - RIGHT (IMAGE) */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                
                {/* LEFT COLUMN: COMMAND LINE */}
                <div className="space-y-6 text-lg md:text-2xl font-bold tracking-tight order-2 md:order-1">
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <span>&gt; COMMAND: </span>
                    <span className="text-white">SEARCH_FOR_MEANING</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    <span>&gt; SCANNING TIMELINES... </span>
                    <span className="text-[#C9A86A] animate-pulse">[100%]</span>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8 }}
                  >
                    <span>&gt; VARIANT DETECTED: </span>
                    <span className="text-white bg-[#C9A86A]/20 px-2">NICHOLE</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 4.0 }}
                  >
                    <span>&gt; ANALYSIS: </span>
                    <span className="text-white">SHE IS THE ONE.</span>
                  </motion.div>

                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 5.5, duration: 0.5 }}
                    className="pt-8 border-t border-[#C9A86A]/30 mt-4"
                  >
                    <span className="block mb-2 text-sm opacity-70">&gt; RESULT:</span>
                    <span className="text-3xl md:text-5xl font-bold text-[#C9A86A] drop-shadow-[0_0_10px_rgba(201,168,106,0.8)] animate-pulse">
                      STATUS: SACRED TIMELINE CONFIRMED
                    </span>
                  </motion.div>
                </div>

                {/* RIGHT COLUMN: VARIANT PROFILE PICTURE */}
                <div className="order-1 md:order-2 flex flex-col items-center justify-center">
                   <motion.div 
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ delay: 2.8, duration: 1 }}
                     className={`relative w-64 h-64 md:w-80 md:h-80 border-4 border-[#C9A86A] rounded-lg overflow-hidden transition-all duration-1000 ${
                       isConfirmed 
                         ? "grayscale-0 opacity-100 shadow-[0_0_60px_#C9A86A] border-[#FFD700]" 
                         : "grayscale opacity-50 shadow-none border-[#C9A86A]/50"
                     }`}
                   >
                     {/* 
                        REPLACE THIS PLACEHOLDER WITH YOUR IMAGE:
                        Path: public/images/nichole-variant.png
                     */}
                     <img 
                       src="/images/nichole-variant.png" 
                       alt="Variant L-1130" 
                       className="w-full h-full object-cover"
                       onError={(e) => {
                         // Fallback if image not found
                         e.currentTarget.style.display = 'none';
                         e.currentTarget.parentElement?.classList.add('bg-[#101010]', 'flex', 'items-center', 'justify-center');
                       }}
                     />
                     {/* Fallback Text (Hidden if image loads) */}
                     <div className="absolute inset-0 flex flex-col items-center justify-center -z-10">
                        <User size={64} className="opacity-20 mb-2" />
                        <span className="text-xs tracking-widest opacity-50">NO SIGNAL</span>
                     </div>
                     
                     {/* Scanline Overlay on Image */}
                     <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_4px,3px_100%] pointer-events-none"></div>
                   </motion.div>

                   <motion.div 
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     transition={{ delay: 3.0 }}
                     className="mt-4 text-xs md:text-sm tracking-[0.2em] bg-[#C9A86A]/10 px-4 py-2 rounded border border-[#C9A86A]/30"
                   >
                     VARIANT ID: 471-XWC (NICHOLE)
                   </motion.div>
                </div>
              </div>

              {/* Footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 7.0 }}
                className="pt-4 text-center text-sm md:text-base opacity-60 border-t border-[#C9A86A]/10 mt-auto"
              >
                <span>&gt; "FOR ALL TIME. ALWAYS."</span>
              </motion.div>
           </motion.div>
        </div>
      )}

      {/* --- SCENE CONTROLS --- */}
      <div className="absolute bottom-10 z-30 flex items-center gap-6">
        <button 
          onClick={prevScene}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
        >
          <ChevronLeft />
        </button>

        <div className="flex gap-3">
          {SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setCurrentSceneIdx(idx)}
              className={`group flex flex-col items-center gap-2 transition-all duration-300 ${currentSceneIdx === idx ? 'opacity-100 scale-110' : 'opacity-40 hover:opacity-70'}`}
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full border-2 flex items-center justify-center transition-all 
                ${currentSceneIdx === idx 
                  ? 'border-white bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'border-white/30 bg-black/50'}`}
              >
                <div className="text-white">
                  {scene.icon}
                </div>
              </div>
              <span className="text-[10px] md:text-xs text-white uppercase tracking-widest font-bold hidden md:block">
                {scene.label}
              </span>
            </button>
          ))}
        </div>

        <button 
          onClick={nextScene}
          className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-md"
        >
          <ChevronRight />
        </button>
      </div>
    </motion.div>
  );
};