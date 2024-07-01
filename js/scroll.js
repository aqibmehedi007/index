// Show or hide the scroll-to-top button based on scroll position
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
}

// Scroll to the top of the page when the button is clicked
function scrollToTop() {
  const targetY = 0; // Target scroll position (top of the page)
  const duration = 800; // Duration of the scroll animation in milliseconds
  const easing = easeInOutQuad; // Easing function (you can change this if needed)

  const startY = window.scrollY || window.pageYOffset; // Current scroll position
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime(); // Start time of the animation

  const scroll = () => {
    const currentTime = 'now' in window.performance ? performance.now() : new Date().getTime(); // Current time
    const timeElapsed = currentTime - startTime; // Time elapsed since the animation started

    // Calculate the new scroll position based on the easing function
    const newY = easing(timeElapsed, startY, targetY - startY, duration);
    window.scrollTo(0, newY); // Scroll to the new position

    // Continue scrolling if the duration hasn't elapsed yet
    if (timeElapsed < duration) {
      requestAnimationFrame(scroll);
    }
  };

  // Start the scrolling animation
  scroll();
}

// Easing function for smooth scrolling
// You can use different easing functions as needed
function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
}
