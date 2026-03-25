// main.js - Portfolio Interactivity

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveals using Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Track all sections and glass cards for reveal
    document.querySelectorAll('section, .glass').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease-out';
        observer.observe(el);
    });

    // Custom Scroll revealing logic (overwrite opacity 0 if already in view)
    const initialReveals = document.querySelectorAll('.fade-up');
    initialReveals.forEach(el => {
        el.style.opacity = '0';
    });

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Interactive Background Effect
    const blobs = document.querySelectorAll('.blob');
    const glow = document.querySelector('.interactive-glow');
    
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        
        // Update interactive glow position
        if (glow) {
            glow.style.left = `${clientX}px`;
            glow.style.top = `${clientY}px`;
        }
        
        // Parallax effect for blobs
        const x = (clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        const y = (clientY / window.innerHeight - 0.5) * 2; // -1 to 1
        
        blobs.forEach((blob, index) => {
            const movement = (index + 1) * 50;
            const rotate = x * 10;
            blob.style.transform = `translate(${x * movement}px, ${y * movement}px) rotate(${rotate}deg)`;
        });
    });
});
