// Fix trailing /index.html/ if browser has it
(function fixIndexTrailingSlash() {
  try {
    const p = window.location.pathname || "";
    if (p.match(/index\.html\/$/)) {
      const newPath = p.replace(/index\.html\/$/, "index.html");
      const newUrl = newPath + window.location.search + window.location.hash;
      window.location.replace(newUrl);
    }
  } catch (e) { console.warn(e); }
})();

// Mobile nav
const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");
if (navToggle && mainNav) {
  navToggle.addEventListener("click", () => {
    const open = mainNav.classList.toggle("open");
    navToggle.textContent = open ? "✕" : "☰";
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  mainNav.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (window.innerWidth < 700) {
        mainNav.classList.remove("open");
        navToggle.textContent = "☰";
      }
    });
  });
}

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Smooth scroll anchors
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Contact form validation
const form = document.getElementById("contactForm");
if (form) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const errName = document.getElementById("err-name");
  const errEmail = document.getElementById("err-email");
  const errMessage = document.getElementById("err-message");
  const resultBox = document.getElementById("form-result");

  function validateName() {
    const v = (nameInput && nameInput.value || '').trim();
    if (!v) return "Name cannot be empty.";
    if (v.length < 2) return "Enter at least 2 characters.";
    return "";
  }
  function validateEmail() {
    const v = (emailInput && emailInput.value || '').trim();
    if (!v) return "Email cannot be empty.";
    if (!/^\S+@\S+\.\S+$/.test(v)) return "Enter a valid email.";
    return "";
  }
  function validateMessage() {
    const v = (messageInput && messageInput.value || '').trim();
    if (!v) return "Message cannot be empty.";
    if (v.length < 10) return "Message must be at least 10 characters.";
    return "";
  }

  if (nameInput) nameInput.addEventListener("input", () => errName.textContent = validateName());
  if (emailInput) emailInput.addEventListener("input", () => errEmail.textContent = validateEmail());
  if (messageInput) messageInput.addEventListener("input", () => errMessage.textContent = validateMessage());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (resultBox) resultBox.textContent = "";
    const nErr = validateName();
    const eErr = validateEmail();
    const mErr = validateMessage();
    if (errName) errName.textContent = nErr;
    if (errEmail) errEmail.textContent = eErr;
    if (errMessage) errMessage.textContent = mErr;
    if (nErr) { nameInput.focus(); return; }
    if (eErr) { emailInput.focus(); return; }
    if (mErr) { messageInput.focus(); return; }
    if (resultBox) resultBox.textContent = "Message validated! Opening your mail app...";
    form.removeAttribute("novalidate");
    setTimeout(() => form.submit(), 700);
  });
}
