import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  const accordionButtons = document.querySelectorAll('.accordion__button');
  const accordions = document.querySelectorAll('.accordion');

  for (let accordion of accordions) {
    if (window.innerWidth < 768) {
      accordion.querySelector('.accordion__body').classList.add('accordion__body_closed');
      accordion.querySelector('.accordion__button').classList.remove('accordion__button_hidden');
    }
  }

  for (let button of accordionButtons) {
    button.addEventListener('click', function (event) {
      const accordion = event.target.closest('.accordion');
      const accordionBody = accordion.querySelector('.accordion__body');
      if (button.classList.contains('accordion__button_closed')) {
        button.classList.toggle('accordion__button_closed');
        accordionBody.classList.toggle('accordion__body_closed');
        accordion.classList.toggle('accordion_active');
      } else {
        for (let elem of accordions) {
          elem.querySelector('.accordion__body').classList.add('accordion__body_closed');
          elem.querySelector('.accordion__button').classList.remove('accordion__button_closed');
          elem.classList.remove('accordion_active');
        }
        accordionBody.classList.toggle('accordion__body_closed');
        button.classList.toggle('accordion__button_closed');
        accordion.classList.toggle('accordion_active');
      }
    });
  }

  // Utils
  // ---------------------------------

  iosVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initModals();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используется matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)
