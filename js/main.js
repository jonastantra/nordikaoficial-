/**
 * NÓRDIKA OFFICIAL — Avant-Garde Memorial
 * Main JavaScript: slider, particles, popup, animations, funnel
 */

(function () {
    'use strict';

    // ========== Mobile Navigation ==========
    const mobileToggle = document.getElementById('mobileToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            const isExpanded = mobileToggle.classList.contains('active');
            mobileToggle.classList.toggle('active');
            nav.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', !isExpanded);
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        nav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                nav.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ========== Header + Scroll Progress ==========
    const scrollProgress = document.getElementById('scrollProgress');
    let lastScroll = 0;
    let ticking = false;

    function onScroll() {
        const currentScroll = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;

        // Toggle body.scrolled to hide top banner + move header to top
        if (currentScroll > 40) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }

        if (header) {
            if (currentScroll > 100) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        }

        if (scrollProgress && docHeight > 0) {
            const pct = (currentScroll / docHeight) * 100;
            scrollProgress.style.width = pct + '%';
        }

        // Sticky CTA visibility (after hero)
        const stickyCta = document.getElementById('stickyCta');
        if (stickyCta) {
            if (currentScroll > window.innerHeight * 0.8) {
                stickyCta.classList.add('visible');
            } else {
                stickyCta.classList.remove('visible');
            }
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    });

    // ========== Active Navigation Link ==========
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 200;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
                });
            }
        });
    }
    window.addEventListener('scroll', updateActiveLink);

    // ========== Smooth Scroll ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
        });
    });

    // ========== Cursor Glow ==========
    const cursorGlow = document.getElementById('cursorGlow');
    if (cursorGlow && window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        function animateGlow() {
            glowX += (mouseX - glowX) * 0.12;
            glowY += (mouseY - glowY) * 0.12;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        }
        animateGlow();
    }

    // ========== Hero Slider ==========
    const slides = document.querySelectorAll('.hero-slide');
    const dotsContainer = document.getElementById('heroDots');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0 && dotsContainer) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Slide ${i + 1}`);
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        function goToSlide(index) {
            slides[currentSlide].classList.remove('active');
            const oldDot = dotsContainer.children[currentSlide];
            if (oldDot) oldDot.classList.remove('active');

            currentSlide = (index + slides.length) % slides.length;

            slides[currentSlide].classList.add('active');
            const newDot = dotsContainer.children[currentSlide];
            if (newDot) newDot.classList.add('active');
        }

        function nextSlide() { goToSlide(currentSlide + 1); }

        // Auto-advance every 6s
        slideInterval = setInterval(nextSlide, 6000);

        // Pause on hover
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mouseenter', () => clearInterval(slideInterval));
            hero.addEventListener('mouseleave', () => { slideInterval = setInterval(nextSlide, 6000); });
        }
    }

    // ========== Hero Particles (canvas) ==========
    const canvas = document.getElementById('heroParticles');
    if (canvas && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let w, h;

        function resize() {
            w = canvas.width = canvas.offsetWidth;
            h = canvas.height = canvas.offsetHeight;
        }
        resize();
        window.addEventListener('resize', resize);

        // Init particles
        const particleCount = window.innerWidth < 768 ? 35 : 70;
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                r: Math.random() * 1.8 + 0.4,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                opacity: Math.random() * 0.5 + 0.2,
                hue: Math.random() > 0.5 ? 'gold' : 'cyan'
            });
        }

        function drawParticles() {
            ctx.clearRect(0, 0, w, h);
            particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = w;
                if (p.x > w) p.x = 0;
                if (p.y < 0) p.y = h;
                if (p.y > h) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                const color = p.hue === 'gold' ? `rgba(212,175,55,${p.opacity})` : `rgba(0,229,255,${p.opacity})`;
                ctx.fillStyle = color;
                ctx.fill();
            });

            // Connect nearby particles
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(212,175,55,${0.08 * (1 - dist / 120)})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            }
            requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    // ========== Scroll Animations (IntersectionObserver) ==========
    const revealSelectors = '.fade-in, .reveal-left, .reveal-right, .reveal-scale, .stagger';
    const revealElements = document.querySelectorAll(revealSelectors);

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { root: null, rootMargin: '0px 0px -80px 0px', threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    } else {
        revealElements.forEach(el => el.classList.add('visible'));
    }

    // ========== Lightbox ==========
    const lightbox = document.getElementById('lightbox');
    const lightboxContent = lightbox?.querySelector('.lightbox-content img');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
    const lightboxNext = lightbox?.querySelector('.lightbox-next');
    const photoItems = document.querySelectorAll('.photo-item');

    let currentImageIndex = 0;
    let images = [];
    let lastFocusedElement = null;

    photoItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            images.push(img.src);
            item.addEventListener('click', () => {
                currentImageIndex = index;
                openLightbox(img.src);
            });
        }
    });

    function openLightbox(src) {
        if (lightbox && lightboxContent) {
            lastFocusedElement = document.activeElement;
            lightboxContent.src = src;
            lightbox.classList.add('active');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (lightboxClose) lightboxClose.focus();
        }
    }
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            lightbox.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            if (lastFocusedElement) lastFocusedElement.focus();
        }
    }
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        if (lightboxContent) lightboxContent.src = images[currentImageIndex];
    }
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        if (lightboxContent) lightboxContent.src = images[currentImageIndex];
    }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', showPrevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', showNextImage);
    lightbox?.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
        if (!lightbox?.classList.contains('active')) return;
        switch (e.key) {
            case 'Escape': closeLightbox(); break;
            case 'ArrowLeft': showPrevImage(); break;
            case 'ArrowRight': showNextImage(); break;
        }
    });

    // ========== Sales Funnel Popup (15s, once per session) ==========
    const popupOverlay = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const popupDismiss = document.getElementById('popupDismiss');

    function openPopup() {
        if (!popupOverlay) return;
        popupOverlay.classList.add('active');
        popupOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        if (popupClose) popupClose.focus();
    }
    function closePopup() {
        if (!popupOverlay) return;
        popupOverlay.classList.remove('active');
        popupOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        sessionStorage.setItem('nordika-popup-dismissed', '1');
    }

    if (popupOverlay && !sessionStorage.getItem('nordika-popup-dismissed')) {
        setTimeout(openPopup, 15000);
    }
    if (popupClose) popupClose.addEventListener('click', closePopup);
    if (popupDismiss) popupDismiss.addEventListener('click', closePopup);
    popupOverlay?.addEventListener('click', (e) => {
        if (e.target === popupOverlay) closePopup();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && popupOverlay?.classList.contains('active')) closePopup();
    });

    // ========== Form Handling ==========
    const memoriesForm = document.getElementById('memoriesForm');
    if (memoriesForm) {
        memoriesForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(memoriesForm);
            const data = Object.fromEntries(formData);
            const message = encodeURIComponent(
                `Nueva memoria de ${data.name}:\n\n${data.memory}\n\nEmail: ${data.email}`
            );
            window.open(`https://wa.me/XXXXXXXXXX?text=${message}`, '_blank');
            alert(I18n?.getTranslation?.('memories.success') || '¡Gracias por compartir tu recuerdo!');
            memoriesForm.reset();
        });
    }

    // ========== Video Card Click ==========
    document.querySelectorAll('.video-card').forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video-id');
            if (videoId) window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        });
    });

    // ========== Console Easter Egg ==========
    console.log(`
╔═══════════════════════════════════════════════════╗
║              NÓRDIKA OFFICIAL                      ║
║      In Loving Memory of                           ║
║      Héctor Alejandro Marín Ríos                   ║
║      1968 — 2024                                   ║
║      "The music lives forever"                     ║
╚═══════════════════════════════════════════════════╝
`);
})();
