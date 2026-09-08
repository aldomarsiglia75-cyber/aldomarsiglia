(function () {
  document.querySelectorAll('[data-slideshow]').forEach(function (box) {
    var imgs = box.querySelectorAll('.hero-thumb__img');
    if (!imgs.length) return;
    var i = 0;
    setInterval(function () {
      imgs[i].classList.remove('is-active');
      i = (i + 1) % imgs.length;
      imgs[i].classList.add('is-active');
    }, 1200);

    // touch: mostra i colori reali finché il dito resta sul rettangolo.
    box.addEventListener('touchstart', function () { box.classList.add('is-touched'); }, { passive: true });
    box.addEventListener('touchend', function () { box.classList.remove('is-touched'); });
  });
})();
