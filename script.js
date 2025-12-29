// Smooth scrolling with offset for fixed nav
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(15, 15, 30, 0.95)';
        nav.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.5)';
    } else {
        nav.style.background = 'rgba(15, 15, 30, 0.8)';
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// Add active state to nav links
const navLinks = document.querySelectorAll('.nav-link');
const currentPath = window.location.hash;

if (currentPath) {
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--text-primary)';
        }
    });
}

// Parallax effect for hero visual
const heroVisual = document.querySelector('.hero-visual');
if (heroVisual) {
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        heroVisual.style.transform = `translate(${x}px, ${y}px)`;
    });
}

// Typing effect for hero title
const titleHighlight = document.querySelector('.highlight');
if (titleHighlight) {
    const text = titleHighlight.textContent;
    titleHighlight.textContent = '';
    titleHighlight.style.opacity = '1';
    
    let charIndex = 0;
    const typeSpeed = 100;
    
    function typeText() {
        if (charIndex < text.length) {
            titleHighlight.textContent += text.charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typeSpeed);
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeText, 500);
}

// Skill items hover effect with random delay
const skillItems = document.querySelectorAll('.skill-item');
skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`;
});

// Timeline items scroll reveal
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.2 });

const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// Add cursor trail effect
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll('.cursor-circle');

// Create cursor trail elements
const cursorTrail = [];
const trailLength = 20;

for (let i = 0; i < trailLength; i++) {
    const circle = document.createElement('div');
    circle.style.position = 'fixed';
    circle.style.width = '8px';
    circle.style.height = '8px';
    circle.style.borderRadius = '50%';
    circle.style.background = `rgba(99, 102, 241, ${1 - i / trailLength})`;
    circle.style.pointerEvents = 'none';
    circle.style.zIndex = '9999';
    circle.style.transition = 'all 0.1s ease';
    document.body.appendChild(circle);
    cursorTrail.push(circle);
}

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateTrail() {
    let x = mouseX;
    let y = mouseY;
    
    cursorTrail.forEach((circle, index) => {
        const nextCircle = cursorTrail[index - 1] || { x: mouseX, y: mouseY };
        
        x += (mouseX - x) * 0.3;
        y += (mouseY - y) * 0.3;
        
        circle.style.left = x - 4 + 'px';
        circle.style.top = y - 4 + 'px';
        circle.style.transform = `scale(${(trailLength - index) / trailLength})`;
    });
    
    requestAnimationFrame(animateTrail);
}

animateTrail();

// Hide scroll indicator on scroll
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            scrollIndicator.style.opacity = '0';
            scrollIndicator.style.pointerEvents = 'none';
        } else {
            scrollIndicator.style.opacity = '1';
            scrollIndicator.style.pointerEvents = 'auto';
        }
    });
}

// Add random movement to floating cards
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    setInterval(() => {
        const randomX = (Math.random() - 0.5) * 20;
        const randomY = (Math.random() - 0.5) * 20;
        card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomX / 10}deg)`;
    }, 3000 + index * 1000);
});

// Smooth reveal on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

console.log('Portfolio loaded! ✨');

