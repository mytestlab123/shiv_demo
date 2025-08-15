document.addEventListener('DOMContentLoaded', function() {
    // Mobile navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for internal links
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

    // Add animation class to achievement cards when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe achievement cards and milestones
    document.querySelectorAll('.achievement-card, .milestone').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // Independence Day countdown (for future years)
    function updateCountdown() {
        const now = new Date().getTime();
        const currentYear = new Date().getFullYear();
        let independenceDay = new Date(`August 15, ${currentYear} 00:00:00`).getTime();
        
        // If Independence Day has passed this year, show next year
        if (now > independenceDay) {
            independenceDay = new Date(`August 15, ${currentYear + 1} 00:00:00`).getTime();
        }
        
        const distance = independenceDay - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const countdownElement = document.getElementById('countdown');
            if (countdownElement) {
                countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
            }
        }
    }

    // Update countdown every second if countdown element exists
    if (document.getElementById('countdown')) {
        setInterval(updateCountdown, 1000);
        updateCountdown(); // Initial call
    }

    // Add tricolor particle effect on homepage
    if (document.querySelector('.hero')) {
        createTricolorParticles();
    }

    function createTricolorParticles() {
        const hero = document.querySelector('.hero');
        const colors = ['#ff9933', '#ffffff', '#138808'];
        
        setInterval(() => {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '0px';
            particle.style.opacity = '0.7';
            particle.style.zIndex = '1';
            
            hero.appendChild(particle);
            
            // Animate particle falling
            let position = 0;
            const fallSpeed = Math.random() * 3 + 1;
            const sway = Math.random() * 2 - 1;
            
            const animation = setInterval(() => {
                position += fallSpeed;
                particle.style.top = position + 'px';
                particle.style.left = (parseFloat(particle.style.left) + sway * 0.1) + '%';
                
                if (position > hero.offsetHeight) {
                    clearInterval(animation);
                    particle.remove();
                }
            }, 16);
        }, 200);
    }

    // Add click effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});