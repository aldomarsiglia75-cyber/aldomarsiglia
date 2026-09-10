(function () {
  var mql = window.matchMedia('(max-width: 640px)');

  document.querySelectorAll('.site-nav').forEach(function (nav) {
    var trigger = nav.querySelector('.brand-mark');
    var panel = nav.querySelector('.nav-menu__panel');
    if (!trigger || !panel) return;

    // transitions-dev menu-dropdown: is-open/is-closing pilotano la
    // transizione, [hidden] si aggiunge solo a chiusura completata così
    // l'animazione di uscita non viene tagliata da display:none.
    var closeMs = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--dropdown-close-dur')
    ) || 150;
    var closeTimer = null;

    function close() {
      trigger.setAttribute('aria-expanded', 'false');
      clearTimeout(closeTimer);
      panel.classList.remove('is-open');
      panel.classList.add('is-closing');
      closeTimer = setTimeout(function () {
        panel.classList.remove('is-closing');
        panel.hidden = true;
      }, closeMs);
    }

    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      clearTimeout(closeTimer);
      panel.classList.remove('is-closing');
      panel.hidden = false;
      void panel.offsetWidth;
      panel.classList.add('is-open');
    }

    // Solo sotto i 640px il logo apre il menu invece di navigare
    // direttamente alla home — su desktop il click passa inalterato.
    trigger.addEventListener('click', function (e) {
      if (!mql.matches) return;
      e.preventDefault();
      e.stopPropagation();
      if (panel.hidden) {
        open();
      } else {
        close();
      }
    });

    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });

    // se la finestra torna sopra i 640px col menu aperto, richiudilo.
    mql.addEventListener('change', function () {
      if (!mql.matches) close();
    });
  });
})();
