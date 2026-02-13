import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Play, Pause } from 'lucide-react';

interface GalleryItem {
  id: number;
  title: string;
  text: string;
  src: string;
  aspectClass: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 0,
    title: "MY TREAT",
    text: "The moment when I say 'Get anything you want'...",
    src: "/videos/shopping-cart.mp4",
    aspectClass: "aspect-[3/4]"
  },
  {
    id: 1,
    title: "OUR DANCE MOVES",
    text: "100% accurate.",
    src: "/videos/stickman.mp4",
    aspectClass: "aspect-[3/4]"
  },
  {
    id: 2,
    title: "THE STARE",
    text: "I literally get lost looking at you.",
    src: "/videos/lego-batman.mp4",
    aspectClass: "aspect-video"
  },
  {
    id: 3,
    title: "MY HEART",
    text: "Actual footage of my chest.",
    src: "/videos/jerry-heartbeat.mp4",
    aspectClass: "aspect-square"
  },
  {
    id: 4,
    title: "MY HERO",
    text: "You really are my Mary Jane.",
    src: "/videos/spiderman.mp4",
    aspectClass: "aspect-[9/16]"
  },
  {
    id: 5,
    title: "OBSESSED",
    text: "Just another angle of me.",
    src: "/videos/oggy.mp4",
    aspectClass: "aspect-[4/3]"
  }
];

// --- Single Video Card Component ---
const VideoCard = ({ item }: { item: GalleryItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false); // Default unmuted since it requires click to play
  const [progress, setProgress] = useState(0);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      if (duration > 0) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const manualChange = Number(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = (videoRef.current.duration / 100) * manualChange;
      setProgress(manualChange);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto p-4"
    >
      <div 
        className={`relative w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-black group ${item.aspectClass}`}
        onClick={togglePlay} // Click video to toggle
      >
        <video
          ref={videoRef}
          src={item.src}
          className="w-full h-full object-cover cursor-pointer"
          muted={isMuted}
          loop
          playsInline
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
        />
        
        {/* CENTER PLAY BUTTON (Visible when paused) */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300 pointer-events-none">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border border-white/30 shadow-lg">
              <Play fill="white" className="text-white ml-1" size={32} />
            </div>
          </div>
        )}

        {/* BOTTOM CONTROLS BAR */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-center gap-3 transition-opacity duration-300"
          onClick={(e) => e.stopPropagation()} // Prevent playing when clicking controls
        >
          {/* Play/Pause Mini Button */}
          <button onClick={togglePlay} className="text-white hover:text-rose-400 transition-colors">
            {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}
          </button>

          {/* Seek Bar (Progress) */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleSeek}
            className="flex-grow h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all"
          />

          {/* Mute Toggle */}
          <button onClick={toggleMute} className="text-white/80 hover:text-white transition-colors">
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>

      <div className="text-center space-y-2 pb-12 border-b border-white/10 w-full">
        <h3 className="text-2xl font-serif text-white tracking-widest">{item.title}</h3>
        <p className="text-white/70 font-sans font-light text-lg">{item.text}</p>
      </div>
    </motion.div>
  );
};

export const Section6Gallery: React.FC = () => {
  // FINALE VIDEO LOGIC
  const finaleVideoRef = useRef<HTMLVideoElement>(null);
  const [finalePlaying, setFinalePlaying] = useState(false);
  const [finaleMuted, setFinaleMuted] = useState(false);
  const [finaleProgress, setFinaleProgress] = useState(0);

  const toggleFinalePlay = () => {
    if (finaleVideoRef.current) {
      if (finalePlaying) {
        finaleVideoRef.current.pause();
      } else {
        finaleVideoRef.current.play();
      }
      setFinalePlaying(!finalePlaying);
    }
  };

  return (
    <div className="w-full bg-[#050505] flex flex-col items-center pt-32 pb-0">
      
      {/* HEADER */}
      <div className="mb-20 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">The Gallery</h2>
        <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Tap to Play Memories</p>
      </div>

      {/* FEED */}
      <div className="w-full flex flex-col gap-24 px-4 pb-32">
        {GALLERY_ITEMS.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>

      {/* FINALE VIDEO: LUCKY ENOUGH (With Controls) */}
      <div className="relative w-full h-screen mt-20 group">
        <video
          ref={finaleVideoRef}
          src="/videos/lucky-enough.mp4"
          className="w-full h-full object-cover cursor-pointer"
          muted={finaleMuted}
          loop
          playsInline
          onClick={toggleFinalePlay}
          onTimeUpdate={(e) => {
            const vid = e.currentTarget;
            if(vid.duration) setFinaleProgress((vid.currentTime / vid.duration) * 100);
          }}
        />
        
        {/* Simple Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50 pointer-events-none"></div>

        {/* Big Play Button for Finale (Before Start) */}
        {!finalePlaying && (
           <div 
             onClick={toggleFinalePlay}
             className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/60 cursor-pointer hover:bg-black/50 transition-colors"
           >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-20 h-20 bg-white/10 border border-white/50 rounded-full flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                 <Play size={40} fill="white" className="ml-2 text-white" />
              </motion.div>
              <p className="mt-4 text-white/80 font-serif tracking-widest text-sm uppercase">Tap to Reveal</p>
           </div>
        )}

        {/* Scroll Hint (Only shows when playing) */}
        {finalePlaying && (
          <div className="absolute bottom-20 w-full flex flex-col items-center justify-center animate-bounce z-20 pointer-events-none">
            <span className="text-white/80 text-xs uppercase tracking-[0.3em] mb-2 bg-black/20 backdrop-blur-sm px-4 py-1 rounded-full">
              Scroll for Finale
            </span>
            <ChevronDown className="text-white w-8 h-8 drop-shadow-md" />
          </div>
        )}

        {/* Finale Controls (Visible on Hover or Pause) */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex items-center gap-4 bg-gradient-to-t from-black via-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
           <button onClick={toggleFinalePlay} className="text-white hover:text-rose-400">
             {finalePlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
           </button>
           
           <input 
             type="range" 
             value={finaleProgress}
             onChange={(e) => {
               if(finaleVideoRef.current) finaleVideoRef.current.currentTime = (finaleVideoRef.current.duration / 100) * Number(e.target.value);
             }}
             className="flex-grow h-1 bg-white/30 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
           />

           <button onClick={() => {
              if (finaleVideoRef.current) {
                finaleVideoRef.current.muted = !finaleVideoRef.current.muted;
                setFinaleMuted(finaleVideoRef.current.muted);
              }
           }} className="text-white">
             {finaleMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
           </button>
        </div>
      </div>

    </div>
  );
};