"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl";

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// Équivalent WebGL de object-fit: cover, avec zoom, ondulation et séparation RVB
// autour du curseur. L'intensité (uHover) monte et descend en douceur.
const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform sampler2D tMap;
  uniform vec2 uRes;
  uniform vec2 uImg;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uTime;

  void main() {
    vec2 ratio = vec2(
      min((uRes.x / uRes.y) / (uImg.x / uImg.y), 1.0),
      min((uRes.y / uRes.x) / (uImg.y / uImg.x), 1.0)
    );
    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    // zoom léger au survol
    uv = (uv - 0.5) * (1.0 - 0.07 * uHover) + 0.5;

    vec2 d = vUv - uMouse;
    d.x *= uRes.x / uRes.y;
    float dist = length(d);
    vec2 dir = d / max(dist, 0.0001);
    float influence = uHover * smoothstep(0.55, 0.0, dist);

    uv += dir * sin(dist * 26.0 - uTime * 3.0) * 0.011 * influence;
    uv -= dir * influence * 0.025;

    float split = influence * 0.006;
    float r = texture2D(tMap, uv + dir * split).r;
    float g = texture2D(tMap, uv).g;
    float b = texture2D(tMap, uv - dir * split).b;
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

type Props = {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
};

export default function DistortImage({
  src,
  alt,
  sizes,
  priority,
  className = "",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    // Pas d'effet sur écrans tactiles ni si l'utilisateur réduit les animations :
    // l'image Next/Image reste affichée telle quelle.
    const canHover = window.matchMedia("(hover: hover)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!canHover || reduceMotion) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 2),
      });
    } catch {
      return;
    }
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .4s ease";
    canvas.setAttribute("aria-hidden", "true");

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        tMap: { value: null },
        uRes: { value: [1, 1] },
        uImg: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uHover: { value: 0 },
        uTime: { value: 0 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    let disposed = false;
    let raf = 0;
    let hover = 0;
    let hoverTarget = 0;
    const mouse = [0.5, 0.5];

    const render = (time: number) => {
      program.uniforms.uTime.value = time / 1000;
      program.uniforms.uHover.value = hover;
      program.uniforms.uMouse.value = mouse;
      renderer.render({ scene: mesh });
    };

    const loop = (time: number) => {
      hover += (hoverTarget - hover) * 0.1;
      render(time);
      if (hoverTarget > 0 || hover > 0.002) {
        raf = requestAnimationFrame(loop);
      } else {
        hover = 0;
        raf = 0;
        render(time);
      }
    };
    const kick = () => {
      if (!raf && !disposed) raf = requestAnimationFrame(loop);
    };

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = wrap;
      if (!w || !h) return;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
      render(performance.now());
    };
    const ro = new ResizeObserver(resize);

    const onEnter = () => {
      hoverTarget = 1;
      kick();
    };
    const onLeave = () => {
      hoverTarget = 0;
      kick();
    };
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mouse[0] = (e.clientX - r.left) / r.width;
      mouse[1] = 1 - (e.clientY - r.top) / r.height;
      kick();
    };

    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      if (disposed) return;
      const texture = new Texture(gl, {
        image: img,
        generateMipmaps: true,
        minFilter: gl.LINEAR_MIPMAP_LINEAR,
      });
      program.uniforms.tMap.value = texture;
      program.uniforms.uImg.value = [img.naturalWidth, img.naturalHeight];
      wrap.appendChild(canvas);
      ro.observe(wrap);
      resize();
      requestAnimationFrame(() => (canvas.style.opacity = "1"));
      wrap.addEventListener("pointerenter", onEnter);
      wrap.addEventListener("pointerleave", onLeave);
      wrap.addEventListener("pointermove", onMove);
    };
    img.src = src;

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      wrap.removeEventListener("pointerenter", onEnter);
      wrap.removeEventListener("pointerleave", onLeave);
      wrap.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [src]);

  return (
    <div ref={wrapRef} className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
      />
    </div>
  );
}
