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
      readedIdsPosts: [],
      activeRssUrlsData: [],
      fData: '',
      btnId: '',
      clickedListElement: {},
    },
  },
};
export default state;
