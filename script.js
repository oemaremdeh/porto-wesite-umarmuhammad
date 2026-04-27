/* =============================================
   PORTFOLIO WEBSITE - script.js
   ============================================= */

/* ---- DOM Ready ---- */
document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initActiveNav();
  initProgressBars();
  initContactForm();
  initCounters();
  initNavScroll();
  initTypingEffect();
});

/* =============================================
   SCROLL ANIMATIONS (Intersection Observer)
   ============================================= */
function initScrollAnimations() {
  const animatedEls = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Only trigger once
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  animatedEls.forEach(el => observer.observe(el));
}

/* =============================================
   ACTIVE NAV LINK
   ============================================= */
function initActiveNav() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* =============================================
   PROGRESS BARS ANIMATION
   ============================================= */
function initProgressBars() {
  const bars = document.querySelectorAll('.progress-bar[data-width]');
  if (!bars.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.getAttribute('data-width');
        setTimeout(() => { bar.style.width = width; }, 200);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  // Initially set width to 0
  bars.forEach(bar => {
    bar.style.width = '0%';
    observer.observe(bar);
  });
}

/* =============================================
   NAVBAR SCROLL EFFECT
   ============================================= */
function initNavScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.boxShadow = '0 4px 30px rgba(108, 99, 255, 0.12)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
}

/* =============================================
   STATS COUNTER ANIMATION
   ============================================= */
function initCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counter.innerText = '0';
    observer.observe(counter);
  });
}

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'));
  const suffix = el.getAttribute('data-suffix') || '';
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;

  const update = () => {
    current += step;
    if (current < target) {
      el.innerText = Math.floor(current) + suffix;
      requestAnimationFrame(update);
    } else {
      el.innerText = target + suffix;
    }
  };
  requestAnimationFrame(update);
}

/* =============================================
   TYPING EFFECT (Hero Section)
   ============================================= */
function initTypingEffect() {
  const el = document.getElementById('typing-text');
  if (!el) return;

  const words = ['Full Stack Developer', 'UI/UX Designer', 'Problem Solver', 'Creative Thinker'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const current = words[wordIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 60;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      typingSpeed = 1500; // pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* =============================================
   CONTACT FORM VALIDATION
   ============================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let valid = true;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => (el.style.display = 'none'));
    document.querySelectorAll('.form-control').forEach(el => el.classList.remove('border-danger'));

    // Name validation
    const name = document.getElementById('name');
    if (!name.value.trim() || name.value.trim().length < 2) {
      showError('name-error', 'Please enter your full name (at least 2 characters).');
      name.classList.add('border-danger');
      valid = false;
    }

    // Email validation
    const email = document.getElementById('email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailPattern.test(email.value)) {
      showError('email-error', 'Please enter a valid email address.');
      email.classList.add('border-danger');
      valid = false;
    }

    // Message validation
    const message = document.getElementById('message');
    if (!message.value.trim() || message.value.trim().length < 10) {
      showError('message-error', 'Message must be at least 10 characters.');
      message.classList.add('border-danger');
      valid = false;
    }

    if (valid) {
      // Show success message
      form.style.display = 'none';
      const successMsg = document.getElementById('success-message');
      if (successMsg) {
        successMsg.style.display = 'block';
        successMsg.classList.add('fade-in-up', 'visible');
      }
    }
  });
}

function showError(id, message) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
  }
}

/* =============================================
   SMOOTH SCROLL FOR ANCHOR LINKS
   ============================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
