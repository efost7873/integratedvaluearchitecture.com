// ======================================================
// HEADER + MOBILE NAV
// ======================================================

const IVA_MOBILE_BREAKPOINT = 860;

const ivaHeader = document.querySelector(".iva-header");
const ivaToggle = document.getElementById("iva-menu-toggle");
const ivaNav = document.getElementById("iva-nav");
const ivaNavLinks = ivaNav ? ivaNav.querySelectorAll("a") : [];
const ivaNavGroups = document.querySelectorAll("[data-nav-group]");

function closeHeaderDropdowns() {
  ivaNavGroups.forEach((group) => {
    group.classList.remove("is-open");
    const trigger = group.querySelector(".iva-header-group-trigger");
    if (trigger) {
      trigger.setAttribute("aria-expanded", "false");
    }
  });
}

function openHeaderDropdown(group) {
  closeHeaderDropdowns();
  group.classList.add("is-open");

  const trigger = group.querySelector(".iva-header-group-trigger");
  if (trigger) {
    trigger.setAttribute("aria-expanded", "true");
  }
}

function toggleHeaderDropdown(group) {
  const isOpen = group.classList.contains("is-open");

  if (isOpen) {
    closeHeaderDropdowns();
  } else {
    openHeaderDropdown(group);
  }
}

function closeMobileMenu() {
  if (!ivaToggle || !ivaNav) return;
  ivaNav.classList.remove("is-open");
  ivaToggle.setAttribute("aria-expanded", "false");
  ivaToggle.setAttribute("aria-label", "Open menu");
  closeHeaderDropdowns();
}

function openMobileMenu() {
  if (!ivaToggle || !ivaNav) return;
  ivaNav.classList.add("is-open");
  ivaToggle.setAttribute("aria-expanded", "true");
  ivaToggle.setAttribute("aria-label", "Close menu");
}

function updateMenuState() {
  if (!ivaToggle || !ivaNav) return;

  if (window.innerWidth > IVA_MOBILE_BREAKPOINT) {
    ivaNav.classList.remove("is-open");
    ivaToggle.setAttribute("aria-expanded", "false");
    ivaToggle.setAttribute("aria-label", "Open menu");
  }

  closeHeaderDropdowns();
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
      if (window.innerWidth <= IVA_MOBILE_BREAKPOINT) {
        closeMobileMenu();
      }
    });
  });

  ivaNavGroups.forEach((group) => {
    const trigger = group.querySelector(".iva-header-group-trigger");
    if (!trigger) return;

    trigger.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleHeaderDropdown(group);
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeHeaderDropdowns();
      closeMobileMenu();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideAnyGroup = Array.from(ivaNavGroups).some((group) => group.contains(event.target));
    const clickedInsideNav = ivaNav.contains(event.target);
    const clickedToggle = ivaToggle.contains(event.target);

    if (!clickedInsideAnyGroup) {
      closeHeaderDropdowns();
    }

    if (window.innerWidth > IVA_MOBILE_BREAKPOINT) return;
    if (!ivaNav.classList.contains("is-open")) return;

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
