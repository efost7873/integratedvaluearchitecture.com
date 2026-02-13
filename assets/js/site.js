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
// FOOTER OPACITY ON SCROLL
// ======================================================

const ivaFooter = document.querySelector('.iva-footer');

window.addEventListener('scroll', () => {
  if (!ivaFooter) return;
  ivaFooter.style.opacity = window.scrollY > 0 ? '0.96' : '1';
});

// ======================================================
// HEADER HIDE / SHOW ON SCROLL (SITE-WIDE)
// ======================================================

(function () {
  var header = document.querySelector(".iva-header");
  if (!header) return;

  var lastScrollY = window.scrollY;

  function handleHeaderScroll() {
    var currentY = window.scrollY;

    // Hide header on scroll down after user is past the top
    if (currentY > lastScrollY && currentY > 120) {
      header.classList.add("header-hidden");
    }

    // Show header when near top
    if (currentY < 80) {
      header.classList.remove("header-hidden");
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();
})();
