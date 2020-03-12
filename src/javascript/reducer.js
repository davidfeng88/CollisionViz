import merge from 'lodash/merge';

import {
  UPDATE_FILTER,
} from './actions';

import {
  DEFAULT_TIME,
} from './util';

export const defaultState = Object.freeze({
  start: DEFAULT_TIME, // in minutes, later from midnight.
  finish: DEFAULT_TIME + 60, // in minutes
  initialTime: DEFAULT_TIME,
  date: '2017-03-13',
  loading: true,
  extraShown: false,
});

export const Reducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case UPDATE_FILTER:
      return merge({}, state, action.filters);
    default:
      return state;
  }
};
