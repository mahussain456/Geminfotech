'use strict';
document.documentElement.classList.add('js');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.querySelector('.menu-label').textContent = 'Menu';
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu';
  navigation.classList.toggle('is-open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu(); menuButton.focus();
  }
});
document.addEventListener('click', event => {
  if (!event.target.closest('.site-header')) closeMenu();
});
matchMedia('(min-width: 721px)').addEventListener('change', closeMenu);
const filterButtons = document.querySelectorAll('[data-filter]');
const serviceItems = document.querySelectorAll('.service-item');
function filterServices(filter) {
  filterButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  let count = 0;
  serviceItems.forEach(item => {
    item.hidden = filter !== 'all' && !item.dataset.for.split(' ').includes(filter);
    if (!item.hidden) count++;
  });
  document.querySelector('#filter-status').textContent = `${count} services shown${filter === 'all' ? '' : ` for ${filter}`}.`;
}
filterButtons.forEach(button => button.addEventListener('click', () => filterServices(button.dataset.filter)));
document.querySelectorAll('[data-audience]').forEach(link => link.addEventListener('click', () => filterServices(link.dataset.audience)));
const form = document.querySelector('#contact-form');
if (form) {
const result = document.querySelector('#form-result');
const fields = ['name', 'phone', 'email', 'service', 'location'];
function validateField(id) {
  const input = document.getElementById(id);
  const value = input.value.trim();
  let error = '';
  if (!value) error = ({name:'Enter your name.', phone:'Enter your phone number.', email:'Enter your email address.', service:'Choose a service, or select “Other / I’m not sure”.', location:'Choose your city, or select “Other Bay Area location”.'})[id];
  else if (id === 'phone' && (!/^[+\d\s().-]+$/.test(value) || value.replace(/\D/g, '').length < 7 || value.replace(/\D/g, '').length > 15)) error = 'Enter a valid phone number with 7–15 digits.';
  else if (id === 'email' && !input.validity.valid) error = 'Enter an email address, such as you@example.com.';
  input.setAttribute('aria-invalid', String(Boolean(error)));
  document.getElementById(`${id}-error`).textContent = error;
  return !error;
}
fields.forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener('blur', () => validateField(id));
  input.addEventListener('input', () => {
    if (input.getAttribute('aria-invalid') === 'true') validateField(id);
  });
});
function prefill(id, value) {
  document.getElementById(id).value = value;
  document.getElementById(id).setAttribute('aria-invalid', 'false');
  document.getElementById(`${id}-error`).textContent = '';
  result.hidden = true;
}
document.querySelectorAll('[data-service]').forEach(link => link.addEventListener('click', () => prefill('service', link.dataset.service)));
document.querySelectorAll('[data-city]').forEach(link => link.addEventListener('click', () => prefill('location', link.dataset.city)));
form.addEventListener('input', () => { result.hidden = true; });
form.addEventListener('change', () => { result.hidden = true; });
form.addEventListener('submit', event => {
  event.preventDefault();
  const validity = fields.map(validateField);
  if (validity.includes(false)) { document.getElementById(fields[validity.indexOf(false)]).focus(); return; }
  const service = document.getElementById('service').selectedOptions[0].text;
  const city = document.getElementById('location').selectedOptions[0].text;
  const request = `Hello Gem Infotech,\n\nI would like a quote for ${service}.\n\nName: ${form.elements.name.value.trim()}\nPhone: ${form.elements.phone.value.trim()}\nEmail: ${form.elements.email.value.trim()}\nCity: ${city}\n\nIssue: ${form.elements.message.value.trim() || 'Please contact me to discuss.'}\n\nThank you!`;
  document.getElementById('request-text').value = request;
  document.getElementById('request-text').hidden = true;
  document.getElementById('copy-status').textContent = '';
  document.getElementById('email-draft').href = `mailto:ahmed@thegeminfo.com?subject=${encodeURIComponent(`Quote request: ${service}`)}&body=${encodeURIComponent(request)}`;
  result.hidden = false;
});
document.getElementById('copy-request').addEventListener('click', async () => {
  const requestText = document.getElementById('request-text');
  try {
    await navigator.clipboard.writeText(requestText.value);
    document.getElementById('copy-status').textContent = 'Copied. Paste it into an email to ahmed@thegeminfo.com.';
  } catch {
    requestText.hidden = false;
    requestText.focus(); requestText.select();
    document.getElementById('copy-status').textContent = 'Copy the selected text below and email it to ahmed@thegeminfo.com.';
  }
});
}
document.getElementById('year').textContent = new Date().getFullYear();

// The hero keeps its content still; only the connection cues and photo drift move.
const scene = document.querySelector('.connected-scene');
if (scene) {
  const motionButton = scene.querySelector('.motion-toggle');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let userPaused = false;
  let inView = true;
  const syncMotion = () => {
    scene.classList.toggle('is-paused', userPaused || !inView || document.hidden || reducedMotion.matches);
    motionButton.setAttribute('aria-pressed', String(userPaused));
    motionButton.setAttribute('aria-label', userPaused ? 'Play hero animation' : 'Pause hero animation');
    motionButton.querySelector('span').textContent = userPaused ? 'Play motion' : 'Pause motion';
    motionButton.querySelector('path').setAttribute('d', userPaused ? 'm8 5 11 7-11 7Z' : 'M9 6v12M15 6v12');
  };
  motionButton.addEventListener('click', () => { userPaused = !userPaused; syncMotion(); });
  if ('IntersectionObserver' in window) new IntersectionObserver(entries => { inView = entries[0].isIntersecting; syncMotion(); }, {threshold:0.1}).observe(scene);
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  syncMotion();
}

// Service-page links carry only a known selection into the quote form.
const quoteForm = document.querySelector('#contact-form');
if (quoteForm) {
  const params = new URLSearchParams(location.search);
  for (const [query, field] of [['service', 'service'], ['city', 'location']]) {
    const value = params.get(query);
    const select = document.getElementById(field);
    if (value && [...select.options].some(option => option.value === value)) select.value = value;
  }
}
