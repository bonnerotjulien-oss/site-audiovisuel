const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('on');
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const glow = document.querySelector('.cursor-glow');
if (glow && window.matchMedia('(pointer:fine)').matches) {
  window.addEventListener('pointermove', (e) => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top = `${e.clientY}px`;
  });
}

const hero = document.querySelector('.hero-media');
if (hero && window.matchMedia('(min-width: 900px)').matches) {
  window.addEventListener('scroll', () => {
    const y = Math.min(window.scrollY * 0.08, 32);
    hero.style.transform = `scale(1.035) translateY(${y}px)`;
  }, { passive: true });
}
