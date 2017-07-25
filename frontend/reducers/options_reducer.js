import merge from 'lodash/merge';

import { UPDATE_OPTION, RESET_OPTION } from '../actions/option_actions';

const defaultOptions = Object.freeze({
  start: 420, // in minutes, later from midnight.
  finish: 420, // in minutes
  taxi: true,
  bike: true,
  motorcycle: true,
  ped: true,
});

const OptionsReducer = (state = defaultOptions, action) => {
  Object.freeze(state);

  switch (action.type) {
    case UPDATE_OPTION:
      return merge({}, state, action.options);

    case RESET_OPTION:
      return defaultOptions;

    default:
      return state;
  }
};

export default OptionsReducer;
