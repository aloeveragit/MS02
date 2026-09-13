/**
 * Форма заявки на диагностику.
 *
 * Сейчас отправка эмулируется на стороне клиента — бэкенда нет.
 * Чтобы подключить приём заявок, задайте ENDPOINT: остальной код готов.
 */
(function (MDS) {
  'use strict';

  var ENDPOINT = ''; // например: '/api/lead'
  var SUCCESS_TEXT = 'Заявка принята. Мы свяжемся с вами в ближайшее рабочее время.';
  var ERROR_TEXT = 'Не удалось отправить заявку. Позвоните нам: +375 17 335-27-55.';

  /**
   * @param {Object} data — поля формы
   * @returns {Promise}
   */
  function sendLead(data) {
    if (!ENDPOINT) return Promise.resolve(); // заглушка: считаем отправку успешной

    return fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (response) {
      if (!response.ok) throw new Error('Request failed: ' + response.status);
    });
  }

  MDS.initLeadForm = function initLeadForm() {
    var form = document.querySelector('[data-lead-form]');
    var message = document.querySelector('[data-form-message]');

    if (!form || !message) return;

    function showMessage(text, isError) {
      message.textContent = text;
      message.classList.add('is-visible');
      message.classList.toggle('is-error', Boolean(isError));
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (!form.reportValidity()) return;

      var submitButton = form.querySelector('button[type="submit"]');
      var data = {};

      new FormData(form).forEach(function (value, key) {
        data[key] = value;
      });

      if (submitButton) submitButton.disabled = true;

      sendLead(data)
        .then(function () {
          form.reset();
          showMessage(SUCCESS_TEXT, false);
        })
        .catch(function (error) {
          console.error('[lead-form]', error);
          showMessage(ERROR_TEXT, true);
        })
        .then(function () {
          if (submitButton) submitButton.disabled = false;
        });
    });
  };
})((window.MDS = window.MDS || {}));
