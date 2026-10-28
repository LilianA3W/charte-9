import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import { NAV } from "@/lib/data";

const LEGAL = [
  "Données personnelles",
  "Politique de confidentialité",
  "Mentions légales",
] as const;

const SOCIALS = [
  { label: "Facebook", icon: "/charte9-figma/facebook.svg" },
  { label: "Instagram", icon: "/charte9-figma/instagram.svg" },
] as const;

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="text-[13px] font-bold uppercase tracking-[0.14em]">
      {children}
    </h3>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-10 px-6 pt-20 sm:px-10 xl:px-0">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
          <p className="max-w-[760px] font-serif text-4xl font-medium leading-[1.12] tracking-[-0.005em] md:text-[56px]">
            Lorem ipsum dolor sit amet consectetur.
          </p>
          <Link
            href="#contact"
            className="inline-flex h-14 shrink-0 items-center rounded-full bg-blush px-8 text-base font-semibold text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
          >
            Prendre rendez-vous
          </Link>
        </div>

        <div className="grid gap-12 md:grid-cols-2 xl:grid-cols-[420px_1fr_1fr_1fr] xl:gap-20">
          <div className="flex flex-col gap-6">
            <Logo light className="h-20 w-auto self-start" />
            <p className="max-w-[420px] text-[15px] leading-[1.55]">
              Lorem ipsum dolor sit amet consectetur. Mollis aenean tristique
              egestas sit convallis nunc tristique lacus.
            </p>
            <div className="flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="transition-opacity hover:opacity-70"
                >
                  <Image src={s.icon} alt="" width={32} height={32} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Heading>Adresse</Heading>
            <address className="text-[15px] not-italic leading-[1.5]">
              SARL Pierre Martin
              <br />2 rue de Beauregard,
              <br />
              00000 MAVILLE
            </address>
            <a
              href="tel:0200000000"
              className="text-[15px] leading-[1.5] transition-opacity hover:opacity-70"
            >
              02 00 00 00 00
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <Heading>Navigation</Heading>
            <ul className="flex flex-col gap-4 text-[15px] leading-[1.5]">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="transition-opacity hover:opacity-70">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="#contact" className="transition-opacity hover:opacity-70">
                  Demande de devis
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <Heading>Informations</Heading>
            <ul className="flex flex-col gap-4 text-[15px] leading-[1.5]">
              {LEGAL.map((l) => (
                <li key={l}>
                  <Link href="#" className="transition-opacity hover:opacity-70">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="py-6 text-[13px]">
          © Votre entreprise 2025 - Tous droits réservés
        </p>
      </div>
    </footer>
  );
}
