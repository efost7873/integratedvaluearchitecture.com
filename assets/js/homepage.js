document.addEventListener("DOMContentLoaded", function () {
  var engine = document.getElementById("iva-structural-engine");
  if (!engine) return;

  var path = (window.location.pathname || "").toLowerCase();
  var isHome = path === "/" || path === "" || path === "/index.html";
  var isDiagnostic =
    path === "/diagnostic/" ||
    path === "/diagnostic.html" ||
    path.indexOf("/diagnostic/") === 0;

  var nodes = Array.prototype.slice.call(
    engine.querySelectorAll(".iva-structural-node")
  );

  var sectionLabel = engine.querySelector('[data-role="section-label"]');
  var sectionText = engine.querySelector('[data-role="section-text"]');

  var flyout = engine.querySelector(".iva-structural-flyout");
  var flyoutLabel = engine.querySelector('[data-role="flyout-label"]');

  function collapseEngine() {
    engine.classList.remove("engine-expanded");
    engine.classList.add("engine-collapsed");
  }

  function expandEngine() {
    engine.classList.remove("engine-collapsed");
    engine.classList.add("engine-expanded");
  }

  // Always start collapsed
  collapseEngine();

  var isHoveringEngine = false;

  // Expand only on hover (desktop)
  engine.addEventListener("mouseenter", function () {
    isHoveringEngine = true;
    expandEngine();
  });

  engine.addEventListener("mouseleave", function () {
    isHoveringEngine = false;
    collapseEngine();
    if (flyout) flyout.classList.remove("visible");
  });

  // Context for panel + flyout
  var homeSectionContext = {
    "what-iva-is": {
      label: "What IVA Is",
      text:
        "IVA describes the system you actually work inside, not just the financial story in reports."
    },
    "structural-mismatch": {
      label: "The structural mismatch IVA resolves",
      text:
        "Overload appears when organizations outgrow inherited structure and work keeps rolling downhill."
    },
    "what-people-realize": {
      label: "What people realize when they see IVA",
      text:
        "Many recurring problems are structural conditions, not individual performance failures."
    },
    "five-ledgers": {
      label: "The five ledgers of IVA",
      text:
        "Five distinct value domains with independent authority and evidence expectations."
    },
    "why-single-ledger-fails": {
      label: "Why the single ledger fails",
      text:
        "When one measure becomes the whole story, the rest of the system gets distorted."
    },
    "what-iva-provides": {
      label: "What IVA provides",
      text:
        "A structural map that clarifies decision rights, evidence, and where friction originates."
    },
    "what-iva-makes-possible": {
      label: "What IVA makes possible",
      text:
        "Less rework, fewer bottlenecks, and decisions that align with real constraints."
    },
    "who-uses-iva": {
      label: "Who uses IVA",
      text:
        "Leaders who need structural clarity, not another dashboard or culture initiative."
    },
    "why-organizations-choose-iva": {
      label: "Why organizations choose IVA",
      text:
        "Because it explains persistent patterns and makes governance visible and actionable."
    },
    "how-iva-works": {
      label: "How IVA works",
      text:
        "First map structure, then measure it honestly, then align governance around it."
    },
    "what-diagnostic-produces": {
      label: "What the IVA Diagnostic produces",
      text:
        "A diagnostic report that shows decision pathways, constraints, and structural risk."
    },
    "future-of-standard": {
      label: "The future of the IVA Standard",
      text:
        "The standard evolves as expectations and complexity evolve."
    },
    "begin-diagnostic": {
      label: "Begin the IVA Diagnostic",
      text:
        "Start by establishing a structural baseline before implementation."
    }
  };

  var diagnosticSectionContext = {
    "diag-intro": {
      label: "The IVA Diagnostic",
      text:
        "The entry point into IVA. It reveals structure and establishes a baseline. It does not implement change."
    },
    "diag-experiences": {
      label: "What You Are Experiencing",
      text:
        "Recurring friction, delays, and overload are structural signals, not personal shortcomings."
    },
    "diag-reveals": {
      label: "What the Diagnostic Reveals",
      text:
        "Decision flow, authority distribution, work movement, and early indicators of structural risk."
    },
    "diag-why": {
      label: "Why the Diagnostic Matters",
      text:
        "Most tools measure symptoms. The Diagnostic measures structure and prepares the ground for implementation."
    },
    "diag-gain": {
      label: "What You Gain",
      text:
        "A diagnostic report that maps constraints, capacity strain, decision slowdowns, and governance misalignment."
    },
    "diag-begin": {
      label: "Begin the IVA Diagnostic",
      text:
        "If the patterns feel familiar, start here. The next step is establishing contact and scope."
    }
  };

  function getContext(key) {
    if (isDiagnostic) return diagnosticSectionContext[key];
    return homeSectionContext[key];
  }

  // Node hover updates panel + flyout
  nodes.forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      var key = node.getAttribute("data-section");
      var ctx = getContext(key);
      if (!ctx) return;

      if (sectionLabel) sectionLabel.textContent = ctx.label || "";
      if (sectionText) sectionText.textContent = ctx.text || "";

      if (flyoutLabel) flyoutLabel.textContent = ctx.label || "";
      if (flyout) flyout.classList.add("visible");
    });

    node.addEventListener("mouseleave", function () {
      if (flyout) flyout.classList.remove("visible");
    });
  });

  // Header hide/show + engine visibility
  var lastScrollY = window.scrollY;
  var header = document.querySelector(".iva-header");

  function handleScroll() {
    var currentY = window.scrollY;

    if (header) {
      if (currentY > lastScrollY && currentY > 120) {
        header.classList.add("header-hidden");
      }

      if (currentY < 80) {
        header.classList.remove("header-hidden");
      }

      if (header.classList.contains("header-hidden")) {
        engine.classList.add("iva-engine-visible");
        if (!isHoveringEngine) collapseEngine();
      } else {
        engine.classList.remove("iva-engine-visible");
        collapseEngine();
        isHoveringEngine = false;
        if (flyout) flyout.classList.remove("visible");
      }
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Active node on scroll, one node per section
  var homeSectionIds = [
    "what-iva-is",
    "structural-mismatch",
    "what-people-realize",
    "five-ledgers",
    "why-single-ledger-fails",
    "what-iva-provides",
    "what-iva-makes-possible",
    "who-uses-iva",
    "why-organizations-choose-iva",
    "how-iva-works",
    "what-diagnostic-produces",
    "future-of-standard",
    "begin-diagnostic"
  ];

  var diagnosticSectionIds = [
    "diag-intro",
    "diag-experiences",
    "diag-reveals",
    "diag-why",
    "diag-gain",
    "diag-begin"
  ];

  function getActiveSectionId() {
    var ids = isDiagnostic ? diagnosticSectionIds : homeSectionIds;

    var sections = ids
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);

    if (!sections.length) return null;

    var scrollPos = window.scrollY + window.innerHeight * 0.33;
    var activeId = null;

    sections.forEach(function (section) {
      var rect = section.getBoundingClientRect();
      var top = rect.top + window.scrollY;
      var bottom = top + rect.height;

      if (scrollPos >= top && scrollPos < bottom) {
        activeId = section.id;
      }
    });

    return activeId;
  }

  function updateActiveNode() {
    var activeId = getActiveSectionId();

    nodes.forEach(function (node) {
      var key = node.getAttribute("data-section");
      if (activeId && key === activeId) {
        node.classList.add("iva-structural-node-active");
      } else {
        node.classList.remove("iva-structural-node-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNode);
  updateActiveNode();
});
