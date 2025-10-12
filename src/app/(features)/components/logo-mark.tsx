const logoGradientId = "lnreader-logo-gradient";

export default function LogoMark() {
  return (
    <span className="relative inline-flex h-10 w-10 items-center justify-center">
      <svg
        width={40}
        height={40}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_16px_30px_rgba(18,42,143,0.45)]"
      >
        <defs>
          <linearGradient
            id={logoGradientId}
            x1="4"
            y1="6"
            x2="36"
            y2="32"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="60%" stopColor="var(--color-accent)" />
            <stop offset="100%" stopColor="var(--color-primary-strong)" />
          </linearGradient>
        </defs>
        <rect
          x="2.2"
          y="4.2"
          width="35.6"
          height="31.6"
          rx="9"
          stroke="url(#lnreader-logo-gradient)"
          strokeWidth="1.6"
          fill="rgba(88, 104, 255, 0.1)"
        />
        <path
          d="M12.5 11H27.2C28.1941 11 28.997 11.8184 28.997 12.8294V25.1706C28.997 26.1816 28.1941 27 27.2 27H20.2332C17.2749 27 15.8071 26.7033 14.3961 25.4871C13.9943 25.1412 13.4273 25.1612 13.0108 25.5134L11.4 26.875"
          stroke="url(#lnreader-logo-gradient)"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15.5 17.2H25.5M15.5 21.2H21.2"
          stroke="var(--color-foreground)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
