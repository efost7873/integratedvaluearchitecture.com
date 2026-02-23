// ======================================================
// MOBILE MENU TOGGLE
// ======================================================

const ivaToggle = document.getElementById('iva-menu-toggle');
const ivaNav = document.getElementById('iva-nav');

const ivaLedgersDetails = document.querySelector('.iva-header-details');
const ivaLedgersSubLinks = document.querySelectorAll('.iva-header-sublink');

function closeLedgersMenu() {
  if (ivaLedgersDetails) {
    ivaLedgersDetails.removeAttribute('open');
  }
}

function updateMenu() {
  if (!ivaToggle || !ivaNav) return;

  if (window.innerWidth < 780) {
    ivaToggle.style.display = 'block';
    ivaNav.classList.remove('is-open');
    closeLedgersMenu();
  } else {
    ivaToggle.style.display = 'none';
    ivaNav.classList.remove('is-open');
    closeLedgersMenu();
  }
}

if (ivaToggle && ivaNav) {
  ivaToggle.addEventListener('click', () => {
    ivaNav.classList.toggle('is-open');

    // If the nav is being closed, also close the ledgers submenu
    if (!ivaNav.classList.contains('is-open')) {
      closeLedgersMenu();
    }
  });
}

window.addEventListener('resize', updateMenu);
updateMenu();


// ======================================================
// LEDGERS SUBMENU CLOSE BEHAVIOR
// ======================================================

// Close when clicking outside the details/menu area
document.addEventListener('click', (event) => {
  if (!ivaLedgersDetails) return;

  if (!ivaLedgersDetails.contains(event.target)) {
    closeLedgersMenu();
  }
});

// Close on Escape key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeLedgersMenu();

    // Also close mobile nav if open, because escape should mean "close menus"
    if (ivaNav && ivaNav.classList.contains('is-open')) {
      ivaNav.classList.remove('is-open');
    }
  }
});

// Close when a ledger sublink is clicked
if (ivaLedgersSubLinks && ivaLedgersSubLinks.length > 0) {
  ivaLedgersSubLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeLedgersMenu();

      // On mobile, collapse the nav after choosing a destination
      if (ivaNav && window.innerWidth < 780) {
        ivaNav.classList.remove('is-open');
      }
    });
  });
}

// Close when focus moves away (keyboard navigation / accessibility)
document.addEventListener('focusin', (event) => {
  if (!ivaLedgersDetails) return;

  // If details is open and focus moved outside it, close it
  if (ivaLedgersDetails.hasAttribute('open') && !ivaLedgersDetails.contains(event.target)) {
    closeLedgersMenu();
  }
});


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

    if (currentY > lastScrollY && currentY > 120) {
      header.classList.add("header-hidden");
      // If header hides, also close ledgers submenu so it never floats open
      closeLedgersMenu();
    }

    if (currentY < 80) {
      header.classList.remove("header-hidden");
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleHeaderScroll);
  handleHeaderScroll();
})();
