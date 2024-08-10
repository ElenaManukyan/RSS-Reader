import i18n from 'i18next';
import resources from './locales.js';
import state from './index.js';

// Locales
const i18nextInstance = i18n.createInstance();
await i18nextInstance.init({
  lng: 'ru',
  debug: true,
  resources,
});

const renderErrors = (errors) => {
  const errorP = document.querySelector('.feedback');
  const input = document.querySelector('#url-input');
  input.classList.remove('is-invalid');
  errorP.classList.remove('text-danger', 'text-success');
  if (errors.activeUrl) {  
    input.classList.add('is-invalid');
    errorP.textContent = errors.activeUrl.message;
    errorP.classList.add('text-danger');
  } else if (errors.isRSSUrlError) {
    input.classList.add('is-invalid');
    errorP.textContent = i18nextInstance.t('notValidRSS');
    errorP.classList.add('text-danger');
  } else if (errors.isNetworkError) {
    input.classList.add('is-invalid');
    errorP.textContent = i18nextInstance.t('isNetworkError');
    errorP.classList.add('text-danger');
  }  else if (errors.type === 'noRSS') {
    input.classList.add('is-invalid');
    errorP.textContent = i18nextInstance.t('notValidRSS');
    errorP.classList.add('text-danger');
  } else if (errors.type === 'networkError') {
    input.classList.add('is-invalid');
    errorP.textContent = i18nextInstance.t('isNetworkError');
    errorP.classList.add('text-danger');
  }
};

const clearErrors = () => {
  const errorMessage = document.querySelector('.feedback');
  errorMessage.textContent = `${i18nextInstance.t('successRSS')}`;
  const invalidInputs = document.querySelectorAll('.is-invalid');
  invalidInputs.forEach((input) => input.classList.remove('is-invalid'));
  errorMessage.classList.remove('text-danger');
  errorMessage.classList.add('text-success');
  const urlInput = document.querySelector('#url-input');
  urlInput.value = '';
  urlInput.focus();
};

const render = () => {
    if (state.rssForm.isValid) {
      clearErrors();
    } else {
      renderErrors(state.rssForm.errors);
    }
  };

export { renderErrors, clearErrors, render };
