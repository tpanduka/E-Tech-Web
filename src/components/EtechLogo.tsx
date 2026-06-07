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
      {/* Global Defs for Text Arcs & Gradients */}
      <defs>
        {/* Top arc path for "E-TECH" */}
        <path
          id="logo-top-arc"
          d="M 35,100 A 65,65 0 0,1 165,100"
          fill="none"
        />
        {/* Bottom arc path for "SOLUTIONS" */}
        <path
          id="logo-bottom-arc"
          d="M 32,105 A 68,68 0 0,0 168,105"
          fill="none"
        />

        {/* Shiny radial gradient for the 3D glossy central orb */}
        <radialGradient id="logo-red-shiny" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ff4d5a" />
          <stop offset="50%" stopColor="#e50914" />
          <stop offset="100%" stopColor="#7a0007" />
        </radialGradient>

        {/* Glowing aura filter */}
        <filter id="logo-glow-filter" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Decorative Motherboard Circuit lines pulsing */}
      <g stroke="#e50914" strokeWidth="1.5" strokeOpacity="0.4" fill="none">
        {/* Top-Left circuit layout */}
        <motion.path
          d="M 12,32 L 44,32 L 64,52"
          variants={{
            initial: { pathLength: 0.85, strokeOpacity: 0.3 },
            hover: { pathLength: [0.85, 1, 0.85], strokeOpacity: [0.3, 0.9, 0.3], stroke: "#ffffff" }
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        />
        <circle cx="12" cy="32" r="3" fill="#e50914" />
        <circle cx="64" cy="52" r="2.5" fill="#ffffff" fillOpacity="0.4" />

        {/* Bottom-Right circuit layout */}
        <motion.path
          d="M 188,168 L 156,168 L 136,148"
          variants={{
            initial: { pathLength: 0.85, strokeOpacity: 0.3 },
            hover: { pathLength: [0.85, 1, 0.85], strokeOpacity: [0.3, 0.9, 0.3], stroke: "#ffffff" }
          }}
          transition={{ repeat: Infinity, duration: 2.2, delay: 0.6, ease: "easeInOut" }}
        />
        <circle cx="188" cy="168" r="3" fill="#e50914" />
        <circle cx="136" cy="148" r="2.5" fill="#ffffff" fillOpacity="0.4" />
      </g>

      {/* Outer circular bezel */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        fill="#141215"
        stroke="#e50914"
        strokeWidth="3.2"
        variants={{
          hover: { scale: 1.02, stroke: "#ff3341", filter: "url(#logo-glow-filter)" }
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />

      {/* Outer red glowing bezel border on hover */}
      <motion.circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1"
        strokeOpacity="0.25"
        initial={{ opacity: 0, scale: 0.98 }}
        variants={{
          hover: { opacity: 0.8, scale: 1.03 }
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Inside circle backdrop */}
      <circle cx="100" cy="100" r="71" fill="#1c1a1e" stroke="#3a363f" strokeWidth="1.2" />

      {/* Arched Text 'E-TECH' along top circular path */}
      <text fill="#ffffff" fontSize="20" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="4.5" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.9))">
        <textPath href="#logo-top-arc" startOffset="50%" textAnchor="middle">
          E-TECH
        </textPath>
      </text>

      {/* Arched Text 'SOLUTIONS' along bottom circular path */}
      <text fill="#ffffff" fontSize="15.5" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="3.5" filter="drop-shadow(0px 1px 3px rgba(0,0,0,0.9))">
        <textPath href="#logo-bottom-arc" startOffset="50%" textAnchor="middle">
          SOLUTIONS
        </textPath>
      </text>

      {/* Horizontal intersecting bar - left 'SINCE' | right '2012' */}
      <g>
        {/* Horizontal banner rectangle background */}
        <motion.rect
          x="12"
          y="88"
          width="176"
          height="24"
          fill="#e50914"
          rx="2"
          stroke="#100e11"
          strokeWidth="1.8"
          variants={{
            hover: { scaleY: 1.08, fill: "#ff121f" }
          }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        />

        {/* Vertical partitioning lines */}
        <line x1="48" y1="88" x2="48" y2="112" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.2" />
        <line x1="152" y1="88" x2="152" y2="112" stroke="#ffffff" strokeOpacity="0.4" strokeWidth="1.2" />

        {/* Left banner copy: SINCE */}
        <text x="30" y="104" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">
          SINCE
        </text>

        {/* Right banner copy: 2012 */}
        <text x="170" y="104" fill="#ffffff" fontSize="10" fontWeight="900" fontFamily="system-ui, sans-serif" textAnchor="middle" letterSpacing="0.5">
          2012
        </text>
      </g>

      {/* Central crisp white ring frame */}
      <circle cx="100" cy="100" r="35" fill="#ffffff" stroke="#100e11" strokeWidth="2.5" />

      {/* Central 3D glossy red core orb */}
      <motion.circle
        cx="100"
        cy="100"
        r="29"
        fill="url(#logo-red-shiny)"
        variants={{
          hover: { scale: 1.12, filter: "drop-shadow(0 0 5px rgba(229,9,20,0.5))" }
        }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      />

      {/* White glossy crescent reflection highlight inside red core */}
      <path
        d="M 82,90 A 20,20 0 0,1 113,81 A 24,24 0 0,0 82,90"
        fill="#ffffff"
        fillOpacity="0.45"
      />



      {/* Cyber scanning alignment horizontal line */}
      <motion.line
        x1="71"
        y1="100"
        x2="129"
        y2="100"
        stroke="#ffffff"
        strokeWidth="1.2"
        strokeOpacity="0.75"
        initial={{ y: -16 }}
        animate={{ y: [-16, 16, -16] }}
        transition={{
          repeat: Infinity,
          duration: 3.2,
          ease: "easeInOut"
        }}
      />
    </motion.svg>
  );
}
