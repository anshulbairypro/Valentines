import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Sparkles, BookHeart } from 'lucide-react';

// --- Sub-components for Scrapbook Aesthetics ---

const Tape = ({ className }: { className?: string }) => (
  <div className={`absolute h-8 w-24 bg-white/30 backdrop-blur-sm rotate-[-2deg] shadow-sm ${className}`} style={{ clipPath: 'polygon(5% 0%, 95% 0%, 100% 5%, 100% 95%, 95% 100%, 5% 100%, 0% 95%, 0% 5%)' }}></div>
);

const FloatingParticles = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {[...Array(15)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-yellow-200/40 blur-[1px]"
        initial={{ y: "100vh", x: Math.random() * 100 + "vw", opacity: 0 }}
        animate={{ 
          y: "-10vh", 
          opacity: [0, 0.8, 0],
          x: `calc(${Math.random() * 100}vw + ${Math.random() * 50 - 25}px)`
        }}
        transition={{ 
          duration: Math.random() * 10 + 10, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 10
        }}
        style={{ width: Math.random() * 6 + 2 + "px", height: Math.random() * 6 + 2 + "px" }}
      />
    ))}
  </div>
);

// --- Blur Reveal Component for Premium Feel ---
const BlurRevealCard = ({ 
  children, 
  className = "", 
  rotate = 0 
}: { 
  children: React.ReactNode, 
  className?: string, 
  rotate?: number 
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  return (
    <motion.div
      initial={{ rotate: rotate, opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative cursor-pointer group ${className}`}
      onMouseEnter={() => setIsRevealed(true)}
      onMouseLeave={() => setIsRevealed(false)}
      onClick={() => setIsRevealed(!isRevealed)}
    >
      <motion.div
        animate={{ 
          rotate: isRevealed ? 0 : rotate,
          scale: isRevealed ? 1.02 : 1,
          boxShadow: isRevealed 
            ? "0 20px 40px -12px rgba(0,0,0,0.3)" 
            : "0 10px 15px -3px rgba(0,0,0,0.1)"
        }}
        transition={{ duration: 0.4, ease: "backOut" }}
        className="relative w-full h-full"
      >
        {children}

        {/* Blur Overlay */}
        <motion.div
          initial={{ opacity: 1, backdropFilter: "blur(5px)" }}
          animate={{ 
            opacity: isRevealed ? 0 : 1, 
            backdropFilter: isRevealed ? "blur(0px)" : "blur(5px)",
            pointerEvents: isRevealed ? "none" : "auto"
          }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] overflow-hidden"
        >
          <div className="bg-black/80 text-white/90 px-4 py-2 rounded border border-white/20 shadow-2xl backdrop-blur-md">
             <p className="text-xs font-mono tracking-[0.25em] uppercase">Confidential // Tap to Read</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// --- Main Component ---

export const Section3Faith: React.FC = () => {
  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center">
      
      {/* 1. TRANSITION CURTAIN: Starts as Medical Teal (prev section), slides up to reveal Golden Hour */}
      <motion.div 
        initial={{ y: "0%" }}
        whileInView={{ y: "-100%" }}
        viewport={{ once: false }}
        transition={{ duration: 1.2, ease: "easeInOut" }}
        className="absolute inset-0 z-50 bg-[#002b2b] pointer-events-none"
      />

      {/* 2. BACKGROUND: Golden Hour Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#78350f] z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
        <FloatingParticles />
        {/* Sun Flare */}
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-yellow-300/30 rounded-full blur-[100px]"
        />
      </div>

      {/* 3. CONTENT CONTAINER */}
      <div className="relative z-10 w-full h-full overflow-y-auto p-6 md:p-12 pb-32 no-scrollbar">
        <div className="max-w-4xl mx-auto flex flex-col items-center space-y-16 pt-10">
          
          {/* HEADLINE: Scrapbook Title */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 1 }}
            className="relative bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-xl border border-white/20 rotate-[-2deg]"
          >
             <Tape className="-top-4 left-1/2 -translate-x-1/2 rotate-[1deg]" />
             <div className="flex items-center gap-4 text-amber-100 mb-2 justify-center">
               <Sun size={32} className="animate-spin-slow" />
               <BookHeart size={32} />
             </div>
             <h2 className="text-4xl md:text-6xl font-hand text-center text-white drop-shadow-md leading-tight">
               Church, Sunday School &<br/>Youth Camps.
             </h2>
          </motion.div>

          {/* PRIDE SECTION */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-2xl"
          >
            <p className="text-xl md:text-3xl font-serif text-amber-50 leading-relaxed italic drop-shadow-sm">
               I'm so proud of you. I see how dedicated you are to your beliefs, and it inspires me every single day.
            </p>
          </motion.div>

          {/* CONFLICT / RESOLUTION: Glass Cards Stacked */}
          <div className="w-full grid md:grid-cols-2 gap-8 items-center">
             <motion.div 
               initial={{ x: -50, opacity: 0, rotate: -2 }}
               whileInView={{ x: 0, opacity: 1, rotate: -2 }}
               whileHover={{ scale: 1.02, rotate: 0 }}
               className="bg-black/20 backdrop-blur-md p-6 rounded-2xl border-l-4 border-amber-500 shadow-lg relative"
             >
                <Tape className="-top-3 -right-3 rotate-[45deg] bg-yellow-200/20" />
                <p className="text-lg text-amber-100/80 font-[Courier] tracking-tight">
                  I know your entire life is dedicated to God... I know you want to have a Christian boy as your partner...
                </p>
             </motion.div>

             <motion.div 
               initial={{ x: 50, opacity: 0, rotate: 2 }}
               whileInView={{ x: 0, opacity: 1, rotate: 2 }}
               whileHover={{ scale: 1.02, rotate: 0 }}
               className="bg-white/20 backdrop-blur-xl p-8 rounded-2xl border border-white/40 shadow-[0_8px_32px_rgba(255,215,0,0.2)] relative"
             >
                <Tape className="-bottom-3 -left-3 rotate-[-45deg]" />
                <p className="text-2xl md:text-3xl font-hand text-white font-bold leading-relaxed">
                  But out of all these personal beliefs, you Chose to stay with me.
                </p>
             </motion.div>
          </div>

          {/* KINETIC TYPOGRAPHY (The Climax) */}
          <div className="w-full py-10 flex flex-col items-center space-y-8 text-center mix-blend-overlay text-white/90">
             {/* 1. Fade in Slow */}
             <motion.h3 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 2.5 }}
               className="text-4xl md:text-6xl font-serif font-bold tracking-widest"
             >
               I FEEL HONOURED
             </motion.h3>

             {/* 2. Scale Up */}
             <motion.h3 
               initial={{ scale: 0.5, opacity: 0 }}
               whileInView={{ scale: 1.2, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8, type: "spring" }}
               className="text-4xl md:text-6xl font-bold text-amber-200"
             >
               I FEEL CHOSEN
             </motion.h3>

             {/* 3. Glow Effect */}
             <motion.h3 
               initial={{ opacity: 0 }}
               whileInView={{ 
                 opacity: 1,
                 textShadow: [
                   "0 0 20px rgba(255,255,255,0.8)", 
                   "0 0 50px rgba(255,215,0,1)", 
                   "0 0 20px rgba(255,255,255,0.8)"
                 ]
               }}
               viewport={{ once: true }}
               transition={{ 
                 opacity: { duration: 1.5 },
                 textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
               }}
               className="text-5xl md:text-7xl font-brush text-yellow-100 tracking-wider"
             >
               I FEEL SPECIAL
             </motion.h3>

             {/* 4. Heartbeat */}
             <motion.h3 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ 
                 opacity: 1, 
                 scale: [1, 1.05, 1] 
               }}
               viewport={{ once: true }}
               transition={{ 
                 opacity: { duration: 1.5 },
                 scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
               }}
               className="text-3xl md:text-5xl font-prism font-bold text-white mt-8 max-w-4xl tracking-wide leading-relaxed"
             >
               I FEEL EMOTIONAL & PROUD OF YOUR DECISION.
             </motion.h3>
          </div>

          {/* THE NOBODY & PROMISE - Premium Reveal */}
          <BlurRevealCard rotate={1} className="w-full max-w-3xl">
            <div className="relative w-full bg-white/80 backdrop-blur-xl p-8 md:p-12 rounded-[2px] shadow-2xl text-amber-900">
               {/* Paper Texture Effect */}
               <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper.png')] opacity-50 rounded-[2px]"></div>
               <Tape className="-top-4 right-1/4" />
               
               <div className="relative z-10 space-y-6">
                 <p className="text-lg md:text-xl font-[Courier] leading-relaxed">
                   This shows how strong you are. This shows how welcoming you are to a nobody. You chose to stay with a non believer with a hope.
                 </p>
                 
                 <hr className="border-amber-900/20" />
                 
                 <p className="text-lg md:text-xl font-[Courier] leading-relaxed text-amber-900 font-bold">
                   I'm still saying this to you. I'm impressed by your life Story, your missionary trips, All your cool stories & shared life with GOD. I'm still & forever open to being a person of your kind. I'm just hoping & waiting till your god finds me.
                 </p>
               </div>
            </div>
          </BlurRevealCard>

          {/* THE CRUSH - Final Note - Premium Reveal */}
          <BlurRevealCard rotate={3} className="max-w-lg w-full">
            <div className="bg-yellow-100 p-6 md:p-8 shadow-lg w-full border border-yellow-200/80">
               <div className="w-8 h-8 rounded-full bg-red-400/20 mx-auto mb-4 border border-red-400/50"></div>
               {/* Updated: Font-bold and larger text */}
               <p className="text-xl md:text-2xl font-[Courier] font-bold text-amber-900 text-center leading-relaxed">
                 Your Chruch, Sunday school, Youth Camps stories... I still wish I'm a part of it since childhood. I still wish I had met you as a kid... I'm pretty sure I'D HAVE HAD A MASSIVE CRUSH ON YOU!!
               </p>
               <div className="mt-4 text-center text-3xl"></div>
            </div>
          </BlurRevealCard>

        </div>
      </div>
    </div>
  );
};