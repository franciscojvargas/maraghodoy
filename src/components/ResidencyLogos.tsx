import Image from "next/image";

const logoClass =
  "object-contain object-center drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]";

/**
 * Tamaños igualados por peso óptico, no por caja: Cosmos es casi cuadrado y
 * Oscura un logotipo 5,5:1, así que el mismo alto los descompensaría.
 */
export default function ResidencyLogos() {
  return (
    <div className="my-6 flex items-center justify-center gap-6 sm:my-8 sm:gap-10">
      <span className="relative block h-20 w-20 sm:h-24 sm:w-24">
        <Image
          src="/images/venues/cosmos.webp"
          alt="Cosmos Club"
          fill
          className={logoClass}
          sizes="(max-width: 640px) 80px, 96px"
        />
      </span>
      <span className="relative block h-8 w-36 sm:h-10 sm:w-48">
        <Image
          src="/images/venues/oscura.webp"
          alt="Oscura Techno"
          fill
          className={logoClass}
          sizes="(max-width: 640px) 144px, 192px"
        />
      </span>
    </div>
  );
}
