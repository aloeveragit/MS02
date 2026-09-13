/**
 * Мобильное меню: кнопка-бургер разворачивает список ссылок под шапкой.
 * Регистрируется в общем пространстве имён MDS, вызывается из main.js.
 */
(function (MDS) {
  'use strict';

  MDS.initMobileNav = function initMobileNav() {
    var toggle = document.querySelector('[data-nav-toggle]');
    var menu = document.querySelector('[data-mobile-nav]');

    if (!toggle || !menu) return;

    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      menu.dataset.open = String(open);
    }

    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Клик по ссылке — закрываем меню
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) setOpen(false);
    });

    // Escape закрывает меню
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') setOpen(false);
    });

    // При переходе на десктоп сбрасываем состояние
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (event) {
      if (event.matches) setOpen(false);
    });
  };
})((window.MDS = window.MDS || {}));
