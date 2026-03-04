/* ============================================================
   Lorelei M. Lanier — Estate Planning Attorney
   main.js — Site interactivity
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* --- Mobile nav toggle --- */
  const hamburger = document.querySelector('.hamburger');
  const header    = document.querySelector('.site-header');

  if (hamburger) {
    hamburger.addEventListener('click', function () {
      document.body.classList.toggle('mobile-nav-open');
      const expanded = document.body.classList.contains('mobile-nav-open');
      hamburger.setAttribute('aria-expanded', expanded);
    });

    // Close on nav link click
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      link.addEventListener('click', function () {
        document.body.classList.remove('mobile-nav-open');
      });
    });

    // Close button (created dynamically)
    const closeBtn = document.createElement('button');
    closeBtn.className = 'nav-close';
    closeBtn.innerHTML = '&times;';
    closeBtn.setAttribute('aria-label', 'Close menu');
    closeBtn.addEventListener('click', function () {
      document.body.classList.remove('mobile-nav-open');
    });
    document.querySelector('.site-header').appendChild(closeBtn);
  }

  /* --- Active nav link --- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* --- FAQ accordion --- */
  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(function (i) {
        i.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  /* --- Contact form --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      btn.style.background = '#22c55e';
      // In production, wire to Formspree / Netlify Forms / etc.
    });
  }

  /* --- Sticky header shadow on scroll --- */
  window.addEventListener('scroll', function () {
    if (header) {
      if (window.scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,.14)';
      } else {
        header.style.boxShadow = '';
      }
    }
  }, { passive: true });

  /* --- Intersection observer for subtle fade-in --- */
  if ('IntersectionObserver' in window) {
    const style = document.createElement('style');
    style.textContent = '.reveal{opacity:0;transform:translateY(24px);transition:opacity .5s ease,transform .5s ease}.reveal.visible{opacity:1;transform:none}';
    document.head.appendChild(style);

    const targets = document.querySelectorAll('.practice-card, .review-card, .feature-item, .area-chip, .faq-item');
    targets.forEach(function (el) { el.classList.add('reveal'); });

    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    targets.forEach(function (el) { io.observe(el); });
  }
});
