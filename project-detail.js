(function () {
  var section = document.querySelector('[data-project-stream]');
  var track = document.querySelector('[data-project-track]');
  var viewport = document.querySelector('[data-project-viewport]');
  var progressFill = document.querySelector('[data-project-progress]');
  var stages = Array.prototype.slice.call(document.querySelectorAll('.project-detail__stage'));
  var numEl = document.querySelector('[data-project-num]');
  var labelEl = document.querySelector('[data-project-label]');
  var phaseEls = Array.prototype.slice.call(document.querySelectorAll('[data-project-phases] .project-detail__tracker-phase'));
  var nav = document.querySelector('.site-nav');
  var total = stages.length;

  if (!section || !track || !viewport || !total) return;

  // la nav non è sticky (scompare scorrendo), ma all'inizio pagina occupa
  // spazio reale sopra al pannello (che è fixed e altrimenti partirebbe
  // da y:0, sovrapponendosi) — l'altezza pinnata reale è window.innerHeight
  // meno l'altezza della nav, misurata a runtime.
  function pinnedViewportHeight() {
    return window.innerHeight - (nav ? nav.offsetHeight : 0);
  }

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
    // stages have different heights (each sized to its own image's aspect
    // ratio), so the active one is found from real offsetTop positions,
    // not by dividing by a single item height.
    var target = offset + viewport.clientHeight / 2;
    var chosen = stages[0];
    for (var i = 0; i < stages.length; i++) {
      if (stages[i].offsetTop <= target) chosen = stages[i];
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
    var extra = Math.max(0, track.scrollHeight - viewport.clientHeight);
    section.style.height = (pinnedViewportHeight() + extra) + 'px';
  }

  function onScroll() {
    if (!pinnedMode()) return;
    if (raf) return;
    raf = requestAnimationFrame(function () {
      raf = null;
      var scrollable = section.offsetHeight - pinnedViewportHeight();
      var progressed = -section.getBoundingClientRect().top;
      var fraction = scrollable > 0 ? Math.min(1, Math.max(0, progressed / scrollable)) : 0;
      var maxTranslate = Math.max(0, track.scrollHeight - viewport.clientHeight);
      var offset = fraction * maxTranslate;
      track.style.transform = 'translateY(' + (-offset) + 'px)';
      if (progressFill) progressFill.style.width = (fraction * 100) + '%';
      activeFromOffset(offset);
    });
  }

  // sotto i 640px niente pin/scroll-jack: gli elaborati sono impilati nel
  // flusso normale e scorrono con la pagina, quindi l'elaborato attivo si
  // ricava dalla posizione reale rispetto alla finestra (non più da un
  // offset interno al viewport, che qui non scorre più).
  function onNativeScroll() {
    if (pinnedMode()) return;
    var target = window.innerHeight / 2;
    var chosen = stages[0];
    var bestDist = Infinity;
    stages.forEach(function (s) {
      var r = s.getBoundingClientRect();
      var dist = Math.abs((r.top + r.height / 2) - target);
      if (dist < bestDist) {
        bestDist = dist;
        chosen = s;
      }
    });
    setActive(chosen);
  }

  setHeight();
  onScroll();
  setActive(stages[0]);

  window.addEventListener('resize', function () {
    setHeight();
    onScroll();
  });
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('scroll', onNativeScroll, { passive: true });
})();
