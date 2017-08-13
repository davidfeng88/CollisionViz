import { timeIntToString } from '../util/time_util';

export const collisionsToArray = (state, time) => {
  let TimeString = timeIntToString(time);
  if (state.index && state.index[TimeString]) {
    return state.index[TimeString];
  } else {
    return [];
  }
};
