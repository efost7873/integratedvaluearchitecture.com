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

// ======================================================
// ANALYTICS + CTA TRACKING
// ======================================================

const ivaBody = document.body;

const IVA_PROBLEM_PATHS = {
  "/approval-bottlenecks/": "approval-bottlenecks",
  "/slow-decisions-decision-rights/": "slow-decisions-decision-rights",
  "/stalled-strategy-execution/": "stalled-strategy-execution",
  "/unclear-roles-duplicate-work/": "unclear-roles-duplicate-work",
  "/silos-broken-handoffs/": "silos-broken-handoffs"
};

function normalizePath(pathname) {
  if (!pathname || pathname === "/index.html") return "/";

  let normalized = pathname.trim();

  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }

  normalized = normalized.replace(/index\.html$/i, "");

  if (normalized.length > 1 && !normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  return normalized || "/";
}

function slugifyValue(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function getAnchorLabel(anchor) {
  const explicitLabel = anchor.dataset.ivaCtaLabel;
  if (explicitLabel) {
    return explicitLabel.trim();
  }

  const heading = anchor.querySelector("h2, h3, h4, h5, h6");
  if (heading && heading.textContent.trim()) {
    return heading.textContent.trim();
  }

  const text = anchor.textContent.replace(/\s+/g, " ").trim();
  if (text) {
    return text;
  }

  return anchor.getAttribute("href") || "link";
}

function buildAbsoluteUrl(href) {
  try {
    return new URL(href, window.location.origin);
  } catch (error) {
    return null;
  }
}

function getPageContext() {
  const pagePath = normalizePath(
    ivaBody?.dataset.pagePath || window.location.pathname
  );

  const pageId =
    ivaBody?.dataset.pageId || (pagePath === "/" ? "home" : slugifyValue(pagePath));

  const pageType =
    ivaBody?.dataset.pageType ||
    (IVA_PROBLEM_PATHS[pagePath] ? "problem" : "standard");

  const problemId =
    ivaBody?.dataset.problemId || IVA_PROBLEM_PATHS[pagePath] || "";

  return {
    pagePath,
    pageId,
    pageType,
    problemId
  };
}

const ivaPage = getPageContext();

function trackGaEvent(eventName, params = {}) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", eventName, {
    ...params,
    transport_type: "beacon"
  });
}

function trackClarityEvent(eventName, params = {}) {
  if (typeof window.clarity !== "function") return;

  window.clarity("event", eventName);

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;
    window.clarity("set", `iva_${key}`, String(value));
  });
}

function trackEvent(eventName, params = {}) {
  trackGaEvent(eventName, params);
  trackClarityEvent(eventName, params);
}

function applyPageTags() {
  if (typeof window.clarity !== "function") return;

  window.clarity("set", "iva_page_path", ivaPage.pagePath);
  window.clarity("set", "iva_page_id", ivaPage.pageId);
  window.clarity("set", "iva_page_type", ivaPage.pageType);

  if (ivaPage.problemId) {
    window.clarity("set", "iva_problem_id", ivaPage.problemId);
  }
}

function inferCtaMetadata(anchor) {
  const href = anchor.getAttribute("href");
  if (!href) return null;

  const url = buildAbsoluteUrl(href);
  if (!url) return null;

  const explicitType = anchor.dataset.ivaCtaType;
  const label = getAnchorLabel(anchor);
  const absoluteHref = url.toString();
  const normalizedHrefPath = normalizePath(url.pathname);

  const metadata = {
    type: explicitType || "",
    label,
    href: absoluteHref,
    path: normalizedHrefPath,
    internalRedirect: false
  };

  if (!metadata.type) {
    if (href.startsWith("mailto:")) {
      metadata.type = "contact";
      metadata.contactMethod = "email";
    } else if (
      normalizedHrefPath === "/contact/" ||
      normalizedHrefPath === "/contact"
    ) {
      metadata.type = "contact";
      metadata.contactMethod = "contact_page";
    } else if (
      normalizedHrefPath === "/book-advisory-call/" ||
      normalizedHrefPath === "/book-advisory-call"
    ) {
      metadata.type = "payment";
      metadata.paymentOffer = "advisory_call";
      metadata.internalRedirect = true;
    } else if (/^https:\/\/buy\.stripe\.com\//i.test(absoluteHref)) {
      metadata.type = "payment";

      if (/cNi5kE3jmcGAfJcdLBfrW03/i.test(absoluteHref)) {
        metadata.paymentOffer = "supporter_program";
      }
    } else if (
      /(^|\.)outlook\.office\.com$/i.test(url.hostname) &&
      /^\/book\//i.test(url.pathname)
    ) {
      metadata.type = "booking";
      metadata.bookingOffer = "advisory_call";
    } else if (
      /^book\.ms$/i.test(url.hostname) ||
      /(^|\.)book\.ms$/i.test(url.hostname)
    ) {
      metadata.type = "booking";
      metadata.bookingOffer = "general_booking";
    }
  }

  if (!metadata.type) {
    return null;
  }

  if (anchor.dataset.ivaPaymentOffer) {
    metadata.paymentOffer = anchor.dataset.ivaPaymentOffer;
  }

  if (anchor.dataset.ivaBookingOffer) {
    metadata.bookingOffer = anchor.dataset.ivaBookingOffer;
  }

  if (anchor.dataset.ivaContactMethod) {
    metadata.contactMethod = anchor.dataset.ivaContactMethod;
  }

  anchor.dataset.ivaCtaType = metadata.type;

  if (metadata.paymentOffer) {
    anchor.dataset.ivaPaymentOffer = metadata.paymentOffer;
  }

  if (metadata.bookingOffer) {
    anchor.dataset.ivaBookingOffer = metadata.bookingOffer;
  }

  if (metadata.contactMethod) {
    anchor.dataset.ivaContactMethod = metadata.contactMethod;
  }

  return metadata;
}

function buildBaseEventParams(anchor, metadata) {
  return {
    source_page: ivaPage.pagePath,
    source_page_id: ivaPage.pageId,
    source_page_type: ivaPage.pageType,
    source_problem_id: ivaPage.problemId || undefined,
    cta_label: metadata.label,
    destination_url: metadata.href,
    destination_path: metadata.path || undefined,
    link_text_slug: slugifyValue(metadata.label) || undefined,
    link_classes: anchor.className || undefined
  };
}

function annotatePaymentRedirect(anchor, metadata) {
  const url = buildAbsoluteUrl(anchor.getAttribute("href"));
  if (!url) return;

  url.searchParams.set("iva_source_page", ivaPage.pagePath);
  url.searchParams.set("iva_source_page_type", ivaPage.pageType);
  url.searchParams.set("iva_cta_type", metadata.type);
  url.searchParams.set("iva_cta_label", metadata.label);

  if (ivaPage.problemId) {
    url.searchParams.set("iva_source_problem_id", ivaPage.problemId);
  }

  if (metadata.paymentOffer) {
    url.searchParams.set("iva_payment_offer", metadata.paymentOffer);
  }

  anchor.href = url.toString();
}

function trackProblemPageView() {
  if (ivaPage.pageType !== "problem" || !ivaPage.problemId) return;

  trackEvent("problem_page_view", {
    problem_page_id: ivaPage.problemId,
    page_path: ivaPage.pagePath
  });
}

function trackProblemHubSelection(anchor) {
  if (ivaPage.pageType !== "problem_hub") return;

  const href = anchor.getAttribute("href");
  const url = buildAbsoluteUrl(href);
  if (!url) return;

  const problemId = IVA_PROBLEM_PATHS[normalizePath(url.pathname)];
  if (!problemId) return;

  trackEvent("problem_hub_select", {
    source_page: ivaPage.pagePath,
    problem_page_id: problemId,
    selected_path: normalizePath(url.pathname),
    cta_label: getAnchorLabel(anchor)
  });
}

function trackCtaClick(anchor, metadata) {
  const params = buildBaseEventParams(anchor, metadata);

  if (metadata.type === "contact") {
    trackEvent("contact_click", {
      ...params,
      contact_method: metadata.contactMethod || "unknown"
    });
    return;
  }

  if (metadata.type === "booking") {
    trackEvent("booking_click", {
      ...params,
      booking_offer: metadata.bookingOffer || "booking"
    });
    return;
  }

  if (metadata.type === "payment" && !metadata.internalRedirect) {
    trackEvent("payment_click", {
      ...params,
      payment_offer: metadata.paymentOffer || "payment"
    });
  }
}

document.addEventListener("click", (event) => {
  const anchor = event.target.closest("a[href]");
  if (!anchor) return;

  trackProblemHubSelection(anchor);

  const metadata = inferCtaMetadata(anchor);
  if (!metadata) return;

  if (metadata.internalRedirect) {
    annotatePaymentRedirect(anchor, metadata);
    return;
  }

  trackCtaClick(anchor, metadata);
});

applyPageTags();
trackProblemPageView();
