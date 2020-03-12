import merge from 'lodash/merge';

import {
  UPDATE_FILTER,
} from './actions';

import {
  DEFAULT_HOUR,
} from './util';

export const defaultState = Object.freeze({
  hour: DEFAULT_HOUR,
  date: '2017-03-13',
  loading: true,
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
