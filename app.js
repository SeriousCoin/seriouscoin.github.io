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

document.getElementById("copyAddress").addEventListener("click", function() {
    var textToCopy = "We Told You The Presale Was Closed.";
    var button = this; // Store a reference to the button
    var materialicon = button.querySelector("span");
    
    var tempInput = document.createElement("input");
    tempInput.setAttribute("value", textToCopy);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // Change the button's icon to a checkmark after copying
    materialicon.innerHTML = "check"; // Assuming "done" is your checkmark icon
    materialicon.classList.add("check"); // Add a class to style the "done" icon
    button.style.backgroundColor = "#1DB954"; // Change button background color
    
    // Optionally, you can revert the icon and background color back to its original state after a certain delay
    setTimeout(function() {
      materialicon.innerHTML = "content_copy"; // Assuming "content_copy" is your original icon
      button.style.backgroundColor = ""; // Revert button background color to default
      materialicon.classList.remove("check"); // Remove the class added to style the "done" icon
    }, 1500); // Change 1500 to the delay time you want in milliseconds
  });

  document.getElementById("copyAddressMobile").addEventListener("click", function() {
    var textToCopy = "We Told You The Presale Was Closed.";
    var button = this; // Store a reference to the button
    var materialicon = button.querySelector(".material-symbols-outlined");
    var buttonText = button.querySelector(".button-text");
    
    var tempInput = document.createElement("input");
    tempInput.setAttribute("value", textToCopy);
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    
    // Change the button's icon to a checkmark after copying
    materialicon.innerHTML = "check"; // Assuming "done" is your checkmark icon
    materialicon.classList.add("check"); // Add a class to style the "done" icon
    buttonText.textContent = "Presale Address Copied";
    buttonText.style.color = "#f1f2f3";
    button.style.backgroundColor = "#1DB954"; // Change button background color
    
    // Optionally, you can revert the icon and background color back to its original state after a certain delay
    setTimeout(function() {
      materialicon.innerHTML = "content_copy"; // Assuming "content_copy" is your original icon
      button.style.backgroundColor = ""; // Revert button background color to default
      materialicon.classList.remove("check"); // Remove the class added to style the "done" icon
      buttonText.textContent = "Copy Presale Address";
      buttonText.style.color = "#101010";
    }, 2000); // Change 1500 to the delay time you want in milliseconds
  });


/*
var card = document.getElementById('landingimage');
var documentContainer = document.documentElement; // Change this if you have a specific container

var mouseHover = false;
var mousePosition = { x: 0, y: 0 };
var cardSize = { width: 0, height: 0 };
var SCALE_X = 8;
var SCALE_Y = 16;

documentContainer.onblur = function() {
  mouseHover = false;
};

documentContainer.onfocus = function() {
  mouseHover = true;
};

documentContainer.onmousemove = function(e) {
  if (!mouseHover) return;
  var rect = card.getBoundingClientRect();
  var x = e.clientX - rect.left;
  var y = e.clientY - rect.top;
  mousePosition = { x, y };
  cardSize = {
    width: card.offsetWidth || 0,
    height: card.offsetHeight || 0,
  };
  card.style.transform = `perspective(1000px) rotateX(${
    (mousePosition.y / cardSize.height) * -(SCALE_Y * 2) + SCALE_Y
  }deg) rotateY(${
    (mousePosition.x / cardSize.width) * (SCALE_X * 2) - SCALE_X
  }deg) translateZ(10px)`;
};

documentContainer.onmouseout = function() {
  mouseHover = false;
  card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
};

documentContainer.onmouseover = function() {
  mouseHover = true;
};
*/

/*
var card = document.getElementById('landingimage');
var documentContainer = document.documentElement; // Change this if you have a specific container

var rotationX = 0; // Initialize rotation variables
var rotationY = 0;

var SCALE_X = 8;
var SCALE_Y = 16;

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

// On mobile devices, continuously tilt the image left and right
function tiltLoop() {
  rotationY += 0.5; // Adjust the speed of rotation as needed

  card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(10px)`;

  requestAnimationFrame(tiltLoop); // Call tiltLoop recursively
}

// If on mobile, initiate tilt loop, otherwise, use mouse hover animation
if (isMobileDevice()) {
  tiltLoop();
} else {
  documentContainer.onmousemove = function(e) {
    var rect = card.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;
    mousePosition = { x, y };
    cardSize = {
      width: card.offsetWidth || 0,
      height: card.offsetHeight || 0,
    };
    card.style.transform = `perspective(1000px) rotateX(${
      (mousePosition.y / cardSize.height) * -(SCALE_Y * 2) + SCALE_Y
    }deg) rotateY(${
      (mousePosition.x / cardSize.width) * (SCALE_X * 2) - SCALE_X
    }deg) translateZ(10px)`;
  };

  documentContainer.onmouseout = function() {
    mouseHover = false;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  documentContainer.onmouseover = function() {
    mouseHover = true;
  };
}
*/

/*
var card = document.getElementById('landingimage');
var documentContainer = document.documentElement; // Change this if you have a specific container

var rotationY = 0; // Initialize rotation variables for Y-axis
var SCALE_Y = 16; // Adjust these values for the desired rotation range
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

// On mobile devices, continuously tilt the image left and right along the Y-axis
function tiltLoop() {
  rotationY += 0.25 * direction; // Adjust the speed of rotation as needed

  // Check if rotation reaches 180 degrees, then reverse the direction
  if (rotationY >= 30 || rotationY <= -30) {
    direction *= -1;
  }

  card.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(10px)`;

  requestAnimationFrame(tiltLoop); // Call tiltLoop recursively
}

// If on mobile, initiate tilt loop for Y-axis tilt
if (isMobileDevice()) {
  tiltLoop();
} else {
  documentContainer.onmousemove = function(e) {
    // You can keep your existing mouse hover animation code here if needed
  };

  documentContainer.onmouseout = function() {
    mouseHover = false;
    card.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  };

  documentContainer.onmouseover = function() {
    mouseHover = true;
  };
}
*/
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
