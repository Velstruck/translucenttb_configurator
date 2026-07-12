export default function TbConfigIcon({ size = 32, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGlow" x1="50%" y1="20%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#67E8F9"/>
          <stop offset="100%" stopColor="#3B82F6"/>
        </linearGradient>
        
        <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      <circle cx="128" cy="128" r="78" fill="none" stroke="#67E8F9" strokeWidth="18" opacity="0.25" filter="url(#softGlow)"/>
      <circle cx="128" cy="128" r="62" fill="#1E2937"/>
      <circle cx="128" cy="128" r="62" fill="url(#logoGlow)" opacity="0.35"/>
      <circle cx="128" cy="128" r="42" fill="#0F172A"/>
      
      <text 
        x="128" 
        y="133" 
        textAnchor="middle" 
        dominantBaseline="middle" 
        fill="#67E8F9" 
        fontFamily="Arial Black, sans-serif" 
        fontSize="78" 
        fontWeight="900" 
        letterSpacing="-6"
        paintOrder="stroke fill"
        stroke="#0F172A"
        strokeWidth="4">T</text>

      <circle cx="128" cy="128" r="48" fill="none" stroke="#BAE6FD" strokeWidth="6" opacity="0.55"/>
    </svg>
  );
}