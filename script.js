// Navegación suave y efectos de scroll
document.addEventListener("DOMContentLoaded", function () {
  // Manejo del menú hamburguesa para móvil
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("active");
      hamburger.classList.toggle("active");
    });
  }

  // Cerrar menú al hacer click en un enlace (móvil)
  const navLinksItems = document.querySelectorAll(".nav-links a");
  navLinksItems.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Efecto de scroll en el header
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", function () {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      header.style.background = "rgba(10, 10, 35, 0.95)";
      header.style.boxShadow = "0 2px 20px rgba(0, 212, 255, 0.3)";
    } else {
      header.style.background = "rgba(10, 10, 35, 0.9)";
      header.style.boxShadow = "none";
    }

    lastScrollY = currentScrollY;
  });

  // Animación de entrada para elementos
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observar elementos para animaciones
  const animateElements = document.querySelectorAll(
    ".project-card, .skill-category, .contact-method"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    observer.observe(el);
  });

  // Efecto de escritura para el título principal
  const mainTitle = document.querySelector(".main-title");
  if (mainTitle) {
    const text = mainTitle.textContent;
    mainTitle.textContent = "";

    let index = 0;
    const typeWriter = () => {
      if (index < text.length) {
        mainTitle.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    };

    // Iniciar después de un pequeño delay
    setTimeout(typeWriter, 500);
  }

  // Efecto parallax suave para las estrellas
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      const speed = ((index % 3) + 1) * 0.1;
      star.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Manejo del formulario de contacto
  const contactForm = document.querySelector(".contact-form form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Obtener los datos del formulario
      const formData = new FormData(contactForm);
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const message = contactForm.querySelector("textarea").value;

      // Validación básica
      if (!name || !email || !message) {
        showNotification("Por favor, completa todos los campos.", "error");
        return;
      }

      if (!isValidEmail(email)) {
        showNotification("Por favor, ingresa un email válido.", "error");
        return;
      }

      // Simular envío (aquí podrías integrar con un servicio real)
      showNotification("¡Mensaje enviado! Te contactaré pronto.", "success");
      contactForm.reset();
    });
  }

  // Función para validar email
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Función para mostrar notificaciones
  function showNotification(message, type) {
    // Crear elemento de notificación
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Estilos para la notificación
    notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 700;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            ${
              type === "success"
                ? "background: linear-gradient(45deg, #00d4ff, #0099cc);"
                : "background: linear-gradient(45deg, #ff4757, #ff3838);"
            }
        `;

    document.body.appendChild(notification);

    // Mostrar notificación
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 100);

    // Ocultar después de 3 segundos
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  // Efecto de hover mejorado para los botones
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)";
    });

    button.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

  // Efecto de hover para las cards de proyecto
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) rotateY(5deg)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) rotateY(0deg)";
    });
  });

  // Contador animado para estadísticas (si decides agregarlo)
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
      start += increment;
      element.textContent = Math.floor(start);

      if (start < target) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target;
      }
    };

    updateCounter();
  }

  // Lazy loading para imágenes (si las agregas)
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));

  // Efecto de partículas en el cursor (opcional)
  let particles = [];

  document.addEventListener("mousemove", function (e) {
    // Crear partícula solo ocasionalmente para mejor performance
    if (Math.random() > 0.9) {
      const particle = {
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 3 + 1,
        opacity: 1,
        velocity: {
          x: (Math.random() - 0.5) * 2,
          y: (Math.random() - 0.5) * 2,
        },
      };

      particles.push(particle);

      // Limitar el número de partículas
      if (particles.length > 20) {
        particles.shift();
      }
    }
  });

  // Animar partículas (opcional - comentado para mejor performance)
  /*
    function animateParticles() {
        particles.forEach((particle, index) => {
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;
            particle.opacity -= 0.02;
            
            if (particle.opacity <= 0) {
                particles.splice(index, 1);
            }
        });
        
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
    */

  // Smooth scroll mejorado
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        const headerOffset = 80;
        const elementPosition = target.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Actualizar la navegación activa basada en el scroll
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    navItems.forEach((item) => {
      item.classList.remove("active");
      if (item.getAttribute("href") === `#${current}`) {
        item.classList.add("active");
      }
    });
  });
});

// CSS adicional para elementos activos y móvil (se inyecta via JavaScript)
const additionalStyles = `
    .nav-links.active {
        display: flex;
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: rgba(10, 10, 35, 0.95);
        flex-direction: column;
        padding: 2rem;
        backdrop-filter: blur(10px);
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
    }

    .nav-links a.active {
        color: #00d4ff !important;
        text-shadow: 0 0 5px #00d4ff;
    }

    .nav-links a.active::after {
        width: 100%;
    }

    @media (max-width: 768px) {
        .nav-links {
            display: none;
        }
    }
`;

// Inyectar estilos adicionales
const styleSheet = document.createElement("style");
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);
