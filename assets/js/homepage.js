// === FLOATING NAV: FADE-IN ON SCROLL ===
const floatingNav = document.getElementById('iva-floating-nav');

window.addEventListener('scroll', () => {
  if (!floatingNav) return;
  if (window.scrollY > 260) {
    floatingNav.classList.add('visible');
  } else {
    floatingNav.classList.remove('visible');
  }
});

// === SECTION HIGHLIGHTING USING INTERSECTION OBSERVER ===
const navLinks = document.querySelectorAll('#iva-floating-nav a');
const sections = [...navLinks].map(link => {
  const id = link.getAttribute('href').replace('#', '');
  return document.getElementById(id);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0.15
    }
  );

  sections.forEach(section => {
    if (section) observer.observe(section);
  });
}

// === SMOOTH SCROLL FOR FLOATING NAV (respects reduced motion) ===
const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();

    const rect = target.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 90;

    if (prefersReducedMotion) {
      window.scrollTo(0, offset);
    } else {
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  });
});
