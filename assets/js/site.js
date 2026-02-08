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
// Behavior:
// - Header visible from 0–200px
// - Engine hidden from 0–200px
// - After 200px: header hides, engine shows
// - Scrolling up does NOT show header unless back above 200px
// - Engine stays visible until header returns
//

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  let lastScroll = window.pageYOffset;
  const threshold = 200;

  function handleScroll() {
    const current = window.pageYOffset;
    const largeScreen = window.innerWidth > 1100;

    if (current > threshold) {
      root.classList.add("header-hidden");
      if (largeScreen) {
        root.classList.add("engine-visible");
      }
    } else {
      root.classList.remove("header-hidden");
      root.classList.remove("engine-visible");
    }

    lastScroll = current;
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
