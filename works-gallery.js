(function () {
  var section = document.querySelector('.h-gallery');
  var track = document.querySelector('.h-gallery__track');
  var progressFill = document.querySelector('.h-gallery__progress-fill');

  var mq = window.matchMedia('(min-width: 641px)');
  var raf = null;

  function pinnedMode() {
    return mq.matches;
  }

  function setHeight() {
    if (!section || !track) return;
    if (!pinnedMode()) {
      section.style.height = '';
      track.style.transform = '';
      return;
    }
    var extra = Math.max(0, track.scrollWidth - window.innerWidth);
    section.style.height = (window.innerHeight + extra) + 'px';
  }

  function onScroll() {
    if (!section || !track) return;
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

  if (section && track) {
    setHeight();
    onScroll();
    window.addEventListener('resize', function () {
      setHeight();
      onScroll();
    });
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // al clic su un progetto (gallery o lista): prima la dissolvenza in rosso,
  // poi si segue il link.
  var clickables = document.querySelectorAll('.h-gallery__item, .works-list__row');
  for (var i = 0; i < clickables.length; i++) {
    clickables[i].addEventListener('click', function (e) {
      if (this.classList.contains('is-active')) return;
      e.preventDefault();
      var href = this.getAttribute('href');
      this.classList.add('is-active');
      setTimeout(function () {
        window.location.href = href;
      }, 420);
    });
  }

  // toggle Scroll / Lista
  var toggleButtons = document.querySelectorAll('[data-view-btn]');
  var panels = document.querySelectorAll('[data-view-panel]');

  function setView(view) {
    toggleButtons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.getAttribute('data-view-btn') === view));
    });
    panels.forEach(function (panel) {
      panel.hidden = panel.getAttribute('data-view-panel') !== view;
    });
    if (view === 'scroll') {
      setHeight();
      onScroll();
    }
  }

  toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      setView(btn.getAttribute('data-view-btn'));
    });
  });
})();
