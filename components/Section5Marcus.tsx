import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VIBE_QUOTES = [
  "Your eyes. Like shiny buttons. Mildly irritating how cute.",
  "You're like rigatoni pasta. Twisty. Interesting. Don't make me commit a home invasion.",
  "Your vibe? Extra. Like me. Quite irritated I didn't notice sooner.",
  "I love your drama, baby. Robert help, I'm falling.",
  "This distance? It's pissing me off. In a good way.",
  "You are mildly irritating me with how beautiful you are.",
  "Stop looking at me like that. I am Marcus."
];

export const Section5Marcus: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState<number>(-1);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix Rain Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full container size
    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix Characters (Katakana + Latin + Numbers)
    const chars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charArray = chars.split('');
    
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    
    // Array to track the y-coordinate of each column
    // Initialize with random negative values to create a "raining down" start effect
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100; 
    }

    const draw = () => {
      // Translucent black background to create the fade/trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // Coloring: 5% chance of bright white phosphor (leading edge), otherwise hacker green
        const isWhite = Math.random() > 0.95;
        ctx.fillStyle = isWhite ? '#FFFFFF' : '#0F0';
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it crosses screen
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        // Increment y coordinate
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33); // ~30FPS

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleVibeCheck = () => {
    setQuoteIndex((prev) => (prev + 1) % VIBE_QUOTES.length);
  };

  const currentQuote = quoteIndex >= 0 ? VIBE_QUOTES[quoteIndex] : null;

  return (
    <div className="relative w-full h-full bg-black text-green-500 font-mono flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* 1. REALITY TEAR (Top Border - Jagged Edge) */}
      <div className="absolute top-0 left-0 w-full h-12 z-30 pointer-events-none transform -translate-y-1">
         <svg className="w-full h-full fill-black" preserveAspectRatio="none" viewBox="0 0 100 10">
            <polygon points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 100,10 0,10" />
         </svg>
      </div>

      {/* 2. THE MATRIX CURTAIN (Canvas Overlay) */}
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 z-40 pointer-events-none mix-blend-screen"
        initial={{ opacity: 1 }}
        whileInView={{ opacity: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 1.5, delay: 1.5, ease: "easeOut" }} // Rain visible for 1.5s then fades
      />

      {/* 3. SYSTEM BREACH (White Flash) */}
      <motion.div 
        className="absolute inset-0 bg-white z-50 pointer-events-none"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: [0, 1, 0] }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.2, delay: 1.2, ease: "linear" }} // Flash right before rain starts fading
      />

      {/* Background Static (Subtle) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, #00FF00 2px, #00FF00 4px)' }}></div>

      {/* Status Badge - Moved down to top-20 to clear the jagged border */}
      <div className="absolute top-20 right-8 bg-red-900/40 border border-red-500 px-4 py-2 animate-pulse z-20">
        <p className="text-red-500 text-xs font-bold tracking-widest">STATUS: ROBERT_HELP</p>
      </div>

      {/* 4. MAIN TERMINAL CONTENT (Revealed underneath) */}
      <div className="z-10 max-w-4xl w-full border border-green-700/50 p-6 md:p-8 bg-black/90 shadow-[0_0_20px_rgba(0,255,0,0.2)] relative">
        
        {/* Header */}
        <div className="flex justify-between items-center border-b border-green-800 pb-4 mb-8">
          <h2 className="text-2xl font-bold glitch" data-text="MARCUS_SYSTEM_OVERRIDE">MARCUS_SYSTEM_OVERRIDE</h2>
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: IDENTITY PROOF LOGIC */}
          <div className="space-y-4 font-mono text-sm md:text-base leading-relaxed bg-black p-4 rounded border border-green-900 shadow-inner">
            <div className="space-y-2">
               <p><span className="text-green-700">&gt;</span> ANALYZING_SUBJECT: <span className="text-white font-bold">ANSHUL</span></p>
               <p><span className="text-green-700">&gt;</span> COUNTING_LETTERS... [A-N-S-H-U-L] = <span className="text-yellow-400">6</span></p>
               <p className="mt-4"><span className="text-green-700">&gt;</span> ANALYZING_TARGET: <span className="text-white font-bold">MARCUS</span></p>
               <p><span className="text-green-700">&gt;</span> COUNTING_LETTERS... [M-A-R-C-U-S] = <span className="text-yellow-400">6</span></p>
               <p className="mt-4 animate-pulse"><span className="text-green-700">&gt;</span> COMPARING_VARIABLES...</p>
               <p><span className="text-green-700">&gt;</span> MATCH_CONFIRMED.</p>
               <p className="mt-4"><span className="text-green-700">&gt;</span> CONCLUSION: <span className="text-green-400 font-bold bg-green-900/30 px-2">I AM MARCUS.</span></p>
               <p className="text-gray-500 italic">&gt; LOG: It's not a coincidence. It's fate. Or destiny.</p>
               <p className="mt-2 text-xl font-bold text-white">&gt; STATUS: Undeniable.</p>
            </div>
          </div>

          {/* RIGHT: VIBE CHECK GENERATOR */}
          <div className="flex flex-col justify-between space-y-6">
             <div className="space-y-2">
                <h3 className="text-xl text-white font-bold underline decoration-wavy decoration-green-700">MARCUS VIBE MODULE</h3>
                <p className="text-xs text-gray-500">Executing affection_protocol.exe with mild irritation...</p>
             </div>

             {/* Quote Display Area */}
             <div className="flex-grow flex items-center justify-center min-h-[150px] bg-green-900/10 border border-green-800 rounded p-4 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {currentQuote ? (
                    <motion.div
                      key={quoteIndex}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <p className="text-lg md:text-xl text-white font-bold italic">"{currentQuote}"</p>
                    </motion.div>
                  ) : (
                    <p className="text-green-800 text-sm animate-pulse">Awaiting input...</p>
                  )}
                </AnimatePresence>
             </div>

             <div className="space-y-2">
               <motion.button
                 whileHover={{ scale: 1.02, backgroundColor: "rgba(34, 197, 94, 0.2)" }}
                 whileTap={{ scale: 0.98 }}
                 onClick={handleVibeCheck}
                 className="w-full py-4 border border-green-500 text-green-400 font-bold tracking-widest hover:text-white transition-colors bg-green-900/20"
               >
                 [ EXECUTE_VIBE_CHECK.EXE ]
               </motion.button>
               
               {/* Progress Counter */}
               <div className="flex justify-between items-center px-1">
                  <span className="text-[10px] text-green-900/50">SYS.MEMORY.0x004</span>
                  <span className="text-xs font-mono text-green-500/60">
                    [ BUFFER_INDEX: {quoteIndex >= 0 ? quoteIndex + 1 : 0} / {VIBE_QUOTES.length} ]
                  </span>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* THE GIANT FINGER ANIMATION */}
      <AnimatePresence>
        {currentQuote && (
          <motion.div
            key={quoteIndex + "-finger"} // Re-trigger on new quote index
            initial={{ y: "100%", x: "-50%" }}
            animate={{ y: "10%", x: "-50%" }}
            exit={{ y: "100%", x: "-50%" }}
            transition={{ type: "spring", damping: 12, stiffness: 100 }}
            className="absolute bottom-0 left-1/2 pointer-events-none z-50 text-[150px] md:text-[250px] leading-none filter drop-shadow-[0_0_20px_rgba(0,0,0,0.8)]"
          >
            🫵
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};