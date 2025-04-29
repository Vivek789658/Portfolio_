// Navigation active state
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

// Intersection Observer for sections
const observerOptions = {
    threshold: 0.3
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            updateActiveLink(id);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

function updateActiveLink(sectionId) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('nav')) {
        mobileMenuBtn.classList.remove('active');
        navLinksContainer.classList.remove('active');
    }
});

// Initialize EmailJS
(function () {
    // Replace with your EmailJS public key
    emailjs.init("YOUR_PUBLIC_KEY");
})();

// Contact form handling
const contactForm = document.getElementById('contact-form');
const sendBtn = contactForm.querySelector('button[type="submit"]');
const buttonText = sendBtn.querySelector('.button-text');
const buttonIcon = sendBtn.querySelector('.button-icon');

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Show loading state
    buttonText.textContent = 'Sending...';
    sendBtn.disabled = true;
    buttonIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Send the email using EmailJS
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(function () {
            // Show success message
            buttonText.textContent = 'Message Sent!';
            buttonIcon.innerHTML = '<i class="fas fa-check"></i>';
            contactForm.reset();

            // Reset button after 3 seconds
            setTimeout(() => {
                buttonText.textContent = 'Send Message';
                buttonIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                sendBtn.disabled = false;
            }, 3000);
        }, function (error) {
            // Show error message
            buttonText.textContent = 'Error!';
            buttonIcon.innerHTML = '<i class="fas fa-times"></i>';
            console.error('Email error:', error);

            // Reset button after 3 seconds
            setTimeout(() => {
                buttonText.textContent = 'Send Message';
                buttonIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                sendBtn.disabled = false;
            }, 3000);
        });
});

// Scroll reveal animation
const revealElements = document.querySelectorAll('.skill-card, .project-card, .about-content');

const scrollReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            scrollReveal.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

revealElements.forEach(element => {
    element.classList.add('reveal-hidden');
    scrollReveal.observe(element);
});

// Animate elements when they come into view
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.info-item, .skill-card');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (elementTop < windowHeight - 50) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Initialize animation states
document.querySelectorAll('.info-item, .skill-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'all 0.6s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);
// Initial check for elements in view
window.addEventListener('load', animateOnScroll);

// Typing Animation
const roles = [
    "Frontend Developer",
    "Backend Developer",
    "DevOps Engineer",
    "Cloud Engineer"
];

const dynamicText = document.querySelector(".dynamic-text");
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let deletingSpeed = 50;
let newTextDelay = 2000; // Delay between role changes

function typeText() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
        // Remove character
        dynamicText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = deletingSpeed;
    } else {
        // Add character
        dynamicText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        // Make pause at end
        typingSpeed = newTextDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Move to next role
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeText, typingSpeed);
}

// Start the typing animation when the page loads
window.addEventListener('load', () => {
    if (dynamicText) {
        setTimeout(typeText, 1000);
    }
});
