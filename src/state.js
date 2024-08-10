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
    },
  },
};
export default state;
