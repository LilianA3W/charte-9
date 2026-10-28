import Image from "next/image";
import ShaderBackground from "./ShaderBackground";
import { Button, Container } from "./ui";
import { LOREM_LONG } from "@/lib/data";

const STATS = [
  { value: 500, suffix: "+", label: "Projets complétés" },
  { value: 100, suffix: "%", label: "De satisfaction client" },
] as const;

export default function About() {
  return (
    <section
      id="entreprise"
      className="relative isolate overflow-hidden bg-primary py-20"
    >
      <ShaderBackground variant="dark" />
      <Container className="grid items-center gap-14 lg:grid-cols-[440px_1fr] lg:gap-16 xl:grid-cols-[560px_1fr] xl:gap-20">
        <div className="relative mx-auto h-[420px] w-full max-w-[560px] sm:h-[600px]" data-reveal>
          <div
            aria-hidden
            className="absolute bottom-0 left-10 right-0 top-10 rounded-3xl border-[1.5px] border-white/45"
          />
          <div className="absolute bottom-10 left-0 right-10 top-0 overflow-hidden rounded-3xl bg-primary-dark sm:right-10">
            <div data-parallax="8" className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/charte9-unsplash/02-entreprise.jpg"
                alt="Soin du visage en institut"
                fill
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 text-white" data-stagger>
          <p className="text-[13px] font-semibold uppercase tracking-[0.14em]">
            L’entreprise
          </p>
          <h2 className="font-serif text-[40px] font-medium leading-[1.1] tracking-[-0.01em] md:text-[52px]">
            Lorem ipsum
          </h2>
          <p className="text-[17px] leading-[1.55]">{LOREM_LONG}</p>
          <p className="text-[17px] leading-[1.55]">{LOREM_LONG}</p>
          <dl className="flex gap-10 pt-2 sm:gap-14">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col gap-1">
                <dt className="order-2 text-[15px]">{s.label}</dt>
                <dd
                  className="font-serif text-[44px] font-medium leading-none tabular-nums sm:text-[56px]"
                  data-count={s.value}
                  data-suffix={s.suffix}
                >
                  {s.value}
                  {s.suffix}
                </dd>
              </div>
            ))}
          </dl>
          <div className="pt-2">
            <Button href="#entreprise" variant="light">
              Découvrir l’entreprise
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
