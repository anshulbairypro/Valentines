import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ArrowLeft, Check, X, AlertCircle, ChevronDown } from 'lucide-react';

// --- SVGs ---

const CheeseMoonSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" className={className}>
    <defs>
      <radialGradient id="cheeseGradient" cx="50%" cy="50%" r="50%" fx="30%" fy="30%">
        <stop offset="0%" stopColor="#FFE082" />
        <stop offset="90%" stopColor="#FBC02D" />
        <stop offset="100%" stopColor="#F57F17" />
      </radialGradient>
      <filter id="craterShadow">
        <feDropShadow dx="1" dy="1" stdDeviation="0.5" floodColor="#9CA3AF" floodOpacity="0.5"/>
      </filter>
    </defs>
    {/* Main Moon Body */}
    <circle cx="100" cy="100" r="98" fill="url(#cheeseGradient)" stroke="#F57F17" strokeWidth="2" />
    
    {/* Craters (Holes) */}
    <g fill="#E65100" fillOpacity="0.2">
       <circle cx="60" cy="50" r="15" />
       <circle cx="140" cy="80" r="20" />
       <circle cx="90" cy="140" r="12" />
       <circle cx="40" cy="110" r="8" />
       <circle cx="160" cy="130" r="10" />
       <circle cx="120" cy="40" r="6" />
       <circle cx="170" cy="50" r="4" />
       <circle cx="25" cy="80" r="5" />
    </g>
  </svg>
);

const FloatingCrumb = ({ size, x, y, delay }: { size: number, x: number, y: number, delay: number }) => (
  <motion.div
    initial={{ opacity: 1, scale: 0 }}
    animate={{ opacity: 1, scale: 1, y: [y, y - 20, y], rotate: [0, 180, 360] }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: "easeInOut" }}
    className="absolute bg-yellow-300/60 rounded-full blur-[1px]"
    style={{ 
        width: size, 
        height: size, 
        left: `${x}%`, 
        top: `${y}%`,
        clipPath: "polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%)" // Rough rock shape
    }}
  />
);

const OceanWave = ({ className = "" }: { className?: string }) => (
  <div className={`absolute bottom-0 left-0 w-full overflow-hidden leading-[0] ${className}`}>
    <svg className="relative block w-[calc(100%+1.3px)] h-[150px] md:h-[250px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
      <motion.path 
        d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
        className="fill-white/10"
        initial={{ x: 0 }}
        animate={{ x: [-20, 0, -20] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      />
       <motion.path 
        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" 
        className="fill-teal-500/30"
        initial={{ x: 0 }}
        animate={{ x: [0, -50, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
    </svg>
  </div>
);

// --- ANIMATION VARIANTS ---

const bubbleVariant: Variants = {
  initial: { y: "120vh", opacity: 0, x: 0 },
  animate: (i: number) => ({
    y: "-20vh",
    opacity: [0, 1, 0],
    x: Math.sin(i) * 50, // Sway effect
    transition: {
      duration: 10 + Math.random() * 10,
      repeat: Infinity,
      delay: Math.random() * 5,
      ease: "linear"
    }
  })
};

const shakeVariant: Variants = {
  shake: {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.5 }
  }
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 2.5,
      delayChildren: 0.5
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 1, ease: "easeOut" }
  }
};

const ModalBubble = ({ delay }: { delay: number }) => (
  <motion.div
    initial={{ y: 500, opacity: 0 }}
    animate={{ y: -100, opacity: [0, 0.5, 0] }}
    transition={{ 
      duration: 3 + Math.random() * 3, 
      repeat: Infinity, 
      delay: delay,
      ease: "linear"
    }}
    className="absolute bg-white/20 rounded-full blur-[1px] pointer-events-none"
    style={{ 
      left: `${Math.random() * 100}%`, 
      width: `${Math.random() * 20 + 5}px`, 
      height: `${Math.random() * 20 + 5}px` 
    }}
  />
);

export const Section1Cheese: React.FC = () => {
  const [view, setView] = useState<'cheese' | 'vanuatu'>('cheese');
  const [showDeal, setShowDeal] = useState(false);
  const [dealAccepted, setDealAccepted] = useState(false);
  const [error, setError] = useState(false);
  const [bubbles, setBubbles] = useState<number[]>([]);
  
  // Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 700 };
  const moonX = useSpring(useTransform(mouseX, [0, 1], [-20, 20]), springConfig);
  const moonY = useSpring(useTransform(mouseY, [0, 1], [-20, 20]), springConfig);
  const textX = useSpring(useTransform(mouseX, [0, 1], [10, -10]), springConfig);
  const textY = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springConfig);

  useEffect(() => {
    setBubbles(Array.from({ length: 15 }, (_, i) => i));
    
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set(e.clientX / innerWidth);
      mouseY.set(e.clientY / innerHeight);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const handleWrongOption = () => {
    setError(true);
    setTimeout(() => setError(false), 1500);
  };

  const handleCorrectOption = () => {
    setDealAccepted(true);
    setError(false);
  };

  return (
    // UPDATED: Changed from h-full to h-screen to force height on deployment
    <div className="relative w-full h-screen overflow-hidden">
      
      {/* Background Layer */}
      <motion.div 
        className="absolute inset-0 z-0"
        animate={{ 
            background: view === 'cheese' 
                ? 'radial-gradient(circle at center, #E6B32E 0%, #B47D15 50%, #2D1B02 100%)' // Deep Galactic Cheese
                : '#00334e' 
        }}
        transition={{ duration: 1.5 }}
      />

      <AnimatePresence mode="wait">
        
        {/* --- CHEESE WORLD 2.0 (COSMIC THEME) --- */}
        {view === 'cheese' ? (
          <motion.div
            key="cheese-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 2, filter: "blur(20px)" }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full flex items-center justify-center overflow-hidden z-10"
          >
            {/* 1. The Rotating Cheese Moon (Background Layer) */}
            <motion.div 
                style={{ x: moonX, y: moonY }}
                className="absolute w-[120vh] h-[120vh] opacity-40 md:opacity-100 md:w-[800px] md:h-[800px] flex items-center justify-center z-0 pointer-events-none"
            >
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
                    className="w-full h-full"
                >
                    <CheeseMoonSVG className="w-full h-full drop-shadow-[0_0_100px_rgba(255,200,61,0.5)]" />
                </motion.div>
            </motion.div>

            {/* 2. Floating Cheese Asteroids (Parallax) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <FloatingCrumb 
                        key={i} 
                        size={Math.random() * 30 + 10} 
                        x={Math.random() * 100} 
                        y={Math.random() * 100} 
                        delay={i * 0.5} 
                    />
                ))}
            </div>

            {/* 3. Main Content (Foreground) */}
            <motion.div
               style={{ x: textX, y: textY }}
               className="relative z-10 max-w-5xl p-6 flex flex-col items-center text-center space-y-12"
            >
              {/* Top Text: The Jealousy */}
              <div className="space-y-4">
                  <h1 className="text-6xl md:text-8xl font-brush text-[#5D4037] drop-shadow-[0_4px_0_rgba(255,255,255,0.5)] transform -rotate-2">
                    I Know How Much<br/>You Love Cheese.
                  </h1>
                  <div className="bg-black/30 backdrop-blur-md px-6 py-2 rounded-full inline-block border border-white/20">
                    <p className="text-xl md:text-2xl font-sans font-bold text-yellow-100 tracking-wide">
                        I'm so jealous of cheese that you like it that much.
                    </p>
                  </div>
              </div>

              {/* Middle Card: The Moon Memory */}
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="max-w-2xl bg-white/20 backdrop-blur-xl border border-white/40 p-8 md:p-10 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.3)] relative overflow-hidden group"
              >
                 <div className="absolute -right-10 -top-10 w-40 h-40 bg-yellow-400/30 rounded-full blur-3xl group-hover:bg-yellow-300/50 transition-colors"></div>
                 <div className="relative z-10 space-y-6">
                    <p className="text-2xl md:text-3xl font-hand text-[#3E2723] font-bold leading-relaxed">
                        "Remember what you said in the car today? You wanted the moon... so I made it <span className="text-yellow-900 border-b-4 border-yellow-500">Cheesy</span>."
                    </p>
                    <p className="text-lg font-serif italic text-[#5D4037]/80">
                        "I don’t care how cheesy this sounds.... you’re the only one I want on my plate for the rest of my life."
                    </p>
                 </div>
              </motion.div>

              {/* Bottom: The Fondue Button */}
              <motion.button
                onClick={() => setView('vanuatu')}
                whileHover={{ 
                    scale: 1.1,
                    borderRadius: ["50px", "30px", "60px", "40px", "50px"],
                    boxShadow: "0 0 30px rgba(255, 193, 7, 0.6)"
                }}
                transition={{ borderRadius: { duration: 1, repeat: Infinity, ease: "easeInOut" } }}
                className="mt-8 bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 px-12 py-5 rounded-full font-brush text-3xl shadow-xl flex items-center gap-4 relative overflow-hidden border-4 border-yellow-100/50"
              >
                <span className="relative z-10">Let's melt into something better</span>
                <ArrowRight className="relative z-10" />
                {/* Liquid overlay effect */}
                <motion.div 
                    className="absolute inset-0 bg-white/30"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>

          </motion.div>
        ) : (
          /* --- VANUATU WORLD (Preserved Logic) --- */
          <motion.div
            key="vanuatu-content"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center p-6 md:p-8 text-center text-white z-10"
          >
             {/* Ocean Background Effects */}
             <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#006994] to-[#00334e]">
                <div className="absolute top-[-20%] left-[20%] w-[600px] h-[600px] bg-teal-300/10 rounded-full blur-[100px]" />
                {bubbles.map((i) => (
                  <motion.div
                    key={i}
                    custom={i}
                    variants={bubbleVariant}
                    initial="initial"
                    animate="animate"
                    className="absolute w-4 h-4 bg-white/20 rounded-full blur-[1px]"
                    style={{ left: `${Math.random() * 100}%`, width: Math.random() * 20 + 5 + 'px', height: Math.random() * 20 + 5 + 'px' }}
                  />
                ))}
                <div className="absolute bottom-0 w-full opacity-50"><OceanWave /></div>
                <div className="absolute bottom-[-20px] w-full opacity-30 scale-x-[-1] scale-y-[1.2]"><OceanWave /></div>
             </div>

            <motion.div 
               initial={{ height: '100%', y: '100%' }}
               animate={{ height: '0%', y: '100%' }}
               transition={{ duration: 1.5, ease: "circOut" }}
               className="absolute inset-0 bg-teal-600 z-50 pointer-events-none"
            />

            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setView('cheese')}
              className="absolute bottom-8 left-8 z-40 bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full font-bold shadow-[0_4px_20px_rgba(0,0,0,0.1)] flex items-center gap-2 border border-white/30 hover:bg-white/30 transition-all text-sm md:text-base"
            >
                <ArrowLeft className="w-5 h-5" /> Back to Space
            </motion.button>

            <AnimatePresence>
              {dealAccepted && !showDeal && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-10 right-10 z-40 flex flex-col items-center gap-2 text-teal-200"
                >
                   <span className="text-sm font-bold uppercase tracking-widest text-shadow-md">Next Chapter</span>
                   <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ChevronDown className="w-8 h-8" /></motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div 
              className="max-w-5xl space-y-8 md:space-y-12 z-20 flex flex-col items-center py-10 relative"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants} className="space-y-4">
                <p className="text-5xl md:text-7xl font-brush text-teal-50 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">I would love to visit Vanuatu.</p>
                <p className="text-xl md:text-2xl font-light font-sans text-teal-100 max-w-2xl mx-auto">I am so interested in knowing about your childhood in Vanuatu.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-white/10 backdrop-blur-lg border border-white/20 p-8 md:p-12 rounded-[2rem] shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] max-w-4xl relative overflow-hidden group">
                <div className="absolute -inset-full top-0 block h-full w-1/2 -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />
                <div className="space-y-6 relative z-10">
                  <p className="text-2xl md:text-4xl font-handmade text-white leading-relaxed tracking-wide">"Yes, you can show me off in Vanuatu to every person over there."</p>
                  <div className="w-16 h-1 bg-teal-300/50 mx-auto rounded-full" />
                  <p className="text-lg md:text-xl font-serif italic text-teal-50/90 leading-relaxed">I know how deeply Vanuatu is rooted in your heart. I'm so happy that you're a girl I can relate the rural experiences of mine from India.</p>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="mt-8">
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.4)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowDeal(true)}
                  className="bg-white/20 backdrop-blur-md text-white px-10 py-5 rounded-full font-bold shadow-2xl text-xl md:text-2xl flex items-center gap-3 border border-white/40 group hover:bg-white/30 transition-all"
                >
                  DEAL TIME!!
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ocean Themed Modal */}
      <AnimatePresence>
        {showDeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              className="relative max-w-lg w-full rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(45,212,191,0.2)] border border-white/20"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-teal-900/60 to-blue-950/80 backdrop-blur-2xl z-0"></div>
              <div className="absolute inset-0 pointer-events-none z-0">{[...Array(12)].map((_, i) => <ModalBubble key={i} delay={i * 0.3} />)}</div>
              <div className="absolute bottom-0 w-full z-0 opacity-40 mix-blend-screen"><OceanWave /></div>

              <div className="relative z-10 p-8 flex flex-col min-h-[550px] justify-center h-full">
                <button onClick={() => setShowDeal(false)} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors z-20 p-2 hover:bg-white/10 rounded-full"><X size={24} /></button>
                
                {!dealAccepted ? (
                  <motion.div animate={error ? "shake" : ""} variants={shakeVariant} className="flex flex-col h-full justify-center">
                    <AnimatePresence mode="wait">
                      {error && (
                         <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 bg-red-500/90 text-white px-6 py-4 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3 whitespace-nowrap"><AlertCircle size={24} /><span className="font-bold text-lg">Error! Try Again!!</span></motion.div>
                      )}
                    </AnimatePresence>
                    <h3 className="text-5xl font-brush text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-white mb-6 text-center drop-shadow-sm">So Here's the deal...</h3>
                    <p className="text-center text-teal-100/80 font-sans mb-10 text-xl font-light leading-relaxed">I visit Vanuatu <span className="mx-2 text-teal-400 inline-block animate-pulse font-bold">⇄</span> You visit India.</p>
                    <div className="space-y-4 font-sans relative z-10">
                      <button onClick={handleCorrectOption} className="w-full bg-gradient-to-r from-teal-500/80 to-teal-400/80 text-white p-5 rounded-2xl hover:from-teal-400 hover:to-teal-300 font-bold transition-all text-left flex justify-between items-center group shadow-[0_0_20px_rgba(20,184,166,0.3)] hover:shadow-[0_0_30px_rgba(20,184,166,0.5)] border border-teal-300/50 hover:scale-[1.02]"><span className="text-lg tracking-wide uppercase">A. YES</span> <span className="bg-white/20 p-1 rounded-full"><Check size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" /></span></button>
                      {['B. You don\'t have a choice', 'C. 🔪 (Just kidding... unless?)', 'D. B (See option B)'].map((opt, idx) => (
                        <button key={idx} onClick={handleWrongOption} className="w-full bg-white/5 text-teal-50/70 p-4 rounded-xl font-medium text-left border border-white/10 hover:bg-red-500/20 hover:border-red-400/50 hover:text-red-200 transition-all active:scale-98 backdrop-blur-sm">{opt}</button>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center py-8 flex flex-col items-center justify-center h-full">
                    <motion.div initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", bounce: 0.5 }} className="text-8xl mb-8 block drop-shadow-[0_10px_10px_rgba(0,0,0,0.3)]">🎉</motion.div>
                    <h3 className="text-5xl font-brush text-white mb-4 drop-shadow-md">It's Official!</h3>
                    <p className="text-xl text-teal-100 font-light mb-10">Passport ready? We're going global, baby.</p>
                    <button onClick={() => setShowDeal(false)} className="bg-white text-teal-900 px-10 py-4 rounded-full font-bold hover:bg-teal-50 transition-colors shadow-lg hover:shadow-xl hover:scale-105 transform duration-200">Close Deal</button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};