/**
 * SRIKAR PRABHAS KANDAGATLA — PORTFOLIO
 * script.js
 *
 * TABLE OF CONTENTS
 * -----------------
 * 1. Theme Toggle       — dark ↔ light switch with localStorage persistence
 * 2. Scroll Reveal      — IntersectionObserver to animate elements into view
 * 3. Active Nav         — highlights the nav link for the current visible section
 */


/* ============================================================
   1. THEME TOGGLE
   Switches between [data-theme="dark"] and [data-theme="light"]
   on the <html> element. Persists preference to localStorage
   so the user's choice survives page refresh.
============================================================ */

const THEME_KEY = 'sk-portfolio-theme';

/**
 * Applies a theme to the document and updates the toggle thumb icon.
 * @param {'dark' | 'light'} theme
 */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const thumb = document.getElementById('tt');
  if (thumb) {
    thumb.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

/**
 * Toggles between dark and light theme.
 * Called by the toggle button's onclick in index.html.
 */
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
}

// On page load — restore saved preference, default to dark
(function initTheme() {
  const saved = localStorage.getItem(THEME_KEY) || 'dark';
  applyTheme(saved);
})();


/* ============================================================
   2. SCROLL REVEAL
   Observes every element with class .rv.
   When the element enters the viewport, adds class .vis,
   which triggers the CSS opacity + translateY transition.
   Once revealed, the element is unobserved (fires once only).
============================================================ */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('vis');
        revealObserver.unobserve(entry.target); // animate only once
      }
    });
  },
  { threshold: 0.07 } // trigger when 7% of the element is visible
);

// Observe all reveal-marked elements
document.querySelectorAll('.rv').forEach((el) => revealObserver.observe(el));


/* ============================================================
   3. ACTIVE NAV HIGHLIGHT
   Uses IntersectionObserver on each <section> to determine
   which section is currently in view, then highlights the
   corresponding nav link with --highlight color.
============================================================ */

const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');

/**
 * Clears all nav link colors, then highlights the one
 * matching the given section id.
 * @param {string} id — the section's id attribute value
 */
function setActiveNav(id) {
  navLinks.forEach((link) => link.style.color = '');
  const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
  if (activeLink) {
    activeLink.style.color = 'var(--highlight)';
  }
}

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveNav(entry.target.id);
      }
    });
  },
  {
    // Fires when a section occupies the middle band of the viewport
    rootMargin: '-40% 0px -55% 0px'
  }
);

sections.forEach((section) => navObserver.observe(section));