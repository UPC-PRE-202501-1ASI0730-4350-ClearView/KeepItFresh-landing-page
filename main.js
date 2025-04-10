// i18n
let translations = {};
const switcher = document.getElementById("language-switcher");

function loadLang(lang) {
  fetch(`lang/${lang}.json`)
    .then((res) => res.json())
    .then((data) => {
      translations = data;
      applyTranslations();
    });
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const keys = el.dataset.i18n.split(".");
    let text = translations;
    keys.forEach((k) => (text = text[k]));
    if (text) el.innerHTML = text;
  });
}

switcher.addEventListener("change", () => {
  loadLang(switcher.value);
});

loadLang("es");

// scroll suave
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

// reveal on scroll
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.2 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// validación de formulario
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  if (!email.includes("@")) {
    alert("Correo inválido");
    return;
  }
  alert("¡Gracias! Pronto nos pondremos en contacto.");
});

window.addEventListener('scroll', function () {
  const menu = document.querySelector('.menu');
  if (window.scrollY > 50) {
    menu.classList.add('scrolled');
    menu.classList.remove('transparent');
  } else {
    menu.classList.add('transparent');
    menu.classList.remove('scrolled');
  }
});
