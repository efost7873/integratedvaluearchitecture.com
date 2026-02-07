// === FLOATING NAV: FADE-IN ON SCROLL ===
const floatingNav = document.getElementById('iva-floating-nav');

window.addEventListener('scroll', () => {
  if (!floatingNav) return;
  if (window.scrollY > 260) {
    floatingNav.classList.add('visible');
  } else {
    floatingNav.classList.remove('visible');
  }
});

// === STRUCTURAL ENGINE ===
document.addEventListener("DOMContentLoaded", function () {
  var engine = document.getElementById("iva-structural-engine");
  if (!engine) return;

  var nodes = Array.prototype.slice.call(
    engine.querySelectorAll(".iva-structural-node")
  );
  var domainLabel = engine.querySelector('[data-role="domain-label"]');
  var domainText = engine.querySelector('[data-role="domain-text"]');
  var domainRelations = engine.querySelector('[data-role="domain-relations"]');

  var domainDefinitions = {
    financial: {
      label: "Financial ledger",
      text: "Monetary structure that shapes incentives, constraints, and reported performance.",
      relations: "Interacts strongly with operational, capacity, and externalities domains."
    },
    operational: {
      label: "Operational ledger",
      text: "Workflow and execution structure that reveals how work actually moves.",
      relations: "Closely tied to capacity and learning, and influenced by financial constraints."
    },
    capacity: {
      label: "Capacity ledger",
      text: "Staffing, systems, data, and infrastructure that carry organizational load.",
      relations: "Pressure here often appears as performance problems in other domains."
    },
    externalities: {
      label: "Externalities and equity ledger",
      text: "Legitimacy, obligations, exposures, and distributional structure.",
      relations: "Connects internal decisions to communities, regulators, and long term risk."
    },
    learning: {
      label: "Learning and innovation ledger",
      text: "Learning, adaptation, and future capability as structural value.",
      relations: "Determines how quickly the organization can respond to structural signals."
    },
    "capacity-pressure": {
      label: "Capacity pressures",
      text: "Points where load, constraints, and expectations are misaligned.",
      relations: "Often sits at the intersection of operational, capacity, and financial decisions."
    }
  };

  var sectionDomains = [
    { id: "what-iva-is", domain: "financial" },
    { id: "structural-mismatch", domain: "capacity-pressure" },
    { id: "what-people-realize", domain: "capacity-pressure" },
    { id: "five-ledgers", domain: "financial" },
    { id: "why-single-ledger-fails", domain: "financial" },
    { id: "what-iva-provides", domain: "operational" },
    { id: "what-iva-makes-possible", domain: "capacity" },
    { id: "who-uses-iva", domain: "externalities" },
    { id: "why-organizations-choose-iva", domain: "learning" },
    { id: "how-iva-works", domain: "operational" },
    { id: "what-diagnostic-produces", domain: "capacity" },
    { id: "future-of-standard", domain: "externalities" },
    { id: "begin-diagnostic", domain: "capacity-pressure" },
    { id: "standard-intro", domain: "financial" },
    { id: "standard-ledgers", domain: "financial" },
    { id: "standard-scope", domain: "operational" },
    { id: "standard-download", domain: "learning" },
    { id: "standard-meta", domain: "externalities" },
    { id: "diag-intro", domain: "financial" },
    { id: "diag-experiences", domain: "capacity-pressure" },
    { id: "diag-reveals", domain: "operational" },
    { id: "diag-why", domain: "externalities" },
    { id: "diag-gain", domain: "capacity" },
    { id: "diag-notice", domain: "externalities" },
    { id: "diag-begin", domain: "capacity-pressure" }
  ];

  var observedSections = [];

  sectionDomains.forEach(function (item) {
    var el = document.getElementById(item.id);
    if (!el) return;
    observedSections.push({ element: el, domain: item.domain });
  });

  if (!observedSections.length) return;

  function setActiveDomain(domainKey) {
    var def = domainDefinitions[domainKey];
    if (!def) return;

    nodes.forEach(function (node) {
      if (node.getAttribute("data-domain") === domainKey) {
        node.classList.add("iva-structural-node-active");
      } else {
        node.classList.remove("iva-structural-node-active");
      }
    });

    domainLabel.textContent = def.label;
    domainText.textContent = def.text;
    domainRelations.textContent = def.relations;
  }

  nodes.forEach(function (node) {
    node.addEventListener("click", function () {
      var key = node.getAttribute("data-domain");
      setActiveDomain(key);
    });
  });

  var observer = new IntersectionObserver(
    function (entries) {
      var visible = entries
        .filter(function (entry) {
          return entry.isIntersecting;
        })
        .sort(function (a, b) {
          return b.intersectionRatio - a.intersectionRatio;
        });

      if (!visible.length) return;

      var top = visible[0].target;
      var match = observedSections.find(function (item) {
        return item.element === top;
      });

      if (match) {
        setActiveDomain(match.domain);
      }
    },
    {
      root: null,
      threshold: [0.25, 0.5, 0.75]
    }
  );

  observedSections.forEach(function (item) {
    observer.observe(item.element);
  });

  setActiveDomain("financial");
});

// === SECTION HIGHLIGHTING USING INTERSECTION OBSERVER ===
const navLinks = document.querySelectorAll('#iva-floating-nav a');
const sections = [...navLinks].map(link => {
  const id = link.getAttribute('href').replace('#', '');
  return document.getElementById(id);
});

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    },
    {
      root: null,
      rootMargin: '0px 0px -60% 0px',
      threshold: 0.15
    }
  );

  sections.forEach(section => {
    if (section) observer.observe(section);
  });
}

// === SMOOTH SCROLL FOR FLOATING NAV (respects reduced motion) ===
const prefersReducedMotion =
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const targetId = href.slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    event.preventDefault();

    const rect = target.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - 90;

    if (prefersReducedMotion) {
      window.scrollTo(0, offset);
    } else {
      window.scrollTo({
        top: offset,
        behavior: 'smooth'
      });
    }
  });
});
