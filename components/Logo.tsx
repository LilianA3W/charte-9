/* eslint-disable @next/next/no-img-element */
// Logo placeholder « Votre entreprise », exporté tel quel depuis la maquette Figma.
export default function Logo({
  light = false,
  className = "",
}: {
  light?: boolean;
  className?: string;
}) {
  return light ? (
    <img
      src="/charte9-figma/logo-footer.svg"
      alt="Votre entreprise"
      width={160}
      height={80}
      className={className}
    />
  ) : (
    <img
      src="/charte9-figma/logo.svg"
      alt="Votre entreprise"
      width={112}
      height={56}
      className={className}
    />
  );
}
