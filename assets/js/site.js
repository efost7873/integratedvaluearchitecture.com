// ======================================================
// HEADER + MOBILE NAV
// ======================================================

const ivaHeader = document.querySelector(".iva-header");
const ivaToggle = document.getElementById("iva-menu-toggle");
const ivaNav = document.getElementById("iva-nav");
const ivaNavLinks = ivaNav ? ivaNav.querySelectorAll("a") : [];

function closeMobileMenu() {
  if (!ivaToggle || !ivaNav) return;
  ivaNav.classList.remove("is-open");
  ivaToggle.setAttribute("aria-expanded", "false");
  ivaToggle.setAttribute("aria-label", "Open menu");
}

function openMobileMenu() {
  if (!ivaToggle || !ivaNav) return;
  ivaNav.classList.add("is-open");
  ivaToggle.setAttribute("aria-expanded", "true");
  ivaToggle.setAttribute("aria-label", "Close menu");
}

function updateMenuState() {
  if (!ivaToggle || !ivaNav) return;

  if (window.innerWidth > 820) {
    ivaNav.classList.remove("is-open");
    ivaToggle.setAttribute("aria-expanded", "false");
    ivaToggle.setAttribute("aria-label", "Open menu");
  }
}

if (ivaToggle && ivaNav) {
  ivaToggle.addEventListener("click", () => {
    const isOpen = ivaNav.classList.contains("is-open");
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  ivaNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 820) {
        closeMobileMenu();
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (window.innerWidth > 820) return;
    if (!ivaNav.classList.contains("is-open")) return;

    const clickedInsideNav = ivaNav.contains(event.target);
    const clickedToggle = ivaToggle.contains(event.target);

    if (!clickedInsideNav && !clickedToggle) {
      closeMobileMenu();
    }
  });

  window.addEventListener("resize", updateMenuState);
  updateMenuState();
}

// ======================================================
// HEADER SCROLL STATE
// ======================================================

function updateHeaderScrollState() {
  if (!ivaHeader) return;

  if (window.scrollY > 12) {
    ivaHeader.classList.add("scrolled");
  } else {
    ivaHeader.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderScrollState, { passive: true });
updateHeaderScrollState();
