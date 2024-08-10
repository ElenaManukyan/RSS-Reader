import state from './index.js';
import { clearErrors, renderErrors } from './viev.js';

const render = () => {
  if (state.rssForm.isValid) {
    clearErrors();
  } else {
    renderErrors(state.rssForm.errors);
  }
};

export default render;