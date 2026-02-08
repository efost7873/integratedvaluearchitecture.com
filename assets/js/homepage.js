// === STRUCTURAL ENGINE ===
document.addEventListener("DOMContentLoaded", function () {
  var engine = document.getElementById("iva-structural-engine");
  if (!engine) return;

  var bar = engine.querySelector(".iva-structural-bar");
  var nodes = Array.prototype.slice.call(
    engine.querySelectorAll(".iva-structural-node")
  );
  var sectionLabel = engine.querySelector('[data-role="section-label"]');
  var sectionText = engine.querySelector('[data-role="section-text"]');

  var flyout = engine.querySelector(".iva-structural-flyout");
  var flyoutLabel = engine.querySelector('[data-role="flyout-label"]');

  var sectionContext = {
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
      label
