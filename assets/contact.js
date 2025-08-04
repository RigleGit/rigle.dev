// /assets/contact.js
const form = document.getElementById('contactForm');
document.getElementById('source').value = 'contacto';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: data,
      headers: { 'Accept': 'application/json' } // <-- clave para evitar HTML/redirect
    });

    // Si la API devolviera HTML por lo que sea, evita petar el JSON:
    const text = await res.text();
    let json;
    try { json = JSON.parse(text); } catch { json = null; }

    if (json && json.success) {
      document.getElementById('modalEnviado').style.display = 'flex';
      form.reset();
    } else {
      console.error('Web3Forms response:', text);
      document.getElementById('modalError').style.display = 'flex';
    }
  } catch (err) {
    console.error(err);
    document.getElementById('modalError').style.display = 'flex';
  }
});
