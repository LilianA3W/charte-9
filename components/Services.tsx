import { ArrowRight } from "lucide-react";
import { Button, Container, Eyebrow, Icon } from "./ui";
import { LOREM_SHORT, SERVICES } from "@/lib/data";

export default function Services() {
  return (
    <section id="services" className="bg-white pb-20 pt-[72px]">
      <Container className="grid gap-12 lg:grid-cols-[380px_1fr] lg:gap-24">
        <div className="flex flex-col items-start gap-6 lg:sticky lg:top-32 lg:self-start" data-reveal>
          <Eyebrow>Nos prestations</Eyebrow>
          <h2 className="font-serif text-[40px] font-medium leading-[1.1] tracking-[-0.01em] md:text-[52px]">
            Nos services
          </h2>
          <p className="text-[17px] leading-[1.5] text-muted">
            Lorem ipsum dolor sit amet consectetur. Nunc vel accumsan et non. Sed
            venenatis malesuada diam mattis morbi.
          </p>
          <Button href="#services" variant="outline">
            Voir tous les services
          </Button>
        </div>

        <ul data-stagger className="border-t border-line">
          {SERVICES.map((s) => (
            <li key={s.title} className="border-b border-line">
              <a
                href="#services"
                className="group flex items-center gap-5 py-8 sm:gap-7"
              >
                <span className="flex h-14 w-14 shrink-0 sm:h-[72px] sm:w-[72px] items-center justify-center rounded-full bg-blush text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon name={s.icon} size={30} />
                </span>
                <span className="flex min-w-0 flex-1 flex-col gap-2">
                  <span className="font-serif text-2xl font-medium sm:text-[28px]">
                    {s.title}
                  </span>
                  <span className="text-base leading-[1.5] text-muted">
                    {LOREM_SHORT}
                  </span>
                  <span className="inline-flex items-center gap-2 pt-1 text-[15px] font-semibold text-primary">
                    En savoir plus
                    <ArrowRight
                      aria-hidden
                      size={18}
                      strokeWidth={1.75}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </span>
                <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border-[1.5px] border-line text-primary transition-all duration-300 group-hover:border-primary group-hover:bg-primary group-hover:text-white sm:flex">
                  <ArrowRight aria-hidden size={20} strokeWidth={1.75} />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
