import DistortImage from "./DistortImage";
import { ArrowLink, Button, Container, SectionTitle } from "./ui";
import { LOREM_MEDIUM, PROJECTS } from "@/lib/data";

export default function Projects() {
  return (
    <section id="realisations" className="bg-white py-20">
      <Container className="flex flex-col gap-14">
        <div
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
          data-reveal
        >
          <SectionTitle eyebrow="Réalisations" title="Nos réalisations" />
          <Button href="#realisations" variant="outline">
            Voir tous les projets
          </Button>
        </div>

        <ul data-stagger className="grid gap-10 md:grid-cols-3 md:gap-6">
          {PROJECTS.map((p, i) => (
            <li key={p.image}>
              <article className="group flex flex-col gap-5">
                <DistortImage
                  src={p.image}
                  alt={p.alt}
                  sizes="(min-width: 768px) 384px, 90vw"
                  className="h-[300px] rounded-[20px] bg-blush"
                />
                <ul className="flex flex-wrap gap-2" aria-label="Catégories">
                  {p.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-blush px-4 py-2 text-xs font-semibold text-primary"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <h3 className="font-serif text-[28px] font-medium leading-tight">
                  Lorem ipsum
                </h3>
                <p className="text-base leading-[1.5] text-muted">
                  {LOREM_MEDIUM}
                </p>
                <ArrowLink href="#realisations">Voir le détail</ArrowLink>
                <span className="sr-only">Projet {i + 1}</span>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
