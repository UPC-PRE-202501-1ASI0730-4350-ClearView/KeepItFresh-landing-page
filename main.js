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

// contador animado
function animateCounter(id, endValue) {
  const el = document.getElementById(id);
  let start = 0;
  const duration = 2000;
  const step = Math.ceil(duration / endValue);
  const interval = setInterval(() => {
    start++;
    el.textContent = start;
    if (start === endValue) clearInterval(interval);
  }, step);
}
window.addEventListener("load", () => animateCounter("counter-sensores", 120));

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

// modo oscuro
const darkBtn = document.getElementById("dark-mode-toggle");
darkBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}
