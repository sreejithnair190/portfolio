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
    const element = canvas.current!;
    const sequence = bindTerminalSequence(element, () => controller.current);
    function onLoss(event: Event) {
      event.preventDefault();
      setReady(false);
      controller.current?.dispose();
      controller.current = null;
    }
    async function initialize() {
      try {
        const { mountComputer } = await import("./computer-renderer");
        if (!active) return;
        controller.current?.dispose();
        controller.current = mountComputer(element);
        setReady(true);
        sequence.refresh();
      } catch {
        if (active) setReady(false);
      }
    }
    element.addEventListener("webglcontextlost", onLoss);
    element.addEventListener("webglcontextrestored", initialize);
    initialize();
    return () => {
      active = false;
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
