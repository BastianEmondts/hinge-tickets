interface HingeLogoProps {
  /** Height of the "hinge" wordmark in pixels. Default: 28 */
  height?: number;
  /** Whether to show the "tickets" label. Default: true */
  showTickets?: boolean;
}

export function HingeLogo({ height = 28, showTickets = true }: HingeLogoProps) {
  const gradientId = 'hinge-logo-gradient';
  // Keep "THE" label proportional to the wordmark
  const labelSize = Math.round(height * 0.4);

  return (
    <span className="flex items-center gap-2 select-none">
      {/* SVG wordmark – matches the Hinge brand gradient & Nunito typeface */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height={height}
        viewBox="0 0 120 36"
        aria-label="hinge"
        role="img"
        style={{ display: 'block', overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E8196C" />
            <stop offset="100%" stopColor="#FF5214" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="30"
          fill={`url(#${gradientId})`}
          fontFamily="'Nunito', 'Poppins', 'Segoe UI Rounded', system-ui, sans-serif"
          fontWeight="800"
          fontSize="36"
          letterSpacing="-0.5"
        >
          hinge
        </text>
      </svg>

      {showTickets && (
        <span
          className="font-semibold uppercase tracking-widest text-white/60 leading-none"
          style={{ fontSize: labelSize }}
        >
          tickets
        </span>
      )}
    </span>
  );
}
