(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (!header || !toggle || !nav) return;

  function setOpen(open) {
    header.setAttribute('data-nav-open', String(open));
    toggle.setAttribute('aria-expanded', String(open));
  }

  toggle.addEventListener('click', function () {
    setOpen(header.getAttribute('data-nav-open') !== 'true');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('.nav__item')) setOpen(false);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });

  document.addEventListener('click', function (e) {
    if (!header.contains(e.target)) setOpen(false);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 640) setOpen(false);
  });
})();
