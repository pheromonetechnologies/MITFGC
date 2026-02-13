gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.getElementById('cursor');
const cursorBlur = document.getElementById('cursor-blur');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out'
    });

    gsap.to(cursorBlur, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: 'power2.out'
    });
});

// Hover effects for links and buttons to expand cursor
const hoverElements = document.querySelectorAll('a, button, .course-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(cursor, {
            scale: 2,
            backgroundColor: 'rgba(0, 243, 255, 0.2)',
            mixBlendMode: 'difference',
            border: 'none'
        });
    });

    el.addEventListener('mouseleave', () => {
        gsap.to(cursor, {
            scale: 1,
            backgroundColor: 'transparent',
            mixBlendMode: 'normal',
            border: '2px solid var(--primary-color)'
        });
    });
});

// Hero Animations
gsap.from('.main-title', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.5
});

gsap.from('.tagline', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 0.8
});

gsap.from('.hero-cta', {
    duration: 1.5,
    y: 50,
    opacity: 0,
    ease: 'power4.out',
    delay: 1.1
});

// Scroll Triggers
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        },
        x: -50,
        opacity: 0,
        duration: 1
    });
});

// About Text Reveal
gsap.from('.reveal-text', {
    scrollTrigger: {
        trigger: '.reveal-text',
        start: 'top 75%'
    },
    y: 50,
    opacity: 0,
    duration: 1.2,
    ease: 'power3.out'
});

// Counter Animation
gsap.utils.toArray('.count').forEach(counter => {
    const target = counter.getAttribute('data-target');

    ScrollTrigger.create({
        trigger: counter,
        start: 'top 85%',
        once: true,
        onEnter: () => {
            gsap.to(counter, {
                innerText: target,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power2.out'
            });
        }
    });
});

// Course List Animation
gsap.from('.course-item', {
    scrollTrigger: {
        trigger: '.course-list',
        start: 'top 70%'
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2
});

// Mobile Menu Logic
const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');

menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    menuBtn.classList.toggle('toggle');
});

// Close menu when a link is clicked
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        menuBtn.classList.remove('toggle');
    });
});
