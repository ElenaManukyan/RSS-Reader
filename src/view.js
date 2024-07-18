import state from './index.js';

const renderErrors = (errors) => {
    const errorP = document.querySelector('.feedback');
    const input = document.querySelector('#url-input');
    
    input.classList.remove('is-invalid');
    errorP.classList.remove('text-danger', 'text-success');

    // console.log(`errors= ${JSON.stringify(errors, null, 2)}`);

   if (errors.activeUrl) {  
        input.classList.add('is-invalid');
        errorP.textContent = errors.activeUrl.message;
        errorP.classList.add('text-danger');
    }
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
};

const render = () => {
    if (Object.keys(state.rssForm.errors).length === 0) {
        clearErrors();
    } else {
        renderErrors(state.rssForm.errors);
    }
};

export { renderErrors, clearErrors, render };