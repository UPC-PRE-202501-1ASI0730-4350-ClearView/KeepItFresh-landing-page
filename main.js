// i18n
let translations = {};
const switcher = document.getElementById("language-switcher");

function loadLang(lang) {
  fetch(`lang/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      applyTranslations();
    })
    .catch((error) => {
      console.error("Error al cargar el idioma:", error);
    });
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.dataset.i18n.split(".");
    let text = translations;
    for (const k of keys) {
      if (text && k in text) {
        text = text[k];
      } else {
        text = null;
        break;
      }
    }
    if (text) el.textContent = text;
  });
}

if (switcher) {
  switcher.addEventListener("change", () => {
    loadLang(switcher.value);
  });
}

loadLang("en");

// scroll suave
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// reveal on scroll
function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
}

initReveal();

// validación de formulario
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    if (!email.includes("@")) {
      alert("Correo inválido");
      return;
    }
    alert("¡Gracias! Pronto nos pondremos en contacto.");
  });
}

// cambiar color del menú al hacer scroll
window.addEventListener("scroll", () => {
  const menu = document.querySelector(".menu");
  if (menu) {
    if (window.scrollY > 50) {
      menu.classList.add("scrolled");
      menu.classList.remove("transparent");
    } else {
      menu.classList.add("transparent");
      menu.classList.remove("scrolled");
    }
  }
});

const hamburger = document.getElementById("hamburger");
const navbarList = document.getElementById("navbar-list");

if (hamburger && navbarList) {
  hamburger.addEventListener("click", () => {
    navbarList.classList.toggle("active");
  });
}


new Swiper(".card-wrapper", {
  loop: true,
  spaceBetween: 30,

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});



