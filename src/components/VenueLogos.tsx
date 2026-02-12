"use client";

const logoClass = "h-5 w-auto md:h-8";

const venues = [
  {
    name: "Sala Cosmos",
    logo: (
      <svg viewBox="0 0 120 40" fill="none" className={logoClass} aria-hidden>
        <text x="0" y="28" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="700" letterSpacing="0.12em" fill="white">
          COSMOS
        </text>
      </svg>
    ),
  },
  {
    name: "Paris15",
    logo: (
      <svg viewBox="0 0 100 40" fill="none" className={logoClass} aria-hidden>
        <text x="0" y="28" fontFamily="system-ui, sans-serif" fontSize="20" fontWeight="700" fill="white">
          Paris15
        </text>
      </svg>
    ),
  },
  {
    name: "Basshaus",
    logo: (
      <svg viewBox="0 0 140 40" fill="none" className={logoClass} aria-hidden>
        <text x="0" y="28" fontFamily="system-ui, sans-serif" fontSize="16" fontWeight="700" letterSpacing="0.2em" fill="white">
          BASSHAUS
        </text>
      </svg>
    ),
  },
  {
    name: "Pandora",
    logo: (
      <svg viewBox="0 0 110 40" fill="none" className={logoClass} aria-hidden>
        <text x="0" y="28" fontFamily="system-ui, sans-serif" fontSize="18" fontWeight="600" letterSpacing="0.05em" fill="white">
          Pandora
        </text>
      </svg>
    ),
  },
];

export default function VenueLogos() {
  return (
    <div className="mt-8 md:mt-10 flex flex-nowrap items-center justify-center gap-3 md:gap-14">
      {venues.map(({ name, logo }) => (
        <span key={name} className="flex shrink-0 items-center h-8 md:h-10 [&>svg]:drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
          {logo}
        </span>
      ))}
    </div>
  );
}
