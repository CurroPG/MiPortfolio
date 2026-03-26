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
                // Trigger progress bars if the element contains them
                const bars = entry.target.querySelectorAll('.skill-progress-bar');
                bars.forEach(bar => {
                    const targetWidth = bar.getAttribute('data-width');
                    if (targetWidth) bar.style.width = targetWidth;
                });
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

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle icon between menu and x
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // Smooth scroll for anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Immersive Neon Background (Canvas Particles + Orbital Blobs) ---
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const particleCount = 60;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.init();
            }
            init() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.alpha = Math.random() * 0.5 + 0.2;
            }
            update(mouseX, mouseY) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Mouse reaction
                const dx = mouseX - this.x;
                const dy = mouseY - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    this.vx -= dx * 0.0001;
                    this.vy -= dy * 0.0001;
                }
            }
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${this.alpha})`;
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) particles.push(new Particle());

        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Update glow position
            if (glow) {
                glow.style.left = `${mouseX}px`;
                glow.style.top = `${mouseY}px`;
            }
        });

        const blobs = document.querySelectorAll('.blob');
        const animate = (time) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update(mouseX, mouseY);
                p.draw();
            });

            // Orbital motion for blobs + mouse parallax
            const t = time * 0.0005;
            const xOff = (mouseX / window.innerWidth - 0.5) * 60;
            const yOff = (mouseY / window.innerHeight - 0.5) * 60;

            blobs.forEach((blob, i) => {
                const orbitX = Math.cos(t + i) * 100;
                const orbitY = Math.sin(t * 0.8 + i) * 150;
                const rotate = Math.sin(t * 0.5) * 20;
                blob.style.transform = `translate(${orbitX + xOff}px, ${orbitY + yOff}px) rotate(${rotate}deg)`;
            });

            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }

    const glow = document.querySelector('.interactive-glow');

    // --- Translation System ---
    const translations = {
        es: {
            "nav-about": "Sobre mí",
            "nav-projects": "Proyectos",
            "nav-education": "Formación",
            "nav-skills": "Habilidades",
            "nav-contact": "Contacto",
            "hero-subtitle": "Estudiante de DAM",
            "hero-btn": "Ver Proyectos",
            "about-title": "Sobre Mí",
            "about-greeting": "¡Buenas! Soy Curro.",
            "about-p1": "Si has llegado hasta aquí, es probable que compartamos la misma pasión por la tecnología. Actualmente estoy cursando el **Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)**, donde exploro cada día nuevas formas de crear soluciones digitales.",
            "about-p2": "Disfruto creando experiencias interactivas desde cero, aplicando lógica de resolución de problemas y trabajando en equipo. Mi objetivo es seguir enfrentándome a retos que me permitan crecer como desarrollador, siempre con el foco en la eficiencia e innovación visual.",
            "edu-title": "Formación Académica",
            "edu-alan-turing": "CPIFP Alan Turing",
            "edu-alan-turing-degree": "Desarrollo de Aplicaciones Multiplataforma (DAM)",
            "edu-alan-turing-d1": "Formación avanzada en programación y bases de datos.",
            "edu-alan-turing-d2": "Desarrollo de software para distintas plataformas móviles y desktop.",
            "edu-alan-turing-d3": "Resolución de problemas técnicos complejos y trabajo en equipo.",
            "edu-pedro-espinosa": "IES Pedro Espinosa",
            "edu-pedro-espinosa-degree": "Bachillerato Tecnológico",
            "edu-pedro-espinosa-d1": "Educación orientada a la tecnología, matemáticas y ciencias aplicadas.",
            "edu-pedro-espinosa-d2": "Desarrollo de capacidad analítica y razonamiento lógico-matemático.",
            "edu-pedro-espinosa-d3": "Bases sólidas en sistemas digitales, física y lógica.",
            "edu-pedro-espinosa-d3": "Bases sólidas en sistemas digitales, física y lógica.",
            "projects-title": "Proyecto Estrella",
            "others-title": "Otros Proyectos",
            "project-neonbrawl-desc": "Sobrevive a la horda en este trepidante juego de acción browser-based. Creado íntegramente desde cero, NeoNBrawL es el resultado de mi pasión por el desarrollo de juegos indie.",
            "project-neonbrawl-d1": "Desarrollado desde cero",
            "project-neonbrawl-d2": "Jugable en el navegador",
            "project-neonbrawl-d3": "Estética Neon Retrofuturista",
            "project-neonbrawl-btn": "Jugar Ahora en Itch.io",
            "project-ra03-title": "Piedra, Papel, Tijera, Lagarto o Spock",
            "project-ra03-desc": "Desarrollo de lógica en Javascript con el famoso juego de la serie Big Bang Theory.",
            "project-ra04-title": "Studio Ghibli",
            "project-ra04-desc": "Manipulación avanzada del DOM y gestión dinámica de contenidos con la API de Studio Ghibli.",
            "repo-btn": "Repositorio",
            "future-projects-title": "Próximamente más proyectos",
            "future-projects-desc": "Actualmente me encuentro en una fase constante de aprendizaje, desarrollando nuevas ideas y proyectos conforme progreso en mi formación en DAM. ¡Vuelve pronto para ver mis nuevas creaciones!",
            "skills-title": "Habilidades",
            "skill-java-desc": "POO, Swing, Estructuras de Datos, Algoritmos",
            "skill-html-css-desc": "Responsive Design, Animaciones, Glassmorphism, Layouts",
            "skill-sql-desc": "Diseño de BD, Consultas Complejas, MySQL, PostgreSQL",
            "skill-davinci-desc": "Edición de Video, Corrección de Color, Motion Graphics",
            "skill-english-title": "Inglés (B1)",
            "skill-english-desc": "Certificación B1, Competencia Profesional",
            "contact-title": "Contacto",
            "contact-email-label": "Email",
            "contact-phone-label": "Teléfono",
            "contact-location-label": "Ubicación",
            "contact-cta-short": "¿Tienes algún proyecto en mente o simplemente quieres decir hola? ¡Hablemos!",
            "form-name-label": "Nombre",
            "form-name-placeholder": "Tu nombre",
            "form-email-label": "Email",
            "form-email-placeholder": "tu@email.com",
            "form-message-label": "Mensaje",
            "form-message-placeholder": "¿En qué puedo ayudarte?",
            "form-submit": "Enviar Mensaje",
            "footer-copy": "&copy; 2026 Curro Portillo Guerrero. Todos los derechos reservados."
        },
        en: {
            "nav-about": "About Me",
            "nav-projects": "Projects",
            "nav-education": "Education",
            "nav-skills": "Skills",
            "nav-contact": "Contact",
            "hero-subtitle": "DAM Student",
            "hero-btn": "View Projects",
            "about-title": "About Me",
            "about-greeting": "Hey there! I'm Curro.",
            "about-p1": "If you've made it this far, we probably share the same passion for technology. I'm currently studying for a **Higher Degree in Multiplatform Application Development (DAM)**, where I explore new ways to create digital solutions every day.",
            "about-p2": "I enjoy building interactive experiences from scratch, applying problem-solving logic, and working in a team. My goal is to keep tackling challenges that allow me to grow as a developer, always focusing on efficiency and visual innovation.",
            "edu-title": "Academic Background",
            "edu-alan-turing": "CPIFP Alan Turing",
            "edu-alan-turing-degree": "Multiplatform Application Development (DAM)",
            "edu-alan-turing-d1": "Advanced training in programming and databases.",
            "edu-alan-turing-d2": "Software development for different mobile and desktop platforms.",
            "edu-alan-turing-d3": "Solving complex technical problems and teamwork.",
            "edu-pedro-espinosa": "IES Pedro Espinosa",
            "edu-pedro-espinosa-degree": "Technological Baccalaureate",
            "edu-pedro-espinosa-d1": "Technology, mathematics, and applied sciences oriented education.",
            "edu-pedro-espinosa-d2": "Development of analytical capacity and logical-mathematical reasoning.",
            "edu-pedro-espinosa-d3": "Solid foundations in digital systems, physics, and logic.",
            "edu-pedro-espinosa-d3": "Solid foundations in digital systems, physics, and logic.",
            "projects-title": "Featured Project",
            "others-title": "Other Projects",
            "project-neonbrawl-desc": "Survive the horde in this fast-paced browser-based action game. Created entirely from scratch, NeoNBrawL is the result of my passion for indie game development.",
            "project-neonbrawl-d1": "Developed from scratch",
            "project-neonbrawl-d2": "Playable in the browser",
            "project-neonbrawl-d3": "Neon Retro-futuristic Aesthetic",
            "project-neonbrawl-btn": "Play Now on Itch.io",
            "project-ra03-title": "Rock, Paper, Scissors, Lizard, Spock",
            "project-ra03-desc": "Javascript logic development featuring the famous game from The Big Bang Theory.",
            "project-ra04-title": "Studio Ghibli",
            "project-ra04-desc": "Advanced DOM manipulation and dynamic content management using the Studio Ghibli API.",
            "repo-btn": "Repository",
            "future-projects-title": "More projects coming soon",
            "future-projects-desc": "I am currently in a constant phase of learning, developing new ideas and projects as I progress in my DAM training. Come back soon to see my new creations!",
            "skills-title": "Skills",
            "skill-java-desc": "OOP, Swing, Data Structures, Algorithms",
            "skill-html-css-desc": "Responsive Design, Animations, Glassmorphism, Layouts",
            "skill-sql-desc": "DB Design, Complex Queries, MySQL, PostgreSQL",
            "skill-davinci-desc": "Video Editing, Color Correction, Motion Graphics",
            "skill-english-title": "English (B1)",
            "skill-english-desc": "B1 Certification, Professional Proficiency",
            "contact-title": "Contact",
            "contact-email-label": "Email",
            "contact-phone-label": "Phone",
            "contact-location-label": "Location",
            "contact-cta-short": "Have a project in mind or just want to say hi? Let's talk!",
            "form-name-label": "Name",
            "form-name-placeholder": "Your name",
            "form-email-label": "Email",
            "form-email-placeholder": "you@email.com",
            "form-message-label": "Message",
            "form-message-placeholder": "How can I help you?",
            "form-submit": "Send Message",
            "footer-copy": "&copy; 2026 Curro Portillo Guerrero. All rights reserved."
        }
    };

    let currentLang = localStorage.getItem('portfolio-lang') || 'es';
    const langBtn = document.getElementById('lang-toggle');

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                el.innerHTML = translations[lang][key];
            }
        });

        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                el.placeholder = translations[lang][key];
            }
        });

        langBtn.textContent = lang.toUpperCase();
        localStorage.setItem('portfolio-lang', lang);
    }

    if (langBtn) {
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'es' ? 'en' : 'es';
            updateLanguage(currentLang);
        });
        updateLanguage(currentLang);
    }
});
