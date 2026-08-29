const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('in'); });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Auto-active le showreel dès que assets/showreel.mp4 existe sur le site.
const shell = document.getElementById('showreelShell');
if (shell) {
  const src = shell.dataset.video;
  const poster = shell.dataset.poster;
  fetch(src, { method: 'HEAD', cache: 'no-store' }).then(r => {
    if (!r.ok) return;
    const video = document.createElement('video');
    video.controls = true;
    video.playsInline = true;
    video.preload = 'metadata';
    video.poster = poster;
    const source = document.createElement('source');
    source.src = src;
    source.type = 'video/mp4';
    video.appendChild(source);
    shell.innerHTML = '';
    shell.appendChild(video);
  }).catch(() => {});
}
