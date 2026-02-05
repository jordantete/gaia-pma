// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const faqItems = document.querySelectorAll('.faq-item');
const waitlistForm = document.getElementById('waitlistForm');
const waitlistSuccess = document.getElementById('waitlistSuccess');
const fadeElements = document.querySelectorAll('.fade-in');

// ===== Mobile Menu Toggle =====
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== Navbar Background on Scroll =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add shadow on scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(155, 138, 166, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 8px rgba(155, 138, 166, 0.1)';
    }

    lastScroll = currentScroll;
});

// ===== FAQ Accordion =====
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('active')) {
                otherItem.classList.remove('active');
            }
        });

        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== Waitlist Form =====
waitlistForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;

    // Simple validation
    if (!email || !isValidEmail(email)) {
        shakeElement(waitlistForm.querySelector('.form-input'));
        return;
    }

    // Store email locally (for demo purposes)
    saveToLocalStorage(email);

    // Show success message
    waitlistForm.classList.add('hidden');
    waitlistSuccess.classList.add('show');

    // Log for debugging
    console.log('Email inscrit:', email);
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function saveToLocalStorage(email) {
    const waitlist = JSON.parse(localStorage.getItem('gaia_waitlist') || '[]');
    if (!waitlist.includes(email)) {
        waitlist.push(email);
        localStorage.setItem('gaia_waitlist', JSON.stringify(waitlist));
    }
}

function shakeElement(element) {
    element.style.animation = 'shake 0.5s ease';
    element.style.borderColor = '#E57373';

    setTimeout(() => {
        element.style.animation = '';
        element.style.borderColor = '';
    }, 500);
}

// Add shake animation to CSS dynamically
const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-10px); }
        40% { transform: translateX(10px); }
        60% { transform: translateX(-10px); }
        80% { transform: translateX(10px); }
    }
`;
document.head.appendChild(shakeStyle);

// ===== Scroll Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
fadeElements.forEach(element => {
    observer.observe(element);
});

// ===== Smooth Scroll for Safari =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const navbarHeight = navbar.offsetHeight;
            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Staggered Animation for Cards =====
function animateCards() {
    const cards = document.querySelectorAll('.feature-card, .testimonial-card, .team-card');

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

animateCards();

// ===== Console Welcome Message =====
console.log('%c Gaia PMA ', 'background: linear-gradient(135deg, #9B8AA6, #7D6B8A); color: white; padding: 10px 20px; border-radius: 5px; font-size: 16px; font-weight: bold;');
console.log('%c Votre alliée bienveillante dans votre parcours PMA ', 'color: #9B8AA6; font-size: 12px;');

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations for hero section
    setTimeout(() => {
        document.querySelectorAll('.hero .fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
});

// ===== Prefers Reduced Motion =====
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (prefersReducedMotion.matches) {
    // Disable animations for users who prefer reduced motion
    document.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
        el.style.transition = 'none';
    });

    document.querySelectorAll('.shape').forEach(shape => {
        shape.style.animation = 'none';
    });
}
