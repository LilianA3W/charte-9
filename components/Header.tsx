"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Menu, Phone, X } from "lucide-react";
import Logo from "./Logo";
import { Button } from "./ui";
import { NAV } from "@/lib/data";

// "overhang" : logo en onglet qui déborde sous la barre (≥ lg), pour les clients
// qui veulent un logo plus grand. Il se compacte au scroll. Mobile inchangé.
export default function Header({
  variant = "default",
}: {
  variant?: "default" | "overhang";
}) {
  const overhang = variant === "overhang";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="hidden bg-primary-dark text-[13px] text-blush-2 md:block">
        <div className="mx-auto flex h-10 w-full max-w-[1200px] items-center justify-between px-10 xl:px-0">
          <p className="flex items-center gap-2">
            <MapPin aria-hidden size={14} strokeWidth={2} />
            2 rue de Beauregard, 00000 MAVILLE
          </p>
          <a
            href="tel:0200000000"
            className="flex items-center gap-2 font-medium text-white"
          >
            <Phone aria-hidden size={14} strokeWidth={2} />
            02 00 00 00 00
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-line bg-white/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_8px_30px_-12px_rgba(74,26,60,0.25)]" : ""
        }`}
      >
        <div className="mx-auto flex h-20 w-full max-w-[1200px] items-center justify-between px-6 sm:px-10 lg:h-24 xl:px-0">
          <div className="flex items-center gap-8">
            {overhang ? (
              <Link
                href="/"
                aria-label="Accueil"
                className="block shrink-0 lg:flex lg:h-24 lg:items-start"
              >
                <span
                  className={`block lg:relative lg:z-10 lg:rounded-b-2xl lg:border-x lg:border-b lg:border-line lg:bg-white lg:px-6 lg:pb-4 lg:pt-3 lg:transition-all lg:duration-300 ${
                    scrolled
                      ? "lg:shadow-none"
                      : "lg:shadow-[0_14px_30px_-14px_rgba(74,26,60,0.3)]"
                  }`}
                >
                  <Logo
                    className={`h-12 w-auto max-w-[220px] object-contain transition-all duration-300 ${
                      scrolled ? "lg:h-[4.5rem]" : "lg:h-20 xl:h-[6.5rem]"
                    }`}
                  />
                </span>
              </Link>
            ) : (
              <Link href="/" aria-label="Accueil" className="block shrink-0">
                <Logo className="h-12 w-auto lg:h-14" />
              </Link>
            )}

            <nav aria-label="Navigation principale" className="hidden lg:block">
              <ul className="flex items-center gap-9">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="relative whitespace-nowrap text-[15px] font-medium after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 hover:after:scale-x-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="hidden items-center justify-end gap-4 lg:flex">
            {/* Masqué à 1024 px : pas la place pour le menu et les deux boutons */}
            <span className="hidden xl:block">
              <Button href="tel:0200000000" variant="outline" className="!h-12 !px-6">
                Nous appeler
              </Button>
            </span>
            <Button href="#contact" className="!h-12 !px-6">
              Prendre rendez-vous
            </Button>
          </div>

          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open && (
          <div className="fixed inset-x-0 top-20 z-40 h-[calc(100dvh-5rem)] overflow-y-auto bg-white px-6 pb-10 pt-8 lg:hidden">
            <ul className="flex flex-col">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-line">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-5 font-serif text-3xl"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3">
              <Button href="#contact" className="w-full">
                Prendre rendez-vous
              </Button>
              <Button href="tel:0200000000" variant="outline" className="w-full">
                Nous appeler
              </Button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
