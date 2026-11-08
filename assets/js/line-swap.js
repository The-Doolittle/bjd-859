// Hero headline: rotates question/answer pairs. The top line enters from the
// left, the bottom line follows from the right in that pair's colour.
(() => {
  const hero = document.querySelector(".hero");
  const topEl = document.getElementById("line-top");
  const bottomEl = document.getElementById("line-bottom");
  if (!hero || !topEl || !bottomEl) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const pairs = [
    { top: "Something broken?", bottom: "Let me take a look." },
    { top: "Disobedient printer?", bottom: "Not for long." },
    { top: "Tech questions?", bottom: "Human answers." },
    { top: "Setup woes?", bottom: "Taken care of." },
    { top: "Stuck on something?", bottom: "Make it my problem." },
  ];

  const ENTER = 450;
  const STAGGER = 900;
  const HOLD = 2000;
  const EXIT = 350;
  const GAP = 200;

  let index = 0;
  let timers = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function place(el, side) {
    el.classList.remove("is-visible", "is-leaving", "is-left", "is-right");
    el.classList.add(side === "left" ? "is-left" : "is-right");
  }

  function show(el) {
    el.classList.remove("is-left", "is-right", "is-leaving");
    el.classList.add("is-visible");
  }

  function leave(el) {
    el.classList.remove("is-visible");
    el.classList.add("is-leaving");
  }

  function runCycle() {
    const pair = pairs[index];
    topEl.textContent = pair.top;
    bottomEl.textContent = pair.bottom;
    bottomEl.dataset.tone = String(index + 1);

    place(topEl, "left");
    place(bottomEl, "right");

    // Commit the start position before the transition begins.
    void topEl.offsetHeight;
    requestAnimationFrame(() => requestAnimationFrame(() => show(topEl)));

    const exitAt = STAGGER + ENTER + HOLD;
    timers.push(setTimeout(() => show(bottomEl), STAGGER));
    timers.push(
      setTimeout(() => {
        leave(topEl);
        leave(bottomEl);
      }, exitAt),
    );
    timers.push(
      setTimeout(() => {
        index = (index + 1) % pairs.length;
        runCycle();
      }, exitAt + EXIT + GAP),
    );
  }

  hero.classList.add("is-cycling");
  runCycle();

  document.addEventListener("visibilitychange", () => {
    clearTimers();
    if (!document.hidden) runCycle();
  });
})();
