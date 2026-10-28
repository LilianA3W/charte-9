/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import ShaderBackground from "./ShaderBackground";
import { Button, Container, Eyebrow } from "./ui";
import { HERO_TEXT } from "@/lib/data";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-blush pb-28 pt-12 lg:pb-[99px]">
      <ShaderBackground variant="light" />

      <Container className="grid items-center gap-14 lg:min-h-[640px] lg:grid-cols-[1fr_440px] lg:gap-16 xl:grid-cols-[1fr_520px]">
        <div className="flex flex-col gap-6" data-hero>
          <Eyebrow>Institut de beauté · Coiffure</Eyebrow>
          <h1 className="font-serif text-[44px] font-medium leading-[1.08] tracking-[-0.015em] sm:text-6xl lg:text-[72px]">
            Lorem ipsum dolor sit amet consectetur.
          </h1>
          <p className="max-w-[500px] text-lg leading-[1.5] text-muted">
            {HERO_TEXT}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button href="#contact">Prendre rendez-vous</Button>
            <Button href="#services" variant="outline">
              Découvrir nos prestations
            </Button>
          </div>
        </div>

        <div
          data-hero
          className="relative mx-auto aspect-[520/640] w-full max-w-[520px]"
        >
          {/* Anneau de 560 px centré sur le haut de l'arche (maquette : 20 px de débord) */}
          <img
            src="/charte9-figma/anneau.svg"
            alt=""
            aria-hidden
            width={560}
            height={560}
            className="pointer-events-none absolute left-[-3.846%] top-[-3.281%] h-auto w-[107.692%] max-w-none"
          />
          <div className="absolute inset-0 overflow-hidden rounded-t-[260px] rounded-b-3xl bg-blush-2">
            <div data-parallax="10" className="absolute -inset-x-0 -inset-y-[10%]">
              <Image
                src="/charte9-unsplash/01-hero-arche.jpg"
                alt="Coiffeuse réalisant un chignon pour une cliente"
                fill
                priority
                sizes="(min-width: 1024px) 520px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
