// =============================================
// NORDIKA OFFICIAL — Script
// Handles: hamburger menu, language toggle, slider, modal
// =============================================

const translations = {
    es: {
        topBanner: 'AL COMPRAR LA MÚSICA, APOYAS A LA FAMILIA NÓRDIKA. ¡GRACIAS POR TU APOYO!',
        navHome: 'Inicio', navAbout: 'Biografía', navLegacy: 'Apoyo',
        navLatest: 'Música Reciente', navMusic: 'Música', navShop: 'Tienda',
        heroRemembering: 'RECORDÁNDOLO',
        heroInLovingMemory: 'EN AMOROSA MEMORIA',
        heroBtn: 'COMPRAR MÚSICA',
        aboutTitle: 'El Legado de Nuestro Hermano',
        aboutP1: 'Este sitio rinde homenaje al legado musical de Héctor Alejandro Marín Ríos (Nórdika), celebrando su pasión y contribuciones a la banda que amaba.',
        aboutP2: 'Dedicado a preservar su memoria, este sitio muestra su música, sus presentaciones y la alegría que trajo a muchos a través de su arte.',
        aboutP3: 'Únete a nosotros para recordarlo. Celebra la música y los recuerdos de un talentoso artista explorando la profundidad de sus creaciones synthpop.',
        aboutBtn: 'Explorar Su Música',
        funnelTitle: 'Preserva su Legado, Apoya a su Familia',
        funnelSubtitle: 'Escuchar su música en streaming mantiene vivo su espíritu, pero descargarla digitalmente tiene un impacto directo.',
        benefit1Title: 'Apoyo Directo a la Familia',
        benefit1Desc: 'Al comprar la discografía en Bandcamp, los fondos van directamente a la familia Nórdika, brindándoles un apoyo valioso.',
        benefit2Title: 'Calidad de Estudio',
        benefit2Desc: 'Descarga los álbumes en formatos sin pérdida (FLAC/ALAC) y experimenta cada detalle de los sintetizadores y su voz.',
        benefit3Title: 'Dueño de tu Música',
        benefit3Desc: 'A diferencia del streaming, al comprar descargas digitales la música será tuya para siempre. Escúchala sin internet.',
        funnelCtaTitle: 'Adquiere la discografía completa y mantén viva la música.',
        funnelCtaBtn: 'Ir a Bandcamp',

        musicTitle: 'Su Último Trabajo',
        musicSubtitle: 'Esta producción marca el final de su viaje musical físico, pero su legado electrónico resonará para siempre.',
        latestTracksTitle: 'Últimos Lanzamientos',
        latestTracksSubtitle: 'Al comprar la música de Nordika, honras su legado y apoyas a su familia, manteniendo viva su pasión y creatividad.',
        modalTitle: '¿Por qué comprar en Bandcamp?',
        modalB1: 'Los fondos van directo a la familia Nórdika.',
        modalB2: 'Calidad de audio sin pérdida (FLAC / ALAC).',
        modalB3: 'Acceso permanente, incluso sin internet.',
        modalB4: 'Folletos digitales y arte exclusivo.',
        modalBtn: 'Visitar Tienda',
        footerLegacyText: 'Dedicado a preservar su memoria. Celebramos la alegría que trajo a muchos a través de su arte y los sintetizadores.',
        footerLinksTitle: 'Enlaces', footerLink1: 'Escuchar Ahora', footerLink2: 'Contacto Soporte',
        footerSocialTitle: 'Redes Oficiales',
        flagUrl: 'https://flagcdn.com/w20/mx.png'
    },
    en: {
        topBanner: 'BY PURCHASING THE MUSIC, YOU SUPPORT THE NÓRDIKA FAMILY. THANK YOU FOR YOUR SUPPORT!',
        navHome: 'Home', navAbout: 'Biography', navLegacy: 'Support',
        navLatest: 'Latest Tracks', navMusic: 'Music', navShop: 'Shop',
        heroRemembering: 'REMEMBERING HIM',
        heroInLovingMemory: 'IN LOVING MEMORY',
        heroBtn: 'BUY MUSIC',
        aboutTitle: "Our Brother's Legacy",
        aboutP1: 'This site honors the musical legacy of Héctor Alejandro Marín Ríos (Nórdika), celebrating his passion and contributions to the band he loved.',
        aboutP2: 'Dedicated to preserving his memory, this site showcases his music, performances, and the joy he brought to many through his art.',
        aboutP3: 'Join us in remembering him. Celebrate the music and memories of a talented artist and explore the depth of his synthpop creations.',
        aboutBtn: 'Explore His Music',
        funnelTitle: 'Preserve His Legacy, Support His Family',
        funnelSubtitle: 'Streaming his music keeps his spirit alive, but downloading it digitally makes a direct impact.',
        benefit1Title: 'Direct Support for the Family',
        benefit1Desc: 'By purchasing the discography on Bandcamp, funds go directly to the Nórdika family, providing them with valuable support.',
        benefit2Title: 'Studio Quality Audio',
        benefit2Desc: 'Download albums in lossless formats (FLAC/ALAC) and experience every detail of the synthesizers and his voice, exactly as he produced it.',
        benefit3Title: 'Own Your Music',
        benefit3Desc: 'Unlike streaming, buying digital downloads means the music is yours forever. Listen on any device, even offline.',
        funnelCtaTitle: 'Get the full discography and keep the music alive.',
        funnelCtaBtn: 'Go to Bandcamp',

        musicTitle: 'The Last Work',
        musicSubtitle: 'This release marks the end of his physical musical journey, but his electronic legacy will resonate forever.',
        latestTracksTitle: 'The Latest Tracks',
        latestTracksSubtitle: "By purchasing Nordika's music, you honor his legacy and support his family, keeping his passion and creativity alive.",
        modalTitle: 'Why buy on Bandcamp?',
        modalB1: 'Funds go directly to the Nórdika family.',
        modalB2: 'Lossless audio quality (FLAC / ALAC).',
        modalB3: 'Permanent access, even without internet.',
        modalB4: 'Exclusive digital booklets and artwork.',
        modalBtn: 'Visit Store',
        footerLegacyText: 'Dedicated to preserving his memory. We celebrate the joy he brought to many through his art and synthesizers.',
        footerLinksTitle: 'Links', footerLink1: 'Listen Now', footerLink2: 'Support Contact',
        footerSocialTitle: 'Official Socials',
        flagUrl: 'https://flagcdn.com/w20/us.png'
    }
};

let currentLang = 'en';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Nordika Script Initialized');

    // ---- Hamburger Menu ----
    const hamburger = document.getElementById('hamburger-btn');
    const navContainer = document.getElementById('nav-container');
    const overlay = document.querySelector('.nav-overlay');

    function toggleMenu(open) {
        if (open === undefined) open = !navContainer.classList.contains('open');
        console.log('Toggling menu:', open);
        hamburger.classList.toggle('active', open);
        navContainer.classList.toggle('open', open);
        overlay.classList.toggle('show', open);
        document.body.style.overflow = open ? 'hidden' : '';
    }

    if (hamburger) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => toggleMenu(false));
    }

    // Close menu on link click (Forceful)
    const navLinks = document.querySelectorAll('.nav-links a, .btn-shop');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            console.log('Nav link clicked');
            const style = window.getComputedStyle(navContainer);
            if (style.position === 'fixed' || navContainer.classList.contains('open')) {
                setTimeout(() => toggleMenu(false), 300);
            }
        });
    });

    // ---- Language Toggle ----
    const langBtn = document.getElementById('lang-btn');
    if (langBtn) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            console.log('Language button clicked');
            currentLang = currentLang === 'en' ? 'es' : 'en';
            applyTranslations(currentLang);
        });
    }

    // ---- Hero Slider ----
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    if (slides.length > 0) {
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // ---- Sales Modal (Benefit Popup) ----
    const modal = document.getElementById('benefit-popup');
    const closeBtn = document.querySelector('.close-modal');
    let modalShown = false;

    function showModal() {
        if (!modalShown && modal) {
            console.log('SHOWING MODAL NOW');
            modal.classList.add('show');
            modalShown = true;
            sessionStorage.setItem('nordika_modal_shown', 'true');
        }
    }

    // Trigger after 12 seconds for better user experience
    setTimeout(showModal, 12000);

    // Also exit intent
    document.addEventListener('mouseleave', (e) => {
        if (e.clientY <= 0) showModal();
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', () => modal.classList.remove('show'));
    }
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('show');
    });

    // Check if session had it already
    if (sessionStorage.getItem('nordika_modal_shown')) {
        // modalShown = true; // Commented out to ensure it shows during user review
    }
});

function applyTranslations(lang) {
    console.log('Applying translations:', lang);
    const t = translations[lang];
    const map = {
        'top-banner-text': 'topBanner',
        'nav-home': 'navHome', 'nav-about': 'navAbout', 'nav-legacy': 'navLegacy',
        'nav-latest': 'navLatest', 'nav-music': 'navMusic', 'nav-shop': 'navShop',
        'hero-remembering': 'heroRemembering', 'hero-in-loving-memory': 'heroInLovingMemory',
        'hero-btn': 'heroBtn',
        'about-title': 'aboutTitle', 'about-p1': 'aboutP1', 'about-p2': 'aboutP2',
        'about-p3': 'aboutP3', 'about-btn': 'aboutBtn',
        'funnel-title': 'funnelTitle', 'funnel-subtitle': 'funnelSubtitle',
        'benefit-1-title': 'benefit1Title', 'benefit-1-desc': 'benefit1Desc',
        'benefit-2-title': 'benefit2Title', 'benefit-2-desc': 'benefit2Desc',
        'benefit-3-title': 'benefit3Title', 'benefit-3-desc': 'benefit3Desc',
        'funnel-cta-title': 'funnelCtaTitle', 'funnel-cta-btn': 'funnelCtaBtn',

        'music-title': 'musicTitle', 'music-subtitle': 'musicSubtitle',
        'latest-tracks-title': 'latestTracksTitle', 'latest-tracks-subtitle': 'latestTracksSubtitle',
        'modal-title': 'modalTitle', 'modal-btn': 'modalBtn',
        'modal-b1': 'modalB1', 'modal-b2': 'modalB2', 'modal-b3': 'modalB3', 'modal-b4': 'modalB4',
        'footer-legacy-text': 'footerLegacyText', 'footer-links-title': 'footerLinksTitle',
        'footer-link-1': 'footerLink1', 'footer-link-2': 'footerLink2',
        'footer-social-title': 'footerSocialTitle'
    };

    for (const [id, key] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el) el.textContent = t[key];
    }

    const flagImg = document.getElementById('current-lang-flag');
    if (flagImg) flagImg.src = t.flagUrl;
}
