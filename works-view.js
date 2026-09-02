(function () {
  var grid = document.querySelector('[data-project-grid]');
  var buttons = document.querySelectorAll('.view-switch__btn');
  if (!grid || !buttons.length) return;

  function setView(view) {
    grid.setAttribute('data-view', view);
    buttons.forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.view === view));
    });
    try { localStorage.setItem('worksView', view); } catch (e) {}
  }

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () { setView(btn.dataset.view); });
  });

  var saved = null;
  try { saved = localStorage.getItem('worksView'); } catch (e) {}
  setView(saved === 'list' ? 'list' : 'grid');
})();
