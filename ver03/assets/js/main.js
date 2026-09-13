/**
 * Точка входа. Вызывает модули, загруженные до этого файла.
 *
 * Все скрипты подключены как обычные <script defer> — так страница
 * работает и при открытии index.html напрямую (file://), где браузер
 * блокирует ES-модули.
 */
(function (MDS) {
  'use strict';

  // Подтверждаем, что скрипты выполнились: снимает страховку из <head>,
  // которая иначе показала бы все .reveal-блоки без анимации.
  document.documentElement.classList.add('js-ready');

  [MDS.initMobileNav, MDS.initScrollReveal, MDS.initLeadForm].forEach(function (init) {
    if (typeof init !== 'function') return;
    try {
      init();
    } catch (error) {
      console.error('[main]', error);
    }
  });
})(window.MDS || {});
