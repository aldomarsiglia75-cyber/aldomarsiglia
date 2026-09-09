(function () {
  var mql = window.matchMedia('(max-width: 640px)');

  document.querySelectorAll('.site-nav').forEach(function (nav) {
    var trigger = nav.querySelector('.brand-mark');
    var panel = nav.querySelector('.nav-menu__panel');
    if (!trigger || !panel) return;

    function close() {
      trigger.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
    }

    function open() {
      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
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
