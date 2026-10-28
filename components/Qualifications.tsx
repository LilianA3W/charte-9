import Image from "next/image";
import { QUALIFICATIONS } from "@/lib/data";

export default function Qualifications() {
  const items = [...QUALIFICATIONS, ...QUALIFICATIONS];
  return (
    <section
      aria-label="Nos labels et qualifications"
      className="relative bg-white pb-6 pt-[120px]"
    >
      <p className="mb-6 text-center text-[13px] font-semibold uppercase tracking-[0.14em] text-primary">
        Nos labels et qualifications
      </p>
      <div className="group overflow-hidden py-6 [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
        <ul className="flex w-max animate-marquee gap-16 group-hover:[animation-play-state:paused]">
          {items.map((q, i) => (
            <li key={`${q.name}-${i}`} className="shrink-0">
              <Image
                src={q.src}
                alt={i < QUALIFICATIONS.length ? q.name : ""}
                aria-hidden={i >= QUALIFICATIONS.length || undefined}
                width={155}
                height={120}
                className="h-[120px] w-[155px] object-cover"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
