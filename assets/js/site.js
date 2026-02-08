// ======================================================
// MOBILE MENU TOGGLE
// ======================================================

const ivaToggle = document.getElementById('iva-menu-toggle');
const ivaNav = document.getElementById('iva-nav');

function updateMenu() {
  if (window.innerWidth < 780) {
    ivaToggle.style.display = 'block';
    ivaNav.style.display = 'none';
  } else {
    ivaToggle.style.display = 'none';
    ivaNav.style.display = 'flex';
  }
}

ivaToggle.addEventListener('click', () => {
  ivaNav.style.display = ivaNav.style.display === 'none' ? 'flex' : 'none';
});

window.addEventListener('resize', updateMenu);
updateMenu();


// ======================================================
// HEADER + ENGINE SCROLL BEHAVIOR (200px threshold)
// ======================================================
//
// States:
// 1. Top of page (<200px):
//    - Header visible
//    - Engine hidden
//
// 2. Mid-range (>=200px but header still visible):
//    - Header visible
//    - Engine collapsed into gutter
//
// 3. Scrolled down (>200px):
//    - Header hidden
//    - Engine fully expanded
//

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  const header = document.querySelector('.iva-header');
  const engine = document.getElementById('iva-structural-engine');
  const threshold = 200;

  function handleScroll() {
    const current = window.pageYOffset;
    const largeScreen = window.innerWidth > 1100;

    if (current === 0) {
      // STATE 1 — Top of page
      header.classList.remove("header-hidden");
      engine.classList.remove("iva-engine-visible");
      engine.classList.remove("engine-collapsed");
      return;
    }

    if (current > 0 && current < threshold) {
      // STATE 2 — Mid-range: header visible, engine collapsed
      header.classList.remove("header-hidden");
      engine.classList.remove("iva-engine-visible");
      engine.classList.add("engine-collapsed");
      return;
    }

    if (current >= threshold) {
      // STATE 3 — Header hidden, engine expanded
      header.classList.add("header-hidden");
      engine.classList.remove("engine-collapsed");
      if (largeScreen) {
        engine.classList.add("iva-engine-visible");
      }
      return;
    }
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();
});


// ======================================================
// FOOTER OPACITY ON SCROLL
// ======================================================

const ivaFooter = document.querySelector('.iva-footer');

window.addEventListener('scroll', () => {
  if (!ivaFooter) return;
  ivaFooter.style.opacity = window.scrollY > 0 ? '0.96' : '1';
});
