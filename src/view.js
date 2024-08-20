import i18n from 'i18next';
import resources from './locales.js';
import state from './state.js';

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
  } else if (errors.type === 'noRSS') {
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
  divCardBodyH2.textContent = i18nextInstance.t('posts');
  divCardBody.appendChild(divCardBodyH2);
  const divCardUl = document.createElement('ul');
  divCardUl.classList.add('list-group', 'border-0', 'rounded-0');
  for (let i = rsses.length - 1; i >= 2; i -= 1) {
    const rss = rsses[i];
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start', 'border-0', 'border-end-0');
    const a = document.createElement('a');
    a.setAttribute('href', `${rss.link}`);
    // const aClass = watchedState.rssForm.data.readedIdsPosts.includes(rss.itemsId) ? 'fw-normal' : 'fw-bold';
    const aClass = state.rssForm.data.readedIdsPosts.includes(rss.itemsId) ? 'fw-normal' : 'fw-bold';
    a.classList.add(aClass);
    // if (watchedState.rssForm.data.readedIdsPosts.includes(rss.itemsId)) {
    if (state.rssForm.data.readedIdsPosts.includes(rss.itemsId)) {
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
    button.textContent = i18nextInstance.t('viewing');
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
  divCardBody2H2.textContent = i18nextInstance.t('feeds');
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

export { renderErrors, clearErrors, render, renderRssLists, appendText };
