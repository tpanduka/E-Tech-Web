import { motion } from 'motion/react';

interface EtechLogoProps {
  size?: number;
  className?: string;
}

export default function EtechLogo({ size = 48, className = "" }: EtechLogoProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={`relative select-none ${className}`}
      whileHover="hover"
      initial="initial"
    >
      <defs>
        {/* Shiny silver bezel linear gradient */}
        <linearGradient id="silver-bezel" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="30%" stopColor="#cbd5e1" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="70%" stopColor="#64748b" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>

        {/* Shiny 3D gloss gradient for the outer circle face */}
        <radialGradient id="dark-face" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1e24" />
          <stop offset="70%" stopColor="#0f0f12" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>

        {/* Glossy 3D red gradient for the 'E' badge */}
        <linearGradient id="brand-red-3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff4d5a" />
          <stop offset="35%" stopColor="#e50914" />
          <stop offset="70%" stopColor="#990008" />
          <stop offset="100%" stopColor="#4a0003" />
        </linearGradient>

        {/* Metallic chrome black gradient for the splashes */}
        <linearGradient id="droplet-black-3d" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#52525b" />
          <stop offset="30%" stopColor="#27272a" />
          <stop offset="70%" stopColor="#18181b" />
          <stop offset="100%" stopColor="#09090b" />
        </linearGradient>

        {/* Glow effect filter */}
        <filter id="logo-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Decorative Outer Bezel Structure */}
      <motion.circle
        cx="100"
        cy="100"
        r="92"
        className="fill-zinc-950/40"
        stroke="url(#silver-bezel)"
        strokeWidth="4"
        variants={{
          hover: { scale: 1.03, stroke: "#ff1a22", filter: "url(#logo-glow)" }
        }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      />

      {/* Subtle Inner Bezel Highlight Ring */}
      <circle
        cx="100"
        cy="100"
        r="86"
        fill="url(#dark-face)"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.15"
      />

      {/* Red Circular Incomplete 'E' Shape (Main Brand Graphic) */}
      <motion.path
        d="M 100 32 A 68 68 0 1 0 166 84 C 160 84 154 86 148 88 A 48 48 0 1 1 100 52 C 108 52 118 54 124 58 L 124 72 L 100 72 A 28 28 0 1 0 120 100 C 120 100 125 102 128 98 C 132 94 135 90 138 86 L 152 92 A 68 68 0 0 0 100 32 Z"
        fill="url(#brand-red-3d)"
        stroke="#4a0003"
        strokeWidth="1.5"
        variants={{
          hover: { scale: 1.04 }
        }}
        transition={{ type: "spring", stiffness: 180, damping: 12 }}
      />

      {/* Left cut/notch accent in red shape */}
      <rect
        x="50"
        y="45"
        width="14"
        height="8"
        fill="#0f0f12"
        transform="rotate(-40 50 45)"
        opacity="0.85"
      />

      {/* GLOSSY BLACK FLUID SPLASH/DROplets (Bottom Right Section) */}
      {/* 1. Central taller droplet pointing curves up */}
      <motion.path
        d="M 126 138 C 114 114 132 80 148 76 C 144 100 156 122 148 136 C 144 142 132 144 126 138 Z"
        fill="url(#droplet-black-3d)"
        stroke="#ffffff"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        variants={{
          hover: { rotate: 5, scale: 1.05 }
        }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
      />

      {/* 2. Left auxiliary droplet curves left */}
      <motion.path
        d="M 108 140 C 98 126 112 102 122 100 C 120 114 128 128 122 138 C 118 142 112 142 108 140 Z"
        fill="url(#droplet-black-3d)"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeOpacity="0.2"
        variants={{
          hover: { rotate: -4, scale: 1.04 }
        }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
      />

      {/* 3. Right auxiliary droplet curves right */}
      <motion.path
        d="M 144 144 C 136 128 152 112 160 110 C 158 124 164 136 158 142 C 154 146 148 146 144 144 Z"
        fill="url(#droplet-black-3d)"
        stroke="#ffffff"
        strokeWidth="0.6"
        strokeOpacity="0.2"
        variants={{
          hover: { rotate: 8, scale: 1.04 }
        }}
        transition={{ type: "spring", stiffness: 150, damping: 10 }}
      />

      {/* Highlight sheen layers for the 3D high-end feel */}
      <ellipse
        cx="100"
        cy="40"
        rx="25"
        ry="6"
        fill="#ffffff"
        opacity="0.15"
      />
    </motion.svg>
  );
}
