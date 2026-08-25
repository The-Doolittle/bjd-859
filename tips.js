// Loading-screen-style tip: picks one line at random on each page load.
// Easter eggs for anyone who reads closely.
(function () {
  var el = document.getElementById('heroTip');
  if (!el) return;

  var tips = [
    'Sometimes you just gotta phone a friend.',
    "I'll take 'DNS issues' for 1200, Alex.",
    'For layer 8 issues, please reboot the user.',
    "If I find out you didn't try to restart it first, I'm gonna charge you extra.",
    'No capes. - Edna Mode',
    "Certified in saving as PDF",
    'If this is an emergency, please hang up and dial 9-1-1.'
  ];

  var pick = tips[Math.floor(Math.random() * tips.length)];
  el.textContent = pick;
})();