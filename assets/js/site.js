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
// SLIDE-AWAY HEADER (Identity Bar + Header)
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
  const root = document.documentElement;
  let lastScroll = window.pageYOffset;

  function handleScroll() {
    const current = window.pageYOffset;

    // Only apply slide-away on large screens
    if (window.innerWidth > 1100) {
      if (current > lastScroll + 10) {
        // scrolling down
        root.classList.add("header-hidden");
      } else if (current < lastScroll - 10) {
        // scrolling up
        root.classList.remove("header-hidden");
      }
    } else {
      // below 1100px, header is hidden by CSS
      root.classList.remove("header-hidden");
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
