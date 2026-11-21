/**
 * ProductIllustrations.jsx
 * ------------------------
 * Crisp, scalable vector artwork for the 4 hardware catalog products.
 * Handcrafted pure SVGs ensuring 100% offline reliability without external CDN images.
 */

export function MouseSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="product-vector-art"
      aria-hidden="true"
    >
      {/* Background Soft Glow */}
      <circle cx="100" cy="100" r="75" fill="#F1F0EC" />
      <circle cx="100" cy="100" r="74" stroke="#E5E3DC" strokeWidth="1" strokeDasharray="3 3" />

      {/* Mouse Outer Body Contour */}
      <path
        d="M62 60 C62 30 76 18 100 18 C124 18 138 30 138 60 L140 126 C140 162 122 182 100 182 C78 182 60 162 60 126 Z"
        fill="#FFFFFF"
        stroke="#18181B"
        strokeWidth="2.5"
      />

      {/* Primary Click Split Seam */}
      <line x1="100" y1="18" x2="100" y2="76" stroke="#18181B" strokeWidth="1.8" />

      {/* Tactile Scroll Wheel */}
      <rect x="92" y="32" width="16" height="30" rx="8" fill="#F4F4F5" stroke="#18181B" strokeWidth="2" />
      <line x1="94" y1="42" x2="106" y2="42" stroke="#FF4D00" strokeWidth="2" strokeLinecap="round" />
      <line x1="94" y1="48" x2="106" y2="48" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="94" y1="54" x2="106" y2="54" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" />

      {/* High-Precision Optical Sensor Ring */}
      <circle cx="100" cy="120" r="11" stroke="#18181B" strokeWidth="2" fill="#FAFAFA" />
      <circle cx="100" cy="120" r="4" fill="#FF4D00" />

      {/* Ergonomic Palm Arcs */}
      <path d="M72 144 C84 158 116 158 128 144" stroke="#D4D4D8" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M66 98 C64 112 64 126 68 140" stroke="#E4E4E7" strokeWidth="1.5" />
      <path d="M134 98 C136 112 136 126 132 140" stroke="#E4E4E7" strokeWidth="1.5" />
    </svg>
  );
}

export function KeyboardSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="product-vector-art"
      aria-hidden="true"
    >
      {/* Background Soft Glow */}
      <rect x="15" y="45" width="170" height="110" rx="16" fill="#F1F0EC" />

      {/* Keyboard Outer Bezel */}
      <rect x="18" y="52" width="164" height="96" rx="8" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />

      {/* Keycap Row 1 */}
      <rect x="25" y="60" width="14" height="12" rx="2.5" fill="#FF4D00" stroke="#E03E00" strokeWidth="1" />
      {[43, 60, 77, 94, 111, 128, 145].map((x, i) => (
        <rect key={i} x={x} y="60" width="13" height="12" rx="2" fill="#F4F4F5" stroke="#27272A" strokeWidth="1" />
      ))}
      <rect x="162" y="60" width="12" height="12" rx="2" fill="#18181B" />

      {/* Keycap Row 2 */}
      <rect x="25" y="76" width="17" height="12" rx="2" fill="#E4E4E7" stroke="#27272A" strokeWidth="1" />
      {[46, 63, 80, 97, 114, 131, 148].map((x, i) => (
        <rect key={i} x={x} y="76" width="13" height="12" rx="2" fill="#F4F4F5" stroke="#27272A" strokeWidth="1" />
      ))}
      <rect x="165" y="76" width="9" height="12" rx="2" fill="#F4F4F5" stroke="#27272A" strokeWidth="1" />

      {/* Keycap Row 3 */}
      <rect x="25" y="92" width="20" height="12" rx="2" fill="#E4E4E7" stroke="#27272A" strokeWidth="1" />
      {[49, 66, 83, 100, 117, 134].map((x, i) => (
        <rect key={i} x={x} y="92" width="13" height="12" rx="2" fill="#F4F4F5" stroke="#27272A" strokeWidth="1" />
      ))}
      <rect x="151" y="92" width="23" height="12" rx="2" fill="#18181B" />

      {/* Keycap Row 4 (Spacebar & Arrows) */}
      <rect x="25" y="108" width="24" height="12" rx="2" fill="#E4E4E7" stroke="#27272A" strokeWidth="1" />
      {[53, 70, 87, 104, 121].map((x, i) => (
        <rect key={i} x={x} y="108" width="13" height="12" rx="2" fill="#F4F4F5" stroke="#27272A" strokeWidth="1" />
      ))}
      <rect x="138" y="108" width="16" height="12" rx="2" fill="#F4F4F5" stroke="#27272A" strokeWidth="1" />
      <rect x="158" y="108" width="16" height="12" rx="2" fill="#E4E4E7" stroke="#27272A" strokeWidth="1" />

      {/* Row 5: Spacebar */}
      <rect x="25" y="124" width="20" height="12" rx="2" fill="#E4E4E7" stroke="#27272A" strokeWidth="1" />
      <rect x="49" y="124" width="80" height="12" rx="2" fill="#FFFFFF" stroke="#18181B" strokeWidth="1.5" />
      <rect x="133" y="124" width="18" height="12" rx="2" fill="#E4E4E7" stroke="#27272A" strokeWidth="1" />
      <rect x="155" y="124" width="19" height="12" rx="2" fill="#18181B" />
    </svg>
  );
}

export function HeadphonesSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="product-vector-art"
      aria-hidden="true"
    >
      {/* Background Soft Glow */}
      <circle cx="100" cy="100" r="75" fill="#F1F0EC" />

      {/* Spring Steel Headband Arch */}
      <path
        d="M48 110 C48 55 70 30 100 30 C130 30 152 55 152 110"
        stroke="#18181B"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M60 100 C60 58 76 40 100 40 C124 40 140 58 140 100"
        stroke="#A1A1AA"
        strokeWidth="1.5"
        strokeDasharray="2 3"
      />

      {/* Headband Cushion Pad */}
      <path
        d="M74 38 C82 35 91 34 100 34 C109 34 118 35 126 38"
        stroke="#FF4D00"
        strokeWidth="4"
        strokeLinecap="round"
      />

      {/* Left Pivot Yoke */}
      <path d="M48 108 L48 122" stroke="#18181B" strokeWidth="3" />
      <rect x="36" y="112" width="24" height="48" rx="10" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
      <circle cx="48" cy="136" r="6" fill="#F4F4F5" stroke="#18181B" strokeWidth="1.5" />
      <circle cx="48" cy="136" r="2" fill="#FF4D00" />

      {/* Right Pivot Yoke */}
      <path d="M152 108 L152 122" stroke="#18181B" strokeWidth="3" />
      <rect x="140" y="112" width="24" height="48" rx="10" fill="#FFFFFF" stroke="#18181B" strokeWidth="2.5" />
      <circle cx="152" cy="136" r="6" fill="#F4F4F5" stroke="#18181B" strokeWidth="1.5" />
      <circle cx="152" cy="136" r="2" fill="#FF4D00" />

      {/* Braided Audio Cable */}
      <path
        d="M48 160 C48 180 80 185 100 176"
        stroke="#71717A"
        strokeWidth="2"
        strokeDasharray="3 2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DeskMatSVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="product-vector-art"
      aria-hidden="true"
    >
      {/* Perspective / Angled Desk Mat Surface */}
      <rect x="20" y="55" width="160" height="95" rx="8" fill="#18181B" stroke="#27272A" strokeWidth="2" />
      
      {/* Perimeter Micro-Stitching */}
      <rect
        x="24"
        y="59"
        width="152"
        height="87"
        rx="6"
        stroke="#FF4D00"
        strokeWidth="1.2"
        strokeDasharray="3 3"
      />

      {/* Coordinate Technical Grid Lines */}
      <line x1="24" y1="102" x2="176" y2="102" stroke="#27272A" strokeWidth="1" strokeDasharray="4 4" />
      <line x1="100" y1="59" x2="100" y2="146" stroke="#27272A" strokeWidth="1" strokeDasharray="4 4" />

      {/* Minimalist Desk Workstation Layout Outline on Mat */}
      {/* Keyboard Area */}
      <rect x="36" y="80" width="76" height="42" rx="3" stroke="#3F3F46" strokeWidth="1.5" fill="#27272A" />
      <rect x="52" y="112" width="44" height="6" rx="1.5" fill="#52525B" />

      {/* Mouse Area with Glide Path */}
      <ellipse cx="145" cy="101" rx="14" ry="20" stroke="#52525B" strokeWidth="1.5" fill="#27272A" />
      <circle cx="145" cy="101" r="3" fill="#FF4D00" />

      {/* Dimensional Metric Stamp */}
      <text x="36" y="73" fill="#A1A1AA" fontSize="8" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.06em">
        900 × 400 MM // 4MM THICK
      </text>
    </svg>
  );
}
