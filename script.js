// script.js
document.addEventListener('DOMContentLoaded', () => {
    const downloadButton = document.getElementById('downloadButton');
    const overlay = document.getElementById('overlay');
    const closeOverlayButton = document.getElementById('closeOverlayButton');

    // Function to open the overlay
    const openOverlay = () => {
        overlay.classList.add('active');
    };

    // Function to close the overlay
    const closeOverlay = () => {
        overlay.classList.remove('active');
    };

    // Event listener for the download button
    if (downloadButton) {
        downloadButton.addEventListener('click', openOverlay);
    }

    // Event listener for the close button in the overlay
    if (closeOverlayButton) {
        closeOverlayButton.addEventListener('click', closeOverlay);
    }

    // Optional: Close overlay if clicked outside the content (but within the overlay container)
    if (overlay) {
        overlay.addEventListener('click', (event) => {
            // Check if the click occurred directly on the overlay container, not its children
            if (event.target === overlay) {
                closeOverlay();
            }
        });
    }
});

// Dropdown Menu
const menuToggle = document.getElementById('menuToggle');
const menuContent = document.getElementById('menuContent');

menuToggle.addEventListener('click', () => {
    menuContent.classList.toggle('hidden');
});

// Optional: close when clicking outside
document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !menuContent.contains(e.target)) {
        menuContent.classList.add('hidden');
    }
});

// Main Background transition
const backgrounds = [
    'img/BG-Color.webp',
    'img/BG-Color2.jpg',
    'img/BG-Color4.jpg'
];

const wrapper = document.querySelector('.main-background');

function setRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    wrapper.style.setProperty('--bg-url', `url('${backgrounds[randomIndex]}')`);
}

setRandomBackground();
setInterval(setRandomBackground, 10000);
