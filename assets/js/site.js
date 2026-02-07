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
// HEADER + ENGINE SCROLL BEHAVIOR
// ======================================================
//
// Behavior Spec:
// - Header always visible on load
// - Header hides ONLY when scrolling down
// - Header reappears when scrolling up
// - Engine appears ONLY when header hides AND screen >1100px
// - Engine disappears when header reappears
// - Engine always hidden on mobile (<780px)
//

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  let lastScroll = window.pageYOffset;

  function handleScroll() {
    const current = window.pageYOffset;

    const scrollingDown = current > lastScroll + 10;
    const scrollingUp = current < lastScroll - 10;

    const largeScreen = window.innerWidth > 1100;

    if (scrollingDown) {
      // Hide header
      root.classList.add("header-hidden");

      // Show engine only on large screens
      if (largeScreen) {
        root.classList.add("engine-visible");
      }
    }

    if (scrollingUp) {
      // Show header
      root.classList.remove("header-hidden");

      // Hide engine
      root.classList.remove("engine-visible");
    }

    lastScroll = current;
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
});


// ======================================================
// FOOTER OPACITY ON SCROLL
// ======================================================

const ivaFooter = document.querySelector('.iva-footer');

window.addEventListener('scroll', () => {
  if (!ivaFooter) return;
  ivaFooter.style.opacity = window.scrollY > 0 ? '0.96' : '1';
});
