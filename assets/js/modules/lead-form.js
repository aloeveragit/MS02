/**
 * Форма заявки на диагностику.
 *
 * Сейчас отправка эмулируется на стороне клиента — бэкенда нет.
 * Чтобы подключить приём заявок, задайте ENDPOINT и раскомментируйте
 * блок с fetch() в sendLead().
 */
const ENDPOINT = ''; // например: '/api/lead'
const SUCCESS_TEXT = 'Заявка принята. Мы свяжемся с вами в ближайшее рабочее время.';
const ERROR_TEXT = 'Не удалось отправить заявку. Позвоните нам: +375 17 335-27-55.';

/**
 * @param {Record<string, string>} data
 * @returns {Promise<void>}
 */
async function sendLead(data) {
  if (!ENDPOINT) return; // заглушка: считаем отправку успешной

  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
}

export function initLeadForm() {
  const form = document.querySelector('[data-lead-form]');
  const message = document.querySelector('[data-form-message]');

  if (!form || !message) return;

  const showMessage = (text, isError = false) => {
    message.textContent = text;
    message.classList.add('is-visible');
    message.classList.toggle('is-error', isError);
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const submitButton = form.querySelector('button[type="submit"]');
    const data = Object.fromEntries(new FormData(form).entries());

    if (submitButton) submitButton.disabled = true;

    try {
      await sendLead(data);
      form.reset();
      showMessage(SUCCESS_TEXT);
    } catch (error) {
      console.error('[lead-form]', error);
      showMessage(ERROR_TEXT, true);
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  });
}
