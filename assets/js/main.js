/**
 * Точка входа. Подключает модули страницы.
 * Загружается как <script type="module" defer> — DOM уже разобран.
 */
import { initMobileNav } from './modules/mobile-nav.js';
import { initScrollReveal } from './modules/scroll-reveal.js';
import { initLeadForm } from './modules/lead-form.js';

initMobileNav();
initScrollReveal();
initLeadForm();
