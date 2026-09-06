(function () {
  var section = document.querySelector('[data-project-stream]');
  var track = document.querySelector('[data-project-track]');
  var viewport = document.querySelector('[data-project-viewport]');
  var progressFill = document.querySelector('[data-project-progress]');
  var stages = Array.prototype.slice.call(document.querySelectorAll('.project-detail__stage'));
  var numEl = document.querySelector('[data-project-num]');
  var labelEl = document.querySelector('[data-project-label]');
  var phaseEls = Array.prototype.slice.call(document.querySelectorAll('[data-project-phases] .project-detail__tracker-phase'));
  var total = stages.length;

  if (!section || !track || !viewport || !total) return;

  // il browser a volte ripristina uno scroll salvato da una pagina progetto
  // precedente (altezza diversa): ogni pagina deve sempre partire dal primo
  // elaborato, mai a metà galleria.
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo(0, 0);

  // stessa soglia di pinning usata da .h-gallery in works-gallery.js
  var mq = window.matchMedia('(min-width: 641px)');
  var raf = null;

  function pinnedMode() {
    return mq.matches;
  }

  function setActive(stage) {
    var idx = stage.getAttribute('data-idx');
    var title = stage.getAttribute('data-title');
    var phase = stage.getAttribute('data-phase');
    if (numEl) numEl.textContent = String(idx).padStart(2, '0') + ' / ' + String(total).padStart(2, '0');
    if (labelEl) labelEl.textContent = title;
    phaseEls.forEach(function (el) {
      el.classList.toggle('is-active', el.getAttribute('data-phase') === phase);
    });
    stages.forEach(function (s) {
      s.classList.toggle('is-active', s === stage);
    });
  }

  function activeFromOffset(offset) {
    // stages have different widths (each sized to its own image's aspect
    // ratio), so the active one is found from real offsetLeft positions,
    // not by dividing by a single item width.
    var target = offset + viewport.clientWidth / 2;
    var chosen = stages[0];
    for (var i = 0; i < stages.length; i++) {
      if (stages[i].offsetLeft <= target) chosen = stages[i];
      else break;
    }
    setActive(chosen);
  }

  function setHeight() {
    if (!pinnedMode()) {
      section.style.height = '';
      track.style.transform = '';
      return;
    }
    var extra = Math.max(0, track.scrollWidth - viewport.clientWidth);
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
      var maxTranslate = Math.max(0, track.scrollWidth - viewport.clientWidth);
      var offset = fraction * maxTranslate;
      track.style.transform = 'translateX(' + (-offset) + 'px)';
      if (progressFill) progressFill.style.width = (fraction * 100) + '%';
      activeFromOffset(offset);
    });
  }

  function onNativeScroll() {
    if (pinnedMode()) return;
    var offset = viewport.scrollLeft;
    var maxTranslate = Math.max(1, track.scrollWidth - viewport.clientWidth);
    if (progressFill) progressFill.style.width = (Math.min(1, offset / maxTranslate) * 100) + '%';
    activeFromOffset(offset);
  }

  setHeight();
  onScroll();
  setActive(stages[0]);

  window.addEventListener('resize', function () {
    setHeight();
    onScroll();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  viewport.addEventListener('scroll', onNativeScroll, { passive: true });
})();
