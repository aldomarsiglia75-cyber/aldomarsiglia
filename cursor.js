(function () {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

  var dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(dot);

  var x = 0, y = 0, cx = 0, cy = 0;
  var hoverTargets = 'a, button, input, textarea, .project-card, .view-switch__btn';

  function loop() {
    cx += (x - cx) * 0.2;
    cy += (y - cy) * 0.2;
    dot.style.transform = 'translate(' + cx + 'px, ' + cy + 'px) translate(-50%, -50%)';
    requestAnimationFrame(loop);
  }

  document.addEventListener('mousemove', function (e) {
    x = e.clientX;
    y = e.clientY;
    dot.classList.add('is-active');
  });

  document.addEventListener('mouseleave', function () {
    dot.classList.remove('is-active');
  });

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(hoverTargets)) dot.classList.add('is-hover');
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(hoverTargets)) dot.classList.remove('is-hover');
  });

  requestAnimationFrame(loop);
})();
