import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Stethoscope, Heart, Ambulance, Activity, Cross, Syringe } from 'lucide-react';

// Floating Icon Component
const FloatingIcon = ({ children, delay, xOffset }: { children: React.ReactNode, delay: number, xOffset: number }) => (
  <motion.div
    initial={{ y: 0, opacity: 0.1, x: xOffset }}
    animate={{ 
      y: [-20, 20, -20],
      rotate: [-5, 5, -5]
    }}
    transition={{ 
      duration: 6,
      delay: delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
    className="absolute text-white pointer-events-none"
    style={{ left: `${Math.max(0, Math.min(100, xOffset + 50))}%` }} // Clamp position roughly
  >
    {children}
  </motion.div>
);

// New slow transitions for the cards
const slowRevealVariant: Variants = {
  hidden: { 
    opacity: 0, 
    y: 40, 
    filter: "blur(8px)",
    scale: 0.98
  },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    scale: 1,
    transition: { 
      duration: 1.8, 
      ease: [0.22, 1, 0.36, 1] // Custom "Ease Out Quint" feel for steady reveal
    } 
  }
};

export const Section2Paramedic: React.FC = () => {
  return (
    // UPDATED: Changed justify-center to justify-start and added pt-32/md:pt-40 to push content down significantly
    <div className="relative w-full h-full bg-gradient-to-b from-[#00334e] via-[#0f4c4c] to-[#002b2b] flex flex-col items-center justify-start pt-32 md:pt-40 px-6 pb-20 overflow-y-auto text-white overflow-x-hidden">
      
      {/* Background Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <FloatingIcon delay={0} xOffset={10}><Stethoscope size={120} /></FloatingIcon>
         <FloatingIcon delay={2} xOffset={80}><Heart size={80} /></FloatingIcon>
         <FloatingIcon delay={1} xOffset={20}><Activity size={150} opacity={0.05} /></FloatingIcon>
         <FloatingIcon delay={3} xOffset={70}><Ambulance size={100} /></FloatingIcon>
         <FloatingIcon delay={1.5} xOffset={40}><Cross size={60} /></FloatingIcon>
         <FloatingIcon delay={2.5} xOffset={90}><Syringe size={90} /></FloatingIcon>
      </div>

      {/* ECG Heartbeat Line - Improved visibility */}
      <div className="absolute inset-0 flex items-center opacity-20 pointer-events-none z-0">
        <svg width="100%" height="300" viewBox="0 0 1000 200" preserveAspectRatio="none">
          <motion.path
            d="M0,100 L50,100 L60,100 L70,80 L80,120 L90,100 L150,100 L160,100 L170,30 L180,170 L190,100 L250,100 L260,100 L270,80 L280,120 L290,100 L350,100 L360,100 L370,30 L380,170 L390,100 L450,100 L460,100 L470,80 L480,120 L490,100 L550,100 L560,100 L570,30 L580,170 L590,100 L1000,100"
            fill="none"
            stroke="#4ade80" // Bright green line
            strokeWidth="3"
            filter="drop-shadow(0 0 8px rgba(74, 222, 128, 0.5))"
            initial={{ pathLength: 0, x: -100 }}
            animate={{ pathLength: 1, x: 0 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </svg>
      </div>

      <div className="max-w-4xl w-full z-10 space-y-8 md:space-y-12 relative">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl md:text-7xl font-hand text-center mb-8 text-emerald-100 drop-shadow-[0_0_15px_rgba(52,211,153,0.4)]"
        >
          To My Future Paramedic
        </motion.h2>

        <motion.div 
          className="space-y-6 md:space-y-8 bg-black/20 backdrop-blur-md p-6 md:p-10 rounded-3xl border border-emerald-500/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.8 }
            }
          }}
        >
          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-xl md:text-2xl font-light leading-relaxed font-sans text-center text-emerald-50">
            I love how my Girl is kind, considerate & caring to strangers & is willing to dedicate her precious years of her entire life to helping people going through hard times.
          </motion.p>

          <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-2xl md:text-3xl font-hand text-teal-300 text-center">
            This choice itself shows how amazing you are Nichole.
          </motion.p>
          
          <motion.div variants={{ hidden: { opacity: 0, scale: 0.80 }, visible: { opacity: 1, scale: 1 } }} className="p-6 bg-emerald-900/40 rounded-xl border-l-4 border-emerald-400 shadow-inner">
             <p className="text-4xl md:text-6xl font-fleur text-white leading-relaxed text-center tracking-wide drop-shadow-md">
               I was the happiest person alive when we were in the study room and you said you got into Paramedicine
             </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div variants={slowRevealVariant} className="bg-white/5 p-4 rounded-lg border border-white/10">
               <p className="text-lg font-light italic text-center text-emerald-100/90">
                 Can't wait to see you in the Paramedic Uniform. Hope you're blessed with every life you save.
               </p>
            </motion.div>

            <motion.div variants={slowRevealVariant} className="bg-white/5 p-4 rounded-lg border border-white/10">
               <p className="text-lg font-light italic text-center text-emerald-100/90">
                 I'd be so proud to show off and tell that my girlfriend is a paramedic (I just got goosebumps writing this sentence).
               </p>
            </motion.div>
          </div>

          <motion.p variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-base md:text-lg text-emerald-200/70 font-sans border-t border-emerald-500/30 pt-6 text-center">
            Don't stress baby... You'll do amazing with your degree. If you ever feel overwhelmed with studies or anything I'm always here for you & I always have my shoulder for you to lean on and yapp about your problems.
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};