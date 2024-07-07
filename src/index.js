import keyBy from 'lodash/keyBy.js';
import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';
import { render } from './view.js';
import i18n from 'i18next';
import resources from './locales.js';

const regex = /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/;

const state = {
  currentLocale: 'en',
  rssForm: {
    stateForm: 'filling',
    isValid: false,
    errors: {},
    data: {
      fields: {
        url: '',
      },
      touchedFields: {
        url: false,
      },
      rssUrls: [],
    },
  },
};

// Locales
const i18nextInstance = i18n.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    debug: true,
    resources,
  });

const createSchema = (rssUrls) => yup.object().shape({
  url: yup.string()
  .notOneOf(rssUrls, 'RSS уже существует')
  .matches(regex, 'Ссылка должна быть валидным URL')
  .required(),
});

const validate = async (fields, rssUrls) => {
  const schema = createSchema(rssUrls);
  try {
    await schema.validate(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

const watchedState = onChange(state, () => {
  render();
});

const handler = async () => {
  const urlInput = document.querySelector('#url-input');
  const value = urlInput.value;
  const name = urlInput.name;
  watchedState.rssForm.data.fields[name] = value;
  watchedState.rssForm.data.touchedFields[name] = true;
  const errors = await validate(watchedState.rssForm.data.fields, watchedState.rssForm.data.rssUrls);
  watchedState.rssForm.errors = errors;

  console.log(`state= ${JSON.stringify(state, null, 2)}`);
  console.log(`Object.keys(errors).length= ${Object.keys(errors).length}`);

  if (Object.keys(errors).length === 0) {
      watchedState.rssForm.data.rssUrls.push(value);
      watchedState.rssForm.isValid = true;
  } else {
    watchedState.rssForm.isValid = false;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const rssForm = document.querySelector('.rss-form');
  rssForm.addEventListener('submit', (event) => {
    event.preventDefault();
    handler();
  });
});


// Locales
function init() {
  const h1RuName = document.querySelector('.display-3');
  h1RuName.textContent = i18nextInstance.t('h1RuName');
}

init();

export default state;
