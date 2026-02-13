import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SuccessOverlay } from './SuccessOverlay';

// Left/Right Narrative Block
const NarrativeBlock = ({
  header,
  detail,
  align = 'left',
  delay = 0
}: {
  header: string,
  detail: string,
  align?: 'left' | 'right' | 'center',
  delay?: number
}) => {
  const isCenter = align === 'center';
  const isRight = align === 'right';

  return (
    <motion.div
      initial={{ opacity: 0, x: isCenter ? 0 : (isRight ? 50 : -50) }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, delay, ease: "easeOut" }}
      className={`flex flex-col ${isCenter ? 'items-center text-center' : (isRight ? 'items-end text-right' : 'items-start text-left')} space-y-4 max-w-4xl mx-auto px-6 w-full`}
    >
      <h3 className="font-serif italic text-4xl md:text-6xl text-white drop-shadow-lg leading-tight">
        {header}
      </h3>
      <div className={`w-24 h-[1px] bg-rose-200/50 ${isCenter ? 'mx-auto' : ''}`}></div>
      <p className="font-sans font-light text-lg md:text-xl text-rose-100/90 leading-relaxed max-w-2xl">
        {detail}
      </p>
    </motion.div>
  );
};

export const Section7Finale: React.FC = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <div id="dream-finale-section" className="relative w-full h-full overflow-y-auto overflow-x-hidden bg-gradient-to-br from-[#450a0a] via-[#7f1d1d] to-[#991b1b] scroll-smooth text-white">
      
      {/* 1. BOKEH PARTICLES */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 blur-sm mix-blend-overlay"
            initial={{ 
              y: "110vh", 
              x: Math.random() * 100 + "vw", 
              opacity: 0,
              scale: 0.5
            }}
            animate={{ 
              y: "-10vh", 
              opacity: [0, 0.4, 0],
              scale: [0.5, 1, 0.5],
              x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)` 
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear" 
            }}
            style={{ 
              width: Math.random() * 15 + 5 + "px", 
              height: Math.random() * 15 + 5 + "px",
              backgroundColor: Math.random() > 0.5 ? '#fbbf24' : '#ffffff' // Gold or White
            }}
          />
        ))}
        {/* Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
      </div>

      {/* 2. SCROLL CONTAINER */}
      <div className="relative z-10 w-full pt-32 pb-40 flex flex-col gap-32 md:gap-48">
        
        {/* HERO INTRO */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-center px-6 flex flex-col items-center"
        >
          <h2 className="font-serif italic text-2xl md:text-3xl text-rose-200/80 mb-4 tracking-widest">
            The Vision
          </h2>
          <div className="h-16 w-[1px] bg-gradient-to-b from-transparent via-rose-300 to-transparent mb-8"></div>
          <p className="font-sans text-lg md:text-xl max-w-2xl text-rose-50 font-light leading-relaxed">
            I just need to tell you how you are so brave, beautiful & kind...<br/>
            <span className="font-serif italic text-3xl md:text-4xl block mt-6 text-white">You are my absolute baby!!</span>
          </p>
          
          <motion.div 
            animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 text-rose-200/50"
          >
            <ArrowDown size={28} />
          </motion.div>
        </motion.div>

        {/* NARRATIVE BLOCKS */}
        
        <NarrativeBlock 
          align="left"
          header="No Regrets"
          detail="I know leaving Vanuatu was hard, but don't ever feel bad for moving here. If you hadn't moved to Australia, we never would have met. Everything happened exactly how it was supposed to."
        />

        <NarrativeBlock 
          align="right"
          header="Winning Together"
          detail="I want us to both reach the top in our own fields. Let’s work hard and be successful together so we can eventually just enjoy everything we’ve built as a team."
        />

        <NarrativeBlock 
          align="left"
          header="Two Homes"
          detail="A beach house here in Australia and another one in Hyderabad. We’re keeping our roots while building our future."
        />

        <NarrativeBlock 
          align="right"
          header="World Tours & Dogs"
          detail="Family trips across the globe and at least 2 dogs: that's Non-Negotiable!!"
        />

        <NarrativeBlock 
          align="left"
          header="Never Truly Alone"
          detail="Having our parents staying somewhere close by so we’re always taken care of."
        />

        <NarrativeBlock 
          align="center"
          header="The Secret"
          detail="I'm down to learn Bislama just so we can have our own secret language. (Telugu works too!)"
        />


        {/* THE BIG ASK */}
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 relative mt-20">
           
           {/* Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-t from-red-900 via-transparent to-transparent opacity-50 pointer-events-none"></div>

           <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 1 }}
             className="relative z-10 text-center space-y-12"
           >
             <div className="border-y border-white/20 py-10 max-w-3xl mx-auto backdrop-blur-sm bg-black/10">
               <p className="font-serif italic text-3xl md:text-5xl text-rose-100 leading-tight">
                 "You deserve me. I deserve you.<br/>
                 <span className="font-sans not-italic font-bold text-lg md:text-xl tracking-widest mt-4 block text-white/80">IT JUST MAKES SENSE.</span>"
               </p>
             </div>

             <h1 className="font-serif font-extrabold text-5xl md:text-8xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] leading-none tracking-tight pt-10">
               WILL YOU BE MY<br/>VALENTINE, BABY??
             </h1>

             <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSuccess(true)}
                  className="px-12 py-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-sans text-xl font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all"
                >
                  YES
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowSuccess(true)}
                  className="px-12 py-6 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-sans text-xl font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:shadow-[0_0_50px_rgba(255,255,255,0.3)] transition-all"
                >
                  ALSO YES
                </motion.button>
             </div>
           </motion.div>
        </div>

      </div>

      {showSuccess && <SuccessOverlay />}
    </div>
  );
};