// Hero headline: two lines rotate together as word pairs, like a quick
// text exchange — top line slides in from the left, bottom line follows
// ~1s later sliding in from the right, both with a fade+blur+rise entrance.
(function () {
  var topEl = document.getElementById('heroTop');
  var bottomEl = document.getElementById('heroBottom');
  var verbEl = document.getElementById('heroVerb');
  if (!topEl || !bottomEl || !verbEl) return;

  var pairs = [
    { top: 'Something broken?', verb: 'fix', color: '#0891b2' },          // cyan
    { top: 'Something acting weird?', verb: 'troubleshoot', color: '#4d7c0f' }, // lime green
    { top: 'Got a tech question?', verb: 'answer', color: '#ea580c' },    // red-orange
    { top: 'Need something set up?', verb: 'handle', color: '#1e3a8a' },  // dark blue
    { top: 'Stuck on something?', verb: 'untangle', color: '#7c3aed' }    // violet
  ];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    // Static: show the first pair, no animation, no cycling.
    topEl.textContent = pairs[0].top;
    verbEl.textContent = pairs[0].verb;
    verbEl.style.color = pairs[0].color;
    topEl.classList.add('visible');
    bottomEl.classList.add('visible');
    return;
  }

  var ENTER_DUR = 450;
  var STAGGER = 900;
  var HOLD = 2000;
  var EXIT_DUR = 350;
  var GAP = 200;

  var idx = 0;
  var timers = [];

  function clearTimers() {
    timers.forEach(clearTimeout);
    timers = [];
  }

  function setHidden(el, direction) {
    el.classList.remove('visible', 'exit');
    el.classList.add(direction === 'left' ? 'hidden-left' : 'hidden-right');
  }

  function show(el) {
    el.classList.remove('hidden-left', 'hidden-right', 'exit');
    el.classList.add('visible');
  }

  function exitLine(el) {
    el.classList.remove('visible');
    el.classList.add('exit');
  }

  function runCycle() {
    var pair = pairs[idx];
    topEl.textContent = pair.top;
    verbEl.textContent = pair.verb;
    verbEl.style.color = pair.color;

    setHidden(topEl, 'left');
    setHidden(bottomEl, 'right');

    // Force a reflow so the hidden starting position is committed before
    // we transition to visible on the next frame.
    void topEl.offsetHeight;

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        show(topEl);
      });
    });

    timers.push(setTimeout(function () { show(bottomEl); }, STAGGER));

    var exitAt = STAGGER + ENTER_DUR + HOLD;
    timers.push(setTimeout(function () {
      exitLine(topEl);
      exitLine(bottomEl);
    }, exitAt));

    var nextAt = exitAt + EXIT_DUR + GAP;
    timers.push(setTimeout(function () {
      idx = (idx + 1) % pairs.length;
      runCycle();
    }, nextAt));
  }

  runCycle();

  // Pause the cycle when the tab isn't visible, resume cleanly when it is.
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      clearTimers();
    } else {
      clearTimers();
      runCycle();
    }
  });
})();