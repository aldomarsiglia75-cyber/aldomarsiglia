// Agentation dev toolbar. Sito statico senza build step: niente
// NODE_ENV, quindi il gate "solo sviluppo" è sull'hostname (localhost /
// 127.0.0.1). React/ReactDOM arrivano dall'import map in <head>, il
// pacchetto agentation via esm.sh con React esterno (stessa istanza,
// niente duplicati). Il componente si monta da solo in un portal — il
// div qui sotto serve solo da radice React.
(async function () {
  var isLocal = location.hostname === 'localhost' || location.hostname === '127.0.0.1';
  if (!isLocal) return;

  var React = await import('react');
  var ReactDOMClient = await import('react-dom/client');
  var Agentation = (await import('https://esm.sh/agentation@3.0.2?external=react,react-dom')).Agentation;

  var mount = document.createElement('div');
  mount.id = 'agentation-root';
  document.body.appendChild(mount);

  ReactDOMClient.createRoot(mount).render(
    React.createElement(Agentation, { endpoint: 'http://localhost:4747' })
  );
})();
