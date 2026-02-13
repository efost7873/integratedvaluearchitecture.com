// assets/js/homepage.js
document.addEventListener("DOMContentLoaded", function () {
  var engine = document.getElementById("iva-structural-engine");
  if (!engine) return;

  // ---------------------------------------------
  // Page detection
  // ---------------------------------------------
  var path = (window.location.pathname || "").toLowerCase();
  var isHome = path === "/" || path === "" || path === "/index.html";
  var isDiagnostic =
    path === "/diagnostic/" ||
    path === "/diagnostic.html" ||
    path.indexOf("/diagnostic/") === 0;

  // ---------------------------------------------
  // Engine state helpers
  // ---------------------------------------------
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

  var bar = engine.querySelector(".iva-structural-bar");
  var nodes = Array.prototype.slice.call(
    engine.querySelectorAll(".iva-structural-node")
  );
  var sectionLabel = engine.querySelector('[data-role="section-label"]');
  var sectionText = engine.querySelector('[data-role="section-text"]');

  var flyout = engine.querySelector(".iva-structural-flyout");
  var flyoutLabel = engine.querySelector('[data-role="flyout-label"]');

  // Track hover so scroll logic does not fight hover expansion
  var isHoveringEngine = false;

  // ---------------------------------------------
  // SECTION CONTEXT (homepage)
  // Keys must match node data-section values
  // ---------------------------------------------
  var homeSectionContext = {
    "what-iva-is": {
      label: "What IVA Is",
      text:
        "People recognize quickly that IVA is describing the system they actually work inside every day, not just the financial story they see in reports."
    },
    "structural-mismatch": {
      label: "The structural mismatch IVA resolves",
      text:
        "Anyone who has been asked to do more with less feels this mismatch immediately, because they are held to outcomes across many domains while everything is still framed through one ledger."
    },
    "what-people-realize": {
      label: "What people realize when they see IVA",
      text:
        "The moment people see IVA, they recognize that many of the problems they have been blamed for were never individual performance issues, they were structural conditions no one had language for."
    },
    "five-ledgers": {
      label: "The five ledgers of IVA",
      text:
        "People across functions see their work in the five ledgers because they already carry these responsibilities, they have just never seen them acknowledged as distinct forms of value."
    },
    "why-single-ledger-fails": {
      label: "Why the single ledger fails",
      text:
        "The single ledger failure is familiar to almost everyone: decisions skewed toward short term numbers, capacity ignored, legitimacy treated as optics, and future capability pushed aside."
    },
    "what-iva-provides": {
      label: "What IVA provides",
      text:
        "IVA gives people a structure that finally explains why their effort, skill, and commitment could not overcome the constraints built into the system."
    },
    "what-iva-makes-possible": {
      label: "What IVA makes possible",
      text:
        "Once the structural map is visible, people understand why friction, rework, and burnout felt inevitable, and why coordinated change suddenly feels possible instead of aspirational."
    },
    "who-uses-iva": {
      label: "Who uses IVA",
      text:
        "IVA shows up in places where people know their challenges are not just about motivation or culture, but about the way work, capacity, and expectations are structurally arranged."
    },
    "why-organizations-choose-iva": {
      label: "Why organizations choose IVA",
      text:
        "People support IVA because it gives them a shared structural language that matches what they experience in their roles, not just what appears in financial summaries."
    },
    "how-iva-works": {
      label: "How IVA works",
      text:
        "The sequence makes sense to people at every level: first see the structure, then measure it honestly, then align decisions and expectations around what it reveals."
    },
    "what-diagnostic-produces": {
      label: "What the IVA Diagnostic produces",
      text:
        "The diagnostic feels like someone finally mapped the real organization, showing how pressures travel across ledgers and why certain problems keep reappearing no matter who is in the role."
    },
    "future-of-standard": {
      label: "The future of the IVA Standard",
      text:
        "People understand why the standard must evolve, because the demands on their work keep changing faster than the systems that are supposed to support them."
    },
    "begin-diagnostic": {
      label: "Begin the IVA Diagnostic",
      text:
        "The diagnostic begins by mapping the real structure people work inside every day, revealing the pressures, constraints, and patterns that shape performance across all five ledgers."
    }
  };

  // ---------------------------------------------
  // SECTION CONTEXT (diagnostic)
  // If you want different copy shown in the panel on the diagnostic page,
  // set it here using the SAME KEYS as the nodes.
  // If you leave it empty, it will fallback to homepage context.
  // ---------------------------------------------
  var diagnosticSectionContext = {
    // Example overrides (optional). Keep keys the same as node data-section.
    // "begin-diagnostic": { label: "Start here", text: "..." }
  };

  function getContextForKey(key) {
    if (isDiagnostic && diagnosticSectionContext[key]) return diagnosticSectionContext[key];
    return homeSectionContext[key];
  }

  // ---------------------------------------------
  // Node hover behavior (panel + flyout)
  // ---------------------------------------------
  nodes.forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      var key = node.getAttribute("data-section");
      var ctx = getContextForKey(key);
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

  // ---------------------------------------------
  // Engine expansion on hover only
  // ---------------------------------------------
  engine.addEventListener("mouseenter", function () {
    isHoveringEngine = true;
    expandEngine();
  });

  engine.addEventListener("mouseleave", function () {
    isHoveringEngine = false;
    collapseEngine();
  });

  // ---------------------------------------------
  // Scroll visibility + header hide/show (unchanged behavior)
  // ---------------------------------------------
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

        // Always stay collapsed by default at all widths; expand only on hover.
        if (!isHoveringEngine) {
          collapseEngine();
        }
      } else {
        engine.classList.remove("iva-engine-visible");
        collapseEngine();
        isHoveringEngine = false;
      }
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // ---------------------------------------------
  // ACTIVE NODE ON SCROLL
  // ---------------------------------------------
  // Homepage section IDs (must exist on home)
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

  // Diagnostic section IDs (must exist on /diagnostic)
  // Replace these with the REAL ids on your diagnostic page.
  // Easiest method: set your diagnostic page section IDs to MATCH the node keys above,
  // and then you can literally reuse homeSectionIds here.
  var diagnosticSectionIds = [
    // Option 1 (recommended): make diagnostic sections use the same IDs as the node keys.
    // If you do that, replace this entire array with: homeSectionIds

    // Option 2: keep your diagnostic page IDs different, and list them here in the same order as the nodes.
    // Example placeholders:
    "diagnostic-intro",
    "diagnostic-scope",
    "diagnostic-document-matrix",
    "diagnostic-governance-triangle",
    "diagnostic-evidence",
    "diagnostic-deliverables",
    "diagnostic-timeline",
    "diagnostic-pricing",
    "diagnostic-engagement",
    "diagnostic-next-steps",
    "diagnostic-faq",
    "diagnostic-terms",
    "diagnostic-begin"
  ];

  function getPageSectionIds() {
    if (isDiagnostic) return diagnosticSectionIds;
    return homeSectionIds;
  }

  function getSectionsFromIds(ids) {
    return ids
      .map(function (id) {
        return document.getElementById(id);
      })
      .filter(Boolean);
  }

  function updateActiveNode() {
    var ids = getPageSectionIds();
    var sections = getSectionsFromIds(ids);

    if (!sections.length) {
      // Nothing to map to on this page; clear active state
      nodes.forEach(function (node) {
        node.classList.remove("iva-structural-node-active");
      });
      return;
    }

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

    // Map active section id -> node
    // If your diagnostic IDs differ from node keys, you need a mapping here.
    // Recommended: make diagnostic IDs match node keys and this will just work.
    var activeKey = activeId;

    // If diagnostic ids are different, map them by index position:
    if (isDiagnostic) {
      var idx = diagnosticSectionIds.indexOf(activeId);
      if (idx >= 0 && idx < nodes.length) {
        activeKey = nodes[idx].getAttribute("data-section");
      }
    }

    nodes.forEach(function (node) {
      var key = node.getAttribute("data-section");
      if (key === activeKey) {
        node.classList.add("iva-structural-node-active");
      } else {
        node.classList.remove("iva-structural-node-active");
      }
    });
  }

  window.addEventListener("scroll", updateActiveNode);
  updateActiveNode();
});
