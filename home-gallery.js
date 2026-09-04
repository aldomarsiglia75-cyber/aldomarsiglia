(function () {
  var section = document.querySelector('.h-gallery');
  var track = document.querySelector('.h-gallery__track');
  var progressFill = document.querySelector('.h-gallery__progress-fill');
  if (!section || !track) return;

  var mq = window.matchMedia('(min-width: 641px)');
  var raf = null;

  function pinnedMode() {
    return mq.matches;
  }

  function setHeight() {
    if (!pinnedMode()) {
      section.style.height = '';
      track.style.transform = '';
      return;
    }
    var extra = Math.max(0, track.scrollWidth - window.innerWidth);
    section.style.height = (window.innerHeight + extra) + 'px';
  }

  function onScroll() {
    if (!pinnedMode()) return;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      var scrollable = section.offsetHeight - window.innerHeight;
      var progressed = -section.getBoundingClientRect().top;
      var fraction = scrollable > 0 ? Math.min(1, Math.max(0, progressed / scrollable)) : 0;
      var maxTranslate = Math.max(0, track.scrollWidth - window.innerWidth);
      track.style.transform = 'translateX(' + (-fraction * maxTranslate) + 'px)';
      if (progressFill) progressFill.style.width = (fraction * 100) + '%';
    });
  }

  setHeight();
  onScroll();
  window.addEventListener('resize', function () {
    setHeight();
    onScroll();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
})();
