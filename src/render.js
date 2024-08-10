import state from './index.js';
import { clearErrors, renderErrors } from './view.js';

const render = () => {
  if (state.rssForm.isValid) {
    clearErrors();
  } else {
    renderErrors(state.rssForm.errors);
  }
};

export default render;