// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    mobileMenu.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar Background on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
document.addEventListener('DOMContentLoaded', function() {
    const elementsToAnimate = document.querySelectorAll(
        '.feature-card, .service-card, .about-text, .contact-item, .hero-content'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Contact Form Handling (disabled - no form currently)
// Form has been replaced with MeBug announcement section

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        element.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = counter.textContent;
        const numericValue = parseFloat(target.replace(/[^0-9.]/g, ''));
        const suffix = target.replace(/[0-9.]/g, '');
        
        if (numericValue) {
            let current = 0;
            const increment = numericValue / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= numericValue) {
                    current = numericValue;
                    clearInterval(timer);
                }
                
                if (suffix.includes('%')) {
                    counter.textContent = current.toFixed(1) + suffix;
                } else if (suffix.includes('B') || suffix.includes('M')) {
                    counter.textContent = current.toFixed(1) + suffix;
                } else if (suffix.includes('K') || suffix.includes('+')) {
                    counter.textContent = Math.floor(current).toLocaleString() + suffix;
                } else {
                    counter.textContent = Math.floor(current).toLocaleString() + suffix;
                }
            }, 20);
        }
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 500);
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Smooth reveal animation for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > sectionTop - windowHeight + 100) {
            section.classList.add('section-visible');
        }
    });
}

window.addEventListener('scroll', revealSections);
document.addEventListener('DOMContentLoaded', revealSections);

// Add CSS for section animations
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
    }
    
    section.section-visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 1rem;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    .fade-in {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .fade-in.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;

document.head.appendChild(style);

// ==========================================
// Hardcore Gaming Effect - Matrix + Particles + Scan Lines
// ==========================================

// Matrix Rain Drop
class MatrixDrop {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.speed = Math.random() * 3 + 2;
        this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
        this.char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        this.opacity = Math.random() * 0.5 + 0.3;
        this.fontSize = 16;
    }

    update() {
        this.y += this.speed;
        if (this.y > this.canvas.height) {
            this.y = -this.fontSize;
            this.x = Math.random() * this.canvas.width;
            this.char = this.chars.charAt(Math.floor(Math.random() * this.chars.length));
        }
    }

    draw(ctx) {
        ctx.fillStyle = `rgba(0, 255, 65, ${this.opacity * 0.3})`; // Reduced opacity
        ctx.font = `${this.fontSize}px monospace`;
        ctx.fillText(this.char, this.x, this.y);
    }
}

// Particle for cyberpunk effect
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.hue = Math.random() * 60 + 160; // Blue to purple range
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around screen
        if (this.x > this.canvas.width) this.x = 0;
        if (this.x < 0) this.x = this.canvas.width;
        if (this.y > this.canvas.height) this.y = 0;
        if (this.y < 0) this.y = this.canvas.height;
    }

    draw(ctx) {
        // Cyberpunk glow (reduced opacity)
        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
        gradient.addColorStop(0, `hsla(${this.hue}, 100%, 60%, ${this.opacity * 0.4})`);
        gradient.addColorStop(0.5, `hsla(${this.hue}, 100%, 50%, ${this.opacity * 0.15})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 5, 0, Math.PI * 2);
        ctx.fill();

        // Core (reduced opacity)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.4})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Hexagon Grid
class HexGrid {
    constructor(canvas) {
        this.canvas = canvas;
        this.size = 50;
        this.hexagons = [];
        this.generateGrid();
    }

    generateGrid() {
        const rows = Math.ceil(this.canvas.height / (this.size * 1.5)) + 1;
        const cols = Math.ceil(this.canvas.width / (this.size * Math.sqrt(3))) + 1;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * this.size * Math.sqrt(3) + (row % 2) * this.size * Math.sqrt(3) / 2;
                const y = row * this.size * 1.5;
                if (Math.random() > 0.7) { // Only show some hexagons
                    this.hexagons.push({
                        x, y,
                        opacity: Math.random() * 0.3,
                        pulse: Math.random() * Math.PI * 2
                    });
                }
            }
        }
    }

    draw(ctx) {
        this.hexagons.forEach(hex => {
            hex.pulse += 0.02;
            const pulseOpacity = hex.opacity * (0.5 + Math.sin(hex.pulse) * 0.5);

            ctx.strokeStyle = `rgba(0, 255, 255, ${pulseOpacity * 0.15})`; // More subtle
            ctx.lineWidth = 0.5;
            ctx.beginPath();

            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i;
                const x = hex.x + this.size * Math.cos(angle);
                const y = hex.y + this.size * Math.sin(angle);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        });
    }
}

function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) {
        console.error('Particle canvas not found!');
        return;
    }

    console.log('Hardcore gaming effects initializing...');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let matrixDrops = [];
    let hexGrid;
    let scanLineY = 0;
    let glitchOffset = 0;
    let animationId;

    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        hexGrid = new HexGrid(canvas);
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas));
    }

    // Create matrix drops
    const dropCount = Math.floor(canvas.width / 20);
    for (let i = 0; i < dropCount; i++) {
        matrixDrops.push(new MatrixDrop(canvas));
    }

    // Animation loop
    function animate() {
        // Clear canvas completely (no trail effect to avoid blocking content)
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw hexagon grid (subtle background)
        hexGrid.draw(ctx);

        // Draw matrix rain
        matrixDrops.forEach(drop => {
            drop.update();
            drop.draw(ctx);
        });

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw(ctx);
        });

        // Draw connections between particles
        particles.forEach((particleA, indexA) => {
            particles.slice(indexA + 1).forEach(particleB => {
                const dx = particleA.x - particleB.x;
                const dy = particleA.y - particleB.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = 0.15 * (1 - distance / 120); // Reduced opacity
                    const gradient = ctx.createLinearGradient(particleA.x, particleA.y, particleB.x, particleB.y);
                    gradient.addColorStop(0, `rgba(0, 255, 255, ${opacity})`);
                    gradient.addColorStop(1, `rgba(255, 0, 255, ${opacity})`);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particleA.x, particleA.y);
                    ctx.lineTo(particleB.x, particleB.y);
                    ctx.stroke();
                }
            });
        });

        // Scan line effect
        scanLineY += 2;
        if (scanLineY > canvas.height) scanLineY = 0;

        const scanGradient = ctx.createLinearGradient(0, scanLineY - 50, 0, scanLineY + 50);
        scanGradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
        scanGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.03)'); // Very subtle
        scanGradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
        ctx.fillStyle = scanGradient;
        ctx.fillRect(0, scanLineY - 50, canvas.width, 100);

        // Random glitch effect
        if (Math.random() > 0.98) {
            glitchOffset = (Math.random() - 0.5) * 20;
            ctx.save();
            ctx.translate(glitchOffset, 0);

            // RGB split effect
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }

        animationId = requestAnimationFrame(animate);
    }

    animate();

    // Mouse interaction
    let mouse = { x: null, y: null, radius: 150 };

    canvas.addEventListener('mousemove', (e) => {
        mouse.x = e.x;
        mouse.y = e.y;

        particles.forEach(particle => {
            const dx = mouse.x - particle.x;
            const dy = mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < mouse.radius) {
                const angle = Math.atan2(dy, dx);
                const force = (mouse.radius - distance) / mouse.radius;
                particle.x -= Math.cos(angle) * force * 2;
                particle.y -= Math.sin(angle) * force * 2;
            }
        });
    });

    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
}

// Particle canvas is now transparent and floats above content

// Initialize particles when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initParticles);
} else {
    initParticles();
}
