import merge from 'lodash/merge';

import { UPDATE_FILTER } from './actions';

export const DEFAULT_TIME = 480; // 08:00
export const START_TIME = 0;   //  00:00
export const END_TIME = 1439;  //  23:59

export const defaultState = Object.freeze({
  start: DEFAULT_TIME, // in minutes, later from midnight.
  finish: DEFAULT_TIME, // in minutes
  initialTime: DEFAULT_TIME,
  date: '2017-04-15',
  loaded: false,
});

const Reducer = (state = defaultState, action) => {
  Object.freeze(state);

  switch (action.type) {
    case UPDATE_FILTER:
      return merge({}, state, action.filters);

    default:
      return state;
  }
};

export default Reducer;
