const PORTFOLIO_EMAIL = "johnreybarreda@gmail.com";
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];
$("#year").textContent = new Date().getFullYear();

// Mobile menu
const menuButton = $("#hamburger");
const navlinks = $("#navlinks");
const closeMenu = () => {
  navlinks.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open menu");
};
menuButton.addEventListener("click", () => {
  const isOpen = navlinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
$$(".navlinks a").forEach(a => a.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") closeMenu();
});

// Dark / light theme (saved in this browser)
if (localStorage.getItem("jm-theme") !== "dark") document.body.classList.add("light");
const themeButton = $("#theme");
const updateThemeLabel = () => {
  themeButton.setAttribute(
    "aria-label",
    document.body.classList.contains("light") ? "Switch to dark theme" : "Switch to light theme"
  );
};
updateThemeLabel();
$("#theme").addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem("jm-theme", document.body.classList.contains("light") ? "light" : "dark");
  updateThemeLabel();
});

// Reveal animations
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("visible"); observer.unobserve(e.target); }
  }), {threshold:.12});
  $$(".reveal").forEach(el => observer.observe(el));
  document.body.classList.add("reveal-animations");
}

// Filter projects
$$(".filters button").forEach(btn => btn.addEventListener("click", () => {
  $$(".filters button").forEach(b => {
    b.classList.toggle("active", b === btn);
    b.setAttribute("aria-pressed", String(b === btn));
  });
  const filter = btn.dataset.filter;
  $$(".project").forEach(card => card.classList.toggle("hide", filter !== "all" && card.dataset.kind !== filter));
}));
$$(".filters button").forEach(btn => btn.setAttribute("aria-pressed", String(btn.classList.contains("active"))));

$("#gmailContact").href="https://mail.google.com/mail/u/0/?view=cm&fs=1&to="+encodeURIComponent(PORTFOLIO_EMAIL);