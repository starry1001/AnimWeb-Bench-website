window.HELP_IMPROVE_VIDEOJS = false;

var INTERP_BASE = "./static/interpolation/stacked";
var NUM_INTERP_FRAMES = 240;

var interp_images = [];
function preloadInterpolationImages() {
  for (var i = 0; i < NUM_INTERP_FRAMES; i++) {
    var path = INTERP_BASE + '/' + String(i).padStart(6, '0') + '.jpg';
    interp_images[i] = new Image();
    interp_images[i].src = path;
  }
}

function setInterpolationImage(i) {
  var image = interp_images[i];
  image.ondragstart = function() { return false; };
  image.oncontextmenu = function() { return false; };
  $('#interpolation-image-wrapper').empty().append(image);
}


$(document).ready(function() {
    // Check for click events on the navbar burger icon
    $(".navbar-burger").click(function() {
      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");

    });

    var options = {
			slidesToScroll: 1,
			slidesToShow: 3,
			loop: true,
			infinite: true,
			autoplay: false,
			autoplaySpeed: 3000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);

    // Loop on each carousel initialized
    for(var i = 0; i < carousels.length; i++) {
    	// Add listener to  event
    	carousels[i].on('before:show', state => {
    		console.log(state);
    	});
    }

    // Access to bulmaCarousel instance of an element
    var element = document.querySelector('#my-element');
    if (element && element.bulmaCarousel) {
    	// bulmaCarousel instance is available as element.bulmaCarousel
    	element.bulmaCarousel.on('before-show', function(state) {
    		console.log(state);
    	});
    }

    /*var player = document.getElementById('interpolation-video');
    player.addEventListener('loadedmetadata', function() {
      $('#interpolation-slider').on('input', function(event) {
        console.log(this.value, player.duration);
        player.currentTime = player.duration / 100 * this.value;
      })
    }, false);*/
    preloadInterpolationImages();

    $('#interpolation-slider').on('input', function(event) {
      setInterpolationImage(this.value);
    });
    setInterpolationImage(0);
    $('#interpolation-slider').prop('max', NUM_INTERP_FRAMES - 1);

    bulmaSlider.attach();

})


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