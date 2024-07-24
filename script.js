document.addEventListener('DOMContentLoaded', () => {
    // Funcionalidad del menú hamburguesa
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links li").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
    }));

    // Animación de aparición al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Animaciones GSAP
    gsap.from("h1", { duration: 1, y: -50, opacity: 0, ease: "power3.out" });
    gsap.from("h2", { duration: 1, y: -30, opacity: 0, ease: "power3.out", delay: 0.3 });
    gsap.from(".cta-button", { duration: 1, y: 30, opacity: 0, ease: "power3.out", delay: 0.6 });

    gsap.from(".servicio", {
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#servicios",
            start: "top 80%"
        }
    });

    gsap.from(".proyecto", {
        duration: 0.8,
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: "#portfolio",
            start: "top 80%"
        }
    });

    // Rotación automática de certificados
    function rotateCertificates() {
        const certificates = document.querySelectorAll('.certificate');
        let currentIndex = 0;

        setInterval(() => {
            certificates[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % certificates.length;
            certificates[currentIndex].classList.add('active');
        }, 3000);
    }

    rotateCertificates();

    // Funcionalidad de copiar email
    const copyButton = document.getElementById('copyEmail');
    const emailElement = document.getElementById('email');

    copyButton.addEventListener('click', function() {
        const emailText = emailElement.textContent;
        navigator.clipboard.writeText(emailText).then(function() {
            copyButton.innerHTML = '<i class="fas fa-check"></i> Copiado';
            setTimeout(function() {
                copyButton.innerHTML = '<i class="far fa-copy"></i> Copiar';
            }, 2000);
        }, function(err) {
            console.error('No se pudo copiar el texto: ', err);
        });
    });
});

gsap.from("#videos .video-wrapper", {
    duration: 0.8,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    ease: "power3.out",
    scrollTrigger: {
        trigger: "#videos",
        start: "top 80%"
    }
});