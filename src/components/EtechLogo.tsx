import { useState } from 'react';
import { motion } from 'motion/react';

interface EtechLogoProps {
  size?: number;
  className?: string;
}

export default function EtechLogo({ size = 48, className = "" }: EtechLogoProps) {
  const [imgSrc, setImgSrc] = useState('https://lh3.googleusercontent.com/d/1VH4sAlCW9NhkhNvuheiA07wCMQP-ZKuH');

  const handleImageError = () => {
    // If the preferred googleusercontent link fails, try the docs direct export link as fallback
    if (imgSrc === 'https://lh3.googleusercontent.com/d/1VH4sAlCW9NhkhNvuheiA07wCMQP-ZKuH') {
      setImgSrc('https://docs.google.com/uc?export=view&id=1VH4sAlCW9NhkhNvuheiA07wCMQP-ZKuH');
    }
  };

  return (
    <div className={`relative inline-block ${className}`} style={{ width: size, height: size }}>
      {/* Outer pulsing glow effect ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-brand-red/20 blur-md pointer-events-none"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* The Circular Frame */}
      <motion.div
        className="relative w-full h-full rounded-full overflow-hidden bg-white border border-brand-red/30 shadow-[0_0_15px_rgba(229,9,20,0.15)] flex items-center justify-center p-[8%]"
        animate={{
          y: [0, -3, 0],
        }}
        whileHover={{
          scale: 1.08,
          borderColor: 'rgb(229, 9, 20)',
          boxShadow: '0 0 20px rgba(229, 9, 20, 0.4)',
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          },
          scale: {
            type: "spring",
            stiffness: 300,
            damping: 15
          }
        }}
      >
        <img
          src={imgSrc}
          alt="E-Tech Solutions Logo"
          className="w-full h-full object-contain select-none rounded-full"
          onError={handleImageError}
          referrerPolicy="no-referrer"
        />
      </motion.div>
    </div>
  );
}
