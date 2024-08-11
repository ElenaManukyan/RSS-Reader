import keyBy from 'lodash/keyBy.js';
import './styles.scss';
import 'bootstrap';
import * as yup from 'yup';
import onChange from 'on-change';
import i18n from 'i18next';
import axios from 'axios';
import resources from './locales.js';
import state from './state.js';

// Locales
const i18nextInstance = i18n.createInstance();
await i18nextInstance.init({
  lng: 'ru',
  debug: true,
  resources,
});

const getUrlWithProxy = (url) => {
  const urlWithProxy = new URL('/get', 'https://allorigins.hexlet.app/');
  urlWithProxy.searchParams.set('disableCache', 'true');
  urlWithProxy.searchParams.set('url', url);
  return urlWithProxy.toString();
};

const isRSSUrl = (rawData) => {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(rawData.data.contents, 'application/xml');
  if (xmlDoc.getElementsByTagName('rss').length > 0) {
    return xmlDoc;
  }
  const error = new Error();
  error.type = 'noRSS';
  throw error;
};

const createSchema = (rssUrls) => yup.object().shape({
  activeUrl: yup
    .string()
    .url(i18nextInstance.t('invalidUrl'))
    .required()
    .notOneOf(rssUrls, `${i18nextInstance.t('notOneOf')}`),
});

const validate = async (fields, rssUrls) => {
  const schema = createSchema(rssUrls);
  try {
    await schema.validate(fields, { abortEarly: false });
    return {};
  } catch (e) {
    const errors = keyBy(e.inner, 'path');
    throw errors;
  }
};

const watchedState = onChange(state, () => {
  import('./view.js')
    .then((module) => {
      const { render } = module;
      render();
    });
});

const dataParser = (data) => {
  const parser = new DOMParser();
  const feedData = parser.parseFromString(data, 'text/xml');
  const parseerrors = feedData.querySelector('parsererror');
  console.log(`parseerrors= ${JSON.stringify(parseerrors)}`);
  if (parseerrors !== null) {
    const error = parseerrors.textContent;
    throw new Error(error);
  }
};

// Get RSS stream
const getRSS = async (url) => {
  try {
    if (state.rssForm.isValid) {
      const response = await axios.get(getUrlWithProxy(url));
      dataParser(response.data.contents);
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data.contents, 'application/xml');
      const mainTitle = xmlDoc.querySelectorAll('title')[0].textContent;
      const mainDescription = xmlDoc.querySelectorAll('description')[0].textContent;
      const items = xmlDoc.querySelectorAll('item');
      const rssData = [];
      let itemsId = 0;
      rssData.push({ itemsId, mainTitle });
      itemsId += 1;
      rssData.push({ itemsId, mainDescription });
      itemsId += 1;
      items.forEach((item) => {
        const title = item.querySelector('title').textContent;
        const description = item.querySelector('description').textContent;
        const link = item.querySelector('link').textContent;
        rssData.push({
          itemsId, title, description, link,
        });
        itemsId += 1;
      });
      return rssData;
    }
    return false;
  } catch (error) {
    console.log(`error= ${error}`);
    if (error.message === 'Network Error') {
      watchedState.rssForm.errors = error;
      watchedState.rssForm.isValid = false;
    }
    return false;
  }
};

// Render RSS lists
function renderRssLists(rsses) {
  document.querySelector('.posts').innerHTML = '';
  document.querySelector('.feeds').innerHTML = '';
  const divCard = document.createElement('div');
  divCard.classList.add('card', 'border-0');
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  const divCardBodyH2 = document.createElement('h2');
  divCardBodyH2.classList.add('card-title', 'h4');
  divCardBodyH2.textContent = 'Посты';
  divCardBody.appendChild(divCardBodyH2);
  const divCardUl = document.createElement('ul');
  divCardUl.classList.add('list-group', 'border-0', 'rounded-0');
  for (let i = rsses.length - 1; i >= 2; i -= 1) {
    const rss = rsses[i];
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', `${rss.link}`);
    const aClass = watchedState.rssForm.data.readedIdsPosts.includes(rss.itemsId) ? 'fw-normal' : 'fw-bold';
    a.classList.add(aClass);
    if (watchedState.rssForm.data.readedIdsPosts.includes(rss.itemsId)) {
      a.style = 'color: #6c757d';
    }
    a.setAttribute('data-id', `${rss.itemsId}`);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');
    a.textContent = `${rss.title}`;
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.classList.add('btn', 'btn-outline-primary', 'btn-sm');
    button.setAttribute('data-id', `${rss.itemsId}`);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';
    li.appendChild(a);
    li.appendChild(button);
    divCardUl.appendChild(li);
  }
  divCard.appendChild(divCardBody);
  divCard.appendChild(divCardUl);
  document.querySelector('.posts').appendChild(divCard);
  // Add feeds
  const divFeeds = document.querySelector('.feeds');
  const divFeedsCard = document.createElement('div');
  divFeedsCard.classList.add('card', 'border-0');
  const divCardBody2 = document.createElement('div');
  divCardBody2.classList.add('card-body');
  const divCardBody2H2 = document.createElement('h2');
  divCardBody2H2.classList.add('card-title', 'h4');
  divCardBody2H2.textContent = 'Фиды';
  divCardBody2.appendChild(divCardBody2H2);
  const ulFeeds = document.createElement('ul');
  ulFeeds.classList.add('list-group', 'border-0', 'rounded-0');
  const liFeeds = document.createElement('li');
  liFeeds.classList.add('list-group-item', 'border-0', 'border-end-0');
  const h3Feeds = document.createElement('h3');
  h3Feeds.classList.add('h6', 'm-0');
  h3Feeds.textContent = rsses[0].mainTitle;
  const pFeeds = document.createElement('p');
  pFeeds.classList.add('m-0', 'small', 'text-black-50');
  pFeeds.textContent = rsses[1].mainDescription;
  liFeeds.append(h3Feeds, pFeeds);
  ulFeeds.appendChild(liFeeds);
  divFeedsCard.append(divCardBody2, ulFeeds);
  divFeeds.appendChild(divFeedsCard);
}

// Проверяю каждый RSS-поток
function checkEvenRssStream() {
  const allRssStreams = state.rssForm.data.rssUrls;
  allRssStreams.forEach((RssStream) => {
    getRSS(RssStream)
      .then((d) => {
        if (d) {
          const titles = state.rssForm.data.activeRssUrlsData.map((item) => item.title);
          const desc = state.rssForm.data.activeRssUrlsData.map((item) => item.description);
          const filt = d.filter((i) => !titles.includes(i.title) && !desc.includes(i.description));
          if (filt.length > 0) {
            filt.forEach((item) => {
              item.itemsId = (state.rssForm.data.activeRssUrlsData.length - 1) + 1;
              state.rssForm.data.activeRssUrlsData.push(item);
            });
            renderRssLists(state.rssForm.data.activeRssUrlsData);
          }
        }
      })
      .catch((error) => {
        if (error.message === 'Network Error') {
          watchedState.rssForm.errors = error;
          watchedState.rssForm.isValid = false;
        }
      });
  });
}

function repeat() {
  checkEvenRssStream();
  setTimeout(repeat, 5000);
}

const handler = async () => {
  const urlInput = document.querySelector('#url-input');
  const { value, name } = urlInput;
  watchedState.rssForm.data.fields.activeUrl = value;
  watchedState.rssForm.data.touchedFields[name] = true;
  validate(watchedState.rssForm.data.fields, watchedState.rssForm.data.rssUrls)
    .then(async (data0) => {
      console.log(`data0= ${JSON.stringify(data0, null, 2)}`);
      if (!Object.keys(data0).length === 0) {
        throw data0;
      }
      const response = await axios.get(getUrlWithProxy(watchedState.rssForm.data.fields.activeUrl));
      return response;
    })
    .then(async (data1) => {
      console.log(`data1= ${JSON.stringify(data1, null, 2)}`);
      const result = isRSSUrl(data1);
      return result;
    })
    .then((data2) => {
      console.log(`data2= ${JSON.stringify(data2, null, 2)}`);
      watchedState.rssForm.data.rssUrls.push(watchedState.rssForm.data.fields.activeUrl);
      watchedState.rssForm.isValid = true;
      repeat();
    })
    .catch((error) => {
      console.log(`error catch block= ${JSON.stringify(error, null, 2)}`);
      watchedState.rssForm.errors = error;
      watchedState.rssForm.isValid = false;
    });
};

const showNetworkError = () => {
  const error = new Error('Network error!');
  error.type = 'networkError';
  watchedState.rssForm.errors = error;
  watchedState.rssForm.isValid = false;
};

const hiddeNetworkError = () => {
  watchedState.rssForm.isValid = true;
};

window.addEventListener('online', () => {
  hiddeNetworkError(); // Hide message about network error
});

window.addEventListener('offline', () => {
  showNetworkError(); // Show message about network error
});

let isOnline = true;

const checkInternetConnection = () => {
  axios.get(getUrlWithProxy(watchedState.rssForm.data.fields.activeUrl))
    .then(() => {
      if (!isOnline) {
        isOnline = true;
        hiddeNetworkError();
      }
    })
    .catch(() => {
      if (isOnline) {
        isOnline = false;
        showNetworkError();
      }
    });
};

function repeatCheck() {
  checkInternetConnection();
  setTimeout(repeatCheck, 1000);
}

// Locales
function appendText() {
  const h1RuName = document.querySelector('.display-3');
  h1RuName.textContent = i18nextInstance.t('h1RuName');
  const leadP = document.querySelector('.lead');
  leadP.textContent = i18nextInstance.t('leadP');
  const formFloatingDivLabel = document.querySelector('.form-floating label');
  formFloatingDivLabel.textContent = i18nextInstance.t('formFloatingDivLabel');
  const textMutedP = document.querySelector('.text-muted');
  textMutedP.textContent = i18nextInstance.t('textMutedP');
  const btn = document.querySelector('[aria-label="add"]');
  btn.textContent = i18nextInstance.t('btn');
  const textCenter = document.querySelector('.text-center');
  textCenter.textContent = i18nextInstance.t('textCenter');
  const textCenterA = document.createElement('a');
  textCenterA.setAttribute('href', '');
  textCenterA.setAttribute('target', '_blank');
  textCenterA.textContent = i18nextInstance.t('textCenterA');
  textCenter.appendChild(textCenterA);
}
appendText();

document.addEventListener('DOMContentLoaded', () => {
  const rssForm = document.querySelector('.rss-form');
  const rssFormInput = rssForm.querySelector('#url-input');
  rssForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log(`rssFormInput.value= ${rssFormInput.value}`);
    await handler();
    repeatCheck();
  });
});

document.querySelector('.posts').addEventListener('click', (event) => {
  if (event.target.classList.contains('btn-sm')) {
    const btnId = Number(event.target.getAttribute('data-id'));
    const fData = watchedState.rssForm.data.activeRssUrlsData.filter((i) => i.itemsId === btnId)[0];
    document.querySelector('.modal-title').textContent = fData.title;
    document.querySelector('.modal-body').textContent = fData.description;
    document.querySelector('.full-article').setAttribute('href', `${fData.link}`);
    const clickedListElement = document.querySelector(`.list-group-item [data-id="${String(btnId)}"]`);
    clickedListElement.classList.remove('fw-bold');
    clickedListElement.classList.add('fw-normal');
    clickedListElement.style = 'color: #6c757d';
    watchedState.rssForm.data.readedIdsPosts.push(btnId);
  }
});

// Функция для обработки всех новых элементов в узле
function handleNewElements(node) {
  return new Promise((resolve, reject) => {
    try {
      const res = [];
      node.querySelectorAll('.list-group-item a').forEach((element) => {
        res.push(element.href);
      });
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
}

// Создаю новый MutationObserver
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        handleNewElements(node)
          .catch((error) => {
            console.error('Ошибка в handleNewElements:', error);
          });
      }
    });
  });
});

// Настраиваю и запускаю MutationObserver
observer.observe(document.querySelector('.posts'), {
  childList: true,
  subtree: true,
});
