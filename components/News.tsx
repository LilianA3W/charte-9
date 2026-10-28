import Image from "next/image";
import { ArrowLink, Button, Container, SectionTitle } from "./ui";
import { LOREM_MEDIUM, NEWS, NEWS_FEATURED } from "@/lib/data";

export default function News() {
  return (
    <section id="actualites" className="bg-blush py-20">
      <Container className="flex flex-col gap-14">
        <div
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          data-reveal
        >
          <SectionTitle eyebrow="Actualités" title="Nos dernières actualités" />
          <Button href="#actualites" variant="outline">
            Voir toutes les actualités
          </Button>
        </div>

        <div className="grid gap-12 lg:grid-cols-2 xl:grid-cols-[600px_1fr] xl:gap-[72px]">
          <article className="group flex flex-col gap-5" data-reveal>
            <div className="relative aspect-[3/2] overflow-hidden rounded-[20px] bg-blush-2">
              <Image
                src={NEWS_FEATURED.image}
                alt={NEWS_FEATURED.alt}
                fill
                sizes="(min-width: 1024px) 600px, 90vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
            <time className="text-sm font-semibold text-primary">
              {NEWS_FEATURED.date}
            </time>
            <h3 className="font-serif text-3xl font-medium leading-[1.2] md:text-4xl">
              {NEWS_FEATURED.title}
            </h3>
            <p className="text-base leading-[1.5] text-muted">{LOREM_MEDIUM}</p>
            <ArrowLink href="#actualites">Lire la suite</ArrowLink>
          </article>

          <ul data-stagger className="flex flex-col">
            {NEWS.map((n, i) => (
              <li
                key={n.image}
                className={`group flex items-center gap-5 py-7 sm:gap-6 ${
                  i === 0 ? "pt-0" : ""
                } ${i < NEWS.length - 1 ? "border-b border-blush-2" : ""}`}
              >
                <div className="relative h-[110px] w-[130px] shrink-0 overflow-hidden rounded-[14px] bg-blush-2 sm:h-[130px] sm:w-[180px]">
                  <Image
                    src={n.image}
                    alt={n.alt}
                    fill
                    sizes="180px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-2">
                  <time className="text-[13px] font-semibold text-primary">
                    {n.date}
                  </time>
                  <h3 className="font-serif text-xl font-medium leading-[1.25] sm:text-2xl">
                    Lorem ipsum dolor sit amet
                  </h3>
                  <ArrowLink href="#actualites">Lire la suite</ArrowLink>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
