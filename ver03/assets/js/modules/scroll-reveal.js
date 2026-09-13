/**
 * Плавное появление блоков с классом .reveal при попадании во вьюпорт.
 * Если IntersectionObserver недоступен — блоки просто показываются сразу.
 */
(function (MDS) {
  'use strict';

  var VISIBLE_CLASS = 'is-visible';

  function showAll(elements) {
    Array.prototype.forEach.call(elements, function (el) {
      el.classList.add(VISIBLE_CLASS);
    });
  }

  MDS.initScrollReveal = function initScrollReveal(selector) {
    var elements = document.querySelectorAll(selector || '.reveal');
    if (!elements.length) return;

    if (!('IntersectionObserver' in window)) {
      showAll(elements);
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add(VISIBLE_CLASS);
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 }
    );

    Array.prototype.forEach.call(elements, function (el) {
      observer.observe(el);
    });
  };
})((window.MDS = window.MDS || {}));
