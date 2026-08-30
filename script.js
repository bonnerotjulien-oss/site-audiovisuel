const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Showreel : lecture uniquement après interaction pour conserver le son.
const shell = document.getElementById('showreelShell');
if (shell) {
  const playShowreel = () => {
    if (shell.querySelector('video')) return;
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = shell.dataset.poster;
    const source = document.createElement('source');
    source.src = shell.dataset.video;
    source.type = 'video/mp4';
    video.appendChild(source);
    shell.innerHTML = '';
    shell.appendChild(video);
    video.play().catch(() => {});
  };
  shell.addEventListener('click', playShowreel);
}

// Formulaire de contact AJAX via FormSubmit : le visiteur reste sur le site.
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
if (form && status) {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const button = form.querySelector('.form-submit');
    button.disabled = true;
    status.classList.remove('error');
    status.textContent = 'Envoi en cours…';

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('FormSubmit error');
      form.reset();
      status.textContent = 'Merci. Votre message a bien été envoyé.';
    } catch (error) {
      status.classList.add('error');
      status.textContent = 'L’envoi n’a pas abouti. Merci de réessayer dans quelques instants.';
    } finally {
      button.disabled = false;
    }
  });
}
