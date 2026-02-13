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
    aspectClass: "aspect-square"
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
    text: "You really are my MJ.",
    src: "/videos/spiderman.mp4",
    aspectClass: "aspect-[9/16]"
  },
  {
    id: 5,
    title: "OBSESSED",
    text: "Just another angle of me.",
    src: "/videos/oggy.mp4",
    aspectClass: "aspect-[4/3]"
  },
  {
    id: 6,
    title: "LUCKY ENOUGH",
    text: "Say what can make me feel...",
    src: "/videos/lucky-enough.mp4",
    aspectClass: "aspect-[3/4]"
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
    e.stopPropagation(); // Prevent toggling play/pause
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

        {/* BOTTOM CONTROLS BAR - UPDATED STYLING */}
        <div 
          className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex items-center gap-4 transition-opacity duration-300 z-20"
          onClick={(e) => e.stopPropagation()} // Prevent playing when clicking controls background
        >
          {/* Play/Pause Mini Button */}
          <button 
            onClick={togglePlay} 
            className="text-white hover:text-rose-400 transition-colors p-1"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>

          {/* Seek Bar (Progress) - CUSTOM STYLED */}
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleSeek}
            className="flex-grow h-1.5 bg-white/30 rounded-full appearance-none cursor-pointer outline-none
                       [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full hover:[&::-webkit-slider-thumb]:scale-125 transition-all
                       [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:rounded-full"
          />

          {/* Mute Toggle */}
          <button 
             onClick={toggleMute} 
             className="text-white/80 hover:text-white transition-colors p-1"
             aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
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
  return (
    <div className="w-full bg-[#050505] flex flex-col items-center pt-32 pb-20">
      
      {/* HEADER */}
      <div className="mb-20 text-center px-4">
        <h2 className="text-4xl md:text-6xl font-serif text-white mb-4">The Gallery</h2>
        <p className="text-white/50 font-mono text-sm tracking-widest uppercase">Tap to Play Memories</p>
      </div>

      {/* FEED */}
      <div className="w-full flex flex-col gap-24 px-4 pb-12">
        {GALLERY_ITEMS.map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>

      {/* FINAL SCROLL INDICATOR */}
      <div className="flex flex-col items-center justify-center animate-bounce opacity-50 mt-12">
        <span className="text-white/60 text-xs uppercase tracking-[0.2em] mb-2">
          Scroll for Big Question
        </span>
        <ChevronDown className="text-white w-6 h-6" />
      </div>

    </div>
  );
};