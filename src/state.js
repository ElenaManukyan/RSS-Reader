const state = {
  currentLocale: 'ru',
  rssForm: {
    stateForm: 'filling',
    isValid: false,
    errors: {},
    data: {
      fields: {
        activeUrl: '',
      },
      touchedFields: {
        url: false,
      },
      rssUrls: [],
      activeRssUrlsData: [],
      clickedListElements: new Set(),
    },
  },
};

const elements = {
  modalTitle: document.querySelector('.modal-title'),
  modalBody: document.querySelector('.modal-body'),
  fullArticle: document.querySelector('.full-article'),
  urlInput: document.querySelector('#url-input'),
  rssForm: document.querySelector('.rss-form'),
  posts: document.querySelector('.posts'),
  h1RuName: document.querySelector('.display-3'),
  leadP: document.querySelector('.lead'),
  formFloatingDivLabel: document.querySelector('.form-floating label'),
  textMutedP: document.querySelector('.text-muted'),
  btn: document.querySelector('[aria-label="add"]'),
  textCenter: document.querySelector('.text-center'),
  textCenterA: document.createElement('a'),
  btnPrimary: document.querySelector('.btn-primary'),
  btnSecondary: document.querySelector('.btn-secondary'),
  title: document.querySelector('title'),
};
export default { state, elements };
