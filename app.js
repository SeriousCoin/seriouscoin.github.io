//Nav Mobile Menu
const navSlide = () => {
  const burger = document.querySelector('.burger');
  const nav = document.querySelector('nav ul');
  const navLinks = document.querySelectorAll('nav ul li')

  //Toggle Nav
  burger.addEventListener('click', () => {
      nav.classList.toggle('nav-active');

  //Animate Links
  navLinks.forEach((link, index) => {
      if (link.style.animation) {
          link.style.animation = ''
      } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 10 + 0.1}s`
      }
      });
      //Burger Animation
      burger.classList.toggle('toggle');
      // Prevent body scroll when menu is open
      if (nav.classList.contains('nav-active')) {
        body.style.overflow = 'hidden';
      } else {
        body.style.overflow = '';
      }
  });

  // Close burger menu when clicking outside of navbar and nav ul
  document.addEventListener('click', (event) => {
    if (!event.target.closest('nav') && !event.target.closest('.burger')) {
      nav.classList.remove('nav-active');
      burger.classList.remove('toggle');
      body.style.overflow = '';

      // Reset nav link animations
      navLinks.forEach((link, index) => {
        link.style.animation = '';
      });
    }
  });
}

navSlide();

//Hide Navigation on Scroll
const body = document.body;
let lastScroll = 0;

window.addEventListener("scroll", () => {
const currentScroll = window.pageYOffset;
if (currentScroll <= 0) {
  body.classList.remove("scroll-up");
  return;
}

if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
  body.classList.remove("scroll-up");
  body.classList.add("scroll-down");
} else if (
  currentScroll < lastScroll &&
  body.classList.contains("scroll-down")
) {
  body.classList.remove("scroll-down");
  body.classList.add("scroll-up");
}
lastScroll = currentScroll;
});

console.clear();

if (window.innerWidth > 768) {
  const cardsContainer = document.querySelector(".cards");
  const cardsContainerInner = document.querySelector(".cards__inner");
  const cards = Array.from(document.querySelectorAll(".card"));
  const overlay = document.querySelector(".overlay");

  const applyOverlayMask = (e) => {
    const overlayEl = e.currentTarget;
    const x = e.pageX - cardsContainer.offsetLeft;
    const y = e.pageY - cardsContainer.offsetTop;

    overlayEl.style = `--opacity: 1; --x: ${x}px; --y:${y}px;`;
  };

  const createOverlayCta = (overlayCard, ctaEl) => {
    const overlayCta = document.createElement("div");
    overlayCta.classList.add("cta");
    overlayCta.textContent = ctaEl.textContent;
    overlayCta.setAttribute("aria-hidden", true);
    overlayCard.append(overlayCta);
  };

  const observer = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const cardIndex = cards.indexOf(entry.target);
      let width = entry.borderBoxSize[0].inlineSize;
      let height = entry.borderBoxSize[0].blockSize;

      if (cardIndex >= 0) {
        overlay.children[cardIndex].style.width = `${width}px`;
        overlay.children[cardIndex].style.height = `${height}px`;
      }
    });
  });

  const initOverlayCard = (cardEl) => {
    const overlayCard = document.createElement("div");
    overlayCard.classList.add("card");
    createOverlayCta(overlayCard, cardEl.lastElementChild);
    overlay.append(overlayCard);
    observer.observe(cardEl);
  };

  cards.forEach(initOverlayCard);
  document.body.addEventListener("pointermove", applyOverlayMask);
}

//Landing Image Hover
var card = document.getElementById('landingimage');
var documentContainer = document.documentElement; // Change this if you have a specific container

var rotationX = 0; // Initialize rotation variables for desktop
var rotationY = 0; // Initialize rotation variables for mobile
var SCALE_X = 8; // Adjust these values for the desired rotation range for desktop
var SCALE_Y = 16; // Adjust these values for the desired rotation range for mobile
var direction = 1; // Variable to track the direction of rotation

// Function to check if the device is a mobile device
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

documentContainer.onblur = function() {
  mouseHover = false;
};

documentContainer.onfocus = function() {
  mouseHover = true;
};

// On desktop devices, tilt the image based on mouse hover
function tiltDesktop(e) {
  var rect = card.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  var mousePosition = { x, y };
  var cardSize = {
    width: card.offsetWidth || 0,
    height: card.offsetHeight || 0,
  };
  card.style.transform = `perspective(1000px) rotateX(${
    (mousePosition.y / cardSize.height) * -(SCALE_Y * 2) + SCALE_Y
  }deg) rotateY(${
    (mousePosition.x / cardSize.width) * (SCALE_X * 2) - SCALE_X
  }deg) translateZ(10px)`;
}

// On mobile devices, continuously tilt the image left and right along the Y-axis
function tiltMobile() {
  rotationY += 0.2 * direction; // Adjust the speed of rotation as needed

  // Check if rotation reaches 180 degrees, then reverse the direction
  if (rotationY >= 25 || rotationY <= -25) {
    direction *= -1;
  }

  card.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(10px)`;

  requestAnimationFrame(tiltMobile); // Call tiltMobile recursively
}

// Add event listeners for desktop and mobile animations
if (isMobileDevice()) {
  tiltMobile();
} else {
  documentContainer.addEventListener('mousemove', tiltDesktop);

  documentContainer.onmouseout = function() {
    mouseHover = false;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  documentContainer.onmouseover = function() {
    mouseHover = true;
  };
}
