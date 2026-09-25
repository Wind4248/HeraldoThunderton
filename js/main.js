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

  /* --- FAQ accordion ---
     The questions are div[role="button"][tabindex="0"], so they take keyboard
     focus. They previously listened for 'click' only, which a mouse fires but
     Enter and Space on a div do not — so every one of these questions could be
     focused and then not opened. aria-expanded was also written once in the
     markup as "false" and never updated, so assistive tech announced the wrong
     state permanently. Both are WCAG 2.1.1 (Keyboard) / 4.1.2 (Name, Role,
     Value) failures on the largest interactive component on the page. */
  function toggleFaq(question) {
    const item = question.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(function (i) {
      i.classList.remove('open');
      const q = i.querySelector('.faq-question');
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('open');
      question.setAttribute('aria-expanded', 'true');
    }
  }

  document.querySelectorAll('.faq-question').forEach(function (question) {
    question.addEventListener('click', function () {
      toggleFaq(this);
    });

    question.addEventListener('keydown', function (event) {
      if (event.key !== 'Enter' && event.key !== ' ' && event.key !== 'Spacebar') return;
      // Space would otherwise scroll the page out from under the user.
      event.preventDefault();
      toggleFaq(this);
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

  /* --- Contact form (Formspree AJAX) --- */
  const form = document.querySelector('.contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      /* The outcome was previously signalled only by the submit button's label
         and colour. A screen-reader user got no announcement either way, so a
         failed enquiry to a law firm could pass unnoticed. #form-status is an
         aria-live region. */
      const status = document.getElementById('form-status');
      function announce(message) { if (status) status.textContent = message; }
      const originalText = btn.textContent;
      btn.textContent = 'Sending…';
      btn.disabled = true;

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          btn.textContent = 'Message Sent!';
          btn.style.background = '#22c55e';
          announce('Thank you — your message has been sent. Lorelei will be in touch.');
          form.reset();
        } else {
          btn.textContent = 'Error — Please Call Us';
          btn.style.background = '#ef4444';
          btn.disabled = false;
          announce('Your message could not be sent. Please call the office at (614) 486-0052.');
        }
      }).catch(function () {
        btn.textContent = 'Error — Please Call Us';
        btn.style.background = '#ef4444';
        btn.disabled = false;
        announce('Your message could not be sent. Please call the office at (614) 486-0052.');
      });
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

  /* --- Intersection observer for subtle fade-in ---
     Skipped entirely when the visitor has asked for reduced motion. This starts
     48 elements on the homepage at opacity 0 and slides them in; for someone with
     a vestibular disorder that is not decoration, and if the observer never fires
     the content would stay invisible. Respecting the preference means they simply
     get the page, already visible. */
  const prefersReducedMotion = window.matchMedia
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReducedMotion) {
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
