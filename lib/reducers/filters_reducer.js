import merge from 'lodash/merge';

import { UPDATE_FILTER } from '../actions/filter_actions';

export const DEFAULT_TIME = 420;

const defaultFilters = Object.freeze({
  start: DEFAULT_TIME, // in minutes, later from midnight.
  finish: DEFAULT_TIME, // in minutes
  date: "2017-07-15",
});

const FiltersReducer = (state = defaultFilters, action) => {
  Object.freeze(state);

  switch (action.type) {
    case UPDATE_FILTER:
      return merge({}, state, action.filters);

    default:
      return state;
  }
};

export default FiltersReducer;
