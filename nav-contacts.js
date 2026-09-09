(function () {
  document.querySelectorAll('.nav-contacts').forEach(function (wrap) {
    var trigger = wrap.querySelector('.nav-contacts__trigger');
    var panel = wrap.querySelector('.nav-contacts__panel');
    if (!trigger || !panel) return;

    function close() {
      wrap.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
      panel.hidden = true;
    }

    function open() {
      wrap.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
      panel.hidden = false;
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
