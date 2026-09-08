(function () {
  var el = document.querySelector('.nav-clock');
  if (!el) return;

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function tick() {
    var now = new Date();
    el.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
  }

  tick();
  setInterval(tick, 1000);
})();
