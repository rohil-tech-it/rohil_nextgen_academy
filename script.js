// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', (e) => {
    // Only close menu if it's not a dropdown trigger
    if (!e.target.closest('.nav-item').querySelector('.dropdown')) {
        navMenu.classList.remove('active');
    }
}));

// Mobile Dropdown Functionality
document.querySelectorAll('.nav-item').forEach(item => {
    const dropdown = item.querySelector('.dropdown');
    const navLink = item.querySelector('.nav-link');

    if (dropdown) {
        // Add click event for mobile dropdowns
        navLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();

                // Close other open dropdowns
                document.querySelectorAll('.dropdown.active').forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.classList.remove('active');
                        otherDropdown.previousElementSibling.classList.remove('active');
                    }
                });

                // Toggle current dropdown
                dropdown.classList.toggle('active');
                navLink.classList.toggle('active');
            }
        });
    }
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        if (!e.target.closest('.nav-item') && !e.target.closest('.hamburger')) {
            document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                dropdown.classList.remove('active');
                dropdown.previousElementSibling.classList.remove('active');
            });
        }
    }
});

// Carousel Functionality
const carouselItems = document.querySelectorAll('.carousel-item');
const carouselDots = document.querySelectorAll('.carousel-dot');
let currentIndex = 0;

function showSlide(index) {
    // Hide all slides
    carouselItems.forEach(item => item.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));

    // Show the selected slide
    carouselItems[index].classList.add('active');
    carouselDots[index].classList.add('active');
    currentIndex = index;
}

// Add click event to dots
carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Auto slide change
let carouselInterval = setInterval(() => {
    let nextIndex = (currentIndex + 1) % carouselItems.length;
    showSlide(nextIndex);
}, 5000);

// Pause carousel on hover
carouselItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });

    item.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % carouselItems.length;
            showSlide(nextIndex);
        }, 5000);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Close mobile menu on resize if window becomes larger
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
            dropdown.previousElementSibling.classList.remove('active');
        });
    }
});

