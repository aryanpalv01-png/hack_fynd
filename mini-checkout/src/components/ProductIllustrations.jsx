import React from 'react';

/**
 * Clean e-commerce product graphics (Flipkart / Myntra style).
 * Crisp vector line art with realistic hardware colors, shadows, and contrast.
 */

export function MouseSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%">
      <defs>
        <radialGradient id="mouseGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2874f0" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#2874f0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="mouseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2c3e50" />
          <stop offset="100%" stopColor="#1a252f" />
        </linearGradient>
      </defs>
      <circle cx="100" cy="100" r="85" fill="url(#mouseGlow)" />
      {/* Mouse Silhouette */}
      <path
        d="M68 70 C68 35 82 20 100 20 C118 20 132 35 132 70 L134 125 C134 160 118 180 100 180 C82 180 66 160 66 125 Z"
        fill="url(#mouseGrad)"
        stroke="#e2e8f0"
        strokeWidth="1.5"
      />
      {/* Primary buttons split */}
      <path
        d="M68 70 C68 36 82 22 100 22 C118 22 132 36 132 70"
        fill="#34495e"
      />
      <line x1="100" y1="22" x2="100" y2="72" stroke="#1a252f" strokeWidth="2" />
      {/* Scroll wheel */}
      <rect x="93" y="34" width="14" height="26" rx="7" fill="#0f172a" stroke="#64748b" strokeWidth="1.2" />
      <line x1="95" y1="44" x2="105" y2="44" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="95" y1="50" x2="105" y2="50" stroke="#94a3b8" strokeWidth="1" strokeLinecap="round" />
      {/* DPI button & Logitech style brand accent */}
      <circle cx="100" cy="74" r="3.5" fill="#64748b" />
      <path d="M85 145 C92 155 108 155 115 145" stroke="#475569" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function KeyboardSVG() {
  const keysRow1 = [24, 40, 56, 72, 88, 104, 120, 136, 152];
  const keysRow2 = [24, 40, 56, 72, 88, 104, 120, 136, 152, 168];
  const keysRow3 = [46, 62, 78, 94, 110, 126, 142];

  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%">
      <defs>
        <radialGradient id="kbdGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fb641b" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fb641b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="100" cy="100" r="85" fill="url(#kbdGlow)" />
      {/* Keyboard Case */}
      <rect x="14" y="55" width="172" height="92" rx="8" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
      <rect x="18" y="59" width="164" height="84" rx="6" fill="#0f172a" />

      {/* Row 1 — Esc key colored in red/orange */}
      <rect x="24" y="65" width="12" height="10" rx="2" fill="#ef4444" />
      {keysRow1.slice(1).map((x, i) => (
        <rect key={`k1-${i}`} x={x} y="65" width="12" height="10" rx="2" fill="#334155" stroke="#475569" strokeWidth="0.5" />
      ))}
      <rect x="168" y="65" width="14" height="10" rx="2" fill="#475569" />

      {/* Row 2 */}
      {keysRow2.map((x, i) => (
        <rect key={`k2-${i}`} x={x} y="79" width="12" height="10" rx="2" fill="#334155" stroke="#475569" strokeWidth="0.5" />
      ))}

      {/* Row 3 */}
      <rect x="24" y="93" width="18" height="10" rx="2" fill="#475569" />
      {keysRow3.map((x, i) => (
        <rect key={`k3-${i}`} x={x} y="93" width="12" height="10" rx="2" fill="#334155" stroke="#475569" strokeWidth="0.5" />
      ))}
      <rect x="158" y="93" width="24" height="10" rx="2" fill="#2563eb" />

      {/* Spacebar Row */}
      <rect x="24" y="107" width="18" height="10" rx="2" fill="#475569" />
      <rect x="46" y="107" width="18" height="10" rx="2" fill="#475569" />
      <rect x="68" y="107" width="76" height="10" rx="2" fill="#475569" stroke="#64748b" strokeWidth="0.8" />
      <rect x="148" y="107" width="16" height="10" rx="2" fill="#475569" />
      <rect x="168" y="107" width="14" height="10" rx="2" fill="#475569" />

      {/* Bottom feet accent */}
      <rect x="30" y="123" width="140" height="3" rx="1.5" fill="#38bdf8" opacity="0.8" />
    </svg>
  );
}

export function HeadphonesSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%">
      {/* Arch headband */}
      <path d="M46 110 C46 52 68 28 100 28 C132 28 154 52 154 110" stroke="#0f172a" strokeWidth="6" strokeLinecap="round" />
      <path d="M54 100 C54 60 72 40 100 40 C128 40 146 60 146 100" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="3 3" />
      {/* Padded headband wrap */}
      <path d="M68 64 C76 46 86 38 100 36 C114 38 124 46 132 64" stroke="#2563eb" strokeWidth="4" strokeLinecap="round" />

      {/* Left Cup */}
      <rect x="34" y="102" width="26" height="48" rx="10" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" />
      <rect x="30" y="110" width="8" height="32" rx="4" fill="#0f172a" />
      <circle cx="47" cy="126" r="6" fill="#2563eb" />

      {/* Right Cup */}
      <rect x="140" y="102" width="26" height="48" rx="10" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.2" />
      <rect x="162" y="110" width="8" height="32" rx="4" fill="#0f172a" />
      <circle cx="153" cy="126" r="6" fill="#2563eb" />

      {/* Audio Wave / Cable Accent */}
      <path d="M47 150 C47 172 74 178 100 174" stroke="#64748b" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function DeskMatSVG() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="100%" height="100%">
      {/* Desk Mat Surface */}
      <rect x="16" y="50" width="168" height="100" rx="8" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
      {/* Stitched Edge */}
      <rect x="20" y="54" width="160" height="92" rx="6" stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 3" />

      {/* Keyboard footprint mockup */}
      <rect x="30" y="70" width="80" height="46" rx="4" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
      {[36, 46, 56, 66, 76, 86, 96].map((x, i) => (
        <rect key={`dm1-${i}`} x={x} y="76" width="6" height="5" rx="1" fill="#334155" />
      ))}
      {[36, 46, 56, 66, 76, 86, 96].map((x, i) => (
        <rect key={`dm2-${i}`} x={x} y="85" width="6" height="5" rx="1" fill="#334155" />
      ))}
      <rect x="52" y="96" width="36" height="5" rx="1" fill="#475569" />

      {/* Mouse footprint mockup */}
      <ellipse cx="145" cy="98" rx="14" ry="20" fill="#0f172a" stroke="#475569" strokeWidth="0.8" />
      <circle cx="145" cy="90" r="2.5" fill="#38bdf8" />

      {/* Size stamp */}
      <text x="100" y="165" fill="#64748b" fontSize="8.5" fontFamily="Inter, sans-serif" textAnchor="middle" fontWeight="600" letterSpacing="0.08em">
        900 × 400 MM · WATERPROOF
      </text>
    </svg>
  );
}
