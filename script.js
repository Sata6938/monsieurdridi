/* ---- Navbar scroll ---- */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav?.classList.toggle('scrolled', window.scrollY > 40);
});

/* ---- Burger menu ---- */
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  burger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
// Ferme le menu au clic sur un lien
navLinks?.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* ---- Active nav link (page courante) ---- */
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  }
});

/* ---- Révélation au scroll (IntersectionObserver) ---- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Accordion ---- */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.closest('.accordion-item');
    const body = item.querySelector('.accordion-body');
    const isOpen = item.classList.contains('open');

    // Fermer tous les autres
    document.querySelectorAll('.accordion-item.open').forEach(openItem => {
      openItem.classList.remove('open');
      openItem.querySelector('.accordion-body').classList.remove('open');
    });

    if (!isOpen) {
      item.classList.add('open');
      body.classList.add('open');
    }
  });
});

/* ---- Tabs ---- */
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.closest('.tabs-container');
    const target = btn.dataset.tab;

    group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

    btn.classList.add('active');
    group.querySelector(`#${target}`)?.classList.add('active');
  });
});

/* ---- Progress bars (animation déclenchée au scroll) ---- */
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-bar-fill').forEach(fill => {
        fill.style.width = fill.dataset.width;
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
document.querySelectorAll('.skills-section').forEach(el => barObserver.observe(el));

/* ---- Compteur animé (stats) ---- */
function animateCount(el, end, duration = 1800) {
  let start = 0;
  const step = (end / (duration / 16));
  const timer = setInterval(() => {
    start = Math.min(start + step, end);
    el.textContent = Math.floor(start).toLocaleString('fr-FR') + (el.dataset.suffix || '');
    if (start >= end) clearInterval(timer);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number[data-count]').forEach(el => {
        animateCount(el, parseInt(el.dataset.count), 1600);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
document.querySelectorAll('.stats-band').forEach(el => statsObserver.observe(el));

/* ---- Smooth scroll pour ancres internes ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ---- Tooltip sur les spec-cards ---- */
document.querySelectorAll('.spec-card[title]').forEach(card => {
  card.addEventListener('mouseenter', e => {
    const tip = document.createElement('div');
    tip.className = 'tooltip-popup';
    tip.textContent = card.title;
    document.body.appendChild(tip);
    const r = card.getBoundingClientRect();
    tip.style.cssText = `
      position:fixed; top:${r.top - tip.offsetHeight - 8}px;
      left:${r.left + r.width/2 - tip.offsetWidth/2}px;
      background:rgba(0,212,255,.15); border:1px solid rgba(0,212,255,.3);
      color:#f0f6ff; padding:6px 12px; border-radius:8px;
      font-size:.78rem; pointer-events:none; z-index:9999;
      backdrop-filter:blur(8px);
    `;
    card._tooltip = tip;
  });
  card.addEventListener('mouseleave', () => {
    card._tooltip?.remove();
  });
});

console.log('%c🎓 CIEL — Site chargé avec succès !', 'color:#00d4ff; font-size:14px; font-weight:bold;');
