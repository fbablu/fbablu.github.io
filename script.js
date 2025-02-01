// Menu functionality
const menuTrigger = document.querySelector('.menu-trigger');
const menuPopup = document.querySelector('.menu-popup');
let isMenuOpen = false;

// Toggle menu when clicking the dot
menuTrigger.addEventListener('click', (event) => {
  event.stopPropagation();
  isMenuOpen = !isMenuOpen;
  menuPopup.classList.toggle('active', isMenuOpen);
});

// Close menu when clicking outside
document.addEventListener('click', (event) => {
  if (isMenuOpen && 
      !menuPopup.contains(event.target) && 
      !menuTrigger.contains(event.target)) {
    isMenuOpen = false;
    menuPopup.classList.remove('active');
  }
});