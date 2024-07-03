import state from './index.js';

const renderErrors = (errors) => {
    const errorP = document.querySelector('.feedback');
    const input = document.querySelector('#url-input');
    input.classList.remove('is-invalid');
    errorP.classList.remove('text-danger', 'text-success');

    if (errors.url) {
        input.classList.add('is-invalid');
        errorP.textContent = errors.url.message;
        errorP.classList.add('text-danger');
    }
    /*
    Object.keys(errors).forEach((field) => {
      const input = document.querySelector('#url-input');
      if (state.rssForm.data.touchedFields[field]) {
        if (state.rssForm.data.rssUrls.includes(input.value)) {
            const errorP = document.querySelector('.feedback');
            errorP.textContent = 'RSS уже существует';
        }
        const errorP = document.querySelector('.feedback');
          errorP.textContent = 'Ссылка должна быть валидным URL';
          errorP.classList.remove('text-success');
          errorP.classList.add('text-danger');
          input.classList.add('is-invalid');
      } 
    });   
    */ 
  };

const clearErrors = () => {
    const errorMessage = document.querySelector('.feedback');
    errorMessage.textContent = 'RSS успешно загружен';
    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => input.classList.remove('is-invalid'));
    errorMessage.classList.remove('text-danger');
    errorMessage.classList.add('text-success');
    const urlInput = document.querySelector('#url-input');
    urlInput.value = '';
    urlInput.focus();

    /*
    const errorMessage = document.querySelector('.feedback');
    errorMessage.textContent = 'RSS успешно загружен';
    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => input.classList.remove('is-invalid'));
    errorMessage.classList.remove('text-danger');
    errorMessage.classList.add('text-success');
    const urlInput = document.querySelector('#url-input');
    urlInput.value = '';
    urlInput.focus();
    */
};

const render = () => {
    if (state.rssForm.isValid) {
        clearErrors();
    } else {
        renderErrors(state.rssForm.errors);
    }
    /*
    if (state.rssForm.isValid) {
        const input = document.querySelector('#url-input');
        if (state.rssForm.data.rssUrls.includes(input.value)) {
            const errorMessage = document.querySelector('.feedback');
            errorMessage.textContent = 'RSS уже существует';
        }
        clearErrors();
    } else {
        renderErrors(state.rssForm.errors);
    }
        */
};

export { renderErrors, clearErrors, render };