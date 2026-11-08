// Moves the dot-grid highlight with the pointer. Skipped on touch devices and
// with reduced motion, where the CSS hides the highlight layer too.
(() => {
  const skip =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(hover: none)").matches;
  if (skip) return;

  const root = document.documentElement;
  let ticking = false;
  let x = 0;
  let y = 0;

  function update() {
    root.style.setProperty("--x", `${x}px`);
    root.style.setProperty("--y", `${y}px`);
    ticking = false;
  }

  window.addEventListener("mousemove", (event) => {
    x = event.clientX;
    y = event.clientY;
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  });
})();
