// Subtle cursor-reactive highlight on the dot grid background.
// Skips entirely on touch devices / reduced-motion (handled in CSS too).
(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noHover = window.matchMedia('(hover: none)').matches;
  if (reduceMotion || noHover) return;

  var target = document.documentElement;
  var ticking = false;
  var lastX = 0, lastY = 0;

  window.addEventListener('mousemove', function (e) {
    lastX = e.clientX;
    lastY = e.clientY;
    if (!ticking) {
      window.requestAnimationFrame(function () {
        target.style.setProperty('--x', lastX + 'px');
        target.style.setProperty('--y', lastY + 'px');
        ticking = false;
      });
      ticking = true;
    }
  });
})();