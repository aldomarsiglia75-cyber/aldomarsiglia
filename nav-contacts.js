(function () {
  document.querySelectorAll('.nav-contacts').forEach(function (wrap) {
    var trigger = wrap.querySelector('.nav-contacts__trigger');
    var panel = wrap.querySelector('.nav-contacts__panel');
    if (!trigger || !panel) return;

    // transitions-dev menu-dropdown: is-open/is-closing sul pannello
    // pilotano la transizione, [hidden] si aggiunge solo a chiusura
    // completata così l'animazione di uscita non viene tagliata da
    // display:none.
    var closeMs = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue('--dropdown-close-dur')
    ) || 150;
    var closeTimer = null;

    function close() {
      wrap.classList.remove('is-open');
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
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      clearTimeout(closeTimer);
      panel.classList.remove('is-closing');
      panel.hidden = false;
      void panel.offsetWidth;
      panel.classList.add('is-open');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (wrap.classList.contains('is-open')) {
        close();
      } else {
        open();
      }
    });

    document.addEventListener('click', function (e) {
      if (!wrap.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  });
})();
