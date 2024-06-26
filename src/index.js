import keyBy from 'lodash/keyBy.js';
import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';

const regex = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

const schema = yup.object().shape({
  url: yup.string().matches(regex, 'Ссылка должна быть валидным URL').required(),
});

const validate = (fields) => {
  //console.log(`fields= ${JSON.stringify(fields)}`);
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

  const state = {
    rssForm: {
      stateForm: 'filling',
      isValid: true,
      errors: {},
      data: {
        fields: {
          url: '',
        },
        touchedFields: {
          url: false,
        },
      },
    },
  };

  const renderErrors = (errors) => {
    const errorMessage = document.querySelector('.feedback');
    if (errorMessage) {
      errorMessage.textContent = '';
    }
    Object.keys(errors).forEach((field) => {
      const input = document.querySelector('#url-input');
      if (state.rssForm.data.touchedFields[field]) {
        const errorP = document.querySelector('.feedback');
          errorP.textContent = 'Ссылка должна быть валидным URL';
          errorP.classList.add('text-danger');
          input.classList.add('is-invalid');
      } else {
        const errorP = document.querySelector('.feedback');
        errorP.textContent = 'RSS успешно загружен';
        input.classList.remove('is-invalid');
      }
    });
  };

  const clearErrors = () => {
    const errorMessage = document.querySelector('.feedback');
    errorMessage.textContent = 'RSS успешно загружен';
    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => input.classList.remove('is-invalid'));
    
    errorMessage.classList.remove('text-danger');
    errorMessage.classList.add('text-success');
  };

  const render = () => {
    console.log(`state.rssForm.isValid= ${state.rssForm.isValid}`);
    if (state.rssForm.isValid) {
      clearErrors();
    } else {
      renderErrors(state.rssForm.errors);
    }
  };

  const watchedState = onChange(state, () => {
    render();
  });

  const handler = () => {
    const urlInput = document.querySelector('#url-input');
    const value = urlInput.value;
    const name = urlInput.name;

    watchedState.rssForm.data.fields[name] = value;
    watchedState.rssForm.data.touchedFields[name] = true;
    const errors = validate(watchedState.rssForm.data.fields);
    watchedState.rssForm.errors = errors;
    if (Object.keys(errors).length === 0) {
      watchedState.rssForm.isValid = true;
    } else {
      watchedState.rssForm.isValid = false;
    }

    console.log(`state= ${JSON.stringify(state, null, 2)}`);

  };

/*
  const rssInput = document.querySelector('#url-input');
  rssInput.addEventListener('input', handler);
*/

  
  const rssForm = document.querySelector('.rss-form');
  rssForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handler(event);
  });
