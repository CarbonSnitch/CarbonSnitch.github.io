// Mark JS as active — reveal CSS only applies when this class is present
document.documentElement.classList.add('js-ready');

// ── Scroll reveal ──
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
);
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Force-show any reveal elements already in the viewport on load
// (handles #hash navigation where elements are in view before observer fires)
window.addEventListener('load', () => {
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('visible');
    }
  });
});

// ── Header shrink on scroll ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Video switcher ──
const video = document.getElementById('featured-video');
document.querySelectorAll('.vsw-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.vsw-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const src = btn.dataset.src;
    video.querySelector('source').src = src;
    video.load();
    video.play();
  });
});

// ── Mobile menu toggle ──
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.header-nav');
toggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
