// assets/js/homepage.js
// Structural Engine behavior for Home and Diagnostic
document.addEventListener("DOMContentLoaded", function () {
  var engine = document.getElementById("iva-structural-engine");
  if (!engine) return;

  // Always start collapsed
  engine.classList.add("engine-collapsed");
  engine.classList.remove("engine-expanded");

  var nodes = Array.prototype.slice.call(
    engine.querySelectorAll(".iva-structural-node")
  );

  var sectionLabel = engine.querySelector('[data-role="section-label"]');
  var sectionText = engine.querySelector('[data-role="section-text"]');

  var flyout = engine.querySelector(".iva-structural-flyout");
  var flyoutLabel = engine.querySelector('[data-role="flyout-label"]');

  var path = (window.location.pathname || "").toLowerCase();
  var isDiagnostic =
    path === "/diagnostic/" ||
    path === "/diagnostic.html" ||
    path.indexOf("/diagnostic/") === 0;

  // Hover copy for homepage nodes (unchanged from your original)
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

  // Hover copy for diagnostic nodes (only used if your diagnostic nodes use diag-* keys)
  var diagnosticSectionContext = {
    "diag-intro": {
      label: "The IVA Diagnostic",
      text:
        "The entry point into IVA. It establishes the structural baseline required for governance and performance decisions."
    },
    "diag-experiences": {
      label: "What You Are Experiencing",
      text:
        "Recurring friction and overload are structural signals that the organization has outgrown inherited structure."
    },
    "diag-reveals": {
      label: "What the Diagnostic Reveals",
      text:
        "Decision flow, authority distribution, work movement, and early indicators of structural risk and governance misalignment."
    },
    "diag-why": {
      label: "Why the Diagnostic Matters",
      text:
        "Most tools measure symptoms. The Diagnostic measures structure and prepares the ground for implementation."
    },
    "diag-gain": {
      label: "What You Gain",
      text:
        "A diagnostic report that maps constraints, decision slowdowns, capacity strain, and structural risk."
    },
    "diag-begin": {
      label: "Begin the IVA Diagnostic",
      text:
        "If these patterns are familiar, this is the right place to start."
    }
  };

  function getContext(key, nodeEl) {
    if (isDiagnostic && diagnosticSectionContext[key]) return diagnosticSectionContext[key];
    if (homeSectionContext[key]) return homeSectionContext[key];

    // Fallback: use the node label text if no context exists
    var labelEl = nodeEl ? nodeEl.querySelector(".iva-structural-label") : null;
    var fallbackLabel = labelEl ? labelEl.textContent : "Structural context";
    return { label: fallbackLabel, text: "Hover over a node to explore the structural meaning." };
  }

  // Node hover behavior (panel + flyout)
  nodes.forEach(function (node) {
    node.addEventListener("mouseenter", function () {
      var key = node.getAttribute("data-section");
      var ctx = getContext(key, node);

      if (sectionLabel) sectionLabel.textContent = ctx.label || "";
      if (sectionText) sectionText.textContent = ctx.text || "";

      if (flyoutLabel) flyoutLabel.textContent = ctx.label || "";
      if (flyout) flyout.classList.add("visible");
    });

    node.addEventListener("mouseleave", function () {
      if (flyout) flyout.classList.remove("visible");
    });
  });

  // Expand only on hover, never auto-expand by screen width
  var isHoveringEngine = false;

  engine.addEventListener("mouseenter", function () {
    isHoveringEngine = true;
    engine.classList.add("engine-expanded");
    engine.classList.remove("engine-collapsed");
  });

  engine.addEventListener("mouseleave", function () {
    isHoveringEngine = false;
    engine.classList.remove("engine-expanded");
    engine.classList.add("engine-collapsed");
    if (flyout) flyout.classList.remove("visible");
  });

  // Scroll visibility + header hide/show
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

        // Default state while visible is collapsed, expand only if hovering
        if (!isHoveringEngine) {
          engine.classList.add("engine-collapsed");
          engine.classList.remove("engine-expanded");
        }
      } else {
        engine.classList.remove("iva-engine-visible");
        engine.classList.remove("engine-expanded");
        engine.classList.add("engine-collapsed");
      }
    }

    lastScrollY = currentY;
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  // Active node on scroll (auto-maps to whatever nodes exist on this page)
  function setupActiveNodeTracking() {
    if (!nodes.length) return;

    var sectionIds = nodes
      .map(function (n) { return n.getAttribute("data-section"); })
      .filter(Boolean);

    var sections = sectionIds
      .map(function (id) { return document.getElementById(id); })
      .filter(Boolean);

    // If this is empty, your node data-section values do not match real section IDs
    if (!sections.length) return;

    function setActive(activeId) {
      nodes.forEach(function (node) {
        var key = node.getAttribute("data-section");
        if (key === activeId) node.classList.add("iva-structural-node-active");
        else node.classList.remove("iva-structural-node-active");
      });
    }

    if ("IntersectionObserver" in window) {
      var currentActive = null;

      var observer = new IntersectionObserver(
        function (entries) {
          var visible = entries
            .filter(function (e) { return e.isIntersecting; })
            .sort(function (a, b) { return b.intersectionRatio - a.intersectionRatio; });

          if (!visible.length) return;

          var newActive = visible[0].target.id;
          if (newActive && newActive !== currentActive) {
            currentActive = newActive;
            setActive(currentActive);
          }
        },
        {
          root: null,
          rootMargin: "-35% 0px -55% 0px",
          threshold: [0.05, 0.15, 0.25, 0.35, 0.5]
        }
      );

      sections.forEach(function (s) { observer.observe(s); });

      // Initialize to first section
      setActive(sections[0].id);
      return;
    }

    // Fallback: scroll-based
    function updateActiveFallback() {
      var scrollPos = window.scrollY + window.innerHeight * 0.33;
      var activeId = null;

      sections.forEach(function (section) {
        var rect = section.getBoundingClientRect();
        var top = rect.top + window.scrollY;
        var bottom = top + rect.height;
        if (scrollPos >= top && scrollPos < bottom) activeId = section.id;
      });

      if (activeId) setActive(activeId);
    }

    window.addEventListener("scroll", updateActiveFallback);
    updateActiveFallback();
  }

  setupActiveNodeTracking();
});
