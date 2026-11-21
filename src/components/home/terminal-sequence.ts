interface Pose {
  setPose: (progress: number, x: number, y: number, time: number) => void;
}
const clamp = (n: number) => Math.max(0, Math.min(1, n));
function smooth(from: number, to: number, value: number) {
  const t = clamp((value - from) / (to - from));
  return t * t * (3 - 2 * t);
}

// The native scroll position is the timeline. Automatic rotation is composed on top in the renderer.
export function bindTerminalSequence(
  canvas: HTMLCanvasElement,
  scene: () => Pose | null,
) {
  const hero = canvas.closest<HTMLElement>(".hero-section")!;
  const stage = hero.querySelector<HTMLElement>(".hero-stage")!;
  const preference = matchMedia("(prefers-reduced-motion: reduce)");
  const roomy = matchMedia("(min-height: 580px)");
  let frame = 0,
    visible = true,
    last = 0,
    elapsed = 0;
  let start = 0,
    travel = 1,
    progress = 0,
    painted = -1;
  let x = 0,
    y = 0,
    targetX = 0,
    targetY = 0;
  let enabled = false;
  const viewer = canvas.closest<HTMLElement>(".object-viewer")!;
  let paused = viewer.matches(":hover") && matchMedia("(hover: hover)").matches;

  function pause(event: PointerEvent) {
    if (event.pointerType === "touch") return;
    paused = true;
  }
  function resume() {
    paused = false;
    last = 0;
    schedule();
  }

  function measure() {
    const layout = getComputedStyle(stage);
    enabled = layout.position === "sticky";
    if (!enabled) {
      targetX = targetY = x = y = 0;
      stage.style.removeProperty("--look-x");
      stage.style.removeProperty("--look-y");
    }
    const inset = parseFloat(layout.top) || 0;
    start = hero.getBoundingClientRect().top + scrollY - inset;
    travel = Math.max(1, hero.offsetHeight - stage.offsetHeight);
    updateProgress();
  }
  function updateProgress() {
    progress = enabled ? clamp((scrollY - start) / travel) : 0;
    schedule();
  }
  function schedule() {
    if (!frame && visible && !document.hidden)
      frame = requestAnimationFrame(render);
  }
  function render(now: number) {
    frame = 0;
    if (!visible || document.hidden) return;
    const delta = last ? Math.min((now - last) / 1000, 0.05) : 0;
    // A stationary scene floats at 30 fps. Scroll and pointer movement can use the full refresh rate.
    const moving =
      progress !== painted ||
      Math.abs(targetX - x) + Math.abs(targetY - y) > 0.012;
    if (last && now - last < 32 && !moving && !preference.matches && scene()) {
      schedule();
      return;
    }
    last = now;
    if (!paused && !preference.matches) elapsed += delta;
    const follow = 1 - Math.exp(-delta * 10);
    if (Math.abs(targetX - x) + Math.abs(targetY - y) > 0.001) {
      x += (targetX - x) * follow;
      y += (targetY - y) * follow;
      stage.style.setProperty("--look-x", x.toFixed(3));
      stage.style.setProperty("--look-y", y.toFixed(3));
    }
    if (progress !== painted) {
      const entry = smooth(0.43, 0.82, progress);
      stage.toggleAttribute("data-spread", entry > 0);
      stage.style.setProperty("--story-entry", entry.toFixed(4));
      stage.style.setProperty("--travel", progress.toFixed(4));
      painted = progress;
    }
    if (!paused || preference.matches) scene()?.setPose(
      progress,
      enabled ? x : 0,
      enabled ? y : 0,
      preference.matches ? 0 : elapsed,
    );
    if (!paused && !preference.matches && scene()) schedule();
  }
  function pointer(event: PointerEvent) {
    if (paused || !enabled || event.pointerType !== "mouse") return;
    const rect = stage.getBoundingClientRect();
    targetX = (2 * (event.clientX - rect.left)) / rect.width - 1;
    targetY = 1 - (2 * (event.clientY - rect.top)) / rect.height;
    schedule();
  }
  function leave() {
    targetX = 0;
    targetY = 0;
    schedule();
  }
  function visibility() {
    if (!visible || document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
      last = 0;
    } else {
      last = 0;
      updateProgress();
    }
  }
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    visibility();
  });
  observer.observe(stage);
  viewer.addEventListener("pointerenter", pause);
  viewer.addEventListener("pointerleave", resume);
  const resize = new ResizeObserver(measure);
  resize.observe(hero);
  resize.observe(stage);
  stage.addEventListener("pointermove", pointer);
  stage.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", visibility);
  window.addEventListener("scroll", updateProgress, { passive: true });
  preference.addEventListener("change", measure);
  roomy.addEventListener("change", measure);
  measure();
  return {
    refresh: schedule,
    dispose() {
      cancelAnimationFrame(frame);
      observer.disconnect();
      viewer.removeEventListener("pointerenter", pause);
      viewer.removeEventListener("pointerleave", resume);
      resize.disconnect();
      stage.removeEventListener("pointermove", pointer);
      stage.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", visibility);
      window.removeEventListener("scroll", updateProgress);
      preference.removeEventListener("change", measure);
      roomy.removeEventListener("change", measure);
    },
  };
}
