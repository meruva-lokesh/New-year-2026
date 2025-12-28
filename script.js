// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    initializeEntryScreen();
    initializeCountdown();
    initializeParticles();
    initializeScrollAnimations();
    initializeParallax();
    initializeKineticTypography();
    initializeMemoryCards();
    initializeMessageCards();
    initializePhotoGallery();
    initializeVisionBoard();
    initializeDarkMode();
    initializeSoundToggle();
    initializeMusicPlayer();
    // initializeCursorTrail(); // Disabled
    initializeNavigation();
    initializeProgressBar();
    
    // Initialize secret message last to ensure it works
    setTimeout(() => {
        initializeSecretMessage();
    }, 500);
});

// ===================================
// ENTRY SCREEN
// ===================================

function initializeEntryScreen() {
    const entryScreen = document.getElementById('entryScreen');
    const mainContent = document.getElementById('mainContent');
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    const entryHint = document.getElementById('entryHint');

    let noClickCount = 0;

    // When "Yes" is clicked
    yesBtn.addEventListener('click', () => {
        entryScreen.classList.add('hidden');
        setTimeout(() => {
            entryScreen.style.display = 'none';
            mainContent.style.display = 'block';
            // Trigger animations
            document.body.style.overflow = 'auto';
        }, 500);
    });

    // When "No" is clicked - make it emotional/sad
    noBtn.addEventListener('click', () => {
        noClickCount++;

        if (noClickCount === 1) {
            entryHint.style.display = 'block';
            entryHint.textContent = "Oh... okay. That makes me a little sad 🥺";
            noBtn.textContent = "I'm sure...";
        } else if (noClickCount === 2) {
            entryHint.textContent = "I spent so much time making this for you... but it's okay 💔";
            noBtn.textContent = "Still no...";
            yesBtn.innerHTML = "Don't make me cry 🥺";
        } else if (noClickCount === 3) {
            entryHint.textContent = "I guess I'll just sit here feeling sad then... 😢";
            noBtn.textContent = "Okay fine, show me";
            yesBtn.innerHTML = "Please? I miss you 💕";
        } else {
            // After 3 clicks, clicking "no" actually shows the site
            entryScreen.classList.add('hidden');
            setTimeout(() => {
                entryScreen.style.display = 'none';
                mainContent.style.display = 'block';
                document.body.style.overflow = 'auto';
            }, 500);
        }

        // Make the button move away (fun effect)
        const randomX = Math.random() * 20 - 10;
        const randomY = Math.random() * 20 - 10;
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
        setTimeout(() => {
            noBtn.style.transform = '';
        }, 300);
    });
}


// ===================================
// COUNTDOWN TIMER
// ===================================

function initializeCountdown() {
    const targetDate = new Date('2026-01-01T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            document.querySelector('.countdown-container').innerHTML =
                '<h2 class="celebration">🎉 Happy New Year 2026! 🎉</h2>';
            triggerCelebration();
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function triggerCelebration() {
    createConfetti(100);
    if (!document.body.classList.contains('sound-off')) {
        // Play celebration sound if implemented
    }
}

// ===================================
// PARTICLE SYSTEM
// ===================================

function initializeParticles() {
    const container = document.querySelector('.particle-container');
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const particleCount = isMobile ? 15 : 30; // Reduced from 50

    for (let i = 0; i < particleCount; i++) {
        createParticle(container);
    }
}

function createParticle(container) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = getRandomColor();
    particle.style.borderRadius = '50%';
    particle.style.opacity = Math.random() * 0.5 + 0.2;
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;

    particle.style.animation = `particleFloat ${duration}s ${delay}s infinite ease-in-out`;

    container.appendChild(particle);
}

function getRandomColor() {
    const colors = ['#a78bfa', '#fbbf24', '#fb7185', '#fecaca', '#c4b5fd'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add particle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0); }
        25% { transform: translate(20px, -20px); }
        50% { transform: translate(-15px, 15px); }
        75% { transform: translate(15px, -10px); }
    }
`;
document.head.appendChild(style);

// ===================================
// KINETIC TYPOGRAPHY
// ===================================

function initializeKineticTypography() {
    const words = document.querySelectorAll('.kinetic-title .word');

    words.forEach((word, index) => {
        word.addEventListener('mouseenter', () => {
            word.style.transform = 'translateY(-10px) scale(1.1) rotate(' + (Math.random() * 20 - 10) + 'deg)';
        });

        word.addEventListener('mouseleave', () => {
            word.style.transform = '';
        });

        // Mouse move effect
        word.addEventListener('mousemove', (e) => {
            const rect = word.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            word.style.transform = `
                translateY(-10px) 
                scale(1.1) 
                rotateX(${y * 20}deg) 
                rotateY(${x * 20}deg)
            `;
        });
    });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================

function initializeScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.reveal').forEach(element => {
        observer.observe(element);
    });
}

// ===================================
// PARALLAX EFFECTS
// ===================================

function initializeParallax() {
    const layers = document.querySelectorAll('.parallax-layer');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        layers.forEach((layer, index) => {
            const speed = (index + 1) * 0.3;
            layer.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ===================================
// MEMORY CARDS (3D FLIP)
// ===================================

function initializeMemoryCards() {
    const cards = document.querySelectorAll('.memory-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');

            if (card.classList.contains('flipped')) {
                createMicroConfetti(card);
            }
        });
    });
}

function createMicroConfetti(element) {
    const rect = element.getBoundingClientRect();

    for (let i = 0; i < 10; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = rect.left + rect.width / 2 + 'px';
        confetti.style.top = rect.top + rect.height / 2 + 'px';
        confetti.style.background = getRandomColor();
        confetti.style.transform = `translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg)`;

        document.querySelector('.confetti-container').appendChild(confetti);

        setTimeout(() => confetti.remove(), 3000);
    }
}

// ===================================
// MESSAGE CARDS
// ===================================

function initializeMessageCards() {
    const revealButtons = document.querySelectorAll('.reveal-more');

    revealButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.dataset.target;
            const hiddenMessage = document.getElementById(targetId);

            if (hiddenMessage.style.display === 'block') {
                hiddenMessage.style.display = 'none';
                button.textContent = 'Click to see more ✨';
            } else {
                hiddenMessage.style.display = 'block';
                button.textContent = 'Hide message';
                createMicroConfetti(button.parentElement);
            }
        });
    });
}

// ===================================
// PHOTO GALLERY LIGHTBOX
// ===================================

function initializePhotoGallery() {
    const photoWrappers = document.querySelectorAll('.photo-wrapper');
    const lightbox = document.getElementById('photoLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.querySelector('.lightbox-close');

    photoWrappers.forEach((wrapper, index) => {
        wrapper.addEventListener('click', () => {
            const img = wrapper.querySelector('img');
            const description = wrapper.parentElement.querySelector('.photo-description');

            if (img) {
                lightboxImage.src = img.src;
                lightboxCaption.textContent = description ? description.textContent : '';
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===================================
// VISION BOARD
// ===================================

function initializeVisionBoard() {
    const visionCards = document.querySelectorAll('.vision-card');
    const finalMessage = document.getElementById('finalMessage');
    let revealedCount = 0;

    visionCards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('revealed')) {
                card.classList.add('revealed');
                revealedCount++;

                document.getElementById('cards-collected').textContent = revealedCount;

                createMicroConfetti(card);

                if (revealedCount === visionCards.length) {
                    setTimeout(() => {
                        finalMessage.classList.add('visible');
                        createConfetti(50);
                        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 500);
                }
            }
        });
    });
}

// ===================================
// CONFETTI SYSTEM
// ===================================

function createConfetti(count) {
    const container = document.querySelector('.confetti-container');
    const colors = ['#a78bfa', '#fbbf24', '#fb7185', '#fecaca', '#c4b5fd', '#4facfe'];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;

            container.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// ===================================
// DARK MODE
// ===================================

function initializeDarkMode() {
    const toggle = document.querySelector('.theme-toggle');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (prefersDark) {
        document.body.classList.add('dark-mode');
    }

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        // Save preference
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
    });

    // Load saved preference
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
        document.body.classList.add('dark-mode');
    }
}

// ===================================
// SOUND TOGGLE
// ===================================

function initializeSoundToggle() {
    const toggle = document.querySelector('.sound-toggle');

    if (!toggle) return; // Exit if sound toggle doesn't exist

    toggle.addEventListener('click', () => {
        document.body.classList.toggle('sound-off');

        const isMuted = document.body.classList.contains('sound-off');
        localStorage.setItem('soundOff', isMuted);
    });

    // Load saved preference
    const savedSound = localStorage.getItem('soundOff');
    if (savedSound === 'true') {
        document.body.classList.add('sound-off');
    }
}

// ===================================
// MUSIC PLAYER
// ===================================

function initializeMusicPlayer() {
    const audio = document.getElementById('backgroundMusic');
    const musicToggle = document.querySelector('.music-toggle');
    const volumeControl = document.querySelector('.volume-control');
    const musicTitle = document.querySelector('.music-title');

    // Exit if music player doesn't exist
    if (!audio || !musicToggle || !volumeControl || !musicTitle) {
        console.log('Music player not found, skipping...');
        return;
    }

    // Set initial volume
    audio.volume = 0.5;

    // Preload the audio
    audio.load();

    // Check if user has a song file
    audio.addEventListener('error', () => {
        console.error('Audio failed to load');
        musicTitle.textContent = 'Audio Error ♪';
        musicToggle.disabled = true;
        musicToggle.style.opacity = '0.5';
    });

    // If song loads successfully
    audio.addEventListener('loadedmetadata', () => {
        musicTitle.textContent = 'Our Song ♪';
        console.log('Audio loaded successfully');
    });

    // Play/Pause toggle
    musicToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().then(() => {
                console.log('Audio playing');
                musicToggle.classList.add('playing');
                // Add pulsing animation
                musicToggle.style.animation = 'pulse 1.5s ease infinite';
            }).catch(err => {
                console.error('Playback error:', err);
                alert('Unable to play audio. Please check your browser settings or try a different browser.');
            });
        } else {
            audio.pause();
            musicToggle.classList.remove('playing');
            musicToggle.style.animation = 'none';
        }
    });

    // Volume control
    volumeControl.addEventListener('input', (e) => {
        audio.volume = e.target.value / 100;
    });

    // Sync with sound toggle
    const soundToggle = document.querySelector('.sound-toggle');
    soundToggle.addEventListener('click', () => {
        if (document.body.classList.contains('sound-off')) {
            audio.pause();
            musicToggle.classList.remove('playing');
        }
    });

    // Auto-play on first user interaction (optional)
    let firstInteraction = true;
    document.addEventListener('click', () => {
        if (firstInteraction && !document.body.classList.contains('sound-off')) {
            firstInteraction = false;
            audio.play().then(() => {
                musicToggle.classList.add('playing');
                musicToggle.style.animation = 'pulse 1.5s ease infinite';
            }).catch(() => { });
        }
    }, { once: true });
}

// ===================================
// CURSOR TRAIL
// ===================================

function initializeCursorTrail() {
    const trail = document.querySelector('.cursor-trail');
    if (!trail) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let isMoving = false;

    // Use pointer events for better mobile support
    const updatePosition = (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        isMoving = true;
    };

    document.addEventListener('mousemove', updatePosition, { passive: true });
    document.addEventListener('pointermove', updatePosition, { passive: true });

    // Optimized animation with requestAnimationFrame
    function animate() {
        if (isMoving) {
            // Smooth easing with faster response
            const speed = 0.15;
            const dx = mouseX - currentX;
            const dy = mouseY - currentY;

            currentX += dx * speed;
            currentY += dy * speed;

            // Use transform for better performance (GPU accelerated)
            trail.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
            trail.style.opacity = '0.6';

            // Stop animation if cursor hasn't moved
            if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
                isMoving = false;
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // Hide trail when mouse leaves window
    document.addEventListener('mouseleave', () => {
        trail.style.opacity = '0';
    });

    document.addEventListener('mouseenter', () => {
        trail.style.opacity = '0.6';
    });
}

// ===================================
// NAVIGATION
// ===================================

function initializeNavigation() {
    const navDots = document.querySelectorAll('.nav-dots span');
    const sections = document.querySelectorAll('section[id]');

    // Exit if navigation doesn't exist
    if (navDots.length === 0) {
        console.log('Navigation dots not found, skipping...');
        return;
    }

    navDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetId = dot.dataset.section;
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Update active dot on scroll
    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.dataset.section === current) {
                dot.classList.add('active');
            }
        });
    });
}

// ===================================
// PROGRESS BAR
// ===================================

function initializeProgressBar() {
    const progressBar = document.querySelector('.progress-bar');

    // Exit if progress bar doesn't exist
    if (!progressBar) {
        console.log('Progress bar not found, skipping...');
        return;
    }

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight);

        progressBar.style.transform = `scaleX(${scrolled})`;
    });
}

// ===================================
// EASTER EGGS
// ===================================

// Konami Code Easter Egg
let konamiCode = [];
const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'b', 'a'
];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode.splice(-konamiSequence.length - 1, konamiCode.length - konamiSequence.length);

    if (konamiCode.join('').includes(konamiSequence.join(''))) {
        triggerSecretMessage();
        konamiCode = [];
    }
});

function triggerSecretMessage() {
    const secret = document.createElement('div');
    secret.style.position = 'fixed';
    secret.style.top = '50%';
    secret.style.left = '50%';
    secret.style.transform = 'translate(-50%, -50%)';
    secret.style.background = 'var(--gradient-sunset)';
    secret.style.color = 'white';
    secret.style.padding = '3rem';
    secret.style.borderRadius = '20px';
    secret.style.fontSize = '1.5rem';
    secret.style.zIndex = '10000';
    secret.style.textAlign = 'center';
    secret.style.fontFamily = 'var(--font-handwritten)';
    secret.innerHTML = '🎉 You found the secret! You\'re as amazing as you are curious! 💖';

    document.body.appendChild(secret);
    createConfetti(100);

    setTimeout(() => {
        secret.style.transition = 'opacity 1s ease';
        secret.style.opacity = '0';
        setTimeout(() => secret.remove(), 1000);
    }, 3000);
}

// Double-click on title for surprise
document.querySelector('.kinetic-title').addEventListener('dblclick', () => {
    createConfetti(30);
    const words = document.querySelectorAll('.kinetic-title .word');
    words.forEach((word, index) => {
        setTimeout(() => {
            word.style.animation = 'bounce 0.5s ease';
        }, index * 100);
    });
});

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

// Lazy load images if any are added
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Debounce resize events
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add('resize-animation-stopper');
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
    }, 400);
});

// Add resize animation stopper style
const resizeStyle = document.createElement('style');
resizeStyle.textContent = `
    .resize-animation-stopper * {
        animation: none !important;
        transition: none !important;
    }
`;
document.head.appendChild(resizeStyle);

// ===================================
// SECRET MESSAGE
// ===================================

function initializeSecretMessage() {
    console.log('🔍 Initializing secret message...');

    const secretButton = document.querySelector('.secret-button');
    const secretMessage = document.querySelector('.secret-message');

    console.log('🔍 Secret button found:', secretButton);
    console.log('🔍 Secret message found:', secretMessage);

    if (!secretButton || !secretMessage) {
        console.error('❌ Secret message elements not found!');
        return;
    }

    console.log('✅ Secret message initialized successfully');

    // Make button ultra clickable
    secretButton.style.pointerEvents = 'auto';
    secretButton.style.cursor = 'pointer';
    secretButton.style.position = 'relative';
    secretButton.style.zIndex = '999';
    
    // DIRECT click handler - simplest possible
    const revealMessage = () => {
        console.log('🎉 REVEALING SECRET MESSAGE NOW!');
        
        // Show message with brute force
        secretMessage.style.display = 'block';
        secretMessage.style.visibility = 'visible';
        secretMessage.style.opacity = '1';
        
        // Hide button
        secretButton.style.display = 'none';
        
        // Scroll to it
        setTimeout(() => {
            secretMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 200);
        
        // Confetti
        try {
            createConfetti(30);
        } catch (err) {
            console.log('⚠️ Confetti skipped');
        }
    };
    
    // Multiple event listeners to catch ANY interaction
    secretButton.onclick = revealMessage;
    secretButton.addEventListener('click', revealMessage, true);
    secretButton.addEventListener('touchend', revealMessage, { passive: false });
    secretButton.addEventListener('pointerup', revealMessage);

    // Hover effect
    secretButton.addEventListener('mouseenter', () => {
        secretButton.style.transform = 'scale(1.05) translateY(-2px)';
    });

    secretButton.addEventListener('mouseleave', () => {
        secretButton.style.transform = 'scale(1)';
    });
}

// ===================================
// LOGGING
// ===================================

console.log('✨ New Year 2026 Website Loaded! Here\'s to an amazing year together! 🎉');