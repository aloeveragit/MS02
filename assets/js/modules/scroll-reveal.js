/**
 * Плавное появление блоков с классом .reveal при попадании во вьюпорт.
 * Если IntersectionObserver недоступен — блоки просто показываются сразу.
 */
const VISIBLE_CLASS = 'is-visible';

export function initScrollReveal(selector = '.reveal') {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add(VISIBLE_CLASS));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(VISIBLE_CLASS);
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
}
