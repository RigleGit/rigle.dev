// /assets/pack.js
(function () {
  const form = document.getElementById('packForm');
  const btn  = document.getElementById('packBtn');
  const modalError = document.getElementById('modalPackError');
  const modalErrorMsg = document.getElementById('modalPackErrorMsg');

  function isValidEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name   = (fd.get('name')   || '').toString().trim();
    const email  = (fd.get('email')  || '').toString().trim();
    const packId = (fd.get('packId') || 'c100').toString().trim();

    if (!isValidEmail(email)) {
      modalErrorMsg.textContent = 'Introduce un correo válido.';
      modalError.style.display = 'flex';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Enviando…';

    try {
      const res = await fetch('/api/send-pack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, packId })
      });
      const json = await res.json().catch(() => null);
      if (json && json.ok) {
        window.location.href = '/c100/gracias/index.html';
        return;
      }
      modalErrorMsg.textContent = 'Hubo un problema enviando el pack. Inténtalo más tarde.';
      modalError.style.display = 'flex';
    } catch (err) {
      modalErrorMsg.textContent = 'Error de red. Inténtalo de nuevo en unos minutos.';
      modalError.style.display = 'flex';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Quiero el pack';
    }
  });

  // Captura utm_content/origen y lo coloca en el campo oculto
  const params = new URLSearchParams(location.search);
  const sourceInput = document.getElementById('source');
  if (sourceInput) {
    sourceInput.value = params.get('utm_content') || 'c100_pack';
  }
})();
