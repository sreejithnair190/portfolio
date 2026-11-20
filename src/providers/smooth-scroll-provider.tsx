"use client";

import { type ReactNode, useEffect, useRef } from "react";
import Lenis from "lenis";

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));

export default function SmoothScrollProvider({
  children,
}: {
  children: ReactNode;
}) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const home = container.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = matchMedia("(hover: hover) and (pointer: fine)");
    const slides = Array.from(
      home.querySelectorAll<HTMLElement>(".project-slide"),
    );
    const heading = home.querySelector<HTMLElement>(".work-heading")!;
    const entrances = Array.from(
      home.querySelectorAll<HTMLElement>("[data-enter]"),
    );
    let lenis: Lenis | null = null,
      reveal: IntersectionObserver | null = null,
      frame = 0;
    function paint() {
      frame = 0;
      if (reduced.matches) return;
      const h = window.innerHeight;
      const titleTop = heading.getBoundingClientRect().top;
      const entry = clamp((h - titleTop) / h);
      heading.style.setProperty("--title-offset", ((1 - entry) * 36).toFixed(2) + "px");
      const bounds = slides.map((card) => card.getBoundingClientRect());
      slides.forEach((card, i) => {
        const { top, height } = bounds[i];
        // Art travels inside its frame for the entire time the card crosses the viewport.
        const entryTop = i === 0 ? titleTop : top;
        const progress = clamp((h - entryTop) / (h + height + top - entryTop));
        card.style.setProperty("--art-y", ((progress - 0.5) * 34).toFixed(2) + "%");
      });
    }
    function schedule() {
      if (!frame && !reduced.matches) frame = requestAnimationFrame(paint);
    }
    function configure() {
      lenis?.destroy();
      lenis = null;
      reveal?.disconnect();
      reveal = null;
      cancelAnimationFrame(frame);
      frame = 0;
      home.dataset.motion = reduced.matches ? "off" : "on";
      if (reduced.matches) return;
      if (desktop.matches) {
        lenis = new Lenis({
          autoRaf: true,
          smoothWheel: true,
          syncTouch: false,
          lerp: 0.115,
          prevent: (node) =>
            node.tagName === "TEXTAREA" ||
            node.hasAttribute("data-native-scroll"),
        });
      }
      // Only arm elements below the viewport; deep links and restored scroll positions stay readable.
      entrances.forEach((el) => {
        el.dataset.reveal =
          el.getBoundingClientRect().top >= innerHeight ? "waiting" : "visible";
      });
      reveal = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              (entry.target as HTMLElement).dataset.reveal = "visible";
              reveal?.unobserve(entry.target);
            }
          }),
        { rootMargin: "0px 0px -3% 0px" },
      );
      entrances.forEach((el) => reveal!.observe(el));
      schedule();
    }
    configure();
    reduced.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      lenis?.destroy();
      reveal?.disconnect();
      cancelAnimationFrame(frame);
      reduced.removeEventListener("change", configure);
      desktop.removeEventListener("change", configure);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  return (
    <div ref={container} className="studio-home">
      {children}
    </div>
  );
}
