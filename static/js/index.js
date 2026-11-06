/* =========================================
   AnimWeb-Bench Experiment Tabs
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const experimentSection = document.getElementById("experiments");

  if (!experimentSection) return;

  const tabs = experimentSection.querySelectorAll(
    '.experiment-tabs [role="tab"]'
  );

  const panels = experimentSection.querySelectorAll(
    '.experiment-panel[role="tabpanel"]'
  );

  function activateTab(tab) {

    const targetId = tab.getAttribute("aria-controls");

    // Update tab states
    tabs.forEach(function (item) {
      const isActive = item === tab;

      item.parentElement.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });

    // Show selected panel
    panels.forEach(function (panel) {
      panel.hidden = panel.id !== targetId;
    });

  }

  // Click to switch RQs
  tabs.forEach(function (tab) {

    tab.addEventListener("click", function (event) {
      event.preventDefault();
      activateTab(tab);
    });

    // Support keyboard navigation
    tab.addEventListener("keydown", function (event) {

      const currentIndex = Array.from(tabs).indexOf(tab);
      let nextIndex = currentIndex;

      if (event.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % tabs.length;
      } else if (event.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
      } else {
        return;
      }

      event.preventDefault();

      tabs[nextIndex].focus();
      activateTab(tabs[nextIndex]);

    });

  });

  // Initialize the first tab
  if (tabs.length > 0) {
    activateTab(tabs[0]);
  }

});

/* =========================================
   AnimWeb-Bench Findings Hover Interaction
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

  const findings = document.querySelectorAll(
    "#experiments .finding-item"
  );

  // Hover interaction only for devices with a real pointer
  const hoverSupported = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
  );

  findings.forEach(function (finding) {

    // Mouse enters: expand
    finding.addEventListener("mouseenter", function () {

      if (hoverSupported.matches) {
        finding.open = true;
      }

    });

    // Mouse leaves: collapse
    finding.addEventListener("mouseleave", function () {

      if (hoverSupported.matches) {
        finding.open = false;
      }

    });

  });

});