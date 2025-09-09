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
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init("iqPbgJylLOcu2MyKp");
})();

// Contact form handling
const contactForm = document.getElementById('contact-form');
const sendBtn = contactForm.querySelector('button[type="submit"]');
const buttonText = sendBtn.querySelector('.button-text');
const buttonIcon = sendBtn.querySelector('.button-icon');

// Form validation
function validateForm(formData) {
    const errors = [];

    if (!formData.get('user_name') || formData.get('user_name').trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }

    if (!formData.get('user_email') || !isValidEmail(formData.get('user_email'))) {
        errors.push('Please enter a valid email address');
    }

    if (!formData.get('message') || formData.get('message').trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }

    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showMessage(message, isError = false) {
    // Remove existing message if any
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${isError ? 'error' : 'success'}`;
    messageDiv.textContent = message;

    // Insert after the form
    contactForm.parentNode.insertBefore(messageDiv, contactForm.nextSibling);

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = new FormData(this);
    const errors = validateForm(formData);

    if (errors.length > 0) {
        showMessage(errors.join('. '), true);
        return;
    }

    // Show loading state
    buttonText.textContent = 'Sending...';
    sendBtn.disabled = true;
    buttonIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

    // Send email using EmailJS
    emailjs.sendForm('service_xq2gj6u', 'template_ogstkmq', this)
        .then(function (response) {
            console.log('Email sent successfully:', response.status, response.text);
            showSuccess();
        }, function (error) {
            console.error('Email sending failed:', error);
            showError('Failed to send message. Please try again or contact me directly at kumarv11535@gmail.com');
        });
});

function showSuccess() {
    buttonText.textContent = 'Message Sent!';
    buttonIcon.innerHTML = '<i class="fas fa-check"></i>';
    contactForm.reset();
    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', false);

    // Reset button after 5 seconds
    setTimeout(() => {
        buttonText.textContent = 'Send Message';
        buttonIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendBtn.disabled = false;
    }, 5000);
}

function showError(errorMessage) {
    buttonText.textContent = 'Error!';
    buttonIcon.innerHTML = '<i class="fas fa-times"></i>';
    showMessage(errorMessage || 'Failed to send message. Please try again.', true);

    // Reset button after 5 seconds
    setTimeout(() => {
        buttonText.textContent = 'Send Message';
        buttonIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
        sendBtn.disabled = false;
    }, 5000);
}

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
