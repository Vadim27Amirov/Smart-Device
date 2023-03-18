import {iosVhFix} from './utils/ios-vh-fix';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {breakpointCheckerDesktop} from './modules/modals/adaptive';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  const descriptionButtonOpen = document.querySelector('.about__button');
  const accordion = document.querySelector('[data-accordion]');
  const accordionTitles = document.querySelectorAll('[data-accordion] button');

  function descriptionHeightToggle(event) {
    const descriptionButton = event.target;
    const description = descriptionButton.closest('.about__inner').querySelector('.about__description');
    if (descriptionButton.classList.contains('about__button-closed')) {
      descriptionButton.classList.remove('about__button-closed');
      description.classList.toggle('about__description-opened');
      descriptionButton.textContent = 'Подробнее';
      return;
    }
    descriptionButton.classList.add('about__button-closed');
    description.classList.toggle('about__description-opened');
    descriptionButton.textContent = 'Свернуть';
  }

  descriptionButtonOpen.addEventListener('click', descriptionHeightToggle);

  //  источник https://github.com/KatrinaNov/maskPhone/blob/master/maskPhone.js

  function maskPhone() {
    const elems = document.querySelectorAll('input[type="tel"]');

    function mask(event) {
      const keyCode = event.keyCode;
      const template = '+7 (___) ___-__-__';
      const def = template.replace(/\D/g, '');
      const val = event.target.value.replace(/\D/g, '');

      let i = 0;
      let newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
      i = newValue.indexOf('_');
      if (i !== -1) {
        newValue = newValue.slice(0, i);
      }
      let reg = template.substr(0, event.target.value.length).replace(/_+/g,
          function (a) {
            return '\\d{1,' + a.length + '}';
          }).replace(/[+()]/g, '\\$&');
      reg = new RegExp('^' + reg + '$');
      if (!reg.test(event.target.value) || event.target.value.length < 5 || keyCode > 47 && keyCode < 58) {
        event.target.value = newValue;
      }
      if (event.type === 'blur' && event.target.value.length < 5) {
        event.target.value = ' ';
      }
    }

    for (const elem of elems) {
      elem.addEventListener('input', mask);
      elem.addEventListener('focus', mask);
      elem.addEventListener('blur', mask);
    }
  }

  const initAccordion = () => {
    if (accordion) {
      accordion.classList.remove('no-js');
    }

    if (accordionTitles.length > 0) {
      accordionTitles.forEach((accordeonTitle) => {
        accordeonTitle.addEventListener('click', (evt) => {
          if (evt.target.classList.contains('is-open')) {
            evt.target.classList.remove('is-open');
          } else {
            for (let title of accordionTitles) {
              title.classList.remove('is-open');
            }
            evt.target.classList.add('is-open');
          }
        });
      });
    }
  };

  initAccordion();

  maskPhone();

  // Utils
  // ---------------------------------

  breakpointCheckerDesktop();
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
