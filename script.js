/* ═══════════════════════════════════════════
   GEM INFOTECH — MAIN JAVASCRIPT
   ═══════════════════════════════════════════ */

'use strict';

// ─── Navbar Scroll Effect ──────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ─── Mobile Menu ───────────────────────────
const hamburger  = document.getElementById('hamburger');
const navLinks   = document.getElementById('nav-links');
const overlay    = document.getElementById('mobile-overlay');

function openMenu() {
  hamburger.classList.add('active');
  navLinks.classList.add('open');
  overlay.classList.add('active');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}
function closeMenu() {
  hamburger.classList.remove('active');
  navLinks.classList.remove('open');
  overlay.classList.remove('active');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  hamburger.classList.contains('active') ? closeMenu() : openMenu();
});
overlay.addEventListener('click', closeMenu);

// Close menu on nav link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ─── Scroll-Into-View Animations ──────────────
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      // Kick off counter animation when stats enter view
      entry.target.querySelectorAll('[data-target]').forEach(el => {
        animateCounter(el);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// ─── Counter Animation ─────────────────────
function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1600;
  const start = performance.now();

  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

// Observe stats bar separately for counter
const statsBar = document.getElementById('stats');
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('[data-target]').forEach(el => animateCounter(el));
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
if (statsBar) statsObserver.observe(statsBar);

// Hero stat counters on load
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.querySelectorAll('.hero-visual [data-target]').forEach(el => animateCounter(el));
  }, 600);
});

// ─── Scroll To Top ─────────────────────────
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ─── Dynamic Year ──────────────────────────
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ─── Contact Form Validation & Submit ──────
const form        = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');
const successMsg  = document.getElementById('form-success');

const validators = {
  name:     { test: v => v.trim().length >= 2, msg: 'Please enter your full name.' },
  phone:    { test: v => /^[\d\s\(\)\-\+\.]{7,20}$/.test(v.trim()), msg: 'Please enter a valid phone number.' },
  email:    { test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Please enter a valid email address.' },
  service:  { test: v => v !== '', msg: 'Please select a service.' },
  location: { test: v => v !== '', msg: 'Please select your location.' }
};

function setError(field, msg) {
  const input = document.getElementById(field);
  const errEl = document.getElementById(`${field}-error`);
  if (input)  input.classList.toggle('error', !!msg);
  if (errEl)  errEl.textContent = msg || '';
}

function validateField(field) {
  const el = document.getElementById(field);
  if (!el) return true;
  const rule = validators[field];
  if (rule && !rule.test(el.value)) {
    setError(field, rule.msg);
    return false;
  }
  setError(field, '');
  return true;
}

// Live validation on blur
Object.keys(validators).forEach(field => {
  const el = document.getElementById(field);
  if (el) {
    el.addEventListener('blur', () => validateField(field));
    el.addEventListener('input', () => {
      if (el.classList.contains('error')) validateField(field);
    });
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all
  const fields = ['name', 'phone', 'email', 'service', 'location'];
  const valid  = fields.map(f => validateField(f)).every(Boolean);
  if (!valid) {
    // Scroll to first error
    const firstErr = form.querySelector('.error');
    if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Show loading
  const btnText    = submitBtn.querySelector('.btn-text');
  const btnLoading = submitBtn.querySelector('.btn-loading');
  btnText.style.display    = 'none';
  btnLoading.style.display = 'inline-flex';
  submitBtn.disabled = true;

  // Simulate async submission (replace with real endpoint)
  await new Promise(r => setTimeout(r, 1800));

  // Success
  submitBtn.style.display = 'none';
  successMsg.style.display = 'flex';
  form.reset();

  // In production, you'd POST to a real API:
  // const data = new FormData(form);
  // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(Object.fromEntries(data)) });
});

// ─── Smooth Active Nav Highlight ───────────
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// Add active nav styles dynamically
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--blue-900) !important; background: var(--blue-50) !important; font-weight: 600; }`;
document.head.appendChild(style);

// ─── Service Card Hover Sparkle ───────────
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect  = card.getBoundingClientRect();
    const x     = ((e.clientX - rect.left) / rect.width)  * 100;
    const y     = ((e.clientY - rect.top)  / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
  });
});

// ─── City Card Click → Pre-fill Form ──────
const locationSelect = document.getElementById('location');
document.querySelectorAll('.city-card[id]').forEach(card => {
  card.addEventListener('click', () => {
    const map = {
      'city-sf':           'san-francisco',
      'city-walnut-creek': 'walnut-creek',
      'city-lafayette':    'lafayette',
      'city-san-ramon':    'san-ramon',
      'city-danville':     'danville',
      'city-other':        'other-bay-area'
    };
    const val = map[card.id];
    if (val && locationSelect) {
      locationSelect.value = val;
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ─── Service Card Click → Pre-fill Form ───
const serviceSelect = document.getElementById('service');
document.querySelectorAll('.sc-link[id]').forEach(link => {
  link.addEventListener('click', (e) => {
    if (!link.href.startsWith('tel:')) {
      const map = {
        'service-link-computer-repair': 'computer-repair',
        'service-link-os-install':      'os-installation',
        'service-link-virus':           'virus-removal',
        'service-link-wifi':            'wifi-setup',
        'service-link-printer':         'printer-setup',
        'service-link-office':          'office-setup',
        'service-link-smart-hands':     'smart-hands'
      };
      const val = map[link.id];
      if (val && serviceSelect) serviceSelect.value = val;
    }
  });
});

console.log('%c🔷 Gem Infotech', 'color:#1e3a8a;font-size:1.5rem;font-weight:800;');
console.log('%cBay Area Tech Services — ahmed@thegeminfo.com', 'color:#64748b;font-size:0.9rem;');
