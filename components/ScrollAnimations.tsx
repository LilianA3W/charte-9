"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Animations pilotées par attributs data-* (pas de logique dans les composants) :
 *  - data-hero      : entrée du hero au chargement
 *  - data-reveal    : apparition au scroll
 *  - data-stagger   : apparition en cascade des enfants directs
 *  - data-parallax  : parallaxe verticale (valeur = amplitude en %)
 *  - data-count     : compteur animé (data-suffix pour l'unité)
 * Avec prefers-reduced-motion, tout reste statique.
 */
export default function ScrollAnimations() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from("[data-hero]", {
        y: 48,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.1,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
        gsap.from(group.children, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: { trigger: group, start: "top 85%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amount = Number(el.dataset.parallax) || 8;
        gsap.fromTo(
          el,
          { yPercent: -amount / 2 },
          {
            yPercent: amount / 2,
            ease: "none",
            scrollTrigger: {
              trigger: el.parentElement,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const suffix = el.dataset.suffix ?? "";
        const state = { v: 0 };
        el.textContent = `0${suffix}`;
        gsap.to(state, {
          v: end,
          duration: 2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
          onUpdate: () => {
            el.textContent = `${Math.round(state.v)}${suffix}`;
          },
        });
      });
    });

    return () => mm.revert();
  }, []);

  return null;
}
