/**
 * Мобильное меню: кнопка-бургер разворачивает список ссылок под шапкой.
 */
export function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-mobile-nav]');

  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    menu.dataset.open = String(open);
  };

  toggle.addEventListener('click', () => {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Клик по ссылке — закрываем меню
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // Escape закрывает меню
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });

  // При переходе на десктоп сбрасываем состояние
  window.matchMedia('(min-width: 901px)').addEventListener('change', (event) => {
    if (event.matches) setOpen(false);
  });
}
