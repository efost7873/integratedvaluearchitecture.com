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
// ENGINE VISIBILITY ON SCROLL (NOT EXPANSION)
// ======================================================
//
// Behavior:
// - Engine hidden at top (0px)
// - Engine visible after threshold (200px)
// - Engine ALWAYS collapsed unless hovered
//

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector('.iva-header');
  const engine = document.getElementById('iva-structural-engine');
  const threshold = 200;

  function handleScroll() {
    const current = window.pageYOffset;

    if (current < threshold) {
      header.classList.remove("header-hidden");
      engine.classList.remove("iva-engine-visible");
      return;
    }

    header.classList.add("header-hidden");
    engine.classList.add("iva-engine-visible");
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();


  // ======================================================
  // ENGINE EXPANSION ON HOVER (NOT SCROLL)
  // ======================================================

  engine.addEventListener("mouseenter", () => {
    engine.classList.add("engine-expanded");
    engine.classList.remove("engine-collapsed");
  });

  engine.addEventListener("mouseleave", () => {
    engine.classList.remove("engine-expanded");
    engine.classList.add("engine-collapsed");
  });
});


// ======================================================
// FOOTER OPACITY ON SCROLL
// ======================================================

const ivaFooter = document.querySelector('.iva-footer');

window.addEventListener('scroll', () => {
  if (!ivaFooter) return;
  ivaFooter.style.opacity = window.scrollY > 0 ? '0.96' : '1';
});
