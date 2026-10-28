"use client";

import { useEffect, useRef } from "react";
import { Color, Mesh, Program, Renderer, Triangle } from "ogl";

type Variant = "light" | "dark";

const PALETTES: Record<Variant, [string, string, string, string]> = {
  // Hero : base rose poudré, nappes plus claires et plus soutenues.
  light: ["#f8eef3", "#f5e3ed", "#ecc9dd", "#ffffff"],
  // Bloc entreprise : variations autour du prune, le texte blanc reste lisible.
  dark: ["#7a2c62", "#6c2457", "#8e3a74", "#9a4580"],
};

const vertex = /* glsl */ `
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform vec2 uRes;
  uniform vec2 uMouse;
  uniform vec3 uC0;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform float uGrain;

  // Simplex noise 2D (Ashima Arts / Stefan Gustavson, licence MIT)
  vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    float aspect = uRes.x / uRes.y;
    vec2 p = vUv * vec2(aspect, 1.0) * 1.5;
    float t = uTime * 0.07;

    // Le curseur déforme légèrement le champ de bruit.
    vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);
    float n1 = snoise(p + vec2(t, -t * 0.7) + m * 0.35);
    float n2 = snoise(p * 1.8 - vec2(t * 1.3, t) + n1 * 0.55);
    float n3 = snoise(p * 0.8 + vec2(-t * 0.6, t * 0.9) + n2 * 0.4);

    vec3 col = mix(uC0, uC1, smoothstep(-0.7, 0.8, n1));
    col = mix(col, uC2, smoothstep(0.05, 0.95, n2) * 0.75);
    col = mix(col, uC3, smoothstep(0.35, 1.0, n3) * 0.55);

    // Halo discret qui suit le curseur.
    float d = distance(vUv * vec2(aspect, 1.0), uMouse * vec2(aspect, 1.0));
    col = mix(col, uC3, smoothstep(0.45, 0.0, d) * 0.18);

    // Grain fin pour éviter le banding.
    float g = fract(sin(dot(gl_FragCoord.xy + uTime, vec2(12.9898, 78.233))) * 43758.5453);
    col += (g - 0.5) * uGrain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

export default function ShaderBackground({
  variant = "light",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: false,
        antialias: false,
        dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      });
    } catch {
      return; // WebGL indisponible : le fond CSS reste en place.
    }
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity 1s ease";
    container.appendChild(canvas);

    const [c0, c1, c2, c3] = PALETTES[variant].map((hex) => new Color(hex));
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uRes: { value: [1, 1] },
        uMouse: { value: [0.7, 0.5] },
        uC0: { value: c0 },
        uC1: { value: c1 },
        uC2: { value: c2 },
        uC3: { value: c3 },
        uGrain: { value: variant === "dark" ? 0.03 : 0.022 },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    const target = [0.7, 0.5];
    const current = [0.7, 0.5];

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = container;
      if (!w || !h) return;
      renderer.setSize(w, h);
      program.uniforms.uRes.value = [gl.canvas.width, gl.canvas.height];
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      target[0] = (e.clientX - r.left) / r.width;
      target[1] = 1 - (e.clientY - r.top) / r.height;
    };

    let raf = 0;
    let visible = true;
    const start = performance.now();

    const frame = (now: number) => {
      current[0] += (target[0] - current[0]) * 0.05;
      current[1] += (target[1] - current[1]) * 0.05;
      program.uniforms.uMouse.value = current;
      program.uniforms.uTime.value = (now - start) / 1000;
      renderer.render({ scene: mesh });
      if (visible) raf = requestAnimationFrame(frame);
    };

    // Un premier rendu statique, puis la boucle seulement si les animations sont permises.
    program.uniforms.uTime.value = 12;
    renderer.render({ scene: mesh });
    requestAnimationFrame(() => (canvas.style.opacity = "1"));

    let io: IntersectionObserver | undefined;
    if (!reduceMotion) {
      window.addEventListener("pointermove", onMove, { passive: true });
      io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        cancelAnimationFrame(raf);
        if (visible) raf = requestAnimationFrame(frame);
      });
      io.observe(container);
    }

    return () => {
      cancelAnimationFrame(raf);
      visible = false;
      io?.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      canvas.remove();
    };
  }, [variant]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 -z-10 ${className}`}
    />
  );
}
