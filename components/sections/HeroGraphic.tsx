export function HeroGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Phone body */}
      <rect x="70" y="20" width="140" height="248" rx="24" fill="white" stroke="#e2e8f0" strokeWidth="2" />

      {/* Notch */}
      <rect x="105" y="30" width="70" height="10" rx="5" fill="#f1f5f9" />

      {/* Screen */}
      <rect x="82" y="52" width="116" height="188" rx="10" fill="#f8fafc" />

      {/* Waveform bars — call in progress */}
      <rect x="102" y="115" width="8" height="30" rx="4" fill="#F59E0B" opacity="0.3" />
      <rect x="116" y="103" width="8" height="54" rx="4" fill="#F59E0B" opacity="0.5" />
      <rect x="130" y="95" width="8" height="70" rx="4" fill="#F59E0B" opacity="0.8" />
      <rect x="144" y="108" width="8" height="44" rx="4" fill="#F59E0B" opacity="0.6" />
      <rect x="158" y="118" width="8" height="24" rx="4" fill="#F59E0B" opacity="0.35" />

      {/* Checkmark circle — booked */}
      <circle cx="210" cy="80" r="30" fill="#FEF3C7" />
      <path
        d="M196 80 L207 91 L226 68"
        stroke="#F59E0B"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Calendar row — appointment confirmed */}
      <rect x="90" y="188" width="100" height="36" rx="8" fill="white" stroke="#e2e8f0" strokeWidth="1.5" />
      <rect x="98" y="196" width="24" height="20" rx="4" fill="#FEF3C7" />
      <path d="M104 207 L109 212 L118 202" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="130" y="199" width="50" height="5" rx="2.5" fill="#e2e8f0" />
      <rect x="130" y="208" width="34" height="4" rx="2" fill="#f1f5f9" />

      {/* Home bar */}
      <rect x="115" y="278" width="50" height="4" rx="2" fill="#e2e8f0" />

      {/* Signal arcs top right */}
      <path d="M236 42 Q248 30 260 42" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" fill="none" />
      <path d="M230 36 Q248 18 266 36" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" opacity="0.4" fill="none" />
      <path d="M224 30 Q248 6 272 30" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" opacity="0.2" fill="none" />
    </svg>
  )
}
