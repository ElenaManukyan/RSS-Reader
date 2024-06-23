import keyBy from 'lodash/keyBy.js';
import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';

const regex = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

const schema = yup.object().shape({
  rssLink: yup.string().matches(regex, 'Ссылка должна быть валидным URL').required(),
});

const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

//function validation() {
  const state = {
    rssForm: {
      stateForm: 'filling',
      isValid: true,
      errors: {},
      data: {
        fields: {
          rssLink: '',
        },
        touchedFields: {
          rssLink: false,
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
        if (errorP) {
          errorP.textContent = 'Ссылка должна быть валидным URL';
          input.classList.add('is-invalid');
        }
      } else if (input) {
        const errorP = document.querySelector('.feedback');
        if (errorP) {
          errorP.textContent = 'RSS успешно загружен';
          input.classList.remove('is-invalid');
        }
      }
    });
  };

  const clearErrors = () => {
    const errorMessages = document.querySelectorAll('.feedback');
    errorMessages.forEach((msg) => msg.textContent = '');
    const invalidInputs = document.querySelectorAll('.is-invalid');
    invalidInputs.forEach((input) => input.classList.remove('is-invalid'));
  };

  const render = () => {
    if (state.rssForm.isValid) {
      clearErrors();
    } else {
      renderErrors(state.rssForm.errors);
    }
  };

  const watchedState = onChange(state, () => {
    render();
  });

  const handler = (event) => {
    const { name, value } = event.target;

    watchedState.rssForm.data.fields[name] = value;
    watchedState.rssForm.data.touchedFields[name] = true;

    const errors = validate(watchedState.rssForm.data.fields);
    watchedState.rssForm.errors = errors;

    if (Object.keys(errors).length === 0) {
      watchedState.rssForm.isValid = true;
      event.target.classList.remove('is-invalid');
    } else {
      watchedState.rssForm.isValid = false;
    }
  };


  const rssInput = document.querySelector('#url-input');
  rssInput.addEventListener('input', handler);
  
  const rssForm = document.querySelector('.rss-form');
  rssForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handler(event);
  });


  //console.log(`state= ${JSON.stringify(state, null, 2)}`);

//}

//validation();
