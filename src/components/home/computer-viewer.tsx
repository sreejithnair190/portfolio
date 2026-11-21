"use client";

import { useEffect, useRef, useState } from "react";
import type { mountComputer } from "./computer-renderer";
import { bindTerminalSequence } from "./terminal-sequence";

export default function ComputerViewer() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const controller = useRef<ReturnType<typeof mountComputer> | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    let nearby = false;
    let loading = false;
    const element = canvas.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sequence = bindTerminalSequence(element, () => controller.current);
    function showPoster() {
      setReady(false);
      controller.current?.dispose();
      controller.current = null;
    }
    function onLoss(event: Event) {
      event.preventDefault();
      showPoster();
    }
    async function initialize() {
      if (!nearby || reduced.matches || loading || controller.current) return;
      loading = true;
      try {
        const context = element.getContext("webgl2", {
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        if (!context || context.isContextLost()) return;
        const { mountComputer } = await import("./computer-renderer");
        if (!active || !nearby || reduced.matches || context.isContextLost()) return;
        controller.current = mountComputer(element, context);
        setReady(true);
        sequence.refresh();
      } catch {
        if (active) setReady(false);
      } finally {
        loading = false;
      }
    }
    function changeMotion() {
      if (reduced.matches) showPoster();
      else initialize();
    }
    const observer = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      if (nearby) initialize();
    });
    observer.observe(element);
    reduced.addEventListener("change", changeMotion);
    element.addEventListener("webglcontextlost", onLoss);
    element.addEventListener("webglcontextrestored", initialize);
    return () => {
      active = false;
      observer.disconnect();
      reduced.removeEventListener("change", changeMotion);
      sequence.dispose();
      element.removeEventListener("webglcontextlost", onLoss);
      element.removeEventListener("webglcontextrestored", initialize);
      controller.current?.dispose();
      controller.current = null;
    };
  }, []);

  return (
    <figure className="object-viewer" aria-label="Animated 3D computer">
      <div className="canvas-wrap" data-ready={ready}>
        {/* The poster uses the same camera and transparent background as the live scene. */}
        <div
          className="computer-poster"
          role="img"
          aria-label="An orange CRT floats beside a floppy disk, keyboard, and escape key."
        />
        <div className="exploded-poster" aria-hidden="true" />
        <canvas ref={canvas} role="img" aria-label="Looping 3D computer animation" />
      </div>
    </figure>
  );
}
