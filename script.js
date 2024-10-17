// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Create Lucide icons
    lucide.createIcons();

    // Get DOM elements
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    const aboutButton = document.getElementById('aboutButton');
    const aboutSection = document.getElementById('aboutSection');

    // Dark mode toggle functionality
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.setAttribute('data-lucide', 'moon');
        } else {
            icon.setAttribute('data-lucide', 'sun');
        }
        lucide.createIcons();
    });

    // About section toggle functionality
    aboutButton.addEventListener('click', () => {
        aboutSection.classList.toggle('hidden');
    });

    // Parallax effect
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        document.querySelector('.parallax-blur').style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').setAttribute('data-lucide', 'moon');
        lucide.createIcons();
    }

    // Save theme preference when toggled
    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
});