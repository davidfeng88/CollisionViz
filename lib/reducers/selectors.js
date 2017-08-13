import { timeIntToString } from '../util/time_util';

export const collisionsToArray = (state, time) => {
  let TimeString = timeIntToString(time);
  if (state.collisions && state.collisions[TimeString]) {
    return state.collisions[TimeString];
  } else {
    return [];
  }
};
