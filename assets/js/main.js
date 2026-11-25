// Portfolio interactions: scroll reveals, scroll-spy navigation, and a cursor spotlight.
// Motion uses transform/opacity only and is skipped when the visitor prefers reduced motion.
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* ---------- Staggered fade-up reveals ---------- */
  function initReveals() {
    const items = Array.from(document.querySelectorAll('[data-reveal]'));
    if (!items.length) return;

    // Stagger siblings inside a group so cards cascade in.
    document.querySelectorAll('[data-reveal-group]').forEach((group) => {
      Array.from(group.querySelectorAll(':scope > [data-reveal]')).forEach((el, i) => {
        el.style.setProperty('--reveal-delay', `${Math.min(i, 6) * 80}ms`);
      });
    });

    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

    items.forEach((el) => io.observe(el));
  }

  /* ---------- Scroll-spy ---------- */
  function initScrollSpy() {
    const links = Array.from(document.querySelectorAll('[data-spy-link]'));
    const ids = Array.from(new Set(links.map((a) => a.getAttribute('href').slice(1))));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return;

    let current = '';
    let ticking = false;

    function setActive(id) {
      if (id === current) return;
      current = id;
      links.forEach((a) => {
        const on = a.getAttribute('href') === `#${id}`;
        a.classList.toggle('is-active', on);
        if (on) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
        // Keep the active chip visible in the horizontally scrolling mobile nav.
        if (on && a.classList.contains('mnav-link') && a.offsetParent) {
          const bar = a.parentElement;
          const target = a.offsetLeft - (bar.clientWidth - a.offsetWidth) / 2;
          bar.scrollTo({ left: target, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
        }
      });
    }

    function update() {
      ticking = false;
      const line = window.innerHeight * 0.35;
      let active = sections[0].id;
      for (const s of sections) {
        if (s.getBoundingClientRect().top - line <= 0) active = s.id;
      }
      // At the very bottom, the last section wins even if it is short.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        active = sections[sections.length - 1].id;
      }
      setActive(active);
    }

    const onScroll = () => {
      if (!ticking) { ticking = true; requestAnimationFrame(update); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();
  }

  /* ---------- Cursor spotlight (desktop, fine pointer only) ---------- */
  function initSpotlight() {
    const el = document.querySelector('.spotlight');
    if (!el) return;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches || reduceMotion.matches) return;

    let x = 0, y = 0, raf = 0;
    const render = () => {
      raf = 0;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };
    window.addEventListener('pointermove', (e) => {
      x = e.clientX; y = e.clientY;
      if (!el.classList.contains('is-on')) el.classList.add('is-on');
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => el.classList.remove('is-on'));
  }

  function init() {
    window.__portfolioReady = true;
    initReveals();
    initScrollSpy();
    initSpotlight();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
