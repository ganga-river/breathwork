(function () {
  const header = document.getElementById('siteHeader');
  const nav = document.getElementById('primaryNav');
  const toggle = document.getElementById('navToggle');
  const body = document.body;
  const scrollLinks = document.querySelectorAll('a[data-scroll]');
  const yearEl = document.getElementById('footerYear');
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const desktopQuery = window.matchMedia('(min-width: 960px)');

  body.classList.remove('no-js');

  function isDesktop() {
    return desktopQuery.matches;
  }

  function setHeaderShadow() {
    if (!header) return;
    const isScrolled = (window.scrollY || window.pageYOffset || 0) > 24;
    header.classList.toggle('is-scrolled', isScrolled);
  }

  function openNav() {
    if (!nav || !toggle) return;
    nav.dataset.open = 'true';
    nav.removeAttribute('aria-hidden');
    toggle.setAttribute('aria-expanded', 'true');
    if (!isDesktop()) {
      body.classList.add('nav-open');
    }
  }

  function closeNav() {
    if (!nav || !toggle) return;
    if (isDesktop()) {
      nav.dataset.open = 'true';
      nav.removeAttribute('aria-hidden');
    } else {
      nav.dataset.open = 'false';
      nav.setAttribute('aria-hidden', 'true');
      body.classList.remove('nav-open');
    }
    toggle.setAttribute('aria-expanded', 'false');
    if (isDesktop()) {
      body.classList.remove('nav-open');
    }
  }

  function syncNavToViewport() {
    if (!nav) return;
    if (isDesktop()) {
      nav.dataset.open = 'true';
      nav.removeAttribute('aria-hidden');
      body.classList.remove('nav-open');
      toggle?.setAttribute('aria-expanded', 'false');
    } else {
      nav.dataset.open = 'false';
      nav.setAttribute('aria-hidden', 'true');
      body.classList.remove('nav-open');
      toggle?.setAttribute('aria-expanded', 'false');
    }
  }

  setHeaderShadow();
  window.addEventListener('scroll', setHeaderShadow, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.dataset.open === 'true' && !isDesktop();
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    nav.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('a') && !isDesktop()) {
        closeNav();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !isDesktop()) {
        closeNav();
      }
    });

    desktopQuery.addEventListener('change', syncNavToViewport);
    syncNavToViewport();
  }

  scrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      const targetId = href.slice(1);
      if (!targetId) return;
      const section = document.getElementById(targetId);
      if (!section) return;
      event.preventDefault();
      const behavior = prefersReduced.matches ? 'auto' : 'smooth';
      section.scrollIntoView({ behavior, block: 'start' });
      if (!prefersReduced.matches) {
        section.classList.add('is-highlighted');
        window.setTimeout(() => section.classList.remove('is-highlighted'), 1200);
      }
    });
  });

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  if (typeof window.initializeAurora === 'function') {
    window.initializeAurora('heroAurora');
  }
})();
