import merge from 'lodash/merge';

import { UPDATE_FILTER, RESET_FILTER } from '../actions/filter_actions';

const defaultFilters = Object.freeze({
  start: 420, // in minutes, later from midnight.
  finish: 420, // in minutes
  taxi: true,
  bike: true,
  motorcycle: true,
  ped: true,
});

const FiltersReducer = (state = defaultFilters, action) => {
  Object.freeze(state);

  switch (action.type) {
    case UPDATE_FILTER:
      return merge({}, state, action.filters);

    case RESET_FILTER:
      return defaultFilters;

    default:
      return state;
  }
};

export default FiltersReducer;
