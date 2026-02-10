/* ================================================
   PRANAV THAKUR - AI PORTFOLIO JAVASCRIPT
   Super Realistic Animations & Interactions
   ================================================ */

// ---- LOADING SCREEN ----
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const loadingPercent = document.getElementById('loadingPercent');
    let progress = 0;

    const loadingInterval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                initAnimations();
            }, 500);
        }
        loadingPercent.textContent = Math.floor(progress);
    }, 100);
});

// ---- CUSTOM CURSOR ----
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;

    if (cursor) {
        cursor.style.transform = `translate(${cursorX - 6}px, ${cursorY - 6}px)`;
    }
    if (follower) {
        follower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    }

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Hover effect on interactive elements
document.querySelectorAll('a, button, .project-card, .skill-tag, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (follower) follower.classList.add('hover');
    });
    el.addEventListener('mouseleave', () => {
        if (follower) follower.classList.remove('hover');
    });
});

// ---- PARTICLE CANVAS ----
const particleCanvas = document.getElementById('particleCanvas');
const pCtx = particleCanvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * particleCanvas.width;
        this.y = Math.random() * particleCanvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.color = Math.random() > 0.5 ? '108, 99, 255' : '0, 212, 170';
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > particleCanvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > particleCanvas.height) this.speedY *= -1;

        // Mouse interaction
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
            const force = (150 - dist) / 150;
            this.x += dx * force * 0.02;
            this.y += dy * force * 0.02;
        }
    }

    draw() {
        pCtx.beginPath();
        pCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        pCtx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        pCtx.fill();
    }
}

// Initialize particles
for (let i = 0; i < 80; i++) {
    particles.push(new Particle());
}

function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
                const opacity = (1 - dist / 150) * 0.15;
                pCtx.beginPath();
                pCtx.moveTo(particles[i].x, particles[i].y);
                pCtx.lineTo(particles[j].x, particles[j].y);
                pCtx.strokeStyle = `rgba(108, 99, 255, ${opacity})`;
                pCtx.lineWidth = 0.5;
                pCtx.stroke();
            }
        }
    }
}

function animateParticles() {
    pCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    particles.forEach(p => {
        p.update();
        p.draw();
    });

    drawConnections();
    requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- NEURAL NETWORK CANVAS ----
const neuralCanvas = document.getElementById('neuralCanvas');
const nCtx = neuralCanvas.getContext('2d');
let nodes = [];

function resizeNeuralCanvas() {
    neuralCanvas.width = window.innerWidth;
    neuralCanvas.height = window.innerHeight;
    initNodes();
}

function initNodes() {
    nodes = [];
    const cols = Math.floor(neuralCanvas.width / 100);
    const rows = Math.floor(neuralCanvas.height / 100);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            nodes.push({
                x: (i + 0.5) * (neuralCanvas.width / cols) + (Math.random() - 0.5) * 40,
                y: (j + 0.5) * (neuralCanvas.height / rows) + (Math.random() - 0.5) * 40,
                baseX: (i + 0.5) * (neuralCanvas.width / cols),
                baseY: (j + 0.5) * (neuralCanvas.height / rows),
                size: Math.random() * 2 + 1,
                pulse: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.02 + 0.01
            });
        }
    }
}

resizeNeuralCanvas();
window.addEventListener('resize', resizeNeuralCanvas);

function animateNeural() {
    nCtx.clearRect(0, 0, neuralCanvas.width, neuralCanvas.height);

    const time = Date.now() * 0.001;

    nodes.forEach((node, i) => {
        node.pulse += node.speed;
        node.x = node.baseX + Math.sin(node.pulse) * 5;
        node.y = node.baseY + Math.cos(node.pulse * 0.7) * 5;

        const pulseSize = node.size + Math.sin(node.pulse) * 0.5;
        const opacity = 0.3 + Math.sin(node.pulse) * 0.2;

        nCtx.beginPath();
        nCtx.arc(node.x, node.y, pulseSize, 0, Math.PI * 2);
        nCtx.fillStyle = `rgba(108, 99, 255, ${opacity})`;
        nCtx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
            const dx = node.x - nodes[j].x;
            const dy = node.y - nodes[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 120) {
                const lineOpacity = (1 - dist / 120) * 0.1;
                // Animate signal along connection
                const signal = (Math.sin(time * 2 + i * 0.5) + 1) / 2;

                nCtx.beginPath();
                nCtx.moveTo(node.x, node.y);
                nCtx.lineTo(nodes[j].x, nodes[j].y);
                nCtx.strokeStyle = `rgba(108, 99, 255, ${lineOpacity})`;
                nCtx.lineWidth = 0.5;
                nCtx.stroke();

                // Signal dot
                if (dist < 80) {
                    const sx = node.x + (nodes[j].x - node.x) * signal;
                    const sy = node.y + (nodes[j].y - node.y) * signal;
                    nCtx.beginPath();
                    nCtx.arc(sx, sy, 1.5, 0, Math.PI * 2);
                    nCtx.fillStyle = `rgba(0, 212, 170, ${lineOpacity * 2})`;
                    nCtx.fill();
                }
            }
        }
    });

    requestAnimationFrame(animateNeural);
}
animateNeural();

// ---- TYPING ANIMATION ----
const texts = [
    'AI Systems',
    'Deep Learning Models',
    'Neural Networks',
    'NLP Solutions',
    'Computer Vision',
    'Generative AI',
    'LLM Applications',
    'Intelligent Agents'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const rotatingText = document.getElementById('rotatingText');

function typeWriter() {
    const current = texts[textIndex];

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    if (rotatingText) {
        rotatingText.textContent = current.substring(0, charIndex);
    }

    let speed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        speed = 500;
    }

    setTimeout(typeWriter, speed);
}

// ---- NAVBAR ----
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ---- SMOOTH SCROLL ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ---- SCROLL ANIMATIONS ----
function initAnimations() {
    typeWriter();
    animateOnScroll();
    countUp();
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');

            // Skill bars animation
            if (entry.target.closest('.skills')) {
                const skillItems = entry.target.querySelectorAll('.skill-item');
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('animated');
                    }, index * 150);
                });
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

function animateOnScroll() {
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// ---- COUNTER ANIMATION ----
function countUp() {
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                let current = 0;
                const increment = target / 60;
                const duration = 2000;
                const stepTime = duration / (target / increment);

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.floor(current);
                }, stepTime);

                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
}

// ---- PROJECT FILTER ----
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                card.classList.remove('hidden');
                card.style.animation = `fadeInUp 0.5s ease ${index * 0.1}s both`;
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// ---- CONTACT FORM ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('.submit-btn span');
        const originalText = btn.textContent;

        btn.textContent = 'Sending...';

        setTimeout(() => {
            btn.textContent = 'Sent! ✓';
            contactForm.reset();

            setTimeout(() => {
                btn.textContent = originalText;
            }, 3000);
        }, 2000);
    });
}

// ---- HERO NAME GLITCH EFFECT ----
const heroName = document.getElementById('heroName');
if (heroName) {
    heroName.addEventListener('mouseenter', () => {
        heroName.classList.add('glitch');
        setTimeout(() => heroName.classList.remove('glitch'), 500);
    });
}

// Add glitch CSS dynamically
const glitchStyle = document.createElement('style');
glitchStyle.textContent = `
    .glitch {
        animation: glitch 0.5s ease;
    }

    @keyframes glitch {
        0% { transform: translate(0); }
        10% { transform: translate(-2px, 2px); }
        20% { transform: translate(2px, -2px); }
        30% { transform: translate(-2px, -2px); }
        40% { transform: translate(2px, 2px); }
        50% { transform: translate(-2px, 2px); }
        60% { transform: translate(2px, -2px); }
        70% { transform: translate(-2px, -2px); }
        80% { transform: translate(2px, 2px); }
        90% { transform: translate(-2px, 2px); }
        100% { transform: translate(0); }
    }

    .gradient-text.glitch {
        text-shadow:
            2px 0 #ff006e,
            -2px 0 #00d4aa;
    }
`;
document.head.appendChild(glitchStyle);

// ---- TILT EFFECT ON CARDS ----
document.querySelectorAll('.project-card, .skill-category, .contact-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ---- PARALLAX EFFECT ----
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Parallax for hero content
    const heroContent = document.querySelector('.hero-content');
    const heroVisual = document.querySelector('.hero-visual');

    if (heroContent && scrollY < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrollY * 0.3}px)`;
        heroContent.style.opacity = 1 - scrollY / (window.innerHeight * 0.8);
    }

    if (heroVisual && scrollY < window.innerHeight) {
        heroVisual.style.transform = `translateY(${scrollY * 0.15}px)`;
    }
});

// ---- MAGNETIC BUTTONS ----
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
    });
});

// ---- FOOTER YEAR ----
document.getElementById('currentYear').textContent = new Date().getFullYear();

// ---- REVEAL ON SCROLL WITH STAGGER ----
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.querySelectorAll('.animate-on-scroll');
            children.forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.15}s`;
                child.classList.add('animated');
            });
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.section').forEach(section => {
    staggerObserver.observe(section);
});

// ---- EASTER EGG: KONAMI CODE ----
let konamiCode = [];
const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.keyCode);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s ease';
        setTimeout(() => {
            document.body.style.animation = '';
        }, 2000);
    }
});

const rainbowStyle = document.createElement('style');
rainbowStyle.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        50% { filter: hue-rotate(180deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(rainbowStyle);

// ---- PAGE VISIBILITY ----
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        document.title = 'Come back! 👋 | Pranav Thakur';
    } else {
        document.title = 'Pranav Thakur | AI Engineer & Researcher';
    }
});

console.log(`
%c ═══════════════════════════════════════
   🧠 Pranav Thakur - AI Portfolio
   👨‍💻 AI Engineer & Researcher
   🚀 Building the future with AI
 ═══════════════════════════════════════
`, 'color: #6C63FF; font-size: 14px; font-weight: bold;');
