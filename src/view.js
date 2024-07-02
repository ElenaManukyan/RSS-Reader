import state from './index.js';

const renderErrors = (errors) => {
    Object.keys(errors).forEach((field) => {
      const input = document.querySelector('#url-input');
      if (state.rssForm.data.touchedFields[field]) {
        if (state.rssForm.data.rssUrls.includes(input.value)) {
            const errorP = document.querySelector('.feedback');
            errorP.textContent = 'RSS уже существует';
        }
        const errorP = document.querySelector('.feedback');
        
        /* if (state.rssForm.data.rssUrls.includes(input.value)) {
            errorP.textContent = 'RSS уже существует';
        } */
          errorP.textContent = 'Ссылка должна быть валидным URL';
          errorP.classList.remove('text-success');
          errorP.classList.add('text-danger');
          input.classList.add('is-invalid');
      } 
    });
    //const errorMessage = document.querySelector('.feedback');
    
  };

const clearErrors = () => {

    console.log(`state= ${JSON.stringify(state, null, 2)}`);

    const input = document.querySelector('#url-input');
        
    /* if (state.rssForm.data.rssUrls.includes(input.value)) {
        errorP.textContent = 'RSS уже существует'; */


    if (state.rssForm.data.rssUrls.includes(input.value)) {
        const errorMessage = document.querySelector('.feedback');
        errorMessage.textContent = 'RSS успешно загружен';
        const invalidInputs = document.querySelectorAll('.is-invalid');
        invalidInputs.forEach((input) => input.classList.remove('is-invalid'));
        errorMessage.classList.remove('text-danger');
        errorMessage.classList.add('text-success');

        const urlInput = document.querySelector('#url-input');
        urlInput.value = '';
        urlInput.focus();
    } else {
        const errorMessage = document.querySelector('.feedback');
        errorMessage.textContent = 'RSS уже существует';
    }
};

const render = () => {
    if (state.rssForm.isValid) {
        clearErrors();
    } else {
        renderErrors(state.rssForm.errors);
    }
};

export { renderErrors, clearErrors, render };