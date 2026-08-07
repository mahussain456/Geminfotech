"use strict";

const header = document.getElementById("site-header");
const navLinks = document.getElementById("nav-links");
const menuButton = document.getElementById("menu-button");
const scrollTop = document.getElementById("scroll-top");
const year = document.getElementById("year");
const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");
const successMessage = document.getElementById("form-success");
const serviceSelect = document.getElementById("service");
const locationSelect = document.getElementById("location");

const toggleHeader = () => {
  header.classList.toggle("scrolled", window.scrollY > 12);
  scrollTop.classList.toggle("visible", window.scrollY > 460);
};

window.addEventListener("scroll", toggleHeader, { passive: true });
toggleHeader();

if (year) {
  year.textContent = new Date().getFullYear();
}

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.classList.toggle("open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuButton.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open menu");
  });
});

scrollTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelectorAll(".service-card, .quick-item, .trust-item, .area-panel, .route-map").forEach((element) => {
  element.setAttribute("data-reveal", "");
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -50px 0px" });

document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section[id]");
const navItems = [...navLinks.querySelectorAll("a")];

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const activeId = entry.target.getAttribute("id");
    navItems.forEach((item) => {
      item.classList.toggle("active", item.getAttribute("href") === `#${activeId}`);
    });
  });
}, { threshold: 0.36 });

sections.forEach((section) => sectionObserver.observe(section));

const serviceLinks = document.querySelectorAll("[data-service]");
serviceLinks.forEach((link) => {
  link.addEventListener("click", () => {
    const service = link.getAttribute("data-service");
    if (serviceSelect && service) {
      serviceSelect.value = service;
    }
  });
});

document.querySelectorAll("[data-location]").forEach((button) => {
  button.addEventListener("click", () => {
    const location = button.getAttribute("data-location");
    if (locationSelect && location) {
      locationSelect.value = location;
    }
    document.getElementById("contact").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const validators = {
  name: {
    test: (value) => value.trim().length >= 2,
    message: "Please enter your full name."
  },
  phone: {
    test: (value) => /^[\d\s().+-]{7,20}$/.test(value.trim()),
    message: "Please enter a valid phone number."
  },
  email: {
    test: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: "Please enter a valid email address."
  },
  service: {
    test: (value) => value !== "",
    message: "Please select a service."
  },
  location: {
    test: (value) => value !== "",
    message: "Please select your location."
  }
};

function setFieldError(field, message) {
  const input = document.getElementById(field);
  const error = document.getElementById(`${field}-error`);
  if (input) {
    input.classList.toggle("error", Boolean(message));
  }
  if (error) {
    error.textContent = message || "";
  }
}

function validateField(field) {
  const input = document.getElementById(field);
  const validator = validators[field];
  if (!input || !validator) return true;

  const isValid = validator.test(input.value);
  setFieldError(field, isValid ? "" : validator.message);
  return isValid;
}

Object.keys(validators).forEach((field) => {
  const input = document.getElementById(field);
  if (!input) return;

  input.addEventListener("blur", () => validateField(field));
  input.addEventListener("input", () => {
    if (input.classList.contains("error")) {
      validateField(field);
    }
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const requiredFields = Object.keys(validators);
  const isValid = requiredFields.map(validateField).every(Boolean);
  if (!isValid) {
    const firstError = form.querySelector(".error");
    if (firstError) {
      firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector(".submit-label").style.display = "none";
  submitButton.querySelector(".submit-loading").style.display = "inline";

  await new Promise((resolve) => setTimeout(resolve, 850));

  form.reset();
  submitButton.style.display = "none";
  successMessage.style.display = "block";
});
