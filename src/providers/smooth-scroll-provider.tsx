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
    const picker = Array.from(home.querySelectorAll<HTMLAnchorElement>(".project-picker a"));
    const work = heading.closest<HTMLElement>(".work-section")!;
    const deck = work.querySelector<HTMLElement>(".project-deck")!;
    const tones = slides.map((slide) => getComputedStyle(slide).getPropertyValue("--case-bg"));
    const surfaces = home.querySelectorAll<HTMLElement>("[data-surface]");
    const entrances = Array.from(
      home.querySelectorAll<HTMLElement>("[data-enter]"),
    );
    let lenis: Lenis | null = null,
      reveal: IntersectionObserver | null = null,
      frame = 0;
    let galleryVisible = false;
    let selected = -1;
    function paint() {
      frame = 0;
      const h = window.innerHeight;
      const bounds = slides.map((card) => card.getBoundingClientRect());
      const current = Math.max(0, bounds.filter(({ top }) => top <= h * 0.5).length - 1);
      if (current !== selected) {
        picker[selected]?.removeAttribute("aria-current");
        picker[current].setAttribute("aria-current", "location");
        work.style.setProperty("--gallery-tone", tones[current]);
        selected = current;
      }
      if (reduced.matches) return;
      const titleTop = heading.getBoundingClientRect().top;
      const entry = clamp((h - titleTop) / h);
      heading.style.setProperty("--title-offset", ((1 - entry) * 36).toFixed(2) + "px");
      // Each arriving card turns the layers beneath it around the same corner.
      let depth = 0;
      for (let i = slides.length - 1; i >= 0; i--) {
        const card = slides[i];
        const { top, height } = bounds[i];
        const next = bounds[i + 1];
        const covered = next ? clamp((top + height - next.top) / height) : 0;
        depth = (depth + 1) * covered;
        card.style.setProperty("--fan-depth", depth.toFixed(3));
        // Art travels inside its frame for the entire time the card crosses the viewport.
        const entryTop = i === 0 ? titleTop : top;
        const progress = clamp((h - entryTop) / (h + height + top - entryTop));
        card.style.setProperty("--art-y", ((progress - 0.5) * 34).toFixed(2) + "%");
      }
    }
    function schedule() {
      if (!frame && galleryVisible) frame = requestAnimationFrame(paint);
    }
    function revealFocusedProject(event: FocusEvent) {
      const link = event.target;
      if (!(link instanceof HTMLAnchorElement) || !link.matches(":focus-visible")) return;
      const rect = link.getBoundingClientRect();
      const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
      if (link.contains(hit)) return;
      // A pinned card can be inside the viewport but covered by another card.
      const stop = link.closest(".project-slide")?.previousElementSibling;
      if (stop instanceof HTMLElement) {
        if (lenis) lenis.scrollTo(stop, { immediate: true });
        else stop.scrollIntoView({ block: "start", behavior: "instant" });
      }
    }
    function followPointer(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;
      const surface = event.currentTarget as HTMLElement;
      const rect = surface.getBoundingClientRect();
      const x = clamp((event.clientX - rect.left) / rect.width);
      const y = clamp((event.clientY - rect.top) / rect.height);
      surface.style.setProperty("--surface-x", (2 * x - 1).toFixed(3));
      surface.style.setProperty("--surface-y", (2 * y - 1).toFixed(3));
    }
    function centerSurface(this: HTMLElement) {
      this.style.removeProperty("--surface-x");
      this.style.removeProperty("--surface-y");
    }
    function releaseSurfaces() {
      surfaces.forEach((surface) => {
        surface.removeEventListener("pointermove", followPointer);
        surface.removeEventListener("pointerleave", centerSurface);
        centerSurface.call(surface);
      });
    }
    function configure() {
      lenis?.destroy();
      lenis = null;
      reveal?.disconnect();
      reveal = null;
      cancelAnimationFrame(frame);
      frame = 0;
      releaseSurfaces();
      home.dataset.motion = reduced.matches ? "off" : "on";
      schedule();
      if (reduced.matches) return;
      if (desktop.matches) {
        surfaces.forEach((surface) => {
          surface.addEventListener("pointermove", followPointer, { passive: true });
          surface.addEventListener("pointerleave", centerSurface);
        });
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
    const shell = heading.closest<HTMLElement>(".shell")!;
    const gallery = new IntersectionObserver(([entry]) => {
      galleryVisible = entry.isIntersecting;
      schedule();
    }, { rootMargin: "100px 0px" });
    gallery.observe(shell);
    function measureStack() {
      shell.style.setProperty("--work-heading-height", heading.offsetHeight + "px");
      const tallestCard = Math.max(...slides.map((slide) => slide.offsetHeight));
      shell.style.setProperty("--stack-height", tallestCard + "px");
      schedule();
    }
    const resize = new ResizeObserver(measureStack);
    resize.observe(heading);
    slides.forEach((slide) => resize.observe(slide));
    measureStack();
    configure();
    deck.addEventListener("focusin", revealFocusedProject);
    reduced.addEventListener("change", configure);
    desktop.addEventListener("change", configure);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      deck.removeEventListener("focusin", revealFocusedProject);
      releaseSurfaces();
      gallery.disconnect();
      resize.disconnect();
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
